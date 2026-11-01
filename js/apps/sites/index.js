// URL -> page routing for the fake web (websites.md 10.6: "this document is responsible for the routing").
import intranet from './intranet.js';
import search from './search.js';
import web from './web.js';
import geocities from './geocities.js';
import eggs from './eggs.js';
import { cannotDisplay } from './util.js';

const SITES = [...intranet, ...search, ...web, ...geocities, ...eggs];
export const HOME = 'http://shreecyberzone.local/';

/** raw address text -> { raw, display, host, path, q, scheme } (or { blank } / { bad }) */
export function parse(raw) {
  let s = String(raw || '').trim();
  if (!s) s = HOME;
  if (/^about:/i.test(s)) return { raw: s, display: s.toLowerCase(), blank: true };
  if (/^mailto:/i.test(s)) return { raw: s, display: s, mailto: true };
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(s)) s = 'http://' + s.replace(/^\/+/, '');
  let url;
  try { url = new URL(s); } catch (e) { return { raw, display: String(raw), bad: true }; }
  if (!/^https?:$/.test(url.protocol)) return { raw, display: url.href, bad: true };
  let path = url.pathname;
  try { path = decodeURIComponent(path); } catch (e) { /* keep it encoded */ }
  return {
    raw: s, display: url.href,
    host: url.hostname.toLowerCase().replace(/^www\./, ''),
    path: path.toLowerCase().replace(/\/+$/, '') || '/',
    q: url.searchParams,
  };
}

/** entry: { url, post, variant } -> page object (see util.js) with zone resolved */
export function route(entry) {
  const u = parse(entry.url);
  if (u.blank) return { u, page: { title: '', body: '', bodyAttrs: 'bgcolor="#ffffff"', zone: 'internet' } };
  if (u.bad) return { u, page: cannotDisplay(u.raw) };
  u.post = entry.post || null;
  u.variant = entry.variant || null;
  const site = SITES.find(s => s.hosts.includes(u.host));
  const page = (site && site.route(u)) || cannotDisplay(u.raw);
  page.zone = page.zone || site && site.zone || (/\.local$/.test(u.host) ? 'intranet' : 'internet');
  return { u, page };
}

/** For the Favorites menu/bar: the public sites (websites.md 10.4 "Visible to all"). */
export const FAVORITES = [
  ['Shree Cyber Zone Intranet', HOME],
  ['Googol!', 'http://google.com/'],
  ['Yahoot!', 'http://yahoo.com/'],
  ['AltaVesta', 'http://altavista.com/'],
  ['Ask Reeves', 'http://askjeeves.com/'],
  ['amazin.com', 'http://amazon.com/'],
  ['eBid', 'http://ebay.com/'],
  ['Reddish.com', 'http://rediff.com/'],
  ['IndiaTimeless', 'http://indiatimes.com/'],
  ['MSNot', 'http://msn.com/'],
  ['America OffLine', 'http://aol.com/'],
  ['GeoCitiez', 'http://geocities.com/'],
  ['NoTMaiL', 'http://hotmail.com/'],
  ['Yahoot! Mail', 'http://mail.yahoo.com/'],
  ['Yahoot! Directory', 'http://dir.yahoo.com/'],
  ['dmozz', 'http://dmoz.org/'],
];
