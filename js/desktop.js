// Desktop icons: selection, marquee, drag, open, context menus.
import { icon } from './icons.js';
import { openMenu } from './menu.js';
import { launch } from './apps/index.js';
import { setBusy } from './windowManager.js';

const CELL_W = 75, CELL_H = 75;
const SYSTEM = ['mycomputer', 'mydocs', 'ie', 'recycle'];
const items = [
  { id: 'mycomputer', label: 'My Computer', icon: 'computer', kind: 'computer' },
  { id: 'mydocs', label: 'My Documents', icon: 'mydocs' },
  { id: 'ie', label: 'Internet Explorer', icon: 'ie' },
  { id: 'recycle', label: 'Recycle Bin', icon: 'recyclefull', kind: 'recycle' },
  { id: 'cafe', label: 'Café Manager 98', icon: 'cafe', lnk: true },
  { id: 'sessionlog', label: 'Session Log', icon: 'sessionlog', lnk: true },
  { id: 'printq', label: 'Printer Queue', icon: 'printer', lnk: true },
  { id: 'notepad', label: 'Notepad', icon: 'notepad', lnk: true },
  { id: 'paint', label: 'Paint', icon: 'paint', lnk: true },
];
const els = new Map();
let sel = new Set(), focusId = null, root;

const byId = id => items.find(i => i.id === id);
const deskSize = () => ({ w: root.clientWidth, h: root.clientHeight });
const kind = (it, selected) => (it.lnk ? 'lnk' : '') + (selected ? 'sel' : '');

export function initDesktop() {
  root = document.getElementById('icons');
  root.tabIndex = -1;
  arrange();
  items.forEach(render);
  root.addEventListener('pointerdown', onDown);
  root.addEventListener('contextmenu', onMenu);
  root.addEventListener('keydown', onKey);
}

/** Public: add an icon at runtime (used by later steps, e.g. PROPRIETOR). */
export function addIcon(it) {
  const d = deskSize();
  const rows = Math.max(1, Math.floor(d.h / CELL_H));
  const n = items.length;
  it.x = Math.floor(n / rows) * CELL_W; it.y = (n % rows) * CELL_H + 2;
  items.push(it); render(it);
}

function render(it) {
  const el = document.createElement('div');
  el.className = 'icon';
  el.dataset.id = it.id;
  el.innerHTML = `<img src="${icon(it.icon, 32, kind(it, false))}" width="32" height="32" alt="" draggable="false"><span class="label"></span>`;
  el.lastChild.textContent = it.label;
  el.addEventListener('dblclick', () => open(it));
  root.appendChild(el);
  els.set(it.id, el);
  position(it);
}
const position = it => { const el = els.get(it.id); el.style.left = it.x + 'px'; el.style.top = it.y + 'px'; };

function refreshSel() {
  for (const it of items) {
    const el = els.get(it.id), s = sel.has(it.id);
    el.classList.toggle('selected', s);
    el.classList.toggle('focused', focusId === it.id);
    el.firstChild.src = icon(it.icon, 32, kind(it, s));
  }
}
const setSel = ids => { sel = new Set(ids); refreshSel(); };

function open(it) {
  setBusy(true);
  setTimeout(() => { setBusy(false); launch(it.id); }, 180);
}

function arrange(order) {
  const list = order || items;
  const rows = Math.max(1, Math.floor(deskSize().h / CELL_H));
  list.forEach((it, k) => { it.x = Math.floor(k / rows) * CELL_W; it.y = (k % rows) * CELL_H + 2; });
}
function arrangeByName() {
  const sys = SYSTEM.map(byId);
  const rest = items.filter(i => !SYSTEM.includes(i.id)).sort((a, b) => a.label.localeCompare(b.label));
  arrange([...sys, ...rest]);
  items.forEach(position);
}
function lineUp() {
  const taken = new Set();
  const rows = Math.max(1, Math.floor(deskSize().h / CELL_H));
  for (const it of items) {
    let c = Math.max(0, Math.round(it.x / CELL_W)), r = Math.min(rows - 1, Math.max(0, Math.round((it.y - 2) / CELL_H)));
    while (taken.has(c + ':' + r)) { r++; if (r >= rows) { r = 0; c++; } }
    taken.add(c + ':' + r);
    it.x = c * CELL_W; it.y = r * CELL_H + 2;
    position(it);
  }
}

function onDown(e) {
  root.focus({ preventScroll: true });
  const iconEl = e.target.closest('.icon');
  if (!iconEl) {
    if (!e.ctrlKey) { focusId = null; setSel([]); }
    if (e.button === 0) marquee(e);
    return;
  }
  const id = iconEl.dataset.id;
  if (e.ctrlKey && e.button === 0) {
    if (sel.has(id)) sel.delete(id); else sel.add(id);
    focusId = id; refreshSel(); return;
  }
  if (!sel.has(id)) sel = new Set([id]);
  focusId = id;
  refreshSel();
  if (e.button === 0) startDrag(e);
}

function hitRect(el) {
  const a = el.firstChild.getBoundingClientRect(), b = el.lastChild.getBoundingClientRect();
  return { left: Math.min(a.left, b.left), top: a.top, right: Math.max(a.right, b.right), bottom: b.bottom };
}

function marquee(e) {
  const sx = e.clientX, sy = e.clientY, base = new Set(sel);
  let box = null;
  const move = ev => {
    const x0 = Math.min(sx, ev.clientX), y0 = Math.min(sy, ev.clientY), x1 = Math.max(sx, ev.clientX), y1 = Math.max(sy, ev.clientY);
    if (!box) { if (x1 - x0 + y1 - y0 < 3) return; box = document.createElement('div'); box.className = 'marquee'; document.getElementById('screen').appendChild(box); }
    Object.assign(box.style, { left: x0 + 'px', top: y0 + 'px', width: x1 - x0 + 'px', height: y1 - y0 + 'px' });
    const hit = items.filter(it => { const r = hitRect(els.get(it.id)); return !(r.right < x0 || r.left > x1 || r.bottom < y0 || r.top > y1); }).map(it => it.id);
    sel = new Set([...base, ...hit]);
    refreshSel();
  };
  const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); box && box.remove(); };
  window.addEventListener('pointermove', move);
  window.addEventListener('pointerup', up);
}

function startDrag(e) {
  const sx = e.clientX, sy = e.clientY, ids = [...sel];
  let ghosts = null, dx = 0, dy = 0;
  const move = ev => {
    dx = ev.clientX - sx; dy = ev.clientY - sy;
    if (!ghosts) {
      if (Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
      ghosts = ids.map(id => {
        const it = byId(id), g = els.get(id).cloneNode(true);
        g.classList.add('ghost'); g.classList.remove('focused');
        root.appendChild(g);
        return { g, it };
      });
    }
    ghosts.forEach(({ g, it }) => { g.style.left = it.x + dx + 'px'; g.style.top = it.y + dy + 'px'; });
  };
  const up = () => {
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerup', up);
    if (!ghosts) return;
    const d = deskSize();
    ghosts.forEach(({ g, it }) => {
      g.remove();
      it.x = Math.min(Math.max(it.x + dx, 0), d.w - CELL_W);
      it.y = Math.min(Math.max(it.y + dy, 0), d.h - 50);
      position(it);
    });
  };
  window.addEventListener('pointermove', move);
  window.addEventListener('pointerup', up);
}

function onKey(e) {
  if (e.key === 'Enter') [...sel].forEach(id => open(byId(id)));
  if (e.key === 'a' && e.ctrlKey) { e.preventDefault(); setSel(items.map(i => i.id)); }
}

function onMenu(e) {
  e.preventDefault();
  const iconEl = e.target.closest('.icon');
  if (iconEl) openMenu(iconMenu(byId(iconEl.dataset.id)), e.clientX, e.clientY);
  else openMenu(deskMenu(), e.clientX, e.clientY);
}

function deskMenu() {
  return [
    { label: 'Active &Desktop', submenu: [{ label: '&View As Web Page' }, { sep: true }, { label: '&Customize my Desktop...' }, { label: '&Update Now', disabled: true }] },
    { label: 'Arrange &Icons', submenu: [
      { label: 'by &Name', action: arrangeByName }, { label: 'by &Type', action: arrangeByName },
      { label: 'by Si&ze', action: arrangeByName }, { label: 'by &Date', action: arrangeByName },
      { sep: true }, { label: '&Auto Arrange' },
    ] },
    { label: 'Line &Up Icons', action: lineUp },
    { sep: true },
    { label: 'R&efresh', action: () => { root.style.visibility = 'hidden'; setTimeout(() => { root.style.visibility = ''; }, 90); } },
    { sep: true },
    { label: '&Paste', disabled: true },
    { label: 'Paste &Shortcut', disabled: true },
    { sep: true },
    { label: 'Ne&w', submenu: [{ label: '&Folder' }, { label: '&Shortcut' }, { sep: true }, { label: 'Text Document' }, { label: 'Bitmap Image' }, { label: 'Briefcase' }] },
    { sep: true },
    { label: 'P&roperties', action: () => launch('display') },
  ];
}

function iconMenu(it) {
  const openIt = () => [...sel].forEach(id => open(byId(id)));
  if (it.kind === 'computer') return [
    { label: '&Open', bold: true, action: openIt }, { label: 'E&xplore', action: () => launch('explorer') }, { label: '&Find...', action: () => launch('find') },
    { sep: true }, { label: 'Map &Network Drive...' }, { label: '&Disconnect Network Drive...' },
    { sep: true }, { label: 'Create &Shortcut' }, { label: 'Rena&me' }, { sep: true }, { label: 'P&roperties', action: () => launch('sysprops') },
  ];
  if (it.kind === 'recycle') return [
    { label: '&Open', bold: true, action: openIt }, { label: 'E&xplore', action: openIt }, { label: 'Empty Recycle &Bin', action: () => launch('emptybin') },
    { sep: true }, { label: 'Create &Shortcut' }, { sep: true }, { label: 'P&roperties' },
  ];
  return [
    { label: '&Open', bold: true, action: openIt },
    { sep: true },
    { label: 'Se&nd To', submenu: [{ label: '3½ Floppy (A)' }, { label: 'Desktop (create shortcut)' }, { label: 'Mail Recipient' }, { label: 'My Documents' }] },
    { sep: true }, { label: 'Cu&t' }, { label: '&Copy' },
    { sep: true }, { label: 'Create &Shortcut' }, { label: '&Delete' }, { label: 'Rena&me' },
    { sep: true }, { label: 'P&roperties' },
  ];
}
