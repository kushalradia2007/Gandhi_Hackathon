// mIRC 5.7 — #quietroom. The canonical ending (C01-C11, H06).
import { createWindow } from '../windowManager.js';
import { menuBar } from '../menu.js';
import { messageBox } from '../dialogs.js';
import { register, launch } from './index.js';
import { addIcon } from '../desktop.js';
import * as fs from '../fileSystem.js';
import { modem } from '../sound.js';
import { flags, store, city, DAYS_RUNNING } from './shared.js';
import { seat07Ending } from './endings.js';

// C08: unlock after 4 of the 5 chat logs
fs.onOpen(n => {
  if (!n || !/\.LOG$/i.test(n.name) || !n.parent || !/chatlogs/i.test(n.parent.name)) return;
  flags.logsRead.add(n.name);
  store.set('logsRead', [...flags.logsRead]);
  window.__logsRead = flags.logsRead.size;
  if (flags.logsRead.size >= 4) unlockMirc();
});
export function unlockMirc() {
  if (!flags.mircUnlocked) { flags.mircUnlocked = true; store.set('mircUnlocked', true); }
  if (!document.querySelector('.icon[data-id="mirc"]')) addIcon({ id: 'mirc', label: 'mIRC', icon: 'mirc' });
}

const SEATS = ['00', '01', '02', '04', '06', '08', '09'];
const pick = a => a[Math.floor(Math.random() * a.length)];
let win = null;

register('mirc', () => {
  if (win && !win.closed) { win.focus(); return win; }
  const body = document.createElement('div');
  body.className = 'app-col mirc';
  body.innerHTML = `
    <div class="irc-chan">[ #quietroom | 9 users | topic: we do not rule. we schedule. ]</div>
    <div class="irc-split"><div class="lv irc"></div><div class="lv irc-nicks"></div></div>
    <div class="irc-input"><input type="text" spellcheck="false" autocomplete="off"><button>Send</button></div>
    <div class="statusbar irc-status"><div>Connected to quiet.room · Session: ${DAYS_RUNNING()} days · Seat: 07</div></div>`;
  body.prepend(menuBar([
    { label: '&File', items: [{ label: '&Connect', disabled: true }, { label: '&Disconnect', action: () => line('*** You cannot leave the room until the session ends.', 'sys') }, { sep: true }, { label: 'E&xit', action: () => line('*** You cannot leave the room until the session ends.', 'sys') }] },
    { label: '&View', items: [{ label: '&Toolbar', checked: true }, { label: '&Status bar', checked: true }, { label: '&Nick list', checked: true }] },
    { label: '&Tools', items: [{ label: '&Options...', action: () => messageBox({ title: 'mIRC Options', icon: 'info', text: 'Nickname: GUEST\nAlternative: SEAT_07\nServer: quiet.room:6667\n\nThese options are not yours to change.' }) }] },
    { label: '&Commands', items: ['/list', '/names', '/whois SEAT_00', '/help'].map(c => ({ label: c, action: () => run(c) })) },
    { label: '&Window', items: [{ label: '#quietroom', checked: true }] },
    { label: '&Help', items: [{ label: '&About mIRC', action: () => messageBox({ title: 'About mIRC', icon: 'mirc', text: 'mIRC32 v5.7\nShareware. Registered to: THE QUIET ROOM\n\nThis copy has been running for ' + DAYS_RUNNING() + ' days.' }) }] },
  ]));
  win = createWindow({ title: 'mIRC32 - [#quietroom]', icon: 'mirc', content: body, width: 600, height: 380, minWidth: 360, minHeight: 220, onClose: () => { clearInterval(idleIv); return true; } });
  const out = body.querySelector('.irc'), inp = body.querySelector('input'), nicks = body.querySelector('.irc-nicks');
  nicks.innerHTML = ['@SEAT_00', 'SEAT_01', 'SEAT_02', 'SEAT_04', 'SEAT_06', 'SEAT_07', 'SEAT_08', 'SEAT_09', 'GUEST'].map(n => `<div>${n}</div>`).join('');
  const ts = () => '[' + new Date().toTimeString().slice(0, 5) + ']';
  function line(t, cls = '') { const d = document.createElement('div'); d.textContent = t; if (cls) d.className = cls; out.appendChild(d); out.scrollTop = out.scrollHeight; }
  const say = (seat, msg, delay = 0) => setTimeout(() => { if (!win.closed) line(`${ts()} <SEAT_${seat}> ${msg}`); }, delay);
  const server = (msg, delay = 0) => setTimeout(() => { if (!win.closed) line(`*** ${msg}`, 'sys'); }, delay);

  let replies = 0, ended = false, lastInput = Date.now(), idle5 = false, idle10 = false;
  ['* Connecting to quiet.room (6667)', '* Now talking in #quietroom', '* Topic is: we do not rule. we schedule.', '* Set by SEAT_00 on Tue Mar 03 1998'].forEach(t => line(t, 'sys'));
  modem();
  say('00', "you're here.", 1500); say('01', 'we saved you a seat.', 3000); say('04', 'it was always yours.', 4800);

  const idleIv = setInterval(() => {
    const s = (Date.now() - lastInput) / 1000;
    if (s > 300 && !idle5) { idle5 = true; line(`${ts()} -SEAT_00- we are still here. are you?`, 'pm'); }
    if (s > 600 && !idle10) { idle10 = true; line(`${ts()} -SEAT_00- we can wait. we have been waiting since 1998.`, 'pm'); }
  }, 5000);

  function run(v) {
    const [cmd, ...rest] = v.trim().split(/\s+/); const arg = rest.join(' ');
    const c = cmd.toLowerCase();
    if (c === '/list') return server('#quietroom — 9 users — topic: "we do not rule. we schedule."');
    if (c === '/names') return server('#quietroom: @SEAT_00 SEAT_01 SEAT_02 SEAT_04 SEAT_06 SEAT_07 SEAT_08 SEAT_09 GUEST');
    if (c === '/help') return server('There is no help here.');
    if (c === '/quit' || c === '/exit' || c === '/part') return server('You cannot leave the room until the session ends.');
    if (c === '/nick') return server(/eipstein/i.test(arg) ? 'Nick change denied. That name is reserved for the protocol.' : `Nick change denied. You are GUEST until you are SEAT_07.`);
    if (c === '/join') return server(/^#?quietroom$/i.test(arg) ? 'You are already in #quietroom. You have always been in #quietroom.' : 'No such channel. There is only #quietroom.');
    if (c === '/whois') {
      const n = arg.toUpperCase();
      if (n === 'SEAT_00') return server(`SEAT_00 is ~s00@quiet.room · channels: #quietroom · idle: ${DAYS_RUNNING()} days · status: LISTENING`);
      if (n === 'EIPSTEIN' || n === 'MR.EIPSTEIN') { server('EIPSTEIN: No such nick'); setTimeout(() => line(`${ts()} -SEAT_00- He was never a person. Read the file.`, 'pm'), 2000); return; }
      if (n === 'GUEST') return server(`GUEST is ~guest@${city()} · channels: #quietroom · status: SEAT_07`);
      if (n === 'SEAT_03') return server('SEAT_03 is not in the room. SEAT_03 is nowhere. Do not ask again.');
      if (n === 'SEAT_05') return server('SEAT_05: No such nick. (removed 2008)');
      if (n === 'SEAT_07') return server('SEAT_07 is you.');
      if (/^SEAT_0[0-9]$/.test(n)) return server(`${n} is ~${n.toLowerCase()}@quiet.room · channels: #quietroom · idle: ${DAYS_RUNNING()} days`);
      return server(`${arg || '?'}: No such nick`);
    }
    if (c.startsWith('/')) return server(`${cmd.slice(1).toUpperCase()}: Unknown command`);
    // anything said in the room
    line(`${ts()} <GUEST> ${v}`);
    if (ended) return;
    if (/^hello\b|^hi\b|^hey\b/i.test(v)) { say(pick(SEATS), 'we know.', 900); say(pick(SEATS), 'we know.', 905); say(pick(SEATS), 'we know.', 910); }
    else say(pick(SEATS), 'we know.', 1000 + Math.random() * 2000);
    if (++replies === 3) {
      ended = true;
      say('00', 'you were scheduled in 1998.', 4000); say('00', 'you arrived on time.', 5500); say('00', 'the seat is warm.', 7000); say('00', 'it was always yours.', 10000);
      setTimeout(() => seat07Ending(), 12500);
    }
  }
  const send = () => { const v = inp.value.trim(); inp.value = ''; lastInput = Date.now(); if (v) run(v); };
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });
  body.querySelector('.irc-input button').onclick = send;
  body.querySelector('.irc-status').addEventListener('click', () => messageBox({ title: 'mIRC', icon: 'info', text: `Connected to quiet.room · Session: ${DAYS_RUNNING()} days · Your seat: 07` }));
  inp.focus();
  return win;
});

export const openMirc = () => launch('mirc');
