// Folder windows (My Computer, My Documents, Recycle Bin, any path incl. hidden ones typed into Address).
import { createWindow, setBusy } from '../windowManager.js';
import { icon } from '../icons.js';
import { menuBar } from '../menu.js';
import { messageBox } from '../dialogs.js';
import { register, launch } from './index.js';
import * as fs from '../fileSystem.js';
import { openFile } from './open.js';

export function openFolder(path) {
  const node = fs.resolve(path);
  if (!node) return cannotFind(path);
  if (node.notReady) return notReady(node);
  if (node.app && !node.children) return launch(node.app);
  if (!fs.isContainer(node)) return openFile(node);
  return folderWindow(node);
}

const cannotFind = path => messageBox({ title: path, icon: 'error', text: `Cannot find the file '${path}' (or one of its components). Make sure the path and filename are correct and that all required libraries are available.` });
const notReady = n => messageBox({ title: n.name, icon: 'error', text: `${n.letter}\\ is not accessible.\n\nThe device is not ready.`, buttons: ['&Retry', 'Cancel'], cancelIndex: 1 });

function title(n) { return n.type === 'drive' ? n.name : n === fs.getRoot() ? 'My Computer' : n.name === 'RECYCLED' ? 'Recycle Bin' : n.name; }

function folderWindow(start) {
  const body = document.createElement('div');
  body.className = 'explorer';
  body.innerHTML = `
    <div class="bands">
      <div class="band mb-band"><div class="tb-grip"></div></div>
      <div class="band">
        <div class="tb-grip"></div>
        <button class="tbtn" data-a="back"><img src="${icon('back', 16)}" alt="">Back</button>
        <button class="tbtn" data-a="fwd"><img src="${icon('forward', 16)}" alt="">Forward</button>
        <button class="tbtn" data-a="up"><img src="${icon('up', 16)}" alt="">Up</button>
      </div>
      <div class="band addr">
        <div class="tb-grip"></div><span>A<u>d</u>dress</span>
        <div class="addr-box"><img alt="" width="16" height="16"><input type="text" spellcheck="false" autocomplete="off"></div>
      </div>
    </div>
    <div class="fv" tabindex="-1"></div>
    <div class="statusbar"><div class="sb-main"></div><div class="sb-size" style="flex:0 0 90px"></div><div class="sb-zone" style="flex:0 0 120px"></div></div>`;
  const fv = body.querySelector('.fv'), input = body.querySelector('.addr-box input'), aicon = body.querySelector('.addr-box img');
  const [sbMain, sbSize, sbZone] = body.querySelectorAll('.statusbar > div');
  const btn = a => body.querySelector(`[data-a="${a}"]`);
  let cur = null, back = [], fwd = [], selNode = null;

  const w = createWindow({ title: title(start), icon: start.icon || 'folder', content: body, width: 520, height: 360, minWidth: 260, minHeight: 180 });

  body.querySelector('.mb-band').appendChild(menuBar([
    { label: '&File', items: () => [
      { label: '&Open', bold: true, disabled: !selNode, action: () => selNode && open(selNode) },
      { sep: true },
      { label: 'Ne&w', submenu: [{ label: '&Folder' }, { label: '&Shortcut' }, { sep: true }, { label: 'Text Document' }] },
      { sep: true },
      { label: 'Create &Shortcut', disabled: true }, { label: '&Delete', disabled: true }, { label: 'Rena&me', disabled: true }, { label: 'P&roperties', disabled: !selNode, action: () => props(selNode) },
      { sep: true },
      { label: '&Close', action: () => w.close() },
    ] },
    { label: '&Edit', items: [{ label: '&Undo', disabled: true }, { sep: true }, { label: 'Cu&t', disabled: true }, { label: '&Copy', disabled: true }, { label: '&Paste', disabled: true }, { sep: true }, { label: 'Select &All' }, { label: '&Invert Selection' }] },
    { label: '&View', items: [{ label: '&Toolbars', submenu: [{ label: '&Standard Buttons', checked: true }, { label: '&Address Bar', checked: true }] }, { label: 'Status &Bar', checked: true }, { sep: true }, { label: 'Lar&ge Icons', checked: true }, { label: 'S&mall Icons' }, { label: '&List' }, { label: '&Details' }, { sep: true }, { label: '&Refresh', action: () => nav(cur, true) }, { label: 'Folder &Options...' }] },
    { label: '&Go', items: [{ label: '&Back', action: goBack }, { label: '&Forward', action: goFwd }, { label: '&Up One Level', action: goUp }, { sep: true }, { label: '&My Computer', action: () => go(fs.getRoot()) }] },
    { label: 'F&avorites', items: [{ label: '&Add to Favorites...' }, { label: '&Organize Favorites...' }, { sep: true }, { label: 'Channels', submenu: [] }, { label: 'Links', submenu: [] }] },
    { label: '&Help', items: [{ label: '&Help Topics', action: () => launch('help') }, { sep: true }, { label: '&About Windows 98', action: aboutWin }] },
  ], true));

  function go(n) { if (n === cur) return; if (cur) back.push(cur); fwd = []; nav(n); }
  function goBack() { if (!back.length) return; fwd.push(cur); nav(back.pop()); }
  function goFwd() { if (!fwd.length) return; back.push(cur); nav(fwd.pop()); }
  function goUp() { if (cur && cur.parent) go(cur.parent); }

  function nav(n) {
    cur = n; selNode = null;
    w.setTitle(title(n));
    input.value = fs.pathOf(n);
    aicon.src = icon(fs.iconFor(n), 16);
    btn('back').disabled = !back.length; btn('fwd').disabled = !fwd.length; btn('up').disabled = !n.parent;
    fv.textContent = '';
    const kids = fs.children(n, false);
    for (const c of kids) {
      const el = document.createElement('div');
      el.className = 'icon';
      el.innerHTML = `<img src="${icon(fs.iconFor(c), 32)}" width="32" height="32" alt="" draggable="false"><span class="label"></span>`;
      el.lastChild.textContent = c.name;
      el.addEventListener('pointerdown', e => { e.stopPropagation(); select(c, el); });
      el.addEventListener('dblclick', () => open(c));
      el.addEventListener('contextmenu', e => { e.preventDefault(); e.stopPropagation(); select(c, el); });
      el._node = c;
      fv.appendChild(el);
    }
    const hid = n.parent ? fs.hiddenCount(n) : 0;
    sbMain.textContent = `${kids.length} object(s)` + (hid ? ` (plus ${hid} hidden)` : '');
    const total = kids.reduce((s, c) => s + (c.size || 0), 0);
    sbSize.textContent = n.type === 'computer' ? '' : fs.sizeKB({ size: total });
    sbZone.textContent = 'My Computer';
    fs.emitOpen(n);
  }

  function select(c, el) {
    selNode = c;
    fv.querySelectorAll('.icon').forEach(x => {
      const s = x === el;
      x.classList.toggle('selected', s); x.classList.toggle('focused', s);
      x.firstChild.src = icon(fs.iconFor(x._node), 32, s ? 'sel' : '');
    });
    if (c && !fs.isContainer(c)) sbMain.textContent = `Type: ${fs.typeName(c)}  Size: ${fs.sizeKB(c)}`;
  }

  function open(c) {
    if (c.notReady) return notReady(c);
    if (fs.isContainer(c) && !(c.app && !c.children)) { setBusy(true); setTimeout(() => { setBusy(false); go(c); }, 120); return; }
    openFile(c);
  }

  function props(c) {
    messageBox({ title: c.name + ' Properties', icon: fs.iconFor(c), text: `${c.name}\n\nType:       ${fs.typeName(c)}\nLocation:  ${fs.pathOf(c.parent)}\nSize:        ${fs.sizeKB(c) || '0KB'}\nModified:  ${c.date || ''}\n\nAttributes: ${c.hidden ? 'Hidden' : 'Archive'}`, buttons: ['OK'] });
  }

  fv.addEventListener('pointerdown', () => select(null, null));
  fv.addEventListener('keydown', e => { if (e.key === 'Enter' && selNode) open(selNode); if (e.key === 'Backspace') goUp(); });
  input.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const p = input.value.trim();
    const n = fs.resolve(p);
    if (!n) { cannotFind(p); return; }
    if (n.notReady) { notReady(n); return; }
    if (fs.isContainer(n) && !(n.app && !n.children)) { go(n); fv.focus(); } else openFile(n);
  });
  input.addEventListener('focus', () => input.select());
  btn('back').addEventListener('click', goBack);
  btn('fwd').addEventListener('click', goFwd);
  btn('up').addEventListener('click', goUp);

  nav(start);
  return w;
}

function aboutWin() {
  messageBox({ title: 'About Windows', icon: 'computer', text: 'Microsoft (R) Windows 98\nVersion 4.10.2222 A\nCopyright (C) 1981-1999 Microsoft Corp.\n\nThis product is licensed to:\n   Bhaiya\n   Shree Cyber Zone\n\nPhysical memory available to Windows: 32,768 KB\nSystem resources: 3% free' });
}

register('mycomputer', () => openFolder('My Computer'));
register('explorer', a => openFolder(a.path || 'C:\\'));
register('mydocs', () => openFolder('C:\\My Documents'));
register('recycle', () => openFolder('C:\\RECYCLED'));
