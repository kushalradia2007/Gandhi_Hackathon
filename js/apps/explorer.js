// Explorer: folder windows with tree pane, four views, address bar (the door to C:\BACKROOM$), context menus.
import { createWindow, setBusy } from '../windowManager.js';
import { icon } from '../icons.js';
import { menuBar, openMenu } from '../menu.js';
import { messageBox } from '../dialogs.js';
import { register, launch } from './index.js';
import * as fs from '../fileSystem.js';
import { openFile } from './open.js';
import { flags, store } from '../state.js';

const visited = new Set(store.get('visited', []));
const history = store.get('addrHistory', ['C:\\', 'C:\\My Documents', 'My Computer']);
const markVisited = p => { visited.add(p.toUpperCase()); store.set('visited', [...visited]); };
const remember = p => { const i = history.indexOf(p); if (i >= 0) history.splice(i, 1); history.unshift(p); history.length = Math.min(history.length, 12); store.set('addrHistory', history); };
const isBackroom = n => { for (let x = n; x; x = x.parent) if (x.name === 'BACKROOM$') return true; return false; };
const isBin = n => n && n.name === 'RECYCLED';

const cannotFind = p => messageBox({ title: p, icon: 'error', text: `Cannot find the file '${p}' (or one of its components). Make sure the path and filename are correct and that all required libraries are available.` });
const notReady = async n => {
  const text = `${n.letter}\\ is not accessible.\n\nThe device is not ready.` + (n.letter === 'A:' && flags.eipRead ? '\n\nThe device is waiting.' : '');
  while ((await messageBox({ title: n.name, icon: 'error', text, buttons: ['&Retry', 'Cancel'], cancelIndex: 1 })) === 0) { /* Retry shows the same dialog */ }
};
export function lnkProps(c) {
  const t = c.target || '', dir = t.includes('\\') ? t.slice(0, t.lastIndexOf('\\')) : t;
  const body = document.createElement('div');
  body.className = 'msgbox';
  body.innerHTML = `<div class="msg-main" style="align-items:flex-start"><img src="${icon(c.icon || 'app', 32)}" width="32" height="32" alt=""><b></b></div>
    <div class="pd-row"><span style="width:90px">Target type:</span><span>Application</span></div>
    <div class="field"><label style="width:90px">Target:</label><input type="text" readonly></div>
    <div class="field"><label style="width:90px">Start in:</label><input type="text" readonly></div>
    <div class="pd-row"><span style="width:90px">Shortcut key:</span><span>None</span></div>
    <div class="pd-row"><span style="width:90px">Run:</span><span>Normal window</span></div>
    <div class="dlg-btns" style="margin:10px 0"><button disabled>Change Icon...</button><button class="ft">Find Target...</button></div>
    <div class="dlg-btns" style="justify-content:flex-end"><button class="default">OK</button><button>Cancel</button></div>`;
  body.querySelector('b').textContent = c.name.replace(/\.lnk$/i, '');
  const [tIn, sIn] = body.querySelectorAll('input'); tIn.value = t; sIn.value = dir;
  const w = createWindow({ title: `${c.name.replace(/\.lnk$/i, '')} Shortcut Properties`, content: body, noIcon: true, help: true, resizable: false, minimizable: false, className: 'dialog', center: true, taskbar: false });
  body.querySelector('.ft').onclick = () => { if (!fs.resolve(t) && !/^(My Computer|Network Neighborhood|C:\\Recycle Bin)$/i.test(t)) messageBox({ title: 'Shortcut', icon: 'error', text: `Cannot find the file '${t}' (or one of its components).\n\nMake sure the path and filename are correct and that all required libraries are available.` }); else launch('explorer', { path: dir || 'C:\\' }); };
  body.querySelectorAll('.dlg-btns:last-child button').forEach(b => { b.onclick = () => w.close(); });
}
const title = n => (n === fs.getRoot() ? 'My Computer' : isBin(n) ? 'Recycle Bin' : n.type === 'drive' ? n.name : n.name);
const opensApp = n => n.app && !n.children;

export function openFolder(path) {
  const n = fs.resolve(path);
  if (!n) return cannotFind(path);
  if (n.notReady) return notReady(n);
  if (opensApp(n)) return launch(n.app);
  if (!fs.isContainer(n)) return openFile(n);
  return folderWindow(n);
}

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
        <div class="tb-sep"></div>
        <button class="tbtn" data-a="views">Views</button>
      </div>
      <div class="band addr">
        <div class="tb-grip"></div><span>A<u>d</u>dress</span>
        <div class="addr-box"><img alt="" width="16" height="16"><input type="text" spellcheck="false" autocomplete="off"><button class="combo-btn" tabindex="-1" aria-label="History"></button></div>
        <button class="tbtn go">Go</button>
      </div>
    </div>
    <div class="ex-main"><div class="ex-tree lv" tabindex="-1"><div class="tree-head">All Folders</div><div class="tree"></div></div><div class="fv large" tabindex="-1"></div></div>
    <div class="statusbar"><div class="sb-main"></div><div class="sb-size" style="flex:0 0 90px"></div><div class="sb-zone" style="flex:0 0 120px">My Computer</div></div>`;
  const fv = body.querySelector('.fv'), tree = body.querySelector('.tree'), treePane = body.querySelector('.ex-tree');
  const input = body.querySelector('.addr-box input'), aicon = body.querySelector('.addr-box img');
  const [sbMain, sbSize] = body.querySelectorAll('.statusbar > div');
  const btn = a => body.querySelector(`[data-a="${a}"]`);
  let cur = null, back = [], fwd = [], selNode = null, view = store.get('view', 'large'), showTree = !!start.parent;
  const w = createWindow({ title: title(start), icon: start.icon || 'folder', content: body, width: 600, height: 380, minWidth: 300, minHeight: 200 });

  const setView = v => { view = v; store.set('view', v); fv.className = 'fv ' + v; render(); };
  const viewItems = () => [['Lar&ge Icons', 'large'], ['S&mall Icons', 'small'], ['&List', 'list'], ['&Details', 'details']].map(([l, v]) => ({ label: l, checked: view === v, action: () => setView(v) }));

  body.querySelector('.mb-band').appendChild(menuBar([
    { label: '&File', items: () => [
      { label: '&Open', bold: true, disabled: !selNode, action: () => selNode && open(selNode) },
      { label: '&Explore', disabled: !selNode || !fs.isContainer(selNode), action: () => selNode && go(selNode) },
      { label: '&Find...', action: () => launch('find') },
      { sep: true },
      { label: 'Ne&w', submenu: [{ label: '&Folder', action: newFolder }, { label: '&Shortcut', action: notAvail }, { sep: true }, { label: 'Text Document', action: newText }] },
      { sep: true },
      { label: 'Create &Shortcut', disabled: !selNode, action: notAvail },
      { label: '&Delete', disabled: !selNode, action: () => del(selNode) },
      { label: 'Rena&me', disabled: !selNode, action: () => rename(selNode) },
      { label: 'P&roperties', action: () => props(selNode || cur) },
      ...(isBin(cur) ? [{ sep: true }, { label: 'Empty Recycle &Bin', action: () => launch('emptybin').then?.(() => render()) }] : []),
      { sep: true },
      { label: '&Close', action: () => w.close() },
    ] },
    { label: '&Edit', items: [{ label: '&Undo', disabled: true }, { sep: true }, { label: 'Cu&t', action: notAvail }, { label: '&Copy', action: notAvail }, { label: '&Paste', disabled: true }, { label: 'Paste &Shortcut', disabled: true }, { sep: true }, { label: 'Select &All' }, { label: '&Invert Selection' }] },
    { label: '&View', items: () => [
      { label: '&Toolbars', submenu: [{ label: '&Standard Buttons', checked: true }, { label: '&Address Bar', checked: true }] },
      { label: 'Status &Bar', checked: true },
      { label: 'E&xplorer Bar', submenu: [{ label: '&All Folders', checked: showTree, action: () => { showTree = !showTree; layout(); } }] },
      { sep: true }, { label: 'as &Web Page', action: notAvail },
      { sep: true }, ...viewItems(),
      { sep: true }, { label: 'Arrange &Icons', submenu: [{ label: 'by &Name', action: render }, { label: 'by &Type', action: render }, { label: 'by Si&ze', action: render }, { label: 'by &Date', action: render }] },
      { label: 'Line &Up Icons', action: render },
      { sep: true }, { label: '&Refresh', shortcut: 'F5', action: render },
      { label: 'Folder &Options...', action: () => launch('folderoptions') },
    ] },
    { label: '&Go', items: [{ label: '&Back', shortcut: 'Alt+Left', action: goBack }, { label: '&Forward', shortcut: 'Alt+Right', action: goFwd }, { label: '&Up One Level', action: goUp }, { sep: true }, { label: '&Home Page', action: () => launch('ie', { url: 'http://shreecyberzone.local/' }) }, { label: '&My Computer', action: () => go(fs.getRoot()) }, { sep: true }, { label: 'Folder &Options...', action: () => launch('folderoptions') }] },
    { label: 'F&avorites', items: [{ label: '&Add to Favorites...', action: notAvail }, { sep: true }, { label: 'SHREE CYBER ZONE Homepage', action: () => launch('ie', { url: 'http://shreecyberzone.local/' }) }] },
    { label: '&Help', items: [{ label: '&Help Topics', action: () => launch('help') }, { sep: true }, { label: '&About Windows', action: aboutWin }] },
  ], true));

  function go(n) { if (n === cur) return; if (cur) back.push(cur); fwd = []; nav(n); }
  function goBack() { if (!back.length) return; fwd.push(cur); nav(back.pop()); }
  function goFwd() { if (!fwd.length) return; back.push(cur); nav(fwd.pop()); }
  function goUp() { if (cur && cur.parent) go(cur.parent); }

  function nav(n) {
    cur = n; selNode = null;
    const p = fs.pathOf(n);
    if (isBackroom(n)) markVisited('C:\\BACKROOM$');
    remember(p);
    w.setTitle(title(n));
    input.value = isBin(n) ? 'Recycle Bin' : p;
    aicon.src = icon(n.icon || (n.type === 'computer' ? 'computer' : 'folder'), 16);
    btn('back').disabled = !back.length; btn('fwd').disabled = !fwd.length; btn('up').disabled = !n.parent;
    render(); renderTree(); layout();
    fs.emitOpen(n);
  }

  function layout() { treePane.style.display = showTree ? '' : 'none'; }

  function render() {
    fv.textContent = '';
    const kids = fs.children(cur, false);
    if (view === 'details') {
      const t = document.createElement('table');
      t.className = 'grid details';
      t.innerHTML = '<thead><tr><th>Name</th><th>Size</th><th>Type</th><th>Modified</th></tr></thead><tbody></tbody>';
      const tb = t.lastChild;
      for (const c of kids) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td><img src="${icon(fs.iconFor(c), 16)}" width="16" height="16" alt=""><span></span></td><td>${fs.isContainer(c) ? '' : fs.sizeKB(c)}</td><td>${fs.typeName(c)}</td><td>${c.date ? c.date.replace(/^0/, '').replace(/\/0/, '/') : ''}</td>`;
        tr.querySelector('span').textContent = c.name;
        wire(tr, c); tb.appendChild(tr);
      }
      fv.appendChild(t);
    } else {
      const big = view === 'large';
      for (const c of kids) {
        const el = document.createElement('div');
        el.className = 'icon';
        el.innerHTML = `<img src="${icon(fs.iconFor(c), big ? 32 : 16)}" width="${big ? 32 : 16}" height="${big ? 32 : 16}" alt="" draggable="false"><span class="label"></span>`;
        el.lastChild.textContent = c.name;
        wire(el, c); fv.appendChild(el);
      }
    }
    const hid = cur.parent ? fs.hiddenCount(cur) : 0;
    sbMain.textContent = `${kids.length} object(s)` + (hid ? ` (plus ${hid} hidden)` : '');
    const total = kids.reduce((s, c) => s + (c.size || 0), 0);
    sbSize.textContent = cur.type === 'computer' ? '' : fs.sizeKB({ size: total });
  }

  function wire(el, c) {
    el._node = c;
    el.addEventListener('pointerdown', e => { e.stopPropagation(); select(c); });
    el.addEventListener('dblclick', () => open(c));
    el.addEventListener('contextmenu', e => { e.preventDefault(); e.stopPropagation(); select(c); itemMenu(c, e.clientX, e.clientY); });
  }

  function select(c) {
    selNode = c;
    fv.querySelectorAll('.icon, tbody tr').forEach(x => {
      const s = x._node === c;
      x.classList.toggle('selected', s); x.classList.toggle('focused', s);
      const img = x.querySelector('img'); if (img && x.classList.contains('icon')) img.src = icon(fs.iconFor(x._node), view === 'large' ? 32 : 16, s ? 'sel' : '');
    });
    if (c && !fs.isContainer(c)) sbMain.textContent = `Type: ${fs.typeName(c)}  Size: ${fs.sizeKB(c) || '0KB'}`;
  }

  function open(c) {
    if (c.notReady) return notReady(c);
    if (fs.isContainer(c) && !opensApp(c)) { setBusy(true); setTimeout(() => { setBusy(false); go(c); }, 120); return; }
    openFile(c);
  }

  /* ---------- tree ---------- */
  function renderTree() {
    tree.innerHTML = '';
    const showBack = visited.has('C:\\BACKROOM$');
    const add = (n, depth, label) => {
      const row = document.createElement('div');
      row.className = 'tnode' + (n === cur ? ' sel' : '');
      row.style.paddingLeft = depth * 16 + 2 + 'px';
      row.innerHTML = `<img src="${icon(n.icon || (n.type === 'computer' ? 'computer' : 'folder'), 16)}" width="16" height="16" alt=""><span></span>`;
      row.lastChild.textContent = label || title(n);
      row.addEventListener('click', () => { if (n.notReady) notReady(n); else if (opensApp(n)) launch(n.app); else go(n); });
      tree.appendChild(row);
      const onPath = (() => { for (let x = cur; x; x = x.parent) if (x === n) return true; return false; })();
      if (depth === 0 || onPath) (n.children || []).filter(k => fs.isContainer(k) && !k.notReady && (!k.hidden || (k.name === 'BACKROOM$' && showBack))).forEach(k => add(k, depth + 1));
    };
    add(fs.getRoot(), 0);
    const bin = fs.resolve('C:\\RECYCLED');
    if (bin) add(bin, 0, 'Recycle Bin');
  }

  /* ---------- actions ---------- */
  function notAvail() { messageBox({ title: title(cur), icon: 'info', text: 'This feature is not available on PC 03.' }); }
  function newFolder() {
    if (cur.children && !cur.children.some(c => c.name === 'SEAT_07')) {
      cur.children.push({ name: 'SEAT_07', type: 'folder', date: new Date().toLocaleDateString('en-US') + ' 3:14 AM', children: [], parent: cur, locked: true });
      render();
    } else messageBox({ title: 'Error Creating Folder', icon: 'error', text: 'Cannot create folder. SEAT_07 already exists. It has always existed.' });
  }
  function newText() {
    cur.children = cur.children || [];
    cur.children.push({ name: 'New Text Document.txt', type: 'file', size: 0, content: '', date: new Date().toLocaleDateString('en-US'), parent: cur });
    render();
  }
  async function del(c) {
    if (!c) return;
    if (c.locked) return messageBox({ title: 'Error Deleting File', icon: 'error', text: `Cannot delete ${c.name}: The seat cannot be removed.` });
    if (isBackroom(c) || c.egg || c.app || c.type === 'drive' || cur.type === 'computer' || isBin(cur)) return messageBox({ title: 'Error Deleting File', icon: 'error', text: `Cannot delete ${c.name}: Access is denied.\n\nMake sure the disk is not full or write-protected and that the file is not currently in use.` });
    const r = await messageBox({ title: 'Confirm File Delete', icon: 'question', text: `Are you sure you want to send '${c.name}' to the Recycle Bin?`, buttons: ['&Yes', '&No'] });
    if (r !== 0) return;
    const bin = fs.resolve('C:\\RECYCLED');
    cur.children.splice(cur.children.indexOf(c), 1);
    c.origin = fs.pathOf(cur); c.parent = bin; bin.children.push(c);
    render();
  }
  function rename(c) {
    if (!c) return;
    if (c.locked) return messageBox({ title: 'Error Renaming File', icon: 'error', text: `Cannot rename ${c.name}: The seat has your name on it.` });
    if (isBackroom(c) || c.egg || c.type === 'drive' || cur.type === 'computer') return messageBox({ title: 'Error Renaming File', icon: 'error', text: `Cannot rename ${c.name}: Access is denied.` });
    const el = [...fv.querySelectorAll('.icon, tbody tr')].find(x => x._node === c);
    const lab = el && (el.querySelector('.label') || el.querySelector('span'));
    if (!lab) return;
    const inp = document.createElement('input'); inp.type = 'text'; inp.value = c.name; inp.className = 'rename';
    lab.replaceWith(inp); inp.focus(); inp.select();
    const done = ok => { if (ok && inp.value.trim()) c.name = inp.value.trim(); render(); };
    inp.addEventListener('keydown', e => { e.stopPropagation(); if (e.key === 'Enter') done(true); if (e.key === 'Escape') done(false); });
    inp.addEventListener('blur', () => done(true));
  }
  async function restore(c) {
    if (c.egg === 'shred' || c.egg === 'restorable') {
      c.restores = (c.restores || 0) + 1;
      flags.restoreCount++;
      if (c.restores <= 2) await messageBox({ title: 'Recycle Bin', icon: 'info', text: `Restoring ${c.name}...\n\nRestored.` });
      else if (c.restores === 3) await messageBox({ title: 'Recycle Bin', icon: 'info', text: 'Restored.' });
      render();
      return; // it goes back to... the Recycle Bin. On the fourth attempt Restore does nothing.
    }
    const to = fs.resolve(c.origin || 'C:\\My Documents');
    if (!to || isBackroom(to)) return messageBox({ title: 'Recycle Bin', icon: 'error', text: `Cannot restore ${c.name}: the original folder no longer accepts it.` });
    cur.children.splice(cur.children.indexOf(c), 1);
    c.parent = to; to.children.push(c); render();
  }
  function props(c) {
    const n = c || cur;
    if (n.lnk) return lnkProps(n);
    if (n.props) return messageBox({ title: n.props.split('\n')[0].includes('Properties') ? n.props.split('\n')[0] : `${n.name} Properties`, icon: n.icon || fs.iconFor(n), text: n.props.split('\n')[0].includes('Properties') ? n.props.split('\n').slice(2).join('\n') : n.props });
    const loc = n.parent ? fs.pathOf(n.parent) : '';
    let extra = '';
    if (n.owner || n.status) extra = `\n\nOwner:      ${n.owner || '\u2014'}\nLocation:   ${n.status ? '\u2014' : loc}\nStatus:     ${n.status || 'ACTIVE'}`;
    if (n.egg === 'quietdll') return messageBox({ title: `${n.name} Properties`, icon: 'error', text: 'Properties are not available for this file.' });
    if (fs.isContainer(n)) {
      const files = (function count(x) { return (x.children || []).reduce((s, k) => s + (fs.isContainer(k) ? count(k) : 1), 0); })(n);
      return messageBox({ title: `${title(n)} Properties`, icon: n.icon || 'folder', text: `${title(n)}\n\nType:       ${fs.typeName(n)}\nLocation:  ${loc}\nContains:  ${files} Files\nCreated:    ${n.date || '3/3/98 3:14 AM'}\nAttributes: ${n.hidden ? 'Hidden, System' : 'Archive'}` });
    }
    messageBox({ title: `${n.name} Properties`, icon: fs.iconFor(n), text: `${n.name}\n\nType:       ${fs.typeName(n)}\nLocation:  ${n.status ? '\u2014' : loc}\nSize:        ${fs.sizeKB(n) || '0KB'} (${(n.size || 0).toLocaleString('en-US')} bytes)\nModified:  ${n.date || ''}\nAttributes: ${n.readonly ? 'Read-only' : n.hidden ? 'Hidden' : 'Archive'}${extra}` });
  }

  function itemMenu(c, x, y) {
    if (isBin(cur)) return openMenu([{ label: '&Restore', bold: true, action: () => restore(c) }, { sep: true }, { label: 'Cu&t', action: notAvail }, { sep: true }, { label: '&Delete', action: () => del(c) }, { sep: true }, { label: 'P&roperties', action: () => props(c) }], x, y);
    if (fs.isContainer(c)) return openMenu([{ label: '&Open', bold: true, action: () => open(c) }, { label: 'E&xplore', action: () => { showTree = true; go(c); } }, { label: '&Find...', action: () => launch('find') }, { sep: true }, { label: 'Cu&t', action: notAvail }, { label: '&Copy', action: notAvail }, { sep: true }, { label: 'Create &Shortcut', action: notAvail }, { label: '&Delete', action: () => del(c) }, { label: 'Rena&me', action: () => rename(c) }, { sep: true }, { label: 'P&roperties', action: () => props(c) }], x, y);
    openMenu([{ label: '&Open', bold: true, action: () => open(c) }, { label: '&Print', action: () => import('./printing.js').then(m => (/LEDGER_98/i.test(c.name) ? m.printDialog({ doc: c.name, real: () => m.realPrintLedger() }) : m.printDialog({ doc: c.name }))) }, { sep: true },
      { label: 'Se&nd To', submenu: [{ label: '3\u00bd Floppy (A)', action: () => messageBox({ title: 'Copying...', icon: 'error', text: 'A:\\ is not accessible.\n\nThe device is not ready.' }) }, { label: 'Desktop (create shortcut)', action: notAvail }, { label: 'My Documents', action: notAvail }] },
      { label: 'Cu&t', action: notAvail }, { label: '&Copy', action: notAvail }, { sep: true }, { label: 'Create &Shortcut', action: notAvail }, { label: '&Delete', action: () => del(c) }, { label: 'Rena&me', action: () => rename(c) }, { sep: true }, { label: 'P&roperties', action: () => props(c) }], x, y);
  }
  fv.addEventListener('contextmenu', e => {
    e.preventDefault();
    openMenu([
      { label: '&View', submenu: viewItems() }, { sep: true },
      { label: 'Arrange &Icons', submenu: [{ label: 'by &Name', action: render }, { label: 'by &Type', action: render }, { label: 'by Si&ze', action: render }, { label: 'by &Date', action: render }] },
      { label: 'Line &Up Icons', action: render }, { sep: true }, { label: '&Refresh', action: render }, { sep: true },
      { label: '&Paste', disabled: true }, { label: 'Paste &Shortcut', disabled: true }, { sep: true },
      ...(isBin(cur) ? [{ label: 'Empty Recycle &Bin', action: async () => { await launch('emptybin'); render(); } }, { sep: true }] : [{ label: 'Ne&w', submenu: [{ label: '&Folder', action: newFolder }, { label: '&Shortcut', action: notAvail }, { sep: true }, { label: 'Text Document', action: newText }] }, { sep: true }]),
      { label: 'P&roperties', action: () => props(cur) },
    ], e.clientX, e.clientY);
  });

  /* ---------- address bar ---------- */
  function goPath(raw) {
    const p = raw.trim();
    if (!p) return;
    if (p === '..') return goUp();
    if (/^(https?:\/\/|www\.|[a-z0-9-]+\.(com|local|room|net|org)\b)/i.test(p)) return launch('ie', { url: p });
    if (/^tommy$/i.test(p)) return openFile(fs.resolve('C:\\My Documents\\tommy.jpg'));
    const n = fs.resolve(p);
    if (!n) return cannotFind(p);
    if (n.notReady) return notReady(n);
    if (fs.isContainer(n) && !opensApp(n)) { go(n); fv.focus(); } else if (opensApp(n)) launch(n.app); else openFile(n);
  }
  input.addEventListener('keydown', e => { if (e.key === 'Enter') goPath(input.value); });
  input.addEventListener('focus', () => input.select());
  body.querySelector('.go').addEventListener('click', () => goPath(input.value));
  body.querySelector('.addr-box .combo-btn').addEventListener('pointerdown', e => {
    e.preventDefault();
    const r = body.querySelector('.addr-box').getBoundingClientRect();
    const opts = history.filter(h => !/BACKROOM\$/i.test(h) || visited.has('C:\\BACKROOM$'));
    openMenu(opts.map(h => ({ label: h.replace(/&/g, '&&'), action: () => goPath(h) })), r.left, r.bottom);
  });
  btn('back').addEventListener('click', goBack);
  btn('fwd').addEventListener('click', goFwd);
  btn('up').addEventListener('click', goUp);
  btn('views').addEventListener('click', () => { const order = ['large', 'small', 'list', 'details']; setView(order[(order.indexOf(view) + 1) % 4]); });

  fv.addEventListener('pointerdown', () => select(null));
  body.addEventListener('keydown', e => {
    if (e.target === input || e.target.classList.contains('rename')) return;
    if (e.key === 'Enter' && selNode) open(selNode);
    if (e.key === 'Backspace') { e.preventDefault(); goUp(); }
    if (e.key === 'Delete' && selNode) del(selNode);
    if (e.key === 'F2' && selNode) rename(selNode);
    if (e.key === 'F5') { e.preventDefault(); render(); }
    if (e.altKey && e.key === 'ArrowLeft') { e.preventDefault(); goBack(); }
    if (e.altKey && e.key === 'ArrowRight') { e.preventDefault(); goFwd(); }
    if (e.ctrlKey && (e.key === 'f' || e.key === 'F')) { e.preventDefault(); launch('find'); }
    if (e.ctrlKey && (e.key === 'n' || e.key === 'N')) { e.preventDefault(); folderWindow(cur); }
  });

  fv.className = 'fv ' + view;
  nav(start);
  return w;
}

function aboutWin() {
  messageBox({ title: 'About Windows', icon: 'computer', text: 'Microsoft (R) Windows 98\nVersion 4.10.2222 A\nCopyright (C) 1981-1999 Microsoft Corp.\n\nThis product is licensed to:\n   GUEST\n   SHREE CYBER ZONE, Bhilai\n\nPhysical memory available to Windows: 65,536 KB\nSystem resources: 3% free' });
}

register('mycomputer', () => openFolder('My Computer'));
register('explorer', a => openFolder(a.path || 'C:\\'));
register('mydocs', () => openFolder('C:\\My Documents'));
register('recycle', () => openFolder('C:\\RECYCLED'));
