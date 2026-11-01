// Shell-level easter eggs (A01-A10, B01-B12, E03), global shortcuts (F1, Ctrl+Alt+Del, Ctrl+F6), screensaver (A06).
import { icon } from './icons.js';
import { onRun } from './startMenu.js';
import { launch } from './apps/index.js';
import { messageBox } from './dialogs.js';
import { bark } from './sound.js';
import * as fs from './fileSystem.js';
import * as wm from './windowManager.js';
import { showTipAt } from './taskbar.js';
import { flags, PC03_START, DAYS_RUNNING, hms, wait } from './state.js';
import { bsod, ending2050, seat07Ending } from './apps/endings.js';
import { logRows } from './apps/sessionlog.js';

const booting = () => document.getElementById('screen').classList.contains('booting') || document.getElementById('overlay').classList.contains('on');

/* ---------- Run box ---------- */
const NOTE = (name, content) => ({ name, type: 'file', content });
onRun(key => {
  switch (key) {
    case 'cmd': case 'command': case 'command.com': launch('cmd'); return true;
    case '2050': ending2050(); return true;
    case 'gandhi': launch('notepad', { node: NOTE('GANDHI.TXT', 'GANDHI: artificial agreement engine.\r\n\r\nTested on a hackathon in Bhilai. Results: promising.\r\nParticipants were not informed.\r\n\r\nThis paragraph was not written by a person. If you are wondering whether that is a joke, it is not.\r\n') }); return true;
    case 'help': case 'winhelp': launch('help'); return true;
    case 'tommy': bark(); flags.bhaiyaSmiles = true; window.dispatchEvent(new Event('scz-bhaiya')); setTimeout(() => { flags.bhaiyaSmiles = false; window.dispatchEvent(new Event('scz-bhaiya')); }, 2000); return true;
    case 'xyzzy': xyzzyPixel(); return true;
    case 'bhaiya': { const n = fs.resolve('C:\\BACKROOM$\\BHAIYA_NOTE.txt'); if (n) launch('notepad', { node: n, scrollBottom: true }); return true; }
    case 'seat07': case 'seat_07': seat07Ending(); return true;
    case 'exit': messageBox({ title: 'Run', icon: 'info', text: 'There is no exit. There is only the next session.' }); return true;
    case 'shree': launch('notepad', { node: fs.resolve('C:\\My Documents\\rates_1998.doc') }); return true;
    case 'quiet': messageBox({ title: 'quiet', icon: 'info', text: 'You are in it.' }); return true;
    case 'eipstein': messageBox({ title: 'EIPSTEIN', icon: 'warning', text: 'There is no Mr. Eipstein.\nThere is a procedure.' }); return true;
    case 'mirc': case 'mirc32': if (flags.mircUnlocked) launch('mirc'); else return false; return true;
    case 'calc': launch('calc'); return true;
    case 'control': launch('controlpanel'); return true;
    case 'bsod': bsod(); return true;
    default: return false;
  }
});

/* ---------- B06: one pixel ---------- */
export function xyzzyPixel() {
  let p = document.getElementById('xyzzy');
  if (!p) { p = document.createElement('div'); p.id = 'xyzzy'; document.body.appendChild(p); }
  p.style.background = '#fff';
}

/* ---------- A02: the clock ---------- */
function clockEgg() {
  const clk = document.getElementById('clock');
  let clicks = [];
  clk.addEventListener('click', () => {
    const t = Date.now(); clicks = clicks.filter(x => t - x < 3000).concat(t);
    if (clicks.length < 5) return;
    clicks = [];
    clk.dataset.egg = '1'; clk.textContent = '20:50';
    setTimeout(() => { clk.dataset.egg = '!'; clk.textContent = clk.dataset.real + ' !'; setTimeout(() => { delete clk.dataset.egg; clk.textContent = clk.dataset.real; }, 2000); }, 400);
  });
  clk.addEventListener('dblclick', () => launch('datetime'));
}

/* ---------- A04: the taskbar will not move ---------- */
function taskbarEgg() {
  const tb = document.getElementById('taskbar');
  tb.addEventListener('pointerdown', e => {
    if (e.button !== 0 || e.target.closest('button, .tray, .ql')) return;
    const sx = e.clientX, sy = e.clientY;
    const mv = ev => { if (Math.abs(ev.clientY - sy) + Math.abs(ev.clientX - sx) > 20) { done(); showTipAt(ev.clientX, ev.clientY - 40, 'This taskbar is where it belongs.'); } };
    const done = () => { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', done); };
    window.addEventListener('pointermove', mv); window.addEventListener('pointerup', done);
  });
}

/* ---------- A07: "Shut Down?" ---------- */
function shutdownHover() {
  let t = 0;
  document.getElementById('menus').addEventListener('pointerover', e => {
    const it = e.target.closest('.menu-item');
    clearTimeout(t);
    if (!it || !/^Shut Down\.\.\.$/.test(it.textContent.trim())) return;
    const lab = it.querySelector('.mi-label');
    t = setTimeout(() => { const old = lab.innerHTML; lab.innerHTML = 'Sh<u>u</u>t Down?'; setTimeout(() => { lab.innerHTML = old; }, 350); }, 5000);
  });
}

/* ---------- A08: Konami ---------- */
function konami() {
  const K = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let k = 0;
  document.addEventListener('keydown', e => {
    if (e.target.closest && e.target.closest('input, textarea')) return;
    k = e.key === K[k] ? k + 1 : (e.key === K[0] ? 1 : 0);
    if (k < K.length) return;
    k = 0;
    const imgs = [...document.querySelectorAll('#icons .icon img')], saved = imgs.map(i => i.src);
    imgs.forEach(i => { i.src = icon('floppy', 32); });
    setTimeout(() => imgs.forEach((i, j) => { i.src = saved[j]; }), 3000);
  });
}

/* ---------- A09: there is no outside ---------- */
window.addEventListener('scz-offscreen', e => showTipAt(e.detail.x, e.detail.y, 'There is no outside.', true));

/* ---------- A10: we are watching ---------- */
function watching() {
  let clicks = [];
  document.getElementById('icons').addEventListener('pointerdown', e => {
    if (e.target.closest('.icon')) return;
    const t = Date.now(); clicks = clicks.filter(x => t - x < 2500).concat(t);
    if (clicks.length < 10) return;
    clicks = [];
    const m = document.createElement('div'); m.className = 'watching'; m.textContent = 'we are watching';
    document.getElementById('screen').appendChild(m);
    setTimeout(() => m.remove(), 1000);
  });
}

/* ---------- E03: cricket TV ---------- */
function cricketTV() {
  const tv = document.createElement('div');
  tv.className = 'tv-widget';
  tv.innerHTML = '<div class="tv-screen"><span>DD SPORTS</span><b>IND 98/2</b><span>(34.2 ov)</span></div><div class="tv-knobs"><i></i><i></i></div>';
  document.getElementById('desktop').appendChild(tv);
  tv.addEventListener('click', e => showTipAt(e.clientX, e.clientY + 18, 'Match in progress since 1998.'));
}

/* ---------- A05: a second cursor ---------- */
let lastInput = Date.now();
['pointermove', 'keydown', 'pointerdown', 'wheel'].forEach(ev => window.addEventListener(ev, () => { lastInput = Date.now(); ghostArmed = true; stopSaver(); }, { passive: true }));
let ghostArmed = true;
async function ghostCursor() {
  const m = getComputedStyle(document.documentElement).getPropertyValue('--cur-arrow').match(/url\("?([^")]+)"?\)/);
  if (!m) return;
  const c = document.createElement('img');
  c.src = m[1]; c.className = 'ghost-cursor';
  let x = innerWidth - 40, y = innerHeight - 70;
  document.body.appendChild(c);
  for (let i = 0; i < 40; i++) { x -= 3 + Math.random() * 4; y -= 1 + Math.random() * 3; c.style.left = x + 'px'; c.style.top = y + 'px'; await wait(100); }
  c.remove();
}

/* ---------- A06: screensaver (Starfield + a live Session Log) ---------- */
let saver = null;
function startSaver() {
  if (saver || booting()) return;
  const el = document.createElement('div'); el.className = 'saver';
  el.innerHTML = '<canvas></canvas><div class="window active saver-log"><div class="title-bar"><span class="title-text">Session Log</span></div><div class="window-body"><div class="lv"><table class="grid"><tbody></tbody></table></div></div></div>';
  document.body.appendChild(el);
  const cv = el.querySelector('canvas'), x = cv.getContext('2d');
  cv.width = innerWidth; cv.height = innerHeight;
  const stars = Array.from({ length: 220 }, () => ({ x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2, z: Math.random() }));
  const win = el.querySelector('.saver-log'), tb = el.querySelector('tbody');
  let wx = 100, wy = 80, dx = 1.2, dy = 0.9, raf = 0, last = 0;
  const frame = t => {
    x.fillStyle = '#000'; x.fillRect(0, 0, cv.width, cv.height);
    x.fillStyle = '#fff';
    for (const s of stars) {
      s.z -= 0.006; if (s.z <= 0.01) { s.x = (Math.random() - 0.5) * 2; s.y = (Math.random() - 0.5) * 2; s.z = 1; }
      const px = cv.width / 2 + s.x / s.z * cv.width / 2, py = cv.height / 2 + s.y / s.z * cv.height / 2, sz = s.z < 0.3 ? 2 : 1;
      x.fillRect(px | 0, py | 0, sz, sz);
    }
    wx += dx; wy += dy;
    if (wx < 0 || wx > innerWidth - 300) dx = -dx;
    if (wy < 0 || wy > innerHeight - 140) dy = -dy;
    win.style.left = (wx | 0) + 'px'; win.style.top = (wy | 0) + 'px';
    if (t - last > 1000) {
      last = t;
      const s = Math.floor((Date.now() - PC03_START) / 1000);
      tb.innerHTML = `<tr class="eip"><td>03/03/1998</td><td>MR. EIPSTEIN</td><td>STILL RUNNING ${DAYS_RUNNING()}d ${hms(s % 86400)}</td></tr>` + logRows.slice(-4).map(r => `<tr><td>${r.date}</td><td>${r.cust}</td><td>${r.dur}</td></tr>`).join('');
    }
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
  saver = { el, stop: () => { cancelAnimationFrame(raf); el.remove(); } };
}
function stopSaver() { if (saver) { saver.stop(); saver = null; } }
setInterval(() => {
  const idle = (Date.now() - lastInput) / 1000;
  if (idle > 60 && ghostArmed && !booting()) { ghostArmed = false; ghostCursor(); }
  if (idle > 180) startSaver();
}, 1000);

/* ---------- global shortcuts ---------- */
document.addEventListener('keydown', e => {
  if (booting()) return;
  if (e.key === 'F1') { e.preventDefault(); launch('help'); }
  if (e.ctrlKey && e.altKey && (e.key === 'Delete' || e.key === 'Del')) { e.preventDefault(); launch('closeprogram'); }
  if (e.ctrlKey && e.key === 'F6') { e.preventDefault(); const ws = wm.list().filter(w => w.taskbar); if (ws.length) { const i = ws.indexOf(wm.getActive()); wm.focus(ws[(i + 1) % ws.length]); } }
  if (e.altKey && e.code === 'Space') { const a = wm.getActive(); if (a) { e.preventDefault(); const r = a.el.getBoundingClientRect(); wm.systemMenu(a, r.left + 4, r.top + 22); } }
});

export function initEggs() {
  clockEgg(); taskbarEgg(); shutdownHover(); konami(); watching(); cricketTV();
  if (flags.mircUnlocked) import('./apps/mirc.js').then(m => m.unlockMirc());
}
