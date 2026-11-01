// Paint (viewer): toolbox, palette, read-only canvas. SEATS.BMP changes after 30 s (H02). Tuesdays IMGs (H09/H10).
import { createWindow } from '../windowManager.js';
import { menuBar } from '../menu.js';
import { messageBox } from '../dialogs.js';
import { register, launch } from './index.js';
import { PICS } from '../pictures.js';
import { setWallpaper } from './shared.js';

const TOOLS = ['Free-Form Select', 'Select', 'Eraser/Color Eraser', 'Fill With Color', 'Pick Color', 'Magnifier', 'Pencil', 'Brush', 'Airbrush', 'Text', 'Line', 'Curve', 'Rectangle', 'Polygon', 'Ellipse', 'Rounded Rectangle'];
const PALETTE = ['#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080', '#808040', '#004040', '#0080ff', '#004080', '#8000ff', '#804000',
  '#ffffff', '#c0c0c0', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ffff80', '#00ff80', '#80ffff', '#8080ff', '#ff0080', '#ff8040'];

// 16x16 tool glyphs drawn with tiny canvases
function toolGlyph(i) {
  const c = document.createElement('canvas'); c.width = c.height = 16; const x = c.getContext('2d');
  x.fillStyle = '#000'; x.strokeStyle = '#000';
  const r = (a, b, w, h, col = '#000') => { x.fillStyle = col; x.fillRect(a, b, w, h); };
  switch (i) {
    case 0: for (let k = 0; k < 12; k += 2) { r(2 + k, 3, 1, 1); r(2 + k, 12, 1, 1); } r(2, 3, 1, 10); r(13, 3, 1, 10); break;
    case 1: for (let k = 0; k < 12; k += 2) { r(2 + k, 2, 1, 1); r(2 + k, 13, 1, 1); r(2, 2 + k, 1, 1); r(13, 2 + k, 1, 1); } break;
    case 2: r(3, 6, 9, 6, '#ff80ff'); r(3, 6, 9, 1); r(3, 11, 9, 1); r(3, 6, 1, 6); r(11, 6, 1, 6); break;
    case 3: r(4, 5, 7, 7, '#c0c0c0'); r(4, 5, 7, 1); r(4, 11, 7, 1); r(4, 5, 1, 7); r(10, 5, 1, 7); r(11, 8, 3, 5, '#0000ff'); break;
    case 4: r(9, 2, 4, 4); r(4, 7, 6, 2); r(3, 9, 2, 4, '#808080'); break;
    case 5: x.beginPath(); x.arc(7, 7, 4, 0, 7); x.stroke(); r(10, 10, 4, 4); break;
    case 6: r(4, 10, 2, 3); r(6, 4, 2, 7, '#ffff00'); r(6, 4, 2, 1); break;
    case 7: r(9, 2, 3, 6, '#804000'); r(7, 8, 5, 5); break;
    case 8: r(5, 6, 6, 8, '#c0c0c0'); r(5, 6, 6, 1); r(7, 2, 2, 4); for (let k = 0; k < 5; k++) r(1 + k * 2, 1 + (k % 2) * 2, 1, 1); break;
    case 9: x.font = 'bold 12px serif'; x.fillText('A', 3, 13); break;
    case 10: for (let k = 0; k < 11; k++) r(2 + k, 13 - k, 1, 1); break;
    case 11: x.beginPath(); x.moveTo(2, 12); x.bezierCurveTo(5, 0, 10, 16, 14, 4); x.stroke(); break;
    case 12: x.strokeRect(2.5, 4.5, 11, 8); break;
    case 13: x.beginPath(); x.moveTo(3, 12); x.lineTo(5, 3); x.lineTo(13, 6); x.lineTo(10, 13); x.closePath(); x.stroke(); break;
    case 14: x.beginPath(); x.ellipse(8, 8, 6, 4, 0, 0, 7); x.stroke(); break;
    case 15: x.strokeRect(2.5, 4.5, 11, 8); r(2, 4, 1, 1, '#c0c0c0'); r(13, 4, 1, 1, '#c0c0c0'); r(2, 12, 1, 1, '#c0c0c0'); r(13, 12, 1, 1, '#c0c0c0'); break;
  }
  return c.toDataURL();
}

function pictureFor(n) {
  if (!n) return { key: 'sticky', c: PICS.sticky() };
  const name = n.name.toUpperCase();
  if (n.image && PICS[n.image]) return { key: n.image, c: PICS[n.image]() };
  if (name === 'SEATS.BMP') return { key: 'seats', c: PICS.seats(false) };
  if (name === 'STICKY.BMP') return { key: 'sticky', c: PICS.sticky() };
  if (name === '1998-03-03.IMG') return { key: 'tuesday1', c: PICS.tuesday1(), alt: 'EIPSTEIN — courier — no face' };
  if (name === '1998-03-10.IMG') return { key: 'tuesday2', c: PICS.tuesday2(), alt: 'EIPSTEIN — courier — no face' };
  return { key: 'rules', c: PICS.rules() };
}

register('paint', (a = {}) => {
  const n = a.node;
  let { key, c, alt } = pictureFor(n);
  let zoom = 2;
  const body = document.createElement('div');
  body.className = 'app-col paint';
  body.innerHTML = `
    <div class="paint-main">
      <div class="paint-tools">${TOOLS.map((t, i) => `<button class="ptool${i === 6 ? ' on' : ''}" title="" data-t="${t}"><img src="${toolGlyph(i)}" width="16" height="16" alt=""></button>`).join('')}<div class="ptool-opt"></div></div>
      <div class="paint-area"><div class="paint-holder"></div></div>
    </div>
    <div class="paint-colors"><div class="pc-cur"><i class="fg"></i><i class="bg"></i></div><div class="pc-grid">${PALETTE.map(p => `<i style="background:${p}"></i>`).join('')}</div></div>
    <div class="statusbar"><div class="sb">For Help, click Help Topics on the Help Menu.</div><div style="flex:0 0 90px" class="sb-xy"></div></div>`;
  const holder = body.querySelector('.paint-holder');
  const place = () => { holder.innerHTML = ''; c.className = 'paint-canvas'; c.style.width = c.width * zoom + 'px'; c.style.height = c.height * zoom + 'px'; if (alt) c.title = ''; c.setAttribute('aria-label', alt || ''); holder.appendChild(c); };
  place();
  const title = `${n ? n.name : 'untitled'} - Paint`;
  body.prepend(menuBar([
    { label: '&File', items: [{ label: '&New', action: () => launch('paint') }, { label: '&Open...', action: () => launch('mydocs') }, { sep: true }, { label: 'Set As &Wallpaper (Tiled)', action: () => setWallpaper(c) }, { label: 'Set As Wa&llpaper (Centered)', action: () => setWallpaper(c) }, { sep: true }, { label: '&Print...', action: () => import('./printing.js').then(m => m.printDialog({ doc: n ? n.name : 'untitled.bmp' })) }, { sep: true }, { label: 'E&xit', action: () => w.close() }] },
    { label: '&Edit', items: [{ label: '&Undo', disabled: true }, { label: '&Repeat', disabled: true }, { sep: true }, { label: 'Cu&t', disabled: true }, { label: '&Copy', disabled: true }, { label: '&Paste', disabled: true }] },
    { label: '&View', items: [{ label: '&Tool Box', checked: true }, { label: '&Color Box', checked: true }, { label: '&Status Bar', checked: true }, { sep: true }, { label: '&Zoom', submenu: [1, 2, 4].map(z => ({ label: `${z * 100}%`, action: () => { zoom = z; place(); } })) }] },
    { label: '&Image', items: [{ label: '&Flip/Rotate...', disabled: true }, { label: '&Stretch/Skew...', disabled: true }, { label: '&Invert Colors', disabled: true }, { label: '&Attributes...', action: () => messageBox({ title: 'Attributes', icon: 'paint', text: `Width: ${c.width}  Height: ${c.height}\nUnits: Pels\nColors: 16\n\nThis image is read-only.` }) }] },
    { label: '&Options', items: [{ label: '&Edit Colors...', disabled: true }] },
    { label: '&Help', items: [{ label: '&Help Topics', action: () => launch('help') }, { sep: true }, { label: '&About Paint', action: () => messageBox({ title: 'About Paint', icon: 'paint', text: 'Paint\nWindows 98\nCopyright (C) 1981-1998 Microsoft Corp.\n\nLicensed to: GUEST\n\nThe logo was never finished.' }) }] },
  ]));
  const w = createWindow({ title, icon: 'paint', content: body, width: Math.min(innerWidth - 40, Math.max(420, c.width * 2 + 110)), height: Math.min(innerHeight - 60, Math.max(320, c.height * 2 + 130)) });
  body.querySelectorAll('.ptool').forEach(b => b.addEventListener('click', () => { body.querySelectorAll('.ptool').forEach(x => x.classList.toggle('on', x === b)); body.querySelector('.sb').textContent = b.dataset.t + ': this image is read-only.'; }));
  holder.addEventListener('pointermove', e => { const r = c.getBoundingClientRect(); const px = Math.floor((e.clientX - r.left) / zoom), py = Math.floor((e.clientY - r.top) / zoom); body.querySelector('.sb-xy').textContent = px >= 0 && py >= 0 && px < c.width && py < c.height ? `${px},${py}` : ''; });
  // H02: the candidate is now present
  if (key === 'seats') setTimeout(() => { if (!w.closed) { c = PICS.seats(true); place(); } }, 30000);
  return w;
});
