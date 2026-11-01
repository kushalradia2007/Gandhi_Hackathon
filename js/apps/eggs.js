// docs/easter_eggs.md P0 additions: mIRC chain (C02/C03/C07/C08/H06), idle second cursor (A05), cancel slip (G02).
import { createWindow } from '../windowManager.js';
import { register, launch } from './index.js';
import { onRun } from '../startMenu.js';
import { addIcon } from '../desktop.js';
import * as fs from '../fileSystem.js';
import { addLog, overlayHTML, city, browser } from './extras.js';

const PC03_START = new Date(1998, 2, 3, 3, 14, 0);
const wait = ms => new Promise(r => setTimeout(r, ms));
const stamp = () => new Date().toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit', hour: 'numeric', minute: '2-digit' });

// C08: mIRC icon after 4 of 5 chat logs; H03 reads window.__logsRead
const logsRead = new Set();
fs.onOpen(n => {
  if (n && /\.LOG$/i.test(n.name) && n.parent && n.parent.name === 'LOGS') {
    logsRead.add(n.name);
    window.__logsRead = logsRead.size;
    if (logsRead.size >= 4 && !document.querySelector('.icon[data-id="mirc"]')) addIcon({ id: 'mirc', label: 'mIRC32', icon: 'app' });
  }
});

register('mirc', () => {
  const body = document.createElement('div');
  body.className = 'app-col';
  body.innerHTML = '<div class="lv irc"></div><input type="text" class="irc-in" spellcheck="false" autocomplete="off">';
  const out = body.querySelector('.irc'), inp = body.querySelector('input');
  const w = createWindow({ title: 'mIRC32 - [#lobby]', icon: 'app', content: body, width: 520, height: 340 });
  let chan = '#lobby', said = 0;
  const line = (t, cls = '') => { const d = document.createElement('div'); d.textContent = t; if (cls) d.className = cls; out.appendChild(d); out.scrollTop = out.scrollHeight; };
  const ts = () => '[' + new Date().toTimeString().slice(0, 5) + ']';
  ['*** Connecting to quiet.room (6667)', '*** You are logged in as: GUEST', '*** There is 1 user in #lobby: SEAT_00', '*** Try /join #quietroom  or  /whois <nick>'].forEach(t => line(t, 'sys'));
  inp.addEventListener('keydown', e => {
    if (e.key !== 'Enter' || !inp.value.trim()) return;
    const v = inp.value.trim();
    inp.value = '';
    const [cmd, arg = ''] = v.split(/\s+/);
    if (/^\/whois$/i.test(cmd)) {
      if (/^seat_00$/i.test(arg)) {
        line('*** SEAT_00 is ~s00@quiet.room', 'sys');
        line('*** channels: #quietroom', 'sys');
        line(`*** idle: ${Math.floor((Date.now() - PC03_START) / 86400000)} days`, 'sys');
        line('*** status: LISTENING', 'sys');
      } else if (/^eipstein$/i.test(arg)) {
        line(`*** ${arg}: No such nick`, 'sys');
        setTimeout(() => line(`${ts()} -SEAT_00- He was never a person. Read the file.`, 'pm'), 2000);
      } else line(`*** ${arg || '?'}: No such nick`, 'sys');
      return;
    }
    if (/^\/join$/i.test(cmd)) {
      chan = arg || '#quietroom';
      w.setTitle(`mIRC32 - [${chan}]`);
      line(`*** Now talking in ${chan}`, 'sys');
      if (chan.toLowerCase() === '#quietroom') line('*** Topic: SEATS FILLED 8/9. SEAT 07 PENDING.', 'sys');
      return;
    }
    line(`${ts()} <GUEST> ${v}`);
    if (chan.toLowerCase() === '#quietroom') {
      said++;
      setTimeout(() => line(`${ts()} <SEAT_0${1 + ((Math.random() * 9) | 0)}> we know.`), 600 + Math.random() * 2400);
      if (said === 3) setTimeout(() => { line(`${ts()} <SEAT_00> you are at pc03. welcome to the seat. it was always yours.`); setTimeout(canonEnding, 3500); }, 3500);
    } else setTimeout(() => line(`${ts()} <SEAT_00> /join #quietroom`), 900);
  });
  inp.focus();
  return w;
});

async function canonEnding() {
  addLog([stamp(), 'SEAT_07', city(), 'ACTIVE', 'billing: \u221e']);
  const o = overlayHTML(`<div class="fullmsg"><p class="big">SEAT_07 \u2014 ACKNOWLEDGED</p><p>${city()} / ${browser()} / ${new Date().toDateString()}</p><p>billing: \u221e</p></div>`, 'black');
  await wait(6000);
  o.className = ''; o.innerHTML = '';
  launch('sessionlog');
}
onRun(key => { if (key === 'mirc' || key === 'mirc32') { launch('mirc'); return true; } return false; });

// A05: idle 60 s on the desktop -> a second cursor drifts for 4 s
let idleT = 0;
async function ghostCursor() {
  const m = getComputedStyle(document.documentElement).getPropertyValue('--cur-arrow').match(/url\(([^)]+)\)/);
  if (!m) return;
  const c = document.createElement('img');
  c.src = m[1].replace(/^["']|["']$/g, '');
  let x = innerWidth - 60, y = innerHeight - 90;
  Object.assign(c.style, { position: 'fixed', left: x + 'px', top: y + 'px', zIndex: 9999, pointerEvents: 'none' });
  document.body.appendChild(c);
  for (let i = 0; i < 40; i++) { x -= 4 + Math.random() * 3; y -= 2 + Math.random() * 2; c.style.left = x + 'px'; c.style.top = y + 'px'; await wait(100); }
  c.remove();
}
const resetIdle = () => { clearTimeout(idleT); idleT = setTimeout(ghostCursor, 60000); };
['pointermove', 'keydown', 'pointerdown'].forEach(ev => window.addEventListener(ev, resetIdle));
resetIdle();

// G02: cancelling a print leaves a slip in My Documents
export function cancelSlip() {
  const docs = fs.resolve('C:\\My Documents');
  if (!docs || docs.children.some(c => c.name === 'cancel_slip.txt')) return;
  docs.children.push({ name: 'cancel_slip.txt', type: 'file', size: 96, date: stamp(), parent: docs, content: 'Print cancelled.\r\nThis cancellation has been logged.\r\n\r\n- s00\r\n' });
}
