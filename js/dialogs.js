// System dialogs: message boxes, logon, Run.
import { createWindow } from './windowManager.js';
import { icon } from './icons.js';
import { ding, chord, warnBeep, errorBeep } from './sound.js';
import { labelHTML } from './menu.js';

const mn = label => { const m = /&([^&])/.exec(label); return m ? m[1].toLowerCase() : null; };

/** Resolves with the index of the pressed button (Esc / close = cancelIndex). */
export function messageBox({ title = '', text = '', icon: ic = 'info', buttons = ['OK'], defaultIndex = 0, cancelIndex = buttons.length - 1 } = {}) {
  return new Promise(resolve => {
    const body = document.createElement('div');
    body.className = 'msgbox';
    body.innerHTML = `<div class="msg-main">${ic ? `<img src="${icon(ic, 32)}" width="32" height="32" alt="" draggable="false">` : ''}<div class="msg-text"></div></div><div class="dlg-btns center"></div>`;
    body.querySelector('.msg-text').textContent = text;
    let result = cancelIndex;
    const row = body.lastChild;
    const btns = buttons.map((b, i) => {
      const el = document.createElement('button');
      el.innerHTML = labelHTML(b);
      if (i === defaultIndex) el.classList.add('default');
      el.addEventListener('click', () => { result = i; w.close(); });
      row.appendChild(el);
      return el;
    });
    const w = createWindow({ title, content: body, modal: true, noIcon: true, resizable: false, taskbar: false, className: 'dialog', onClose: () => resolve(result) });
    body.addEventListener('keydown', e => {
      if (e.key === 'Escape') { e.preventDefault(); w.close(); return; }
      const i = buttons.findIndex(b => mn(b) === e.key.toLowerCase());
      if (i >= 0) btns[i].click();
    });
    btns[defaultIndex] && btns[defaultIndex].focus();
    ({ error: errorBeep, warning: warnBeep, info: ding, question: chord })[ic]?.();
  });
}

/** "Welcome to Windows" logon. Cancel logs you on too, exactly like Windows 98. */
export function loginDialog(user = 'GUEST') {
  return new Promise(resolve => {
    const body = document.createElement('div');
    body.className = 'login';
    body.innerHTML = `
      <img class="login-key" src="${icon('key', 32)}" width="32" height="32" alt="" draggable="false">
      <div class="login-main">
        <p>Type a user name and password to log on to Windows.</p>
        <div class="field"><label for="lg-u"><u>U</u>ser name:</label><input id="lg-u" type="text" autocomplete="off" spellcheck="false"></div>
        <div class="field"><label for="lg-p"><u>P</u>assword:</label><input id="lg-p" type="password" autocomplete="off"></div>
      </div>
      <div class="login-btns dlg-btns"><button class="default">OK</button><button>Cancel</button></div>`;
    const [u, p] = body.querySelectorAll('input');
    u.value = user;
    const w = createWindow({ title: 'Welcome to Windows', content: body, modal: true, noIcon: true, help: true, resizable: false, taskbar: false, className: 'dialog', onClose: () => resolve({ user: u.value.trim() || user, password: p.value }) });
    body.querySelectorAll('button').forEach(b => b.addEventListener('click', () => w.close()));
    body.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === 'Escape') { e.preventDefault(); w.close(); } });
    p.focus();
  });
}

let lastRun = '';
/** Start > Run. onRun(command) decides what happens. */
export function runDialog(onRun) {
  const body = document.createElement('div');
  body.className = 'run';
  body.innerHTML = `
    <div class="run-top"><img src="${icon('run', 32)}" width="32" height="32" alt="" draggable="false"><p>Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.</p></div>
    <div class="run-open"><label for="run-in"><u>O</u>pen:</label><div class="combo"><input id="run-in" type="text" autocomplete="off" spellcheck="false"><button class="combo-btn" tabindex="-1" aria-label="History"></button></div></div>
    <div class="dlg-btns"><button class="default">OK</button><button>Cancel</button><button><u>B</u>rowse...</button></div>`;
  const input = body.querySelector('input');
  input.value = lastRun;
  const deskH = document.getElementById('desktop').clientHeight;
  const w = createWindow({ title: 'Run', icon: 'run', content: body, noIcon: true, help: true, resizable: false, className: 'dialog', x: 4, y: deskH - 190 });
  const [ok, cancel] = body.querySelectorAll('.dlg-btns button');
  const go = () => { const v = input.value.trim(); if (!v) return; lastRun = v; w.close(); onRun(v); };
  ok.addEventListener('click', go);
  cancel.addEventListener('click', () => w.close());
  body.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); go(); }
    if (e.key === 'Escape') { e.preventDefault(); w.close(); }
  });
  input.focus();
  input.select();
  return w;
}
