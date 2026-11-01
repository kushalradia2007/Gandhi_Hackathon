// Pixel-art "GIFs" for the fake 1998 web, drawn on canvas at load. Animated ones are horizontal sprite strips
// stepped by CSS (see PAGE_CSS) so they jerk like real GIFs. No external assets.

function cv(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); x.imageSmoothingEnabled = false; draw(x, w, h); return c; }
const url = c => c.toDataURL();
function grain(x, w, h, amount, mono = false) {
  const im = x.getImageData(0, 0, w, h), a = im.data;
  for (let i = 0; i < a.length; i += 4) {
    const n = (Math.random() - 0.5) * amount;
    if (mono) { const v = Math.max(0, Math.min(255, (a[i] * 0.3 + a[i + 1] * 0.59 + a[i + 2] * 0.11) + n)); a[i] = a[i + 1] = a[i + 2] = v; }
    else { a[i] = Math.max(0, Math.min(255, a[i] + n)); a[i + 1] = Math.max(0, Math.min(255, a[i + 1] + n)); a[i + 2] = Math.max(0, Math.min(255, a[i + 2] + n)); }
  }
  x.putImageData(im, 0, 0);
}
function px(x, rows, map, ox = 0, oy = 0, s = 1) { rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) if (map[r[i]]) { x.fillStyle = map[r[i]]; x.fillRect(ox + i * s, oy + j * s, s, s); } }); }

/* ---- tiles ---- */
export const STARS = url(cv(16, 16, x => {
  x.fillStyle = '#ffffff'; x.fillRect(0, 0, 16, 16);
  x.fillStyle = '#ffff00'; [[3, 2], [2, 3], [3, 3], [4, 3], [3, 4]].forEach(([a, b]) => x.fillRect(a, b, 1, 1));
  x.fillStyle = '#c0c0ff'; [[11, 10], [10, 11], [11, 11], [12, 11], [11, 12]].forEach(([a, b]) => x.fillRect(a, b, 1, 1));
}));
export const BONES = url(cv(48, 32, x => {
  x.fillStyle = '#ffeecc'; x.fillRect(0, 0, 48, 32);
  px(x, ['.ww........ww.', 'wwww......wwww', 'wwwwwwwwwwwwww', 'wwwwwwwwwwwwww', 'wwww......wwww', '.ww........ww.'], { w: '#e0b080' }, 6, 6);
  px(x, ['.ww........ww.', 'wwww......wwww', 'wwwwwwwwwwwwww', 'wwwwwwwwwwwwww', 'wwww......wwww', '.ww........ww.'], { w: '#e0b080' }, 28, 22);
}));
export const PEBBLE = url(cv(32, 32, (x, w, h) => { x.fillStyle = '#c0c0c0'; x.fillRect(0, 0, w, h); grain(x, w, h, 40); }));

/* ---- animated: café logo with a spinning "S" (8 frames, 200x80) ---- */
export const LOGO = url(cv(1600, 80, x => {
  for (let f = 0; f < 8; f++) {
    const ox = f * 200, sx = Math.cos(f / 8 * Math.PI * 2);
    x.save(); x.translate(ox + 32, 44); x.scale(Math.abs(sx) < 0.08 ? 0.08 : sx, 1);
    x.font = 'bold 70px "Times New Roman", serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillStyle = sx >= 0 ? '#ff8000' : '#c04000'; x.fillText('S', 0, 0);
    x.restore();
    x.font = 'bold 30px Arial, sans-serif'; x.fillStyle = '#800000'; x.textBaseline = 'alphabetic'; x.fillText('HREE', ox + 62, 40);
    x.font = 'bold 20px Arial, sans-serif'; x.fillStyle = '#000080'; x.fillText('CYBER ZONE', ox + 62, 66);
    x.fillStyle = f % 2 ? '#ffff00' : '#ff8000'; x.fillRect(ox + 62, 72, 132, 3);
  }
}));
/* ---- animated: under construction barrier (2 frames, 130x40) ---- */
export const UC = url(cv(260, 40, x => {
  for (let f = 0; f < 2; f++) {
    const ox = f * 130;
    x.fillStyle = '#ffff00'; x.fillRect(ox, 0, 130, 40);
    for (let i = -20; i < 150; i += 12) {
      x.fillStyle = '#000'; x.beginPath();
      const s = i + f * 6;
      x.moveTo(ox + s, 0); x.lineTo(ox + s + 6, 0); x.lineTo(ox + s - 2, 8); x.lineTo(ox + s - 8, 8); x.closePath(); x.fill();
      x.beginPath(); x.moveTo(ox + s, 32); x.lineTo(ox + s + 6, 32); x.lineTo(ox + s - 2, 40); x.lineTo(ox + s - 8, 40); x.closePath(); x.fill();
    }
    x.save(); x.beginPath(); x.rect(ox, 0, 130, 40); x.clip();
    x.fillStyle = '#000'; x.font = 'bold 10px Arial, sans-serif'; x.fillText('UNDER', ox + 30, 19); x.fillText('CONSTRUCTION', ox + 30, 29);
    // the little digger man
    px(x, ['..kk..', '..kk..', '.kkkk.', 'k.kk.k', '..kk..', '.k..k.', 'k....k'], { k: '#000' }, ox + 8 + f, 13, 2);
    x.restore();
  }
}));

/* ---- 88x31 badges ---- */
function badge(bg, fg, l1, l2, edge) {
  return url(cv(88, 31, x => {
    x.fillStyle = bg; x.fillRect(0, 0, 88, 31);
    x.fillStyle = edge; x.fillRect(0, 0, 88, 1); x.fillRect(0, 0, 1, 31); x.fillStyle = '#000'; x.fillRect(0, 30, 88, 1); x.fillRect(87, 0, 1, 31);
    x.fillStyle = fg; x.textAlign = 'center'; x.font = 'bold 11px Arial, sans-serif'; x.fillText(l1, 44, 13); x.font = '9px Arial, sans-serif'; x.fillText(l2, 44, 25);
  }));
}
export const BADGE_NETSCAPE = badge('#400080', '#ffffff', 'Netscape NOW!', 'Navigator 4.0', '#c0a0ff');
export const BADGE_IE = badge('#0000a0', '#ffffff', 'Internet Explorer', 'Get it! 4.0', '#a0c0ff');
export const BADGE_WIN98 = badge('#c0c0c0', '#000000', 'Made with', 'Windows 98', '#ffffff');
export const BADGE_Y2K = badge('#ff0000', '#ffff00', 'Y2K', 'COMPLIANT', '#ffff80');
export const BADGE_NOTEPAD = badge('#ffffff', '#000080', 'Made with', 'NOTEPAD.EXE', '#c0c0c0');

/* ---- photos (grainy, low colour) ---- */
export const TOMMY = url(cv(160, 120, (x, w, h) => {
  x.fillStyle = '#c8b090'; x.fillRect(0, 0, w, h); x.fillStyle = '#806040'; x.fillRect(0, 90, w, 30);
  x.fillStyle = '#504030'; x.fillRect(0, 60, 30, 30); x.fillRect(4, 64, 22, 3);  // the counter
  x.fillStyle = '#a06030'; x.fillRect(45, 55, 70, 35); x.fillRect(100, 35, 35, 30); x.fillRect(50, 85, 8, 20); x.fillRect(100, 85, 8, 20); x.fillRect(35, 50, 12, 6);
  x.fillStyle = '#603010'; x.fillRect(100, 30, 8, 14); x.fillRect(127, 30, 8, 14);
  x.fillStyle = '#000'; x.fillRect(110, 45, 3, 3); x.fillRect(122, 45, 3, 3); x.fillRect(130, 54, 5, 4);
  x.fillStyle = '#d00'; x.fillRect(100, 62, 35, 3); x.fillStyle = '#fc0'; x.fillRect(116, 65, 4, 4);
  grain(x, w, h, 50);
}));
function cameraFrame(figure) {
  return url(cv(320, 240, (x, w, h) => {
    x.fillStyle = '#505050'; x.fillRect(0, 0, w, h);                       // floor from above
    x.fillStyle = '#383838'; for (let i = 0; i < w; i += 40) x.fillRect(i, 0, 1, h); for (let j = 0; j < h; j += 40) x.fillRect(0, j, w, 1);
    x.fillStyle = '#8a8a8a'; x.fillRect(40, 30, 220, 70);                  // counter top
    x.fillStyle = '#202020'; x.fillRect(120, 40, 60, 46);                  // CRT
    x.fillStyle = '#606060'; x.fillRect(126, 46, 48, 32);                  // screen glow
    x.fillStyle = '#b0b0b0'; x.fillRect(118, 90, 64, 8);                   // keyboard
    x.fillStyle = '#d0d0d0'; x.fillRect(192, 88, 8, 10);                   // mouse
    x.fillStyle = '#303030'; x.fillRect(132, 112, 36, 30); x.fillRect(136, 142, 4, 12); x.fillRect(160, 142, 4, 12);  // chair
    if (figure) {                                                           // back to camera, walking away
      x.fillStyle = '#1a1a1a'; x.fillRect(214, 150, 26, 44); x.fillRect(218, 194, 8, 26); x.fillRect(230, 194, 8, 20);
      x.fillStyle = '#101010'; x.fillRect(219, 132, 16, 18);
    }
    x.fillStyle = '#e0e0e0'; x.font = '10px "Courier New", monospace'; x.fillText('CAM 03', 6, 14); x.fillText('REC', 284, 14);
    grain(x, w, h, 70, true);
  }));
}
export const CAMERA = cameraFrame(true);
export const CAMERA_EMPTY = cameraFrame(false);

export const MOUNTAIN = url(cv(48, 24, x => {
  px(x, ['..........................k.....................', '.........................kwk....................', '........................kwwwk...................', '.......................kwwwwwk..................', '.......k..............kwwkwwwwk.................', '......kwk............kddddkddddk................', '.....kdddk..........kddddddddddk................', '....kdddddk........kddddddddddddk...............', '...kddddddd k....kdddddddddddddddk..............', '..kddddddddddk..kdddddddddddddddddk.............', '.kddddddddddddkkdddddddddddddddddddk............', 'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk...........'], { k: '#000080', w: '#ffffff', d: '#4060c0' }, 0, 6);
}));
export const BUTLER = url(cv(48, 72, x => {
  px(x, [
    '.....kkkkkk.....', '....kssssssk....', '...kssssssssk...', '...kskksskkskk..', '...kssssssssk...', '....ksskkssk....', '.....kssssk.....', '...kkkwwwwkkk...',
    '..kkkkkwwkkkkk..', '.kkkkkkrrkkkkkk.', '.kkkkkkwwkkkkkk.', '.kkkkkkwwkkkkkk.', '.kk.kkkwwkkk.kk.', '.ww.kkkkkkkk.ww.', '....kkkkkkkk....', '....kkk..kkk....', '....kkk..kkk....', '...kkkk..kkkk...',
  ], { k: '#000', s: '#f0c8a0', w: '#fff', r: '#c00000' }, 0, 0, 3);
}));
export const RUNNER = url(cv(24, 24, x => {
  px(x, ['....kk..', '....kk..', '..kkkk..', '.k.kk.k.', '...kk...', '..k..k..', '.k....k.', 'k......k'], { k: '#ffcc00' }, 0, 0, 3);
}));

/* ---- the IE "e" throbber (8 frames, 24x22) used by the shell ---- */
export const THROBBER = url(cv(192, 22, x => {
  for (let f = 0; f < 8; f++) {
    const ox = f * 24;
    x.fillStyle = '#000'; x.fillRect(ox, 0, 24, 22);
    x.fillStyle = '#0000ff'; x.font = 'bold 18px "Times New Roman", serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('e', ox + 12, 11);
    const a = f / 8 * Math.PI * 2;
    for (let k = 0; k < 24; k++) { const t = k / 24 * Math.PI * 2; x.fillStyle = '#806000'; x.fillRect(ox + 12 + Math.round(Math.cos(t) * 10), 11 + Math.round(Math.sin(t) * 4), 1, 1); }
    x.fillStyle = '#ffff00'; x.fillRect(ox + 11 + Math.round(Math.cos(a) * 10), 10 + Math.round(Math.sin(a) * 4), 3, 2);
  }
}));

/* ---- base stylesheet injected into every page (never shown by View > Source) ---- */
export const PAGE_CSS = `
body { margin: 8px; }
img { image-rendering: pixelated; }
blink, .blink { animation: iex-blink 1s steps(1) infinite; }
@keyframes iex-blink { 50% { visibility: hidden; } }
.logo { display: inline-block; width: 200px; height: 80px; background: url(${LOGO}) 0 0 no-repeat; animation: iex-logo 1.6s steps(8) infinite; }
@keyframes iex-logo { to { background-position: -1600px 0; } }
.uc { display: inline-block; width: 130px; height: 40px; background: url(${UC}) 0 0 no-repeat; animation: iex-uc 0.6s steps(2) infinite; }
@keyframes iex-uc { to { background-position: -260px 0; } }
a.hid { color: inherit !important; text-decoration: none; }
`;
