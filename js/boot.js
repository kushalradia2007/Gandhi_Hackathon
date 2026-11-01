// Boot: BIOS POST (gives us the user gesture audio needs) -> cloud splash -> logon -> desktop + startup sound.
import { initAudio, startup } from './sound.js';
import { closeAll, setBusy } from './windowManager.js';
import { sess } from './state.js';

const params = new URLSearchParams(location.search);
const wait = ms => new Promise(r => setTimeout(r, ms));
const screen = () => document.getElementById('screen');
const overlay = () => document.getElementById('overlay');
export const session = { user: 'GUEST' };

const POST = [
  'Award Modular BIOS v4.51PG, An Energy Star Ally',
  'Copyright (C) 1984-98, Award Software, Inc.',
  '',
  'Pentium II 350 MHz',
  'Memory Test: 65536K OK',
  '',
  'Award Plug and Play BIOS Extension v1.0A',
  'Copyright (C) 1998, Award Software, Inc.',
  '',
  'Detecting IDE Primary Master  ... None',
  'Detecting IDE Primary Slave   ... None',
  'Detecting IDE Secondary Master ... CD-ROM',
  'Detecting IDE Secondary Slave  ... None',
  '',
  'Press DEL to enter SETUP',
  '03/03/98-i440BX-8671-2A69KA1AC-00',
];

let skipped = false, onSkip = null;
function armSkip() {
  const go = e => {
    if (e.type === 'keydown' && ['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) return;
    if (e.type === 'keydown' && (e.key === 'Delete' || e.key === 'Del') && document.getElementById('overlay').classList.contains('post')) { biosSetup(); return; }
    initAudio();
    if (!skipped) { skipped = true; onSkip && onSkip(); }
  };
  window.addEventListener('keydown', go, true);
  window.addEventListener('pointerdown', go, true);
  return () => { window.removeEventListener('keydown', go, true); window.removeEventListener('pointerdown', go, true); };
}
const step = ms => new Promise(r => { const t = setTimeout(r, ms); onSkip = () => { clearTimeout(t); r(); }; });

export async function boot() {
  const first = () => initAudio();
  window.addEventListener('pointerdown', first, { once: true, capture: true });
  window.addEventListener('keydown', first, { once: true, capture: true });
  if (params.has('skipboot') || sess.get('booted')) { desktopUp(false); return; }
  sess.set('booted', true);
  screen().classList.add('booting');
  const disarm = armSkip();
  const ov = overlay();
  const seq = async () => {
    ov.className = 'on'; ov.innerHTML = ''; if (await stepOr(500)) return;
    ov.className = 'on post'; ov.innerHTML = '<pre></pre><div class="energy"><b>EPA</b> POLLUTION PREVENTER</div>';
    const pre = ov.querySelector('pre');
    for (let i = 0; i < POST.length; i++) { pre.textContent += POST[i] + '\n'; if (await stepOr(1000 / POST.length)) return; }
    ov.className = 'on post star'; if (await stepOr(400)) return;
    ov.className = 'on'; ov.innerHTML = ''; if (await stepOr(200)) return;
    if (await splash()) return;
    ov.className = 'on'; ov.innerHTML = ''; if (await stepOr(300)) return;
    return true;
  };
  const completed = await seq();
  disarm();
  desktopUp(!!completed && !skipped);
}
async function stepOr(ms) { await step(ms); return skipped; }

function desktopUp(chime) {
  const ov = overlay(); ov.className = ''; ov.innerHTML = '';
  screen().classList.remove('booting');
  session.user = 'GUEST';
  if (chime) setTimeout(() => startup(), 500);
}

function biosSetup() {
  const ov = overlay();
  const keep = ov.innerHTML, cls = ov.className;
  ov.className = 'on bios-setup';
  ov.innerHTML = '<pre>               CMOS SETUP UTILITY\n            AWARD SOFTWARE, INC.\n\n  STANDARD CMOS SETUP        INTEGRATED PERIPHERALS\n  BIOS FEATURES SETUP        SUPERVISOR PASSWORD\n  CHIPSET FEATURES SETUP     USER PASSWORD\n  POWER MANAGEMENT SETUP     IDE HDD AUTO DETECTION\n  PNP/PCI CONFIGURATION      SAVE &amp; EXIT SETUP\n  LOAD BIOS DEFAULTS         EXIT WITHOUT SAVING\n\n  Session lock (PC 03) ..... Enabled  [cannot change]\n\n  Esc : Quit        F10 : Save &amp; Exit Setup</pre>';
  setTimeout(() => { if (ov.classList.contains('bios-setup')) { ov.className = cls; ov.innerHTML = keep; } }, 1000);
}

export async function logOff() {
  closeAll();
  const ov = overlay(); ov.className = 'on shut1'; ov.innerHTML = '<div class="shut-box"><p>Windows is logging off...</p></div>';
  setBusy(true); await wait(1200); setBusy(false);
  ov.className = ''; ov.innerHTML = '';
  const { addLog } = await import('./apps/sessionlog.js');
  const d = new Date();
  addLog({ date: d.toLocaleDateString('en-GB'), time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), cust: 'GUEST', pc: 'PC 03', dur: 'LOGGED OFF \u2014 IMMEDIATELY LOGGED BACK IN' });
  startup();
}

/* ---------- Cloud splash: 320x400 bitmap stretched to 4:3, like LOGO.SYS ---------- */
function splash() {
  return new Promise(resolve => {
    const ov = overlay();
    ov.className = 'on splash';
    ov.innerHTML = '<canvas width="320" height="400"></canvas><div class="splash-copy">Copyright © 1981-1998 Microsoft Corporation</div><div class="splash-oem">SHREE CYBER ZONE — PC 03 (ADMIN)</div>';
    const ctx = ov.firstChild.getContext('2d');
    drawSky(ctx);
    drawLogo(ctx);
    const t0 = performance.now();
    let raf = requestAnimationFrame(function frame(now) { drawBar(ctx, (now - t0) / 1000); raf = requestAnimationFrame(frame); });
    const t = setTimeout(done, 1600);
    function done() { clearTimeout(t); cancelAnimationFrame(raf); ov.innerHTML = ''; ov.className = 'on'; resolve(skipped); }
    onSkip = done;
  });
}

function hash(x, y) {
  let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
function vnoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fbm(x, y) { let s = 0, a = 0.5, f = 1; for (let i = 0; i < 5; i++) { s += a * vnoise(x * f, y * f); f *= 2; a *= 0.5; } return s; }

function drawSky(ctx) {
  const W = 320, H = 400, im = ctx.createImageData(W, H), d = im.data;
  const bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const k = y / H;
    let r = 30 + 100 * k, g = 80 + 100 * k, b = 190 + 50 * k;
    const n = fbm(x * 0.6 / 46 + 3, y / 46);
    const c = Math.min(1, Math.max(0, (n - 0.47) / 0.22));
    const cc = c * c * (3 - 2 * c);
    r += (250 - r) * cc; g += (250 - g) * cc; b += (255 - b) * cc;
    const th = (bayer[(y & 3) * 4 + (x & 3)] / 16 - 0.5) * 24;
    const q = v => Math.max(0, Math.min(255, Math.round((v + th) / 24) * 24));
    const o = (y * W + x) * 4;
    d[o] = q(r); d[o + 1] = q(g); d[o + 2] = q(b); d[o + 3] = 255;
  }
  ctx.putImageData(im, 0, 0);
}

function drawLogo(ctx) {
  ctx.save();
  ctx.translate(160, 0);
  ctx.scale(0.6, 1); // canvas pixels display ~1.67x wide
  const fx = -170, fy = 152, P = 30;
  const pane = (x, y, col) => {
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.moveTo(x, y + 4);
    ctx.quadraticCurveTo(x + P / 2, y - 3, x + P, y + 2);
    ctx.lineTo(x + P - 3, y + P + 1);
    ctx.quadraticCurveTo(x + P / 2 - 3, y + P - 5, x - 3, y + P + 3);
    ctx.closePath();
    ctx.fill();
  };
  pane(fx + 8, fy, '#e8401c');
  pane(fx + 8 + P + 5, fy - 2, '#3caa3c');
  pane(fx + 3, fy + P + 6, '#2c64d8');
  pane(fx + 3 + P + 5, fy + P + 4, '#f8c818');
  ctx.fillStyle = '#000';
  for (let i = 0; i < 5; i++) ctx.fillRect(fx - 12 - i * 9, fy + 8 + i * 11, 6 - i, 5 - (i >> 1));
  ctx.font = 'bold 14px Arial, sans-serif';
  ctx.fillText('Microsoft', -86, 172);
  ctx.font = 'bold 46px Arial, sans-serif';
  ctx.fillText('Windows', -88, 214);
  const w = ctx.measureText('Windows').width;
  ctx.fillStyle = '#e8501c';
  ctx.fillText('98', -88 + w + 10, 214);
  ctx.restore();
}

function drawBar(ctx, t) {
  for (let x = 0; x < 320; x++) {
    const c = 0.5 + 0.5 * Math.sin(2 * Math.PI * (x / 320 - t * 0.7));
    ctx.fillStyle = `rgb(${Math.round(20 + 90 * c)},${Math.round(40 + 140 * c)},${Math.round(160 + 95 * c)})`;
    ctx.fillRect(x, 386, 1, 14);
  }
}
