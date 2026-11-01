// Control Panel essentials (settings.md): Display Properties (A03 SEATS.BMP), Date/Time (E09/E04/E05), Folder Options (D04), Taskbar.
import { createWindow } from '../windowManager.js';
import { messageBox } from '../dialogs.js';
import { icon } from '../icons.js';
import { register, launch } from './index.js';
import { PICS } from '../pictures.js';
import { setWallpaper, store, addLogRow } from './shared.js';
import { setResolution, resolution, RESOLUTIONS } from '../screen.js';
import { showTipAt } from '../taskbar.js';

function tabbed(title, tabs, opts = {}) {
  const body = document.createElement('div');
  body.className = 'propsheet';
  body.innerHTML = `<div class="ps-tabs">${tabs.map((t, i) => `<span class="ps-tab${i ? '' : ' on'}" data-i="${i}">${t.name}</span>`).join('')}</div><div class="ps-page"></div><div class="dlg-btns" style="justify-content:flex-end"><button class="default">OK</button><button>Cancel</button><button>&nbsp;<u>A</u>pply&nbsp;</button></div>`;
  const page = body.querySelector('.ps-page');
  const show = i => { body.querySelectorAll('.ps-tab').forEach(t => t.classList.toggle('on', +t.dataset.i === i)); page.innerHTML = ''; tabs[i].render(page); };
  body.querySelector('.ps-tabs').addEventListener('pointerdown', e => { const t = e.target.closest('.ps-tab'); if (t) show(+t.dataset.i); });
  const w = createWindow({ title, content: body, noIcon: true, help: true, resizable: false, minimizable: false, className: 'dialog', center: true });
  const [ok, cancel, apply] = body.querySelectorAll('.dlg-btns button');
  ok.onclick = () => { opts.apply && opts.apply(); w.close(); };
  cancel.onclick = () => w.close();
  apply.onclick = () => opts.apply && opts.apply();
  show(0);
  return w;
}

/* ---------------- Display Properties ---------------- */
const solid = col => { const c = document.createElement('canvas'); c.width = c.height = 4; const x = c.getContext('2d'); x.fillStyle = col; x.fillRect(0, 0, 4, 4); return c; };
const pattern = (a, b) => { const c = document.createElement('canvas'); c.width = c.height = 8; const x = c.getContext('2d'); x.fillStyle = a; x.fillRect(0, 0, 8, 8); x.fillStyle = b; for (let i = 0; i < 8; i++) x.fillRect((i * 3) % 8, i, 2, 1); return c; };
const WALLS = [
  ['(None)', null], ['Black Thatch', () => pattern('#202020', '#404040')], ['Blue Rivets', () => pattern('#000080', '#4040c0')], ['Bubbles', () => pattern('#008080', '#40c0c0')],
  ['Clouds', () => PICS.clouds ? PICS.clouds() : solid('#5080d0')], ['Forest', () => pattern('#204010', '#407020')], ['Gold Weave', () => pattern('#806000', '#c0a040')],
  ['Honey', () => pattern('#c08000', '#ffc040')], ['Red, White, and Blue', () => pattern('#c00000', '#ffffff')], ['Straw Mat', () => pattern('#b09060', '#d0b080')],
  ['Teal', null], ['Bliss (wallpaper.png)', 'img:wallpaper.png'], ['SEATS.BMP', () => PICS.seats(false)],
];
function applyWall(i, mode) {
  const s = document.getElementById('screen');
  const [name, src] = WALLS[i];
  store.set('wall', i); store.set('wallMode', mode);
  s.classList.remove('seat-fade');
  if (!src) { setWallpaper(null); return; }
  if (typeof src === 'string') { s.style.backgroundImage = `url(${src.slice(4)})`; s.style.backgroundSize = mode === 'Stretch' ? '100% 100%' : 'auto'; s.style.backgroundRepeat = mode === 'Tile' ? 'repeat' : 'no-repeat'; s.style.backgroundPosition = 'center'; return; }
  setWallpaper(src());
  s.style.backgroundSize = mode === 'Stretch' ? '100% 100%' : 'auto';
  s.style.backgroundRepeat = mode === 'Tile' ? 'repeat' : 'no-repeat';
  s.style.backgroundPosition = 'center';
  if (name === 'SEATS.BMP') { s.classList.add('seat-fade'); addLogRow({ dur: 'WALLPAPER SET: SEATS.BMP' }); }
}
export function restoreWallpaper() { const i = store.get('wall', 0); if (i) applyWall(i, store.get('wallMode', 'Stretch')); }

const SCHEMES = ['Windows Standard', 'Brick', 'Desert', 'Eggplant', 'High Contrast Black', 'Lilac', 'Rainy Day', 'Storm', 'Teal (VGA)', 'SEAT'];
register('display', () => {
  let wall = store.get('wall', 0), mode = store.get('wallMode', 'Stretch'), res = resolution(), scheme = 0;
  const monitor = () => `<div class="dp-monitor"><div class="dp-screen" style="background:${wall ? '#204060' : '#008080'}">${WALLS[wall][0] === 'SEATS.BMP' ? '<span>SEATS</span>' : ''}</div></div>`;
  return tabbed('Display Properties', [
    { name: 'Background', render: p => {
      p.innerHTML = `${monitor()}<p style="margin:6px 0 4px">Wallpaper</p><p style="color:#000;margin-bottom:4px">Select an HTML Document or a picture:</p>
        <div class="dp-row"><div class="lv list dp-list">${WALLS.map((w, i) => `<div class="li${i === wall ? ' sel' : ''}" data-i="${i}">${i === WALLS.length - 1 ? '' : `<img src="${icon('imgfile', 16)}" width="16" height="16" alt=""> `}${w[0]}</div>`).join('')}</div>
        <div class="dp-side"><button>Browse...</button><button>Pattern...</button><label>Display:</label><select class="dp-mode">${['Center', 'Tile', 'Stretch'].map(m => `<option${m === mode ? ' selected' : ''}>${m}</option>`).join('')}</select></div></div>`;
      p.querySelector('.dp-list').addEventListener('pointerdown', e => { const li = e.target.closest('.li'); if (!li) return; wall = +li.dataset.i; p.querySelectorAll('.li').forEach(x => x.classList.toggle('sel', x === li)); p.querySelector('.dp-monitor').outerHTML = monitor(); });
      p.querySelector('.dp-mode').onchange = e => { mode = e.target.value; };
    } },
    { name: 'Screen Saver', render: p => { p.innerHTML = `${monitor()}<fieldset><legend>Screen Saver</legend><select><option>Starfield Simulation</option><option>3D Flying Objects</option><option>(None)</option></select> Wait: <input type="text" value="3" style="width:30px"> minutes</fieldset><p>The screen saver does not pause the session.</p>`; } },
    { name: 'Appearance', render: p => {
      p.innerHTML = `<div class="dp-preview"><div class="window" style="position:static"><div class="title-bar"><span class="title-text">Active Window</span></div><div class="window-body" style="background:#fff;height:40px;padding:4px">Window Text</div></div></div>
        <div class="field"><label style="width:60px">Scheme:</label><select class="dp-scheme">${SCHEMES.map((s, i) => `<option value="${i}">${s}</option>`).join('')}</select></div>`;
      p.querySelector('.dp-scheme').onchange = e => { scheme = +e.target.value; };
    } },
    { name: 'Effects', render: p => { p.innerHTML = '<fieldset><legend>Visual effects</legend><label><input type="checkbox"> Use large icons</label><br><label><input type="checkbox"> Show window contents while dragging</label><br><label><input type="checkbox" checked disabled> Show icons using all possible colors</label></fieldset>'; } },
    { name: 'Web', render: p => { p.innerHTML = '<label><input type="checkbox"> View my Active Desktop as a web page</label><div class="lv" style="height:80px;margin-top:6px"><div>[ ] My Current Home Page</div><div>[ ] Cricket Score (98/2)</div></div>'; } },
    { name: 'Settings', render: p => {
      p.innerHTML = `${monitor()}<div class="field"><label style="width:80px">Display:</label><span>Plug and Play Monitor on S3 Trio64V+</span></div>
        <fieldset><legend>Screen area</legend><select class="dp-res">${Object.keys(RESOLUTIONS).map(k => `<option value="${k}"${k === res ? ' selected' : ''}>${k.replace('x', ' by ')} pixels</option>`).join('')}</select></fieldset>
        <fieldset><legend>Colors</legend><select><option>High Color (16 bit)</option><option>16 Colors</option></select></fieldset>`;
      p.querySelector('.dp-res').onchange = e => { res = e.target.value; };
    } },
  ], { apply: async () => {
    applyWall(wall, mode);
    if (res !== resolution()) setResolution(res);
    if (SCHEMES[scheme] === 'SEAT') {
      const s = document.getElementById('screen');
      s.classList.add('seat-scheme');
      await messageBox({ title: 'Display Properties', icon: 'info', text: 'You are already in the chair.' });
      setTimeout(() => s.classList.remove('seat-scheme'), 10000);
    }
  } });
});

/* ---------------- Date/Time (E09, E04, E05) ---------------- */
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
register('datetime', () => {
  const now = new Date();
  let y = now.getFullYear(), m = now.getMonth();
  return tabbed('Date/Time Properties', [
    { name: 'Date & Time', render: p => {
      const draw = () => {
        const first = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate();
        const before = y < 1998 || (y === 1998 && m < 2), after = y >= 2050;
        let cells = '';
        for (let i = 0; i < first; i++) cells += '<i></i>';
        for (let d = 1; d <= days; d++) {
          const hack = y === 2026 && m === 10 && d === 1, today = y === now.getFullYear() && m === now.getMonth() && d === now.getDate();
          cells += `<i class="${today ? 'today' : ''}${hack ? ' hack' : ''}${before || after ? ' grey' : ''}" data-d="${d}">${d}${hack ? '<b>\u2022</b>' : ''}</i>`;
        }
        p.innerHTML = `<div class="dt-wrap"><fieldset><legend>Date</legend><div class="dt-sel"><select class="dt-m">${MONTHS.map((n, i) => `<option value="${i}"${i === m ? ' selected' : ''}>${n}</option>`).join('')}</select><input class="dt-y" type="text" value="${y}" style="width:52px"></div>
          <div class="dt-cal"><div class="dt-head">${'SMTWTFS'.split('').map(c => `<b>${c}</b>`).join('')}</div><div class="dt-days">${cells}</div></div></fieldset>
          <fieldset><legend>Time</legend><div class="dt-clock">${now.toLocaleTimeString('en-US')}</div></fieldset></div>
          <p>Current time zone: (GMT+05:30) Kolkata, Chennai, Mumbai, New Delhi, Bhilai</p>`;
        p.querySelector('.dt-m').onchange = e => { m = +e.target.value; draw(); };
        p.querySelector('.dt-y').onchange = e => { const v = parseInt(e.target.value, 10); if (v > 1900 && v < 2100) { y = v; draw(); } };
        p.querySelector('.dt-days').addEventListener('pointerover', e => {
          const c = e.target.closest('i[data-d]'); if (!c) return;
          const msg = c.classList.contains('hack') ? 'GANDHI HACKATHON \u2014 OPENLAKE \u00d7 MERAZ \u2014 IIT BHILAI' : before ? 'Before the session.' : after ? 'After the plan.' : '';
          if (msg) showTipAt(e.clientX, e.clientY + 18, msg);
        });
      };
      draw();
    } },
    { name: 'Time Zone', render: p => { p.innerHTML = '<select style="width:100%"><option>(GMT+05:30) Bhilai, Kolkata, Chennai, Mumbai, New Delhi</option></select><div class="dt-map">[ world map ]</div><label><input type="checkbox" disabled> Automatically adjust clock for daylight saving changes</label>'; } },
  ]);
});

/* ---------------- Folder Options (D04) ---------------- */
register('folderoptions', () => tabbed('Folder Options', [
  { name: 'General', render: p => { p.innerHTML = '<fieldset><legend>Windows Desktop Update</legend><label class="radio"><input type="radio" name="fo"> Web style</label><label class="radio"><input type="radio" name="fo" checked> Classic style</label><label class="radio"><input type="radio" name="fo"> Custom, based on settings you choose</label></fieldset>'; } },
  { name: 'View', render: p => {
    p.innerHTML = '<p>Advanced settings:</p><div class="lv" style="height:150px;padding:4px"><b>Hidden files</b><br><label class="radio"><input type="radio" name="hf"> Do not show hidden or system files</label><label class="radio"><input type="radio" name="hf" checked> Do not show hidden files</label><label class="radio fo-show"><input type="radio" name="hf"> Show all files</label><br><label><input type="checkbox" checked> Hide file extensions for known file types</label><br><label><input type="checkbox"> Display the full path in title bar</label></div>';
    p.querySelector('.fo-show input').addEventListener('change', e => { const r = e.target.getBoundingClientRect(); showTipAt(r.right, r.bottom + 4, 'Some things hide by choice.'); });
  } },
  { name: 'File Types', render: p => { p.innerHTML = '<div class="lv" style="height:150px">' + ['Text Document (TXT)', 'WordPad Document (DOC)', 'Bitmap Image (BMP)', 'Disk Image (IMG)', 'Excel Worksheet (XLS)', 'Application Extension (DLL)', 'The Chair (PDF)'].map(t => `<div class="li">${t}</div>`).join('') + '</div>'; } },
]));

register('taskbarprops', () => tabbed('Taskbar Properties', [
  { name: 'Taskbar Options', render: p => { p.innerHTML = '<label><input type="checkbox" checked> Always on top</label><br><label><input type="checkbox"> Auto hide</label><br><label><input type="checkbox"> Show small icons in Start menu</label><br><label><input type="checkbox" checked> Show clock</label><p style="margin-top:8px">The taskbar is where it belongs.</p>'; } },
  { name: 'Start Menu Programs', render: p => { p.innerHTML = '<fieldset><legend>Customize Start menu</legend><button disabled>Add...</button> <button disabled>Remove...</button> <button disabled>Advanced...</button></fieldset><fieldset><legend>Documents menu</legend><button>Clear</button> (it will fill again)</fieldset>'; } },
]));

/* ---------------- Control Panel ---------------- */
const APPLETS = [['Accessibility Options', 'app'], ['Add New Hardware', 'computer'], ['Add/Remove Programs', 'programs'], ['Date/Time', 'app', 'datetime'], ['Display', 'computer', 'display'], ['Fonts', 'folder', 'fonts'],
  ['Internet', 'ie'], ['Keyboard', 'app'], ['Modems', 'app'], ['Mouse', 'app'], ['Multimedia', 'media', 'volume'], ['Network', 'network', 'network'], ['Passwords', 'key'], ['Printers', 'printer', 'printq'],
  ['Regional Settings', 'app'], ['Sounds', 'speaker'], ['System', 'computer'], ['Users', 'logoff']];
const NOTES = {
  'Add/Remove Programs': 'Installed:\n  Caf\u00ea Manager 98\n  mIRC 5.7 (cannot be removed)\n  SHREE CYBER ZONE \u2014 Admin (cannot be removed)\n  Microsoft Internet Explorer 4.0',
  Users: 'Users on this machine:\n  GUEST\n  PROPRIETOR\n  SEAT_07 (pending)',
  System: 'Microsoft Windows 98 4.10.2222 A\nRegistered to: GUEST\nPentium II 350 MHz, 64.0 MB RAM\n\nDevice Manager: 1 unknown device (since 1998)',
  Mouse: 'Pointer trails: off\nDouble-click speed: whatever you are used to\n\nThe ball needs cleaning.',
  Keyboard: 'Repeat delay: short\n\nKey not found: \\',
  Modems: 'Standard 56000 bps V90 Modem on COM2\nDiagnostics: More Info... ATI4 -> QUIET ROOM',
  'Regional Settings': 'Locale: English (India)\nCurrency: Rs.\nDate: dd/mm/yyyy',
  Sounds: 'Scheme: Windows Default\nStart Windows: The Microsoft Sound.wav\nExit Windows: (none \u2014 there is no exit)',
  Passwords: 'PC 03 password: set\nHint: the dog',
  'Accessibility Options': 'StickyKeys: off\nThe Quiet Room is accessible to everyone.',
  'Add New Hardware': 'Searching for new hardware...\n\nFound: 1 floppy disk (waiting).',
  Internet: 'Home page: http://shreecyberzone.local/\nConnection: LAN (12 PCs)',
};
register('controlpanel', () => {
  const body = document.createElement('div');
  body.className = 'explorer';
  body.innerHTML = `<div class="fv large">${APPLETS.map(([n, ic]) => `<div class="icon" data-n="${n}"><img src="${icon(ic, 32)}" width="32" height="32" alt=""><span class="label">${n}</span></div>`).join('')}</div><div class="statusbar"><div>${APPLETS.length} object(s)</div></div>`;
  const w = createWindow({ title: 'Control Panel', icon: 'settings', content: body, width: 520, height: 360 });
  body.querySelectorAll('.icon').forEach(el => {
    el.addEventListener('pointerdown', () => body.querySelectorAll('.icon').forEach(x => x.classList.toggle('selected', x === el)));
    el.addEventListener('dblclick', () => {
      const a = APPLETS.find(x => x[0] === el.dataset.n);
      if (a[2] === 'fonts') return launch('explorer', { path: 'C:\\WINDOWS\\Fonts' });
      if (a[2]) return launch(a[2]);
      messageBox({ title: `${a[0]} Properties`, icon: a[1], text: NOTES[a[0]] || 'This item is not available on PC 03.' });
    });
  });
  return w;
});
register('sysprops', () => messageBox({ title: 'System Properties', icon: 'computer', text: NOTES.System }));
