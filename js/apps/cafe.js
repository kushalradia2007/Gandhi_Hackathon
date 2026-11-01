// Café Manager 98: 12 PCs, live billing, PC 03 that never ends, the PC 12 print trap (G03).
import { createWindow } from '../windowManager.js';
import { menuBar, openMenu } from '../menu.js';
import { messageBox } from '../dialogs.js';
import { register } from './index.js';
import { printDialog } from './printing.js';
import { askPassword } from './endings.js';
import { DAYS_RUNNING, hms, rupees, addLogRow } from './shared.js';

const ACTIVE = [1, 2, 4, 6, 7, 9, 11, 12];
const RATE = 10 / 3600; // ₹10/hour
const pcs = Array.from({ length: 12 }, (_, i) => ({ n: i + 1, start: ACTIVE.includes(i + 1) ? Date.now() - (300 + ((i * 7919) % 9000)) * 1000 : 0 }));
const pad = n => String(n).padStart(2, '0');

register('cafe', () => {
  const body = document.createElement('div');
  body.className = 'app-col cafe';
  body.innerHTML = `
    <div class="cafe-head"><b>SHREE CYBER ZONE — ADMIN — PC 03</b><span class="cafe-date"></span></div>
    <div class="cafe-main"><div class="tiles"></div>
      <div class="cafe-side"><b class="side-title">No PC selected</b><span class="side-info"></span>
        <button data-a="start">Start Session</button><button data-a="end">End Session</button><button data-a="print">Print Bill</button><button data-a="props">Properties</button></div></div>
    <div class="statusbar"><div class="sb"></div></div>`;
  const tiles = body.querySelector('.tiles');
  let sel = -1;
  const w = createWindow({ title: 'Cafê Manager 98', icon: 'cafe', content: body, width: 640, height: 430, minWidth: 420, minHeight: 300 });

  body.prepend(menuBar([
    { label: '&Session', items: () => [{ label: '&Start Session', disabled: sel < 0, action: () => act('start') }, { label: '&End Session', disabled: sel < 0, action: () => act('end') }, { label: '&Print Bill', disabled: sel < 0, action: () => act('print') }, { sep: true }, { label: 'E&xit', action: () => w.close() }] },
    { label: '&PCs', items: [{ label: '&Refresh', shortcut: 'F5', action: draw }, { sep: true }, ...pcs.map(p => ({ label: `PC ${pad(p.n)}${p.n === 3 ? ' (ADMIN)' : ''}`, action: () => { sel = p.n - 1; draw(); } }))] },
    { label: '&Reports', items: [{ label: '&Daily Collection', action: report }, { label: '&Session Log', action: () => import('./index.js').then(m => m.launch('sessionlog')) }] },
    { label: '&Help', items: [{ label: '&About Cafê Manager 98', action: () => messageBox({ title: 'About Cafê Manager 98', icon: 'cafe', text: 'Cafê Manager 98  v1.3\nRegistered to: SHREE CYBER ZONE, Bhilai\n\nBilling: per second, rounded up.\nSessions on PC 03 cannot be ended from this console.' }) }] },
  ]));

  for (let i = 0; i < 12; i++) {
    const t = document.createElement('div');
    t.className = 'tile' + (i === 2 ? ' pc03' : '');
    t.dataset.i = i;
    t.innerHTML = `<div class="tile-title">PC ${pad(i + 1)}${i === 2 ? ' (ADMIN)' : ''}</div><div><i class="dot"></i><span class="st"></span></div><div class="time"></div><div class="bill"></div>`;
    tiles.appendChild(t);
  }
  tiles.addEventListener('pointerdown', e => { const t = e.target.closest('.tile'); if (t && e.target.closest('.tile-title')) { sel = +t.dataset.i; draw(); } });
  tiles.addEventListener('contextmenu', e => {
    e.preventDefault();
    const t = e.target.closest('.tile'); if (!t) return;
    sel = +t.dataset.i; draw();
    openMenu([{ label: '&Start Session', action: () => act('start') }, { label: '&End Session', action: () => act('end') }, { label: '&Print Bill', action: () => act('print') }, { sep: true }, { label: 'P&roperties', action: () => act('props') }], e.clientX, e.clientY);
  });
  body.querySelectorAll('.cafe-side button').forEach(b => b.addEventListener('click', () => act(b.dataset.a)));

  function draw() {
    let active = 0, empty = 0;
    [...tiles.children].forEach((t, i) => {
      const p = pcs[i], on = !!p.start, secs = on ? (Date.now() - p.start) / 1000 : 0;
      t.classList.toggle('sel', i === sel);
      if (i === 2) {
        t.querySelector('.st').textContent = 'STILL RUNNING'; t.querySelector('.dot').className = 'dot red';
        t.querySelector('.time').textContent = `${DAYS_RUNNING()} days`; t.querySelector('.bill').textContent = '₹—';
        return;
      }
      on ? active++ : empty++;
      t.querySelector('.st').textContent = on ? 'ACTIVE' : 'EMPTY';
      t.querySelector('.dot').className = 'dot ' + (on ? 'green' : 'grey');
      t.querySelector('.time').textContent = on ? hms(secs) : '00:00:00';
      t.querySelector('.bill').textContent = rupees(on ? secs * RATE : 0);
    });
    body.querySelector('.sb').textContent = `12 PCs · ${active} active · ${empty} empty · 1 still running`;
    body.querySelector('.cafe-date').textContent = new Date().toLocaleString('en-GB', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }) + ' · ' + new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    const p = pcs[sel];
    body.querySelector('.side-title').textContent = sel < 0 ? 'No PC selected' : `PC ${pad(sel + 1)}`;
    body.querySelector('.side-info').textContent = sel < 0 ? 'Click a PC name.' : sel === 2 ? 'Customer: MR. EIPSTEIN\nSince: 03/03/1998 03:14 AM' : p.start ? `Started: ${new Date(p.start).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}` : 'Free';
  }

  async function act(a) {
    if (sel < 0) return;
    const p = pcs[sel], name = `PC ${pad(sel + 1)}`;
    if (a === 'start') {
      if (sel === 2) return messageBox({ title: 'Cafê Manager 98', icon: 'warning', text: 'PC 03 is already in session.\n\nSession started: 03/03/1998 03:14 AM' });
      if (!p.start) { p.start = Date.now(); addLogRow({ cust: 'WALK-IN', pc: name, dur: 'SESSION STARTED' }); }
      draw();
    } else if (a === 'end') {
      if (sel === 2) {
        const pw = await askPassword('End Session - PC 03', 'Enter admin password:');
        if (pw != null) messageBox({ title: 'Cafê Manager 98', icon: 'error', text: 'Access denied.' });
        return;
      }
      if (!p.start) return;
      const r = await messageBox({ title: 'Cafê Manager 98', icon: 'question', text: `End session on ${name}?`, buttons: ['&Yes', '&No'] });
      if (r !== 0) return;
      const secs = (Date.now() - p.start) / 1000;
      addLogRow({ cust: 'WALK-IN', pc: name, dur: hms(secs) });
      p.start = 0; draw();
      messageBox({ title: 'Session Ended', icon: 'info', text: `${name}\nTime: ${hms(secs)}\nAmount due: ${rupees(Math.max(5, secs * RATE))}\n\nNO REFUNDS. NO EXCEPTIONS.` });
    } else if (a === 'print') {
      printDialog({ doc: `${name}_BILL.TXT`, trap: sel === 11 });
    } else if (a === 'props') {
      messageBox({ title: `${name} Properties`, icon: 'computer', text: sel === 2 ? 'Name: PC03-ADMIN\nUser: MR. EIPSTEIN\nStatus: STILL RUNNING\nIdle: 0 seconds\nOwner: PROPRIETOR' : `Name: ${name.replace(' ', '')}\nCPU: Pentium 166 MMX\nRAM: 16 MB\nMonitor: 14" CRT (do not touch)\nStatus: ${p.start ? 'ACTIVE' : 'EMPTY'}` });
    }
  }
  function report() {
    const total = pcs.reduce((s, p, i) => s + (i !== 2 && p.start ? (Date.now() - p.start) / 1000 * RATE : 0), 0);
    messageBox({ title: 'Daily Collection', icon: 'info', text: `Today's collection (live): ${rupees(total)}\nPrinting: ₹0.00 (printer jammed)\nChai account: see Raju\n\nPC 03: not billable.` });
  }

  draw();
  const iv = setInterval(() => { if (w.closed) clearInterval(iv); else draw(); }, 1000);
  return w;
});
