// Notepad: opens every .txt/.doc/.log/.ini in the system.
import { createWindow } from '../windowManager.js';
import { menuBar } from '../menu.js';
import { messageBox } from '../dialogs.js';
import { register, launch } from './index.js';
import * as fs from '../fileSystem.js';

function notepad(args = {}) {
  const node = args.node || (args.path ? fs.resolve(args.path) : null);
  const name = node ? node.name : 'Untitled';
  const body = document.createElement('div');
  body.className = 'notepad';
  body.innerHTML = '<div class="np-menu"></div><textarea class="np-text" wrap="off" spellcheck="false"></textarea>';
  const ta = body.querySelector('textarea');
  let wrap = false;
  const lockUntil = node && node.egg === 'player' ? Date.now() + 30000 : 0;
  const w = createWindow({ title: `${name} - Notepad`, icon: 'notepad', content: body, width: 560, height: 400, minWidth: 200, minHeight: 120, onClose: () => Date.now() >= lockUntil });
  if (lockUntil) setTimeout(() => { ta.value += '\r\n\r\n                                        Read it. - s00'; }, 3000);

  body.firstChild.appendChild(menuBar([
    { label: '&File', items: [
      { label: '&New', action: () => { ta.value = ''; w.setTitle('Untitled - Notepad'); } },
      { label: '&Open...', action: () => launch('mydocs') },
      { label: '&Save', action: () => { if (node) node.content = ta.value; } },
      { label: 'Save &As...', action: () => { if (node) node.content = ta.value; } },
      { sep: true },
      { label: 'Page Se&tup...' },
      { label: '&Print', action: () => launch('print', { node, source: 'notepad' }) },
      { sep: true },
      { label: 'E&xit', action: () => w.close() },
    ] },
    { label: '&Edit', items: () => [
      { label: '&Undo', shortcut: 'Ctrl+Z', action: () => document.execCommand('undo') },
      { sep: true },
      { label: 'Cu&t', shortcut: 'Ctrl+X', action: () => { ta.focus(); document.execCommand('cut'); } },
      { label: '&Copy', shortcut: 'Ctrl+C', action: () => { ta.focus(); document.execCommand('copy'); } },
      { label: '&Paste', shortcut: 'Ctrl+V' },
      { label: 'De&lete', shortcut: 'Del', action: () => { ta.focus(); document.execCommand('delete'); } },
      { sep: true },
      { label: 'Select &All', action: () => { ta.focus(); ta.select(); } },
      { label: 'Time/&Date', shortcut: 'F5', action: insertDate },
      { sep: true },
      { label: '&Word Wrap', checked: wrap, action: () => { wrap = !wrap; ta.setAttribute('wrap', wrap ? 'soft' : 'off'); ta.classList.toggle('wrap', wrap); } },
    ] },
    { label: '&Search', items: [{ label: '&Find...', action: find }, { label: 'Find &Next', shortcut: 'F3', action: find }] },
    { label: '&Help', items: [{ label: '&Help Topics', action: () => launch('help') }, { sep: true }, { label: '&About Notepad', action: about }] },
  ]));

  function insertDate() {
    const d = new Date();
    const s = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) + ' ' + d.toLocaleDateString('en-US');
    ta.setRangeText(s, ta.selectionStart, ta.selectionEnd, 'end');
  }
  function find() {
    messageBox({ title: 'Notepad', icon: 'info', text: 'Search is not available. Use your eyes.' });
  }
  function about() {
    messageBox({ title: 'About Notepad', icon: 'notepad', text: 'Microsoft (R) Notepad\nWindows 98\nCopyright (C) 1981-1998 Microsoft Corp.\n\nThis product is licensed to:\n   Bhaiya\n   Shree Cyber Zone\n\nPhysical memory available to Windows: 32,768 KB' });
  }
  ta.addEventListener('keydown', e => { if (e.key === 'F5') { e.preventDefault(); insertDate(); } });

  if (node) fs.readText(node).then(t => { ta.value = t; ta.setSelectionRange(0, 0); ta.scrollTop = 0; ta.focus(); });
  else ta.focus();
  return w;
}

register('notepad', notepad);
