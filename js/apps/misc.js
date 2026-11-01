// Windows Help (B04), Volume Control (mute), Network (E02), Close Program (Ctrl+Alt+Del), MS-DOS Prompt (B01).
import { createWindow, list as winList, close as closeWin } from '../windowManager.js';
import { menuBar } from '../menu.js';
import { messageBox } from '../dialogs.js';
import { icon } from '../icons.js';
import { register, launch } from './index.js';
import { isMuted, setMuted, isAmbience, setAmbience, initAudio } from '../sound.js';

register('help', () => {
  const body = document.createElement('div');
  body.className = 'app-col';
  body.innerHTML = `<div class="help-bar"><button class="tbtn">Hide</button><button class="tbtn" disabled>Back</button><button class="tbtn">Options</button></div>
    <div class="help"><div class="help-toc"><div class="help-tabs"><span class="tab on">Contents</span><span class="tab">Index</span><span class="tab">Search</span></div>
    <div class="help-tree"><div class="ht"><img src="${icon('help', 16)}" width="16" height="16" alt=""> What to do if you were never here.</div></div></div>
    <div class="help-body"><p><b>Welcome to Windows 98 Help</b></p><p>Click a topic on the left.</p></div></div>`;
  const w = createWindow({ title: 'Windows Help', icon: 'help', content: body, width: 560, height: 340 });
  // clicking the topic does nothing. It was never going to.
  body.querySelector('.ht').addEventListener('click', e => { e.currentTarget.classList.add('sel'); });
  return w;
});

register('volume', () => {
  const body = document.createElement('div');
  body.className = 'volume';
  const col = n => `<div class="vcol"><b>${n}</b><span>Balance:</span><input type="range" disabled value="50"><span>Volume:</span><input type="range" class="vert" disabled value="70"></div>`;
  body.innerHTML = `<div class="vcols">${col('Volume Control')}${col('Wave')}${col('MIDI')}${col('CD Audio')}${col('Line-In')}</div>
    <p class="vnote">No audio device detected.</p>
    <label><input type="checkbox" class="v-mute"${isMuted() ? ' checked' : ''}> <u>M</u>ute all</label>
    <label><input type="checkbox" class="v-amb"${isAmbience() ? ' checked' : ''}> Café <u>a</u>mbience (fan, tube TV)</label>
    <div class="statusbar"><div>SB16 Compatible — disconnected 1998</div></div>`;
  const w = createWindow({ title: 'Volume Control', icon: 'speaker', content: body, resizable: false });
  w.body.prepend(menuBar([{ label: '&Options', items: [{ label: '&Properties' }, { label: '&Advanced Controls' }, { sep: true }, { label: 'E&xit', action: () => w.close() }] }, { label: '&Help', items: [{ label: '&About Volume Control', action: () => messageBox({ title: 'Volume Control', icon: 'speaker', text: 'Volume Control\nWindows 98\n\nThe speakers were disconnected in 1998.\nThey still work.' }) }] }]));
  body.querySelector('.v-mute').onchange = e => setMuted(e.target.checked);
  body.querySelector('.v-amb').onchange = e => { initAudio(); setAmbience(e.target.checked); };
  return w;
});

register('network', () => messageBox({ title: 'Network', icon: 'computer', text: 'Connected to: SHREE_CYBER_ZONE\nComputers connected: 12\nUnknown devices: 1\nLast unknown device seen: 1998' }));

register('closeprogram', () => {
  const body = document.createElement('div');
  body.className = 'msgbox closeprog';
  const apps = winList().filter(w => w.taskbar);
  const names = ['Explorer', 'Systray', ...apps.map(w => w.title)];
  body.innerHTML = `<div class="lv cp-list">${names.map((n, i) => `<div class="li${i === 0 ? ' sel' : ''}" data-i="${i}">${n}</div>`).join('')}</div>
    <p style="margin:10px 0">WARNING: Pressing CTRL+ALT+DEL again will restart your computer. You will lose unsaved information in all programs that are running.</p>
    <div class="dlg-btns center"><button class="default">&nbsp;&nbsp;<u>E</u>nd Task&nbsp;&nbsp;</button><button><u>S</u>hut Down</button><button>Cancel</button></div>`;
  const w = createWindow({ title: 'Close Program', content: body, modal: true, noIcon: true, help: true, resizable: false, taskbar: false, className: 'dialog' });
  let sel = 0;
  body.querySelector('.cp-list').addEventListener('pointerdown', e => { const li = e.target.closest('.li'); if (!li) return; sel = +li.dataset.i; body.querySelectorAll('.li').forEach(x => x.classList.toggle('sel', x === li)); });
  const [end, sd, cancel] = body.querySelectorAll('.dlg-btns button');
  end.onclick = () => { w.close(); if (sel >= 2) closeWin(apps[sel - 2]); else messageBox({ title: names[sel], icon: 'error', text: 'This program is not responding.\n\nIt has never responded. It is still running.' }); };
  sd.onclick = () => { w.close(); launch('shutdown'); };
  cancel.onclick = () => w.close();
  end.focus();
  return w;
});

// B01: Run > cmd / MS-DOS Prompt
function dosPrompt(denyAll) {
  const body = document.createElement('div');
  body.className = 'dosbox';
  body.innerHTML = '<pre></pre><input class="dos-in" spellcheck="false" autocomplete="off">';
  const pre = body.querySelector('pre'), inp = body.querySelector('input');
  pre.textContent = 'Microsoft(R) Windows 98\n   (C)Copyright Microsoft Corp 1981-1999.\n\nC:\\WINDOWS>';
  const w = createWindow({ title: 'MS-DOS Prompt', icon: 'msdos', content: body, width: 560, height: 320, className: 'doswin' });
  inp.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const c = inp.value.trim(); inp.value = '';
    pre.textContent += c + '\n';
    if (/^exit$/i.test(c)) { w.close(); return; }
    if (c) pre.textContent += denyAll ? 'Access denied. The Quiet Room does not use commands.\n' : /^(dir|ver|cls|cd)/i.test(c) ? 'Access denied. The Quiet Room does not use commands.\n' : 'Bad command or file name\n';
    pre.textContent += '\nC:\\WINDOWS>';
    body.scrollTop = body.scrollHeight;
  });
  body.addEventListener('pointerdown', () => setTimeout(() => inp.focus(), 0));
  inp.focus();
  return w;
}
register('msdos', () => dosPrompt(true));
register('cmd', () => dosPrompt(true));
