// Window manager: Win98 frames, outline move/size, z-order, modality, taskbar sync, Alt+Tab.
import { lx, ly, ld, sw as screenW, sh as screenH } from './screen.js';
import { icon } from './icons.js';
import { ding } from './sound.js';
import { openMenu } from './menu.js';

const FRAME = 3;
const wins = [];            // creation order = taskbar order
let mru = [];               // most recently used first
let active = null;
let zNext = 100, zModal = 6000, seq = 0, cascadeN = 0;
const subs = new Set();

export const onChange = fn => subs.add(fn);
const emit = () => subs.forEach(fn => fn());
export const list = () => wins.slice();
export const getActive = () => active;
export const setBusy = on => document.documentElement.classList.toggle('busy', on);

const screenEl = () => document.getElementById('screen');
function desk() { const d = document.getElementById('desktop'); return { w: d.clientWidth, h: d.clientHeight }; }

/**
 * o: { title, icon, content(Element|string), width, height, x, y, center, modal,
 *      resizable, minimizable, maximizable, help, noIcon, taskbar, className, onClose, minWidth, minHeight }
 */
export function createWindow(o) {
  const el = document.createElement('div');
  el.className = 'window' + (o.className ? ' ' + o.className : '');
  el.innerHTML = '<div class="title-bar"><span class="title-text"></span><div class="title-buttons"></div></div><div class="window-body"></div>';
  const w = {
    id: ++seq, el, title: o.title || '', iconName: o.icon || 'app',
    modal: !!o.modal, minimized: false, maximized: false, closed: false,
    resizable: o.resizable !== false,
    minimizable: o.minimizable !== false && !o.modal,
    maximizable: o.maximizable !== false && o.resizable !== false && !o.modal,
    taskbar: o.taskbar !== false, onClose: o.onClose,
    minW: o.minWidth || 120, minH: o.minHeight || 60,
    body: el.querySelector('.window-body'),
    close: () => close(w), focus: () => focus(w), minimize: () => minimize(w),
    setTitle: t => { w.title = t; el.querySelector('.title-text').textContent = t; emit(); },
  };
  const bar = el.firstChild;
  bar.querySelector('.title-text').textContent = w.title;

  if (!o.noIcon) {
    const ic = document.createElement('img');
    ic.className = 'title-icon'; ic.src = icon(w.iconName, 16); ic.alt = ''; ic.draggable = false;
    ic.addEventListener('pointerdown', e => { e.stopPropagation(); const r = ic.getBoundingClientRect(); systemMenu(w, r.left, r.bottom); });
    ic.addEventListener('dblclick', e => { e.stopPropagation(); close(w); });
    bar.prepend(ic);
  }
  const btns = bar.querySelector('.title-buttons');
  const mk = (cls, fn, label) => {
    const b = document.createElement('button');
    b.className = cls; b.tabIndex = -1; b.setAttribute('aria-label', label);
    b.addEventListener('pointerdown', e => e.stopPropagation());
    b.addEventListener('click', e => { e.stopPropagation(); fn(); });
    btns.appendChild(b);
    return b;
  };
  if (w.minimizable) mk('tb-min', () => minimize(w), 'Minimize');
  if (w.maximizable) w.maxBtn = mk('tb-max', () => toggleMax(w), 'Maximize');
  if (o.help) mk('tb-help', () => {}, 'Help');
  mk('tb-close', () => close(w), 'Close');

  bar.addEventListener('pointerdown', e => { if (!e.target.closest('button')) startMove(e, w); });
  bar.addEventListener('dblclick', e => { if (!e.target.closest('.title-buttons') && w.maximizable) toggleMax(w); });
  el.addEventListener('pointerdown', () => focus(w), true);

  if (o.content instanceof Node) w.body.appendChild(o.content);
  else if (o.content) w.body.innerHTML = o.content;

  if (w.resizable) {
    for (const dir of ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw']) {
      const h = document.createElement('div');
      h.className = 'rh rh-' + dir;
      h.addEventListener('pointerdown', e => startResize(e, w, dir));
      el.appendChild(h);
    }
  }

  document.getElementById('windows').appendChild(el);
  if (o.width) el.style.width = o.width + 'px';
  if (o.height) el.style.height = o.height + 'px';
  const d = desk();
  let x = o.x, y = o.y;
  if (x == null) {
    if (o.center || o.modal) { x = (d.w - el.offsetWidth) >> 1; y = (d.h - el.offsetHeight) >> 1; }
    else { const k = cascadeN++ % 8; x = 40 + k * 22; y = 30 + k * 22; }
  }
  el.style.left = Math.max(0, x) + 'px';
  el.style.top = Math.max(0, y) + 'px';

  if (w.modal) {
    w.z = (zModal += 2);
    w.blocker = document.createElement('div');
    w.blocker.className = 'modal-blocker';
    w.blocker.style.zIndex = w.z - 1;
    w.blocker.addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); ding(); flash(w); focus(w); });
    w.blocker.addEventListener('contextmenu', e => { e.preventDefault(); e.stopPropagation(); });
    screenEl().appendChild(w.blocker);
  }
  wins.push(w);
  focus(w);
  emit();
  return w;
}

export function focus(w) {
  if (!w || w.closed) return;
  const wasMin = w.minimized;
  if (wasMin) { w.minimized = false; w.el.style.display = ''; }
  if (active === w && !wasMin) return;
  if (w.modal) w.el.style.zIndex = w.z;
  else {
    if (zNext > 4000) renumber();
    w.el.style.zIndex = ++zNext;
  }
  if (active && active !== w) active.el.classList.remove('active');
  active = w;
  w.el.classList.add('active');
  mru = [w, ...mru.filter(x => x !== w)];
  emit();
}
function renumber() {
  zNext = 100;
  wins.filter(w => !w.modal).sort((a, b) => (+a.el.style.zIndex) - (+b.el.style.zIndex)).forEach(w => { w.el.style.zIndex = ++zNext; });
}

function activateNext() {
  active = null;
  const next = mru.find(x => !x.minimized && !x.closed);
  if (next) focus(next); else emit();
}

export function minimize(w) {
  if (!w.minimizable || w.minimized) return;
  w.minimized = true;
  w.el.style.display = 'none';
  w.el.classList.remove('active');
  if (active === w) activateNext(); else emit();
}

function applyMax(w) {
  const d = desk();
  Object.assign(w.el.style, { left: -FRAME + 'px', top: -FRAME + 'px', width: d.w + FRAME * 2 + 'px', height: d.h + FRAME * 2 + 'px' });
}
export function maximize(w) {
  if (w.maximized || !w.maximizable) return;
  if (w.minimized) focus(w);
  const s = w.el.style;
  w.restoreRect = { left: s.left, top: s.top, width: w.el.offsetWidth + 'px', height: w.el.offsetHeight + 'px' };
  w.maximized = true;
  w.el.classList.add('maximized');
  w.maxBtn && w.maxBtn.classList.add('tb-restore');
  applyMax(w);
}
export function restore(w) {
  if (w.minimized) { focus(w); return; }
  if (!w.maximized) return;
  w.maximized = false;
  w.el.classList.remove('maximized');
  w.maxBtn && w.maxBtn.classList.remove('tb-restore');
  Object.assign(w.el.style, w.restoreRect);
}
const toggleMax = w => (w.maximized ? restore(w) : maximize(w));

export function close(w) {
  if (w.closed) return;
  if (w.onClose && w.onClose() === false) return;
  w.closed = true;
  w.el.remove();
  w.blocker && w.blocker.remove();
  wins.splice(wins.indexOf(w), 1);
  mru = mru.filter(x => x !== w);
  if (active === w) activateNext(); else emit();
}
export function closeAll() { wins.slice().forEach(close); }

/** Taskbar button semantics: restore if minimised, minimise if active, else activate */
export function taskbarClick(w) {
  const modal = wins.find(x => x.modal && !x.closed);
  if (modal) { ding(); flash(modal); return; }
  if (w.minimized) focus(w);
  else if (active === w) minimize(w);
  else focus(w);
}

function flash(w) {
  let n = 0;
  clearInterval(w.flashT);
  w.flashT = setInterval(() => {
    w.el.classList.toggle('flash');
    if (++n >= 8) { clearInterval(w.flashT); w.el.classList.remove('flash'); }
  }, 70);
}

export function systemMenu(w, x, y) {
  openMenu([
    { label: '&Restore', disabled: !w.maximized && !w.minimized, action: () => restore(w) },
    { label: '&Move', disabled: w.maximized },
    { label: '&Size', disabled: w.maximized || !w.resizable },
    { label: 'Mi&nimize', disabled: !w.minimizable || w.minimized, action: () => minimize(w) },
    { label: 'Ma&ximize', disabled: !w.maximizable || w.maximized, action: () => maximize(w) },
    { sep: true },
    { label: '&Close', bold: true, shortcut: 'Alt+F4', action: () => close(w) },
  ], x, y);
}

/* ---------- outline move / size ---------- */
function outline(r) {
  const o = document.createElement('div');
  o.className = 'drag-outline';
  screenEl().appendChild(o);
  placeOutline(o, r);
  return o;
}
function placeOutline(o, r) { Object.assign(o.style, { left: r.x + 'px', top: r.y + 'px', width: r.w + 'px', height: r.h + 'px' }); }
function rectOf(w) { return { x: w.el.offsetLeft, y: w.el.offsetTop, w: w.el.offsetWidth, h: w.el.offsetHeight }; }
function drag(e, onMove, onDone) {
  e.preventDefault();
  const sx = e.clientX, sy = e.clientY;
  const move = ev => onMove(ld(ev.clientX - sx), ld(ev.clientY - sy));
  const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); onDone(); };
  window.addEventListener('pointermove', move);
  window.addEventListener('pointerup', up);
}

function startMove(e, w) {
  if (e.button !== 0 || w.maximized) return;
  const r = rectOf(w), d = desk();
  let o = null, nr = r, px = lx(e.clientX), py = ly(e.clientY);
  drag(e, (dx, dy) => {
    px = lx(e.clientX) + dx; py = ly(e.clientY) + dy;
    if (!o) { if (Math.abs(dx) + Math.abs(dy) < 2) return; o = outline(r); }
    nr = { ...r, x: Math.min(Math.max(r.x + dx, 40 - r.w), d.w - 40), y: Math.min(Math.max(r.y + dy, 0), d.h - 20) };
    placeOutline(o, nr);
  }, () => {
    if (!o) return;
    o.remove();
    // A09: there is no outside
    if (px <= 1 || px >= screenW() - 2 || py <= 1 || py >= d.h + 2) {
      window.dispatchEvent(new CustomEvent('scz-offscreen', { detail: { x: Math.min(Math.max(px, 10), screenW() - 160), y: Math.min(Math.max(py, 10), d.h - 30), local: true } }));
      return;
    }
    w.el.style.left = nr.x + 'px';
    w.el.style.top = nr.y + 'px';
  });
}

function startResize(e, w, dir) {
  if (e.button !== 0 || w.maximized) return;
  e.stopPropagation();
  focus(w);
  const r = rectOf(w);
  const o = outline(r);
  let nr = r;
  drag(e, (dx, dy) => {
    let { x, y, w: W, h: H } = r;
    if (dir.includes('e')) W = Math.max(w.minW, r.w + dx);
    if (dir.includes('s')) H = Math.max(w.minH, r.h + dy);
    if (dir.includes('w')) { W = Math.max(w.minW, r.w - dx); x = r.x + r.w - W; }
    if (dir.includes('n')) { H = Math.max(w.minH, r.h - dy); y = r.y + r.h - H; }
    nr = { x, y, w: W, h: H };
    placeOutline(o, nr);
  }, () => {
    o.remove();
    Object.assign(w.el.style, { left: nr.x + 'px', top: nr.y + 'px', width: nr.w + 'px', height: nr.h + 'px' });
  });
}

/* ---------- arrange ---------- */
export function cascadeAll() {
  wins.filter(w => !w.minimized && !w.modal).forEach((w, k) => {
    if (w.maximized) restore(w);
    w.el.style.left = k * 22 + 'px'; w.el.style.top = k * 22 + 'px';
    focus(w);
  });
}
export function tileAll(horizontal) {
  const vis = wins.filter(w => !w.minimized && !w.modal);
  if (!vis.length) return;
  const d = desk(), n = vis.length;
  vis.forEach((w, k) => {
    if (w.maximized) restore(w);
    const r = horizontal
      ? { left: 0, top: Math.floor(k * d.h / n), width: d.w, height: Math.floor(d.h / n) }
      : { left: Math.floor(k * d.w / n), top: 0, width: Math.floor(d.w / n), height: d.h };
    Object.assign(w.el.style, { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px' });
  });
}
export function minimizeAll() { wins.forEach(w => minimize(w)); }

/* ---------- keyboard: Alt+Tab, Alt+F4 ---------- */
let sw = null;
function openSwitcher() {
  const items = mru.filter(w => w.taskbar && !w.closed);
  if (!items.length) return false;
  const el = document.createElement('div');
  el.className = 'alttab';
  el.innerHTML = '<div class="at-icons"></div><div class="at-title"></div>';
  items.forEach(w => {
    const c = document.createElement('div');
    c.className = 'at-cell';
    c.innerHTML = `<img src="${icon(w.iconName, 32)}" width="32" height="32" alt="">`;
    el.firstChild.appendChild(c);
  });
  screenEl().appendChild(el);
  el.style.left = ((screenW() - el.offsetWidth) >> 1) + 'px';
  el.style.top = ((screenH() - el.offsetHeight) >> 1) + 'px';
  sw = { el, items, idx: 0 };
  return true;
}
function cycle(d) {
  sw.idx = (sw.idx + d + sw.items.length) % sw.items.length;
  [...sw.el.firstChild.children].forEach((c, i) => c.classList.toggle('sel', i === sw.idx));
  sw.el.lastChild.textContent = sw.items[sw.idx].title;
}
export function initKeys() {
  document.addEventListener('keydown', e => {
    if (e.altKey && e.code === 'Tab') {
      e.preventDefault();
      if (!sw && !openSwitcher()) return;
      cycle(e.shiftKey ? -1 : 1);
    } else if (e.altKey && e.code === 'F4') {
      e.preventDefault();
      if (active) close(active);
    } else if (e.key === 'Escape' && sw) { sw.el.remove(); sw = null; }
  });
  document.addEventListener('keyup', e => {
    if (e.key === 'Alt' && sw) { const w = sw.items[sw.idx]; sw.el.remove(); sw = null; focus(w); }
  });
  window.addEventListener('resize', () => wins.forEach(w => w.maximized && applyMax(w)));
}
