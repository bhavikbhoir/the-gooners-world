import { useState, useRef, useCallback, useEffect } from 'react';

// Browser-native speech: Web Speech API recognition (Chrome, Edge, Safari)
// for input, speechSynthesis for output. No audio ever leaves the browser
// except through the vendor's own recognition service.
const Recognition = typeof window !== 'undefined'
  ? window.SpeechRecognition || window.webkitSpeechRecognition
  : undefined;
const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
const SILENCE_MS = 8000;

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
  const [speaking, setSpeaking] = useState(false);
  const [interim, setInterim] = useState('');
  const recRef = useRef(null);
  const utterRef = useRef(null); // held so Chrome doesn't GC it before onend fires
  // Settles whichever listen/speak is in flight. stop() calls these directly
  // because Android Chrome doesn't always fire onend after abort()/cancel().
  const finishListenRef = useRef(null);
  const finishSpeakRef = useRef(null);

  // Resolves with { text } once the user stops talking, or { text: null, error }.
  const listen = useCallback(() => new Promise((resolve) => {
    if (!Recognition) return resolve({ text: null, error: 'unsupported' });
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

  // iOS Safari only allows speech started from a user gesture — speaking an
  // empty utterance inside the tap handler unlocks later async replies.
  const unlock = useCallback(() => {
    if (synth) synth.speak(new SpeechSynthesisUtterance(''));
  }, []);

  const stop = useCallback(() => {
    recRef.current?.abort();
    synth?.cancel();
    finishListenRef.current?.();
    finishSpeakRef.current?.();
  }, []);

  useEffect(() => stop, [stop]);

  return { supported: !!Recognition, listening, speaking, interim, listen, speak, unlock, stop };
}
