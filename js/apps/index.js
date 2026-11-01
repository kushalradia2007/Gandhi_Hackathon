// App registry. Real apps call register(); anything not yet built opens an empty shell.
import { createWindow } from '../windowManager.js';
import { messageBox } from '../dialogs.js';

const registry = {};
export function register(id, fn) { registry[id] = fn; }

// [title, icon] for apps that arrive in later build steps
const SHELLS = {
  mycomputer: ['My Computer', 'computer'],
  mydocs: ['My Documents', 'mydocs'],
  explorer: ['Exploring - My Computer', 'computer'],
  ie: ['Shree Cyber Zone - Microsoft Internet Explorer', 'ie'],
  recycle: ['Recycle Bin', 'recyclefull'],
  cafe: ['Café Manager 98', 'cafe'],
  sessionlog: ['Session Log', 'sessionlog'],
  printq: ['Printer Queue', 'printer'],
  notepad: ['Untitled - Notepad', 'notepad'],
  paint: ['untitled - Paint', 'paint'],
  help: ['Windows Help', 'help'],
  minesweeper: ['Minesweeper', 'app'],
  solitaire: ['Solitaire', 'app'],
  mediaplayer: ['Media Player', 'app'],
  controlpanel: ['Control Panel', 'settings'],
  printers: ['Printers', 'printer'],
  find: ['Find: All Files', 'find'],
};

// Programs that are no longer on this machine.
const MISSING = {
  calc: 'C:\\WINDOWS\\CALC.EXE',
  wordpad: 'C:\\Program Files\\Accessories\\WORDPAD.EXE',
  outlook: 'C:\\Program Files\\Outlook Express\\MSIMN.EXE',
  msdos: 'C:\\WINDOWS\\COMMAND.COM',
  hyperterminal: 'C:\\Program Files\\Accessories\\HyperTerminal\\HYPERTRM.EXE',
  defrag: 'C:\\WINDOWS\\DEFRAG.EXE',
  scandisk: 'C:\\WINDOWS\\SCANDSKW.EXE',
};

export function notFound(path, title = path.split('\\').pop()) {
  return messageBox({ title, icon: 'error', text: `Cannot find the file '${path}' (or one of its components). Make sure the path and filename are correct and that all required libraries are available.` });
}

export function launch(id, args = {}) {
  if (registry[id]) return registry[id](args);
  if (MISSING[id]) return notFound(MISSING[id]);
  const s = SHELLS[id];
  if (!s) return null;
  const body = document.createElement('div');
  body.className = 'shell';
  body.innerHTML = '<div class="shell-client"></div><div class="statusbar"><div></div></div>';
  return createWindow({ title: s[0], icon: s[1], width: 440, height: 300, content: body });
}
