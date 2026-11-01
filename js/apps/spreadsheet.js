// Spreadsheet (90s Excel look) for .XLS files. LEDGER_98.XLS lives (H01), prints for real (G01) and survives shredding (SHRED).
import { createWindow } from '../windowManager.js';
import { menuBar } from '../menu.js';
import { messageBox } from '../dialogs.js';
import { register } from './index.js';
import * as fs from '../fileSystem.js';
import { realPrintLedger, printDialog } from './printing.js';
import { flags, city, SESSION_ID, wait, dmy } from './shared.js';

const COLS = 'ABCDEFGHIJ';
const parseCSV = t => t.trim().split(/\r?\n/).map(r => r.split(','));
const WIDTH = [70, 110, 110, 120, 80, 90, 90, 90, 80, 80];

function sheet(node) {
  const isLedger = /^LEDGER_98\.XLS$/i.test(node.name);
  const isCal = /GAMING_CALENDAR/i.test(node.name);
  const body = document.createElement('div');
  body.className = 'app-col xlsapp';
  body.innerHTML = `
    <div class="xls-bar"><input class="xls-ref" value="A1" readonly><span class="xls-fx">=</span><input class="xls-formula" readonly></div>
    <div class="lv xls-wrap" tabindex="0"></div>
    <div class="xls-tabs"><span class="tab on">Sheet1</span><span class="tab">Sheet2</span><span class="tab">Sheet3</span></div>
    <div class="statusbar"><div class="sb">Ready</div><div style="flex:0 0 60px">NUM</div></div>`;
  const wrap = body.querySelector('.xls-wrap'), ref = body.querySelector('.xls-ref'), fx = body.querySelector('.xls-formula');
  let rows = [], cur = [0, 0], flash = new Set(), timers = [];
  const w = createWindow({
    title: `Microsoft Excel - ${node.name}`, icon: 'xlsfile', content: body, width: 640, height: 380, minWidth: 300,
    onClose: () => { timers.forEach(clearTimeout); timers.forEach(clearInterval); if (flags.ledger && flags.ledger.w === w) flags.ledger = null; },
  });

  body.prepend(menuBar([
    { label: '&File', items: [{ label: '&Open...', action: () => import('./index.js').then(m => m.launch('mydocs')) }, { sep: true }, { label: 'Page Set&up...' }, { label: '&Print...', shortcut: 'Ctrl+P', action: doPrint }, { sep: true }, { label: 'E&xit', action: () => w.close() }] },
    { label: '&Edit', items: [{ label: '&Undo', disabled: true }, { sep: true }, { label: '&Copy', shortcut: 'Ctrl+C' }, { label: '&Paste', disabled: true }, { sep: true }, { label: '&Find...', action: () => messageBox({ title: 'Microsoft Excel', icon: 'info', text: 'Everything you are looking for is already on the sheet.' }) }] },
    { label: '&View', items: [{ label: '&Formula Bar', checked: true }, { label: '&Status Bar', checked: true }] },
    { label: '&Insert', items: [{ label: '&Rows', disabled: true }, { label: '&Columns', disabled: true }] },
    { label: 'F&ormat', items: [{ label: '&Cells...', disabled: true }] },
    { label: '&Tools', items: [{ label: '&Protection', submenu: [{ label: 'Protect Sheet...', checked: true, disabled: true }] }] },
    { label: '&Help', items: [{ label: '&About Microsoft Excel', action: () => messageBox({ title: 'About Microsoft Excel', icon: 'xlsfile', text: 'Microsoft Excel 97 SR-2\nLicensed to: GUEST\n\nThis workbook is read-only.\nNo formulas needed. The numbers are already decided.' }) }] },
  ]));

  function cellText(v, c) {
    if (v == null) return '';
    if (/^\d{7,}$/.test(v) && WIDTH[c] < 90) return '#####';
    return v;
  }
  function draw() {
    const nCols = Math.max(4, ...rows.map(r => r.length));
    const nRows = Math.max(rows.length + 8, 24);
    let h = `<table class="grid xls"><tr><th class="corner"></th>${Array.from({ length: nCols }, (_, c) => `<th style="width:${WIDTH[c] || 80}px">${COLS[c]}</th>`).join('')}</tr>`;
    for (let r = 0; r < nRows; r++) {
      h += `<tr><th>${r + 1}</th>`;
      for (let c = 0; c < nCols; c++) {
        const v = rows[r] ? rows[r][c] : '';
        const status = r > 0 && rows[0] && /STATUS/i.test(rows[0][c] || '');
        const cls = [r === 0 && rows[0] ? 'hdr' : '', status && /PENDING|VACANT|NEUTRALIZED|EVALUATING|REDACTED|CANDIDATE/.test(v || '') ? 'red' : '', cur[0] === r && cur[1] === c ? 'cur' : '', flash.has(r) ? 'flash' : ''].join(' ');
        h += `<td class="${cls}" data-r="${r}" data-c="${c}">${cellText(v, c)}</td>`;
      }
      h += '</tr>';
    }
    wrap.innerHTML = h + '</table>';
    ref.value = COLS[cur[1]] + (cur[0] + 1);
    fx.value = (rows[cur[0]] || [])[cur[1]] || '';
  }
  wrap.addEventListener('pointerdown', e => { const td = e.target.closest('td'); if (td) { cur = [+td.dataset.r, +td.dataset.c]; draw(); } });
  wrap.addEventListener('keydown', e => {
    const d = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] }[e.key];
    if (d) { e.preventDefault(); cur = [Math.max(0, cur[0] + d[0]), Math.max(0, Math.min(9, cur[1] + d[1]))]; draw(); return; }
    if (e.ctrlKey && (e.key === 'p' || e.key === 'P')) { e.preventDefault(); doPrint(); return; }
    if (e.key.length === 1 && !e.ctrlKey) messageBox({ title: 'Microsoft Excel', icon: 'warning', text: 'The cell or chart you are trying to change is protected and therefore read-only.' });
  });
  const mark = r => { flash.add(r); draw(); timers.push(setTimeout(() => { flash.delete(r); draw(); }, 900)); };

  function doPrint() {
    if (isLedger) printDialog({ doc: node.name, real: () => realPrintLedger(rows) });
    else printDialog({ doc: node.name });
  }

  // H01: the Ledger edits itself while you watch
  function live() {
    const S = rows[0].findIndex(h => /STATUS/i.test(h));
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    const findRow = (re, from = 1) => rows.findIndex((r, i) => i >= from && re.test(r[S] || ''));
    at(30000, () => { const i = rows.findIndex(r => r[0] === 'SEAT_04'); if (i > 0) { rows[i][S] = 'PENDING'; mark(i); } });
    at(60000, () => { const i = findRow(/^PENDING$/); if (i > 0) { rows[i][S] = 'VACANT'; mark(i); } });
    at(90000, () => { rows.push(['—', 'GUEST', '—', 'EVALUATING']); mark(rows.length - 1); });
    at(120000, () => timers.push(setInterval(() => { const i = findRow(/^ACTIVE$/, 2); if (i > 0) { rows[i][S] = 'PENDING'; mark(i); } }, 30000)));
  }

  fs.readText(node).then(t => {
    rows = parseCSV(t || 'A\n');
    if (isCal) rows.push([dmy(), '?', '?', '?', 'You are almost there.']);
    draw();
    if (isLedger) live();
    wrap.focus();
  });

  if (isLedger) {
    flags.ledger = {
      w, get rows() { return rows; },
      // SHRED ending
      async shred() {
        const keep = rows.map(r => r.slice());
        for (let i = rows.length - 1; i > 0; i--) { rows[i] = rows[i].map(() => ''); draw(); await wait(60); }
        rows = [rows[0]]; draw();
        await wait(500);
        const S = keep[0].findIndex(h => /STATUS/i.test(h));
        rows = keep.map((r, i) => (i && S >= 0 ? Object.assign(r.slice(), { [S]: 'ACTIVE' }) : r));
        if (rows[0].length < 5) rows[0] = [...rows[0], 'SESSION'];
        rows.push(['SEAT_07', city(), 'GUEST', 'ACTIVE', SESSION_ID]);
        draw(); mark(rows.length - 1);
        await messageBox({ title: 'LEDGER_98.XLS', icon: 'warning', text: 'You tried to empty it. It emptied you back.' });
      },
    };
  }
  return w;
}

register('spreadsheet', (a = {}) => (a.node ? sheet(a.node) : null));
