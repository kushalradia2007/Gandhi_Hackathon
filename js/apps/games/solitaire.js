// Solitaire / Klondike (games.md section 4): draw 3 or 1, drag-and-drop of real cards (stacks too), click/double-click
// auto-moves, auto-flip, undo, Standard/Vegas/None scoring, timer, deck backs, the flying-cards win cascade,
// the three-win egg, and the real Alt+Shift+2 "win now" cheat.
import { createWindow, getActive } from '../../windowManager.js';
import { menuBar } from '../../menu.js';
import { messageBox } from '../../dialogs.js';
import { register, launch } from '../index.js';
import { CW, CH, isRed, cardEl, cardCanvas, backURL, BACK_COUNT, setTitleIcon, el, dialog, wait, ICON_CARDS } from './common.js';

const M = 11, STEP = 82, TOP = 6, TY = TOP + CH + 20, DOWN_GAP = 3, UP_GAP = 20, FAN = 20;
// Options persist across games and windows (Win98 kept them in win.ini).
const opts = { draw: 3, scoring: 'none', timed: true, status: true, keep: false, back: 0 };
let vegasBank = 0;   // "Keep score" carries Vegas money between games
let streak = 0;      // consecutive wins, for the three-win egg

register('solitaire', () => {
  const body = el(`<div class="app-col sol-app"><div class="sol"></div><div class="statusbar sol-status"><div></div><div class="sol-score" style="flex:0 0 190px;text-align:right"></div></div></div>`);
  const table = body.querySelector('.sol'), sbLeft = body.querySelector('.sol-status > div'), sbScore = body.querySelector('.sol-score');
  let stock, waste, found, tab, all, fan, passes, score, moves, secs, timer, started, won, drawN, scoring, undoSnap, busy = false;

  /* ---- slots (empty pile outlines) ---- */
  const slot = (x, y, cls = '') => { const s = document.createElement('div'); s.className = 'sol-slot ' + cls; s.style.left = x + 'px'; s.style.top = y + 'px'; table.appendChild(s); return s; };
  const stockSlot = slot(M, TOP, 'stock');
  slot(M + STEP, TOP);
  const foundSlots = [0, 1, 2, 3].map(i => slot(M + (3 + i) * STEP, TOP));
  const tabSlots = [0, 1, 2, 3, 4, 5, 6].map(i => slot(M + i * STEP, TY));

  function deal() {
    if (all && !won && started) streak = 0;       // abandoning a game breaks the streak
    clearInterval(timer); timer = 0;
    if (all) all.forEach(c => c.el.remove());
    drawN = opts.draw; scoring = opts.scoring;
    all = [];
    for (let s = 0; s < 4; s++) for (let r = 1; r <= 13; r++) { const e = cardEl(s, r); const c = { s, r, up: false, el: e }; e._card = c; table.appendChild(e); all.push(c); }
    const deck = all.slice();
    for (let i = deck.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [deck[i], deck[j]] = [deck[j], deck[i]]; }
    tab = [[], [], [], [], [], [], []];
    for (let i = 0; i < 7; i++) for (let j = i; j < 7; j++) { const c = deck.pop(); c.up = j === i; tab[j].push(c); }
    stock = deck; stock.forEach(c => { c.up = false; });
    waste = []; found = [[], [], [], []]; fan = 0; passes = 0; moves = 0; secs = 0; started = false; won = false; undoSnap = null;
    if (scoring === 'vegas') { vegasBank = opts.keep ? vegasBank - 52 : -52; score = vegasBank; } else score = 0;
    render();
  }

  /* ---- layout ---- */
  function render() {
    let z = 1;
    const put = (c, x, y) => { c.el.style.left = x + 'px'; c.el.style.top = y + 'px'; c.el.style.zIndex = z++; c.el.classList.toggle('down', !c.up); c.x = x; c.y = y; };
    stock.forEach((c, i) => put(c, M + Math.floor(i / 8) * 2, TOP + Math.floor(i / 8)));
    const vis = Math.min(Math.max(fan, waste.length ? 1 : 0), waste.length, drawN);
    waste.forEach((c, i) => { const k = i - (waste.length - vis); put(c, M + STEP + Math.max(0, k) * FAN, TOP); });
    found.forEach((p, f) => p.forEach(c => put(c, M + (3 + f) * STEP, TOP)));
    const room = Math.max(120, table.clientHeight - TY - CH - 4);
    tab.forEach((p, i) => {
      const downs = p.filter(c => !c.up).length, ups = Math.max(0, p.length - downs - 1);
      const gap = ups ? Math.max(6, Math.min(UP_GAP, (room - downs * DOWN_GAP) / ups)) : UP_GAP;
      let y = TY;
      p.forEach(c => { put(c, M + i * STEP, y); y += c.up ? gap : DOWN_GAP; });
    });
    stockSlot.textContent = stock.length ? '' : canRecycle() ? 'O' : 'X';
    stockSlot.classList.toggle('nomore', !stock.length && !canRecycle());
    status();
  }
  function status() {
    sbLeft.textContent = won ? 'You won!' : '';
    const sc = scoring === 'vegas' ? `Score: ${score < 0 ? '-$' + -score : '$' + score}` : `Score: ${scoring === 'none' ? 0 : score}`;
    sbScore.textContent = sc + (opts.timed ? `   Time: ${secs}` : '');
    body.querySelector('.sol-status').style.display = opts.status ? '' : 'none';
  }
  const canRecycle = () => scoring !== 'vegas' || passes < (drawN === 3 ? 2 : 0);

  /* ---- undo (single level, as in Win98) ---- */
  const snap = () => { undoSnap = { stock: stock.slice(), waste: waste.slice(), found: found.map(p => p.slice()), tab: tab.map(p => p.slice()), ups: all.map(c => c.up), fan, passes, score, moves }; };
  function undo() {
    if (!undoSnap || won) return;
    const u = undoSnap; undoSnap = null;
    stock = u.stock; waste = u.waste; found = u.found; tab = u.tab; all.forEach((c, i) => { c.up = u.ups[i]; });
    fan = u.fan; passes = u.passes; score = u.score; moves = u.moves;
    render();
  }

  /* ---- scoring / timer ---- */
  const add = n => { if (scoring === 'standard') score = Math.max(0, score + n); };
  const vegas = n => { if (scoring === 'vegas') { score += n; if (opts.keep) vegasBank += n; } };
  function start() {
    if (started) return;
    started = true;
    timer = setInterval(() => {
      if (w.closed) return clearInterval(timer);
      secs++;
      if (opts.timed && scoring === 'standard' && secs % 10 === 0) add(-2);
      status();
    }, 1000);
  }

  /* ---- rules ---- */
  const top = p => p[p.length - 1];
  const fitsTab = (c, p) => (p.length ? top(p).up && top(p).r === c.r + 1 && isRed(top(p).s) !== isRed(c.s) : c.r === 13);
  const fitsFound = (c, p) => (p.length ? top(p).s === c.s && top(p).r === c.r - 1 : c.r === 1);
  function where(c) {
    if (waste.includes(c)) return { type: 'waste', p: waste };
    for (let i = 0; i < 4; i++) if (found[i].includes(c)) return { type: 'found', p: found[i], i };
    for (let i = 0; i < 7; i++) if (tab[i].includes(c)) return { type: 'tab', p: tab[i], i };
    return { type: 'stock', p: stock };
  }

  /** Move cards (from index) of src pile to dst pile, with scoring, auto-flip and win check. */
  function move(src, from, dstType, dst) {
    snap();
    const cards = src.p.splice(from);
    dst.push(...cards);
    if (src.type === 'waste') { fan = Math.max(waste.length ? 1 : 0, fan - 1); add(dstType === 'found' ? 10 : 5); }
    if (src.type === 'tab' && dstType === 'found') add(10);
    if (src.type === 'found' && dstType === 'tab') { add(-15); vegas(-5); }
    if (dstType === 'found') vegas(5);
    if (src.type === 'tab' && src.p.length && !top(src.p).up) { top(src.p).up = true; add(5); }
    moves++; start(); render();
    if (found.every(p => p.length === 13)) winSequence();
  }
  function drawStock() {
    if (won) return;
    if (stock.length) {
      snap();
      const n = Math.min(drawN, stock.length);
      for (let k = 0; k < n; k++) { const c = stock.pop(); c.up = true; waste.push(c); }
      fan = n;
    } else if (waste.length && canRecycle()) {
      snap();
      passes++;
      if (scoring === 'standard') add(drawN === 3 ? (passes > 3 ? -20 : 0) : -100);
      stock = waste.reverse(); stock.forEach(c => { c.up = false; }); waste = []; fan = 0;
    } else return;
    moves++; start(); render();
  }
  function toFoundation(c) {
    const src = where(c);
    if (src.type === 'stock' || src.type === 'found' || top(src.p) !== c || !c.up) return false;
    const f = found.findIndex(p => fitsFound(c, p));
    if (f < 0) return false;
    move(src, src.p.length - 1, 'found', found[f]);
    return true;
  }
  function autoMove(c) {
    if (toFoundation(c)) return;
    const src = where(c);
    const t = tab.findIndex(p => p !== src.p && fitsTab(c, p));
    if (t >= 0) move(src, src.p.indexOf(c), 'tab', tab[t]);
  }

  /* ---- mouse: click, double-click, drag the real cards ---- */
  let drag = null;
  const local = e => { const r = table.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  table.addEventListener('mousedown', e => {
    if (e.button !== 0 || busy || won) return;
    e.preventDefault();
    const cardDiv = e.target.closest('.card');
    if (!cardDiv) { if (e.target.closest('.stock')) drawStock(); return; }
    const c = cardDiv._card, src = where(c);
    if (src.type === 'stock') { drawStock(); return; }
    if (!c.up) {
      if (src.type === 'tab' && top(src.p) === c) { snap(); c.up = true; add(5); moves++; start(); render(); }
      return;
    }
    const from = src.p.indexOf(c);
    if ((src.type === 'waste' || src.type === 'found') && from !== src.p.length - 1) return;
    const cards = src.p.slice(from), p = local(e);
    drag = { src, from, cards, sx: p.x, sy: p.y, moved: false, offs: cards.map(k => ({ dx: k.x - p.x, dy: k.y - p.y })) };
  });
  const onMove = e => {
    if (!drag) return;
    const p = local(e);
    if (!drag.moved && Math.abs(p.x - drag.sx) + Math.abs(p.y - drag.sy) < 3) return;
    drag.moved = true;
    drag.cards.forEach((k, i) => { k.el.style.left = p.x + drag.offs[i].dx + 'px'; k.el.style.top = p.y + drag.offs[i].dy + 'px'; k.el.style.zIndex = 1000 + i; });
  };
  const onUp = e => {
    if (!drag) return;
    const d = drag; drag = null;
    if (!d.moved) { if (d.src.type === 'waste') autoMove(d.cards[0]); return; }
    const head = d.cards[0], hx = parseFloat(head.el.style.left), hy = parseFloat(head.el.style.top);
    const overlap = (x, y) => Math.max(0, Math.min(hx + CW, x + CW) - Math.max(hx, x)) * Math.max(0, Math.min(hy + CH, y + CH) - Math.max(hy, y));
    let best = null, bestA = 0;
    tab.forEach((p, i) => {
      if (p === d.src.p || !fitsTab(head, p)) return;
      const t = top(p), a = t ? overlap(t.x, t.y) : overlap(M + i * STEP, TY);
      if (a > bestA) { bestA = a; best = { type: 'tab', p }; }
    });
    if (d.cards.length === 1) found.forEach((p, i) => {
      if (p === d.src.p || !fitsFound(head, p)) return;
      const a = overlap(M + (3 + i) * STEP, TOP);
      if (a > bestA) { bestA = a; best = { type: 'found', p }; }
    });
    if (best) move(d.src, d.from, best.type, best.p); else render();   // invalid drop: the cards go home
  };
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
  table.addEventListener('dblclick', e => {
    const cardDiv = e.target.closest('.card');
    if (!cardDiv || busy || won) return;
    toFoundation(cardDiv._card);
  });

  /* ---- the win: flying cards ---- */
  async function winSequence() {
    if (won) return;
    won = true; busy = true; streak++;
    clearInterval(timer); timer = 0;
    if (scoring === 'standard' && opts.timed && secs >= 30) score += Math.floor(700000 / secs);
    all.forEach(c => { c.up = true; });
    render();
    await wait(500);
    await cascade();
    busy = false;
    winDialog();
  }
  function cascade() {
    return new Promise(resolve => {
      const W = innerWidth, H = innerHeight;
      const cv = document.createElement('canvas');
      cv.width = W; cv.height = H; cv.className = 'sol-cascade';
      document.body.appendChild(cv);
      const ctx = cv.getContext('2d');
      const origin = table.getBoundingClientRect();
      const queue = [];
      for (let r = 13; r >= 1; r--) for (let f = 0; f < 4; f++) { const c = found[f][r - 1]; if (c) queue.push(c); }
      const flying = [];
      let frame = 0, done = false;
      const finish = () => { if (done) return; done = true; cv.remove(); window.removeEventListener('keydown', finish, true); render(); resolve(); };
      cv.addEventListener('mousedown', finish);
      window.addEventListener('keydown', finish, true);
      const step = () => {
        if (done) return;
        if (frame % 10 === 0 && queue.length) {
          const c = queue.shift();
          c.el.style.visibility = 'hidden';
          const sign = Math.random() < 0.5 ? -1 : 1;
          flying.push({ img: cardCanvas(c.s, c.r), x: origin.left + c.x, y: origin.top + c.y, vx: sign * (3 + Math.random() * 4), vy: -Math.random() * 6, bounced: false, life: 0 });
        }
        frame++;
        for (const f of flying) {
          if (f.gone) continue;
          f.vy += 0.45; f.x += f.vx; f.y += f.vy; f.life++;
          if (f.y + CH > H) { f.y = H - CH; f.vy = Math.abs(f.vy) < 1.5 ? 0 : -f.vy * 0.8; }
          if (!f.bounced && (f.x < 0 || f.x + CW > W)) { f.bounced = true; f.vx = -f.vx; f.x = Math.max(0, Math.min(W - CW, f.x)); }
          if (f.x + CW < 0 || f.x > W || f.life > 1800) { f.gone = true; continue; }
          ctx.drawImage(f.img, f.x | 0, f.y | 0);   // never cleared: the trail is the point
        }
        if (!queue.length && flying.every(f => f.gone)) { finish(); return; }
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }).then(() => all.forEach(c => { c.el.style.visibility = ''; }));
  }
  function winDialog() {
    const mm = String(Math.floor(secs / 60)).padStart(2, '0'), ss = String(secs % 60).padStart(2, '0');
    const b = el(`<div class="msgbox sol-win"><div class="sol-win-text">You won!<br><br>Time: ${mm}:${ss}<br>Moves: ${moves}${streak >= 3 ? '<br><br>You are very good at this game.' : ''}</div><div class="dlg-btns center" style="margin-top:14px"><button class="default">Play Again</button></div></div>`);
    const d = dialog('Congratulations!', b);
    const txt = b.querySelector('.sol-win-text');
    // G06: the third consecutive win remembers you.
    if (streak >= 3) {
      setTimeout(() => { if (!d.closed) txt.insertAdjacentHTML('beforeend', '<br>You have played this game before.'); }, 3000);
      setTimeout(() => { if (!d.closed) txt.insertAdjacentHTML('beforeend', '<br>You will play it again.'); }, 6000);
    }
    const ok = b.querySelector('button');
    ok.onclick = () => { d.close(); deal(); };
    ok.focus();
  }
  function cheatWin() {
    if (won || busy) return;
    found = [0, 1, 2, 3].map(s => all.filter(c => c.s === s).sort((a, b) => a.r - b.r));
    stock = []; waste = []; tab = tab.map(() => []); fan = 0;
    render();
    winSequence();
  }

  /* ---- dialogs ---- */
  function optionsDlg() {
    const radio = (name, v, label, cur) => `<label class="radio"><input type="radio" name="${name}" value="${v}"${cur === v ? ' checked' : ''}> ${label}</label>`;
    const b = el(`<div class="msgbox sol-opts"><div class="sol-opts-row"><fieldset><legend>Draw</legend>${radio('draw', '3', 'Draw <u>t</u>hree', String(opts.draw))}${radio('draw', '1', 'Draw <u>o</u>ne', String(opts.draw))}</fieldset>
      <fieldset><legend>Scoring</legend>${radio('sc', 'standard', '<u>S</u>tandard', opts.scoring)}${radio('sc', 'vegas', '<u>V</u>egas', opts.scoring)}${radio('sc', 'none', '<u>N</u>one', opts.scoring)}</fieldset></div>
      <label class="chk"><input type="checkbox" data-k="timed"${opts.timed ? ' checked' : ''}>T<u>i</u>med game</label>
      <label class="chk"><input type="checkbox" data-k="status"${opts.status ? ' checked' : ''}>Status <u>b</u>ar</label>
      <label class="chk"><input type="checkbox" data-k="keep"${opts.keep ? ' checked' : ''}><u>K</u>eep score</label>
      <div class="dlg-btns center" style="margin-top:12px"><button class="default">OK</button><button>Cancel</button></div></div>`);
    const d = dialog('Options', b);
    const [ok, cancel] = b.querySelectorAll('.dlg-btns button');
    ok.onclick = () => {
      // Draw and scoring take effect on the next deal.
      opts.draw = +b.querySelector('input[name="draw"]:checked').value;
      opts.scoring = b.querySelector('input[name="sc"]:checked').value;
      b.querySelectorAll('input[data-k]').forEach(i => { opts[i.dataset.k] = i.checked; });
      d.close(); status();
    };
    cancel.onclick = () => d.close();
    ok.focus();
  }
  function deckDlg() {
    let pick = opts.back;
    const b = el(`<div class="msgbox sol-deck"><div class="sol-backs">${Array.from({ length: BACK_COUNT }, (_, i) => `<div class="sol-back${i === pick ? ' sel' : ''}" data-i="${i}"><img src="${backURL(i)}" width="71" height="96" alt="" draggable="false"></div>`).join('')}</div><div class="dlg-btns center" style="margin-top:12px"><button class="default">OK</button><button>Cancel</button></div></div>`);
    const d = dialog('Select Card Back', b);
    b.querySelector('.sol-backs').addEventListener('mousedown', e => { const t = e.target.closest('.sol-back'); if (!t) return; pick = +t.dataset.i; b.querySelectorAll('.sol-back').forEach(x => x.classList.toggle('sel', x === t)); });
    b.querySelector('.sol-backs').addEventListener('dblclick', () => ok.onclick());
    const [ok, cancel] = b.querySelectorAll('.dlg-btns button');
    ok.onclick = () => { opts.back = pick; applyBack(); d.close(); };
    cancel.onclick = () => d.close();
  }
  const applyBack = () => table.style.setProperty('--sol-back', `url(${backURL(opts.back)})`);

  const helpMsg = () => launch('help');
  body.prepend(menuBar([
    { label: '&Game', items: () => [
      { label: '&Deal', shortcut: 'F2', action: deal },
      { sep: true },
      { label: '&Undo', disabled: !undoSnap || won, action: undo },
      { label: 'De&ck...', action: deckDlg },
      { label: '&Options...', action: optionsDlg },
      { sep: true },
      { label: 'E&xit', action: () => w.close() },
    ] },
    { label: '&Help', items: [
      { label: '&Contents', shortcut: 'F1', action: helpMsg },
      { label: '&Search for Help on...', action: helpMsg },
      { label: '&How to Use Help', action: helpMsg },
      { sep: true },
      { label: '&About Solitaire...', action: () => messageBox({ title: 'About Solitaire', icon: 'info', text: 'Solitaire\nby Wes Cherry\n\nCopyright (C) 1981-1998 Microsoft Corp.\n\nThis product is licensed to:\n   Bhaiya\n   Shree Cyber Zone\n\nPatience is a function.' }) },
    ] },
  ]));

  const key = e => {
    if (getActive() !== w) return;
    if (e.key === 'F2') { e.preventDefault(); deal(); }
    else if (e.altKey && e.shiftKey && e.code === 'Digit2') { e.preventDefault(); cheatWin(); }
    else if (e.ctrlKey && (e.key === 'z' || e.key === 'Z')) undo();
  };
  document.addEventListener('keydown', key);

  const w = createWindow({
    title: 'Solitaire', icon: 'app', content: body, width: 620, height: 470, minWidth: 300, minHeight: 200,
    onClose: () => { clearInterval(timer); document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); document.removeEventListener('keydown', key); },
  });
  setTitleIcon(w, ICON_CARDS());
  applyBack();
  deal();
  new ResizeObserver(() => { if (!drag && !busy) render(); }).observe(table);
  return w;
});
