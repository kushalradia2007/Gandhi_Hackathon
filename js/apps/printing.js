// Printer Queue, Print dialog, the print-jam trap (G03), real print (G01), cancel slip (G02), queue properties (G05).
import { createWindow } from '../windowManager.js';
import { menuBar, openMenu } from '../menu.js';
import { messageBox } from '../dialogs.js';
import { icon } from '../icons.js';
import { register, launch } from './index.js';
import { addIcon } from '../desktop.js';
import * as fs from '../fileSystem.js';
import { printWhir, jam } from '../sound.js';
import { PICS } from '../pictures.js';
import { flags, glitch, setWallpaper, wait, addLogRow, store } from './shared.js';

const DEFAULT_QUEUE = () => [
  { doc: 'LEDGER_98.XLS', status: 'WAITING', owner: 'PROPRIETOR', pages: 4, submitted: '03/03/1998 03:14 AM' },
  { doc: 'do_not_shred.pdf', status: 'WAITING', owner: '\u2014', pages: 12, submitted: '29/12/1998 11:58 PM' },
  { doc: 'final_final.doc', status: 'WAITING', owner: '\u2014', pages: 1, submitted: '29/12/1998 11:57 PM' },
  { doc: 'rates_1998.doc', status: 'PAUSED', owner: 'PROPRIETOR', pages: 2, submitted: '03/03/1998 10:00 AM' },
];
let queue = DEFAULT_QUEUE(), win = null, sel = -1;

function render() {
  if (!win || win.closed) return;
  win.body.querySelector('tbody').innerHTML = queue.map((j, i) => `<tr data-i="${i}" class="${i === sel ? 'sel' : ''}${/JAM/i.test(j.status) ? ' hot' : ''}"><td><img src="${icon(fs.iconFor({ name: j.doc, type: 'file' }), 16)}" width="16" height="16" alt="" style="vertical-align:-4px;margin-right:4px">${j.doc}</td><td>${j.status}</td><td>${j.owner}</td><td>${j.pages}</td><td>${j.submitted}</td></tr>`).join('');
  win.body.querySelector('.sb').textContent = `${queue.length} document(s) in queue \u00b7 HP LaserJet 6L: ${queue.some(j => /PRINTING/.test(j.status)) ? 'printing' : queue.some(j => /JAM/i.test(j.status)) ? 'paper jam' : 'idle'}`;
}
function props(j) {
  messageBox({ title: `${j.doc} Properties`, icon: 'printer', text: `Title:       ${j.doc}\nOwner:      PROPRIETOR\nLocation:   \u2014\nPages:      ${j.pages}\nSubmitted: ${j.submitted}\nPrinted:    never\n\nStatus:     WAITING FOR SOMEONE` });
}
async function cancelJob(i) {
  const j = queue[i]; if (!j) return;
  const r = await messageBox({ title: 'Printer Queue', icon: 'question', text: `Cancel printing of ${j.doc}?`, buttons: ['&Yes', '&No'] });
  if (r !== 0) return;
  queue.splice(i, 1); sel = -1; render();
  if (j.doc === 'LEDGER_98.XLS') setTimeout(() => { if (!queue.some(q => q.doc === j.doc)) { queue.unshift({ ...j, status: 'WAITING', owner: 'PROPRIETOR' }); render(); } }, 10000);
}

register('printq', () => {
  if (win && !win.closed) { win.focus(); return win; }
  const body = document.createElement('div');
  body.className = 'app-col';
  body.innerHTML = `<div class="pq-head">SHREE CYBER ZONE \u2014 HP LaserJet 6L (Local)</div><div class="lv"><table class="grid"><thead><tr><th>Document</th><th>Status</th><th>Owner</th><th>Pages</th><th>Submitted</th></tr></thead><tbody></tbody></table></div><div class="statusbar"><div class="sb"></div></div>`;
  body.prepend(menuBar([
    { label: '&Printer', items: [{ label: '&Pause Printing' }, { label: 'Set As De&fault', checked: true }, { label: 'P&urge Print Documents', action: () => { queue = []; sel = -1; render(); } }, { sep: true }, { label: 'P&roperties', action: () => messageBox({ title: 'HP LaserJet 6L Properties', icon: 'printer', text: 'Port: LPT1:\nDriver: HP LaserJet 6L\nPaper: A4 (whatever is left)\nToner: 3%\n\nThis printer remembers.' }) }, { sep: true }, { label: '&Close', action: () => win.close() }] },
    { label: '&Document', items: () => [{ label: '&Pause Printing', disabled: sel < 0, action: () => { const j = queue[sel]; j.status = j.status === 'PAUSED' ? 'WAITING' : 'PAUSED'; render(); } }, { label: '&Cancel Printing', disabled: sel < 0, action: () => cancelJob(sel) }, { sep: true }, { label: 'P&roperties', disabled: sel < 0, action: () => props(queue[sel]) }] },
    { label: '&View', items: [{ label: '&Status Bar', checked: true }, { label: '&Refresh', shortcut: 'F5', action: () => { queue = DEFAULT_QUEUE().concat(queue.filter(q => !DEFAULT_QUEUE().some(d => d.doc === q.doc))); render(); } }] },
    { label: '&Help', items: [{ label: '&Help Topics', action: () => launch('help') }] },
  ]));
  win = createWindow({ title: 'HP LaserJet 6L', icon: 'printer', content: body, width: 560, height: 260 });
  const lv = body.querySelector('.lv');
  lv.addEventListener('pointerdown', e => { const tr = e.target.closest('tbody tr'); sel = tr ? +tr.dataset.i : -1; render(); });
  lv.addEventListener('contextmenu', e => {
    e.preventDefault();
    const tr = e.target.closest('tbody tr'); if (!tr) return;
    sel = +tr.dataset.i; render();
    const j = queue[sel];
    openMenu([{ label: '&Pause Printing', action: () => { j.status = j.status === 'PAUSED' ? 'WAITING' : 'PAUSED'; render(); } }, { label: '&Cancel Printing', action: () => cancelJob(sel) }, ...(j.doc === 'LEDGER_98.XLS' ? [{ label: 'P&rint Now', action: realPrintLedger }] : []), { sep: true }, { label: 'P&roperties', action: () => props(j) }], e.clientX, e.clientY);
  });
  render();
  return win;
});
register('printers', () => launch('printq'));

/**
 * Win98 Print dialog.
 * opts: { doc, trap: bool (PC 12 bill), real: fn (G01 real print), onPrint }
 */
export function printDialog(opts) {
  const body = document.createElement('div');
  body.className = 'printdlg';
  body.innerHTML = `
    <fieldset><legend>Printer</legend>
      <div class="field"><label><u>N</u>ame:</label><input type="text" value="HP LaserJet 6L" readonly><button class="pd-props">P<u>r</u>operties</button></div>
      <div class="pd-row"><span>Status:</span><span class="pd-status">Default printer; Ready</span></div>
      <div class="pd-row"><span>Type:</span><span>HP LaserJet 6L</span></div>
      <div class="pd-row"><span>Where:</span><span>LPT1:</span></div>
      <div class="pd-row"><span>Comment:</span><span><img class="pd-ico" src="${icon('printer', 32)}" width="32" height="32" alt=""></span></div>
    </fieldset>
    <div class="pd-split"><fieldset><legend>Print range</legend><label class="radio"><input type="radio" name="pr" checked> <u>A</u>ll</label><label class="radio"><input type="radio" name="pr" disabled> Pa<u>g</u>es</label></fieldset>
      <fieldset><legend>Copies</legend><div class="field"><label>Number of <u>c</u>opies:</label><input type="text" value="1" style="width:40px;flex:none"></div></fieldset></div>
    <div class="dlg-btns" style="justify-content:flex-end"><button class="default">OK</button><button>Cancel</button></div>`;
  const w = createWindow({ title: 'Print', content: body, modal: true, noIcon: true, help: true, resizable: false, taskbar: false, className: 'dialog' });
  const [ok, cancel] = body.querySelectorAll('.dlg-btns button');
  body.querySelector('.pd-props').onclick = () => messageBox({ title: 'HP LaserJet 6L Properties', icon: 'printer', text: 'Paper size: A4\nOrientation: Portrait\nThe printer has no other properties it wishes to share.' });
  cancel.onclick = () => { w.close(); cancelSlip(); };
  ok.onclick = async () => {
    if (opts.real) { w.close(); opts.real(); return; }
    ok.disabled = cancel.disabled = true;
    const st = body.querySelector('.pd-status'), ico = body.querySelector('.pd-ico');
    st.textContent = 'Printing...'; printWhir();
    const spin = setInterval(() => ico.classList.toggle('spin'), 120);
    await wait(2000);
    clearInterval(spin); ico.classList.remove('spin');
    if (!opts.trap) { st.textContent = 'Done'; await wait(400); w.close(); addLogRow({ dur: 'PRINTED: ' + opts.doc }); return; }
    st.textContent = 'Paper jam.'; jam();
    await wait(1000);
    w.close();
    printTrap(opts.doc);
  };
  ok.focus();
  return w;
}

async function printTrap(doc) {
  queue.push({ doc, status: 'PAPER JAM', owner: 'GUEST', pages: 1, submitted: new Date().toLocaleString('en-GB') });
  render();
  if (flags.trapDone) { messageBox({ title: 'HP LaserJet 6L', icon: 'error', text: 'Paper jam.\n\nOpen the printer cover and remove the jammed paper.' }); return; }
  flags.trapDone = true;
  await glitch(300);
  setWallpaper(PICS.night(), 5000);
  if (!document.querySelector('.icon[data-id="proprietor"]')) addIcon({ id: 'proprietor', label: 'PROPRIETOR', icon: 'key' });
  store.set('proprietor', true);
  addLogRow({ cust: 'PROPRIETOR', dur: 'PRINT JOB RECEIVED: ' + doc });
}

// G02: cancelling any print leaves a slip
export function cancelSlip() {
  const docs = fs.resolve('C:\\My Documents');
  if (!docs || docs.children.some(c => c.name === 'cancel_slip.txt')) return;
  docs.children.push({ name: 'cancel_slip.txt', type: 'file', size: 96, date: new Date().toLocaleDateString('en-US') + ' ' + new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }), parent: docs, content: 'Print cancelled.\r\nThis cancellation has been logged.\r\n\r\n\u2014 s00\r\n' });
  addLogRow({ dur: 'PRINT CANCELLED (logged)' });
}

// G01: real browser print of the Ledger. Cancel in the real dialog cannot be detected, so we leave the slip either way after a short delay.
export function realPrintLedger(rows) {
  const data = rows || (flags.ledger && flags.ledger.rows) || null;
  const sheet = document.getElementById('print-sheet') || Object.assign(document.createElement('div'), { id: 'print-sheet' });
  const r = data || [['SEAT', 'NAME', 'ASSET', 'STATUS']];
  sheet.innerHTML = `<h1>LEDGER_98.XLS</h1><p>SHREE CYBER ZONE \u2014 PC 03 (ADMIN) \u2014 printed ${new Date().toLocaleString('en-GB')} by GUEST</p><table>${r.map((row, i) => `<tr>${row.map(c => i ? `<td>${c}</td>` : `<th>${c}</th>`).join('')}</tr>`).join('')}</table><p class="foot">Owner: PROPRIETOR \u00b7 This printout has been logged. \u2014 s00</p>`;
  document.body.appendChild(sheet);
  addLogRow({ dur: 'PRINTED: LEDGER_98.XLS (physical)' });
  setTimeout(() => window.print(), 50);
}
