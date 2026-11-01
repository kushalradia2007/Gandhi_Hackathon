// Café Manager, Session Log, Printer trap, Paint, Spreadsheet, IE, Minesweeper, Display Properties,
// Shut Down / SAFE ending, BSOD / 2050 ending, PROPRIETOR / GUEST ending, SHRED ending, easter eggs.
import { createWindow, closeAll, setBusy, list as winList } from '../windowManager.js';
import { messageBox } from '../dialogs.js';
import { menuBar } from '../menu.js';
import { icon } from '../icons.js';
import { register, launch } from './index.js';
import { onRun } from '../startMenu.js';
import { addIcon } from '../desktop.js';
import * as fs from '../fileSystem.js';
import { ding, chord, click } from '../sound.js';

/* ================= shared state ================= */
const PC03_START = new Date(1998, 2, 3, 3, 14, 0);
const PAGE_START = Date.now();
const SESSION_ID = 'G-' + Math.random().toString(16).slice(2, 8).toUpperCase();
const state = { bhaiyaSmiles: false, guest: false, restoreCount: 0, ledgerWin: null, ledgerRows: null };
const rupees = n => 'Rs. ' + Math.floor(n).toLocaleString('en-IN');
const hms = s => { s = Math.floor(s); return `${Math.floor(s / 3600)}:${String(Math.floor(s / 60) % 60).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; };
const now = () => new Date().toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit', hour: 'numeric', minute: '2-digit' });
const el = (html) => { const d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; };
const wait = ms => new Promise(r => setTimeout(r, ms));

/* ================= sounds ================= */
let actx = null;
function ac() { return actx || (actx = new (window.AudioContext || window.webkitAudioContext)()); }
function bark() {
  try {
    const c = ac();
    [0, 0.28].forEach(t => {
      const o = c.createOscillator(), g = c.createGain(), f = c.createBiquadFilter();
      o.type = 'sawtooth'; f.type = 'lowpass'; f.frequency.value = 1200;
      o.frequency.setValueAtTime(420, c.currentTime + t); o.frequency.exponentialRampToValueAtTime(180, c.currentTime + t + 0.16);
      g.gain.setValueAtTime(0.0001, c.currentTime + t); g.gain.exponentialRampToValueAtTime(0.4, c.currentTime + t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + t + 0.2);
      o.connect(f); f.connect(g); g.connect(c.destination); o.start(c.currentTime + t); o.stop(c.currentTime + t + 0.25);
    });
  } catch (e) { /* no audio */ }
}
function modem() {
  try {
    const c = ac(), t0 = c.currentTime, g = c.createGain(); g.gain.value = 0.08; g.connect(c.destination);
    const tone = (f, a, b, type = 'sine') => { const o = c.createOscillator(); o.type = type; o.frequency.value = f; o.connect(g); o.start(t0 + a); o.stop(t0 + b); };
    tone(350, 0, 0.6); tone(440, 0, 0.6); tone(2100, 0.8, 1.6); tone(1300, 1.7, 2.1, 'square'); tone(2250, 2.1, 2.6, 'sawtooth'); tone(980, 2.6, 3.4, 'square'); tone(1650, 2.6, 3.4, 'square');
  } catch (e) { /* no audio */ }
}

/* ================= Session Log ================= */
const city = () => (Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown/Unknown').split('/').pop().replace(/_/g, ' ');
const browser = () => { const u = navigator.userAgent; return /Edg\//.test(u) ? 'Edge' : /Firefox\//.test(u) ? 'Firefox' : /Chrome\//.test(u) ? 'Chrome' : /Safari\//.test(u) ? 'Safari' : 'Browser'; };
const logRows = [
  ['02/27/98 06:00 PM', 'PC 01', 'SYSTEM', 'Cafe Manager 98 installed', 'CLOSED'],
  ['03/01/98 09:30 AM', 'PC 07', 'R.K. VERMA', 'Browsing (2:30:00)', 'CLOSED'],
  ['03/02/98 05:10 PM', 'PC 04', 'PINKU', 'Games (exam season)', 'CLOSED'],
  ['03/03/98 03:14 AM', 'PC 03', 'MR. EIPSTEIN', 'Floppy session', 'STILL RUNNING'],
  ['03/10/98 03:14 AM', 'PC 03', 'MR. EIPSTEIN', 'Floppy session', 'MERGED'],
  ['12/29/98 11:02 PM', 'PC 12', 'PRINT BILL', 'Print job', 'JAMMED'],
  [now(), 'PC 03', 'GUEST', 'Logged on', 'ACTIVE'],
];
let logWin = null;
function addLog(row) { logRows.push(row); renderLog(); }
fs.onOpen((n, path) => { if (n && path && path !== 'My Computer') addLog([now(), 'PC 03', state.guest ? 'SEAT 07' : 'GUEST', 'Opened ' + path, 'LOGGED']); });
function renderLog() {
  if (!logWin || logWin.closed) return;
  const tb = logWin.body.querySelector('tbody');
  tb.innerHTML = logRows.map(r => `<tr${r[4] === 'STILL RUNNING' ? ' class="hot"' : ''}>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('');
  const box = logWin.body.querySelector('.lv'); box.scrollTop = box.scrollHeight;
  logWin.body.querySelector('.statusbar div').textContent = `${logRows.length} session(s)`;
}
register('sessionlog', () => {
  if (logWin && !logWin.closed) { logWin.focus(); return logWin; }
  const body = el(`<div class="app-col"><div class="lv"><table class="grid"><thead><tr><th>Date / Time</th><th>PC</th><th>Customer</th><th>Activity</th><th>Duration / Status</th></tr></thead><tbody></tbody></table></div><div class="statusbar"><div></div></div></div>`);
  logWin = createWindow({ title: 'Session Log - SESSION.LOG', icon: 'sessionlog', content: body, width: 600, height: 320 });
  renderLog();
  return logWin;
});

/* ================= Café Manager 98 ================= */
const CUSTOMERS = ['Sunita', '', 'MR. EIPSTEIN', 'Pinku', '', 'Tiwari sir', 'R.K. Verma', '', 'Raju (chai)', '', 'Student (ID?)', 'PRINT BILL'];
register('cafe', () => {
  const body = el(`<div class="app-col cafe"><div class="cafe-head">SHREE CYBER ZONE &nbsp;-&nbsp; Rs. 10/hr &nbsp;-&nbsp; Night Rs. 15/hr</div><div class="tiles"></div>
    <div class="cafe-btns dlg-btns"><button data-a="start">&nbsp;Start Session&nbsp;</button><button data-a="end">End Session</button><button data-a="print">Print Bill</button></div>
    <div class="statusbar"><div>Select a PC</div></div></div>`);
  const tiles = body.querySelector('.tiles');
  const starts = CUSTOMERS.map((c, i) => (i === 2 ? PC03_START.getTime() : c ? Date.now() - (600 + i * 731) * 1000 : 0));
  let sel = -1;
  for (let i = 0; i < 12; i++) tiles.appendChild(el(`<div class="tile" data-i="${i}"><b>PC ${String(i + 1).padStart(2, '0')}${i === 2 ? ' (ADMIN)' : ''}</b><span class="cust"></span><span class="time"></span><span class="bill"></span></div>`));
  const draw = () => {
    [...tiles.children].forEach((t, i) => {
      const on = !!starts[i], secs = on ? (Date.now() - starts[i]) / 1000 : 0;
      t.classList.toggle('on', on); t.classList.toggle('sel', i === sel); t.classList.toggle('pc03', i === 2);
      t.querySelector('.cust').textContent = on ? (CUSTOMERS[i] || 'Walk-in') : 'FREE';
      t.querySelector('.time').textContent = on ? hms(secs) : '--:--:--';
      t.querySelector('.bill').textContent = on ? rupees(Math.ceil(secs / 1800) * 5) : '';
    });
  };
  tiles.addEventListener('pointerdown', e => { const t = e.target.closest('.tile'); if (!t) return; sel = +t.dataset.i; draw(); body.querySelector('.statusbar div').textContent = `PC ${String(sel + 1).padStart(2, '0')} selected`; });
  body.querySelector('[data-a="start"]').onclick = () => { if (sel < 0) return; if (sel === 2) return messageBox({ title: 'Cafe Manager 98', icon: 'warning', text: 'PC 03 is already in session.\n\nSession started: 03/03/98 03:14 AM' }); if (!starts[sel]) { starts[sel] = Date.now(); CUSTOMERS[sel] = 'Walk-in'; } draw(); };
  body.querySelector('[data-a="end"]').onclick = async () => {
    if (sel < 0) return;
    if (sel === 2) {
      const pw = await askPassword('End Session - PC 03', 'This session is owned by THE PROPRIETOR.\nEnter Proprietor password:');
      if (pw == null) return;
      return messageBox({ title: 'Cafe Manager 98', icon: 'error', text: pw.toUpperCase() === 'TOMMY' ? 'That is the dog.\n\nOnly THE PROPRIETOR can end this session.' : 'Incorrect password.\n\nOnly THE PROPRIETOR can end this session.\nBilling continues.' });
    }
    if (!starts[sel]) return;
    const secs = (Date.now() - starts[sel]) / 1000;
    messageBox({ title: 'Session Ended', icon: 'info', text: `PC ${String(sel + 1).padStart(2, '0')} - ${CUSTOMERS[sel] || 'Walk-in'}\nTime: ${hms(secs)}\nAmount due: ${rupees(Math.max(5, Math.ceil(secs / 1800) * 5))}\n\nPlease collect cash. No udhaar.` });
    starts[sel] = 0; draw();
  };
  body.querySelector('[data-a="print"]').onclick = () => { if (sel < 0) return; if (sel === 11) printDialog('PC12_BILL.TXT', false); else printDialog(`PC${String(sel + 1).padStart(2, '0')}_BILL.TXT`, null); };
  const w = createWindow({ title: 'Café Manager 98', icon: 'cafe', content: body, width: 560, height: 400 });
  const t = setInterval(() => { if (w.closed) clearInterval(t); else draw(); }, 1000);
  draw();
  return w;
});

function askPassword(title, text) {
  return new Promise(resolve => {
    const body = el(`<div class="msgbox"><div class="msg-main"><img src="${icon('key', 32)}" width="32" height="32" alt=""><div class="msg-text"></div></div><input type="password" style="width:100%;margin-bottom:12px"><div class="dlg-btns center"><button class="default">OK</button><button>Cancel</button></div></div>`);
    body.querySelector('.msg-text').textContent = text;
    const inp = body.querySelector('input'); let val = null;
    const w = createWindow({ title, content: body, modal: true, noIcon: true, resizable: false, taskbar: false, className: 'dialog', onClose: () => resolve(val) });
    const [ok, cancel] = body.querySelectorAll('button');
    ok.onclick = () => { val = inp.value; w.close(); }; cancel.onclick = () => w.close();
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') ok.onclick(); if (e.key === 'Escape') w.close(); });
    inp.focus();
  });
}

/* ================= Printer Queue + trap ================= */
const jobs = [{ doc: 'rates_1998.doc', owner: 'ADMIN', status: 'Printed', pages: 1 }, { doc: 'PC12_BILL.TXT', owner: 'PC 12', status: 'Paper jam', pages: 1 }];
let pqWin = null;
function renderPQ() { if (!pqWin || pqWin.closed) return; pqWin.body.querySelector('tbody').innerHTML = jobs.map(j => `<tr${/jam|error/i.test(j.status) ? ' class="hot"' : ''}><td>${j.doc}</td><td>${j.status}</td><td>${j.owner}</td><td>${j.pages}</td></tr>`).join(''); }
register('printq', () => {
  if (pqWin && !pqWin.closed) { pqWin.focus(); return pqWin; }
  const body = el(`<div class="app-col"><div class="lv"><table class="grid"><thead><tr><th>Document Name</th><th>Status</th><th>Owner</th><th>Pages</th></tr></thead><tbody></tbody></table></div><div class="statusbar"><div>Generic / Text Only on LPT1: — 2 jobs in queue</div></div></div>`);
  pqWin = createWindow({ title: 'Generic / Text Only', icon: 'printer', content: body, width: 480, height: 240 });
  renderPQ();
  return pqWin;
});
register('printers', () => launch('printq'));

/** fast: true (ledger) | false (PC 12 bill) | null (harmless print) */
function printDialog(doc, fast) {
  const body = el(`<div class="msgbox" style="width:340px"><p style="margin-bottom:10px"><b>Printer</b></p>
    <div class="field"><label>Name:</label><input type="text" value="Generic / Text Only" readonly></div>
    <div class="field"><label>Status:</label><span>Ready</span></div><div class="field"><label>Where:</label><span>LPT1:</span></div>
    <div class="field"><label>Copies:</label><input type="text" value="1" style="width:40px;flex:none"></div>
    <div class="dlg-btns" style="justify-content:flex-end;margin-top:10px"><button class="default">OK</button><button>Cancel</button></div></div>`);
  const w = createWindow({ title: 'Print', content: body, modal: true, noIcon: true, resizable: false, taskbar: false, className: 'dialog' });
  const [ok, cancel] = body.querySelectorAll('button');
  cancel.onclick = () => w.close();
  ok.onclick = () => { w.close(); doPrint(doc, fast); };
  ok.focus();
}
async function doPrint(doc, fast) {
  const job = { doc, owner: 'ADMIN', status: 'Printing', pages: 1 };
  jobs.push(job); renderPQ();
  if (fast === null) { await wait(1500); job.status = 'Printed'; renderPQ(); return; }
  launch('printq');
  await wait(fast ? 300 : 1500);
  job.status = 'Paper jam'; renderPQ();
  await messageBox({ title: 'Printers Folder', icon: 'error', text: `There was an error writing to LPT1: for the printer (Generic / Text Only):\n\nThe printer is out of paper or is not connected.\n\nThe paper is not the problem.`, buttons: ['&Retry', 'Cancel'] });
  await glitch(fast ? 700 : 1400);
  showWallpaper(nightCounter(), fast ? 900 : 1800);
  if (!document.querySelector('.icon[data-id="proprietor"]')) addIcon({ id: 'proprietor', label: 'PROPRIETOR', icon: 'key' });
  addLog([now(), 'PC 03', 'THE PROPRIETOR', 'Print job received: ' + doc, 'NOTED']);
}
async function glitch(ms) {
  const s = document.getElementById('screen');
  const end = Date.now() + ms;
  while (Date.now() < end) { s.classList.toggle('glitch'); s.style.transform = `translate(${(Math.random() * 8 - 4) | 0}px,${(Math.random() * 4 - 2) | 0}px)`; await wait(60); }
  s.classList.remove('glitch'); s.style.transform = '';
}
function showWallpaper(canvas, ms) {
  const s = document.getElementById('screen');
  const prev = s.style.backgroundImage;
  s.style.backgroundImage = `url(${canvas.toDataURL()})`; s.style.backgroundSize = 'cover';
  if (ms) setTimeout(() => { s.style.backgroundImage = prev; }, ms);
}

/* ================= pictures (drawn, low-res, pixelated) ================= */
function pic(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); x.imageSmoothingEnabled = false; draw(x, w, h); return c; }
const PICS = {
  tommy: () => pic(160, 120, (x) => {
    x.fillStyle = '#c8b090'; x.fillRect(0, 0, 160, 120); x.fillStyle = '#806040'; x.fillRect(0, 90, 160, 30);
    x.fillStyle = '#a06030'; x.fillRect(45, 55, 70, 35); x.fillRect(100, 35, 35, 30); x.fillRect(50, 85, 8, 20); x.fillRect(100, 85, 8, 20); x.fillRect(35, 50, 12, 6);
    x.fillStyle = '#603010'; x.fillRect(100, 30, 8, 14); x.fillRect(127, 30, 8, 14); x.fillStyle = '#000'; x.fillRect(110, 45, 3, 3); x.fillRect(122, 45, 3, 3); x.fillRect(130, 54, 5, 4);
    x.fillStyle = '#d00'; x.fillRect(100, 62, 35, 3); x.fillStyle = '#fc0'; x.fillRect(116, 65, 4, 4);
    x.fillStyle = '#000'; x.font = '10px monospace'; x.fillText('TOMMY  (good boy)', 6, 14); x.fillText('Password hint: ME', 6, 112);
  }),
  bhaiya: () => pic(160, 120, (x) => {
    x.fillStyle = '#e0d8c0'; x.fillRect(0, 0, 160, 120); x.fillStyle = '#ff9933'; x.fillRect(0, 0, 160, 18); x.fillStyle = '#000'; x.font = 'bold 10px monospace'; x.fillText('SHREE CYBER ZONE - OPENING', 6, 12);
    x.fillStyle = '#704020'; x.fillRect(68, 30, 24, 28); x.fillStyle = '#000'; x.fillRect(66, 28, 28, 6); x.fillRect(73, 40, 3, 3); x.fillRect(84, 40, 3, 3);
    x.fillRect(74, 50, 12, 2); if (state.bhaiyaSmiles) { x.fillRect(72, 48, 2, 2); x.fillRect(86, 48, 2, 2); } else { x.fillRect(72, 52, 2, 2); x.fillRect(86, 52, 2, 2); }
    x.fillStyle = '#fff'; x.fillRect(58, 58, 44, 40); x.fillStyle = '#704020'; x.fillRect(50, 60, 8, 30); x.fillRect(102, 60, 8, 30);
    x.fillStyle = '#333'; x.fillRect(62, 98, 14, 20); x.fillRect(84, 98, 14, 20);
    x.fillStyle = '#000'; x.font = '9px monospace'; x.fillText('01-03-1998', 6, 114); x.fillText(state.bhaiyaSmiles ? 'he heard the dog' : 'Bhaiya (age: ?)', 84, 114);
  }),
  rules: () => pic(200, 140, (x) => {
    x.fillStyle = '#b08850'; x.fillRect(0, 0, 200, 140); x.fillStyle = '#8a6838'; for (let i = 0; i < 200; i += 7) x.fillRect(i, 0, 1, 140);
    x.fillStyle = '#101010'; x.font = 'bold 12px "Comic Sans MS", cursive';
    ['RULES', '1. NO GAMES IN EXAM', '2. DONT TOUCH MONITOR', '3. PAY BEFORE GO', '4. PC 03 NOT FOR YOU', '5. NO TUESDAY'].forEach((t, i) => x.fillText(t, i ? 10 : 75, 20 + i * 22));
  }),
  seats: seatsPic,
  sticky: () => pic(240, 170, (x) => {
    x.fillStyle = '#fff'; x.fillRect(0, 0, 240, 170);
    x.fillStyle = '#ff9933'; x.fillRect(10, 20, 110, 22); x.fillStyle = '#000'; x.font = 'bold 14px Arial'; x.fillText('SHREE CYB', 16, 37);
    x.strokeStyle = '#000'; x.strokeRect(10, 50, 70, 50);
    x.fillStyle = '#ffff80'; x.fillRect(130, 70, 100, 90); x.fillStyle = '#e0e060'; x.fillRect(130, 70, 100, 6);
    x.fillStyle = '#00f'; x.font = '11px "Comic Sans MS", cursive';
    ['PC 03 pwd:', 'dogs name', '(CAPITALS)', 'dont write', 'it down!!'].forEach((t, i) => x.fillText(t, 138, 92 + i * 14));
  }),
};
function seatsPic() {
  return pic(320, 240, (x) => {
    x.fillStyle = '#101018'; x.fillRect(0, 0, 320, 240);
    x.fillStyle = '#c0c0c0'; x.font = 'bold 12px monospace'; x.fillText('THE QUIET ROOM - SUCCESSION 2050', 34, 18);
    x.fillStyle = '#806040'; x.fillRect(90, 90, 140, 60);
    const labels = ['SEAT 01', 'SEAT 02', 'SEAT 03', 'SEAT 04 (retired)', 'SEAT 05', 'SEAT 06 [REDACTED]', 'SEAT 07', 'SEAT 08', 'SEAT 09'];
    const pos = [[100, 60], [150, 60], [200, 60], [240, 105], [200, 165], [150, 165], [100, 165], [55, 105], [150, 205]];
    labels.forEach((l, i) => {
      const [px, py] = pos[i];
      x.fillStyle = i === 6 ? '#202020' : '#8b0000'; x.fillRect(px, py, 18, 18);
      if (i === 6) { x.strokeStyle = '#ffff00'; x.strokeRect(px - 1, py - 1, 20, 20); }
      x.fillStyle = '#c0c0c0'; x.font = '8px monospace'; x.fillText(l, px - 6, py + 28 > 238 ? py - 3 : py + 28);
    });
    x.fillStyle = '#ffff00'; x.font = '9px monospace';
    x.fillText('SEAT 07 - MERAZ / OPENLAKE, IIT BHILAI', 8, 226); x.fillText('CANDIDATE PENDING', 8, 236);
  });
}
function nightCounter() {
  return pic(320, 240, (x) => {
    x.fillStyle = '#05050a'; x.fillRect(0, 0, 320, 240);
    x.fillStyle = '#1a1208'; x.fillRect(0, 150, 320, 90);
    x.fillStyle = '#2a2a3a'; x.fillRect(120, 90, 80, 60); x.fillStyle = '#103040'; x.fillRect(128, 96, 64, 44);
    x.fillStyle = '#80ff80'; x.font = '8px monospace'; x.fillText('PC 03', 145, 112); x.fillText('SESSION', 140, 122); x.fillText('ACTIVE', 142, 132);
    x.fillStyle = '#3a2a1a'; x.fillRect(40, 140, 240, 14);
    x.fillStyle = '#504030'; x.fillRect(230, 100, 26, 40);
    x.fillStyle = '#c0c0c0'; x.fillText('SHREE CYBER ZONE  03:14 AM', 90, 230);
  });
}

/* ================= Paint (viewer with a half-finished logo) ================= */
register('paint', (a = {}) => {
  const n = a.node;
  const key = n ? (n.image || (/SEATS/i.test(n.name) ? 'seats' : 'rules')) : 'sticky';
  const c = (PICS[key] || PICS.sticky)();
  const body = el(`<div class="app-col"><div class="paint-area"></div><div class="statusbar"><div>For Help, click Help Topics on the Help Menu.</div></div></div>`);
  c.className = 'paint-canvas'; c.style.width = c.width * 2 + 'px'; c.style.height = c.height * 2 + 'px';
  body.querySelector('.paint-area').appendChild(c);
  body.prepend(menuBar([{ label: '&File', items: [{ label: '&Print', action: () => printDialog(n ? n.name : 'untitled.bmp', null) }, { sep: true }, { label: 'Set As &Wallpaper (Tiled)', action: () => showWallpaper(c, 0) }, { sep: true }, { label: 'E&xit', action: () => w.close() }] }, { label: '&Edit', items: [{ label: '&Undo', disabled: true }] }, { label: '&View', items: [{ label: '&Tool Box', checked: true }] }, { label: '&Image', items: [{ label: '&Flip/Rotate...', disabled: true }] }, { label: '&Colors', items: [{ label: '&Edit Colors...' }] }, { label: '&Help', items: [{ label: '&About Paint', action: () => messageBox({ title: 'Paint', icon: 'paint', text: 'Paint\nWindows 98\n\nThe logo was never finished.' }) }] }]));
  const w = createWindow({ title: `${n ? n.name : 'untitled'} - Paint`, icon: 'paint', content: body, width: Math.min(560, c.width * 2 + 40), height: Math.min(440, c.height * 2 + 90) });
  return w;
});

/* ================= Spreadsheet (LEDGER_98.XLS) ================= */
register('spreadsheet', (a = {}) => {
  const n = a.node;
  const body = el(`<div class="app-col"><div class="lv sheet"></div><div class="statusbar"><div>Ready</div></div></div>`);
  const w = createWindow({ title: `Microsoft Excel - ${n.name}`, icon: 'xlsfile', content: body, width: 640, height: 360, onClose: () => { state.ledgerWin = null; } });
  body.prepend(menuBar([{ label: '&File', items: [{ label: '&Print...', action: () => printDialog(n.name, true) }, { sep: true }, { label: 'E&xit', action: () => w.close() }] }, { label: '&Edit', items: [{ label: '&Undo', disabled: true }] }, { label: '&View', items: [{ label: '&Formula Bar', checked: true }] }, { label: '&Help', items: [{ label: '&About', action: () => messageBox({ title: 'Excel', icon: 'info', text: 'No formulas needed. The numbers are already decided.' }) }] }]));
  fs.readText(n).then(t => { state.ledgerRows = t.trim().split(/\r?\n/).map(r => r.split(',')); drawSheet(); });
  state.ledgerWin = w;
  function drawSheet() {
    const rows = state.ledgerRows, cols = 'ABCDEFG';
    body.querySelector('.sheet').innerHTML = `<table class="grid xls"><tr><th></th>${[...cols].map(c => `<th>${c}</th>`).join('')}</tr>${rows.map((r, i) => `<tr><th>${i + 1}</th>${r.map((v, j) => `<td class="${i === 0 ? 'hdr' : j === 6 && /ACTIVE|PENDING|REDACTED|JAMMED/.test(v) ? 'red' : ''}">${v}</td>`).join('')}</tr>`).join('')}</table>`;
  }
  w.redraw = drawSheet;
  return w;
});

/* ================= Recycle Bin eggs + SHRED ending ================= */
register('emptybin', async () => {
  const r = await messageBox({ title: 'Confirm Multiple File Delete', icon: 'warning', text: 'Are you sure you want to delete these 3 items?', buttons: ['&Yes', '&No'] });
  if (r !== 0) return;
  if (state.ledgerWin && !state.ledgerWin.closed && state.ledgerRows) return shredEnding();
  messageBox({ title: 'Error Deleting File', icon: 'error', text: 'Cannot delete do_not_shred.pdf: It is being used by another person or program.\n\nClose any programs that might be using the file and try again.' });
});
async function shredEnding() {
  const w = state.ledgerWin, rows = state.ledgerRows;
  const saved = rows.map(r => r.slice());
  for (let i = rows.length - 1; i > 0; i--) { rows.splice(i, 1); w.redraw(); await wait(120); }
  await wait(900);
  saved.slice(1).forEach(r => { r[6] = 'ACTIVE'; rows.push(r); w.redraw(); });
  rows.push([new Date().toLocaleDateString('en-GB'), 'PC 03', 'GUEST ' + SESSION_ID, hms((Date.now() - PAGE_START) / 1000), '0', 'SHREDDER', 'ACTIVE']);
  w.redraw(); chord();
  addLog([now(), 'PC 03', 'GUEST', 'Attempted to destroy LEDGER_98.XLS', 'RESTORED']);
}
export function restoreEgg(node) {
  state.restoreCount++;
  if (state.restoreCount <= 3) messageBox({ title: 'Recycle Bin', icon: 'info', text: `Restored.\n\n${node.name} has been moved to the Recycle Bin.` });
}

/* ================= Internet Explorer (fake 1998) ================= */
const PAGES = {
  home: `<div class="ie-page"><center><h1 style="color:#800000">SHREE CYBER ZONE</h1><marquee>Welcome to Shree Cyber Zone Intranet ** Rs. 10/hr ** Night Rs. 15/hr ** Printing Rs. 2/page ** New AC coming soon **</marquee></center>
    <hr><table width="100%"><tr><td valign="top" width="50%"><h3>LIVE CRICKET</h3><p><b>IND 98/2</b> (41.3 ov)<br>Rain stopped play.<br><small>Last updated: 03/03/98</small></p><h3>LINKS</h3><ul><li><a data-go="rates">Rate card</a></li><li><a data-go="email">Free E-mail ID (first time only)</a></li><li><a data-go="update">Windows Update</a></li></ul></td>
    <td valign="top"><h3>NOTICE</h3><p>Please do not touch the monitor.</p><p>Guestbook: 1,998 visitors. You are visitor #1,999.</p><p><img alt="" src="${''}"><font color="gray">Best viewed in Internet Explorer 4 at 800x600.</font></p><p style="color:#c0c0c0;font-size:9px">quietroom.shree.local</p></td></tr></table></div>`,
  rates: `<div class="ie-page"><h2>Rate card</h2><pre>Browsing ....... Rs. 10/hr\nNight .......... Rs. 15/hr\nStudents ....... Rs.  8/hr\nPrinting ....... Rs.  2/page\nPC 03 .......... not for sale</pre><a data-go="home">Back to home</a></div>`,
  email: `<div class="ie-page"><h2>Get your FREE e-mail ID!</h2><p>Name: ________ &nbsp; Mother's maiden name: ________ &nbsp; Birthday: ________</p><p><i>Your data is safe with us. (Extraction - see EIPSTEIN.DOC p.1)</i></p><a data-go="home">Back</a></div>`,
  update: `<div class="ie-page"><h2>Windows Update</h2><p>There are no updates for this computer.</p><p>There will be no updates for this computer.</p><a data-go="home">Back</a></div>`,
  dark: `<div class="ie-page dark"><pre>THE QUIET ROOM\n\nSEATS FILLED: 8 / 9\nSEAT 07: CANDIDATE PENDING\nCANDIDATE LOCATION: Bhilai\nCANDIDATE ACTIVITY: reading this page\n\nYou were not supposed to type that address.\nWe are glad you did.</pre></div>`,
  gandhi: `<div class="ie-page"><pre>PROJECT GANDHI\nStatus: IN PROGRESS\n\nTested on a hackathon in Bhilai.\nResults: promising.\nParticipants were not informed.</pre></div>`,
};
register('ie', (a = {}) => {
  modem();
  const body = el(`<div class="app-col"><div class="bands"><div class="band addr"><div class="tb-grip"></div><span>A<u>d</u>dress</span><div class="addr-box"><img src="${icon('ie', 16)}" alt="" width="16" height="16"><input type="text" spellcheck="false"></div></div></div><div class="ie-view"></div><div class="statusbar"><div>Done</div><div style="flex:0 0 120px">Local intranet</div></div></div>`);
  const view = body.querySelector('.ie-view'), input = body.querySelector('input');
  const w = createWindow({ title: 'Shree Cyber Zone - Microsoft Internet Explorer', icon: 'ie', content: body, width: 620, height: 440 });
  const go = url => {
    click();
    const u = url.toLowerCase();
    const key = /quietroom|backroom/.test(u) ? 'dark' : /gandhi/.test(u) ? 'gandhi' : /windowsupdate|update/.test(u) ? 'update' : PAGES[u] ? u : 'home';
    input.value = key === 'home' ? 'http://shree.local/' : key === 'dark' ? 'http://quietroom.shree.local/' : url.startsWith('http') ? url : 'http://shree.local/' + key + '.htm';
    view.innerHTML = PAGES[key];
    w.setTitle(`${key === 'dark' ? 'THE QUIET ROOM' : 'Shree Cyber Zone'} - Microsoft Internet Explorer`);
  };
  view.addEventListener('click', e => { const l = e.target.closest('[data-go]'); if (l) go(l.dataset.go); });
  input.addEventListener('keydown', e => { if (e.key === 'Enter') go(input.value); });
  go(a.url || 'home');
  return w;
});

/* ================= Minesweeper (xyzzy) ================= */
register('minesweeper', () => {
  const N = 9, M = 10;
  const body = el(`<div class="mine"><div class="mine-top"><span class="led">010</span><button class="face">:)</button><span class="led">000</span></div><div class="mine-grid"></div></div>`);
  const grid = body.querySelector('.mine-grid'), face = body.querySelector('.face');
  let mines, open, over;
  const reset = () => {
    mines = new Set(); while (mines.size < M) mines.add((Math.random() * N * N) | 0);
    open = new Set(); over = false; face.textContent = ':)'; grid.innerHTML = '';
    for (let i = 0; i < N * N; i++) { const c = document.createElement('div'); c.className = 'cell'; c.dataset.i = i; grid.appendChild(c); }
  };
  const around = i => { const r = (i / N) | 0, c = i % N, out = []; for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) { const rr = r + dr, cc = c + dc; if ((dr || dc) && rr >= 0 && cc >= 0 && rr < N && cc < N) out.push(rr * N + cc); } return out; };
  const reveal = i => {
    if (open.has(i) || over) return;
    const cell = grid.children[i]; open.add(i); cell.classList.add('open');
    if (mines.has(i)) { over = true; cell.classList.add('boom'); face.textContent = 'X('; mines.forEach(m => grid.children[m].textContent = '*'); return; }
    const k = around(i).filter(j => mines.has(j)).length;
    if (k) { cell.textContent = k; cell.dataset.n = k; } else around(i).forEach(reveal);
    if (open.size === N * N - M) { over = true; face.textContent = 'B)'; }
  };
  grid.addEventListener('click', e => { const c = e.target.closest('.cell'); if (c) reveal(+c.dataset.i); });
  grid.addEventListener('contextmenu', e => { const c = e.target.closest('.cell'); if (c && !open.has(+c.dataset.i)) c.textContent = c.textContent ? '' : 'F'; });
  face.onclick = reset;
  reset();
  const w = createWindow({ title: 'Minesweeper', icon: 'app', content: body, resizable: false });
  let typed = '';
  w.el.addEventListener('keydown', e => { typed = (typed + e.key).slice(-5).toLowerCase(); if (typed === 'xyzzy') xyzzy(); });
  w.el.tabIndex = -1; w.el.focus();
  grid.addEventListener('pointermove', e => { const c = e.target.closest('.cell'); if (window.__xyzzy && c) document.getElementById('xyzzy').style.background = mines.has(+c.dataset.i) ? '#000' : '#fff'; });
  return w;
});
function xyzzy() {
  if (document.getElementById('xyzzy')) return;
  window.__xyzzy = true;
  const p = document.createElement('div'); p.id = 'xyzzy';
  Object.assign(p.style, { position: 'fixed', left: 0, top: 0, width: '1px', height: '1px', background: '#fff', zIndex: 99999, pointerEvents: 'none' });
  document.body.appendChild(p);
}

/* ================= Display Properties (wallpaper egg #3) ================= */
register('display', () => {
  const opts = ['(None)', 'Black Thatch', 'Clouds', 'Setup', 'Bhilai Steel Plant', 'SEATS.BMP'];
  const body = el(`<div class="msgbox" style="width:340px"><p style="margin-bottom:6px"><u>W</u>allpaper</p><div class="lv list" style="height:120px;background:#fff">${opts.map((o, i) => `<div class="li${i === 0 ? ' sel' : ''}" data-i="${i}">${o}</div>`).join('')}</div>
    <div class="dlg-btns" style="justify-content:flex-end;margin-top:12px"><button class="default">OK</button><button>Cancel</button><button>Apply</button></div></div>`);
  let pick = 0;
  body.querySelector('.list').addEventListener('pointerdown', e => { const li = e.target.closest('.li'); if (!li) return; pick = +li.dataset.i; body.querySelectorAll('.li').forEach(x => x.classList.toggle('sel', x === li)); });
  const apply = () => {
    const s = document.getElementById('screen');
    if (opts[pick] === 'SEATS.BMP') { showWallpaper(seatsPic(), 0); addLog([now(), 'PC 03', 'GUEST', 'Wallpaper set: SEATS.BMP', 'NOTED']); }
    else if (opts[pick] === 'Clouds') { s.style.backgroundImage = 'none'; s.style.background = '#5080c0'; }
    else { s.style.backgroundImage = 'none'; s.style.background = ''; }
  };
  const w = createWindow({ title: 'Display Properties', content: body, noIcon: true, help: true, resizable: false, minimizable: false, className: 'dialog', center: true });
  const [ok, cancel, ap] = body.querySelectorAll('button');
  ok.onclick = () => { apply(); w.close(); }; cancel.onclick = () => w.close(); ap.onclick = apply;
  return w;
});

/* ================= Help ================= */
register('help', () => {
  const body = el(`<div class="app-col"><div class="help"><div class="help-toc"><b>Contents</b><ul><li class="sel">What to do if you were never here</li></ul></div><div class="help-body"><h3>What to do if you were never here</h3><ol><li>Do not log off. Logging off is recorded.</li><li>Do not shut down. The timer does not stop.</li><li>Do not print. The printer remembers.</li><li>Close this window and continue browsing at Rs. 10/hour.</li></ol><p>If you are reading this, you were here.</p></div></div></div>`);
  return createWindow({ title: 'Windows Help', icon: 'help', content: body, width: 520, height: 320 });
});

/* ================= Shut Down / SAFE ending ================= */
register('shutdown', () => {
  const s = document.getElementById('screen');
  s.classList.add('dimmed');
  const body = el(`<div class="msgbox" style="width:320px"><div class="msg-main"><img src="${icon('shutdown', 32)}" width="32" height="32" alt=""><div><p style="margin-bottom:8px">What do you want the computer to do?</p>
    ${['Stand by', 'Shut down', 'Restart', 'Restart in MS-DOS mode'].map((o, i) => `<label class="radio"><input type="radio" name="sd" value="${i}"${i === 1 ? ' checked' : ''}> ${o}</label>`).join('')}</div></div>
    <div class="dlg-btns center"><button class="default">OK</button><button>Cancel</button><button>&nbsp;Help&nbsp;</button></div></div>`);
  const w = createWindow({ title: 'Shut Down Windows', content: body, modal: true, noIcon: true, resizable: false, taskbar: false, className: 'dialog', onClose: () => s.classList.remove('dimmed') });
  const [ok, cancel] = body.querySelectorAll('button');
  cancel.onclick = () => w.close();
  ok.onclick = () => { const v = +body.querySelector('input:checked').value; w.close(); if (v === 2) location.reload(); else if (v === 3) dosMode(); else if (v === 0) standby(); else safeEnding(); };
  ok.focus();
  return w;
});
function overlay(html, cls = '') { const o = document.getElementById('overlay'); o.className = 'on ' + cls; o.innerHTML = html; return o; }
async function safeEnding() {
  closeAll();
  overlay(`<div class="fullmsg" style="color:#fff">Windows is shutting down...</div>`, 'shut1');
  await wait(2200);
  const o = overlay(`<div class="safe">It's now safe to turn off<br>your computer.</div><div class="tick"></div>`, 'safe-screen');
  const t = o.querySelector('.tick');
  setInterval(() => { t.textContent = 'PC 03  ' + rupees((Date.now() - PC03_START) / 3600000 * 10) + '  ' + hms((Date.now() - PC03_START) / 1000); }, 1000);
}
function standby() { const o = overlay('', 'black'); setTimeout(() => o.addEventListener('pointerdown', () => { o.className = ''; o.innerHTML = ''; }, { once: true }), 300); }
function dosMode() {
  const o = overlay(`<pre class="dos">Microsoft(R) Windows 98\n   (C)Copyright Microsoft Corp 1981-1999.\n\nC:\\WINDOWS>dir C:\\BACKROOM$\n\n Volume in drive C is PC03\n Directory of C:\\BACKROOM$\n\nPROJEC~1 DOC        19,456  03-03-98 11:58p\nEIPSTEIN DOC        24,576  03-10-98  3:14a\nLEDGER~1 XLS        13,824  12-29-98 11:02p\nSEATS    BMP       230,454  03-03-98 10:44p\nTUESDAYS     &lt;DIR&gt;        03-03-98 10:42p\n\nC:\\WINDOWS>exit_</pre>`, 'black');
  o.addEventListener('pointerdown', () => location.reload(), { once: true });
}

/* ================= BSOD / 2050 ending ================= */
async function ending2050() {
  closeAll();
  const s = document.getElementById('screen');
  s.classList.add('y2050');
  await wait(3000);
  s.classList.remove('y2050');
  bsod('PLAN STILL ON SCHEDULE');
}
function bsod(msg) {
  const o = overlay(`<div class="bsod"><span class="bsod-title"> Windows </span><p>A fatal exception 0E has occurred at 0028:C0011E36 in VXD QUIETRM(01) +<br>00010E36. The current application will be terminated.</p><p>*  ${msg}.<br>*  Press any key to return to 1998.<br>*  Press CTRL+ALT+DEL again to restart your computer. You will<br>&nbsp;&nbsp;&nbsp;lose any unsaved information in all applications.</p><p style="text-align:center">Press any key to continue _</p></div>`, 'bsod-screen');
  const back = () => { o.className = ''; o.innerHTML = ''; window.removeEventListener('keydown', back); };
  setTimeout(() => { window.addEventListener('keydown', back); o.addEventListener('pointerdown', back, { once: true }); }, 400);
}

/* ================= PROPRIETOR / THE GUEST ending ================= */
register('proprietor', async () => {
  const pw = await askPassword('THE PROPRIETOR', 'Enter Proprietor password:');
  if (pw == null) return;
  if (pw.trim().toUpperCase() !== 'TOMMY') return messageBox({ title: 'THE PROPRIETOR', icon: 'error', text: 'Incorrect password.\n\nThe dog would know.' });
  guestEnding();
});
async function guestEnding() {
  closeAll();
  state.guest = true;
  setBusy(true);
  await glitch(800);
  setBusy(false);
  addLog([now(), 'PC 03', 'GUEST', `${city()} / ${browser()} / ${new Date().toDateString()}`, 'ACTIVE - 0:00:00']);
  const o = overlay(`<div class="fullmsg"><p>Logged on as: GUEST</p><p>Session ID: ${SESSION_ID}</p><p>Seat: 07</p><p class="big">Welcome back, SEAT 07.</p><p class="tick"></p></div>`, 'black');
  const start = Date.now(), t = o.querySelector('.tick');
  const iv = setInterval(() => { t.textContent = 'Billing: ' + hms((Date.now() - start) / 1000) + '   ' + rupees((Date.now() - start) / 360000); }, 1000);
  await wait(5000);
  clearInterval(iv);
  o.className = ''; o.innerHTML = '';
  launch('sessionlog');
  launch('notepad', { node: fs.resolve('C:\\BACKROOM$\\LOGS\\2026-11-01.LOG') });
}

/* ================= Run box eggs ================= */
onRun(key => {
  if (key === 'tommy') { bark(); state.bhaiyaSmiles = true; addLog([now(), 'PC 03', 'GUEST', 'Woke the dog', 'WOOF']); return true; }
  if (key === '2050') { ending2050(); return true; }
  if (key === 'gandhi') { launch('ie', { url: 'gandhi' }); return true; }
  if (key === 'help' || key === 'winhelp') { launch('help'); return true; }
  if (key === 'eipstein') { messageBox({ title: 'EIPSTEIN', icon: 'warning', text: 'There is no Mr. Eipstein.\nThere is a procedure.' }); return true; }
  if (key === 'cafe' || key === 'cafemgr') { launch('cafe'); return true; }
  return false;
});

/* ================= desktop eggs: clock, Konami, cricket TV ================= */
function initEggs() {
  const clk = document.getElementById('clock');
  let clicks = [];
  clk.addEventListener('click', () => {
    const t = Date.now(); clicks = clicks.filter(x => t - x < 3000).concat(t);
    if (clicks.length >= 5) { clicks = []; const real = clk.textContent; clk.textContent = '2050'; setTimeout(() => { clk.textContent = real; }, 900); }
  });
  const K = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let k = 0;
  document.addEventListener('keydown', e => {
    k = e.key === K[k] ? k + 1 : (e.key === K[0] ? 1 : 0);
    if (k === K.length) {
      k = 0;
      const imgs = [...document.querySelectorAll('#icons .icon img')], saved = imgs.map(i => i.src);
      imgs.forEach(i => { i.src = icon('floppy', 32); });
      setTimeout(() => imgs.forEach((i, j) => { i.src = saved[j]; }), 3000);
    }
  });
  const tray = document.querySelector('.tray');
  const tv = document.createElement('img');
  tv.src = icon('cdrom', 16); tv.width = tv.height = 16; tv.alt = ''; tv.title = '';
  tray.insertBefore(tv, tray.querySelector('.clock'));
  tv.addEventListener('click', () => messageBox({ title: 'TV (Doordarshan)', icon: 'info', text: 'IND 98/2 (41.3 ov)\n\nRain stopped play.\nThe score has not changed since 03/03/98.' }));
}
if (document.getElementById('clock')) initEggs(); else window.addEventListener('DOMContentLoaded', initEggs);
