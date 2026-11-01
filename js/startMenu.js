// Start menu structure, Run box, Log Off.
import { openMenu, closeMenus } from './menu.js';
import { launch } from './apps/index.js';
import { runDialog, messageBox } from './dialogs.js';
import { logOff } from './boot.js';
import { recent } from './state.js';
import { resolve, iconFor } from './fileSystem.js';
import { openFile } from './apps/open.js';
import { notFound } from './apps/index.js';
import { showTipAt } from './taskbar.js';

let isOpen = false;
const runHooks = [];
/** Later steps register Run-box commands (easter eggs) here. Return true if handled. */
export const onRun = fn => runHooks.push(fn);

export function toggleStartMenu(keyboard = false) {
  const btn = document.getElementById('start-btn');
  if (isOpen) { closeMenus(); return; }
  const top = document.getElementById('taskbar').getBoundingClientRect().top;
  btn.classList.add('pressed');
  isOpen = true;
  openMenu(startItems(), 2, top + 1, {
    variant: 'start', above: true, owner: btn, keyboard,
    onClose: () => { isOpen = false; btn.classList.remove('pressed'); },
  });
}

const L = id => () => launch(id);

function startItems() {
  const docs = recent.slice(0, 15).map(p => {
    const name = p.split('\\').pop();
    const n = resolve(p);
    return { label: name, icon: n ? iconFor(n) : 'file', action: () => (n ? openFile(n) : notFound(p)) };
  });
  return [
    { label: 'Windows Update', icon: 'winupdate', action: () => launch('ie', { url: 'http://windowsupdate.microsoft.com/' }) },
    { sep: true },
    { label: '&Programs', icon: 'programs', submenu: [
      { label: 'Accessories', icon: 'programs', submenu: [
        { label: 'Calculator', icon: 'calc', action: L('calc') },
        { label: 'Notepad', icon: 'notepad', action: L('notepad') },
        { label: 'Paint', icon: 'paint', action: L('paint') },
        { label: 'Media Player', icon: 'media', action: L('mediaplayer') },
        { sep: true },
        { label: 'System Tools', icon: 'programs', submenu: [] },
      ] },
      { label: 'Games', icon: 'programs', submenu: [
        { label: 'Minesweeper', icon: 'mine', action: L('minesweeper') },
        { label: 'Solitaire', icon: 'cards', action: L('solitaire') },
      ] },
      { label: 'StartUp', icon: 'programs', submenu: [] },
      { label: 'Shree Cyber Zone', icon: 'programs', submenu: [
        { label: 'Caf\u00ea Manager 98', icon: 'cafe', action: L('cafe') },
        { label: 'Printer Queue', icon: 'printer', action: L('printq') },
        { label: 'Session Log', icon: 'sessionlog', action: L('sessionlog') },
      ] },
      { sep: true },
      { label: 'Internet Explorer', icon: 'ie', action: L('ie') },
      { label: 'MS-DOS Prompt', icon: 'msdos', action: L('msdos') },
      { label: 'Windows Explorer', icon: 'folder', action: L('explorer') },
    ] },
    { label: 'F&avorites', icon: 'favorites', submenu: [
      { label: 'Channels', icon: 'folder', submenu: [] },
      { label: 'Links', icon: 'folder', submenu: [] },
      { sep: true },
      { label: 'SHREE CYBER ZONE Homepage', icon: 'ie', action: () => launch('ie', { url: 'http://shreecyberzone.local/' }) },
      { label: 'Project 2050', icon: 'ie', action: () => showTipAt(lastX, lastY + 18, 'Not available') },
    ] },
    { label: '&Documents', icon: 'documents', submenu: () => [...docs, { sep: true }, { label: 'My Documents', icon: 'mydocs', action: L('mydocs') }] },
    { label: '&Settings', icon: 'settings', submenu: [
      { label: '&Control Panel', icon: 'settings', action: L('controlpanel') },
      { label: '&Printers', icon: 'printer', action: L('printq') },
      { label: '&Taskbar & Start Menu...', icon: 'app', action: L('taskbarprops') },
      { sep: true },
      { label: '&Folder Options...', icon: 'folder', action: L('folderoptions') },
      { label: '&Active Desktop', icon: 'app', submenu: [] },
      { label: '&Windows Update...', icon: 'winupdate' },
    ] },
    { label: '&Find', icon: 'find', submenu: [
      { label: '&Files or Folders...', icon: 'find', action: L('find') },
      { label: '&Computer...', icon: 'computer', action: L('find') },
      { label: 'On the &Internet...', icon: 'ie', action: () => launch('ie', { url: 'http://google.com/' }) },
      { label: '&People...', icon: 'app', action: () => messageBox({ title: 'Find People', icon: 'info', text: 'There is only one person you are looking for.\n\nThey are reading this.' }) },
    ] },
    { label: '&Help', icon: 'help', action: L('help') },
    { label: '&Run...', icon: 'run', action: () => runDialog(runCommand) },
    { sep: true },
    { label: '&Log Off GUEST...', icon: 'logoff', action: async () => {
      const r = await messageBox({ title: 'Log Off Windows', icon: 'logoff', text: 'Are you sure you want to log off?', buttons: ['&Yes', '&No'] });
      if (r === 0) logOff();
    } },
    { label: 'Sh&ut Down...', icon: 'shutdown', action: L('shutdown') },
  ];
}

let lastX = 0, lastY = 0;
window.addEventListener('pointermove', e => { lastX = e.clientX; lastY = e.clientY; }, { passive: true });

const RUN = {
  notepad: 'notepad', 'notepad.exe': 'notepad', explorer: 'explorer', 'explorer.exe': 'explorer',
  mspaint: 'paint', pbrush: 'paint', iexplore: 'ie', calc: 'calc', 'calc.exe': 'calc',
  winmine: 'minesweeper', sol: 'solitaire', command: 'msdos', 'command.com': 'msdos', write: 'wordpad', wordpad: 'wordpad',
};

export function runCommand(raw) {
  const cmd = raw.trim();
  const key = cmd.toLowerCase();
  for (const h of runHooks) if (h(key, cmd)) return;
  if (RUN[key]) return launch(RUN[key]);
  if (/^[a-z]:(\\|$)/i.test(cmd)) { const n = resolve(cmd); if (n && !n.children && !n.letter) return openFile(n); return launch('explorer', { path: cmd }); }
  if (/^(https?:\/\/|www\.)/i.test(cmd)) return launch('ie', { url: cmd });
  messageBox({ title: cmd, icon: 'error', text: `Cannot find the file '${cmd}' (or one of its components). Make sure the path and filename are correct and that all required libraries are available.` });
}
