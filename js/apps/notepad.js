// Notepad: the main reading surface. File-specific behaviour per applications.md §2.7.
import { createWindow } from '../windowManager.js';
import { menuBar } from '../menu.js';
import { messageBox } from '../dialogs.js';
import { register, launch } from './index.js';
import * as fs from '../fileSystem.js';
import { showTipAt } from '../taskbar.js';
import { printDialog } from './printing.js';

const SANDBOX = '\r\n\r\nSandbox games were not designed to entertain. They were designed to retain. The player who builds a world in a game does not build one outside it.\r\n';

function notepad(args = {}) {
  const node = args.node || (args.path ? fs.resolve(args.path) : null);
  const name = node ? node.name : 'Untitled';
  const isDoc = node && /\.doc$/i.test(node.name);
  const body = document.createElement('div');
  body.className = 'notepad';
  body.innerHTML = '<div class="np-menu"></div><textarea class="np-text" spellcheck="false"></textarea><div class="statusbar"><div class="np-note"></div><div class="np-pos" style="flex:0 0 110px"></div><div style="flex:0 0 46px">100%</div></div>';
  const ta = body.querySelector('textarea'), pos = body.querySelector('.np-pos'), note = body.querySelector('.np-note');
  let wrap = !!isDoc, scrolledBottom = !(node && node.egg === 'bhaiya'), timers = [];
  const lockUntil = node && node.egg === 'player' ? Date.now() + 30000 : 0;
  const setWrap = v => { wrap = v; ta.setAttribute('wrap', v ? 'soft' : 'off'); ta.classList.toggle('wrap', v); };
  setWrap(wrap);

  const canClose = () => {
    if (Date.now() < lockUntil) return false;
    if (!scrolledBottom) { ta.scrollTop = ta.scrollTop; return false; }
    timers.forEach(clearInterval); timers.forEach(clearTimeout);
    return true;
  };
  const w = createWindow({ title: `${name} - Notepad`, icon: 'notepad', content: body, width: 580, height: 420, minWidth: 220, minHeight: 140, onClose: canClose });

  body.firstChild.appendChild(menuBar([
    { label: '&File', items: [
      { label: '&New', action: () => launch('notepad') },
      { label: '&Open...', shortcut: 'Ctrl+O', action: () => launch('mydocs') },
      { label: '&Save', shortcut: 'Ctrl+S', action: save },
      { label: 'Save &As...', action: save },
      { sep: true },
      { label: 'Page Se&tup...', action: () => messageBox({ title: 'Page Setup', icon: 'info', text: 'Paper: A4\nMargins: as Bhaiya likes them.' }) },
      { label: '&Print', action: () => printDialog({ doc: name }) },
      { sep: true },
      { label: 'E&xit', action: () => w.close() },
    ] },
    { label: '&Edit', items: () => [
      { label: '&Undo', shortcut: 'Ctrl+Z', action: () => { ta.focus(); document.execCommand('undo'); } },
      { sep: true },
      { label: 'Cu&t', shortcut: 'Ctrl+X', action: () => { ta.focus(); document.execCommand('cut'); } },
      { label: '&Copy', shortcut: 'Ctrl+C', action: () => { ta.focus(); document.execCommand('copy'); } },
      { label: '&Paste', shortcut: 'Ctrl+V', action: paste },
      { label: 'De&lete', shortcut: 'Del', action: () => { ta.focus(); document.execCommand('delete'); } },
      { sep: true },
      { label: 'Select &All', shortcut: 'Ctrl+A', action: () => { ta.focus(); ta.select(); } },
      { label: 'Time/&Date', shortcut: 'F5', action: insertDate },
      { sep: true },
      { label: '&Word Wrap', checked: wrap, action: () => setWrap(!wrap) },
    ] },
    { label: '&Search', items: [{ label: '&Find...', shortcut: 'Ctrl+F', action: findDialog }, { label: 'Find &Next', shortcut: 'F3', action: () => findNext() }] },
    { label: '&Help', items: [{ label: '&Help Topics', action: () => launch('help') }, { sep: true }, { label: '&About Notepad', action: about }] },
  ]));

  function save() { if (node && !node.src && !node.egg) node.content = ta.value; }
  async function paste() { ta.focus(); try { const t = await navigator.clipboard.readText(); ta.setRangeText(t, ta.selectionStart, ta.selectionEnd, 'end'); } catch (e) { /* clipboard blocked */ } }
  function insertDate() {
    const d = new Date();
    ta.setRangeText(d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) + ' ' + d.toLocaleDateString('en-US'), ta.selectionStart, ta.selectionEnd, 'end');
  }
  function about() {
    messageBox({ title: 'About Notepad', icon: 'notepad', text: 'Microsoft Windows 98\nCopyright © 1981-1998 Microsoft Corp.\n\nThis product is licensed to:\n   GUEST\n   SHREE CYBER ZONE, Bhilai\n\nPhysical memory available: 65,536 KB' });
  }

  let lastFind = '';
  function findNext(q = lastFind) {
    if (!q) return findDialog();
    lastFind = q;
    // H08: the hidden paragraph in GAME_GENRES.DOC
    if (/sandbox/i.test(q) && node && (/GAME_GENRES/i.test(node.name) || node.egg === 'sandbox') && !ta.value.includes('designed to retain')) ta.value += SANDBOX;
    const from = ta.selectionEnd, hay = ta.value.toLowerCase(), i = hay.indexOf(q.toLowerCase(), from), j = i >= 0 ? i : hay.indexOf(q.toLowerCase());
    if (j < 0) { messageBox({ title: 'Notepad', icon: 'info', text: `Cannot find "${q}"` }); return; }
    ta.focus(); ta.setSelectionRange(j, j + q.length);
    const line = ta.value.slice(0, j).split('\n').length - 1;
    ta.scrollTop = Math.max(0, line * 18 - ta.clientHeight / 2);
    updatePos();
  }
  function findDialog() {
    const fb = document.createElement('div');
    fb.className = 'msgbox';
    fb.innerHTML = '<div class="field"><label>Fi<u>n</u>d what:</label><input type="text"></div><label><input type="checkbox"> Match <u>c</u>ase</label><div class="dlg-btns" style="justify-content:flex-end;margin-top:8px"><button class="default"><u>F</u>ind Next</button><button>Cancel</button></div>';
    const fw = createWindow({ title: 'Find', content: fb, noIcon: true, help: true, resizable: false, minimizable: false, className: 'dialog', center: true, taskbar: false });
    const inp = fb.querySelector('input[type=text]'), [go, cancel] = fb.querySelectorAll('button');
    inp.value = lastFind;
    go.onclick = () => findNext(inp.value);
    cancel.onclick = () => fw.close();
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') findNext(inp.value); if (e.key === 'Escape') fw.close(); });
    inp.focus(); inp.select();
  }

  function updatePos() {
    const before = ta.value.slice(0, ta.selectionStart).split('\n');
    pos.textContent = `Ln ${before.length}, Col ${before[before.length - 1].length + 1}`;
  }
  ['keyup', 'click', 'select', 'input'].forEach(ev => ta.addEventListener(ev, updatePos));
  ta.addEventListener('scroll', () => { if (ta.scrollTop + ta.clientHeight >= ta.scrollHeight - 4) scrolledBottom = true; });
  ta.addEventListener('keydown', e => {
    if (e.key === 'F5') { e.preventDefault(); insertDate(); }
    if (e.key === 'F3') { e.preventDefault(); findNext(); }
    if (e.ctrlKey && (e.key === 'f' || e.key === 'F')) { e.preventDefault(); findDialog(); }
    if (e.ctrlKey && (e.key === 's' || e.key === 'S')) { e.preventDefault(); save(); }
    if (e.ctrlKey && (e.key === 'o' || e.key === 'O')) { e.preventDefault(); launch('mydocs'); }
  });

  // H05: "honest" -> "Even this."
  if (node && node.egg === 'weather') {
    let tipShown = false;
    ta.addEventListener('mousemove', e => {
      const r = ta.getBoundingClientRect(), cs = getComputedStyle(ta);
      const cw = measure(cs.font), lh = parseFloat(cs.lineHeight) || 18;
      const col = Math.floor((e.clientX - r.left - 2 + ta.scrollLeft) / cw), row = Math.floor((e.clientY - r.top + ta.scrollTop) / lh);
      const line = (ta.value.split('\n')[row] || '');
      const m = [...line.matchAll(/\bhonest\b/g)].find(x => col >= x.index && col < x.index + 6);
      if (m && !tipShown) { tipShown = true; showTipAt(e.clientX, e.clientY + 20, 'Even this.'); }
      if (!m) tipShown = false;
    });
  }

  const load = t => {
    ta.value = t;
    if (node && node.egg === 'camera') {
      const stamp = () => { const s = new Date().toLocaleTimeString('en-GB'); const base = ta.value.replace(/\r?\n\r?\nThis file was opened by you at [0-9:]+\.\s*$/, ''); const [a, b] = [ta.selectionStart, ta.selectionEnd]; ta.value = base + `\r\n\r\nThis file was opened by you at ${s}.`; ta.setSelectionRange(a, b); };
      stamp(); timers.push(setInterval(stamp, 1000));
    }
    if (lockUntil) {
      note.textContent = 'Read it. — s00';
      timers.push(setTimeout(() => { ta.value += '\r\n\r\n                                        Read it. — s00'; }, 3000));
      timers.push(setTimeout(() => { note.textContent = ''; }, 30000));
    }
    if (args.scrollBottom) { ta.scrollTop = ta.scrollHeight; scrolledBottom = true; }
    else { ta.setSelectionRange(0, 0); ta.scrollTop = 0; }
    if (!scrolledBottom && ta.scrollHeight <= ta.clientHeight + 4) scrolledBottom = true;
    ta.focus(); updatePos();
  };
  if (node) fs.readText(node).then(load); else load('');
  return w;
}

let cw = 0, cf = '';
function measure(font) {
  if (cw && cf === font) return cw;
  const c = document.createElement('canvas').getContext('2d'); c.font = font; cf = font;
  return (cw = c.measureText('MMMMMMMMMM').width / 10);
}

register('notepad', notepad);
