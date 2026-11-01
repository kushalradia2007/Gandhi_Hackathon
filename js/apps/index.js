// App registry. Real apps call register(); anything not yet built opens an empty shell.
import { createWindow } from '../windowManager.js';
import { messageBox } from '../dialogs.js';

const registry = {};
export function register(id, fn) { registry[id] = fn; }

// Fallback shells for apps provided by other modules (ie, games, settings) if those fail to load.
const SHELLS = {
  ie: ['SHREE CYBER ZONE Homepage - Microsoft Internet Explorer', 'ie'],
  minesweeper: ['Minesweeper', 'mine'],
  solitaire: ['Solitaire', 'cards'],
};
// Control Panel items that live in settings modules
const SETTINGS = ['controlpanel', 'display', 'datetime', 'folderoptions', 'taskbarprops', 'sysprops', 'dialup'];

// Programs that are no longer on this machine.
const MISSING = {
  wordpad: 'C:\\Program Files\\Accessories\\WORDPAD.EXE',
  outlook: 'C:\\Program Files\\Outlook Express\\MSIMN.EXE',
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
  if (SETTINGS.includes(id)) return messageBox({ title: 'Control Panel', icon: 'settings', text: 'This item is not available on PC 03.' });
  const s = SHELLS[id];
  if (!s) return null;
  const body = document.createElement('div');
  body.className = 'shell';
  body.innerHTML = '<div class="shell-client"></div><div class="statusbar"><div></div></div>';
  return createWindow({ title: s[0], icon: s[1], width: 440, height: 300, content: body });
}
