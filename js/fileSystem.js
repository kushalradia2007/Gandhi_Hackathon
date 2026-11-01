// Virtual file system backed by data/filesystem.json. Paths are DOS-style, case-insensitive.
let root = null;
const openSubs = new Set();
/** Session Log (step 3) listens here: fn(node, path) */
export const onOpen = fn => openSubs.add(fn);
export const emitOpen = node => openSubs.forEach(fn => fn(node, pathOf(node)));

const pad = n => String(n).padStart(2, '0');
export function todayStamp() {
  const d = new Date();
  return { iso: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`, short: `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${String(d.getFullYear()).slice(2)}` };
}

export async function loadFS() {
  const t = todayStamp();
  const txt = (await (await fetch('data/filesystem.json')).text()).replaceAll('{TODAYSHORT}', t.short).replaceAll('{TODAY}', t.iso);
  root = JSON.parse(txt);
  const link = (n, parent) => { n.parent = parent; (n.children || []).forEach(c => link(c, n)); };
  link(root, null);
  // optional fragments contributed by other docs (games.md file tree)
  for (const frag of ['data/fs_games.json']) {
    try {
      const r = await fetch(frag);
      if (!r.ok) continue;
      const j = JSON.parse((await r.text()).replaceAll('{TODAYSHORT}', t.short).replaceAll('{TODAY}', t.iso));
      for (const [path, nodes] of Object.entries(j)) {
        let p = resolve(path);
        if (!p) { // create missing parent folders
          const segs = path.replace(/\\+$/, '').split('\\');
          p = resolve(segs[0]);
          for (const s of segs.slice(1)) { let c = (p.children || []).find(x => x.name.toLowerCase() === s.toLowerCase()); if (!c) { c = { name: s, type: 'folder', date: '03/03/98 03:14 AM', children: [], parent: p }; (p.children = p.children || []).push(c); } p = c; }
        }
        p.children = p.children || [];
        for (const n of nodes) { if (!p.children.some(c => c.name.toLowerCase() === n.name.toLowerCase())) { p.children.push(n); link(n, p); } }
      }
    } catch (e) { console.warn('fragment', frag, e); }
  }
  return root;
}
export const getRoot = () => root;

export function pathOf(n) {
  if (!n || n === root) return 'My Computer';
  if (n.type === 'drive') return n.letter + '\\';
  const parts = [];
  for (let x = n; x && x.type !== 'drive' && x !== root; x = x.parent) parts.unshift(x.name);
  let drive = n; while (drive && drive.type !== 'drive') drive = drive.parent;
  return (drive ? drive.letter + '\\' : '') + parts.join('\\');
}

/** "C:\backroom$\tuesdays", "c:", "My Computer" -> node | null (hidden nodes resolve: that's the point) */
export function resolve(path) {
  const p = path.trim().replace(/\//g, '\\').replace(/\\+$/, '');
  if (!p || /^my computer$/i.test(p)) return root;
  if (/^my documents$/i.test(p)) return resolve('C:\\My Documents');
  if (/^recycle bin$/i.test(p) || /^c:\\recycle bin$/i.test(p)) return resolve('C:\\RECYCLED');
  if (/^desktop$/i.test(p)) return resolve('C:\\WINDOWS\\Desktop');
  const segs = p.split('\\').filter(Boolean);
  let n = root.children.find(c => c.letter && c.letter.toLowerCase() === segs[0].toLowerCase());
  if (!n && segs.length === 1) n = root.children.find(c => c.name.toLowerCase() === segs[0].toLowerCase());
  for (let i = 1; n && i < segs.length; i++) n = (n.children || []).find(c => c.name.toLowerCase() === segs[i].toLowerCase());
  return n || null;
}

export function children(n, showHidden = false) {
  const kids = (n.children || []).filter(c => (showHidden || !c.hidden) && (!c.hiddenUntilLogs || (window.__logsRead || 0) >= 5));
  const rank = c => (c.type === 'drive' ? 0 : c.type === 'folder' || c.type === 'computer' ? 1 : 2);
  return n === root ? kids : kids.slice().sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name));
}
export const hiddenCount = n => (n.children || []).filter(c => c.hidden).length;
export const isContainer = n => n.type === 'folder' || n.type === 'drive' || n.type === 'computer';
export const ext = n => (/\.([^.]+)$/.exec(n.name) || [, ''])[1].toLowerCase();

export function iconFor(n) {
  if (n.icon) return n.icon;
  if (isContainer(n)) return 'folder';
  if (n.app) return 'app';
  return ({ txt: 'txtfile', log: 'txtfile', ini: 'sysfile', sys: 'sysfile', bat: 'sysfile', dll: 'sysfile', doc: 'docfile', jpg: 'imgfile', bmp: 'imgfile', png: 'imgfile', xls: 'xlsfile', pdf: 'pdffile', img: 'imgfile', wav: 'media', exe: 'app', csv: 'xlsfile' })[ext(n)] || 'file';
}

export function typeName(n) {
  if (n.type === 'drive') return n.icon === 'floppy' ? '3½ Inch Floppy Disk' : n.icon === 'cdrom' ? 'CD-ROM Disc' : 'Local Disk';
  if (isContainer(n)) return 'File Folder';
  return ({ txt: 'Text Document', log: 'Text Document', doc: 'WordPad Document', jpg: 'JPEG Image', bmp: 'Bitmap Image', png: 'PNG Image', xls: 'Microsoft Excel Worksheet', csv: 'Microsoft Excel Comma Separated Values File', exe: 'Application', ini: 'Configuration Settings', sys: 'System file', dll: 'Application Extension', bat: 'MS-DOS Batch File', pdf: 'Adobe Acrobat Document', img: 'Disk Image', wav: 'Wave Sound' })[ext(n)] || 'File';
}

export const sizeKB = n => (n.size == null ? '' : Math.max(n.size ? 1 : 0, Math.ceil(n.size / 1024)).toLocaleString('en-US') + 'KB');

export async function readText(n) {
  if (n.content != null) return n.content;
  if (!n.src) return '';
  const r = await fetch('data/' + n.src);
  n.content = r.ok ? await r.text() : '';
  return n.content;
}
