// Entry point.
import { initScreen } from './screen.js';
import { installCursors, icon } from './icons.js';
import { initDesktop } from './desktop.js';
import { initTaskbar } from './taskbar.js';
import { initKeys } from './windowManager.js';
import { toggleStartMenu } from './startMenu.js';
import { boot } from './boot.js';
import { loadFS } from './fileSystem.js';
import { flags } from './state.js';
import './apps/explorer.js';
import './apps/notepad.js';
import './apps/sessionlog.js';
import './apps/cafe.js';
import './apps/printing.js';
import './apps/spreadsheet.js';
import './apps/mirc.js';
import './apps/paint.js';
import './apps/tools.js';
import './apps/endings.js';
import './apps/misc.js';
import { initEggs } from './eggs.js';

installCursors();
initScreen();
const fav = document.createElement('link');
fav.rel = 'icon';
fav.href = icon('flag', 16);
document.head.appendChild(fav);

initDesktop();
initTaskbar();
initKeys();
initEggs();
window.__logsRead = flags.logsRead.size;

// Windows key / Ctrl+Esc open the Start menu (Win key only reaches the page in fullscreen keyboard-lock)
let metaAlone = false;
document.addEventListener('keydown', e => {
  metaAlone = e.key === 'Meta';
  if (e.key === 'F1') e.preventDefault();
  if (e.ctrlKey && e.key === 'Escape') { e.preventDefault(); toggleStartMenu(true); }
});
document.addEventListener('keyup', e => {
  if (e.key === 'Meta' && metaAlone && !document.getElementById('screen').classList.contains('booting')) toggleStartMenu(true);
});
// The browser's own context menu never appears; Win98 menus are opened by their own handlers.
document.addEventListener('contextmenu', e => e.preventDefault());

loadFS().catch(e => console.error('filesystem.json failed to load', e));
boot();
