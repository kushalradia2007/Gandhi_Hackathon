// Popup menus: context menus, the Start menu and its cascades, window menus.
import { lx, ly, lrect, sw, sh } from './screen.js';
import { icon } from './icons.js';

let stack = [];          // open menu levels, 0 = root
let rootOpts = {};
let hoverTimer = 0;
const SHOW_DELAY = 400;  // Win98 MenuShowDelay default

const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
/** '&x' underlines the mnemonic x; '&&' is a literal ampersand */
export function labelHTML(label) {
  let out = '';
  for (let i = 0; i < label.length; i++) {
    const c = label[i];
    if (c === '&' && label[i + 1] === '&') { out += '&amp;'; i++; }
    else if (c === '&' && i + 1 < label.length) { out += '<u>' + esc(label[i + 1]) + '</u>'; i++; }
    else out += esc(c);
  }
  return out;
}
const mnemonic = label => { const m = /&([^&])/.exec(label || ''); return m ? m[1].toLowerCase() : null; };

export const isOpen = () => stack.length > 0;

/** opts: { variant: 'plain'|'start', above: bool, owner: Element, onClose, keyboard } */
export function openMenu(items, x, y, opts = {}) {
  closeMenus();
  rootOpts = opts;
  const m = build(items, opts.variant || 'plain', 0);
  place(m.el, x, y, opts);
  document.addEventListener('pointerdown', outside, true);
  document.addEventListener('keydown', onKey, true);
  if (opts.keyboard) select(m, nextItem(m, -1, 1));
  return m;
}

export function closeMenus() {
  clearTimeout(hoverTimer);
  if (!stack.length) return;
  stack.forEach(m => m.el.remove());
  stack = [];
  document.removeEventListener('pointerdown', outside, true);
  document.removeEventListener('keydown', onKey, true);
  const cb = rootOpts.onClose; rootOpts = {};
  if (cb) cb();
}

function outside(e) {
  if (e.target.closest('.menu')) return;
  if (rootOpts.owner && rootOpts.owner.contains(e.target)) return; // owner toggles itself
  e.stopPropagation();
  closeMenus();
}

function build(items, variant, level) {
  if (typeof items === 'function') items = items();
  if (!items.length) items = [{ label: '(Empty)', disabled: true, icon: null }];
  const el = document.createElement('div');
  el.className = 'menu menu-' + variant;
  const m = { el, items, variant, level, sel: -1, rows: [], child: null, parentIndex: -1 };
  let list = el;
  if (variant === 'start') {
    el.innerHTML = '<div class="start-banner"><span><b>Windows</b>98</span></div><div class="start-items"></div>';
    list = el.lastChild;
  }
  items.forEach((it, i) => {
    if (it.sep) { const s = document.createElement('div'); s.className = 'menu-sep'; list.appendChild(s); m.rows.push(s); return; }
    const r = document.createElement('div');
    r.className = 'menu-item' + (it.disabled ? ' disabled' : '') + (it.bold ? ' bold' : '');
    let h = '';
    if (variant === 'plain') h += `<span class="mi-check">${it.checked ? '<i class="check"></i>' : ''}</span>`;
    else if (it.icon === null) h += '<span class="mi-icon"></span>';
    else h += `<img class="mi-icon" src="${icon(it.icon || 'app', variant === 'start' ? 32 : 16)}" alt="" draggable="false">`;
    h += `<span class="mi-label">${labelHTML(it.label)}</span>`;
    if (it.shortcut) h += `<span class="mi-key">${esc(it.shortcut)}</span>`;
    h += `<span class="mi-arrow">${it.submenu ? '<i class="arrow"></i>' : ''}</span>`;
    r.innerHTML = h;
    r.addEventListener('pointerenter', () => hover(m, i));
    r.addEventListener('pointerup', e => { if (e.button === 0 || e.button === 2) activate(m, i); });
    list.appendChild(r);
    m.rows.push(r);
  });
  el.addEventListener('pointerleave', () => { if (!m.child) select(m, -1); });
  el.addEventListener('contextmenu', e => e.preventDefault());
  document.getElementById('menus').appendChild(el);
  stack[level] = m;
  return m;
}

function place(el, x, y, opts) {
  const W = el.offsetWidth, H = el.offsetHeight, vw = sw(), vh = sh();
  x = lx(x); y = ly(y);
  if (opts.above) y -= H;
  else if (y + H > vh) y = Math.max(0, y - H);
  if (x + W > vw) x = Math.max(0, x - W);
  el.style.left = Math.round(x) + 'px';
  el.style.top = Math.round(Math.max(0, y)) + 'px';
}
function placeSub(el, r) {
  r = lrect(r);
  const W = el.offsetWidth, H = el.offsetHeight;
  let x = r.right - 3, y = r.top - 3;
  if (x + W > sw()) x = r.left - W + 3;
  if (y + H > sh()) y = sh() - H;
  el.style.left = Math.round(Math.max(0, x)) + 'px';
  el.style.top = Math.round(Math.max(0, y)) + 'px';
}

function select(m, i) {
  m.sel = i;
  m.rows.forEach((r, j) => r.classList.toggle('sel', j === i));
}

function hover(m, i) {
  for (let l = 0; l < m.level; l++) select(stack[l], stack[l + 1].parentIndex);
  select(m, i);
  clearTimeout(hoverTimer);
  const it = m.items[i];
  const childIsOther = m.child && m.child.parentIndex !== i;
  const wantsChild = it.submenu && !it.disabled && (!m.child || m.child.parentIndex !== i);
  if (childIsOther || wantsChild) {
    hoverTimer = setTimeout(() => {
      closeFrom(m.level + 1);
      if (wantsChild) openSub(m, i, false);
    }, SHOW_DELAY);
  }
}

function openSub(m, i, keyboard) {
  closeFrom(m.level + 1);
  const child = build(m.items[i].submenu, m.variant === 'plain' ? 'plain' : 'cascade', m.level + 1);
  child.parentIndex = i;
  m.child = child;
  placeSub(child.el, m.rows[i].getBoundingClientRect());
  if (keyboard) select(child, nextItem(child, -1, 1));
}

function closeFrom(level) {
  while (stack.length > level) stack.pop().el.remove();
  if (stack[level - 1]) stack[level - 1].child = null;
}

function activate(m, i) {
  const it = m.items[i];
  if (!it || it.sep || it.disabled) return;
  if (it.submenu) {
    clearTimeout(hoverTimer);
    if (!m.child || m.child.parentIndex !== i) openSub(m, i, false);
    return;
  }
  closeMenus();
  if (it.action) it.action();
}

function nextItem(m, from, d) {
  const n = m.items.length;
  let i = from < 0 ? (d > 0 ? -1 : n) : from;
  for (let k = 0; k < n; k++) { i = (i + d + n) % n; if (!m.items[i].sep) return i; }
  return from;
}

function onKey(e) {
  const m = stack[stack.length - 1];
  if (!m) return;
  const k = e.key;
  const stop = () => { e.preventDefault(); e.stopPropagation(); };
  if (k === 'Escape') { stop(); if (stack.length > 1) closeFrom(stack.length - 1); else closeMenus(); }
  else if (k === 'ArrowDown' || k === 'ArrowUp') { stop(); select(m, nextItem(m, m.sel, k === 'ArrowDown' ? 1 : -1)); }
  else if (k === 'ArrowRight') { stop(); const it = m.items[m.sel]; if (it && it.submenu && !it.disabled) openSub(m, m.sel, true); }
  else if (k === 'ArrowLeft') { stop(); if (stack.length > 1) closeFrom(stack.length - 1); }
  else if (k === 'Enter') { stop(); if (m.sel >= 0) { const it = m.items[m.sel]; if (it.submenu) openSub(m, m.sel, true); else activate(m, m.sel); } }
  else if (k.length === 1 && !e.ctrlKey && !e.altKey) {
    const i = m.items.findIndex(it => !it.sep && mnemonic(it.label) === k.toLowerCase());
    if (i >= 0) { stop(); select(m, i); if (m.items[i].submenu) openSub(m, i, true); else activate(m, i); }
  }
}

/** Window menu bar. defs: [{ label: '&File', items: [...] | () => [...] }]. flat = Explorer-style raised/sunken hover. */
export function menuBar(defs, flat = false) {
  const bar = document.createElement('div');
  bar.className = 'menubar' + (flat ? ' flat' : '');
  let openIdx = -1;
  const show = i => {
    const b = bar.children[i], r = b.getBoundingClientRect();
    openMenu(defs[i].items, r.left, r.bottom, { owner: bar, onClose: () => { b.classList.remove('open'); if (openIdx === i) openIdx = -1; } });
    b.classList.add('open');
    openIdx = i;
  };
  defs.forEach((d, i) => {
    const b = document.createElement('div');
    b.className = 'mb-item';
    b.innerHTML = labelHTML(d.label);
    b.addEventListener('pointerdown', e => { e.preventDefault(); if (openIdx === i) closeMenus(); else show(i); });
    b.addEventListener('pointerenter', () => { if (openIdx >= 0 && openIdx !== i) show(i); });
    bar.appendChild(b);
  });
  return bar;
}
