// Hearts (games.md section 5): the table is laid, nobody else comes. "You are the only player."
import { createWindow } from '../../windowManager.js';
import { menuBar } from '../../menu.js';
import { messageBox } from '../../dialogs.js';
import { register, launch } from '../index.js';
import { onRun } from '../../startMenu.js';
import { setTitleIcon, el, ICON_HEART } from './common.js';

register('hearts', () => {
  const seat = (cls, label, n, vertical) => `<div class="hx-seat ${cls}"><div class="hx-name">${label}</div><div class="hx-cards${vertical ? ' v' : ''}">${'<div class="hx-slot"></div>'.repeat(n)}</div></div>`;
  const body = el(`<div class="app-col"><div class="hx-table">
      ${seat('n', 'Player 2 (empty seat)', 13, false)}
      ${seat('w', 'Player 3 (empty seat)', 13, true)}
      ${seat('e', 'Player 4 (empty seat)', 13, true)}
      <div class="hx-trick"><div class="hx-slot"></div><div class="hx-slot"></div><div class="hx-slot"></div><div class="hx-slot"></div></div>
      ${seat('s', 'You', 13, false)}
      <div class="hx-score">Score:&nbsp;&nbsp; You: 0&nbsp;&nbsp; P2: 0&nbsp;&nbsp; P3: 0&nbsp;&nbsp; P4: 0</div>
    </div><div class="statusbar"><div class="hx-status"></div></div></div>`);
  const status = body.querySelector('.hx-status');
  const notAvailable = () => messageBox({ title: 'Hearts', icon: 'info', text: 'Hearts is not available.\n\nThe game requires 4 players.\n\nYou are the only player.' });

  body.prepend(menuBar([
    { label: '&Game', items: [
      { label: '&New Game', shortcut: 'F2', action: notAvailable },
      { sep: true },
      { label: '&Score...', shortcut: 'F4', action: () => messageBox({ title: 'Hearts Score Sheet', icon: 'info', text: 'You: 0\nPlayer 2: 0\nPlayer 3: 0\nPlayer 4: 0\n\nNo hands have been played.' }) },
      { label: '&Sound', checked: false },
      { label: '&Options...', action: notAvailable },
      { sep: true },
      { label: 'E&xit', action: () => w.close() },
    ] },
    { label: '&Help', items: [
      { label: '&Contents', action: () => launch('help') },
      { sep: true },
      { label: '&About Hearts...', action: () => messageBox({ title: 'About Hearts', icon: 'info', text: 'The Microsoft Hearts Network\n\nCopyright (C) 1981-1998 Microsoft Corp.\n\nTo shoot the moon, you need someone to shoot it past.' }) },
    ] },
  ]));

  let iv = 0, t0 = 0;
  const w = createWindow({ title: 'The Microsoft Hearts Network', icon: 'app', content: body, width: 560, height: 440, minWidth: 360, minHeight: 300, onClose: () => { clearTimeout(t0); clearInterval(iv); } });
  setTitleIcon(w, ICON_HEART());

  // G07 then G08: the dialog, then the status bar waits. Forever. The line never changes; it only re-arrives.
  notAvailable().then(() => {
    const line = 'Waiting for other players... (3 seats available)';
    t0 = setTimeout(() => {
      if (w.closed) return;
      status.textContent = line;
      iv = setInterval(() => {
        if (w.closed) return clearInterval(iv);
        status.textContent = '';
        setTimeout(() => { if (!w.closed) status.textContent = line; }, 400);
      }, 10000);
    }, 10000);
  });
  return w;
});

onRun(key => { if (key === 'mshearts' || key === 'mshearts.exe' || key === 'hearts') { launch('hearts'); return true; } return false; });
