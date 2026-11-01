// Media Player (recorded calls), Calculator, Find: All Files.
import { createWindow } from '../windowManager.js';
import { menuBar } from '../menu.js';
import { messageBox } from '../dialogs.js';
import { icon } from '../icons.js';
import { register, launch } from './index.js';
import * as fs from '../fileSystem.js';
import { openFile } from './open.js';
import { flags, wait } from './shared.js';

/* ================= Media Player ================= */
const CALLS = {
  'call_03141998.wav': { dur: 134, caps: [[2, 'Hello?'], [6, 'Haan, bhaiya bol raha hoon.'], [14, '...'], [22, 'Theek hai. Theek hai.'], [34, 'Main dekh lunga.'], [50, '...'], [62, 'Haan, PC 03 chalta rahega.'], [80, '...'], [92, 'Kab tak?'], [110, '...'], [122, 'Theek hai.']] },
  'call_03101998.wav': { dur: 107, caps: [[3, 'The delivery is confirmed.'], [18, 'The floppy has been placed.'], [34, 'The session is open.'], [50, 'Do not close it.'], [64, 'Do not open the floppy.'], [82, 'Do not ask what Phase V is.']] },
  'call_11012026.wav': { dur: 31, caps: [[1, '[static]'], [9, 'The candidate has arrived.'], [17, 'The seat is ready.'], [25, 'Proceed.']] },
};
const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
register('mediaplayer', (a = {}) => {
  const available = Object.keys(CALLS).filter(k => k !== 'call_11012026.wav' || flags.logsRead.size >= 5);
  let file = a.node && CALLS[a.node.name] ? a.node.name : available[0];
  const body = document.createElement('div');
  body.className = 'app-col mplayer';
  body.innerHTML = `
    <div class="mp-screen"><div class="mp-wave">${Array.from({ length: 48 }, () => '<i></i>').join('')}</div></div>
    <div class="mp-track"><div class="mp-fill"></div></div><div class="mp-time"></div>
    <div class="mp-cap"></div>
    <div class="mp-btns"><button data-a="play" aria-label="Play"><i class="g-play"></i></button><button data-a="stop" aria-label="Stop"><i class="g-stop"></i></button><button data-a="rew" aria-label="Rewind"><i class="g-rew"></i></button><button data-a="ff" aria-label="Fast forward"><i class="g-ff"></i></button><select class="mp-sel">${available.map(k => `<option${k === file ? ' selected' : ''}>${k}</option>`).join('')}</select></div>
    <div class="statusbar"><div class="mp-path"></div></div>`;
  const bars = [...body.querySelectorAll('.mp-wave i')];
  let pos = 0, playing = false, iv = 0;
  const w = createWindow({ title: `Media Player - ${file}`, icon: 'media', content: body, width: 420, height: 290, onClose: () => clearInterval(iv) });
  body.prepend(menuBar([{ label: '&File', items: [{ label: '&Open...', action: () => launch('explorer', { path: 'C:\\WINDOWS\\Media' }) }, { sep: true }, { label: 'E&xit', action: () => w.close() }] }, { label: '&Device', items: [{ label: '&Sound', checked: true }, { label: '&Video for Windows', disabled: true }] }, { label: 'S&cale', items: [{ label: '&Time', checked: true }, { label: '&Frames', disabled: true }] }, { label: '&Help', items: [{ label: '&About Media Player', action: () => messageBox({ title: 'Media Player', icon: 'media', text: 'Media Player\nWindows 98\n\nSpeakers disconnected in 1998.\nCaptions provided.' }) }] }]));
  const draw = () => {
    const c = CALLS[file];
    body.querySelector('.mp-fill').style.width = (pos / c.dur * 100) + '%';
    body.querySelector('.mp-time').textContent = `${fmt(pos)} / ${fmt(c.dur)}`;
    const cap = c.caps.filter(([t]) => t <= pos).pop();
    body.querySelector('.mp-cap').textContent = cap ? `"${cap[1]}"` : '';
    body.querySelector('.mp-path').textContent = 'C:\\WINDOWS\\Media\\' + file;
    bars.forEach(b => { b.style.transform = `scaleY(${playing ? 0.1 + Math.random() * (/static/.test(cap?.[1] || '') ? 1 : 0.8) : 0.05})`; });
  };
  const tick = () => { pos += 0.25; if (pos >= CALLS[file].dur) { pos = CALLS[file].dur; stop(); } draw(); };
  const play = () => { if (playing) { playing = false; clearInterval(iv); } else { playing = true; iv = setInterval(tick, 250); } draw(); };
  function stop() { playing = false; clearInterval(iv); draw(); }
  body.querySelector('[data-a="play"]').onclick = play;
  body.querySelector('[data-a="stop"]').onclick = () => { stop(); pos = 0; draw(); };
  body.querySelector('[data-a="rew"]').onclick = () => { pos = Math.max(0, pos - 10); draw(); };
  body.querySelector('[data-a="ff"]').onclick = () => { pos = Math.min(CALLS[file].dur, pos + 10); draw(); };
  body.querySelector('.mp-sel').onchange = e => { file = e.target.value; stop(); pos = 0; w.setTitle('Media Player - ' + file); draw(); };
  draw();
  if (a.node) play();
  return w;
});

/* ================= Calculator ================= */
register('calc', () => {
  const body = document.createElement('div');
  body.className = 'calc';
  const keys = [['Backspace', 'CE', 'C'], ['MC', '7', '8', '9', '/', 'sqrt'], ['MR', '4', '5', '6', '*', '%'], ['MS', '1', '2', '3', '-', '1/x'], ['M+', '0', '+/-', '.', '+', '=']];
  body.innerHTML = `<input class="calc-disp" readonly value="0."><div class="calc-note"></div><div class="calc-top"><span class="calc-mem"></span>${keys[0].map(k => `<button class="ck wide red" data-k="${k}">${k}</button>`).join('')}</div>${keys.slice(1).map(r => `<div class="calc-row">${r.map((k, i) => `<button class="ck${i === 0 ? ' red mem' : /[/*\-+=]/.test(k) && k.length === 1 ? ' red' : ''}" data-k="${k}">${k}</button>`).join('')}</div>`).join('')}`;
  const disp = body.querySelector('.calc-disp'), note = body.querySelector('.calc-note'), memEl = body.querySelector('.calc-mem');
  let cur = '0', acc = null, op = null, fresh = true, mem = 0, history = [];
  const show = v => { let s = String(v); if (!s.includes('.')) s += '.'; disp.value = s; };
  const num = () => parseFloat(cur);
  const compute = () => {
    if (op == null || acc == null) return num();
    const b = num();
    const r = op === '+' ? acc + b : op === '-' ? acc - b : op === '*' ? acc * b : b === 0 ? NaN : acc / b;
    return Math.round(r * 1e12) / 1e12;
  };
  function press(k) {
    note.textContent = '';
    if (/^[0-9]$/.test(k)) { cur = fresh || cur === '0' ? k : cur + k; fresh = false; show(cur); return; }
    if (k === '.') { if (fresh) { cur = '0.'; fresh = false; } else if (!cur.includes('.')) cur += '.'; disp.value = cur; return; }
    if (k === 'Backspace') { if (!fresh) { cur = cur.length > 1 ? cur.slice(0, -1) : '0'; show(cur); } return; }
    if (k === 'CE') { cur = '0'; fresh = true; show(cur); return; }
    if (k === 'C') { cur = '0'; acc = null; op = null; fresh = true; history = []; show(cur); return; }
    if (k === '+/-') { cur = String(-num()); show(cur); return; }
    if (k === 'sqrt') { cur = String(Math.sqrt(num())); fresh = true; show(cur); return; }
    if (k === '%') { cur = String((acc || 0) * num() / 100); show(cur); return; }
    if (k === '1/x') { cur = num() === 0 ? 'Cannot divide by zero' : String(1 / num()); fresh = true; disp.value = cur; return; }
    if (k === 'MC') { mem = 0; memEl.textContent = ''; return; }
    if (k === 'MR') { cur = String(mem); fresh = true; show(cur); return; }
    if (k === 'MS') { mem = num(); memEl.textContent = mem ? 'M' : ''; return; }
    if (k === 'M+') { mem += num(); memEl.textContent = mem ? 'M' : ''; return; }
    if ('+-*/'.includes(k)) {
      if (!fresh || acc == null) { history.push(num(), k); acc = op && !fresh ? compute() : num(); }
      else history[history.length - 1] = k;
      op = k; fresh = true; show(acc); return;
    }
    if (k === '=') {
      const r = compute(); history.push(num(), '=');
      cur = isNaN(r) ? 'Cannot divide by zero' : String(r); acc = null; op = null; fresh = true;
      if (isNaN(r)) disp.value = cur; else show(r);
      // egg: 1998 + 2026 = 4024, then - 2050 = 1974
      const h = history.join(' ');
      if (r === 1974 && /1998 \+ 2026 = 4024 - 2050 =$|4024 - 2050 =$/.test(h)) note.textContent = 'Not a coincidence.';
      history = [r];
    }
  }
  body.addEventListener('click', e => { const b = e.target.closest('.ck'); if (b) press(b.dataset.k); });
  const w = createWindow({ title: 'Calculator', icon: 'calc', content: body, resizable: false });
  w.body.prepend(menuBar([{ label: '&Edit', items: [{ label: '&Copy', shortcut: 'Ctrl+C', action: () => navigator.clipboard && navigator.clipboard.writeText(disp.value) }, { label: '&Paste', shortcut: 'Ctrl+V' }] }, { label: '&View', items: [{ label: 'S&cientific', disabled: true }, { label: 'S&tandard', checked: true }, { sep: true }, { label: '&Digit grouping' }] }, { label: '&Help', items: [{ label: '&About Calculator', action: () => messageBox({ title: 'About Calculator', icon: 'calc', text: 'Calculator\nWindows 98\n\nFound in C:\\WINDOWS after Bhaiya deleted it.\nIt came back.' }) }] }]));
  w.el.tabIndex = -1;
  w.el.addEventListener('keydown', e => {
    const map = { Enter: '=', Escape: 'C', Delete: 'CE', Backspace: 'Backspace', '@': 'sqrt' };
    const k = map[e.key] || e.key;
    if (/^[0-9.+\-*/%=]$/.test(k) || map[e.key]) { e.preventDefault(); press(k === '%' ? '%' : k); }
  });
  w.el.focus();
  return w;
});

/* ================= Find: All Files ================= */
function walk(n, out = [], depth = 0) { (n.children || []).forEach(c => { out.push(c); if (c.children && depth < 12) walk(c, out, depth + 1); }); return out; }
register('find', () => {
  const body = document.createElement('div');
  body.className = 'app-col finder';
  body.innerHTML = `
    <div class="find-form">
      <div class="find-fields">
        <div class="field"><label><u>N</u>amed:</label><input type="text" class="f-name"></div>
        <div class="field"><label><u>C</u>ontaining text:</label><input type="text" class="f-text"></div>
        <div class="field"><label><u>L</u>ook in:</label><select class="f-in"><option>C:\\</option><option>My Computer</option><option>C:\\My Documents</option><option>C:\\WINDOWS</option></select></div>
        <label><input type="checkbox" class="f-sub" checked> Include <u>s</u>ubfolders</label>
      </div>
      <div class="find-btns"><button class="default f-go">F<u>i</u>nd Now</button><button class="f-stop" disabled>Sto<u>p</u></button><button class="f-new">Ne<u>w</u> Search</button><img class="f-anim" src="${icon('find', 32)}" width="32" height="32" alt=""></div>
    </div>
    <div class="lv"><table class="grid"><thead><tr><th>Name</th><th>In Folder</th><th>Size</th><th>Type</th></tr></thead><tbody></tbody></table></div>
    <div class="statusbar"><div class="sb">Enter your search criteria.</div></div>`;
  const w = createWindow({ title: 'Find: All Files', icon: 'find', content: body, width: 560, height: 380, minWidth: 420 });
  body.prepend(menuBar([{ label: '&File', items: [{ label: '&Close', action: () => w.close() }] }, { label: '&Edit', items: [{ label: 'Select &All' }] }, { label: '&View', items: [{ label: '&Details', checked: true }] }, { label: '&Options', items: [{ label: '&Case Sensitive' }] }, { label: '&Help', items: [{ label: '&Help Topics', action: () => launch('help') }] }]));
  const tb = body.querySelector('tbody'), sb = body.querySelector('.sb'), go = body.querySelector('.f-go'), stop = body.querySelector('.f-stop');
  let results = [], cancelled = false;
  async function search() {
    const q = body.querySelector('.f-name').value.trim().toLowerCase(), txt = body.querySelector('.f-text').value.trim().toLowerCase();
    const start = fs.resolve(body.querySelector('.f-in').value) || fs.getRoot();
    tb.innerHTML = ''; results = []; cancelled = false;
    go.disabled = true; stop.disabled = false; sb.textContent = 'Searching...'; body.querySelector('.f-anim').classList.add('spin');
    await wait(300 + Math.random() * 300);
    const all = body.querySelector('.f-sub').checked ? walk(start) : (start.children || []);
    for (const n of all) {
      if (cancelled) break;
      if (q && !n.name.toLowerCase().includes(q.replace(/\*/g, ''))) continue;
      if (txt) { if (fs.isContainer(n)) continue; const t = (await fs.readText(n)).toLowerCase(); if (!t.includes(txt)) continue; }
      if (!q && !txt) continue;
      results.push(n);
    }
    tb.innerHTML = results.map((n, i) => `<tr data-i="${i}"><td><img src="${icon(fs.iconFor(n), 16)}" width="16" height="16" alt="" style="vertical-align:-4px;margin-right:4px">${n.name}</td><td>${fs.pathOf(n.parent)}</td><td>${fs.isContainer(n) ? '' : fs.sizeKB(n)}</td><td>${fs.typeName(n)}</td></tr>`).join('');
    sb.textContent = `${results.length} file(s) found`;
    go.disabled = false; stop.disabled = true; body.querySelector('.f-anim').classList.remove('spin');
  }
  go.onclick = search;
  stop.onclick = () => { cancelled = true; };
  body.querySelector('.f-new').onclick = () => { body.querySelectorAll('input[type=text]').forEach(i => { i.value = ''; }); tb.innerHTML = ''; sb.textContent = 'Enter your search criteria.'; };
  body.querySelectorAll('input[type=text]').forEach(i => i.addEventListener('keydown', e => { if (e.key === 'Enter') search(); }));
  tb.addEventListener('pointerdown', e => { const tr = e.target.closest('tr'); tb.querySelectorAll('tr').forEach(x => x.classList.toggle('sel', x === tr)); });
  tb.addEventListener('dblclick', e => {
    const tr = e.target.closest('tr'); if (!tr) return;
    const n = results[+tr.dataset.i];
    if (fs.isContainer(n)) launch('explorer', { path: fs.pathOf(n) }); else openFile(n);
  });
  body.querySelector('.f-name').focus();
  return w;
});
