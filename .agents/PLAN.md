# SHREE CYBER ZONE — PC 03 (ADMIN) · Plan index

Pixel-accurate Windows 98 SE desktop in vanilla HTML/CSS/JS (ES modules, no build step).
Story/lore source of truth: `README.md` (story, 15 easter eggs, 4 endings) + `Chatlogs/`.
Run locally: `python -m http.server 8000` then open http://localhost:8000 (`?skipboot` skips boot, `?nofs` disables auto-fullscreen).

| Phase | Scope | Status |
|---|---|---|
| [1-1](PLAN/1-1.md) | Boot, desktop, taskbar, Start menu, window manager, dialogs | done |
| 2-1 | Virtual FS (data/filesystem.json), Explorer, Notepad, hidden C:\BACKROOM$ | done (fast pass) |
| 3-1 | Lore files (+Chatlogs), Café Manager 98, Session Log, Printer Queue trap | done (fast pass) |
| 4-1 | IE, Spreadsheet, Minesweeper, Solitaire, Paint, Media Player, endings, BSOD/shutdown, easter eggs | done (fast pass) |
| 5-1 | Polish vs visual spec, bugs, deployment checklist | done (fast pass) |

## Architecture
- `js/windowManager.js` createWindow(), focus/min/max/close, outline drag+8-edge resize, modal blockers (ding+flash), Alt+Tab, systemMenu.
- `js/menu.js` openMenu(items,x,y,{variant:'plain'|'start'}) — items `{label:'&Open', action, submenu, disabled, bold, checked, sep, icon}`.
- `js/apps/index.js` launch(id,args); real apps call register(id, fn). Unbuilt apps open an empty shell.
- `js/startMenu.js` onRun(hook) lets later steps add Run-box easter eggs.
- `js/icons.js` icon(name,size,kind) — canvas pixel art, 16-colour palette; kind 'lnk'/'sel'.
- `js/desktop.js` addIcon() for runtime icons (PROPRIETOR).

## Step 3+4 (js/apps/extras.js)
Cafe Manager, Session Log (fs.onOpen), Printer Queue + print trap -> PROPRIETOR icon, Paint (procedural pictures + sticky note: password TOMMY), Spreadsheet, IE (home/rates/email/update/dark/gandhi), Minesweeper (xyzzy), Display Properties (SEATS.BMP), Help, Shut Down (SAFE/standby/MS-DOS/restart), BSOD (Run 2050), GUEST ending, SHRED ending, Run eggs (tommy/2050/gandhi/help/eipstein), clock x5, Konami, tray TV 98/2, recycle restore x3.
Not done: Solitaire, Media Player, docs/ egg catalogue beyond README 15.
