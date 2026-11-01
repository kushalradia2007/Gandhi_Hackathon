// Minesweeper (games.md section 3): Beginner/Intermediate/Expert/Custom, first click safe, flood fill,
// flags + marks, chord (middle or left+right), 7-segment LEDs, smiley, Best Times eggs, xyzzy pixel cheat.
import { createWindow, getActive } from '../../windowManager.js';
import { menuBar } from '../../menu.js';
import { messageBox } from '../../dialogs.js';
import { register, launch } from '../index.js';
import { sprite, canvas, setTitleIcon, el, dialog } from './common.js';

const LEVELS = { beginner: [9, 9, 10], intermediate: [16, 16, 40], expert: [16, 30, 99] };
const LEVEL_NAME = { beginner: 'Beginner', intermediate: 'Intermediate', expert: 'Expert' };
// The machine's records. Impossible, and never replaced.
const RECORDS = [['Beginner', 3, 'SEAT_00'], ['Intermediate', 8, 'EIPSTEIN'], ['Expert', 14, 'PROPRIETOR']];
const others = [];           // the player's "records": always XX seconds
const opts = { level: 'beginner', custom: [9, 9, 10], marks: true, color: true, sound: false };

/* ================= pixel art ================= */
const GLYPH = {
  1: ['...##...', '..###...', '.####...', '...##...', '...##...', '...##...', '...##...', '...##...', '.######.', '.######.'],
  2: ['.######.', '##....##', '......##', '......##', '....###.', '..###...', '.##.....', '##......', '########', '########'],
  3: ['.######.', '##....##', '......##', '......##', '...####.', '......##', '......##', '......##', '##....##', '.######.'],
  4: ['....###.', '...####.', '..##.##.', '.##..##.', '##...##.', '########', '########', '.....##.', '.....##.', '.....##.'],
  5: ['########', '##......', '##......', '#######.', '......##', '......##', '......##', '......##', '##....##', '.######.'],
  6: ['.######.', '##....##', '##......', '##......', '#######.', '##....##', '##....##', '##....##', '##....##', '.######.'],
  7: ['########', '########', '......##', '.....##.', '....##..', '...##...', '...##...', '..##....', '..##....', '..##....'],
  8: ['.######.', '##....##', '##....##', '##....##', '.######.', '##....##', '##....##', '##....##', '##....##', '.######.'],
  q: ['..####..', '.##..##.', '.....##.', '....##..', '...##...', '...##...', '...##...', '........', '...##...', '...##...'],
};
const NUM_COL = { 1: '#0000ff', 2: '#008000', 3: '#ff0000', 4: '#000080', 5: '#800000', 6: '#008080', 7: '#000000', 8: '#808080', q: '#000000' };
const MINE = ['......k......', '......k......', '..k.kkkkk.k..', '...kkkkkkk...', '..kkwwkkkkk..', '..kkwwkkkkk..', 'kkkkkkkkkkkkk', '..kkkkkkkkk..', '..kkkkkkkkk..', '...kkkkkkk...', '..k.kkkkk.k..', '......k......', '......k......'];
const FLAG = ['.....rrk....', '...rrrrk....', '..rrrrrk....', '...rrrrk....', '.....rrk....', '.......k....', '.......k....', '.....kkkk...', '...kkkkkkkk.', '...kkkkkkkk.'];

let ART = null;
function art() {
  if (ART) return ART;
  const cell = draw => canvas(16, 16, draw).toDataURL();
  const glyph = (k) => cell(x => { x.fillStyle = NUM_COL[k]; GLYPH[k].forEach((row, j) => { for (let i = 0; i < 8; i++) if (row[i] === '#') x.fillRect(4 + i, 3 + j, 1, 1); }); });
  ART = { n: {}, mine: sprite(MINE, {}, 16, 16, 1, 1, canvas(16, 16, () => {})).toDataURL(), flag: sprite(FLAG, {}, 16, 16, 2, 3, canvas(16, 16, () => {})).toDataURL(), q: glyph('q') };
  for (let k = 1; k <= 8; k++) ART.n[k] = glyph(k);
  ART.wrong = (() => { const c = canvas(16, 16, () => {}); sprite(MINE, {}, 16, 16, 1, 1, c); const x = c.getContext('2d'); x.fillStyle = '#ff0000'; for (let i = 0; i < 12; i++) { x.fillRect(2 + i, 2 + i, 1, 1); x.fillRect(3 + i, 2 + i, 1, 1); x.fillRect(13 - i, 2 + i, 1, 1); x.fillRect(14 - i, 2 + i, 1, 1); } return c.toDataURL(); })();
  // smiley faces, 17x17
  const face = feat => { const c = canvas(17, 17, x => { const g = (col, cx, cy, r) => { x.fillStyle = col; for (let j = 0; j < 17; j++) for (let i = 0; i < 17; i++) { const dx = i + 0.5 - cx, dy = j + 0.5 - cy; if (dx * dx + dy * dy <= r * r) x.fillRect(i, j, 1, 1); } }; g('#000', 8.5, 8.5, 8.5); g('#ffff00', 8.5, 8.5, 7.4); }); sprite(feat, {}, 17, 17, 0, 0, c); return c.toDataURL(); };
  const E = '.................';
  ART.smile = face([E, E, E, E, E, '.....kk...kk.....', '.....kk...kk.....', E, E, E, '....k.......k....', '.....k.....k.....', '......kkkkk......']);
  ART.ooh = face([E, E, E, E, E, '.....kk...kk.....', '.....kk...kk.....', E, E, '.......kkk.......', '......k...k......', '......k...k......', '.......kkk.......']);
  ART.cool = face([E, E, E, E, '...kkkkkkkkkkk...', '...kkkkk.kkkkk...', '....kkk...kkk....', '.....k.....k.....', E, E, '....k.......k....', '.....k.....k.....', '......kkkkk......']);
  ART.dead = face([E, E, E, E, '....k.k...k.k....', '.....k.....k.....', '....k.k...k.k....', E, E, E, '......kkkkk......', '.....k.....k.....', '....k.......k....']);
  ART.icon = (() => { const c = canvas(16, 16, () => {}); sprite(MINE, {}, 16, 16, 1, 1, c); return c.toDataURL(); })();
  return ART;
}

/* 7-segment LED: digits 13x23, segments lit #ff0000, unlit #800000 */
const SEG = { 0: 'abcdef', 1: 'bc', 2: 'abged', 3: 'abgcd', 4: 'fgbc', 5: 'afgcd', 6: 'afgedc', 7: 'abc', 8: 'abcdefg', 9: 'abcdfg', '-': 'g' };
function drawDigit(x, ox, ch) {
  const on = SEG[ch] || '';
  const px = (s, r, c0, c1) => { x.fillStyle = on.includes(s) ? '#ff0000' : '#800000'; x.fillRect(ox + c0, r + 1, c1 - c0 + 1, 1); };
  const pv = (s, c, r0, r1) => { x.fillStyle = on.includes(s) ? '#ff0000' : '#800000'; x.fillRect(ox + c, r0 + 1, 1, r1 - r0 + 1); };
  for (let r = 0; r < 3; r++) px('a', r, 1 + r, 11 - r);
  px('g', 10, 2, 10); px('g', 11, 1, 11); px('g', 12, 2, 10);
  for (let r = 0; r < 3; r++) px('d', 20 + r, 3 - r, 9 + r);
  for (let c = 0; c < 3; c++) { pv('f', c, 1 + c, 10 - c); pv('b', 12 - c, 1 + c, 10 - c); pv('e', c, 12 + c, 21 - c); pv('c', 12 - c, 12 + c, 21 - c); }
}
function ledText(n) { n = Math.max(-99, Math.min(999, n)); return n < 0 ? '-' + String(-n).padStart(2, '0') : String(n).padStart(3, '0'); }
function drawLed(cv, n) { const x = cv.getContext('2d'); x.fillStyle = '#000'; x.fillRect(0, 0, cv.width, cv.height); [...ledText(n)].forEach((ch, i) => drawDigit(x, 1 + i * 13, ch)); }

/* ================= xyzzy (global, like the real thing) ================= */
const xy = { active: false, since: 0, pixel: null, buf: '', eggT: 0, eggOn: false, youUntil: 0 };
function xyzzyPixel() {
  if (!xy.pixel) {
    xy.pixel = document.createElement('div');
    xy.pixel.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;background:#FFFFFF;z-index:99999;pointer-events:none;';
    document.body.appendChild(xy.pixel);
  }
  return xy.pixel;
}
function activateXyzzy() {
  if (xy.active) return;
  xy.active = true; xy.since = Date.now();
  xyzzyPixel();
  // G02: after 60 s the pixel turns yellow and the corner says it knows.
  xy.eggT = setTimeout(() => {
    xy.eggOn = true; xy.pixel.style.background = '#FFFF00';
    const tip = document.createElement('div');
    tip.className = 'tooltip'; tip.textContent = 'You know the cheat.';
    tip.style.left = '2px'; tip.style.top = '2px';
    document.body.appendChild(tip);
    setTimeout(() => { tip.remove(); xy.eggOn = false; xy.pixel.style.background = '#FFFFFF'; }, 3000);
  }, 60000);
}

/* ================= the game window ================= */
register('minesweeper', () => {
  const A = art();
  const body = el(`<div class="ms-wrap"><div class="ms"><div class="ms-top"><canvas class="ms-led" width="41" height="25"></canvas><button class="ms-face" aria-label="New game"><img alt="" width="17" height="17" draggable="false"></button><canvas class="ms-led" width="41" height="25"></canvas></div><div class="ms-grid"></div></div></div>`);
  const ms = body.querySelector('.ms'), grid = body.querySelector('.ms-grid'), faceBtn = body.querySelector('.ms-face'), faceImg = faceBtn.firstChild;
  const [ledMines, ledTime] = body.querySelectorAll('.ms-led');
  let R, Cn, M, mine, adj, st, cells, placed, over, won, opened, flags, t, timer;

  const setFace = f => { faceImg.src = A[f]; };
  const counter = () => drawLed(ledMines, M - flags);
  const tick = () => drawLed(ledTime, t);

  function newGame() {
    [R, Cn, M] = opts.level === 'custom' ? opts.custom : LEVELS[opts.level];
    mine = new Uint8Array(R * Cn); adj = new Uint8Array(R * Cn); st = new Uint8Array(R * Cn); // st: 0 hidden 1 open 2 flag 3 question
    placed = false; over = false; won = false; opened = 0; flags = 0; t = 0;
    clearInterval(timer); timer = 0;
    grid.style.gridTemplateColumns = `repeat(${Cn}, 16px)`;
    grid.textContent = '';
    cells = [];
    for (let i = 0; i < R * Cn; i++) { const c = document.createElement('div'); c.className = 'ms-c'; c.dataset.i = i; grid.appendChild(c); cells.push(c); }
    setFace('smile'); counter(); tick();
  }
  const nbrs = i => { const r = (i / Cn) | 0, c = i % Cn, out = []; for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) { const rr = r + dr, cc = c + dc; if ((dr || dc) && rr >= 0 && cc >= 0 && rr < R && cc < Cn) out.push(rr * Cn + cc); } return out; };

  // First click is always safe: mines are placed after it, away from the clicked cell (and its neighbours when room allows).
  function place(first) {
    const keep = new Set([first]);
    if (R * Cn - 9 >= M) nbrs(first).forEach(j => keep.add(j));
    const pool = []; for (let i = 0; i < R * Cn; i++) if (!keep.has(i)) pool.push(i);
    for (let k = 0; k < M; k++) { const j = k + ((Math.random() * (pool.length - k)) | 0); [pool[k], pool[j]] = [pool[j], pool[k]]; mine[pool[k]] = 1; }
    for (let i = 0; i < R * Cn; i++) adj[i] = nbrs(i).reduce((s, j) => s + mine[j], 0);
    placed = true;
    t = 1; tick();
    timer = setInterval(() => { if (t < 999) { t++; tick(); } }, 1000);
  }

  function paint(i) {
    const c = cells[i], s = st[i];
    c.className = 'ms-c' + (s === 1 ? ' o' : '');
    c.style.backgroundImage = s === 2 ? `url(${A.flag})` : s === 3 ? `url(${A.q})` : s === 1 && adj[i] ? `url(${A.n[adj[i]]})` : '';
  }

  function reveal(i) {
    if (over || st[i] !== 0) return;
    if (!placed) place(i);
    if (mine[i]) return lose(i);
    const stack = [i];
    while (stack.length) {
      const k = stack.pop();
      if (st[k] === 1 || st[k] === 2) continue;
      if (st[k] === 3) st[k] = 0;
      st[k] = 1; opened++; paint(k);
      if (!adj[k]) nbrs(k).forEach(j => { if (st[j] === 0 || st[j] === 3) stack.push(j); });
    }
    if (opened === R * Cn - M) win();
  }
  function chordAt(i) {
    if (over || st[i] !== 1 || !adj[i]) return;
    const ns = nbrs(i);
    if (ns.filter(j => st[j] === 2).length !== adj[i]) return;
    for (const j of ns) { if (st[j] === 0 || st[j] === 3) { if (mine[j]) { lose(j); return; } reveal(j); } }
  }
  function mark(i) {
    if (over || st[i] === 1) return;
    if (st[i] === 0) { st[i] = 2; flags++; }
    else if (st[i] === 2) { flags--; st[i] = opts.marks ? 3 : 0; }
    else st[i] = 0;
    paint(i); counter();
  }
  function stop() { over = true; clearInterval(timer); timer = 0; }
  function lose(i) {
    stop();
    for (let k = 0; k < R * Cn; k++) {
      const c = cells[k];
      if (mine[k] && st[k] !== 2) { c.className = 'ms-c o'; c.style.backgroundImage = `url(${A.mine})`; }
      else if (!mine[k] && st[k] === 2) { c.className = 'ms-c o'; c.style.backgroundImage = `url(${A.wrong})`; }
    }
    cells[i].classList.add('boom');
    setFace('dead');
  }
  async function win() {
    stop(); won = true;
    for (let k = 0; k < R * Cn; k++) if (mine[k] && st[k] !== 2) { st[k] = 2; paint(k); }
    flags = M; counter(); setFace('cool');
    if (opts.level === 'custom') return;
    const name = await askName(LEVEL_NAME[opts.level]);
    if (name) { others.push(name); bestTimes(); }
  }

  /* ---- mouse: left reveal, right mark, middle or left+right chord ---- */
  let g = null, pressed = [];
  const cellAt = e => { const c = e.target.closest && e.target.closest('.ms-c'); return c && grid.contains(c) ? +c.dataset.i : -1; };
  function preview(i) {
    pressed.forEach(k => { if (st[k] === 0 || st[k] === 3) cells[k].classList.remove('p'); });
    pressed = [];
    if (i < 0 || !g || over) return;
    const list = g.chord ? [i, ...nbrs(i)] : [i];
    list.forEach(k => { if (st[k] === 0 || st[k] === 3) { cells[k].classList.add('p'); pressed.push(k); } });
  }
  grid.addEventListener('mousedown', e => {
    e.preventDefault();
    if (over) return;
    const i = cellAt(e);
    if (e.button === 2) {
      if (g && g.left) { g.chord = true; preview(i); return; }
      if (i >= 0) mark(i);
      g = { right: true };
      return;
    }
    if (e.button === 1) g = { chord: true };
    else if (e.button === 0) g = { left: true, chord: !!(e.buttons & 2) || !!(g && g.right) };
    else return;
    setFace('ooh'); preview(i);
  });
  const move = e => { if (g && (g.left || g.chord)) preview(cellAt(e)); };
  const up = e => {
    if (!g) return;
    const cur = g;
    if (cur.right && !cur.left && !cur.chord) { if (!e.buttons) g = null; return; }
    const i = cellAt(e);
    preview(-1); g = null;
    if (!over) setFace('smile');
    if (i < 0) return;
    if (cur.chord) chordAt(i); else if (cur.left) reveal(i);
  };
  document.addEventListener('mousemove', move);
  document.addEventListener('mouseup', up);
  grid.addEventListener('contextmenu', e => e.preventDefault());
  grid.addEventListener('auxclick', e => e.preventDefault());

  // xyzzy: hovering a cell sets the top-left screen pixel. White = safe, black = mine.
  grid.addEventListener('mouseover', e => {
    if (!xy.active || xy.eggOn) return;
    const i = cellAt(e);
    if (i < 0) return;
    xyzzyPixel().style.background = placed && mine[i] ? '#000000' : '#FFFFFF';
  });

  faceBtn.addEventListener('mousedown', e => { e.preventDefault(); faceBtn.classList.add('down'); });
  faceBtn.addEventListener('mouseleave', () => faceBtn.classList.remove('down'));
  faceBtn.addEventListener('mouseup', () => { if (faceBtn.classList.contains('down')) { faceBtn.classList.remove('down'); newGame(); } });

  /* ---- dialogs ---- */
  function askName(level) {
    return new Promise(resolve => {
      const b = el(`<div class="msgbox" style="width:250px"><p>You have the fastest time<br>for ${level} level.<br><br>What name do you want to use?</p><input type="text" maxlength="32" value="" style="width:100%;margin:10px 0 12px"><div class="dlg-btns center"><button class="default">OK</button><button>Cancel</button></div></div>`);
      const inp = b.querySelector('input'); let val = null;
      const d = dialog('Congratulations!', b, { onClose: () => resolve(val) });
      const [ok, cancel] = b.querySelectorAll('button');
      ok.onclick = () => { val = inp.value.trim() || 'Anonymous'; d.close(); };
      cancel.onclick = () => d.close();
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') ok.onclick(); if (e.key === 'Escape') d.close(); });
      inp.focus();
    });
  }
  function bestTimes() {
    const b = el(`<div class="msgbox ms-best"><fieldset><legend>Fastest Mine Sweepers</legend><table></table></fieldset><div class="dlg-btns center"><button>&nbsp;&nbsp;Reset Scores&nbsp;&nbsp;</button><button class="default">OK</button></div></div>`);
    const tbl = b.querySelector('table');
    const render = () => {
      const you = Date.now() < xy.youUntil;
      tbl.innerHTML = RECORDS.map(([lv, s, n]) => `<tr><td>${lv}:</td><td class="r">${String(s).padStart(3, '0')} seconds</td><td>${you ? 'YOU' : n}</td></tr>`).join('') +
        (others.length ? `<tr><td colspan="3"><hr class="ms-hr">Other players:</td></tr>` + others.map(n => `<tr><td></td><td class="r">XX seconds</td><td>${n.replace(/[<>&"]/g, '')}</td></tr>`).join('') : '');
    };
    // G04: with xyzzy active, every record belongs to YOU for three seconds.
    if (xy.active) { xy.youUntil = Date.now() + 3000; setTimeout(() => { if (!d.closed) render(); }, 3050); }
    render();
    const d = dialog('Fastest Mine Sweepers', b);
    const [reset, ok] = b.querySelectorAll('button');
    reset.onclick = () => { others.length = 0; render(); };
    ok.onclick = () => d.close();
    ok.focus();
  }
  function customDlg() {
    const [r, c, m] = opts.level === 'custom' ? opts.custom : LEVELS[opts.level];
    const b = el(`<div class="msgbox ms-custom"><div class="ms-cf"><div class="field"><label><u>H</u>eight:</label><input type="text" value="${r}"></div><div class="field"><label><u>W</u>idth:</label><input type="text" value="${c}"></div><div class="field"><label><u>M</u>ines:</label><input type="text" value="${m}"></div></div><div class="dlg-btns" style="flex-direction:column"><button class="default">OK</button><button>Cancel</button></div></div>`);
    const d = dialog('Custom Field', b);
    const [hi, wi, mi] = b.querySelectorAll('input');
    const [ok, cancel] = b.querySelectorAll('button');
    ok.onclick = () => {
      const rr = Math.min(24, Math.max(9, parseInt(hi.value, 10) || 9)), cc = Math.min(30, Math.max(9, parseInt(wi.value, 10) || 9));
      const mm = Math.min((rr - 1) * (cc - 1), Math.max(10, parseInt(mi.value, 10) || 10));
      opts.custom = [rr, cc, mm]; opts.level = 'custom'; d.close(); newGame();
    };
    cancel.onclick = () => d.close();
    hi.focus(); hi.select();
  }

  const setLevel = lv => { opts.level = lv; newGame(); };
  const helpMsg = () => launch('help');
  const bar = menuBar([
    { label: '&Game', items: () => [
      { label: '&New', shortcut: 'F2', action: newGame },
      { sep: true },
      { label: '&Beginner', checked: opts.level === 'beginner', action: () => setLevel('beginner') },
      { label: '&Intermediate', checked: opts.level === 'intermediate', action: () => setLevel('intermediate') },
      { label: '&Expert', checked: opts.level === 'expert', action: () => setLevel('expert') },
      { label: '&Custom...', checked: opts.level === 'custom', action: customDlg },
      { sep: true },
      { label: '&Marks (?)', checked: opts.marks, action: () => { opts.marks = !opts.marks; } },
      { label: 'Co&lor', checked: opts.color, action: () => { opts.color = !opts.color; ms.classList.toggle('mono', !opts.color); } },
      // games.md 10.2: no sound effects in games. The item toggles, as in 1998, and stays silent.
      { label: '&Sound', checked: opts.sound, action: () => { opts.sound = !opts.sound; } },
      { sep: true },
      { label: 'Best &Times...', action: bestTimes },
      { sep: true },
      { label: 'E&xit', action: () => w.close() },
    ] },
    { label: '&Help', items: [
      { label: '&Contents', shortcut: 'F1', action: helpMsg },
      { label: '&Search for Help on...', action: helpMsg },
      { label: '&Using Help', action: helpMsg },
      { sep: true },
      { label: '&About Minesweeper...', action: () => messageBox({ title: 'About Minesweeper', icon: 'info', text: 'Minesweeper\nby Robert Donner and Curt Johnson\n\nCopyright (C) 1981-1998 Microsoft Corp.\n\nThis product is licensed to:\n   Bhaiya\n   Shree Cyber Zone\n\nThe fastest times on this machine were not set by people.' }) },
    ] },
  ]);
  body.prepend(bar);

  newGame();
  const w = createWindow({
    title: 'Minesweeper', icon: 'app', content: body, resizable: false, maximizable: false,
    onClose: () => { clearInterval(timer); document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); document.removeEventListener('keydown', key); },
  });
  setTitleIcon(w, A.icon);

  const key = e => {
    if (getActive() !== w) return;
    if (e.key === 'F2') { e.preventDefault(); newGame(); return; }
    if (e.key && e.key.length === 1) {
      xy.buf = (xy.buf + e.key.toLowerCase()).slice(-10);
      if (xy.buf.endsWith('xyzzy')) activateXyzzy();
    }
  };
  document.addEventListener('keydown', key);
  return w;
});
