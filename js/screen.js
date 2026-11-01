// Fixed virtual resolution (uiux.md §8): the whole machine is 1024x768 (or the chosen Screen Area), scaled to fit.
import { store } from './state.js';

export const RESOLUTIONS = { '640x480': [640, 480], '800x600': [800, 600], '1024x768': [1024, 768], '1280x1024': [1280, 1024] };
let S = 1, OX = 0, OY = 0, W = 1024, H = 768;

export function applyScale() {
  const el = document.getElementById('screen');
  // Screen Area fixes the virtual height; width follows the browser's aspect ratio (no letterbox).
  const [, baseH] = RESOLUTIONS[store.get('res', '1024x768')] || RESOLUTIONS['1024x768'];
  H = baseH; S = innerHeight / H; W = Math.round(innerWidth / S);
  OX = 0; OY = 0;
  Object.assign(el.style, { width: W + 'px', height: H + 'px', transformOrigin: '0 0', transform: `translate(${OX}px, ${OY}px) scale(${S})` });
  window.dispatchEvent(new Event('scz-rescale'));
}
export function setResolution(key) { if (RESOLUTIONS[key]) { store.set('res', key); applyScale(); } }
export const resolution = () => store.get('res', '1024x768');

/** viewport (client) -> screen-local coordinates */
export const lx = x => (x - OX) / S;
export const ly = y => (y - OY) / S;
export const ld = d => d / S;
export const lrect = r => ({ left: lx(r.left), top: ly(r.top), right: lx(r.right), bottom: ly(r.bottom), width: r.width / S, height: r.height / S });
export const sw = () => W;
export const sh = () => H;

export function initScreen() {
  applyScale();
  window.addEventListener('resize', applyScale);
  // uiux.md §8.5: phones get a dismissible Win98-style banner
  if (Math.min(screen.width, screen.height) < 700 || matchMedia('(pointer: coarse)').matches) {
    const b = document.createElement('div');
    b.className = 'mobile-banner window active';
    b.innerHTML = '<div class="title-bar"><span class="title-text">PC 03</span><div class="title-buttons"><button class="tb-close" aria-label="Close"></button></div></div><div class="window-body" style="padding:8px">This machine is best viewed on a desktop.</div>';
    document.body.appendChild(b);
    b.querySelector('.tb-close').onclick = () => b.remove();
  }
}
