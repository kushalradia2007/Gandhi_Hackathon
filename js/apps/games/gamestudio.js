// Game Studio behaviours (games.md section 7). The folder itself comes from data/fs_games.json (merged into the FS by
// the shell). Here: GTA3.EXE dialog, the four ASSETS bitmaps in a Paint-style viewer, and GTA_8 appearing once every
// chat log in C:\BACKROOM$\LOGS has been read.
import { createWindow } from '../../windowManager.js';
import { menuBar } from '../../menu.js';
import { messageBox } from '../../dialogs.js';
import { register, launch } from '../index.js';
import * as fs from '../../fileSystem.js';
import { sprite, canvas, el } from './common.js';

register('gta3', () => messageBox({ title: 'GTA3.EXE', icon: 'error', text: 'Cannot run this program.\n\nThe game is not complete.\n\nThe game is 0% complete.\n\nThe game has been 0% complete since 1998.' }));

/* ---------------- ASSETS ---------------- */
const ASSETS = {
  // G14: the sprite's head is one flat colour. No eyes. It could be anyone.
  gta_player_sprite: { name: 'player_sprite.bmp', zoom: 4, draw: () => canvas(16, 16, x => { x.fillStyle = '#fff'; x.fillRect(0, 0, 16, 16); sprite([
    '................',
    '......kkkk......',
    '.....khhhhk.....',
    '.....khhhhk.....',
    '.....khhhhk.....',
    '......kkkk......',
    '....kkbbbbkk....',
    '...kbbbbbbbbk...',
    '...kbkbbbbkbk...',
    '...khkbbbbkhk...',
    '....kkbbbbkk....',
    '.....knnnnk.....',
    '.....knkknk.....',
    '.....knkknk.....',
    '....kkk..kkk....',
    '................',
  ], { h: '#c08060' }, 16, 16, 0, 0, x.canvas); }) },
  gta_car_sprite: { name: 'car_sprite.bmp', zoom: 4, draw: () => canvas(16, 16, x => { x.fillStyle = '#fff'; x.fillRect(0, 0, 16, 16); sprite([
    '................',
    '.....kkkkkk.....',
    '....krrrrrrk....',
    '...kkrrrrrrkk...',
    '...kkccccccdk...',
    '....kccccccdk...',
    '....krrrrrrk....',
    '....krrrrrrk....',
    '....krrrrrrk....',
    '....krrrrrrk....',
    '....kccccccdk...',
    '...kkrrrrrrkk...',
    '...kkrrrrrrkk...',
    '....kyrrrryk....',
    '.....kkkkkk.....',
    '................',
  ], {}, 16, 16, 0, 0, x.canvas); }) },
  gta_city_map: { name: 'city_map.bmp', zoom: 1, draw: () => canvas(256, 256, x => {
    x.fillStyle = '#008000'; x.fillRect(0, 0, 256, 256);
    x.fillStyle = '#808080';
    [32, 96, 160].forEach(v => { x.fillRect(v, 0, 8, 256); });
    [40, 120].forEach(v => { x.fillRect(0, v, 168, 8); });
    x.fillRect(160, 200, 60, 8);                 // a road that stops
    x.fillStyle = '#c0c0c0'; x.fillRect(44, 52, 40, 56); x.fillRect(108, 52, 40, 30);
    x.fillStyle = '#000080'; x.fillRect(200, 20, 40, 120);   // water
    x.fillStyle = '#000'; x.font = '8px monospace'; x.fillText('TODO: CITY', 190, 240); x.fillText('TODO: PEOPLE', 8, 240);
    x.fillStyle = '#ff0000'; x.fillRect(35, 123, 2, 2);      // you are here
  }) },
  gta_font_8px: { name: 'font_8px.bmp', zoom: 2, draw: () => {
    const c = canvas(128, 48, x => {
      x.fillStyle = '#fff'; x.fillRect(0, 0, 128, 48);
      x.fillStyle = '#000'; x.font = '8px "Courier New", monospace'; x.textBaseline = 'top';
      for (let k = 32; k < 128; k++) { const i = k - 32; x.fillText(String.fromCharCode(k), (i % 16) * 8 + 1, Math.floor(i / 16) * 8); }
    });
    // threshold to 1 bit so it reads as a bitmap font
    const x = c.getContext('2d'), im = x.getImageData(0, 0, 128, 48), a = im.data;
    for (let i = 0; i < a.length; i += 4) { const v = a[i] < 150 ? 0 : 255; a[i] = a[i + 1] = a[i + 2] = v; a[i + 3] = 255; }
    x.putImageData(im, 0, 0);
    return c;
  } },
};

Object.entries(ASSETS).forEach(([id, a]) => register(id, () => paintView(a)));

function paintView(a) {
  const pic = a.draw();
  let zoom = a.zoom;
  const body = el(`<div class="app-col"><div class="gs-paint"></div><div class="statusbar"><div>For Help, click Help Topics on the Help Menu.</div><div style="flex:0 0 120px"></div></div></div>`);
  const area = body.querySelector('.gs-paint'), zoomSb = body.querySelectorAll('.statusbar div')[1];
  pic.className = 'gs-canvas';
  area.appendChild(pic);
  const setZoom = z => { zoom = z; pic.style.width = pic.width * z + 'px'; pic.style.height = pic.height * z + 'px'; zoomSb.textContent = `${pic.width}x${pic.height}  ${z * 100}%`; };
  body.prepend(menuBar([
    { label: '&File', items: [{ label: '&New', disabled: true }, { label: '&Open...', disabled: true }, { label: '&Save', disabled: true }, { sep: true }, { label: 'E&xit', action: () => w.close() }] },
    { label: '&Edit', items: [{ label: '&Undo', disabled: true }] },
    { label: '&View', items: () => [
      { label: '&Tool Box', checked: true }, { label: '&Color Box', checked: true }, { label: '&Status Bar', checked: true },
      { sep: true },
      { label: '&Zoom', submenu: [
        { label: '&Normal Size', checked: zoom === 1, action: () => setZoom(1) },
        { label: '&Large Size', checked: zoom === 4, action: () => setZoom(4) },
        { label: 'C&ustom... (800%)', checked: zoom === 8, action: () => setZoom(8) },
      ] },
    ] },
    { label: '&Image', items: [{ label: '&Flip/Rotate...', disabled: true }, { label: '&Attributes...', action: () => messageBox({ title: 'Attributes', icon: 'info', text: `File last saved: 3/3/1998\nSize on disk: ${a.name === 'city_map.bmp' ? '8' : a.name === 'font_8px.bmp' ? '2' : '1'} KB\n\nWidth: ${pic.width}   Height: ${pic.height}\nUnits: Pels\nColors: 16` }) }] },
    { label: '&Colors', items: [{ label: '&Edit Colors...', disabled: true }] },
    { label: '&Help', items: [{ label: '&Help Topics', action: () => launch('help') }, { sep: true }, { label: '&About Paint', action: () => messageBox({ title: 'Paint', icon: 'paint', text: 'Paint\nWindows 98\n\nThis asset was never finished.' }) }] },
  ]));
  setZoom(zoom);
  const w = createWindow({ title: `${a.name} - Paint`, icon: 'paint', content: body, width: Math.max(300, Math.min(560, pic.width * zoom + 60)), height: Math.max(240, Math.min(460, pic.height * zoom + 100)) });
  return w;
}

/* ---------------- G16: GTA_8 appears after every chat log has been read ---------------- */
const read = new Set();
const pad = n => String(n).padStart(2, '0');
fs.onOpen(n => {
  if (!n || !n.parent || !/^(LOGS|chatlogs)$/i.test(n.parent.name) || !/\.LOG$/i.test(n.name)) return;
  read.add(n.name);
  const total = n.parent.children.filter(c => /\.LOG$/i.test(c.name)).length;
  if (read.size < total) return;
  const studio = fs.resolve('C:\\My Documents\\Game Studio');
  if (!studio || studio.children.some(c => c.name === 'GTA_8')) return;
  const d = new Date();
  const stamp = `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${String(d.getFullYear()).slice(2)} ${d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
  studio.children.push({ name: 'GTA_8', type: 'folder', date: stamp, children: [], parent: studio });
});
