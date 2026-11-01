// Session Log: 280 sessions of 28 years, Eipstein at the top, the player at the bottom (F01/F02/F03/F05/F06).
import { createWindow } from '../windowManager.js';
import { menuBar, openMenu } from '../menu.js';
import { messageBox } from '../dialogs.js';
import { register } from './index.js';
import * as fs from '../fileSystem.js';
import { PC03_START, city, dmy, hm, store, DAYS_RUNNING } from '../state.js';

// deterministic filler so the log is the same on every visit
let seed = 1998;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const NAMES = ['RAHUL', 'PRIYA', 'VIKRAM', 'ANJALI', 'ARJUN', 'KAVITA', 'SANJAY', 'NEHA', 'RAVI', 'DEEPA'];
const pad = n => String(n).padStart(2, '0');
const rows = [];
rows.push({ date: '03/03/1998', time: '03:14 AM', cust: 'MR. EIPSTEIN', pc: 'PC 03', dur: 'live', cls: 'eip' });
(function filler() {
  const t0 = new Date(1998, 2, 3).getTime(), t1 = new Date(2026, 9, 25).getTime();
  const ts = Array.from({ length: 280 }, () => t0 + rnd() * (t1 - t0)).sort((a, b) => a - b);
  ts.forEach((t, i) => {
    const d = new Date(t); d.setHours(9 + Math.floor(rnd() * 14), Math.floor(rnd() * 60));
    const r = rnd(), cust = r < 0.7 ? 'WALK-IN' : r < 0.95 ? NAMES[Math.floor(rnd() * NAMES.length)] : 'GUEST';
    let pc = 1 + Math.floor(rnd() * 12); if (pc === 3) pc = 4;
    const mins = 15 + Math.floor(rnd() * 200);
    rows.push({ date: dmy(d), time: hm(d), cust, pc: 'PC ' + pad(pc), dur: `${pad(Math.floor(mins / 60))}:${pad(mins % 60)}:00` });
    if (i === 137) rows.push({ date: '10/03/1998', time: '03:14 AM', cust: 'MR. EIPSTEIN', pc: 'PC 03', dur: 'MERGED WITH 03/03/1998' });
  });
  rows.sort((a, b) => toTime(a) - toTime(b));
})();
function toTime(r) { const [d, m, y] = r.date.split('/').map(Number); return new Date(y, m - 1, d).getTime() + (r.eip ? -1 : 0); }
// keep Eipstein row first even though its date ties
rows.sort((a, b) => (a.cls === 'eip' ? -1 : b.cls === 'eip' ? 1 : 0));
rows.push({ date: '31/10/2026', time: '11:58 PM', cust: 'GUEST', pc: 'PC 03', dur: '00:00:01' });
// rows added by the player persist across reloads
const persisted = store.get('logRows', []);
rows.push(...persisted);

let win = null, firstOpenDone = store.get('logF01', false), sel = -1, flashIdx = -1;
export function addLog(r) {
  const row = typeof r === 'object' && !Array.isArray(r) ? r : { date: dmy(), time: hm(), cust: r[2] || 'GUEST', pc: r[1] || 'PC 03', dur: r[4] || r[3] || '' };
  if (Array.isArray(r) && r[3] && r[4]) row.dur = `${r[3]}: ${r[4]}`;
  rows.push(row);
  if (row.persist !== false) { persisted.push(row); store.set('logRows', persisted.slice(-200)); }
  render();
}

// F02: every opened file is a row
fs.onOpen((n, path) => { if (n && path && path !== 'My Computer' && !fs.isContainer(n)) addLog({ date: dmy(), time: hm(), cust: 'GUEST', pc: 'PC 03', dur: 'OPENED: ' + n.name }); });
// grow on idle: every 5 minutes
setInterval(() => addLog({ date: dmy(), time: hm(), cust: 'GUEST', pc: 'PC 03', dur: 'SESSION ACTIVE', persist: false }), 5 * 60 * 1000);
// F06: after 10 minutes, the machine starts evaluating
setTimeout(() => addLog({ date: dmy(), time: hm(), cust: city(), pc: 'GUEST', dur: 'EVALUATING', persist: false }), 10 * 60 * 1000);

function eipDuration() {
  const s = Math.floor((Date.now() - PC03_START) / 1000);
  return `STILL RUNNING  (${DAYS_RUNNING()} days ${pad(Math.floor(s / 3600) % 24)}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)})`;
}

function render() {
  if (!win || win.closed) return;
  const tb = win.body.querySelector('tbody');
  tb.innerHTML = rows.map((r, i) => `<tr data-i="${i}" class="${r.cls || ''}${i === sel ? ' sel' : ''}${i === flashIdx ? ' flash' : ''}"><td>${r.date}</td><td>${r.time}</td><td>${r.cust}</td><td>${r.pc}</td><td>${r.cls === 'eip' ? eipDuration() : r.dur}</td></tr>`).join('');
  win.body.querySelector('.sb-count').textContent = `${rows.length} entries`;
}

function find() {
  const body = document.createElement('div');
  body.className = 'msgbox';
  body.innerHTML = '<div class="field"><label>Fi<u>n</u>d what:</label><input type="text"></div><div class="dlg-btns" style="justify-content:flex-end;margin-top:8px"><button class="default">Find Next</button><button>Cancel</button></div>';
  const w = createWindow({ title: 'Find', content: body, noIcon: true, resizable: false, minimizable: false, className: 'dialog', center: true, taskbar: false });
  const inp = body.querySelector('input'), [next, cancel] = body.querySelectorAll('button');
  next.onclick = () => {
    const q = inp.value.trim().toLowerCase(); if (!q) return;
    const start = sel + 1;
    const hit = rows.findIndex((r, i) => i >= start && Object.values(r).join(' ').toLowerCase().includes(q));
    if (hit < 0) { messageBox({ title: 'Session Log', icon: 'info', text: `Cannot find "${inp.value}"` }); return; }
    sel = hit; render();
    win.body.querySelector(`tr[data-i="${hit}"]`)?.scrollIntoView({ block: 'center' });
  };
  cancel.onclick = () => w.close();
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') next.onclick(); if (e.key === 'Escape') w.close(); });
  inp.focus();
}

register('sessionlog', () => {
  if (win && !win.closed) { win.focus(); return win; }
  const body = document.createElement('div');
  body.className = 'app-col';
  body.innerHTML = `<div class="lv slog" tabindex="0"><table class="grid"><thead><tr><th style="width:90px">Date</th><th style="width:80px">Time</th><th style="width:150px">Customer</th><th style="width:60px">PC</th><th>Duration</th></tr></thead><tbody></tbody></table></div><div class="statusbar"><div class="sb-count"></div><div style="flex:0 0 160px">SESSION.LOG</div></div>`;
  body.prepend(menuBar([
    { label: '&File', items: [{ label: '&Print...', action: () => messageBox({ title: 'Print', icon: 'info', text: 'Printing SESSION.LOG...\n\n284 pages. The printer has declined.' }) }, { sep: true }, { label: 'E&xit', action: () => win.close() }] },
    { label: '&Edit', items: [{ label: 'Select &All', action: () => { sel = -1; render(); } }, { sep: true }, { label: '&Find...', shortcut: 'Ctrl+F', action: find }, { label: 'Find &Next', shortcut: 'F3', action: find }] },
    { label: '&View', items: [{ label: '&Refresh', shortcut: 'F5', action: render }, { label: '&Details', checked: true }] },
    { label: '&Help', items: [{ label: '&About Session Log', action: () => messageBox({ title: 'About Session Log', icon: 'sessionlog', text: 'Session Log 1.0\nCafe Manager 98 component\n\nThis log cannot be cleared.\nThis log has never been cleared.' }) }] },
  ]));
  win = createWindow({ title: 'Session Log', icon: 'sessionlog', content: body, width: 620, height: 360, minWidth: 300 });
  const lv = body.querySelector('.lv');
  lv.addEventListener('pointerdown', e => { const tr = e.target.closest('tbody tr'); if (tr) { sel = +tr.dataset.i; render(); } });
  lv.addEventListener('contextmenu', e => {
    e.preventDefault();
    const tr = e.target.closest('tbody tr'); if (tr) { sel = +tr.dataset.i; render(); }
    openMenu([{ label: '&Copy' }, { label: '&Delete', action: () => messageBox({ title: 'Session Log', icon: 'error', text: 'You cannot delete the log.' }) }, { sep: true }, { label: 'P&roperties', action: () => messageBox({ title: 'Entry Properties', icon: 'info', text: 'Owner: PROPRIETOR\nRetention: permanent' }) }], e.clientX, e.clientY);
  });
  lv.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 'End') { e.preventDefault(); lv.scrollTop = lv.scrollHeight; }
    if (e.ctrlKey && e.key === 'Home') { e.preventDefault(); lv.scrollTop = 0; }
    if (e.ctrlKey && (e.key === 'f' || e.key === 'F')) { e.preventDefault(); find(); }
    if (e.key === 'F3') { e.preventDefault(); find(); }
    if (e.key === 'Delete') messageBox({ title: 'Session Log', icon: 'error', text: 'You cannot delete the log.' });
  });
  // F01: the machine has already logged you
  if (!firstOpenDone) {
    firstOpenDone = true; store.set('logF01', true);
    addLog({ date: dmy(), time: hm(), cust: city(), pc: 'PC 03', dur: 'SESSION ACTIVE  -  GUEST  -  billing: 00:00', cls: 'me' });
    flashIdx = rows.length - 1; setTimeout(() => { flashIdx = -1; render(); }, 1200);
  }
  render();
  const t = setInterval(() => { if (win.closed) clearInterval(t); else { const c = win.body.querySelector('tr.eip td:last-child'); if (c) c.textContent = eipDuration(); } }, 1000);
  lv.focus();
  return win;
});

export const logRows = rows;
