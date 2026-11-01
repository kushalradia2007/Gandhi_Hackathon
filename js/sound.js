// Synthesised system sounds (Web Audio). Nothing here is a sample. Everything is muteable.
let ctx = null, master = null, verb = null, amb = null;
const store = (k, v) => { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } return v; };
let muted = store('scz.muted') === '1';
let ambienceOn = false;
const reduced = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initAudio() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = muted ? 0 : 0.5; master.connect(ctx.destination);
    verb = ctx.createConvolver(); verb.buffer = impulse(2.4, 3);
    const vg = ctx.createGain(); vg.gain.value = 0.35; verb.connect(vg); vg.connect(master);
  }
  if (ctx.state === 'suspended') ctx.resume();
}
const ready = () => ctx && ctx.state === 'running' && !muted;

export const isMuted = () => muted;
export function setMuted(m) {
  muted = !!m; store('scz.muted', muted ? '1' : '0');
  if (master) master.gain.value = muted ? 0 : 0.5;
}
export const isAmbience = () => ambienceOn;

function impulse(sec, decay) {
  const n = Math.floor(ctx.sampleRate * sec), b = ctx.createBuffer(2, n, ctx.sampleRate);
  for (let c = 0; c < 2; c++) { const d = b.getChannelData(c); for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, decay); }
  return b;
}
function voice({ f, t = 0, dur = 0.5, type = 'sine', gain = 0.2, attack = 0.005, wet = 0.3, to = null }) {
  const t0 = ctx.currentTime + t, o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t0);
  if (to) o.frequency.exponentialRampToValueAtTime(to, t0 + dur);
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
function noise(dur, freq, gain, t = 0, type = 'bandpass', q = 1) {
  const n = Math.floor(ctx.sampleRate * dur), b = ctx.createBuffer(1, n, ctx.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3);
  const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
  s.buffer = b; f.type = type; f.frequency.value = freq; f.Q.value = q; g.gain.value = gain;
  s.connect(f); f.connect(g); g.connect(master); s.start(ctx.currentTime + t);
}

/** Default beep / info (ding.wav role) */
export function ding() { if (ready()) bell(1318.5, 0, 0.9, 0.2); }
/** Asterisk / question (chord.wav role) */
export function chord() {
  if (!ready()) return;
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => { voice({ f, t: i * 0.012, dur: 1.1, type: 'triangle', gain: 0.07 }); voice({ f: f * 2, t: i * 0.012, dur: 0.5, gain: 0.03 }); });
}
/** Exclamation: two-tone */
export function warnBeep() { if (!ready()) return; voice({ f: 880, dur: 0.18, type: 'triangle', gain: 0.12 }); voice({ f: 1174.7, t: 0.16, dur: 0.35, type: 'triangle', gain: 0.12 }); }
/** Critical stop: harsh */
export function errorBeep() { if (!ready()) return; voice({ f: 220, dur: 0.45, type: 'square', gain: 0.06, wet: 0.1 }); voice({ f: 233, dur: 0.45, type: 'square', gain: 0.05, wet: 0.1 }); bell(659, 0, 0.6, 0.08); }
/** Short dry click */
export function click() { if (ready()) noise(0.012, 2500, 0.3); }
/** One bark, not three */
export function bark() {
  if (!ready()) return;
  voice({ f: 520, to: 210, dur: 0.22, type: 'sawtooth', gain: 0.18, attack: 0.01, wet: 0.15 });
  noise(0.18, 900, 0.25, 0, 'bandpass', 2);
}
/** Dial-up handshake (~3.5 s) */
export function modem() {
  if (!ready()) return;
  const t = (f, a, b, type = 'sine', gain = 0.05) => voice({ f, t: a, dur: b - a, type, gain, attack: 0.01, wet: 0 });
  t(350, 0, 0.7); t(440, 0, 0.7);
  [0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5].forEach((a, i) => t([697, 770, 852, 941][i % 4] + (i % 2) * 300, a, a + 0.08, 'sine', 0.06));
  t(2100, 1.8, 2.5); t(1300, 2.5, 2.8, 'square', 0.03); t(2250, 2.8, 3.1, 'sawtooth', 0.03);
  t(980, 3.1, 3.6, 'square', 0.03); t(1650, 3.1, 3.6, 'square', 0.03);
  noise(0.6, 3000, 0.08, 3.1, 'highpass');
}
/** Printer head whir */
export function printWhir() {
  if (!ready()) return;
  for (let i = 0; i < 6; i++) { voice({ f: 180, to: 260, t: i * 0.3, dur: 0.25, type: 'sawtooth', gain: 0.03, wet: 0 }); noise(0.2, 1800, 0.06, i * 0.3); }
}
/** Paper jam: grind, then silence */
export function jam() {
  if (!ready()) return;
  voice({ f: 90, to: 40, dur: 0.9, type: 'sawtooth', gain: 0.12, attack: 0.02, wet: 0 });
  noise(0.9, 400, 0.4, 0, 'lowpass');
}

/** Original startup theme: warm Eb major pad + chime arpeggio, ~5 s */
export function startup() {
  if (!ready() || reduced()) return;
  const now = ctx.currentTime;
  const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.Q.value = 0.7;
  lp.frequency.setValueAtTime(250, now);
  lp.frequency.exponentialRampToValueAtTime(2600, now + 2.2);
  lp.frequency.exponentialRampToValueAtTime(800, now + 5.5);
  const pg = ctx.createGain();
  pg.gain.setValueAtTime(0, now);
  pg.gain.linearRampToValueAtTime(0.1, now + 1.0);
  pg.gain.setValueAtTime(0.1, now + 3.0);
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
  voice({ f: 77.78, dur: 5, gain: 0.12, attack: 0.8, wet: 0.2 });
  [932.33, 1244.5, 1568, 1864.7].forEach((f, i) => bell(f, 0.3 + i * 0.2, 2.5, 0.07));
  bell(1396.9, 1.7, 2.5, 0.05); bell(1174.7, 1.72, 2.5, 0.04);
  [1244.5, 1568, 2489].forEach(f => bell(f, 2.4, 3.5, 0.05));
}

/** Café ambience: ceiling fan whir + tube TV hum. Off by default. */
export function setAmbience(on) {
  ambienceOn = !!on;
  if (!ctx) return;
  if (amb) { amb.forEach(n => { try { n.stop(); } catch (e) { /* stopped */ } }); amb = null; }
  if (!ambienceOn) return;
  const n = ctx.sampleRate * 2, b = ctx.createBuffer(1, n, ctx.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  const fan = ctx.createBufferSource(); fan.buffer = b; fan.loop = true;
  const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 380;
  const fg = ctx.createGain(); fg.gain.value = 0.05;
  const lfo = ctx.createOscillator(), lg = ctx.createGain(); lfo.frequency.value = 3.1; lg.gain.value = 0.02; lfo.connect(lg); lg.connect(fg.gain);
  fan.connect(lp); lp.connect(fg); fg.connect(master);
  const hum = ctx.createOscillator(), hg = ctx.createGain(); hum.frequency.value = 50; hum.type = 'sine'; hg.gain.value = 0.015; hum.connect(hg); hg.connect(master);
  const whine = ctx.createOscillator(), wg = ctx.createGain(); whine.frequency.value = 15734; wg.gain.value = 0.002; whine.connect(wg); wg.connect(master);
  [fan, lfo, hum, whine].forEach(x => x.start());
  amb = [fan, lfo, hum, whine];
}
