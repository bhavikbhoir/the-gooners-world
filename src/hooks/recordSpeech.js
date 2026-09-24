// Records one spoken question from the mic and returns it as 16 kHz mono
// 16-bit PCM (base64) for the backend's Amazon Transcribe endpoint. Used where
// the browser has no working Web Speech recognizer — notably every non-Safari
// browser on iOS, where the recognizer exists but refuses to start.

const AudioCtx = typeof window !== 'undefined' ? window.AudioContext || window.webkitAudioContext : undefined;

export const canRecord = !!(AudioCtx && typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia);

const TARGET_RATE = 16000;
const END_SILENCE_S = 1.2; // stop this long after the user stops talking
const NO_SPEECH_S = 8; // give up if nothing is said
const MAX_S = 15; // hard cap (backend accepts up to 20s)
const MIN_THRESHOLD = 0.015; // RMS level that counts as speech

export function createAudioContext() {
  return AudioCtx ? new AudioCtx() : null;
}

// Averages each block of input samples down to the target rate.
export function downsample(samples, fromRate, toRate = TARGET_RATE) {
  if (fromRate === toRate) return samples;
  const ratio = fromRate / toRate;
  const out = new Float32Array(Math.floor(samples.length / ratio));
  for (let i = 0; i < out.length; i++) {
    const start = Math.floor(i * ratio);
    const end = Math.min(Math.floor((i + 1) * ratio), samples.length);
    let sum = 0;
    for (let j = start; j < end; j++) sum += samples[j];
    out[i] = sum / Math.max(1, end - start);
  }
  return out;
}

export function toPcm16Base64(samples) {
  const bytes = new Uint8Array(samples.length * 2);
  const view = new DataView(bytes.buffer);
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  let binary = '';
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

/**
 * Listens on `stream` until the user finishes a sentence. Returns
 * { promise, cancel }; the promise resolves with base64 PCM, or null if
 * nothing was said or it was cancelled.
 */
export function captureUtterance(ctx, stream, onSpeechStart) {
  const source = ctx.createMediaStreamSource(stream);
  // ScriptProcessor is deprecated but, unlike AudioWorklet, needs no separate
  // module file and works in every browser this fallback targets.
  const proc = ctx.createScriptProcessor(4096, 1, 1);
  const rate = ctx.sampleRate;
  const chunks = [];
  let total = 0;
  let heard = false;
  let silent = 0;
  let noiseFloor = null;
  let resolve;
  const promise = new Promise((r) => { resolve = r; });

  const finish = (keep) => {
    if (!resolve) return;
    proc.onaudioprocess = null;
    source.disconnect();
    proc.disconnect();
    const done = resolve;
    resolve = null;
    if (!keep) return done(null);
    const all = new Float32Array(total);
    let offset = 0;
    for (const c of chunks) { all.set(c, offset); offset += c.length; }
    done(toPcm16Base64(downsample(all, rate)));
  };

  proc.onaudioprocess = (e) => {
    const data = e.inputBuffer.getChannelData(0);
    chunks.push(new Float32Array(data));
    total += data.length;

    let sum = 0;
    for (let i = 0; i < data.length; i++) sum += data[i] * data[i];
    const rms = Math.sqrt(sum / data.length);
    // The first block sets the room's noise floor; speech must clear it.
    if (noiseFloor === null) noiseFloor = rms;
    const threshold = Math.max(MIN_THRESHOLD, noiseFloor * 3);

    if (rms > threshold) {
      if (!heard) onSpeechStart?.();
      heard = true;
      silent = 0;
    } else {
      silent += data.length;
    }

    const elapsed = total / rate;
    if (heard && silent / rate >= END_SILENCE_S) finish(true);
    else if (!heard && elapsed >= NO_SPEECH_S) finish(false);
    else if (elapsed >= MAX_S) finish(heard);
  };

  source.connect(proc);
  proc.connect(ctx.destination); // Chrome only runs the processor when it's connected
  return { promise, cancel: () => finish(false) };
}
