import { useState, useRef, useCallback, useEffect } from 'react';
import { transcribeAudio } from '../api/agent';
import { canRecord, captureUtterance, createAudioContext } from './recordSpeech';

// Speech input: the browser's Web Speech recognizer where it works (Chrome,
// Edge, Safari). Elsewhere — every non-Safari browser on iOS, Firefox — we
// record the question ourselves and transcribe it on the backend with Amazon
// Transcribe. Speech output is always the browser's speechSynthesis.
const Recognition = typeof window !== 'undefined'
  ? window.SpeechRecognition || window.webkitSpeechRecognition
  : undefined;
const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
const SILENCE_MS = 8000;

// Chrome/Firefox/Edge/Opera on iOS expose webkitSpeechRecognition, but it
// fails to start there, so skip straight to recording.
const isIOSThirdParty = typeof navigator !== 'undefined' && /CriOS|FxiOS|EdgiOS|OPiOS/.test(navigator.userAgent);
const nativeUsable = !!Recognition && !isIOSThirdParty;

// Strip anything that sounds wrong read aloud: markdown, URLs, emoji.
export function toSpeech(text) {
  return (text || '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[*_#`>|]/g, '')
    .replace(/\p{Extended_Pictographic}/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function pickVoice() {
  const voices = synth?.getVoices() || [];
  return voices.find((v) => v.lang === 'en-GB' && /natural|neural|google/i.test(v.name))
    || voices.find((v) => v.lang === 'en-GB')
    || voices.find((v) => v.lang?.startsWith('en'));
}

export default function useVoice() {
  const [listening, setListening] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [interim, setInterim] = useState('');
  const recRef = useRef(null);
  const utterRef = useRef(null); // held so Chrome doesn't GC it before onend fires
  // Settles whichever listen/speak is in flight. stop() calls these directly
  // because Android Chrome doesn't always fire onend after abort()/cancel().
  const finishListenRef = useRef(null);
  const finishSpeakRef = useRef(null);
  // Recording fallback state
  const useRecordingRef = useRef(!nativeUsable);
  const audioCtxRef = useRef(null);
  const streamRef = useRef(null);
  const cancelCaptureRef = useRef(null);

  const releaseMic = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  // Web Speech path. Resolves { text } or { text: null, error }.
  const listenNative = useCallback(() => new Promise((resolve) => {
    synth?.cancel();

    const rec = new Recognition();
    rec.lang = 'en-GB';
    rec.interimResults = true;
    rec.continuous = false;
    rec.maxAlternatives = 1;

    let finalText = '';
    let error = null;
    let settled = false;
    let silenceTimer;
    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(silenceTimer);
      if (recRef.current === rec) recRef.current = null;
      if (finishListenRef.current === finish) finishListenRef.current = null;
      setListening(false);
      setInterim('');
      resolve({ text: finalText.trim() || null, error });
    };
    // Android Chrome can sit in a session forever when nobody speaks.
    const armSilenceTimer = () => {
      clearTimeout(silenceTimer);
      silenceTimer = setTimeout(() => { error = error || 'no-speech'; rec.abort(); finish(); }, SILENCE_MS);
    };

    rec.onresult = (e) => {
      armSilenceTimer();
      let partial = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalText += r[0].transcript;
        else partial += r[0].transcript;
      }
      setInterim(finalText + partial);
    };
    rec.onerror = (e) => { error = e.error; };
    rec.onend = finish;

    recRef.current = rec;
    finishListenRef.current = finish;
    setListening(true);
    try {
      rec.start();
      armSilenceTimer();
    } catch {
      error = 'start-failed';
      finish();
    }
  }), []);

  // Recording + Amazon Transcribe path. Same result shape as listenNative.
  const listenRecorded = useCallback(async () => {
    synth?.cancel();
    if (!audioCtxRef.current) audioCtxRef.current = createAudioContext();
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') await ctx.resume().catch(() => {});

    if (!streamRef.current?.active) {
      try {
        streamRef.current = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: true, noiseSuppression: true, channelCount: 1 },
        });
      } catch (err) {
        return { text: null, error: err?.name === 'NotAllowedError' ? 'not-allowed' : 'audio-capture' };
      }
    }

    setListening(true);
    const capture = captureUtterance(ctx, streamRef.current, () => setInterim('…'));
    cancelCaptureRef.current = capture.cancel;
    const audio = await capture.promise;
    if (cancelCaptureRef.current === capture.cancel) cancelCaptureRef.current = null;
    setListening(false);
    setInterim('');
    if (!audio) return { text: null, error: 'no-speech' };

    setTranscribing(true);
    try {
      const { text } = await transcribeAudio(audio);
      return text ? { text } : { text: null, error: 'no-speech' };
    } catch {
      return { text: null, error: 'transcribe-failed' };
    } finally {
      setTranscribing(false);
    }
  }, []);

  // Resolves with { text } once the user stops talking, or { text: null, error }.
  const listen = useCallback(async () => {
    if (useRecordingRef.current) {
      return canRecord ? listenRecorded() : { text: null, error: 'unsupported' };
    }
    const result = await listenNative();
    // Recognizer refused to start even though the mic may be allowed — record instead.
    if (!result.text && canRecord && (result.error === 'service-not-allowed' || result.error === 'not-allowed')) {
      useRecordingRef.current = true;
      return listenRecorded();
    }
    return result;
  }, [listenNative, listenRecorded]);

  // Resolves when the utterance finishes or is cancelled.
  const speak = useCallback((text) => new Promise((resolve) => {
    const clean = toSpeech(text);
    if (!synth || !clean) return resolve();
    synth.cancel();

    const u = new SpeechSynthesisUtterance(clean);
    const voice = pickVoice();
    if (voice) u.voice = voice;
    u.lang = voice?.lang || 'en-GB';
    u.rate = 1.05;
    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      if (utterRef.current === u) utterRef.current = null;
      if (finishSpeakRef.current === done) finishSpeakRef.current = null;
      setSpeaking(false);
      resolve();
    };
    u.onend = done;
    u.onerror = done;

    utterRef.current = u;
    finishSpeakRef.current = done;
    setSpeaking(true);
    synth.speak(u);
  }), []);

  // iOS only allows audio started from a user gesture — speaking an empty
  // utterance and creating/resuming the AudioContext inside the tap handler
  // unlocks later async replies and recording.
  const unlock = useCallback(() => {
    if (synth) synth.speak(new SpeechSynthesisUtterance(''));
    if (canRecord) {
      if (!audioCtxRef.current) audioCtxRef.current = createAudioContext();
      audioCtxRef.current?.resume().catch(() => {});
    }
  }, []);

  const stop = useCallback(() => {
    recRef.current?.abort();
    synth?.cancel();
    cancelCaptureRef.current?.();
    finishListenRef.current?.();
    finishSpeakRef.current?.();
    releaseMic();
  }, [releaseMic]);

  useEffect(() => stop, [stop]);

  return {
    supported: nativeUsable || canRecord,
    listening, transcribing, speaking, interim,
    listen, speak, unlock, stop,
  };
}
