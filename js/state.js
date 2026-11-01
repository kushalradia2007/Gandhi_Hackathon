// Shared session state and helpers used across apps, eggs and endings.
export const PC03_START = new Date(1998, 2, 3, 3, 14, 0);

export const store = {
  get(k, d = null) { try { const v = localStorage.getItem('scz.' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('scz.' + k, JSON.stringify(v)); } catch (e) { /* private mode */ } },
};
export const sess = {
  get(k, d = null) { try { const v = sessionStorage.getItem('scz.' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { sessionStorage.setItem('scz.' + k, JSON.stringify(v)); } catch (e) { /* private mode */ } },
};

// The guest's billing never resets on reload ("the session never ended").
if (!store.get('billStart')) store.set('billStart', Date.now());
export const billStart = () => store.get('billStart', Date.now());
if (!store.get('sessionId')) store.set('sessionId', 'G-' + Math.random().toString(16).slice(2, 8).toUpperCase());
export const SESSION_ID = store.get('sessionId');

export const DAYS_RUNNING = () => Math.floor((Date.now() - PC03_START) / 86400000);

const CITY = {
  'Asia/Kolkata': 'Bhilai', 'Asia/Calcutta': 'Bhilai', 'Asia/Mumbai': 'Mumbai', 'Asia/Delhi': 'New Delhi',
  'America/New_York': 'New York', 'America/Chicago': 'Chicago', 'America/Los_Angeles': 'Los Angeles', 'America/Denver': 'Denver',
  'America/Toronto': 'Toronto', 'America/Sao_Paulo': 'Sao Paulo', 'Europe/London': 'London', 'Europe/Paris': 'Paris',
  'Europe/Berlin': 'Berlin', 'Europe/Madrid': 'Madrid', 'Europe/Rome': 'Rome', 'Europe/Moscow': 'Moscow',
  'Asia/Tokyo': 'Tokyo', 'Asia/Shanghai': 'Shanghai', 'Asia/Singapore': 'Singapore', 'Asia/Dubai': 'Dubai',
  'Asia/Karachi': 'Karachi', 'Asia/Dhaka': 'Dhaka', 'Asia/Kathmandu': 'Kathmandu', 'Asia/Colombo': 'Colombo',
  'Australia/Sydney': 'Sydney', 'Australia/Melbourne': 'Melbourne', 'Africa/Lagos': 'Lagos', 'Africa/Nairobi': 'Nairobi',
};
export function city() {
  const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown/Unknown');
  return CITY[tz] || tz.split('/').pop().replace(/_/g, ' ');
}
export function browser() {
  const u = navigator.userAgent;
  return /Edg\//.test(u) ? 'Edge' : /Firefox\//.test(u) ? 'Firefox' : /Chrome\//.test(u) ? 'Chrome' : /Safari\//.test(u) ? 'Safari' : 'Browser';
}

const pad = n => String(n).padStart(2, '0');
export const hms = s => { s = Math.max(0, Math.floor(s)); return `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`; };
export const rupees = n => '\u20b9' + n.toFixed(2);
export const dmy = (d = new Date()) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
export const hm = (d = new Date()) => d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
export const wait = ms => new Promise(r => setTimeout(r, ms));

/** Full-screen overlay helper (boot/endings). Returns the overlay element. */
export function overlay(html, cls = '') { const o = document.getElementById('overlay'); o.className = 'on ' + cls; o.innerHTML = html; return o; }
export function clearOverlay() { const o = document.getElementById('overlay'); o.className = ''; o.innerHTML = ''; }

/** Glitch the whole screen for ms (stepped, no easing). */
export async function glitch(ms) {
  const s = document.getElementById('screen'), end = Date.now() + ms;
  while (Date.now() < end) { s.classList.toggle('glitch'); s.style.transform = `translate(${(Math.random() * 8 - 4) | 0}px,${(Math.random() * 4 - 2) | 0}px)`; await wait(50); }
  s.classList.remove('glitch'); s.style.transform = '';
}

/** Wallpaper: canvas | null (teal). Persistent unless temporary ms is given. */
let wallpaper = null;
export function setWallpaper(canvas, ms = 0) {
  const s = document.getElementById('screen');
  const apply = c => { s.style.backgroundImage = c ? `url(${c.toDataURL()})` : 'none'; s.style.backgroundSize = c ? '100% 100%' : ''; s.style.imageRendering = 'pixelated'; };
  apply(canvas);
  if (ms) setTimeout(() => apply(wallpaper), ms); else wallpaper = canvas;
}

// Recently opened documents (Start > Documents MRU)
export const recent = store.get('recent', ['C:\\My Documents\\rates_1998.doc', 'C:\\My Documents\\complaint_letter.txt', 'C:\\My Documents\\tommy.jpg']);
export function pushRecent(path) {
  const i = recent.indexOf(path); if (i >= 0) recent.splice(i, 1);
  recent.unshift(path); recent.length = Math.min(recent.length, 15);
  store.set('recent', recent);
}

// Flags shared between apps
export const flags = {
  bhaiyaSmiles: false,
  trapDone: false,
  restoreCount: 0,
  ledger: null,        // open ledger window API
  logsRead: new Set(store.get('logsRead', [])),
  mircUnlocked: store.get('mircUnlocked', false),
  guest: false,
};
