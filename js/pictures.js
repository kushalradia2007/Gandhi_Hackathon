// Procedurally drawn "photos" and bitmaps (no external assets). Low-res, shown pixelated.
import { flags } from './state.js';

function pic(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const x = c.getContext('2d'); x.imageSmoothingEnabled = false; draw(x, w, h);
  return c;
}
// cheap film grain / JPEG mush
function grain(x, w, h, amt = 18, mono = false) {
  const im = x.getImageData(0, 0, w, h), d = im.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.random() - 0.5) * amt;
    if (mono) { const g = (d[i] + d[i + 1] + d[i + 2]) / 3 + n; d[i] = d[i + 1] = d[i + 2] = g; }
    else { d[i] += n; d[i + 1] += n; d[i + 2] += n; }
  }
  x.putImageData(im, 0, 0);
}
const T = (x, s, px, py, font = '10px Arial', col = '#000') => { x.fillStyle = col; x.font = font; x.fillText(s, px, py); };

export const PICS = {
  tommy: () => pic(160, 120, (x, w, h) => {
    x.fillStyle = '#b9a07a'; x.fillRect(0, 0, w, h);                // café wall
    x.fillStyle = '#7a6448'; x.fillRect(0, 84, w, 36);               // floor
    x.fillStyle = '#6b5a40'; for (let i = 0; i < w; i += 20) x.fillRect(i, 84, 1, 36);
    x.fillStyle = '#f2ece0'; x.fillRect(48, 56, 62, 30);              // body (white)
    x.fillStyle = '#8a5a2a'; x.fillRect(48, 56, 24, 30); x.fillRect(88, 62, 14, 12); // brown patches
    x.fillStyle = '#f2ece0'; x.fillRect(96, 34, 32, 30);               // head
    x.fillStyle = '#8a5a2a'; x.fillRect(96, 30, 9, 16); x.fillRect(120, 30, 9, 16); x.fillRect(104, 34, 10, 10); // ears + eye patch
    x.fillStyle = '#000'; x.fillRect(107, 42, 3, 3); x.fillRect(119, 42, 3, 3); x.fillRect(122, 52, 6, 4);
    x.fillStyle = '#e04060'; x.fillRect(112, 58, 6, 8);                // tongue out
    x.fillStyle = '#f2ece0'; x.fillRect(52, 84, 8, 16); x.fillRect(98, 84, 8, 16); x.fillRect(36, 60, 14, 5);
    x.fillStyle = '#c03020'; x.fillRect(96, 64, 32, 3);
    grain(x, w, h, 22);
    T(x, 'TOMMY', 4, 12, 'bold 10px Arial', '#fff');
  }),
  bhaiya: () => pic(200, 140, (x, w, h) => {
    x.fillStyle = '#d8d0b8'; x.fillRect(0, 0, w, h);
    x.fillStyle = '#ff9933'; x.fillRect(0, 0, w, 16); T(x, 'SHREE CYBER ZONE - GRAND OPENING - 1998', 6, 11, 'bold 9px Arial');
    for (let i = 0; i < 6; i++) { x.fillStyle = '#9a9a90'; x.fillRect(8 + i * 32, 30, 24, 18); x.fillStyle = '#30506a'; x.fillRect(10 + i * 32, 32, 20, 13); }
    x.fillStyle = '#c00'; x.fillRect(0, 70, w, 3);                      // ribbon
    x.fillStyle = '#6a4024'; x.fillRect(88, 50, 26, 30);                // face
    x.fillStyle = '#222'; x.fillRect(86, 46, 30, 7);                    // hair (thinning)
    x.fillStyle = '#6a4024'; x.fillRect(96, 46, 10, 3);
    x.fillStyle = '#000'; x.fillRect(94, 61, 3, 3); x.fillRect(105, 61, 3, 3); x.fillRect(95, 72, 13, 2);
    if (flags.bhaiyaSmiles) { x.fillRect(93, 70, 2, 2); x.fillRect(108, 70, 2, 2); } else { x.fillRect(93, 74, 2, 2); x.fillRect(108, 74, 2, 2); }
    x.fillStyle = '#f4f4f0'; x.fillRect(78, 80, 46, 46);                // white shirt
    x.fillStyle = '#6a4024'; x.fillRect(70, 82, 8, 30); x.fillRect(124, 82, 8, 26);
    x.fillStyle = '#ccc'; x.fillRect(132, 96, 14, 3);                    // scissors
    x.fillStyle = '#2a2a2a'; x.fillRect(82, 126, 16, 14); x.fillRect(104, 126, 16, 14);
    x.fillStyle = '#f2ece0'; x.fillRect(160, 108, 22, 14); x.fillStyle = '#8a5a2a'; x.fillRect(176, 100, 10, 10); // Tommy in the corner
    grain(x, w, h, 26);
    T(x, '01-03-1998', 4, 136, '9px monospace', '#ff8000');
  }),
  rules: () => pic(220, 160, (x, w, h) => {
    x.fillStyle = '#b08850'; x.fillRect(0, 0, w, h);
    x.fillStyle = '#9a7440'; for (let i = 0; i < w; i += 6) x.fillRect(i, 0, 1, h);
    x.fillStyle = '#7a5428'; x.fillRect(0, 0, w, 3); x.fillRect(0, h - 3, w, 3);
    const L = ['CYBER ZONE RULES', '1. No smoking', '2. No food', '3. No fighting', '4. No downloading "big" files', '5. No printing without permission', '6. No changing wallpaper'];
    L.forEach((t, i) => T(x, t, i ? 12 : 44, 16 + i * 15, (i ? '' : 'bold ') + '11px "Comic Sans MS", cursive', '#1838a0'));
    ['7. Do not touch PC 03', '8. Do not ask about the floppy', '9. Do not ask what is in the back room'].forEach((t, i) => T(x, t, 14, 121 + i * 11, '9px "Courier New", monospace', '#102070'));
    T(x, '- Bhaiya', 150, 156, '10px "Comic Sans MS", cursive', '#1838a0');
    grain(x, w, h, 14);
  }),
  seats: (present = false) => pic(400, 300, (x, w, h) => {
    x.fillStyle = '#0c0c14'; x.fillRect(0, 0, w, h);
    T(x, 'THE QUIET ROOM', 140, 18, 'bold 13px "Courier New", monospace', '#c0c0c0');
    T(x, 'we do not rule. we schedule.', 118, 31, '9px "Courier New", monospace', '#808080');
    const S = [['SEAT_01', 'RETIRED'], ['SEAT_02', 'ACTIVE'], ['SEAT_03', 'VACANT'], ['SEAT_04', 'ACTIVE'], ['SEAT_05', 'NEUTRALIZED'], ['SEAT_06', 'ACTIVE'],
      ['SEAT_07', 'MERAZ / OPENLAKE, IIT BHILAI', present ? 'CANDIDATE PRESENT' : 'CANDIDATE PENDING'], ['SEAT_08', 'ACTIVE'], ['SEAT_09', 'ACTIVE']];
    S.forEach((s, i) => {
      const cx = 70 + (i % 3) * 130, cy = 60 + Math.floor(i / 3) * 80;
      const empty = i === 2, me = i === 6;
      x.fillStyle = empty ? '#202024' : me ? '#5a4a10' : '#6a1010';
      x.fillRect(cx - 12, cy, 24, 18); x.fillRect(cx - 12, cy - 16, 24, 6); x.fillRect(cx - 12, cy - 16, 4, 20); x.fillRect(cx + 8, cy - 16, 4, 20);  // chair back + seat
      x.fillRect(cx - 12, cy + 18, 3, 10); x.fillRect(cx + 9, cy + 18, 3, 10);
      if (!empty && !me) { x.fillStyle = '#303038'; x.fillRect(cx - 7, cy - 30, 14, 14); x.fillRect(cx - 10, cy - 14, 20, 16); } // silhouette
      if (me) { x.strokeStyle = '#ffff00'; x.strokeRect(cx - 16, cy - 34, 32, 66); }
      T(x, s[0], cx - 22, cy + 40, 'bold 9px "Courier New", monospace', me ? '#ffff00' : '#c0c0c0');
      T(x, s[1], cx - (me ? 62 : 22), cy + 50, '8px "Courier New", monospace', me ? '#ffff00' : empty ? '#606060' : '#909090');
      if (s[2]) T(x, s[2], cx - 40, cy + 60, 'bold 8px "Courier New", monospace', present ? '#ff4040' : '#ffff00');
    });
    T(x, 'SEAT_00 is not a seat. SEAT_00 is the voice.', 70, 292, '8px "Courier New", monospace', '#505058');
  }),
  sticky: () => pic(240, 170, (x) => {
    x.fillStyle = '#fff'; x.fillRect(0, 0, 240, 170);
    x.fillStyle = '#ff9933'; x.fillRect(10, 16, 112, 24); T(x, 'SHREE CYB', 16, 34, 'bold 15px Arial');
    x.strokeStyle = '#000'; x.strokeRect(10, 50, 70, 46); x.beginPath(); x.moveTo(10, 96); x.lineTo(45, 66); x.lineTo(80, 96); x.stroke();
    x.fillStyle = '#ffff80'; x.fillRect(128, 66, 104, 92); x.fillStyle = '#e8e860'; x.fillRect(128, 66, 104, 7);
    ['PC 03', 'password:', 'tommy1998', '', '(dont write', ' it down!!)'].forEach((t, i) => T(x, t, 136, 88 + i * 12, '11px "Comic Sans MS", cursive', '#0000c0'));
  }),
  night: () => pic(320, 240, (x, w, h) => {
    x.fillStyle = '#05050a'; x.fillRect(0, 0, w, h);
    x.fillStyle = '#1a1208'; x.fillRect(0, 150, w, 90);
    x.fillStyle = '#26262e'; x.fillRect(118, 86, 84, 64); x.fillStyle = '#0c2c3a'; x.fillRect(126, 93, 68, 46);
    T(x, 'PC 03', 146, 108, '8px monospace', '#60ff60'); T(x, 'SESSION', 141, 119, '8px monospace', '#60ff60'); T(x, 'ACTIVE', 143, 130, '8px monospace', '#60ff60');
    x.fillStyle = '#3a2a1a'; x.fillRect(30, 150, 260, 14);
    x.fillStyle = '#4a3a2a'; x.fillRect(232, 104, 26, 46); x.fillRect(236, 96, 18, 10);            // empty chair
    x.fillStyle = '#101018'; x.fillRect(250, 20, 50, 40); x.fillStyle = '#1c2a1c'; x.fillRect(254, 24, 42, 30); // TV
    T(x, '98/2', 262, 42, '9px monospace', '#3a6a3a');
    grain(x, w, h, 30);
    T(x, 'SHREE CYBER ZONE  03:14 AM', 92, 232, '9px monospace', '#808080');
  }),
  bhaiya2026: () => pic(200, 140, (x, w, h) => {
    x.fillStyle = '#c8c0a8'; x.fillRect(0, 0, w, h);
    for (let i = 0; i < 6; i++) { x.fillStyle = '#8a8a80'; x.fillRect(8 + i * 32, 30, 24, 18); x.fillStyle = '#2a4050'; x.fillRect(10 + i * 32, 32, 20, 13); }
    x.fillStyle = '#5a4030'; x.fillRect(0, 96, w, 44);                  // counter
    x.fillStyle = '#6a4024'; x.fillRect(88, 50, 26, 30);                // same face
    x.fillStyle = '#222'; x.fillRect(86, 46, 30, 7); x.fillStyle = '#6a4024'; x.fillRect(96, 46, 10, 3);
    x.fillStyle = '#000'; x.fillRect(94, 61, 3, 3); x.fillRect(105, 61, 3, 3); x.fillRect(95, 72, 13, 2); x.fillRect(93, 70, 2, 2); x.fillRect(108, 70, 2, 2);
    x.fillStyle = '#f4f4f0'; x.fillRect(78, 80, 46, 16);
    x.fillStyle = '#7a6a50'; x.fillRect(156, 104, 30, 6); x.fillRect(158, 110, 3, 20); x.fillRect(180, 110, 3, 20);  // broken chair
    x.fillStyle = '#e8e2d6'; x.fillRect(160, 90, 22, 14); x.fillStyle = '#8a5a2a'; x.fillRect(176, 82, 10, 10); x.fillStyle = '#b0b0b0'; x.fillRect(182, 86, 5, 4); // Tommy, grey muzzle
    grain(x, w, h, 24);
    T(x, '01-11-2026', 4, 136, '9px monospace', '#ff8000');
    if ((flags.b2026 || 0) >= 2) T(x, '— s00', 168, 136, '8px monospace', '#202020');
  }),
  scan1: () => pic(220, 160, (x, w, h) => {
    x.fillStyle = '#e8e8e0'; x.fillRect(0, 0, w, h);
    x.fillStyle = '#303030'; x.fillRect(40, 20, 140, 110); x.fillStyle = '#0a1a0a'; x.fillRect(52, 30, 116, 84);
    x.fillStyle = '#2a6a2a'; x.fillRect(52, 84, 116, 30);
    T(x, 'IND 98/2', 76, 62, 'bold 16px monospace', '#d0ffd0'); T(x, '(34.2 ov)  RAIN', 70, 78, '10px monospace', '#a0d0a0');
    grain(x, w, h, 40, true);
  }),
  scan2: () => pic(220, 160, (x, w, h) => {
    x.fillStyle = '#e0dcd0'; x.fillRect(0, 0, w, h);
    x.fillStyle = '#6a5038'; x.fillRect(0, 100, w, 60);                                 // counter
    x.fillStyle = '#b8b4a8'; x.fillRect(70, 30, 70, 60); x.fillStyle = '#20303a'; x.fillRect(78, 36, 54, 42); // CRT
    x.fillStyle = '#c8c4b8'; x.fillRect(60, 104, 90, 14);                                // keyboard
    x.fillStyle = '#d0ccc0'; x.fillRect(160, 106, 14, 20);                               // mouse
    x.fillStyle = '#e0c040'; x.fillRect(30, 116, 26, 3);                                 // pencil
    x.fillStyle = '#101820'; x.fillRect(180, 120, 24, 24); x.fillStyle = '#a0a0a0'; x.fillRect(186, 120, 12, 9); x.fillStyle = '#f0f0f0'; x.fillRect(184, 132, 16, 10); // the floppy
    grain(x, w, h, 40, true);
  }),
  tuesday1: () => courier(false),
  tuesday2: () => courier(true),
};

function courier(open) {
  return pic(200, 150, (x, w, h) => {
    x.fillStyle = '#7a7a7a'; x.fillRect(0, 0, w, h);
    x.fillStyle = '#5a5a5a'; x.fillRect(0, 110, w, 40);
    x.fillStyle = '#3a3a3a'; x.fillRect(120, 30, 46, 80);                     // door frame
    x.fillStyle = open ? '#101010' : '#4a4a4a'; x.fillRect(124, 34, 38, 76);
    if (open) { x.fillStyle = '#4a4a4a'; x.fillRect(132, 34, 30, 76); x.fillStyle = '#dcdcdc'; x.fillRect(124, 34, 3, 76); } // ajar, light leaks
    x.fillStyle = '#9a9a9a'; x.fillRect(156, 72, 3, 3);
    // man in safari suit, back to camera (greyscale: beige reads mid-grey)
    x.fillStyle = '#b4b4b4'; x.fillRect(70, 58, 30, 40); x.fillRect(64, 60, 8, 30); x.fillRect(98, 60, 8, 30);
    x.fillStyle = '#9c9c9c'; x.fillRect(72, 98, 11, 26); x.fillRect(87, 98, 11, 26);
    x.fillStyle = '#2a2a2a'; x.fillRect(76, 40, 18, 18); x.fillRect(70, 124, 14, 4); x.fillRect(86, 124, 14, 4);
    x.fillStyle = '#8a8a8a'; x.fillRect(84, 66, 2, 28); x.fillRect(70, 76, 30, 2);   // belt + seam
    grain(x, w, h, 40, true);
    T(x, open ? '10.03.98  03:14' : '03.03.98  03:14', 4, 146, '9px monospace', '#e0e0e0');
  });
}
