// FreeCell (games.md section 6): the board is laid out, the deal is #11982, and it has always been #11982.
import { createWindow } from '../../windowManager.js';
import { menuBar } from '../../menu.js';
import { messageBox } from '../../dialogs.js';
import { register, launch } from '../index.js';
import { onRun } from '../../startMenu.js';
import { setTitleIcon, el, dialog, sprite, ICON_CARDS } from './common.js';

const DEAL = 11982;

register('freecell', () => {
  const slots = n => '<div class="fc-slot"></div>'.repeat(n);
  const body = el(`<div class="app-col"><div class="fc-table">
      <div class="fc-top"><div class="fc-cells">${slots(4)}</div><div class="fc-king"></div><div class="fc-cells">${slots(4)}</div></div>
      <div class="fc-labels"><span>Free cells</span><span>Foundations</span></div>
      <div class="fc-tab">${'<div class="fc-col"><div class="fc-slot"></div></div>'.repeat(8)}</div>
    </div><div class="statusbar"><div></div><div style="flex:0 0 140px">Cards Left: 52</div></div></div>`);
  drawKing(body.querySelector('.fc-king'));

  const cannotStart = () => messageBox({ title: 'FreeCell', icon: 'info', text: `Cannot start a new game.\n\nThe deal is still #${DEAL}.\n\nIt has always been #${DEAL}.` });
  function gameDlg() {
    const b = el(`<div class="msgbox fc-dlg"><div class="field"><label>Game #:</label><input type="text" value="${DEAL}" style="width:70px;flex:none"><button style="margin-left:10px">New Game</button></div><p style="margin:14px 0 4px">FreeCell is not available.</p><p style="margin-bottom:14px">The deal cannot be solved.</p><div class="dlg-btns center"><button class="default">OK</button></div></div>`);
    const d = dialog('FreeCell', b);
    const inp = b.querySelector('input');
    const [newBtn, ok] = b.querySelectorAll('button');
    newBtn.onclick = () => { inp.value = String(DEAL); cannotStart(); };
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') newBtn.onclick(); });
    inp.addEventListener('blur', () => { inp.value = String(DEAL); });
    ok.onclick = () => d.close();
    ok.focus();
    return d;
  }

  body.prepend(menuBar([
    { label: '&Game', items: [
      { label: '&New Game', shortcut: 'F2', action: cannotStart },
      { label: '&Select Game...', shortcut: 'F3', action: gameDlg },
      { label: '&Restart Game', disabled: true },
      { sep: true },
      { label: 'S&tatistics...', shortcut: 'F4', action: () => messageBox({ title: 'FreeCell Statistics', icon: 'info', text: `This session:\n   won 0, lost 0\n\nTotal:\n   won 0, lost 10,224\n\nStreaks:\n   Current: 10,224 losses (game #${DEAL})` }) },
      { label: '&Options...', shortcut: 'F5', disabled: true },
      { sep: true },
      { label: '&Undo', shortcut: 'F10', disabled: true },
      { sep: true },
      { label: 'E&xit', action: () => w.close() },
    ] },
    { label: '&Help', items: [
      { label: '&Contents', shortcut: 'F1', action: () => launch('help') },
      { sep: true },
      { label: '&About FreeCell...', action: () => messageBox({ title: 'About FreeCell', icon: 'info', text: `FreeCell\n\nCopyright (C) 1981-1998 Microsoft Corp.\n\nEvery deal can be solved except one.\nThis machine kept that one.` }) },
    ] },
  ]));

  const w = createWindow({ title: `FreeCell Game #${DEAL}`, icon: 'app', content: body, width: 640, height: 440, minWidth: 400, minHeight: 300 });
  setTitleIcon(w, ICON_CARDS());
  gameDlg();
  return w;
});

/** The little FreeCell king between the cells (24x18, drawn at 2x). */
function drawKing(host) {
  const rows = [
    '.........y.y.y..........',
    '.........yyyyy..........',
    '.........yyyyy..........',
    '........kkkkkkk.........',
    '.......kwwwwwwwk........',
    '.......kwkwwwwwk........',
    '.......kwwwwwwwk........',
    '.......kwwkkwwwk........',
    '........kwwwwwk.........',
    '.....rrrrkkkkkrrrr......',
    '....rrrrrryyyrrrrrr.....',
    '....rrrrrryyyrrrrrr.....',
    '....rrrrrryyyrrrrrr.....',
    '....rrrrrryyyrrrrrr.....',
    '....nnnnnnnnnnnnnnn.....',
    '....nnnnnnnnnnnnnnn.....',
    '.....nnnn.....nnnn......',
    '.....kkkk.....kkkk......',
  ];
  const c = sprite(rows, {}, 24, 18);
  c.className = 'fc-king-img';
  host.appendChild(c);
}

onRun(key => { if (key === 'freecell' || key === 'freecell.exe') { launch('freecell'); return true; } return false; });
