// Endings: SAFE (shutdown), THE GUEST (PROPRIETOR), SHRED, 2050 (BSOD), SEAT_07 (canonical). Plus Stand by / Restart / MS-DOS.
import { createWindow, closeAll, setBusy } from '../windowManager.js';
import { messageBox, loginDialog } from '../dialogs.js';
import { icon } from '../icons.js';
import { register, launch } from './index.js';
import * as fs from '../fileSystem.js';
import { startup, errorBeep } from '../sound.js';
import { flags, store, sess, city, browser, billStart, hms, wait, overlay, clearOverlay, glitch, SESSION_ID, DAYS_RUNNING, addLogRow } from './shared.js';

/** Small password prompt. Resolves with text or null. */
export function askPassword(title, text) {
  return new Promise(resolve => {
    const body = document.createElement('div');
    body.className = 'msgbox';
    body.innerHTML = `<div class="msg-main"><img src="${icon('key', 32)}" width="32" height="32" alt=""><div class="msg-text"></div></div><div class="field"><label>Password:</label><input type="password"></div><div class="dlg-btns center" style="margin-top:10px"><button class="default">OK</button><button>Cancel</button></div>`;
    body.querySelector('.msg-text').textContent = text;
    const inp = body.querySelector('input'); let val = null;
    const w = createWindow({ title, content: body, modal: true, noIcon: true, resizable: false, taskbar: false, className: 'dialog', onClose: () => resolve(val) });
    const [ok, cancel] = body.querySelectorAll('button');
    ok.onclick = () => { val = inp.value; w.close(); };
    cancel.onclick = () => w.close();
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') ok.onclick(); if (e.key === 'Escape') w.close(); });
    inp.focus();
  });
}

/* ---------------- Ending 1: SAFE ---------------- */
async function shuttingDown(text = 'Windows is shutting down...') {
  closeAll();
  const o = overlay(`<div class="shut-box"><p>${text}</p><div class="shut-bar"></div></div>`, 'shut1');
  const bar = o.querySelector('.shut-bar');
  for (let i = 0; i < 24; i++) { bar.innerHTML += '<i></i>'; await wait(125); }
}
export async function safeEnding() {
  addLogRow({ dur: 'ATTEMPTED SHUTDOWN' });
  await shuttingDown();
  const o = overlay(`<div class="safe">It is now safe to turn off<br>your computer.</div><div class="safe-tick"><span class="t"></span><br>\u20b9\u2014</div>`, 'safe-screen');
  const t = o.querySelector('.t');
  const tick = () => { t.textContent = '\u23f1 ' + hms((Date.now() - billStart()) / 1000); };
  tick(); const iv = setInterval(tick, 1000);
  await wait(10000);
  o.classList.add('blackout');
  o.innerHTML = '<div class="safe-tick" style="color:#303030">Session active. Reload to return.</div>';
  clearInterval(iv);
}
async function restart() {
  addLogRow({ dur: 'RESTART REQUESTED \u2014 SESSION CONTINUES' });
  await shuttingDown('Windows is restarting...');
  sess.set('booted', false);
  location.reload();
}
async function standby() {
  closeAll();
  const o = overlay('', 'black');
  await wait(3000);
  clearOverlay();
  messageBox({ title: 'Stand By', icon: 'info', text: 'The machine did not sleep.' });
}
function dosMode() {
  closeAll();
  const o = overlay(`<pre class="dos">MS-DOS 7.10 (C)Copyright Microsoft Corp 1981-1998\n\nStarting Windows 98...\n\n</pre>`, 'black');
  const pre = o.querySelector('pre');
  let buf = '';
  const prompt = () => { pre.textContent += 'C:\\WINDOWS>'; };
  prompt();
  const caret = document.createElement('span'); caret.className = 'caret'; caret.textContent = '_'; o.appendChild(caret);
  const onKey = e => {
    e.preventDefault();
    if (e.key === 'Enter') {
      const cmd = buf.trim(); pre.textContent += '\n'; buf = '';
      if (/^exit$/i.test(cmd)) { window.removeEventListener('keydown', onKey); sess.set('booted', false); location.reload(); return; }
      if (/^dir/i.test(cmd)) pre.textContent += ' Volume in drive C is PC03\n Directory of C:\\WINDOWS\n\nQUIET    DLL             0  03-03-98  3:14a\n         1 file(s)              0 bytes\n\n';
      else if (/^ver$/i.test(cmd)) pre.textContent += '\nWindows 98 [Version 4.10.2222]\n\n';
      else if (cmd) pre.textContent += 'Bad command or file name.\n\n';
      prompt();
    } else if (e.key === 'Backspace') { if (buf) { buf = buf.slice(0, -1); pre.textContent = pre.textContent.slice(0, -1); } }
    else if (e.key.length === 1) { buf += e.key; pre.textContent += e.key; }
  };
  window.addEventListener('keydown', onKey);
}

register('shutdown', () => {
  const s = document.getElementById('screen');
  s.classList.add('dimmed');
  const body = document.createElement('div');
  body.className = 'msgbox';
  body.innerHTML = `<div class="msg-main" style="align-items:flex-start"><img src="${icon('shutdown', 32)}" width="32" height="32" alt=""><div><p style="margin-bottom:8px">What do you want the computer to do?</p>
    ${['S&tand by', '&Shut down', '&Restart', 'Restart in &MS-DOS mode'].map((o, i) => `<label class="radio"><input type="radio" name="sd" value="${i}"${i === 1 ? ' checked' : ''}> ${o.replace(/&(.)/, '<u>$1</u>')}</label>`).join('')}</div></div>
    <div class="dlg-btns center"><button class="default">OK</button><button>Cancel</button><button>&nbsp;&nbsp;<u>H</u>elp&nbsp;&nbsp;</button></div>`;
  const w = createWindow({ title: 'Shut Down Windows', content: body, modal: true, noIcon: true, resizable: false, taskbar: false, className: 'dialog', onClose: () => s.classList.remove('dimmed') });
  const [ok, cancel, help] = body.querySelectorAll('.dlg-btns button');
  cancel.onclick = () => w.close();
  help.onclick = () => launch('help');
  ok.onclick = () => {
    const v = +body.querySelector('input:checked').value;
    w.close();
    [standby, safeEnding, restart, dosMode][v]();
  };
  body.addEventListener('keydown', e => { if (e.key === 'Escape') w.close(); });
  ok.focus();
  return w;
});

/* ---------------- Ending 4: 2050 + BSOD ---------------- */
export function bsod(sub = '') {
  return new Promise(resolve => {
    const o = overlay(`<pre class="bsod">
                         <span class="bsod-title"> Windows </span>

  A fatal exception 0E has occurred at 0028:C0001A4F in VXD VMM(01) +
  00000A4F. The current application will be terminated.

  *  Press any key to terminate the current application.
  *  Press CTRL+ALT+DEL again to restart your computer. You will
     lose any unsaved information in all applications.

                        PLAN STILL ON SCHEDULE
${sub ? '                      ' + sub + '\n' : ''}
                      Press any key to continue _</pre>`, 'bsod-screen');
    errorBeep();
    let done = false;
    const end = () => { if (done) return; done = true; window.removeEventListener('keydown', end); o.removeEventListener('pointerdown', end); o.className = 'on black'; o.innerHTML = ''; setTimeout(() => { clearOverlay(); resolve(); }, 200); };
    setTimeout(() => { window.addEventListener('keydown', end); o.addEventListener('pointerdown', end); }, 300);
    setTimeout(end, 3000);
  });
}
export async function ending2050() {
  closeAll();
  addLogRow({ dur: 'VISITED 2050' });
  const s = document.getElementById('screen');
  s.classList.add('y2050');
  const ic = document.getElementById('icons');
  const layer = document.createElement('div'); layer.className = 'icons2050';
  layer.innerHTML = ['GANDHI.EXE', 'SEAT_07', 'PROJECT_2050_FINAL', 'WORLD_LEDGER'].map((n, i) => `<div class="icon" style="left:0;top:${i * 75 + 2}px"><img src="${icon(['app', 'key', 'docfile', 'xlsfile'][i], 32)}" width="32" height="32" alt=""><span class="label">${n}</span></div>`).join('');
  ic.parentNode.appendChild(layer);
  await wait(3000);
  layer.remove(); s.classList.remove('y2050');
  overlay('', 'black'); await wait(400);
  await bsod(`SESSION ACTIVE: ${DAYS_RUNNING()} days`);
}

/* ---------------- Ending 2: THE GUEST ---------------- */
let proprietorTries = 0;
register('proprietor', async () => {
  const { password } = await loginDialog('GUEST', true);
  if (proprietorTries++ === 0 && password) { await messageBox({ title: 'PROPRIETOR', icon: 'key', text: 'You already know.' }); return; }
  guestEnding();
});
export async function guestEnding() {
  closeAll();
  flags.guest = true;
  setBusy(true);
  await glitch(300);
  document.getElementById('screen').classList.add('booting');
  await wait(900);
  document.getElementById('screen').classList.remove('booting');
  setBusy(false);
  startup();
  store.set('billStart', Date.now());
  addLogRow({ cust: city(), pc: 'GUEST', dur: `ACTIVE \u00b7 billing: 00:00 \u00b7 ${browser()}`, cls: 'me' });
  await messageBox({ title: 'Windows', icon: 'info', text: 'Welcome back.' });
  const p = fs.resolve('C:\\BACKROOM$\\TECH\\THE_PLAYER.DOC');
  if (p) launch('notepad', { node: p });
}

/* ---------------- Ending 3: SHRED (and D03) ---------------- */
register('emptybin', async () => {
  const bin = fs.resolve('C:\\RECYCLED');
  const n = bin ? bin.children.length : 0;
  const r = await messageBox({ title: 'Confirm Multiple File Delete', icon: 'warning', text: `Are you sure you want to delete these ${n} items?`, buttons: ['&Yes', '&No'] });
  if (r !== 0) return;
  const forYou = { name: 'for_you.txt', type: 'file', size: 64, date: new Date().toLocaleDateString('en-US'), content: '' };
  if (flags.ledger) {
    addLogRow({ dur: 'ATTEMPTED TO SHRED LEDGER_98.XLS' });
    await flags.ledger.shred();
    forYou.content = 'You tried to empty it. It emptied you back.\r\n';
    if (bin && !bin.children.some(c => c.name === forYou.name)) { forYou.parent = bin; bin.children.push(forYou); }
  } else {
    forYou.content = 'You emptied it.\r\n\r\nIt emptied you back.\r\n\r\n\u2014 s00\r\n';
    if (bin) bin.children = [];
    const dk = fs.resolve('C:\\WINDOWS\\Desktop');
    if (dk && !dk.children.some(c => c.name === forYou.name)) { dk.children.push(Object.assign({}, forYou, { parent: dk })); }
    const { addIcon } = await import('../desktop.js');
    if (!document.querySelector('.icon[data-id="for_you"]')) addIcon({ id: 'for_you', label: 'for_you', icon: 'txtfile', open: () => launch('notepad', { node: forYou }) });
    addLogRow({ dur: 'EMPTIED RECYCLE BIN (contents restored)' });
  }
});

/* ---------------- Ending 5: SEAT_07 ---------------- */
export async function seat07Ending() {
  addLogRow({ cust: 'SEAT_07', pc: city(), dur: 'ACTIVE \u00b7 billing: \u221e', cls: 'me' });
  store.set('seat07', true);
  const o = overlay(`<div class="seat07"><div class="window active dialog s7"><div class="title-bar"><span class="title-text">SEAT_07</span><div class="title-buttons"><button class="tb-close" aria-label="Close"></button></div></div>
    <div class="window-body"><pre>SEAT_07
MERAZ / OPENLAKE, IIT BHILAI
STATUS: ACKNOWLEDGED

You were scheduled in 1998.
You arrived on time.
The seat is warm.
It was always yours.

\u2014 SEAT_00</pre></div></div></div>`, 'seat-screen');
  const close = () => { clearOverlay(); launch('sessionlog'); };
  o.querySelector('.tb-close').onclick = close;
  setTimeout(() => { if (o.classList.contains('seat-screen')) close(); }, 20000);
}
