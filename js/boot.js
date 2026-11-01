// Boot: BIOS POST (gives us the user gesture audio needs) -> cloud splash -> logon -> desktop + startup sound.
import { initAudio, startup } from './sound.js';
import { loginDialog } from './dialogs.js';
import { closeAll, setBusy } from './windowManager.js';

const params = new URLSearchParams(location.search);
const wait = ms => new Promise(r => setTimeout(r, ms));
const screen = () => document.getElementById('screen');
const overlay = () => document.getElementById('overlay');
export const session = { user: 'ADMIN' };

const POST = [
  'Modular BIOS v4.51PG, An Energy Star Ally',
  'Copyright (C) 1984-98, Shree Computers & Xerox, Nehru Nagar, Bhilai',
  '',
  'PENTIUM-MMX CPU at 233MHz',
  'Memory Test :  32768K OK',
  '',
  'Detecting IDE Primary Master   ... IDE HDD 4.3GB',
  'Detecting IDE Primary Slave    ... None',
  'Detecting IDE Secondary Master ... CD-ROM 24X (tray sticks)',
  'Detecting IDE Secondary Slave  ... None',
  '',
  'Floppy Drive A: 1.44M, 3.5 in.',
  'Keyboard ........ Detected (Enter key loose)',
  'Mouse ........... Detected (ball needs cleaning)',
  'Network Card .... PC 03 [ADMIN]  Session: ACTIVE',
  '',
  'CMOS battery low. Date/Time not set.',
  '',
  'Press F1 to continue, DEL to enter SETUP',
];

export async function boot() {
  screen().classList.add('booting');
  if (params.has('skipboot')) {
    screen().classList.remove('booting');
    window.addEventListener('pointerdown', initAudio, { once: true });
    return;
  }
  await post();
  await splash();
  overlay().className = 'on';
  await wait(500);
  overlay().className = '';
  setBusy(true); await wait(700); setBusy(false);
  await logon();
}

async function logon() {
  const { user } = await loginDialog(session.user);
  session.user = user.toUpperCase();
  screen().classList.remove('booting');
  setBusy(true);
  startup();
  setTimeout(() => setBusy(false), 1400);
}

export async function logOff() {
  closeAll();
  screen().classList.add('booting');
  setBusy(true); await wait(900); setBusy(false);
  await logon();
}

function post() {
  return new Promise(resolve => {
    const ov = overlay();
    ov.className = 'on post';
    ov.innerHTML = '<pre></pre>';
    const pre = ov.firstChild;
    let i = 0;
    const t = setInterval(() => { if (i < POST.length) pre.textContent += POST[i++] + '\n'; else clearInterval(t); }, 70);
    const go = e => {
      if (e.type === 'keydown') { if (['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) return; e.preventDefault(); }
      window.removeEventListener('keydown', go);
      window.removeEventListener('pointerdown', go);
      clearInterval(t);
      initAudio();
      fullscreen();
      ov.className = 'on'; ov.innerHTML = '';
      resolve();
    };
    window.addEventListener('keydown', go);
    window.addEventListener('pointerdown', go);
  });
}

function fullscreen() {
  if (params.has('nofs') || !document.documentElement.requestFullscreen) return;
  document.documentElement.requestFullscreen()
    .then(() => navigator.keyboard && navigator.keyboard.lock && navigator.keyboard.lock(['Tab', 'MetaLeft', 'MetaRight', 'Escape', 'F4']))
    .catch(() => {});
}

/* ---------- Cloud splash: 320x400 bitmap stretched to 4:3, like LOGO.SYS ---------- */
function splash() {
  return new Promise(resolve => {
    const ov = overlay();
    ov.className = 'on splash';
    ov.innerHTML = '<canvas width="320" height="400"></canvas>';
    const ctx = ov.firstChild.getContext('2d');
    drawSky(ctx);
    drawLogo(ctx);
    const t0 = performance.now();
    let raf = requestAnimationFrame(function frame(now) { drawBar(ctx, (now - t0) / 1000); raf = requestAnimationFrame(frame); });
    setTimeout(() => { cancelAnimationFrame(raf); ov.innerHTML = ''; ov.className = 'on'; resolve(); }, 3200);
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
