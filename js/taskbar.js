// Taskbar: Start button, Quick Launch, task buttons, tray clock, tooltips.
import { lx, ly, sw, sh } from './screen.js';
import { icon } from './icons.js';
import * as wm from './windowManager.js';
import { openMenu } from './menu.js';
import { toggleStartMenu } from './startMenu.js';
import { launch } from './apps/index.js';
import { isMuted, setMuted } from './sound.js';

let tasksEl, clockEl, desktopStash = null;

/* ---------- tooltips ---------- */
let tipEl = null, tipT = 0, mx = 0, my = 0;
function hideTip() { clearTimeout(tipT); if (tipEl) { tipEl.remove(); tipEl = null; } }
export function attachTip(el, text) {
  el.addEventListener('pointermove', e => { mx = lx(e.clientX); my = ly(e.clientY); });
  el.addEventListener('pointerenter', e => {
    mx = lx(e.clientX); my = ly(e.clientY);
    clearTimeout(tipT);
    tipT = setTimeout(() => {
      hideTip();
      tipEl = document.createElement('div');
      tipEl.className = 'tooltip';
      tipEl.textContent = typeof text === 'function' ? text() : text;
      if (!tipEl.textContent) { hideTip(); return; }
      document.getElementById('screen').appendChild(tipEl);
      let x = mx, y = my + 20;
      if (y + tipEl.offsetHeight > sh()) y = my - tipEl.offsetHeight - 4;
      if (x + tipEl.offsetWidth > sw()) x = sw() - tipEl.offsetWidth - 2;
      tipEl.style.left = x + 'px'; tipEl.style.top = y + 'px';
      tipT = setTimeout(hideTip, 5000);
    }, 500);
  });
  el.addEventListener('pointerleave', hideTip);
  el.addEventListener('pointerdown', hideTip);
}

/** Show a tooltip at a point for 2.5 s (used by eggs). */
export function showTipAt(x, y, text, local = false) {
  hideTip();
  tipEl = document.createElement('div');
  tipEl.className = 'tooltip';
  tipEl.textContent = text;
  document.getElementById('screen').appendChild(tipEl);
  if (!local) { x = lx(x); y = ly(y); }
  x = Math.min(x, sw() - tipEl.offsetWidth - 2); y = Math.max(0, Math.min(y, sh() - tipEl.offsetHeight - 2));
  tipEl.style.left = x + 'px'; tipEl.style.top = y + 'px';
  tipT = setTimeout(hideTip, 2500);
}

/* ---------- clock ---------- */
export const fmtTime = d => { let h = d.getHours(); const ap = h < 12 ? 'AM' : 'PM'; h = h % 12 || 12; return `${h}:${String(d.getMinutes()).padStart(2, '0')} ${ap}`; };
export const fmtDate = d => d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' });

export function initTaskbar() {
  const tb = document.getElementById('taskbar');
  tb.innerHTML = `
    <button class="start-btn" id="start-btn"><img src="${icon('flag', 16)}" width="16" height="16" alt="" draggable="false">Start</button>
    <div class="tb-sep"></div><div class="tb-grip"></div>
    <div class="quick">
      <button class="ql" data-act="desktop"><img src="${icon('showdesktop', 16)}" width="16" height="16" alt="" draggable="false"></button>
      <button class="ql" data-act="ie"><img src="${icon('ie', 16)}" width="16" height="16" alt="" draggable="false"></button>
      <button class="ql" data-act="cafe"><img src="${icon('cafe', 16)}" width="16" height="16" alt="" draggable="false"></button>
    </div>
    <div class="tb-sep"></div><div class="tb-grip"></div>
    <div class="tasks" id="tasks"></div>
    <div class="tray"><img class="tray-net" src="${icon('nettray', 16)}" width="16" height="16" alt="" draggable="false"><img class="tray-vol" src="${icon('speaker', 16)}" width="16" height="16" alt="" draggable="false"><span class="clock" id="clock"></span></div>`;
  tasksEl = tb.querySelector('#tasks');
  clockEl = tb.querySelector('#clock');

  const start = tb.querySelector('#start-btn');
  start.addEventListener('pointerdown', e => { if (e.button === 0) { e.preventDefault(); toggleStartMenu(); } });

  const tips = { desktop: 'Show Desktop', ie: 'Launch Internet Explorer Browser', cafe: 'Café Manager 98' };
  tb.querySelectorAll('.ql').forEach(b => {
    attachTip(b, tips[b.dataset.act]);
    b.addEventListener('click', () => (b.dataset.act === 'desktop' ? showDesktop() : launch(b.dataset.act)));
  });
  const vol = tb.querySelector('.tray-vol'), net = tb.querySelector('.tray-net');
  attachTip(vol, () => isMuted() ? 'Volume: muted' : 'Volume: — (speakers disconnected in 1998)');
  vol.addEventListener('dblclick', () => launch('volume'));
  vol.addEventListener('contextmenu', e => { e.preventDefault(); e.stopPropagation(); openMenu([{ label: '&Mute', checked: isMuted(), action: () => setMuted(!isMuted()) }, { label: '&Open Volume Controls', bold: true, action: () => launch('volume') }, { label: '&Adjust Audio Properties' }], e.clientX, e.clientY); });
  attachTip(net, 'Network: 12 computers connected. 1 unknown device.');
  net.addEventListener('dblclick', () => launch('network'));
  attachTip(clockEl, () => fmtDate(new Date()));

  tb.addEventListener('contextmenu', e => {
    e.preventDefault();
    if (e.target.closest('.task, .start-btn')) return;
    openMenu([
      { label: '&Toolbars', submenu: [{ label: '&Address' }, { label: '&Links' }, { label: '&Desktop' }, { label: '&Quick Launch', checked: true }, { sep: true }, { label: '&New Toolbar...' }] },
      { sep: true },
      { label: '&Cascade Windows', action: wm.cascadeAll },
      { label: 'Tile Windows &Horizontally', action: () => wm.tileAll(true) },
      { label: 'Tile Windows V&ertically', action: () => wm.tileAll(false) },
      { label: '&Minimize All Windows', action: wm.minimizeAll },
      { sep: true },
      { label: 'P&roperties', action: () => launch('taskbarprops') },
    ], e.clientX, e.clientY);
  });

  wm.onChange(renderTasks);
  tick();
}

function tick() {
  clockEl.dataset.real = fmtTime(new Date());
  if (!clockEl.dataset.egg) clockEl.textContent = clockEl.dataset.real;
  setTimeout(tick, 1000 - (Date.now() % 1000));
}

function showDesktop() {
  const vis = wm.list().filter(w => !w.minimized && w.minimizable);
  if (vis.length) { desktopStash = vis; wm.minimizeAll(); }
  else if (desktopStash) { desktopStash.forEach(w => !w.closed && w.focus()); desktopStash = null; }
}

function renderTasks() {
  tasksEl.textContent = '';
  const act = wm.getActive();
  for (const w of wm.list()) {
    if (!w.taskbar) continue;
    const b = document.createElement('button');
    b.className = 'task' + (w === act && !w.minimized ? ' active' : '');
    b.innerHTML = `<img src="${icon(w.iconName, 16)}" width="16" height="16" alt="" draggable="false"><span></span>`;
    b.lastChild.textContent = w.title;
    attachTip(b, () => (b.lastChild.scrollWidth > b.lastChild.clientWidth ? w.title : ''));
    b.addEventListener('pointerdown', e => { if (e.button === 0) { e.preventDefault(); wm.taskbarClick(w); } });
    b.addEventListener('contextmenu', e => { e.preventDefault(); e.stopPropagation(); wm.focus(w); wm.systemMenu(w, e.clientX, e.clientY); });
    tasksEl.appendChild(b);
  }
}
