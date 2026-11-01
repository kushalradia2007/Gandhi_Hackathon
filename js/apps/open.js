// "Open" for files: picks the program by extension, plus file-level easter eggs.
import { launch } from './index.js';
import { messageBox } from '../dialogs.js';
import * as fs from '../fileSystem.js';

const TEXT = ['txt', 'doc', 'log', 'ini', 'sys', 'bat', 'csv'];

export function openFile(n) {
  fs.emitOpen(n);
  if (n.app) return launch(n.app);
  if (n.egg === 'today-img') return todayImg(n);
  const e = fs.ext(n);
  if (e === 'xls') return launch('spreadsheet', { node: n }) || launch('notepad', { node: n });
  if (n.image || e === 'jpg' || e === 'bmp') return launch('paint', { node: n });
  if (e === 'img') return messageBox({ title: n.name, icon: 'error', text: `Cannot open ${n.name}.\n\nThe file is in use by another user (PC 03).` });
  if (TEXT.includes(e) || n.src) return launch('notepad', { node: n });
  return messageBox({ title: 'Open With', icon: 'question', text: `There is no program registered to open '${n.name}'.\n\nAsk Bhaiya.` });
}

// Easter egg 7: today's Tuesday image. 0 KB, then 1 KB, then never again.
function todayImg(n) {
  if (n.size > 0) return messageBox({ title: n.name, icon: 'error', text: `Cannot open ${n.name}.\n\nAccess is denied.\nThe file is being written by PC 03.` });
  messageBox({ title: n.name, icon: 'error', text: `Cannot open ${n.name}: file is 0 KB.` });
  if (!n.armed) { n.armed = true; setTimeout(() => { n.size = 1024; n.date = n.date.replace('12:00 AM', new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })); }, 10000); }
}
