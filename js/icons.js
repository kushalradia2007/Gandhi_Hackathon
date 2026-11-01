// Pixel-art icons drawn at runtime on <canvas> with the 16-colour VGA palette.
// Icons are authored at 32x32; 16x16 versions come from an outline-preserving
// 2x downscale unless a hand-drawn 16px version exists in SMALL.

export const PAL = { k: '#000000', m: '#800000', g: '#008000', o: '#808000', n: '#000080', p: '#800080', t: '#008080', s: '#c0c0c0', d: '#808080', r: '#ff0000', l: '#00ff00', y: '#ffff00', b: '#0000ff', f: '#ff00ff', c: '#00ffff', w: '#ffffff' };

function painter(size) {
  const cv = document.createElement('canvas');
  cv.width = cv.height = size;
  const ctx = cv.getContext('2d');
  const g = {
    rect(c, x, y, w, h) { ctx.fillStyle = PAL[c]; ctx.fillRect(x, y, w, h); },
    px(c, x, y) { ctx.fillStyle = PAL[c]; ctx.fillRect(x, y, 1, 1); },
    clear(x, y, w = 1, h = 1) { ctx.clearRect(x, y, w, h); },
    frame(c, x, y, w, h) { g.rect(c, x, y, w, 1); g.rect(c, x, y + h - 1, w, 1); g.rect(c, x, y, 1, h); g.rect(c, x + w - 1, y, 1, h); },
    box(fill, line, x, y, w, h) { g.rect(fill, x, y, w, h); g.frame(line, x, y, w, h); },
    disc(c, cx, cy, r) {
      for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) {
        const dx = x + 0.5 - cx, dy = y + 0.5 - cy;
        if (dx * dx + dy * dy <= r * r) g.px(c, x, y);
      }
    },
    line(c, x0, y0, x1, y1, t = 1) {
      const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
      let err = dx + dy, o = Math.floor(t / 2);
      for (;;) {
        g.rect(c, x0 - o, y0 - o, t, t);
        if (x0 === x1 && y0 === y1) break;
        const e2 = 2 * err;
        if (e2 >= dy) { err += dy; x0 += sx; }
        if (e2 <= dx) { err += dx; y0 += sy; }
      }
    },
    grid(x, y, rows) { rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) if (row[i] !== '.') g.px(row[i], x + i, y + j); }); },
  };
  return { cv, ctx, g };
}

/* ---------- shared shapes ---------- */
function page(g, x, y, w, h, e = 5) {
  g.box('w', 'k', x, y, w, h);
  const cx0 = x + w - 1 - e;
  for (let j = 0; j <= e; j++) for (let i = 0; i <= e; i++) {
    const X = cx0 + i, Y = y + j;
    if (i > j) g.clear(X, Y);
    else if (i === j || i === 0 || j === e) g.px('k', X, Y);
    else g.px('s', X, Y);
  }
}
function lines(g, x, y, w, n, c = 'd') { for (let i = 0; i < n; i++) g.rect(c, x, y + i * 2, i % 3 === 2 ? w - 4 : w, 1); }
function folder(g, x, y, w = 30, h = 22) {
  g.box('y', 'k', x + 1, y, 12, 4);
  g.rect('w', x + 2, y + 1, 10, 1);
  g.box('y', 'k', x, y + 3, w, h - 3);
  g.rect('y', x + 2, y + 3, 10, 1);
  g.rect('w', x + 1, y + 4, w - 2, 1);
  g.rect('w', x + 1, y + 4, 1, h - 6);
  g.rect('o', x + 1, y + h - 2, w - 2, 1);
  g.rect('o', x + w - 2, y + 4, 1, h - 5);
}
function monitor(g, x, y, w, h, scr = 't') {
  g.box('s', 'k', x, y, w, h);
  g.rect('w', x + 1, y + 1, w - 2, 1); g.rect('w', x + 1, y + 1, 1, h - 2);
  g.rect('d', x + 1, y + h - 2, w - 2, 1); g.rect('d', x + w - 2, y + 1, 1, h - 2);
  g.rect('d', x + 3, y + 3, w - 6, 1); g.rect('d', x + 3, y + 3, 1, h - 6);
  g.rect('w', x + 3, y + h - 4, w - 6, 1); g.rect('w', x + w - 4, y + 3, 1, h - 6);
  g.rect(scr, x + 4, y + 4, w - 8, h - 8);
}
function win(g, x, y, w, h, body = 'w') {
  g.box('s', 'k', x, y, w, h);
  g.rect('n', x + 1, y + 1, w - 2, 3);
  g.rect(body, x + 1, y + 4, w - 2, h - 5);
}
function balloon(g) {
  g.disc('k', 16, 14, 13);
  g.line('k', 9, 23, 5, 30, 4);
  g.disc('w', 16, 14, 12);
  g.line('w', 9, 23, 6, 28, 2);
}
const STAR = ['.....k.....', '....kyk....', '....kyk....', 'kkkkyyykkkk', 'kyyyyyyyyyk', '.kyyyyyyyk.', '..kyyyyyk..', '..kyyyyyk..', '.kyyykyyyk.', '.kyk...kyk.', '.kk.....kk.'];
const SHORTCUT = ['kkkkkkkkkkk', 'kwwwwwwwwwk', 'kwwwkkkkkwk', 'kwwwwkkkkwk', 'kwwwkkkkkwk', 'kwwkkkwkkwk', 'kwkkkwwwkwk', 'kwkkwwwwwwk', 'kwwkwwwwwwk', 'kwwwwwwwwwk', 'kkkkkkkkkkk'];

/* ---------- 32x32 icons ---------- */
const ICONS = {
  app(g) { win(g, 2, 4, 28, 24); },
  computer(g) {
    monitor(g, 6, 1, 20, 17, 't');
    g.box('s', 'k', 12, 17, 8, 4);
    g.box('s', 'k', 2, 20, 28, 9);
    g.rect('w', 3, 21, 26, 1); g.rect('d', 3, 27, 26, 1);
    g.rect('k', 17, 24, 9, 1); g.rect('d', 17, 25, 9, 1);
    g.px('l', 5, 24);
  },
  folder(g) { folder(g, 1, 5, 30, 23); },
  mydocs(g) {
    folder(g, 1, 5, 30, 24);
    page(g, 8, 2, 16, 14, 4); lines(g, 10, 7, 9, 2);
    g.box('y', 'k', 1, 11, 30, 18);
    g.rect('w', 2, 12, 28, 1); g.rect('w', 2, 12, 1, 15);
    g.rect('o', 2, 27, 28, 1); g.rect('o', 29, 12, 1, 16);
  },
  documents(g) { ICONS.mydocs(g); },
  ie(g) {
    const orbit = front => {
      for (let a = 0; a < Math.PI * 2; a += 0.01) {
        if ((Math.sin(a) > 0) !== front) continue;
        const ex = 14.5 * Math.cos(a), ey = 5 * Math.sin(a), r = -0.5;
        const x = 16 + ex * Math.cos(r) - ey * Math.sin(r), y = 16 + ex * Math.sin(r) + ey * Math.cos(r);
        g.rect('y', Math.round(x) - 1, Math.round(y) - 1, 2, 2);
      }
    };
    orbit(false);
    g.disc('n', 16, 16, 11.5); g.disc('b', 16, 16, 10.5); g.disc('c', 13, 12, 3);
    g.disc('w', 16.5, 15, 5.5);
    g.rect('b', 10, 15, 13, 3);
    g.clear(18, 18, 11, 4);
    orbit(true);
  },
  recycle(g) {
    for (let y = 8; y <= 29; y++) {
      const inset = Math.floor((y - 8) / 6), x0 = 7 + inset, x1 = 24 - inset;
      g.rect('s', x0, y, x1 - x0 + 1, 1); g.px('k', x0, y); g.px('k', x1, y);
      if (y % 3 === 0) g.rect('d', x0 + 1, y, x1 - x0 - 1, 1);
    }
    for (let x = 10; x <= 21; x += 3) g.rect('d', x, 10, 1, 18);
    g.rect('k', 10, 29, 12, 1);
    g.box('w', 'k', 5, 6, 22, 3); g.rect('d', 6, 8, 20, 1);
  },
  recyclefull(g) {
    g.box('w', 'k', 9, 1, 9, 7); g.line('d', 11, 3, 15, 5);
    g.box('w', 'k', 15, 2, 10, 6); g.line('d', 17, 4, 22, 4);
    ICONS.recycle(g);
  },
  notepad(g) {
    g.box('w', 'k', 6, 4, 21, 26);
    g.rect('c', 7, 5, 19, 3); g.rect('k', 6, 8, 21, 1);
    for (let y = 11; y < 28; y += 3) g.rect('t', 8, y, 17, 1);
    for (let x = 8; x <= 24; x += 3) { g.rect('k', x, 2, 1, 5); g.px('s', x + 1, 3); }
  },
  paint(g) {
    g.disc('k', 14, 18, 12); g.disc('s', 14, 18, 11); g.disc('w', 12, 15, 5);
    g.disc('r', 8, 15, 2.5); g.disc('y', 13, 10, 2.5); g.disc('l', 20, 12, 2.5); g.disc('b', 21, 19, 2.5); g.disc('f', 9, 22, 2.5);
    g.disc('t', 15, 24, 2.5);
    g.line('m', 17, 29, 28, 12, 2); g.rect('k', 27, 9, 3, 4);
  },
  cafe(g) {
    monitor(g, 2, 2, 22, 18, 'g');
    g.grid(7, 7, ['ll.....', 'l.l.ll.', 'll.l...', 'l.l.ll.', 'l.l...l', 'l.l.ll.']);
    g.box('s', 'k', 9, 19, 8, 3); g.box('s', 'k', 4, 21, 18, 3);
    for (let i = 0; i < 4; i++) { g.box('y', 'k', 20, 26 - i * 3, 11, 4); g.rect('o', 21, 28 - i * 3, 9, 1); }
  },
  sessionlog(g) {
    g.box('w', 'k', 7, 5, 21, 26);
    for (let y = 8; y < 30; y += 2) g.px('d', 26, y);
    g.box('m', 'k', 4, 2, 21, 26);
    g.rect('k', 7, 2, 1, 26);
    g.box('w', 'k', 11, 7, 11, 7); g.rect('d', 13, 9, 7, 1); g.rect('d', 13, 11, 5, 1);
  },
  printer(g) {
    page(g, 9, 1, 14, 13, 3); lines(g, 11, 6, 8, 3);
    g.box('s', 'k', 3, 12, 26, 12); g.rect('w', 4, 13, 24, 1); g.rect('d', 4, 22, 24, 1);
    g.rect('k', 7, 16, 18, 1); g.px('l', 25, 19);
    g.box('w', 'k', 7, 23, 18, 7); lines(g, 9, 25, 12, 2);
  },
  programs(g) { folder(g, 1, 6, 30, 22); win(g, 12, 13, 18, 14); win(g, 6, 18, 14, 11); },
  favorites(g) { folder(g, 1, 8, 30, 22); g.grid(17, 1, STAR); },
  settings(g) {
    folder(g, 1, 6, 30, 22); win(g, 11, 12, 19, 16, 's');
    g.rect('k', 14, 19, 13, 1); g.box('b', 'k', 18, 17, 3, 5); g.box('r', 'k', 14, 23, 4, 3); g.box('l', 'k', 20, 23, 4, 3);
  },
  find(g) {
    page(g, 3, 2, 18, 24, 4); lines(g, 6, 9, 10, 6);
    g.line('k', 24, 23, 29, 28, 3);
    g.disc('k', 19, 18, 7.5); g.disc('c', 19, 18, 6); g.disc('w', 17, 16, 2);
  },
  help(g) {
    g.box('w', 'k', 8, 5, 20, 25);
    g.box('b', 'k', 4, 2, 21, 26); g.rect('n', 5, 3, 3, 24); g.rect('k', 8, 2, 1, 26);
    g.grid(12, 8, ['.yyyyy..', 'yy...yy.', '.....yy.', '....yy..', '...yy...', '...yy...', '........', '...yy...', '...yy...']);
  },
  run(g) {
    win(g, 2, 6, 24, 22);
    g.line('k', 11, 22, 23, 10, 2);
    g.rect('k', 18, 6, 9, 2); g.rect('k', 25, 6, 2, 9);
  },
  key(g) {
    g.disc('k', 9, 16, 8); g.disc('y', 9, 16, 7); g.disc('w', 7, 13, 2);
    g.disc('k', 9, 16, 3); g.disc('s', 9, 16, 2);
    g.box('y', 'k', 15, 13, 16, 6); g.rect('w', 16, 14, 14, 1); g.rect('o', 16, 17, 14, 1);
    g.box('y', 'k', 22, 18, 4, 6); g.box('y', 'k', 27, 18, 4, 5);
  },
  logoff(g) { ICONS.key(g); },
  shutdown(g) {
    monitor(g, 5, 1, 22, 19, 'k'); g.rect('n', 9, 5, 4, 2);
    g.box('s', 'k', 12, 19, 8, 3); g.box('s', 'k', 3, 21, 26, 8); g.rect('k', 17, 25, 9, 1); g.px('r', 6, 25);
  },
  winupdate(g) {
    g.disc('k', 15, 15, 13); g.disc('b', 15, 15, 12);
    g.disc('l', 10, 10, 4.5); g.disc('l', 18, 19, 5); g.disc('l', 21, 8, 2.5); g.disc('c', 9, 9, 1.5);
    win(g, 17, 18, 14, 12);
  },
  file(g) { page(g, 6, 2, 20, 28); lines(g, 9, 11, 13, 7); },
  info(g) { balloon(g); g.rect('b', 14, 6, 4, 3); g.rect('b', 14, 11, 4, 11); g.rect('b', 12, 11, 2, 1); g.rect('b', 12, 21, 8, 1); },
  question(g) {
    balloon(g);
    g.grid(12, 5, ['..bbbb..', '.bb..bb.', '.bb..bb.', '.....bb.', '....bb..', '...bb...', '...bb...', '........', '...bb...', '...bb...']);
    g.grid(12, 5, ['..bbbb..', '.bb..bb.', '.bb..bb.', '.....bb.', '....bb..', '...bb...', '...bb...', '........', '...bb...', '...bb...'].map(r => r));
  },
  warning(g) {
    for (let y = 3; y <= 28; y++) {
      const hw = Math.round((y - 3) * 0.56);
      g.rect('y', 16 - hw, y, hw * 2 + 1, 1); g.px('k', 16 - hw, y); g.px('k', 16 + hw, y);
      g.px('d', 17 + hw, y + 1);
    }
    g.rect('k', 2, 28, 29, 1); g.rect('d', 3, 29, 29, 1);
    g.rect('k', 15, 11, 3, 10); g.rect('k', 15, 23, 3, 3);
  },
  error(g) {
    g.disc('d', 17, 17, 14); g.disc('k', 16, 16, 14); g.disc('r', 16, 16, 13);
    g.line('w', 11, 11, 21, 21, 3); g.line('w', 21, 11, 11, 21, 3);
  },
};

/* ---------- hand-drawn 16x16 icons ---------- */
const SMALL = {
  flag(g) {
    g.grid(0, 1, [
      '.....k..........',
      '...k....rrrrr...',
      '.k.....rrrrrr.gg',
      '.....k.rrrrrr.gg',
      '...k..rrrrrr.ggg',
      '.k....rrrrrr.ggg',
      '...k..rrrrr.gggg',
      '.k.....bbb..gggg',
      '...k..bbbbbb.yyy',
      '.k...bbbbbb.yyyy',
      '...k.bbbbbb.yyyy',
      '.k..bbbbbb.yyyyy',
      '...k.bbbbb.yyyy.',
      '.k.......bb..yy.',
    ]);
  },
  speaker(g) {
    g.grid(0, 1, [
      '................',
      '.......k........',
      '......kk....k...',
      '.....kwk..k..k..',
      '.kkkkwwk...k..k.',
      '.kwwwwwk.k..k.k.',
      '.kwwwwwk..k.k.k.',
      '.kwwwwwk..k.k.k.',
      '.kdddwdk.k..k.k.',
      '.kkkkddk...k..k.',
      '.....kdk..k..k..',
      '......kk....k...',
      '.......k........',
    ]);
  },
  showdesktop(g) {
    g.box('t', 'k', 1, 1, 14, 11); g.rect('w', 3, 3, 2, 2); g.rect('w', 3, 7, 2, 2); g.rect('s', 2, 10, 12, 1);
    g.rect('k', 6, 12, 4, 1); g.box('s', 'k', 3, 13, 10, 3);
  },
};

const cache = new Map();
function base(name, size) {
  const key = name + '@' + size;
  if (cache.has(key)) return cache.get(key);
  let cv;
  if (size === 16 && SMALL[name]) { const p = painter(16); SMALL[name](p.g); cv = p.cv; }
  else { const p = painter(32); (ICONS[name] || ICONS.app)(p.g); cv = size === 16 ? downscale(p.cv) : p.cv; }
  cache.set(key, cv);
  return cv;
}

// 2x downscale that keeps black outlines (Win98 16px icons have bold outlines)
function downscale(src) {
  const s = src.width, d = s >> 1;
  const sd = src.getContext('2d').getImageData(0, 0, s, s).data;
  const { cv, ctx } = painter(d);
  const out = ctx.createImageData(d, d);
  for (let y = 0; y < d; y++) for (let x = 0; x < d; x++) {
    const solid = [];
    for (let j = 0; j < 2; j++) for (let i = 0; i < 2; i++) {
      const o = ((y * 2 + j) * s + x * 2 + i) * 4;
      if (sd[o + 3] > 127) solid.push([sd[o], sd[o + 1], sd[o + 2]]);
    }
    if (solid.length < 2) continue;
    const blacks = solid.filter(p => p[0] + p[1] + p[2] === 0).length;
    let pick;
    if (blacks >= 2 || (blacks >= 1 && solid.length < 4)) pick = [0, 0, 0];
    else {
      const counts = new Map();
      solid.forEach(p => { const k = p.join(); counts.set(k, (counts.get(k) || 0) + 1); });
      pick = [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0].split(',').map(Number);
    }
    out.data.set([pick[0], pick[1], pick[2], 255], (y * d + x) * 4);
  }
  ctx.putImageData(out, 0, 0);
  return cv;
}

// kind: '' | 'lnk' (shortcut arrow) | 'sel' (navy 50% dither, Win98 selected icon) | 'lnksel'
function variant(src, kind) {
  const { cv, ctx, g } = painter(src.width);
  ctx.drawImage(src, 0, 0);
  if (kind.includes('lnk')) g.grid(0, src.width - 11, SHORTCUT);
  if (kind.includes('sel')) {
    const im = ctx.getImageData(0, 0, cv.width, cv.width), a = im.data;
    for (let y = 0; y < cv.width; y++) for (let x = 0; x < cv.width; x++) {
      const o = (y * cv.width + x) * 4;
      if (a[o + 3] > 127 && (x + y) % 2 === 0) { a[o] = 0; a[o + 1] = 0; a[o + 2] = 128; }
    }
    ctx.putImageData(im, 0, 0);
  }
  return cv;
}

const urls = new Map();
export function icon(name, size = 32, kind = '') {
  const key = name + '@' + size + kind;
  if (!urls.has(key)) {
    let cv = base(name, size);
    if (kind) cv = variant(cv, kind);
    urls.set(key, cv.toDataURL());
  }
  return urls.get(key);
}

/* ---------- cursors ---------- */
const CURSORS = {
  arrow: { hot: '0 0', fb: 'default', rows: ['k...........', 'kk..........', 'kwk.........', 'kwwk........', 'kwwwk.......', 'kwwwwk......', 'kwwwwwk.....', 'kwwwwwwk....', 'kwwwwwwwk...', 'kwwwwwwwwk..', 'kwwwwwkkkkk.', 'kwwkwwk.....', 'kwk.kwwk....', 'kk..kwwk....', 'k....kwwk...', '.....kwwk...', '......kwwk..', '......kwwk..', '.......kk...'] },
  wait: { hot: '6 10', fb: 'wait', rows: ['kkkkkkkkkkkkk', 'kwwwwwwwwwwwk', 'kkkkkkkkkkkkk', '.kwwwwwwwwwk.', '.kwkkkkkkkwk.', '.kwwkkkkkwwk.', '.kwwwkkkwwwk.', '..kwwwkwwwk..', '...kwwkwwk...', '....kwkwk....', '.....kwk.....', '....kwwwk....', '...kwwkwwk...', '..kwwwkwwwk..', '.kwwwwkwwwwk.', '.kwwwkkkwwwk.', '.kwwkkkkkwwk.', '.kwkkkkkkkwk.', 'kkkkkkkkkkkkk', 'kwwwwwwwwwwwk', 'kkkkkkkkkkkkk'] },
  text: { hot: '3 8', fb: 'text', rows: ['kkk.kkk', '...k...', '...k...', '...k...', '...k...', '...k...', '...k...', '...k...', '...k...', '...k...', '...k...', '...k...', '...k...', '...k...', '...k...', 'kkk.kkk'] },
};
export function installCursors() {
  for (const [name, c] of Object.entries(CURSORS)) {
    const { cv, g } = painter(32);
    g.grid(0, 0, c.rows);
    document.documentElement.style.setProperty('--cur-' + name, `url(${cv.toDataURL()}) ${c.hot}, ${c.fb}`);
  }
}
