// Web Audio API Synth Engine for Hindi 90s Highway Radio

let audioCtx = null;
let currentSongInterval = null;
let isAudioPlaying = false;
let analyserNode = null;
let masterGainNode = null;

export function initAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
      masterGainNode = audioCtx.createGain();
      masterGainNode.gain.setValueAtTime(0.35, audioCtx.currentTime);

      analyserNode = audioCtx.createAnalyser();
      analyserNode.fftSize = 64;

      masterGainNode.connect(analyserNode);
      analyserNode.connect(audioCtx.destination);
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setMasterVolume(volume) {
  if (masterGainNode && audioCtx) {
    // volume is between 0 and 1
    masterGainNode.gain.setValueAtTime(Math.max(0, Math.min(1, volume * 0.4)), audioCtx.currentTime);
  }
}

export function playNote(freq, type = 'triangle', duration = 0.35, delay = 0) {
  if (!audioCtx) return;

  const now = audioCtx.currentTime + delay;

  // Lead Oscillator (Harmonium / Synth Flute)
  const osc = audioCtx.createOscillator();
  const noteGain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);

  // Gentle attack and warm decay
  noteGain.gain.setValueAtTime(0.001, now);
  noteGain.gain.exponentialRampToValueAtTime(0.28, now + 0.05);
  noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  // Subtle vibrato for Bollywood acoustic feeling
  const vibrato = audioCtx.createOscillator();
  const vibratoGain = audioCtx.createGain();
  vibrato.frequency.setValueAtTime(5.5, now);
  vibratoGain.gain.setValueAtTime(3.0, now);
  vibrato.connect(osc.frequency);
  vibrato.start(now);
  vibrato.stop(now + duration);

  osc.connect(noteGain);
  noteGain.connect(masterGainNode);

  osc.start(now);
  osc.stop(now + duration);

  // Bass accompaniment pulse
  const bassOsc = audioCtx.createOscillator();
  const bassGain = audioCtx.createGain();
  bassOsc.type = 'sine';
  bassOsc.frequency.setValueAtTime(freq / 2, now);

  bassGain.gain.setValueAtTime(0.001, now);
  bassGain.gain.exponentialRampToValueAtTime(0.18, now + 0.04);
  bassGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.9);

  bassOsc.connect(bassGain);
  bassGain.connect(masterGainNode);

  bassOsc.start(now);
  bassOsc.stop(now + duration * 0.9);
}

export function startSongPlayback(song, onProgressTick) {
  initAudioContext();
  stopSongPlayback();

  isAudioPlaying = true;
  const notes = song.notes || [392, 440, 493, 523, 493, 440, 392];
  const stepTime = 60 / (song.tempo || 105);
  let noteIndex = 0;
  let elapsedSec = 0;

  // Immediate first note
  playNote(notes[0], 'triangle', stepTime * 0.9);

  currentSongInterval = setInterval(() => {
    if (!isAudioPlaying) return;

    noteIndex = (noteIndex + 1) % notes.length;
    const freq = notes[noteIndex];
    playNote(freq, 'triangle', stepTime * 0.9);

    elapsedSec += stepTime;
    if (onProgressTick) {
      onProgressTick(elapsedSec);
    }
  }, stepTime * 1000);
}

export function stopSongPlayback() {
  isAudioPlaying = false;
  if (currentSongInterval) {
    clearInterval(currentSongInterval);
    currentSongInterval = null;
  }
}

export function getAudioVisualizerData() {
  if (!analyserNode) {
    return [30, 45, 60, 40, 75, 50, 65, 35];
  }
  const dataArray = new Uint8Array(analyserNode.frequencyBinCount);
  analyserNode.getByteFrequencyData(dataArray);
  return Array.from(dataArray.slice(0, 8)).map(val => Math.max(15, (val / 255) * 100));
}
