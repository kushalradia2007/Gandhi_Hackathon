// Shared helpers for the games: pixel sprites, Win98 card faces/backs (DOM + canvas), small modal dialogs.
import { createWindow } from '../../windowManager.js';
import { PAL } from '../../icons.js';

/** rows of palette letters ('.' = transparent) -> canvas. map overrides/extends the VGA palette. */
export function sprite(rows, map = {}, w = rows[0].length, h = rows.length, ox = 0, oy = 0, into = null) {
  const cv = into || document.createElement('canvas');
  if (!into) { cv.width = w; cv.height = h; }
  const x = cv.getContext('2d');
  const pal = { ...PAL, ...map };
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = row[i]; if (c !== '.' && c !== ' ') { x.fillStyle = pal[c]; x.fillRect(ox + i, oy + j, 1, 1); } } });
  return cv;
}
export function canvas(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); x.imageSmoothingEnabled = false; draw(x, w, h); return c; }

/** Replace a window's title-bar icon with our own pixel art (icons.js cannot be extended from here). */
export function setTitleIcon(w, url) { const img = w.el.querySelector('.title-icon'); if (img) img.src = url; }

export const el = html => { const d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; };
export const wait = ms => new Promise(r => setTimeout(r, ms));

/** Modal Win98 dialog around arbitrary content. Returns the window. */
export function dialog(title, content, opts = {}) {
  return createWindow({ title, content, modal: true, noIcon: true, resizable: false, taskbar: false, className: 'dialog', ...opts });
}

/* ================= cards ================= */
export const CW = 71, CH = 96;
// Win98 suit order: clubs, diamonds, hearts, spades. U+FE0E forces text (never emoji) presentation.
export const SUITS = ['♣', '♦', '♥', '♠'];
export const SUIT_TXT = SUITS.map(s => s + '︎');
export const RANKS = ['', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
export const isRed = s => s === 1 || s === 2;

const L = 22, C = 35.5, R = 49;
// pip centres [x, y, upsideDown]
const PIPS = {
  1: [[C, 48, 0]],
  2: [[C, 18, 0], [C, 78, 1]],
  3: [[C, 18, 0], [C, 48, 0], [C, 78, 1]],
  4: [[L, 18, 0], [R, 18, 0], [L, 78, 1], [R, 78, 1]],
  5: [[L, 18, 0], [R, 18, 0], [C, 48, 0], [L, 78, 1], [R, 78, 1]],
  6: [[L, 18, 0], [R, 18, 0], [L, 48, 0], [R, 48, 0], [L, 78, 1], [R, 78, 1]],
  7: [[L, 18, 0], [R, 18, 0], [C, 33, 0], [L, 48, 0], [R, 48, 0], [L, 78, 1], [R, 78, 1]],
  8: [[L, 18, 0], [R, 18, 0], [C, 33, 0], [L, 48, 0], [R, 48, 0], [C, 63, 1], [L, 78, 1], [R, 78, 1]],
  9: [[L, 18, 0], [R, 18, 0], [L, 38, 0], [R, 38, 0], [C, 48, 0], [L, 58, 1], [R, 58, 1], [L, 78, 1], [R, 78, 1]],
  10: [[L, 18, 0], [R, 18, 0], [C, 28, 0], [L, 38, 0], [R, 38, 0], [L, 58, 1], [R, 58, 1], [C, 68, 1], [L, 78, 1], [R, 78, 1]],
};

/** Inner HTML for a face-up card (styled by css/games.css .card). */
export function cardFaceHTML(s, r) {
  const sym = SUIT_TXT[s], rk = RANKS[r];
  const idx = `<div class="ci">${rk}<br>${sym}</div><div class="ci ci-b">${rk}<br>${sym}</div>`;
  if (r > 10) {
    return idx + `<div class="cf"><span class="cf-s cf-tl">${sym}</span><span class="cf-l">${rk}</span><span class="cf-s cf-br">${sym}</span></div>`;
  }
  return idx + PIPS[r].map(([x, y, f]) => `<span class="pip${r === 1 ? ' ace' : ''}${f ? ' flip' : ''}" style="left:${x}px;top:${y}px">${sym}</span>`).join('');
}
export function cardEl(s, r) {
  const d = document.createElement('div');
  d.className = 'card' + (isRed(s) ? ' red' : '');
  d.innerHTML = `<div class="cface">${cardFaceHTML(s, r)}</div>`;
  return d;
}

const faceCache = new Map();
/** Same card drawn on a canvas (used by the Solitaire win cascade). */
export function cardCanvas(s, r) {
  const key = s * 20 + r;
  if (faceCache.has(key)) return faceCache.get(key);
  const cv = canvas(CW, CH, x => {
    x.fillStyle = '#fff'; x.fillRect(0, 0, CW, CH);
    x.fillStyle = '#000'; x.fillRect(0, 0, CW, 1); x.fillRect(0, CH - 1, CW, 1); x.fillRect(0, 0, 1, CH); x.fillRect(CW - 1, 0, 1, CH);
    const col = isRed(s) ? '#ff0000' : '#000000', sym = SUITS[s], rk = RANKS[r];
    x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle';
    const corner = () => { x.font = 'bold 12px Arial, sans-serif'; x.fillText(rk, 9, 8); x.font = '12px Arial, sans-serif'; x.fillText(sym, 9, 21); };
    corner(); x.save(); x.translate(CW, CH); x.rotate(Math.PI); corner(); x.restore();
    if (r > 10) {
      x.strokeStyle = col; x.strokeRect(16.5, 13.5, 37, 68);
      x.font = 'bold 30px "Times New Roman", serif'; x.fillText(rk, CW / 2, CH / 2);
      x.font = '12px Arial, sans-serif'; x.fillText(sym, 23, 21); x.fillText(sym, 47, 75);
    } else {
      x.font = (r === 1 ? 34 : 16) + 'px Arial, sans-serif';
      PIPS[r].forEach(([px, py, f]) => { x.save(); x.translate(px, py); if (f) x.rotate(Math.PI); x.fillText(sym, 0, 1); x.restore(); });
    }
  });
  faceCache.set(key, cv);
  return cv;
}

/* ---- card backs: 71x96 pixel patterns ---- */
function lattice(fg, bg) {
  return canvas(CW, CH, x => {
    x.fillStyle = '#fff'; x.fillRect(0, 0, CW, CH);
    x.fillStyle = '#000'; x.strokeStyle = '#000'; x.strokeRect(0.5, 0.5, CW - 1, CH - 1);
    x.fillStyle = bg; x.fillRect(4, 4, CW - 8, CH - 8);
    x.fillStyle = fg;
    for (let j = 4; j < CH - 4; j++) for (let i = 4; i < CW - 4; i++) {
      const a = (i + j) % 6, b = (i - j + 600) % 6;
      if (a === 0 || b === 0) x.fillRect(i, j, 1, 1);
    }
  });
}
function squares() {
  return canvas(CW, CH, x => {
    x.fillStyle = '#fff'; x.fillRect(0, 0, CW, CH); x.strokeStyle = '#000'; x.strokeRect(0.5, 0.5, CW - 1, CH - 1);
    x.fillStyle = '#000080'; x.fillRect(4, 4, CW - 8, CH - 8);
    for (let j = 6; j < CH - 6; j += 6) for (let i = 6; i < CW - 6; i += 6) { x.fillStyle = (i + j) % 12 ? '#0000ff' : '#00ffff'; x.fillRect(i, j, 3, 3); }
  });
}
function cafe() {
  return canvas(CW, CH, x => {
    x.fillStyle = '#fff'; x.fillRect(0, 0, CW, CH); x.strokeStyle = '#000'; x.strokeRect(0.5, 0.5, CW - 1, CH - 1);
    x.fillStyle = '#800000'; x.fillRect(4, 4, CW - 8, CH - 8);
    x.fillStyle = '#ff8000'; for (let j = 6; j < CH - 6; j += 4) x.fillRect(6, j, CW - 12, 1);
    x.fillStyle = '#800000'; x.fillRect(12, 34, CW - 24, 28);
    x.fillStyle = '#ffff00'; x.font = 'bold 14px "Courier New", monospace'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SCZ', CW / 2, 44); x.font = '9px "Courier New", monospace'; x.fillText('PC 03', CW / 2, 55);
  });
}
const BACK_MAKERS = [() => lattice('#ffffff', '#0000ff'), () => lattice('#ffffff', '#ff0000'), squares, cafe];
const backCache = [];
export const BACK_COUNT = BACK_MAKERS.length;
export function backCanvas(i = 0) { return backCache[i] || (backCache[i] = BACK_MAKERS[i]()); }
export function backURL(i = 0) { const c = backCanvas(i); return c._url || (c._url = c.toDataURL()); }

/* ---- 16x16 window icons (drawn here because icons.js is owned by the shell) ---- */
export const ICON_CARDS = () => sprite([
  '................',
  '..kkkkkkkk......',
  '..kwwwwwwk......',
  '..kwrwwwwkkkkk..',
  '..kwrrwwwkwwwk..',
  '..kwrrrwwkwkwk..',
  '..kwrrwwwkkkwk..',
  '..kwrwwwwkwkwk..',
  '..kwwwwwwkwwwk..',
  '..kwwwwwwkwwwk..',
  '..kkkkkkkkwwwk..',
  '.........kwwwk..',
  '.........kkkkk..',
  '................',
  '................',
  '................',
]).toDataURL();
export const ICON_HEART = () => sprite([
  '................',
  '................',
  '...kkk...kkk....',
  '..krrrk.krrrk...',
  '.krrwrrkrrrrrk..',
  '.krwrrrrrrrrrk..',
  '.krrrrrrrrrrrk..',
  '.krrrrrrrrrrrk..',
  '..krrrrrrrrrk...',
  '...krrrrrrrk....',
  '....krrrrrk.....',
  '.....krrrk......',
  '......krk.......',
  '.......k........',
  '................',
  '................',
]).toDataURL();
