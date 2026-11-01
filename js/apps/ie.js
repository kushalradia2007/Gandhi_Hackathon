// Internet Explorer shell (applications.md section 4). Pages come from js/apps/sites/ and are written into an
// iframe document in quirks mode, so they render with the browser's own 1998-style defaults. Back/Forward/Stop/
// Refresh/Home/Search/Favorites/History, address bar, fake loading + throbber, status bar with link targets and zone,
// View Source, the "dark" pages' history rules, the 2050 lock + BSOD, and the shutdown.com SAFE ending.
import { createWindow, getActive, closeAll } from '../windowManager.js';
import { menuBar, openMenu, closeMenus } from '../menu.js';
import { messageBox } from '../dialogs.js';
import { icon } from '../icons.js';
import { click } from '../sound.js';
import { runCommand } from '../startMenu.js';
import { register, launch } from './index.js';
import { route, parse, HOME, FAVORITES } from './sites/index.js';
import { PAGE_CSS, THROBBER } from './sites/art.js';
import { esc } from './sites/util.js';
import { sprite } from './games/common.js';

/* ---------- toolbar icons the shell does not have ---------- */
const TB = {
  stop: () => sprite(['.....rrrrrr.....', '...rrrrrrrrrr...', '..rrrrrrrrrrrr..', '.rrrwwrrrrwwrrr.', '.rrrwwwrrwwwrrr.', 'rrrrrwwwwwwrrrrr', 'rrrrrrwwwwrrrrrr', 'rrrrrrwwwwrrrrrr', 'rrrrrwwwwwwrrrrr', '.rrrwwwrrwwwrrr.', '.rrrwwrrrrwwrrr.', '..rrrrrrrrrrrr..', '...rrrrrrrrrr...', '.....rrrrrr.....', '................', '................']).toDataURL(),
  refresh: () => sprite(['................', '.....gggggg.....', '....gggggggg.g..', '...gg......ggg..', '..gg......gggg..', '..gg............', '..g.............', '..g..........g..', '..g..........g..', '............gg..', '..gggg......gg..', '..ggg......gg...', '..g.gggggggg....', '.....gggggg.....', '................', '................']).toDataURL(),
  home: () => sprite(['.......kk.......', '......kmmk.kk...', '.....kmmmmkkk...', '....kmmmmmmkk...', '...kmmmmmmmmk...', '..kmmmmmmmmmmk..', '.kkkkkkkkkkkkkk.', '..kwwwwwwwwwwk..', '..kwkkkwwkkkwk..', '..kwkckwwkokwk..', '..kwkkkwwkokwk..', '..kwwwwwwkokwk..', '..kwwwwwwkokwk..', '..kkkkkkkkkkkk..', '................', '................']).toDataURL(),
  history: () => sprite(['.....kkkkkk.....', '...kkwwwwwwkk...', '..kwwwwkwwwwwk..', '.kwwwwwkwwwwwwk.', '.kwwwwwkwwwwwwk.', 'kwwwwwwkwwwwwwwk', 'kwwwwwwkkkkkwwwk', 'kwwwwwwwwwwwwwwk', 'kwwwwwwwwwwwwwwk', '.kwwwwwwwwwwwwk.', '.kwwwwwwwwwwwwk.', '..kwwwwwwwwwwk..', '...kkwwwwwwkk...', '.....kkkkkk.....', '................', '................']).toDataURL(),
};
let TBI = null;
const tbIcons = () => TBI || (TBI = { back: icon('back', 16), fwd: icon('forward', 16), stop: TB.stop(), refresh: TB.refresh(), home: TB.home(), search: icon('find', 16), favorites: icon('favorites', 16), history: TB.history() });

// While the mouse is held anywhere outside a page (window drag, resize, menus), iframes must not eat the pointer.
document.addEventListener('pointerdown', () => document.documentElement.classList.add('iex-nopointer'), true);
window.addEventListener('pointerup', () => document.documentElement.classList.remove('iex-nopointer'), true);

const userFavs = [];
const visited = new Set();
let tipEl = null, tipT = 0;
function hideTip() { clearTimeout(tipT); if (tipEl) { tipEl.remove(); tipEl = null; } }
function showTip(text, x, y) {
  hideTip();
  tipEl = document.createElement('div');
  tipEl.className = 'tooltip'; tipEl.textContent = text;
  (document.getElementById('screen') || document.body).appendChild(tipEl);
  tipEl.style.left = Math.min(x, innerWidth - tipEl.offsetWidth - 2) + 'px';
  tipEl.style.top = (y + 20 + tipEl.offsetHeight > innerHeight ? y - tipEl.offsetHeight - 4 : y + 20) + 'px';
  tipT = setTimeout(hideTip, 5000);
}
function cursorCSS() {
  const v = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const arrow = v('--cur-arrow'), text = v('--cur-text');
  return (arrow ? `html, body { cursor: ${arrow}; }` : '') + ' a, a * { cursor: pointer; }' + (text ? ` input[type=text], input[type=password], textarea { cursor: ${text}; }` : '');
}

/** Session Log row, if the shell's Session Log is loaded (extras.js exports addLog per the shell contract). */
function logRow(row) { import('./extras.js').then(m => (m.addLog ? m.addLog(row) : console.warn('ie.js: addLog not exported; Session Log row skipped', row))).catch(() => console.warn('ie.js: Session Log unavailable; row skipped', row)); }

/* ---------- full-screen moments ---------- */
function bsod(msg, done) {
  const o = document.createElement('div');
  o.className = 'iex-bsod';
  o.innerHTML = `<pre><span class="iex-bsod-t"> Windows </span>

A fatal exception 0E has occurred at 0028:C0001A4F in VXD VMM(01) +
00000A4F. The current application will be terminated.

*  Press any key to terminate the current application.
*  Press CTRL+ALT+DEL again to restart your computer. You will
   lose any unsaved information in all applications.

                    ${esc(msg)}

                       Press any key to continue _</pre>`;
  document.body.appendChild(o);
  let armed = false;
  const end = () => { if (!o.isConnected) return; o.remove(); window.removeEventListener('keydown', key, true); if (done) done(); };
  const key = e => { if (armed) { e.preventDefault(); end(); } };
  setTimeout(() => { armed = true; }, 300);
  window.addEventListener('keydown', key, true);
  o.addEventListener('pointerdown', () => { if (armed) end(); });
  setTimeout(end, 3000);
}
async function safeEnding() {
  closeAll();
  const o = document.createElement('div');
  o.className = 'iex-safe s1';
  o.innerHTML = '<div class="iex-safe-msg">Windows is shutting down...</div><div class="iex-safe-bar"></div>';
  document.body.appendChild(o);
  const bar = o.querySelector('.iex-safe-bar');
  for (let i = 0; i < 20; i++) { bar.insertAdjacentHTML('beforeend', '<i></i>'); await new Promise(r => setTimeout(r, 150)); }
  const t0 = performance.now();
  const hms = s => [Math.floor(s / 3600), Math.floor(s / 60) % 60, Math.floor(s % 60)].map(n => String(n).padStart(2, '0')).join(':');
  o.className = 'iex-safe s2';
  o.innerHTML = '<div class="iex-safe-orange">It is now safe to turn off your computer.</div><div class="iex-safe-bill"><span></span><br>Rs. —</div>';
  const tick = o.querySelector('.iex-safe-bill span');
  const iv = setInterval(() => { tick.textContent = hms(performance.now() / 1000); }, 250);
  logRow([new Date().toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit', hour: 'numeric', minute: '2-digit' }), 'PC 03', 'GUEST', 'ATTEMPTED SHUTDOWN (www.shutdown.com)', 'STILL RUNNING']);
  await new Promise(r => setTimeout(r, 10000));
  clearInterval(iv);
  o.className = 'iex-safe s3';
  o.innerHTML = `<div class="iex-safe-last">Session active. Reload to return.</div>`;
  void t0;
}

/* ================= the browser window ================= */
register('ie', (args = {}) => {
  const I = tbIcons();
  const tbtn = (a, label, img) => `<button class="tbtn iex-tb" data-a="${a}"><img src="${img}" width="16" height="16" alt="" draggable="false"><span>${label}</span></button>`;
  const body = document.createElement('div');
  body.className = 'app-col iex';
  body.innerHTML = `
    <div class="bands">
      <div class="band iex-mb"><div class="tb-grip"></div><div class="iex-throb" style="background-image:url(${THROBBER})"></div></div>
      <div class="band iex-tools"><div class="tb-grip"></div>${tbtn('back', 'Back', I.back)}${tbtn('fwd', 'Forward', I.fwd)}${tbtn('stop', 'Stop', I.stop)}${tbtn('refresh', 'Refresh', I.refresh)}${tbtn('home', 'Home', I.home)}<div class="iex-sep"></div>${tbtn('search', 'Search', I.search)}${tbtn('favorites', 'Favorites', I.favorites)}${tbtn('history', 'History', I.history)}</div>
      <div class="band addr iex-addr"><div class="tb-grip"></div><span>A<u>d</u>dress</span><div class="addr-box"><img src="${icon('ie', 16)}" alt="" width="16" height="16"><input type="text" spellcheck="false" autocomplete="off"></div><button class="tbtn iex-go" data-a="go"><img src="${I.fwd}" width="16" height="16" alt="">Go</button></div>
    </div>
    <div class="iex-main"><div class="iex-side" hidden><div class="iex-side-h"><span></span><button class="iex-side-x" aria-label="Close"></button></div><div class="iex-side-list"></div></div><div class="iex-view"><iframe class="iex-frame" title="page"></iframe></div></div>
    <div class="statusbar"><div class="iex-st">Done</div><div class="iex-prog" style="flex:0 0 90px"></div><div class="iex-zone" style="flex:0 0 140px"><img alt="" width="16" height="16"><span></span></div></div>`;
  const $ = s => body.querySelector(s);
  const input = $('.addr-box input'), frame = $('.iex-frame'), throb = $('.iex-throb'), st = $('.iex-st'), prog = $('.iex-prog');
  const zoneImg = $('.iex-zone img'), zoneTxt = $('.iex-zone span'), side = $('.iex-side'), sideList = $('.iex-side-list');
  const btn = a => body.querySelector(`[data-a="${a}"]`);

  let cur = null, back = [], fwd = [], locked = false, wired = null, loadT = 0, revert = null, timers = [], seq = 0, source = '', page = null, sideMode = null;
  const opts = { tools: true, addr: true, status: true };

  const w = createWindow({
    title: 'Microsoft Internet Explorer', icon: 'ie', content: body,
    width: Math.min(720, innerWidth - 40), height: Math.min(540, innerHeight - 70), minWidth: 300, minHeight: 200,
    onClose: () => { if (locked) return false; clearTimers(); clearTimeout(loadT); hideTip(); document.removeEventListener('keydown', parentKey); return true; },
  });

  const status = t => { st.textContent = t; };
  const clearTimers = () => { timers.forEach(t => clearTimeout(t)); timers = []; };
  function buttons() {
    btn('back').disabled = locked || !back.length;
    btn('fwd').disabled = locked || !fwd.length;
    ['stop'].forEach(a => { btn(a).disabled = !loadT; });
    ['refresh', 'home', 'search', 'go'].forEach(a => { btn(a).disabled = locked; });
    input.disabled = locked;
  }

  /* ---- navigation ---- */
  function go(url, o = {}) {
    if (locked) return;
    const p = parse(url);
    if (p.mailto) { launch('outlook'); return; }   // Outlook Express is not on this machine
    const entry = { url: p.display, post: o.post || null, variant: o.variant || null };
    revert = { back: back.slice(), fwd: fwd.slice(), cur };
    if (!o.replace) { if (cur && !cur.noHistory) back.push(cur); fwd = []; }
    load(entry);
  }
  function goBack() { if (locked || !back.length) return; revert = { back: back.slice(), fwd: fwd.slice(), cur }; if (cur && !cur.noHistory) fwd.push(cur); load(back.pop()); }
  function goFwd() { if (locked || !fwd.length) return; revert = { back: back.slice(), fwd: fwd.slice(), cur }; if (cur && !cur.noHistory) back.push(cur); load(fwd.pop()); }
  const goHome = () => go(HOME);
  const refresh = () => { if (cur && !locked) { revert = null; load(cur); } };
  function stop() {
    if (!loadT) return;
    clearTimeout(loadT); loadT = 0;
    if (revert) { back = revert.back; fwd = revert.fwd; cur = revert.cur; revert = null; }
    throb.classList.remove('on'); prog.textContent = ''; status('Done'); buttons();
  }
  function load(entry) {
    clearTimeout(loadT); clearTimers(); hideTip();
    click();
    input.value = entry.url;
    status(`Opening page ${entry.url}...`);
    prog.innerHTML = '<i></i><i></i><i></i>';
    throb.classList.add('on');
    loadT = setTimeout(() => { loadT = 0; render(entry); }, 200 + Math.random() * 600);   // never more than a second: this is a LAN
    buttons();
  }

  function render(entry) {
    const r = route(entry);
    page = r.page;
    if (page.lucky) { render({ url: parse(page.lucky.u).display, variant: page.lucky.variant || null }); return; }
    revert = null;
    entry.noHistory = !!page.noHistory;
    cur = entry;
    input.value = entry.url;
    const title = page.title || '';
    source = `<html>\n<head>\n<title>${esc(title)}</title>\n${page.head || ''}</head>\n<body ${page.bodyAttrs || 'bgcolor="#ffffff"'}>\n${page.body}\n</body>\n</html>\n`;
    const doc = frame.contentDocument;
    if (wired) wired.abort();   // document.open() should drop old listeners; make sure of it
    wired = new AbortController();
    doc.open();
    doc.write(source.replace('<head>', `<head><style>${PAGE_CSS}${cursorCSS()}</style>`));
    doc.close();
    wire(doc);
    w.setTitle(`${title || entry.url} - Microsoft Internet Explorer`);
    const intranet = page.zone === 'intranet';
    zoneImg.src = icon(intranet ? 'computer' : 'ie', 16); zoneTxt.textContent = intranet ? ' Local intranet' : ' Internet';
    throb.classList.remove('on'); prog.textContent = ''; status('Done');
    visited.add(entry.url);
    markVisited(doc);
    buttons();
    if (sideMode === 'history') showSide('history');
    if (page.onLoad) {
      const token = ++seq;
      const alive = () => token === seq && !w.closed;
      page.onLoad(doc, {
        after: (ms, fn) => { timers.push(setTimeout(() => { if (alive()) fn(); }, ms)); },
        every: (ms, fn) => { const t = setInterval(() => { if (alive()) fn(); else clearInterval(t); }, ms); timers.push(t); },
        clearTimers,
        lock: v => { locked = !!v; buttons(); },
        go, back: () => { if (back.length) goBack(); else goHome(); },
        status,
        setTitle: t => w.setTitle(`${t ? t + ' - ' : ''}Microsoft Internet Explorer`),
        end2050: () => runCommand('2050'),
        bsod,
        safeEnding,
      });
    } else seq++;
  }

  const resolve = href => { try { return new URL(href, cur ? cur.url : HOME).href; } catch (e) { return href; } };
  function markVisited(doc) {
    const vlink = doc.body && doc.body.getAttribute('vlink') || '#800080';
    doc.querySelectorAll('a[href]').forEach(a => {
      const h = a.getAttribute('href');
      if (h.startsWith('#') || a.classList.contains('hid') || /^mailto:/i.test(h)) return;
      if (visited.has(parse(resolve(h)).display)) a.style.color = vlink;
    });
  }

  function act(name) {
    if (name === 'refresh') refresh();
    else if (name === 'back') goBack();
    else if (name === 'detect') messageBox({ title: 'Network Settings', icon: 'info', text: 'Connected to: SHREE_CYBER_ZONE\nSession: 10224 days\nSeat: 07' });
  }

  /* ---- page document wiring (listeners die with each document.open) ---- */
  function wire(doc) {
    const on = (type, fn) => doc.addEventListener(type, fn, { signal: wired.signal });
    const frameXY = e => { const r = frame.getBoundingClientRect(); return { x: r.left + e.clientX, y: r.top + e.clientY }; };
    on('click', e => {
      const a = e.target.closest && e.target.closest('[data-act]');
      if (a) { e.preventDefault(); act(a.dataset.act); return; }
      const l = e.target.closest && e.target.closest('a[href]');
      if (!l) return;
      e.preventDefault();
      const h = l.getAttribute('href');
      if (h.startsWith('#')) return;
      if (/^mailto:/i.test(h)) { launch('outlook'); return; }
      go(resolve(h), { variant: l.dataset.variant });
    });
    on('submit', e => {
      e.preventDefault();
      const f = e.target, action = f.getAttribute('action');
      if (!action) return;
      let fd;
      try { fd = new FormData(f, e.submitter || undefined); } catch (err) { fd = new FormData(f); }
      const target = new URL(action, cur ? cur.url : HOME);
      if ((f.getAttribute('method') || 'get').toLowerCase() === 'post') go(target.href, { post: Object.fromEntries(fd) });
      else { target.search = new URLSearchParams([...fd].filter(([, v]) => typeof v === 'string')).toString(); go(target.href); }
    });
    on('mouseover', e => {
      const l = e.target.closest && e.target.closest('a[href]');
      if (l) { const h = l.getAttribute('href'); status(h.startsWith('#') ? (cur ? cur.url : '') + h : /^mailto:/i.test(h) ? h : resolve(h)); }
      const tipHost = e.target.closest && e.target.closest('[data-tip]');
      if (tipHost && !tipHost.contains(e.relatedTarget)) {
        const p = frameXY(e);
        clearTimeout(tipT);
        tipT = setTimeout(() => showTip(tipHost.dataset.tip, p.x, p.y), +(tipHost.dataset.tipdelay || 500));
      }
    });
    on('mouseout', e => {
      const l = e.target.closest && e.target.closest('a[href]');
      if (l && !l.contains(e.relatedTarget)) status('Done');
      const tipHost = e.target.closest && e.target.closest('[data-tip]');
      if (tipHost && !tipHost.contains(e.relatedTarget)) hideTip();
    });
    on('pointerdown', () => { closeMenus(); hideTip(); w.focus(); });
    on('contextmenu', e => {
      e.preventDefault();
      const p = frameXY(e);
      w.focus();
      openMenu(contextItems(), p.x, p.y);
    });
    on('keydown', e => { if (!shortcut(e, true)) forward(e); });
    on('keyup', forward);
  }
  const forward = e => document.dispatchEvent(new KeyboardEvent(e.type, { key: e.key, code: e.code, altKey: e.altKey, ctrlKey: e.ctrlKey, shiftKey: e.shiftKey, metaKey: e.metaKey, bubbles: true, cancelable: true }));
  function shortcut(e, inPage) {
    const typing = e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName);
    if (e.key === 'F5') { e.preventDefault(); refresh(); return true; }
    if (e.key === 'Escape') { stop(); return !!inPage; }
    if (e.altKey && e.key === 'ArrowLeft') { e.preventDefault(); goBack(); return true; }
    if (e.altKey && e.key === 'ArrowRight') { e.preventDefault(); goFwd(); return true; }
    if (e.altKey && (e.key === 'Home')) { e.preventDefault(); goHome(); return true; }
    if (e.key === 'Backspace' && !typing) { e.preventDefault(); goBack(); return true; }
    return false;
  }
  const parentKey = e => { if (getActive() === w && !w.closed && e.isTrusted) shortcut(e, false); };
  document.addEventListener('keydown', parentKey);

  /* ---- View Source, Properties, Print ---- */
  function viewSource() {
    const p = cur ? parse(cur.url) : null;
    const base = p && p.path ? (p.path.split('/').filter(Boolean).pop() || p.host || 'index').replace(/\.[a-z]+$/, '') : 'blank';
    launch('notepad', { node: { name: `${base}[1].htm`, content: source.replace(/\r?\n/g, '\r\n') } });
  }
  const properties = () => messageBox({ title: 'Properties', icon: 'ie', text: `${page && page.title || '(untitled)'}\n\nProtocol:       HyperText Transfer Protocol\nType:             HTML Document\nConnection:   Not Encrypted\nAddress:        ${cur ? cur.url : ''}\nSize:              ${source.length} bytes\nCreated:        3/3/1998\nModified:       3/3/1998`, buttons: ['OK'] });
  function print() {
    if (page && page.noPrint) return messageBox({ title: 'Print', icon: 'warning', text: 'Do not print anything.' });
    launch('print', { node: { name: `${page && page.title || 'page'}.htm`, content: source }, source: 'ie' });
  }
  function addFav() {
    if (!cur) return;
    const name = page && page.title || cur.url;
    if (!userFavs.some(f => f[1] === cur.url)) userFavs.push([name, cur.url]);
    messageBox({ title: 'Add Favorite', icon: 'favorites', text: `Internet Explorer will add this page to your Favorites list.\n\n${name}\n\nFavorites on this machine are shared with THE PROPRIETOR.` });
    if (sideMode === 'favorites') showSide('favorites');
  }
  const favItems = () => FAVORITES.concat(userFavs).map(([n, u]) => ({ label: n.replace(/&/g, '&&'), action: () => go(u) }));
  function contextItems() {
    return [
      { label: '&Back', disabled: !back.length || locked, action: goBack },
      { label: 'F&orward', disabled: !fwd.length || locked, action: goFwd },
      { sep: true },
      { label: 'Create Shor&tcut', disabled: true },
      { label: 'Add to &Favorites...', action: addFav },
      { label: '&View Source', action: viewSource },
      { sep: true },
      { label: '&Print', action: print },
      { label: 'R&efresh', disabled: locked, action: refresh },
      { sep: true },
      { label: 'P&roperties', action: properties },
    ];
  }

  /* ---- Explorer bar (Favorites / History) ---- */
  function showSide(mode) {
    sideMode = mode;
    if (!mode) { side.hidden = true; return; }
    side.hidden = false;
    side.querySelector('.iex-side-h span').textContent = mode === 'favorites' ? 'Favorites' : 'History';
    const items = mode === 'favorites' ? FAVORITES.concat(userFavs) : [...new Set(back.concat(cur ? [cur] : []).map(e => e.url))].reverse().map(u => [u.replace(/^http:\/\//, ''), u]);
    sideList.innerHTML = items.length ? items.map(([n, u]) => `<div class="iex-side-i" data-u="${esc(u)}"><img src="${icon('ie', 16)}" width="16" height="16" alt="">${esc(n)}</div>`).join('') : '<div class="iex-side-e">(Empty)</div>';
  }
  sideList.addEventListener('click', e => { const i = e.target.closest('.iex-side-i'); if (i) go(i.dataset.u); });
  side.querySelector('.iex-side-x').addEventListener('click', () => showSide(null));

  /* ---- menus ---- */
  const applyBars = () => { $('.iex-tools').hidden = !opts.tools; $('.iex-addr').hidden = !opts.addr; body.querySelector('.statusbar').hidden = !opts.status; };
  $('.iex-mb').insertBefore(menuBar([
    { label: '&File', items: () => [
      { label: '&New', submenu: [{ label: '&Window', shortcut: 'Ctrl+N', action: () => launch('ie', { url: cur ? cur.url : HOME }) }] },
      { label: '&Open...', shortcut: 'Ctrl+O', action: () => { input.focus(); input.select(); } },
      { label: 'Save &As...', disabled: true },
      { sep: true },
      { label: 'Page Set&up...', disabled: true },
      { label: '&Print...', shortcut: 'Ctrl+P', action: print },
      { sep: true },
      { label: 'P&roperties', action: properties },
      { sep: true },
      { label: '&Close', disabled: locked, action: () => w.close() },
    ] },
    { label: '&Edit', items: [
      { label: 'Cu&t', shortcut: 'Ctrl+X', disabled: true }, { label: '&Copy', shortcut: 'Ctrl+C', disabled: true }, { label: '&Paste', shortcut: 'Ctrl+V', disabled: true },
      { sep: true },
      { label: 'Select &All', shortcut: 'Ctrl+A', action: () => { try { frame.contentDocument.execCommand('selectAll'); } catch (e) { /* nothing to select */ } } },
      { sep: true },
      { label: '&Find (on This Page)...', shortcut: 'Ctrl+F', disabled: true },
    ] },
    { label: '&View', items: () => [
      { label: '&Toolbars', submenu: [
        { label: '&Standard Buttons', checked: opts.tools, action: () => { opts.tools = !opts.tools; applyBars(); } },
        { label: '&Address Bar', checked: opts.addr, action: () => { opts.addr = !opts.addr; applyBars(); } },
      ] },
      { label: 'Status &Bar', checked: opts.status, action: () => { opts.status = !opts.status; applyBars(); } },
      { label: '&Explorer Bar', submenu: [
        { label: '&Search', action: () => go('http://google.com/') },
        { label: '&Favorites', checked: sideMode === 'favorites', action: () => showSide(sideMode === 'favorites' ? null : 'favorites') },
        { label: '&History', checked: sideMode === 'history', action: () => showSide(sideMode === 'history' ? null : 'history') },
        { sep: true },
        { label: '&None', checked: !sideMode, action: () => showSide(null) },
      ] },
      { sep: true },
      { label: 'Sto&p', shortcut: 'Esc', disabled: !loadT, action: stop },
      { label: '&Refresh', shortcut: 'F5', disabled: locked, action: refresh },
      { sep: true },
      { label: 'Sour&ce', action: viewSource },
    ] },
    { label: '&Go', items: () => [
      { label: '&Back', shortcut: 'Alt+Left Arrow', disabled: !back.length || locked, action: goBack },
      { label: '&Forward', shortcut: 'Alt+Right Arrow', disabled: !fwd.length || locked, action: goFwd },
      { sep: true },
      { label: '&Home Page', shortcut: 'Alt+Home', disabled: locked, action: goHome },
      { label: '&Search the Web', disabled: locked, action: () => go('http://google.com/') },
    ] },
    { label: 'F&avorites', items: () => [
      { label: '&Add to Favorites...', action: addFav },
      { label: '&Organize Favorites...', disabled: true },
      { sep: true },
      { label: 'Channels', submenu: [{ label: '(Empty)', disabled: true }] },
      { label: 'Links', submenu: favItems().slice(1, 5) },
      { sep: true },
      ...favItems(),
    ] },
    { label: '&Help', items: [
      { label: '&Contents and Index', action: () => launch('help') },
      { label: '&Product Updates', action: () => go('http://windowsupdate.microsoft.com/') },
      { sep: true },
      { label: '&About Internet Explorer', action: () => messageBox({ title: 'About Internet Explorer', icon: 'ie', text: 'Microsoft (R) Internet Explorer\nVersion 4.72.3110.8\nUpdate Versions: SP1;\n\nBased on NCSA Mosaic.\nCopyright (C) 1995-1998 Microsoft Corp.\n\nThis product is licensed to:\n   Bhaiya\n   Shree Cyber Zone\n\nNo product updates are available. None will be.' }) },
    ] },
  ], true), throb);

  /* ---- toolbar, address bar ---- */
  btn('back').addEventListener('click', goBack);
  btn('fwd').addEventListener('click', goFwd);
  btn('stop').addEventListener('click', stop);
  btn('refresh').addEventListener('click', refresh);
  btn('home').addEventListener('click', goHome);
  btn('search').addEventListener('click', () => go('http://google.com/'));
  btn('favorites').addEventListener('click', () => showSide(sideMode === 'favorites' ? null : 'favorites'));
  btn('history').addEventListener('click', () => showSide(sideMode === 'history' ? null : 'history'));
  btn('go').addEventListener('click', () => go(input.value));
  input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); go(input.value); } });
  input.addEventListener('focus', () => input.select());

  go(args.url || HOME);
  return w;
});
