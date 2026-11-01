// Synthesised system sounds (Web Audio). Nothing here is a sample.
let ctx = null, master = null, verb = null;

export function initAudio() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = 0.6; master.connect(ctx.destination);
    verb = ctx.createConvolver(); verb.buffer = impulse(2.4, 3);
    const vg = ctx.createGain(); vg.gain.value = 0.35; verb.connect(vg); vg.connect(master);
  }
  if (ctx.state === 'suspended') ctx.resume();
}
const ready = () => ctx && ctx.state === 'running';

function impulse(sec, decay) {
  const n = Math.floor(ctx.sampleRate * sec), b = ctx.createBuffer(2, n, ctx.sampleRate);
  for (let c = 0; c < 2; c++) { const d = b.getChannelData(c); for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, decay); }
  return b;
}

function voice({ f, t = 0, dur = 0.5, type = 'sine', gain = 0.2, attack = 0.005, wet = 0.3 }) {
  const t0 = ctx.currentTime + t, o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type; o.frequency.value = f;
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g); g.connect(master);
  if (wet) { const s = ctx.createGain(); s.gain.value = wet; g.connect(s); s.connect(verb); }
  o.start(t0); o.stop(t0 + dur + 0.05);
}
function bell(f, t, dur, gain) {
  voice({ f, t, dur, gain });
  voice({ f: f * 2.76, t, dur: dur * 0.4, gain: gain * 0.35 });
  voice({ f: f * 5.4, t, dur: dur * 0.15, gain: gain * 0.12 });
}
function noise(dur, freq, gain, t = 0, type = 'bandpass') {
  const n = Math.floor(ctx.sampleRate * dur), b = ctx.createBuffer(1, n, ctx.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3);
  const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
  s.buffer = b; f.type = type; f.frequency.value = freq; g.gain.value = gain;
  s.connect(f); f.connect(g); g.connect(master); s.start(ctx.currentTime + t);
}

/** Default beep (ding.wav role) */
export function ding() { if (ready()) bell(1318.5, 0, 0.9, 0.22); }
/** Asterisk / Exclamation / Critical Stop (chord.wav role) */
export function chord() {
  if (!ready()) return;
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
    voice({ f, t: i * 0.012, dur: 1.1, type: 'triangle', gain: 0.08 });
    voice({ f: f * 2, t: i * 0.012, dur: 0.5, gain: 0.03 });
  });
}
/** IE "start navigation" click / physical clicks */
export function click() { if (ready()) noise(0.012, 2500, 0.35); }

/** Original startup theme: warm Eb major pad + chime arpeggio, ~5 s */
export function startup() {
  if (!ready()) return;
  const now = ctx.currentTime;
  const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.Q.value = 0.7;
  lp.frequency.setValueAtTime(250, now);
  lp.frequency.exponentialRampToValueAtTime(2600, now + 2.2);
  lp.frequency.exponentialRampToValueAtTime(800, now + 5.5);
  const pg = ctx.createGain();
  pg.gain.setValueAtTime(0, now);
  pg.gain.linearRampToValueAtTime(0.11, now + 1.0);
  pg.gain.setValueAtTime(0.11, now + 3.0);
  pg.gain.exponentialRampToValueAtTime(0.0001, now + 6);
  lp.connect(pg); pg.connect(master);
  const ps = ctx.createGain(); ps.gain.value = 0.5; pg.connect(ps); ps.connect(verb);
  [155.56, 233.08, 311.13, 392.0, 466.16].forEach((f, i) => {
    for (const dt of [-7, 7]) {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = dt;
      g.gain.value = 0.16 / (1 + i * 0.3);
      o.connect(g); g.connect(lp); o.start(now); o.stop(now + 6.1);
    }
  });
  voice({ f: 77.78, dur: 5, gain: 0.14, attack: 0.8, wet: 0.2 });
  [932.33, 1244.5, 1568, 1864.7].forEach((f, i) => bell(f, 0.3 + i * 0.2, 2.5, 0.08));
  bell(1396.9, 1.7, 2.5, 0.06); bell(1174.7, 1.72, 2.5, 0.05);
  [1244.5, 1568, 2489].forEach(f => bell(f, 2.4, 3.5, 0.06));
}
