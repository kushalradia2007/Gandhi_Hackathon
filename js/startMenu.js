// Start menu structure, Run box, Log Off.
import { openMenu, closeMenus } from './menu.js';
import { launch } from './apps/index.js';
import { runDialog, messageBox } from './dialogs.js';
import { logOff } from './boot.js';

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
  return [
    { label: 'Windows Update', icon: 'winupdate', action: () => launch('ie', { url: 'http://windowsupdate.microsoft.com/' }) },
    { sep: true },
    { label: '&Programs', icon: 'programs', submenu: [
      { label: 'Accessories', icon: 'programs', submenu: [
        { label: 'Communications', icon: 'programs', submenu: [{ label: 'Dial-Up Networking', icon: 'computer', action: L('dialup') }, { label: 'HyperTerminal', icon: 'computer', action: L('hyperterminal') }] },
        { label: 'Entertainment', icon: 'programs', submenu: [{ label: 'Media Player', icon: 'app', action: L('mediaplayer') }, { label: 'Volume Control', icon: 'speaker' }] },
        { label: 'Games', icon: 'programs', submenu: [{ label: 'Minesweeper', icon: 'app', action: L('minesweeper') }, { label: 'Solitaire', icon: 'app', action: L('solitaire') }] },
        { label: 'System Tools', icon: 'programs', submenu: [{ label: 'Disk Defragmenter', icon: 'app', action: L('defrag') }, { label: 'ScanDisk', icon: 'app', action: L('scandisk') }] },
        { label: 'Calculator', icon: 'app', action: L('calc') },
        { label: 'Notepad', icon: 'notepad', action: L('notepad') },
        { label: 'Paint', icon: 'paint', action: L('paint') },
        { label: 'WordPad', icon: 'file', action: L('wordpad') },
      ] },
      { label: 'Online Services', icon: 'programs', submenu: [] },
      { label: 'Shree Cyber Zone', icon: 'programs', submenu: [
        { label: 'Café Manager 98', icon: 'cafe', action: L('cafe') },
        { label: 'Printer Queue', icon: 'printer', action: L('printq') },
        { label: 'Session Log', icon: 'sessionlog', action: L('sessionlog') },
      ] },
      { label: 'StartUp', icon: 'programs', submenu: [] },
      { label: 'Internet Explorer', icon: 'ie', action: L('ie') },
      { label: 'MS-DOS Prompt', icon: 'app', action: L('msdos') },
      { label: 'Outlook Express', icon: 'app', action: L('outlook') },
      { label: 'Windows Explorer', icon: 'folder', action: L('explorer') },
    ] },
    { label: 'F&avorites', icon: 'favorites', submenu: [
      { label: 'Channels', icon: 'folder', submenu: [] },
      { label: 'Links', icon: 'folder', submenu: [] },
      { label: 'Media', icon: 'folder', submenu: [] },
      { label: 'Shree Cyber Zone Intranet', icon: 'ie', action: L('ie') },
    ] },
    { label: '&Documents', icon: 'documents', submenu: [
      { label: 'My Documents', icon: 'mydocs', action: L('mydocs') },
      { sep: true },
      { label: 'complaint_letter.txt', icon: 'notepad', action: () => launch('notepad', { path: 'C:\\My Documents\\complaint_letter.txt' }) },
      { label: 'rates_1998.doc', icon: 'file', action: () => launch('notepad', { path: 'C:\\My Documents\\rates_1998.doc' }) },
      { label: 'tommy.jpg', icon: 'paint', action: () => launch('paint', { path: 'C:\\My Documents\\tommy.jpg' }) },
    ] },
    { label: '&Settings', icon: 'settings', submenu: [
      { label: '&Control Panel', icon: 'settings', action: L('controlpanel') },
      { label: '&Printers', icon: 'printer', action: L('printers') },
      { label: '&Taskbar & Start Menu...', icon: 'app' },
      { sep: true },
      { label: '&Folder Options...', icon: 'folder' },
      { label: '&Active Desktop', icon: 'app', submenu: [{ label: 'View As Web Page', icon: null }, { label: 'Customize my Desktop...', icon: null }] },
      { label: '&Windows Update...', icon: 'winupdate', action: () => launch('ie', { url: 'http://windowsupdate.microsoft.com/' }) },
    ] },
    { label: '&Find', icon: 'find', submenu: [
      { label: '&Files or Folders...', icon: 'find', action: L('find') },
      { label: '&Computer...', icon: 'computer', action: L('find') },
      { sep: true },
      { label: 'On the &Internet...', icon: 'ie', action: L('ie') },
      { label: '&People...', icon: 'app' },
    ] },
    { label: '&Help', icon: 'help', action: L('help') },
    { label: '&Run...', icon: 'run', action: () => runDialog(runCommand) },
    { sep: true },
    { label: '&Log Off Admin...', icon: 'logoff', action: async () => {
      const r = await messageBox({ title: 'Log Off Windows', icon: 'logoff', text: 'Are you sure you want to log off?', buttons: ['&Yes', '&No'] });
      if (r === 0) logOff();
    } },
    { label: 'Sh&ut Down...', icon: 'shutdown', action: L('shutdown') },
  ];
}

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
  if (/^[a-z]:\\?/i.test(cmd)) return launch('explorer', { path: cmd });
  if (/^(https?:\/\/|www\.)/i.test(cmd)) return launch('ie', { url: cmd });
  messageBox({ title: cmd, icon: 'error', text: `Cannot find the file '${cmd}' (or one of its components). Make sure the path and filename are correct and that all required libraries are available.` });
}
