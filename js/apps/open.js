// "Open" for files: picks the program by type (applications.md §3.8) and hosts file-level eggs (docs_and_files.md).
import { launch } from './index.js';
import { messageBox } from '../dialogs.js';
import * as fs from '../fileSystem.js';
import { flags, store, pushRecent } from '../state.js';
import { ding, chord, startup } from '../sound.js';

const TEXT = ['txt', 'doc', 'log', 'ini', 'sys', 'bat', 'csv', 'url'];
const err = (n, text) => messageBox({ title: n.name, icon: 'error', text });

export function openFile(n) {
  if (!n) return;
  if (n.egg === 'quietdll') return err(n, `Cannot open ${n.name}: access denied.`);
  if (n.egg === 'dll') return err(n, n.msg || 'Cannot open file.');
  if (n.egg === 'zip') return err(n, 'Cannot open file.\n\nThe archive is empty.\n\nThe archive has always been empty.');
  if (n.egg === 'tmp') return err(n, 'Cannot open file.\n\nThe file is incomplete.');
  if (n.egg === 'chair') return err(n, 'Cannot open file.\n\nThis is a PDF file.\n\nPDF files are not supported.\n\nPlease install Adobe Acrobat Reader 3.0.');
  if (n.egg === 'shred') return err(n, 'Cannot open file.\n\nThe file is corrupted.\n\nThe file is not corrupted.');
  if (n.egg === 'font') return messageBox({ title: n.name, icon: 'info', text: `${n.name.replace(/\.(fon|ttf)$/i, '')}\n\nThe quick brown fox jumps over the lazy dog.\n1234567890\n\nThe Quiet Room schedules the lazy dog.` });
  if (n.sound) { ({ startup, ding, chord })[n.sound](); return; }
  if (n.lnk && n.open) return openFile(fs.resolve(n.open));
  if (n.url) return launch('ie', { url: n.url });
  if (/^EIPSTEIN\.DOC$/i.test(n.name)) flags.eipRead = true;
  if (/^tommy\.jpg$/i.test(n.name)) flags.metTommy = true;
  if (n.egg === 'bhaiya2026') flags.b2026 = (flags.b2026 || 0) + 1;
  fs.emitOpen(n);
  if (n.parent) pushRecent(fs.pathOf(n));
  if (n.egg === 'mirc-exe' && !flags.mircUnlocked) return err(n, 'mIRC32 could not connect.\n\nThe room is not ready for you yet. Keep reading.');
  if (n.app) return launch(n.app, { node: n });
  if (n.egg === 'today-img') return todayImg(n);
  if (n.egg === 'judges') judgesNote(n);
  const e = fs.ext(n);
  if (e === 'pdf') return err(n, 'Cannot open file.\n\nThe file is corrupted.');
  if (e === 'xls') return launch('spreadsheet', { node: n });
  if (e === 'wav') return launch('mediaplayer', { node: n });
  if (n.image || e === 'jpg' || e === 'bmp' || e === 'png' || e === 'img') return launch('paint', { node: n });
  if (e === 'exe') return err(n, `${n.name} is not a valid Win32 application.`);
  if (e === 'dll') return err(n, 'Cannot open file.\n\nThis is a system file.\n\nIt is in use by Windows.');
  if (TEXT.includes(e) || n.src || n.content != null) return launch('notepad', { node: n });
  return messageBox({ title: 'Open With', icon: 'question', text: `There is no program registered to open '${n.name}'.\n\nAsk Bhaiya.` });
}

// F04: the judges' note counts its readers (per browser)
function judgesNote(n) {
  const k = store.get('judges', 0) + 1;
  store.set('judges', k);
  const suf = (k % 100 >= 11 && k % 100 <= 13) ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[k % 10] || 'th');
  n.content = `To the judge who opened this file,\r\n\r\nYou are not the first person to open this file today.\r\n\r\nYou are the ${k}${suf}.\r\n\r\nThe Quiet Room has been expecting you since 3:14 AM.\r\n\r\nThe chair is warm. The seat was always yours.\r\n\r\nYou do not need to do anything. You are already in\r\nthe room.\r\n\r\n— s00\r\n`;
}

// H03: today's Tuesday image. 0 KB until all five chat logs are read; then 1 KB; then warm.
function todayImg(n) {
  if (n.size > 0) return messageBox({ title: n.name, icon: 'info', text: 'The seat is warm.' });
  messageBox({ title: n.name, icon: 'error', text: 'Cannot open: file is 0 KB.' });
  if (!n.armed && flags.logsRead.size >= 5) { n.armed = true; setTimeout(() => { n.size = 1024; }, 10000); }
}
