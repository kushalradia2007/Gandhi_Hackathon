// "Open" for files: picks the program by type (applications.md §3.8) and hosts file-level eggs.
import { launch } from './index.js';
import { messageBox } from '../dialogs.js';
import * as fs from '../fileSystem.js';
import { flags, store, pushRecent, dmy } from '../state.js';

const TEXT = ['txt', 'doc', 'log', 'ini', 'sys', 'bat', 'csv', 'url'];

export function openFile(n) {
  if (!n) return;
  if (n.egg === 'quietdll') return messageBox({ title: n.name, icon: 'error', text: `Cannot open ${n.name}: access denied.` });
  fs.emitOpen(n);
  if (n.parent) pushRecent(fs.pathOf(n));
  if (n.egg === 'mirc-exe' && !flags.mircUnlocked) return messageBox({ title: 'MIRC32.EXE', icon: 'error', text: 'mIRC32 could not connect.\n\nThe room is not ready for you yet. Keep reading.' });
  if (n.app) return launch(n.app, { node: n });
  if (n.egg === 'today-img') return todayImg(n);
  if (n.egg === 'shred') return messageBox({ title: n.name, icon: 'error', text: 'Cannot open: file is corrupted.' });
  if (n.egg === 'judges') judgesNote(n);
  const e = fs.ext(n);
  if (e === 'pdf') return messageBox({ title: n.name, icon: 'error', text: 'Cannot open: file is corrupted.' });
  if (e === 'xls') return launch('spreadsheet', { node: n });
  if (e === 'wav') return launch('mediaplayer', { node: n });
  if (n.image || e === 'jpg' || e === 'bmp' || e === 'png') return launch('paint', { node: n });
  if (e === 'img') return launch('paint', { node: n });
  if (e === 'exe') return messageBox({ title: n.name, icon: 'error', text: `${n.name} is not a valid Win32 application.` });
  if (TEXT.includes(e) || n.src || n.content != null) return launch('notepad', { node: n });
  return messageBox({ title: 'Open With', icon: 'question', text: `There is no program registered to open '${n.name}'.\n\nAsk Bhaiya.` });
}

// F04: the judges' note counts its readers
function judgesNote(n) {
  const k = store.get('judges', 0) + 1;
  store.set('judges', k);
  const N = k + 6, suf = (N % 100 >= 11 && N % 100 <= 13) ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[N % 10] || 'th');
  const isDay = dmy() === '01/11/2026';
  n.content = isDay
    ? `You are not the first judge to open this file today.\r\nYou are the ${N}${suf}.\r\n\r\nThe Quiet Room has been expecting you.\r\n`
    : `There are no judges today.\r\n\r\nThis file was written for 1 November 2026.\r\nYou opened it anyway. You are the ${N}${suf}.\r\n`;
}

// H03: today's Tuesday image. 0 KB until all five chat logs are read; then 1 KB; then warm.
function todayImg(n) {
  if (n.size > 0) return messageBox({ title: n.name, icon: 'info', text: 'The seat is warm.' });
  messageBox({ title: n.name, icon: 'error', text: 'Cannot open: file is 0 KB.' });
  if (!n.armed && flags.logsRead.size >= 5) { n.armed = true; setTimeout(() => { n.size = 1024; }, 10000); }
}
