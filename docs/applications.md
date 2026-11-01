# applications.md

> **Project:** SHREE CYBER ZONE — PC 03 (ADMIN)
> **For:** Gandhi Hackathon 2026 · OpenLake × Meraz · IIT Bhilai · 1st November 2026
> **Document status:** LOCKED · App-by-app build specs · Build-ready
> **Rule:** Every app must feel like 1998 software. Every app must serve the story. No filler apps.

---

## 0. How to Read This Document

This document specifies every **application** the build must ship, in build order. Each app has:

| Field | Meaning |
|---|---|
| **Priority** | `P0` (must ship), `P1` (strongly recommended), `P2` (polish) |
| **Purpose** | What the app does for the story |
| **Layout** | Window anatomy, menus, status bar |
| **Behavior** | What the app does, interaction by interaction |
| **Data** | Files or state it reads/writes |
| **Eggs** | Easter eggs it triggers or hosts |
| **Build** | Implementation notes, time estimate |

**Scope boundary:** This document covers app **shells** and **behavior**. Content lives in companion docs:
- **Game content** → `games.md`
- **Website content** → `websites.md`
- **Chat/email content** → `chats_and_emails.md`
- **File content** → `docs_and_files.md`
- **Settings** → `settings.md`
- **Shell-level features** (taskbar, Start Menu, dialogs) → `features.md`

---

## 1. Application Inventory

| # | App | Priority | Purpose | Build time |
|---|---|---|---|---|
| 1 | **Notepad** | P0 | 80% of lore is read here | 45 min |
| 2 | **Explorer** | P0 | The path to `C:\BACKROOM$` | 90 min |
| 3 | **Internet Explorer** | P1 | Intranet homepage + dark page | 60 min |
| 4 | **Cafê Manager 98** | P0 | The "normal business" layer | 60 min |
| 5 | **Session Log** | P0 | The main storytelling device | 45 min |
| 6 | **Printer Queue** | P1 | The trap | 45 min |
| 7 | **Spreadsheet** | P1 | Renders `LEDGER_98.XLS`, `DELAY_LEDGER.XLS` | 60 min |
| 8 | **mIRC 5.7** | P0 | The canonical ending | 90 min |
| 9 | **Paint** | P2 | Sticky note + `SEATS.BMP` | 45 min |
| 10 | **Media Player** | P2 | Fake waveform + captions | 30 min |
| 11 | **Calculator** | P2 | Comedy filler | 20 min |
| 12 | **Find** | P1 | Discovery tool | 30 min |
| 13 | **BSOD** | P0 | The cinematic moment | 15 min |
| 14 | **Shut Down** | P0 | The SAFE ending | 20 min |

**Total estimated: ~10.5 hours.** This is the full app layer. Cut P2 apps first if time runs short.

---

## 2. Notepad

### 2.1 Purpose

Notepad is the **primary reading surface** of the entire game. Most lore files (`.txt`, `.doc`, `.log`) open here. It must feel like the real Notepad — sparse, monospace, no-frills — because the story is told through plain text.

### 2.2 Priority

**P0.** If Notepad doesn't work, the game has no story.

### 2.3 Window Layout

```
┌─────────────────────────────────────────────────┐
│ [notepad icon] rates_1998.doc      [_] [□] [X]  │
├─────────────────────────────────────────────────┤
│ File  Edit  Search  Help                        │
├─────────────────────────────────────────────────┤
│                                                 │
│  SHREE CYBER ZONE                               │
│  Nehru Nagar, Bhilai                            │
│                                                 │
│  RATES                                          │
│  ₹10 per hour (regular)                         │
│  ...                                            │
│                                                 │
├─────────────────────────────────────────────────┤
│ Ln 1, Col 1                             100%    │
└─────────────────────────────────────────────────┘
```

### 2.4 Menus

| Menu | Items |
|---|---|
| **File** | New, Open..., Save, Save As..., Page Setup..., Print..., Exit |
| **Edit** | Undo, Cut, Copy, Paste, Delete, Select All, Time/Date |
| **Search** | Find..., Find Next |
| **Help** | Help Topics, About Notepad |

**Rule:** Only `Open`, `Exit`, `Find`, `Select All`, `Copy`, and `About Notepad` need to work. Others can be visual-only with a "not implemented" dialog.

**Exception:** `Print` on `LEDGER_98.XLS` triggers G01 (real browser print). For `.txt` files, `Print` shows a fake print dialog that does nothing.

### 2.5 Behavior

- **Font:** `Fixedsys` (or `Courier New` fallback), 12px, monospace
- **Line height:** 18px
- **Background:** `#FFFFFF` white
- **Text:** `#000000` black
- **Word wrap:** ON for `.doc` files, OFF for `.txt` and `.log` files (adds horizontal scrollbar)
- **Status bar:** `Ln X, Col Y` updates live with cursor. Right side: `100%`.
- **Read-only mode:** Lore files are read-only. Attempting to type shows a dialog: `Cannot edit — this file is read-only.` Alternatively, allow typing but do not save (silent).
- **Title bar:** Shows the filename. If the file has unsaved changes (not applicable — all read-only), shows `*`.

### 2.6 File Opening

When the player opens a file from Explorer or the desktop:
- If `.txt`, `.doc`, `.log`, `.ini`, `.csv` → opens in Notepad
- If `.bmp`, `.jpg`, `.png` → opens in Paint
- If `.xls` → opens in Spreadsheet
- If `.img` → shows a special viewer (see section 12)

### 2.7 Special Notepad Behavior

| File | Special behavior |
|---|---|
| `THE_PLAYER.DOC` | Cannot be closed for 30 seconds (egg E10). A line appears at bottom: `"Read it. — s00"` |
| `BHAIYA_NOTE.txt` | Cannot be closed until scrolled to bottom. `X` does nothing until scrollBottom is true. |
| `TECH_CAMERA.DOC` | Contains a live-updating timestamp at the bottom: `This file was opened by you at [HH:MM:SS].` Updates every second (egg H04) |
| `TECH_WEATHER.DOC` | Hover over the word "honest" shows a tooltip: `Even this.` (egg H05) |
| `judges_note.txt` | On 2026-11-01, shows: `You are the [N]th judge to open this file today.` N from localStorage. (egg F04) |
| `2026-11-01.IMG` | See section 12 (special viewer) |

### 2.8 About Notepad Dialog

Clicking `Help → About Notepad`:

```
┌─────────────────────────────────────────┐
│ [notepad icon] About Notepad     [X]    │
├─────────────────────────────────────────┤
│  Microsoft Windows 98                   │
│  Copyright © 1981-1998 Microsoft Corp.  │
│                                         │
│  This product is licensed to:           │
│    GUEST                                │
│    SHREE CYBER ZONE, Bhilai             │
│                                         │
│  Physical memory available: 65,536 KB   │
│                                         │
│              [ OK ]                     │
└─────────────────────────────────────────┘
```

**Egg potential:** The "licensed to: GUEST" line is a quiet acknowledgment. Every file the player opens carries that name.

### 2.9 Build Notes

- **Do:** Use real `<textarea>` for editing (even read-only). It gives authentic cursor behavior, selection, and scrolling.
- **Do:** Read file content from the virtual filesystem, not from network requests.
- **Don't:** Use syntax highlighting. Notepad has none.
- **Don't:** Add line numbers. Notepad has none.
- **Don't:** Add word count or spell check. Notepad has none.
- **Priority of features:** Open > Scroll > Status bar > Menus > Print > About.

**Estimated: 45 min.**

---

## 3. Explorer

### 3.1 Purpose

Explorer is how the player navigates the filesystem. It is also **the door to `C:\BACKROOM$`** — the single most important discovery mechanic in the game.

### 3.2 Priority

**P0.** Without Explorer, there is no backroom. Without backroom, there is no game.

### 3.3 Window Layout

```
┌─────────────────────────────────────────────────────────────┐
│ [folder icon] C:\My Documents                [_] [□] [X]    │
├─────────────────────────────────────────────────────────────┤
│ File  Edit  View  Go  Favorites  Help                       │
├─────────────────────────────────────────────────────────────┤
│ Back  Forward  Up   [C:\My Documents_____________]  Go      │
├─────────────────────────────────────────────────────────────┤
│ ┌────────────┐ ┌──────────────────────────────────────────┐ │
│ │ All Folders│ │  Name          | Type    | Size | Modified│ │
│ │ ─────────  │ │ ─────────────────────────────────────────│ │
│ │  Desktop   │ │  📄 rates_1998.doc  DOC   2 KB   3/3/98  │ │
│ │  My Comp.  │ │  🖼 tommy.jpg      JPG   48 KB  3/3/98   │ │
│ │  C:\       │ │  📄 complaint...   TXT   1 KB   5/7/98   │ │
│ │   My Doc.. │ │  🖼 bhaiya_1998..  JPG   128 KB 3/3/98   │ │
│ │   Program..│ │                                           │ │
│ │   Windows  │ │                                           │ │
│ └────────────┘ └──────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ 4 object(s)                                       154 KB    │
└─────────────────────────────────────────────────────────────┘
```

### 3.4 Menus

| Menu | Items |
|---|---|
| **File** | Open, Explore, Find..., Send To, New, Create Shortcut, Delete, Rename, Properties, Close |
| **Edit** | Undo, Cut, Copy, Paste, Paste Shortcut, Select All, Invert Selection |
| **View** | Toolbars ►, Status Bar, as Web Page, Large Icons, Small Icons, List, Details, Arrange Icons ►, Line up Icons, Refresh |
| **Go** | Back, Forward, Up One Level, Home Page, Folder Options... |
| **Favorites** | Add to Favorites..., SHREE CYBER ZONE Homepage |
| **Help** | Help Topics, About Windows |

**Rule:** Only `Open`, `Back`, `Forward`, `Up One Level`, `Delete`, `Properties`, `Details`, `Large Icons`, and `Refresh` need to work. Everything else can be visual or open a not-implemented dialog.

### 3.5 The Address Bar

**This is the most important element of the entire game.**

The address bar accepts:
- File paths: `C:\`, `C:\My Documents`, `C:\WINDOWS`
- Hidden paths: `C:\BACKROOM$`, `C:\BACKROOM$\TECH`, `C:\BACKROOM$\chatlogs`, `C:\BACKROOM$\Tuesdays`
- Special paths: `Desktop`, `My Computer`, `Recycle Bin`

**Behavior:**
- Press `Enter` or click `Go`
- If path exists → navigate
- If path doesn't exist → show dialog:

```
Cannot find the file 'C:\FOO' (or one of its components).
Make sure the path and filename are correct and that all
required libraries are available.

[ OK ]
```

**Autocomplete:** DO NOT add autocomplete. It would defeat the puzzle. The player must **type** `C:\BACKROOM$` exactly. This is the whole point.

**Dropdown arrow:** The address bar has a dropdown arrow on the right showing recent paths. **This dropdown must NOT contain `C:\BACKROOM$` unless the player has already navigated there.** Otherwise the puzzle is spoiled.

### 3.6 Navigation Pane (Left)

A tree view of the filesystem:

```
Desktop
├─ My Computer
│  ├─ 3½ Floppy (A:)
│  ├─ (C:)
│  │  ├─ My Documents
│  │  ├─ Program Files
│  │  ├─ WINDOWS
│  │  └─ (BACKROOM$ — hidden)
│  └─ (D:)
├─ My Documents
├─ Internet Explorer
├─ Network Neighborhood
└─ Recycle Bin
```

**Rule:** `BACKROOM$` does NOT appear in the tree by default. It appears only after the player has navigated to it once via address bar (persisted in localStorage).

**This is critical.** The puzzle is: "type the path to find it." Once found, it appears in the tree — rewarding the player with a permanent shortcut.

### 3.7 Content Pane (Right)

**View modes:**

| Mode | Behavior |
|---|---|
| **Large Icons** (default) | 32×32 icons in a grid, 75px cell |
| **Small Icons** | 16×16 icons in a row, name to the right |
| **List** | 16×16 icons in a single column, name to the right |
| **Details** | Rows with columns: Name, Size, Type, Modified |

**Default view:** Large Icons.

**Columns (Details view):**
- Name: file/folder name
- Size: `2 KB` for files, blank for folders
- Type: `Text Document`, `Bitmap Image`, `Folder`, `Shortcut`, etc.
- Modified: `3/3/98 3:14 AM` — this is a canonical date for most files. **Use consistent dates to reinforce 1998.**

**File dates:**

| File | Date | Why |
|---|---|---|
| `rates_1998.doc` | `3/3/98 10:00 AM` | Opening day |
| `tommy.jpg` | `3/3/98 10:14 AM` | Opening day |
| `bhaiya_1998.jpg` | `3/3/98 10:30 AM` | Opening day |
| `complaint_letter.txt` | `5/7/98 2:15 PM` | An ordinary day |
| All `C:\BACKROOM$` files | `3/3/98 3:14 AM` | The first Tuesday |
| `2026-11-01.IMG` | `11/1/26 3:14 AM` | **Today** — this must stand out |

**The date `3/3/98 3:14 AM` is a repeating motif.** It appears in the session log, in file timestamps, and (subtly) in the boot sequence. It is the moment the session started. Do not explain it.

### 3.8 File Open Behavior

| File type | Opens in |
|---|---|
| `.txt`, `.doc`, `.log`, `.ini`, `.csv` | Notepad |
| `.bmp`, `.jpg`, `.png` | Paint |
| `.xls` | Spreadsheet |
| `.img` | Special IMG viewer |
| `.pdf` (in Recycle Bin) | Dialog: `Cannot open: file is corrupted.` |

### 3.9 Special Behaviors

| Behavior | Trigger | Result |
|---|---|---|
| Hidden folder reveal | Type `C:\BACKROOM$` in address bar | Opens folder, adds it to tree (persisted) |
| Create new folder | File → New → Folder | New folder is auto-named `SEAT_07`. Cannot rename, cannot delete. (egg D05) |
| Folder Options | View → Folder Options | Shows "Show hidden files" option. Checking it does nothing — `BACKROOM$` remains hidden. Tooltip: `Some things hide by choice.` (egg D04) |
| Recycle Bin restore | Right-click `do_not_shred.pdf` → Restore | "Restored." File goes back to... the Recycle Bin. Three times. Fourth time, the Restore button does nothing. (egg D02) |
| Recycle Bin empty | Right-click → Empty Recycle Bin | If Ledger is open → Ending 3 (SHRED). Otherwise → `for_you.txt` appears on desktop. (eggs D03, H07) |
| Properties | Right-click file → Properties | Shows a Win98 properties dialog. For `EIPSTEIN.DOC`, Owner: `—`, Location: `—`, Status: `WAITING`. For `LEDGER_98.XLS`, Owner: `PROPRIETOR`. |

### 3.10 Address Bar Easter Eggs

Typing these paths does things beyond navigation:

| Path | Result |
|---|---|
| `C:\BACKROOM$` | Opens the hidden folder (core mechanic) |
| `C:\WINDOWS\quiet.dll` | File exists. 0 bytes. Read-only. Click → `Cannot open: access denied.` (egg D06) |
| `A:\` | Dialog: `A:\ is not accessible. The device is not ready.` |
| `D:\` | Dialog: `D:\ is not accessible. The device is not ready.` |
| `http://www.shreecyberzone.com` | Launches IE with the intranet homepage |
| `tommy` | Opens `C:\My Documents\tommy.jpg` (path without drive) |
| `..` | Goes up one level |

### 3.11 Build Notes

- **Do:** Read filesystem from `data/filesystem.json`. Never fetch file content from the server.
- **Do:** Persist visited paths (`BACKROOM$`) in `localStorage`.
- **Do:** Make `C:\BACKROOM$` look like a **normal folder** — 1998 Explorer did not shout "hidden." The discovery is quieter that way.
- **Don't:** Add breadcrumbs. Explorer 98 had no breadcrumbs.
- **Don't:** Add a search-in-folder box. Use Find for that.
- **Don't:** Show a "recent locations" dropdown until the player has visited those locations.
- **Priority:** Navigate > Address bar > Open file > Details view > Recycle Bin > Create folder > Folder Options.

**Estimated: 90 min.**

---

## 4. Internet Explorer

### 4.1 Purpose

Internet Explorer is a **second storytelling surface**. The intranet homepage grounds the café in 1998. The hidden "dark page" provides another path into the story, plus a place for satirical fake-web content.

**Website content lives in `websites.md`.** This section covers the **IE application shell**.

### 4.2 Priority

**P1.** Strongly recommended. If skipped, the story still works — but the build loses a major 1998 texture.

### 4.3 Window Layout

```
┌─────────────────────────────────────────────────────────┐
│ [IE icon] SHREE CYBER ZONE Homepage        [_] [□] [X]  │
├─────────────────────────────────────────────────────────┤
│ File  Edit  View  Go  Favorites  Help                   │
├─────────────────────────────────────────────────────────┤
│ Back  Forward  Stop  Refresh  Home  Search  Favorites  │
│ Address: [http://shreecyberzone.local/_______]  Go      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│            [page content renders here]                  │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ Done                                            🌐      │
└─────────────────────────────────────────────────────────┘
```

### 4.4 Toolbar

| Button | Behavior |
|---|---|
| Back | Go to previous page |
| Forward | Go to next page |
| Stop | (visual only, or stops "loading") |
| Refresh | Reload current page |
| Home | Go to homepage (`http://shreecyberzone.local/`) |
| Search | Opens a fake search page |
| Favorites | Opens a fake favorites panel |

**Rule:** Only `Back`, `Forward`, `Home`, and `Refresh` need to work.

### 4.5 Address Bar

- Accepts URLs
- URL format: `http://shreecyberzone.local/<path>`
- No real internet access
- All URLs resolve within a virtual site map

**Special URLs:**
| URL | Page |
|---|---|
| `http://shreecyberzone.local/` | Intranet homepage (see `websites.md`) |
| `http://shreecyberzone.local/rates` | Rates page |
| `http://shreecyberzone.local/backroom` | "Dark page" — hidden from the homepage, only reachable by typing the URL |
| `http://shreecyberzone.local/2050` | A page that shows `PLAN STILL ON SCHEDULE` |
| `http://google.com` | Fake Google homepage (see `websites.md`) |
| `http://amazon.com` | Fake Amazon 1998 (see `websites.md`) |
| `http://geocities.com/...` | Fake GeoCities page |
| `http://quiet.room` | A blank page with one line: `we know.` |

### 4.6 Status Bar

- Left side: `Done` (or `Opening page...` during load)
- Right side: a small globe icon (static)

### 4.7 Fake Loading Behavior

When navigating to a page:
- Status bar shows `Opening page...`
- A small spinner in the top-right (the IE 98 "e" spinning)
- After 200–800ms, the page renders
- Status bar shows `Done`

**Rule:** Never let loading exceed 1 second. This is 1998 on a LAN, not dial-up. (Dial-up loading is reserved for `chats_and_emails.md`.)

### 4.8 Rendering Rules

- **Font:** Times New Roman for body, Arial for headings, Courier for preformatted
- **Background:** `#FFFFFF` or textured `#C0C0C0` (the classic "grey pebble" style)
- **Links:** `#0000FF` underlined, visited `#800080`
- **No CSS3, no rounded corners, no gradients, no shadows** — this is an IE4/IE5 era page
- **Layouts:** `<table>`-based. Yes, this means using tables in your HTML for authentic feel.
- **Images:** Pixelated, 16-color, GIF or JPG

### 4.9 Special Pages

See `websites.md` for full content. Here is the trigger list:

| Page | Trigger | Egg ID |
|---|---|---|
| Homepage | Home button or `http://shreecyberzone.local/` | — |
| `backroom` | Type URL | — |
| `2050` | Type URL | — |
| `quiet.room` | Type URL | — |
| `google.com` | Type URL | — |
| `amazon.com` | Type URL | — |

### 4.10 Build Notes

- **Do:** Use `<iframe>` with `srcdoc` to render pages, or a dedicated component tree. Both work.
- **Do:** Persist browsing history for Back/Forward buttons.
- **Do:** Fake the loading spinner — authenticity beats instant render.
- **Don't:** Allow real external URLs. All URLs are virtual.
- **Don't:** Use modern HTML/CSS for pages. Force 90s-feeling layouts.
- **Priority:** Homepage > Back/Forward > Address bar > Dark page > 2050 > quiet.room.

**Estimated: 60 min** (shell only — content is in `websites.md`).

---

## 5. Cafê Manager 98

### 5.1 Purpose

**Cafê Manager 98** is the "normal business" application. It shows the 12 PCs on the café floor with live session status and billing. It **grounds the machine in its reality** — this is a working admin terminal, not just a lore museum. It also carries the print-bill trap (G03).

### 5.2 Priority

**P0.** The manager IS the admin. Without it, the machine doesn't make sense as an admin terminal.

### 5.3 Window Layout

```
┌──────────────────────────────────────────────────────────────┐
│ [monitor] Cafê Manager 98                     [_] [□] [X]    │
├──────────────────────────────────────────────────────────────┤
│ Session  PCs  Reports  Help                                  │
├──────────────────────────────────────────────────────────────┤
│ SHREE CYBER ZONE — ADMIN — PC 03                             │
│ Sunday, 01 November 2026 · 3:14 AM                           │
│                                                              │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │
│ │ PC 01        │ │ PC 02        │ │ PC 03 (ADMIN)│           │
│ │ ● ACTIVE     │ │ ● ACTIVE     │ │ ● STILL      │           │
│ │ 12:34:56     │ │ 00:12:04     │ │   RUNNING    │           │
│ │ ₹12.60       │ │ ₹2.01        │ │ 10224 days   │           │
│ └──────────────┘ └──────────────┘ └──────────────┘           │
│                                                              │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │
│ │ PC 04        │ │ PC 05        │ │ PC 06        │           │
│ │ ● ACTIVE     │ │ ○ EMPTY      │ │ ● ACTIVE     │           │
│ │ ...          │ │              │ │ ...          │           │
│ └──────────────┘ └──────────────┘ └──────────────┘           │
│                                                              │
│ ... (12 total)                                               │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ 12 PCs · 8 active · 3 empty · 1 still running                │
└──────────────────────────────────────────────────────────────┘
```

### 5.4 PC Tile Design

Each tile: **160×80px**, grey `#C0C0C0` background, sunken bevel.

**Content:**
- Title: `PC 01` through `PC 12`, 11px bold black
- Status dot: green `#00AA00` (ACTIVE), red `#AA0000` (STILL RUNNING), grey `#808080` (EMPTY)
- Status text: `ACTIVE`, `EMPTY`, `STILL RUNNING`
- Timer: `HH:MM:SS` format, updating live
- Bill: `₹XX.XX` format

### 5.5 PC States

| PC | State | Timer | Bill |
|---|---|---|---|
| PC 01 | ACTIVE | live | live |
| PC 02 | ACTIVE | live | live |
| PC 03 (ADMIN) | **STILL RUNNING** | `10224 days` | `₹∞` or `₹—` |
| PC 04 | ACTIVE | live | live |
| PC 05 | EMPTY | `00:00:00` | `₹0.00` |
| PC 06 | ACTIVE | live | live |
| PC 07 | ACTIVE | live | live |
| PC 08 | EMPTY | `00:00:00` | `₹0.00` |
| PC 09 | ACTIVE | live | live |
| PC 10 | EMPTY | `00:00:00` | `₹0.00` |
| PC 11 | ACTIVE | live | live |
| PC 12 | ACTIVE | live | live |

**Rule:** Only PC 03 matters to the story, but the other PCs must feel alive. Use `setInterval` to update their timers.

### 5.6 Interactions

| Interaction | Result |
|---|---|
| Click a PC tile | Highlights the tile, shows a side panel with "Start Session" / "End Session" buttons |
| Right-click a PC | Context menu: Start Session, End Session, Print Bill, Properties |
| End Session on any PC | Dialog: `End session on PC 05?` → Yes → PC becomes EMPTY, timer resets |
| End Session on PC 03 | Dialog: `Enter admin password:` → Wrong password → `Access denied.` (you don't have it) |
| Print Bill on any PC | Fake print dialog → print → for PC 12, triggers **G03** (jam trap) |
| PCs menu → Refresh | Refreshes all tiles (visual only, since timers are live) |

### 5.7 The Print Trap (G03)

**The biggest P1 egg lives here.**

Trigger: `Right-click PC 12 → Print Bill` OR `PC 12 tile → Print Bill button`.

Sequence:
1. Fake print dialog opens (styled like Win98). Title: `Print`.
2. Player clicks `OK`.
3. **Stage 1:** Printer icon in the dialog spins. Status: `Printing...`
4. **Stage 2 (after 2s):** Printer icon stops. Status: `Paper jam.`
5. **Stage 3 (after 1s):** Screen glitches for 300ms (CSS glitch effect or `filter: invert(1)` toggle).
6. **Stage 4:** Wallpaper **changes to a photo of the café counter at night**. (Prepare a PNG asset — a dim, grainy photo of a counter, a CRT, a chair. No people.)
7. **Stage 5:** A new desktop icon appears: `PROPRIETOR`. The dialog closes.
8. **Stage 6 (after 5s):** Wallpaper reverts to teal (unless the player has opened PROPRIETOR).

**Rule:** This is a one-time event per session. If the player triggers it twice, it just shows the jam (no glitch, no wallpaper, no icon).

### 5.8 Status Bar

`12 PCs · 8 active · 3 empty · 1 still running`

Updates live if the player ends/starts sessions.

### 5.9 Build Notes

- **Do:** Use a CSS grid for the tiles.
- **Do:** Update timers with a single `setInterval` (1 per second for all tiles).
- **Do:** Make PC 03's tile subtly different — bigger, or a border, or its own status line.
- **Don't:** Make the tiles interactive on the whole tile. Only a specific "click target" (the title area) opens the side panel.
- **Don't:** Show a cost calculation formula. Just `₹` amounts that tick up. Nobody does math.
- **Priority:** Tile layout > Timers > PC 03 status > Print trap > End session dialogs.

**Estimated: 60 min.**

---

## 6. Session Log

### 6.1 Purpose

**Session Log is the main storytelling device.** It is the file that tells the player they are not alone. It is the first weird signal (Eipstein, STILL RUNNING), it grows in real time, and it records the player's own actions under `GUEST`.

### 6.2 Priority

**P0.** Without the Session Log, there is no hook.

### 6.3 Window Layout

```
┌──────────────────────────────────────────────────────────────┐
│ [list] Session Log                             [_] [□] [X]   │
├──────────────────────────────────────────────────────────────┤
│ File  Edit  View  Help                                       │
├──────────────────────────────────────────────────────────────┤
│ Date       | Time     | Customer     | PC    | Duration       │
│ ────────────────────────────────────────────────────────────  │
│ 03/03/1998 | 03:14 AM | MR. EIPSTEIN | PC 03 | STILL RUNNING  │
│ 03/03/1998 | 10:00 AM | WALK-IN      | PC 05 | 01:00:00       │
│ 03/03/1998 | 11:30 AM | WALK-IN      | PC 02 | 02:15:00       │
│ ... (filler) ...                                             │
│ 07/05/1998 | 02:15 PM | GUEST        | PC 01 | 00:45:00       │
│ ... (filler) ...                                             │
│ 01/11/2026 | 03:14 AM | GUEST        | PC 03 | SESSION ACTIVE │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ 284 entries                                                   │
└──────────────────────────────────────────────────────────────┘
```

### 6.4 Columns

| Column | Width | Content |
|---|---|---|
| Date | 100px | `DD/MM/YYYY` |
| Time | 80px | `HH:MM AM/PM` |
| Customer | 160px | Name or `GUEST` or `WALK-IN` |
| PC | 80px | `PC 01` through `PC 12` |
| Duration | 180px | `HH:MM:SS` or `STILL RUNNING` or `SESSION ACTIVE` |

**Row height:** 18px. **Font:** 11px MS Sans Serif (not monospace — the original log was in a spreadsheet-like table).

### 6.5 Data Generation

**Filler rows:** Generate 280 filler rows with random but plausible 1998 dates, times, customers, and PCs. Customers should be:
- `WALK-IN` (70%)
- Random names (`RAHUL`, `PRIYA`, `VIKRAM`, `ANJALI`, `ARJUN`, `KAVITA`, `SANJAY`, `NEHA`, `RAVI`, `DEEPA`)
- `GUEST` (5%)

**Specific rows (canonical, in order):**

| Row | Position | Date | Time | Customer | PC | Duration |
|---|---|---|---|---|---|---|
| **Row 1** | Top of log | `03/03/1998` | `03:14 AM` | `MR. EIPSTEIN` | `PC 03` | `STILL RUNNING` |
| **Row N-1** | Bottom (before player's row) | varies | varies | `GUEST` | `PC 03` | varies |
| **Last row** | Bottom, injected on first open | `[today]` | `[now]` | `GUEST` | `PC 03` | `SESSION ACTIVE` |

**Rule:** Row 1 must be sorted differently from the rest. Real logs are usually sorted oldest-first — but this log's first row (Eipstein, `STILL RUNNING`) needs to be seen. Consider:
- **Option A:** Sort by date descending (newest first). Then Eipstein's row is at the *bottom* — hidden below 280 rows. But then the player must scroll to find it. Good reveal.
- **Option B:** Sort by date ascending (oldest first). Eipstein's row is at the *top* — immediately visible. Simpler.

**Recommended:** **Option B** (ascending). The player opens the Session Log and sees Eipstein's row at the very top. The `STILL RUNNING` duration is impossible to miss. The player has to scroll *down* through 28 years of sessions to find the bottom — where their own row appears.

**The scroll journey is the story.** 28 years = 280 rows. The player scrolls, and every session is someone else. Then at the bottom: `GUEST | PC 03 | SESSION ACTIVE`.

### 6.6 Live Behavior

| Behavior | Trigger | Result |
|---|---|---|
| Grow on file open | Player opens any file | A new row appears at the bottom: `[today] | [time] | GUEST | PC 03 | [file opened]` — wait, this doesn't match the schema. Instead: `[today] | [time] | GUEST | PC 03 | OPENED: rates_1998.doc` |
| Grow on idle | Every 5 minutes | A new row: `[today] | [time] | GUEST | PC 03 | SESSION ACTIVE` |
| Player's first open | First time Session Log opens | Row injected: `[today] | [now] | [city from timezone] | PC 03 | SESSION ACTIVE` — **egg F01** |
| Eipstein row | Always present at top | `03/03/1998 | 03:14 AM | MR. EIPSTEIN | PC 03 | STILL RUNNING` — **egg F05** |
| Cannot delete | Right-click row → Delete | `You cannot delete the log.` — **egg F03** |

### 6.7 The Player's Row (F01) — Most Important Egg

**When the player first opens the Session Log:**

1. Log is populated with 280 historical rows + Eipstein row at top.
2. At the very bottom, a new row is injected:
   ```
   [today's date] | [current time] | [player's city] | PC 03 | SESSION ACTIVE
   ```
3. `[player's city]` derived from `Intl.DateTimeFormat().resolvedOptions().timeZone` (see `easter_eggs.md` section 4).
4. **Optional flourish:** The row briefly highlights (yellow flash) when injected, then normalizes.

**The player's city must be the city name** — not the timezone. `Asia/Kolkata` → `Bhilai` (canonical). `America/New_York` → `New York`. `Europe/London` → `London`. See the mapping function in `easter_eggs.md`.

### 6.8 Scroll Behavior

- Rows render top-to-bottom in date order
- Scrollbar present (per `features.md` section 15)
- Scroll wheel works
- `Ctrl+End` jumps to bottom (reveals player's row)
- `Ctrl+Home` jumps to top (reveals Eipstein's row)

**Rule:** Do not auto-scroll to the bottom. The player must discover their own row. **The discovery is the egg.**

### 6.9 Menu Items

| Menu | Items |
|---|---|
| **File** | Print, Exit |
| **Edit** | Select All, Find..., Find Next |
| **View** | Refresh, Details |
| **Help** | About Session Log |

**Rule:** `Print` shows a fake print dialog (does nothing). `Find` opens a small find box that highlights matching rows. `Exit` closes.

### 6.10 Build Notes

- **Do:** Use a virtualized list if 280+ rows cause performance issues. (Likely not needed; 300 rows is trivial.)
- **Do:** Make the row for PC 03 (Eipstein) subtly bolded. It stands out but doesn't scream.
- **Do:** Include a "284 entries" status bar that increments as new rows are added.
- **Don't:** Add column sorting. The order is fixed and meaningful.
- **Don't:** Explain what `MR. EIPSTEIN` means in the log. The file is a file. Do not annotate it.
- **Priority:** Row generation > Eipstein row > F01 (player's city) > Live growth > Find > Print.

**Estimated: 45 min.**

---

## 7. Printer Queue

### 7.1 Purpose

Printer Queue is a secondary app that supports the print trap and the physical print egg (G01). It also serves as an ambient "the machine is doing things" surface — the queue has documents waiting that the player didn't print.

### 7.2 Priority

**P1.** Not strictly required, but the print trap (G03) is one of the best eggs, and it needs a home.

### 7.3 Window Layout

```
┌──────────────────────────────────────────────────────────────┐
│ [printer] Printer Queue                        [_] [□] [X]   │
├──────────────────────────────────────────────────────────────┤
│ Printer  Document  View  Help                                │
├──────────────────────────────────────────────────────────────┤
│ SHREE CYBER ZONE — HP LaserJet 6L (Local)                    │
│                                                              │
│  Document          | Status       | Owner      | Pages       │
│  ─────────────────────────────────────────────────────────   │
│  LEDGER_98.XLS    | PRINTING     | GUEST      | 4           │
│  do_not_shred.pdf | WAITING      | —          | 12          │
│  final_final.doc  | WAITING      | —          | 1           │
│  rates_1998.doc   | PAUSED       | PROPRIETOR | 2           │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ 4 documents in queue · HP LaserJet 6L: idle                  │
└──────────────────────────────────────────────────────────────┘
```

### 7.4 Pre-Populated Documents

The queue should have **four pre-existing documents** when the app first opens. These are lore:

| Document | Status | Owner | Pages | Note |
|---|---|---|---|---|
| `LEDGER_98.XLS` | `WAITING` | `PROPRIETOR` | `4` | The Ledger. `PROPRIETOR` as owner = scary. |
| `do_not_shred.pdf` | `WAITING` | `—` | `12` | The file in the Recycle Bin. |
| `final_final.doc` | `WAITING` | `—` | `1` | The other file in the Recycle Bin. |
| `rates_1998.doc` | `PAUSED` | `PROPRIETOR` | `2` | A normal file, but paused by the Proprietor. Why? |

**Rule:** `PROPRIETOR` as the owner of the Ledger is a quiet revelation. The player who opens Printer Queue before Project 2050 will wonder who the Proprietor is. The player who opens it after will know.

### 7.5 Interactions

| Interaction | Result |
|---|---|
| Click `LEDGER_98.XLS` row | Highlights. `Document → Properties` shows Owner: `PROPRIETOR`. (egg G05) |
| `Document → Cancel` | Dialog: `Cancel printing of LEDGER_98.XLS?` → Yes → removes from queue. **But it reappears 10 seconds later** with status `WAITING` and Owner `PROPRIETOR`. |
| `Document → Pause` | Pauses. `Resume` unpauses. |
| `Document → Properties` | Win98 properties dialog with fields: Title, Owner, Subject, Pages, Submitted, Printed. |
| `Printer → Purge Print Documents` | Empties the queue. All rows removed. **Refreshing** (View → Refresh) restores them. |
| `View → Refresh` | Restores queue to default 4 documents. |

### 7.6 The Physical Print (G01)

**Also triggered here:** If the player opens `LEDGER_98.XLS` → File → Print, or right-clicks the Ledger in the queue and clicks `Print`, the **real browser print dialog** opens. See `easter_eggs.md` G01.

The printed page renders `LEDGER_98.XLS` as a Win98-style printout via `@media print` CSS.

### 7.7 Build Notes

- **Do:** Make the rows feel like Win98 Explorer rows. Same font, same row height.
- **Do:** Use a real `<table>` for the queue.
- **Do:** Show the printer icon in the title bar (16×16).
- **Don't:** Actually connect to a printer. Print is `window.print()`.
- **Priority:** Queue layout > Pre-populated documents > Properties dialog > Cancel/reappear behavior > Print.

**Estimated: 45 min.**

---

## 8. Spreadsheet

### 8.1 Purpose

The Spreadsheet app renders `.xls` files: `LEDGER_98.XLS`, `DELAY_LEDGER.XLS`, `GAMING_CALENDAR.XLS`. It shows tabular lore in a way that feels like 90s Excel.

### 8.2 Priority

**P1.** The Ledger is essential to the story. `DELAY_LEDGER.XLS` is where flying cars and fusion energy live. `GAMING_CALENDAR.XLS` is a P1 gaming-related egg.

### 8.3 Window Layout

```
┌──────────────────────────────────────────────────────────────┐
│ [grid] LEDGER_98.XLS                           [_] [□] [X]   │
├──────────────────────────────────────────────────────────────┤
│ File  Edit  View  Insert  Format  Tools  Help                │
├──────────────────────────────────────────────────────────────┤
│ [A1___]  [fx =___________]                                   │
├──────────────────────────────────────────────────────────────┤
│    |  A           |  B          |  C          |  D           │
│ ───┼──────────────┼─────────────┼─────────────┼─────────────  │
│  1 | SEAT         | NAME        | ASSET       | STATUS       │
│  2 | SEAT_00      | —           | voice       | ACTIVE       │
│  3 | SEAT_01      | —           | —           | ACTIVE       │
│  4 | SEAT_02      | —           | —           | ACTIVE       │
│  5 | SEAT_03      | —           | —           | VACANT       │
│  6 | SEAT_04      | —           | —           | ACTIVE       │
│  7 | SEAT_05      | —           | —           | NEUTRALIZED  │
│  8 | SEAT_06      | —           | —           | ACTIVE       │
│  9 | SEAT_07      | —           | —           | CANDIDATE... │
│ 10 | SEAT_08      | —           | —           | ACTIVE       │
│ 11 | SEAT_09      | —           | —           | ACTIVE       │
│    |              |             |             |              │
├──────────────────────────────────────────────────────────────┤
│ Sheet1                                                       │
└──────────────────────────────────────────────────────────────┘
```

### 8.4 Grid Design

- **Column headers:** A, B, C, D, E... (grey `#C0C0C0` background, raised bevel)
- **Row headers:** 1, 2, 3, 4... (same styling)
- **Cells:** white background, black text, 11px MS Sans Serif
- **Gridlines:** 1px `#808080` grey
- **Current cell:** navy `#000080` border, 2px
- **Active cell (A1 indicator):** the cell reference box top-left shows `A1`, the formula box shows `=`

### 8.5 Supported Files

| File | Content | Special behavior |
|---|---|---|
| `LEDGER_98.XLS` | 9 seats + their status | **Live-editing (H01):** STATUS changes after 2 min open, new `GUEST` row appears |
| `DELAY_LEDGER.XLS` | Tech delays (flying cars, GPS, AI, etc.) | Static |
| `GAMING_CALENDAR.XLS` | Game titles mapped to years | Live row at bottom: `[today] | [?] | [?] | [?] | "You are almost there."` (H07) |

### 8.6 The Ledger Live Behavior (H01)

**The critical egg:**

When `LEDGER_98.XLS` opens:

- **0-30s:** Static. Rows show their statuses.
- **30s-60s:** One row's status changes: `ACTIVE` → `PENDING` (e.g., SEAT_04). The row briefly highlights yellow.
- **60s-90s:** Another row: `PENDING` → `VACANT`. Another highlight.
- **90s-120s:** A new row appears at the bottom:
  ```
  — | GUEST | — | EVALUATING
  ```
- **120s+:** Every 30s, another `ACTIVE` row turns `PENDING`.

**Rule:** This happens while the player is watching. It happens even if they aren't looking. But it is **most impactful if they are watching.** Add a subtle animation (a single row highlight flash) when a change occurs.

### 8.7 The Ledger Print Behavior (G01, G02)

- `File → Print` → real browser print dialog opens.
- Content prints as a Win98-style document (via `@media print`).
- If the player **cancels** the print dialog, `cancel_slip.txt` appears in `C:\My Documents\`. (egg G02)

### 8.8 SHRED Ending Trigger

While the Ledger is open, if the player empties the Recycle Bin → **Ending 3 (SHRED)** fires.

Sequence:
1. Ledger deletes itself (all cells clear).
2. After 500ms, the cells reassemble — every `STATUS` becomes `ACTIVE`.
3. A new row appears: `SEAT_07 | [city] | GUEST | ACTIVE | [session ID]`.
4. A dialog appears: `You tried to empty it. It emptied you back.`

See `story.md` section 8, Ending 3.

### 8.9 Build Notes

- **Do:** Use a real `<table>` or CSS grid, not canvas.
- **Do:** Make cells keyboard-navigable (arrow keys move the active cell — even though the file is read-only).
- **Do:** Show `#REF!` and `#####` in cells where a column is too narrow. This is the funniest Excel detail.
- **Don't:** Implement formulas. The formula bar shows `=` but typing does nothing.
- **Don't:** Allow editing. Files are read-only.
- **Priority:** Grid layout > Ledger data > Live-editing H01 > SHRED trigger > Print > Delay ledger.

**Estimated: 60 min.**

---

## 9. mIRC 5.7

### 9.1 Purpose

**mIRC is the ending.** It is where the player meets SEAT_00. It is where the Quiet Room finally speaks. It is where the canonical ending (SEAT_07) is earned.

### 9.2 Priority

**P0.** Without mIRC, there is no ending.

### 9.3 Unlock Mechanic

**mIRC is not on the desktop by default.** It appears after the player reads 4 of 5 chat logs in `C:\BACKROOM$\chatlogs\`. (egg C08)

**Rule:** Persist this in `localStorage`. Once unlocked, mIRC stays on the desktop.

### 9.4 Window Layout

```
┌──────────────────────────────────────────────────────────────┐
│ [mIRC] mIRC 5.7                                [_] [□] [X]   │
├──────────────────────────────────────────────────────────────┤
│ File  View  Tools  Commands  Window  Help                    │
├──────────────────────────────────────────────────────────────┤
│ [ #quietroom | 9 users | topic: we do not rule. we schedule. ]│
├──────────────────────────────────────────────────────────────┤
│ * Now talking in #quietroom                                  │
│ * Topic is: we do not rule. we schedule.                     │
│ * Set by SEAT_00 on Tue Mar 03 1998                          │
│                                                              │
│ <SEAT_00> you're here.                                       │
│ <SEAT_01> we saved you a seat.                               │
│ <SEAT_04> it was always yours.                               │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ [__________________________] [Send]                          │
├──────────────────────────────────────────────────────────────┤
│ Connected to quiet.room · Session: 10224 days · Seat: 07     │
└──────────────────────────────────────────────────────────────┘
```

### 9.5 Channel Content on Open

When the player first opens mIRC:

- **Auto-join:** `#quietroom`
- **Users list (right side, or in `/names`):**
  - `SEAT_00` (voice)
  - `SEAT_01` through `SEAT_09` (except `SEAT_03` — vacant, and `SEAT_05` — neutralized)
  - `GUEST` (the player)
- **On-join messages:**
  ```
  * Now talking in #quietroom
  * Topic is: we do not rule. we schedule.
  * Set by SEAT_00 on Tue Mar 03 1998
  ```
- **First messages (pre-scripted):**
  ```
  <SEAT_00> you're here.
  <SEAT_01> we saved you a seat.
  <SEAT_04> it was always yours.
  ```
  (These messages arrive with 1–2s delays between them, not all at once.)

### 9.6 Input Behavior

The player can type anything in the input field and click `Send`.

**On send:**
- The player's message appears:
  ```
  <GUEST> [whatever they typed]
  ```
- After 1–3s, one of the seats replies:
  ```
  <SEAT_0X> we know.
  ```
- `X` rotates randomly between `00`, `01`, `02`, `04`, `06`, `08`, `09`.
- This happens **every time.** Whatever the player types. The response is always `we know.`

**After 3 `we know.` responses**, a larger response triggers:

```
<SEAT_00> you were scheduled in 1998.
<SEAT_00> you arrived on time.
<SEAT_00> the seat is warm.
```

Then, after a 3-second pause:

```
<SEAT_00> it was always yours.
```

Then the **SEAT_07 ending screen** fades in (see `story.md` section 8, Ending 5).

### 9.7 Slash Commands

The player can type commands:

| Command | Result |
|---|---|
| `/list` | Server: `#quietroom — 9 users — topic: "we do not rule. we schedule."` (C01) |
| `/whois SEAT_00` | Server: `SEAT_00 is ~s00@quiet.room · channels: #quietroom · idle: 10224 days · status: LISTENING` (C02) |
| `/whois EIPSTEIN` | Server: `No such nick`. Then, 2s later, a private message: `He was never a person. Read the file.` (C03) |
| `/whois GUEST` | Server: `GUEST is ~guest@[player's city] · channels: #quietroom · status: SEAT_07` — **egg** |
| `/nick EIPSTEIN` | Server: `Nick change denied. That name is reserved for the protocol.` (C04) |
| `/quit` | Server: `You cannot leave the room until the session ends.` (C05) |
| `/join #other` | Server: `No such channel. There is only #quietroom.` (C10) |
| `/help` | Server: `There is no help here.` |
| `/names` | Server: `SEAT_00 SEAT_01 SEAT_02 SEAT_04 SEAT_06 SEAT_07 SEAT_08 SEAT_09 GUEST` |

### 9.8 Idle Behavior

If the player does nothing for **5 minutes** while mIRC is open:

```
<SEAT_00> we are still here. are you?
```
(egg C09)

If the player does nothing for **10 minutes**:

```
<SEAT_00> we can wait. we have been waiting since 1998.
```

### 9.9 Status Bar

Bottom of window:

```
Connected to quiet.room · Session: 10224 days · Seat: 07
```

Clicking the status bar shows a tooltip with the same info (egg C06).

### 9.10 The `/whois SEAT_03` Easter Egg

```
/whois SEAT_03
```
Server: `SEAT_03 is not in the room. SEAT_03 is nowhere. Do not ask again.`

**Rule:** `SEAT_03` is `VACANT` in the Ledger. This is the only hint at *why.* Do not explain it.

### 9.11 Build Notes

- **Do:** Make the message input feel real. Monospace font, green or black text on white.
- **Do:** Delay all messages by 1–3s. Not instant. This creates tension.
- **Do:** Timestamp each message in the classic mIRC format: `[03:14] <SEAT_00> ...`
- **Don't:** Include modern chat UI (no bubbles, no avatars, no typing indicators).
- **Don't:** Explain who the seats are. They are seats.
- **Priority:** Window layout > Unlock trigger > First messages > `we know.` response loop > SEAT_00 monologue > Ending trigger > Slash commands.

**Estimated: 90 min.**

---

## 10. Paint

### 10.1 Purpose

Paint is the app for opening images. It hosts the `SEATS.BMP` egg (H02), the sticky-note password hint, and serves as a visual texture — the player who opens an image sees a 1998 paint program, which is inherently charming.

### 10.2 Priority

**P2.** Cut if time is short. The images can open in a simpler viewer.

### 10.3 Window Layout

```
┌──────────────────────────────────────────────────────────────┐
│ [paint] tommy.jpg                              [_] [□] [X]   │
├──────────────────────────────────────────────────────────────┤
│ File  Edit  View  Image  Options  Help                       │
├──────────────────────────────────────────────────────────────┤
│ [tools]  [colors]                                            │
│ ┌────┐  ┌───────────────────────────────┐                    │
│ │ ✏  │  │                               │                    │
│ │ ✏  │  │    [image renders here]       │                    │
│ │ ✂  │  │                               │                    │
│ │ 🖌  │  │                               │                    │
│ │ 🪣  │  │                               │                    │
│ └────┘  └───────────────────────────────┘                    │
├──────────────────────────────────────────────────────────────┤
│ For Help, click Help Topics on the Help Menu.                │
└──────────────────────────────────────────────────────────────┘
```

### 10.4 Toolbar

Left sidebar tools (16×16 icons, 24×24 cells, raised bevel):

- Free-Form Select
- Select
- Eraser/Color Eraser
- Fill With Color
- Pick Color
- Magnifier
- Pencil
- Brush
- Airbrush
- Text
- Line
- Curve
- Rectangle
- Polygon
- Ellipse
- Rounded Rectangle

**Rule:** Tools are visual only. Clicking a tool does nothing to the image. **The image is read-only.**

### 10.5 Color Palette

Bottom of the toolbar: a 2×28 grid of colors.

- Top row: the 16 classic Windows colors
- Bottom row: the 12 default MS Paint colors

**Rule:** Visual only. Clicking a color does nothing.

### 10.6 Image Rendering

Images open in the main canvas, centered, scaled to fit within the window.

- **Pixelated:** Use `image-rendering: pixelated`
- **No anti-aliasing** on zoom
- **Background:** grey `#808080` (the classic MS Paint "canvas edge")

### 10.7 Special Images

| Image | Behavior |
|---|---|
| `tommy.jpg` | The dog. Static. Size ~48 KB (fake). |
| `bhaiya_1998.jpg` | The café opening. Static. |
| `SEATS.BMP` | Nine-chair org chart. **After 30s open, Seat 07's label changes from `CANDIDATE PENDING` to `CANDIDATE PRESENT`** (egg H02). |
| `1998-03-03.IMG` | A man in a beige safari suit, back to camera. (egg H09) |
| `1998-03-10.IMG` | Same man, door slightly open. (egg H10) |
| `rules_cardboard.bmp` | Handwritten sign scan. Static. |

### 10.8 Special: Sticky Note Password Hint

There is no sticky note image file. But there is an **easter egg in Paint's About dialog** or a hidden image: `sticky.bmp` in `C:\WINDOWS\`. Opening it shows:

```
PC 03
password: tommy1998
```

**Rule:** This is not the password the player needs. It is a password hint for something they will never need to enter. **The password is the joke.**

### 10.9 Build Notes

- **Do:** Use `<img>` with `image-rendering: pixelated`.
- **Do:** Draw the toolbar with CSS (16×16 pixel buttons).
- **Don't:** Actually implement drawing tools. This is a viewer.
- **Don't:** Add a zoom feature beyond 1× / 2× / 4× (optional).
- **Priority:** Window layout > Image rendering > SEATS.BMP timer > Other images > Sticky note.

**Estimated: 45 min.**

---

## 11. Media Player

### 11.1 Purpose

Media Player plays "recorded calls" as fake waveforms with captions. It's a comedy break and a mood-setter. It also adds another reading surface.

### 11.2 Priority

**P2.** Cut if time is short.

### 11.3 Window Layout

```
┌──────────────────────────────────────────────────────────────┐
│ [media] Media Player — call_03141998.wav       [_] [□] [X]   │
├──────────────────────────────────────────────────────────────┤
│ File  Device  Scale  Help                                    │
├──────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ [███████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░]       │ │
│ │  00:03 / 02:14                                           │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                              │
│   "Hello? ... Haan, bhaiya bol raha hoon. ..."               │
│                                                              │
│   [▶]  [■]  [◀◀]  [▶▶]                                       │
├──────────────────────────────────────────────────────────────┤
│ C:\WINDOWS\Media\call_03141998.wav                           │
└──────────────────────────────────────────────────────────────┘
```

### 11.4 Behavior

- Shows a waveform (animated bars, like an audio equalizer)
- Displays captions (transcribed dialogue) synced to a **fake** timeline
- Plays no actual audio (or plays a faint, quiet hum if available)

### 11.5 Recorded Calls

The available "calls" are in `C:\WINDOWS\Media\`:

| File | Content | Duration |
|---|---|---|
| `call_03141998.wav` | Bhaiya: *"Hello? Haan, bhaiya bol raha hoon. ... Theek hai. Theek hai. Main dekh lunga. ... Haan, PC 03 chalta rahega. ... Kab tak? ... Theek hai."* | 2:14 |
| `call_03101998.wav` | Eipstein (formal voice): *"The delivery is confirmed. The floppy has been placed. The session is open. Do not close it. Do not open the floppy. Do not ask what Phase V is."* | 1:47 |
| `call_11012026.wav` | Static, then a voice: *"The candidate has arrived. The seat is ready. Proceed."* | 0:31 |

**Rule:** The third call only appears after the player reads all chat logs (same unlock as mIRC). It is the last piece of the puzzle before mIRC.

### 11.6 Build Notes

- **Do:** Use CSS animation for the waveform bars (transform: scaleY).
- **Do:** Sync captions to a timer, not to real audio.
- **Don't:** Generate actual audio files. Fake is fine.
- **Priority:** Window layout > Waveform > Captions > Unlock third call.

**Estimated: 30 min.**

---

## 12. Calculator

### 12.1 Purpose

A simple, working calculator. It is filler. It is charming. It is a working calculator.

### 12.2 Priority

**P2.** Cut if time is short.

### 12.3 Window Layout

Standard Win98 calculator:

```
┌────────────────────────────────────────┐
│ [calc] Calculator           [_] [□] [X]│
├────────────────────────────────────────┤
│ Edit  View  Help                       │
├────────────────────────────────────────┤
│               [          0 ]           │
│                                        │
│  [Backspace] [CE] [C]                  │
│  [ MC ] [ MR ] [ MS ] [ M+ ]           │
│  [ 7 ] [ 8 ] [ 9 ] [ / ] [ sqrt ]      │
│  [ 4 ] [ 5 ] [ 6 ] [ * ] [ % ]         │
│  [ 1 ] [ 2 ] [ 3 ] [ - ] [ 1/x ]       │
│  [ 0 ] [ +/- ] [ . ] [ + ] [ = ]       │
└────────────────────────────────────────┘
```

### 12.4 Behavior

- Fully functional for basic arithmetic: `+ - * /`, `%`, `sqrt`, `1/x`, `+/-`
- Display updates as buttons are pressed
- Keyboard input works
- `CE` clears entry. `C` clears all. `Backspace` deletes last digit.

### 12.5 Easter Egg

**Typing `1998` then `+` then `2026` then `=` gives `4024`.**

Then typing `- 2050` gives `1974`.

Then a small line appears in the calculator display: `Not a coincidence.`

(egg — the math checks out: 1998 + 2026 = 4024, minus 2050 = 1974. This isn't actually meaningful, but it *feels* meaningful. This is exactly the kind of joke that belongs in the build.)

### 12.6 Build Notes

- **Do:** Implement basic arithmetic correctly.
- **Do:** Make buttons feel like Win98 (bevel, pressed state).
- **Priority:** Layout > Basic arithmetic > Keyboard input > Easter egg.

**Estimated: 20 min.**

---

## 13. Find

### 13.1 Purpose

Find is the discovery tool. It lets the player search the filesystem for filenames and file contents. This gives the player *another way in* — instead of typing `C:\BACKROOM$` in Explorer, they can search for "PROJECT" or "EIPSTEIN" and find the files directly.

### 13.2 Priority

**P1.** Not essential, but strongly recommended. It makes discovery feel like exploration instead of guesswork.

### 13.3 Window Layout

```
┌──────────────────────────────────────────────────────────────┐
│ [find] Find: All Files                         [_] [□] [X]   │
├──────────────────────────────────────────────────────────────┤
│ File  Edit  View  Options  Help                              │
├──────────────────────────────────────────────────────────────┤
│ Named:    [PROJECT_____________________________]             │
│ Look in:  [C:\ ▼]                                            │
│                                                              │
│ [✓] Include subfolders                                       │
│                                                              │
│ [ Find Now ]  [ Stop ]  [ New Search ]                       │
├──────────────────────────────────────────────────────────────┤
│ Name                        | In Folder        | Size | Type │
│ ─────────────────────────────────────────────────────────────│
│ PROJECT_2050.DOC            | C:\BACKROOM$     | 4 KB | DOC  │
│ ...                                                          │
└──────────────────────────────────────────────────────────────┘
```

### 13.4 Behavior

- **Search scope:** The virtual filesystem (all files, all folders, including hidden ones)
- **Search target:** Filename match (case-insensitive)
- **Include subfolders:** Default ON
- **Results:** File name, folder, size, type
- **Click result:** Opens the file in the appropriate app
- **Search time:** 200–500ms delay (fake, to feel real)

### 13.5 The Discovery

**This is the point:** If a player searches for `EIPSTEIN` or `PROJECT` or `2050`, they find files in `C:\BACKROOM$`.

**Rule:** Find CAN search hidden folders. It CAN show files the player has not seen. This is intended. It is another path in.

**But:** Find should NOT automatically open `BACKROOM$` in Explorer. It shows the *results* — clicking a result opens the *file*, not the folder. This is a subtle design choice: the player can read the files but still has to type the path to explore the folder.

### 13.6 Easter Egg

Searching for `2026-11-01` finds the file `Tuesdays\2026-11-01.IMG` with size `0 KB`. Opening it gives the `Cannot open: file is 0 KB` dialog.

Searching for `tommy` finds `tommy.jpg`. Opening it opens Paint.

### 13.7 Build Notes

- **Do:** Search both filename AND (optionally) content. Content search is a great way to reveal lore.
- **Do:** Show a progress bar during search (fake, 200ms).
- **Don't:** Show a "no results" message too quickly. Let it feel like a real search.
- **Priority:** Window layout > Filename search > Results list > Click to open > Content search (if time).

**Estimated: 30 min.**

---

## 14. BSOD (Blue Screen of Death)

### 14.1 Purpose

The BSOD is a **cinematic moment**, not an app. It triggers on `Start → Run → 2050` (egg B02) and as part of Ending 4 (2050).

### 14.2 Priority

**P0.** High payoff, low cost.

### 14.3 Design

Full-screen overlay, no window chrome, no taskbar.

**Layout:**

```
                    Windows

A fatal exception 0E has occurred at 0028:C0001A4F in VXD VMM(01) +
00000A4F. The current application will be terminated.

* Press any key to terminate the current application.
* Press CTRL+ALT+DEL again to restart your computer. You
  will lose any unsaved information in all applications.

              PLAN STILL ON SCHEDULE

                     Press any key to continue _
```

**Background:** `#0000AA` (classic BSOD navy blue)
**Text:** `#FFFFFF` (white), 14px monospace (`Courier New` or `Fixedsys`)
**Layout:** Left-aligned paragraphs, wide margins (80px), top-aligned starting at ~30% down

**The critical difference:** `PLAN STILL ON SCHEDULE` replaces the standard "Press any key to continue" or "Press CTRL+ALT+DEL" line. This is the Easter egg.

### 14.4 Behavior

- Appears full-screen (position fixed, z-index 9999)
- Lasts **3 seconds**
- Then fades to black (200ms)
- Then the desktop returns (fades in over 300ms)

**Dismissal:** Pressing any key or clicking anywhere dismisses the BSOD immediately.

### 14.5 The Two BSODs

| Trigger | Message |
|---|---|
| `Run → 2050` | `PLAN STILL ON SCHEDULE` |
| 2050 Ending (after the future desktop) | `PLAN STILL ON SCHEDULE` + subtitle: `SESSION ACTIVE: 10224 days` |

### 14.6 Build Notes

- **Do:** Use a `<pre>` block for the text (monospace, preserving line breaks).
- **Do:** Make it exactly the right shade of blue (`#0000AA`).
- **Do:** Include the `0E` fatal exception line — it's the most famous BSOD text.
- **Don't:** Use a modern blue. This is the Win98 BSOD blue.
- **Priority:** Layout > Text > Timing > Dismissal.

**Estimated: 15 min.**

---

## 15. Shut Down

### 15.1 Purpose

The Shut Down app is the **SAFE ending**. It is the exit that does not exit.

### 15.2 Priority

**P0.** Small app, huge payoff.

### 15.3 Flow

**Screen 1: "Windows is shutting down..."**

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│                                                        │
│           Windows is shutting down...                  │
│                                                        │
│           [ ■■■■■■■■■■■■■■■■■■□□□□□□□□ ]               │
│                                                        │
│                                                        │
└────────────────────────────────────────────────────────┘
```

- Background: `#000080` navy
- Text: `#FFFFFF` white, 14px bold, centered
- Progress bar: small rectangles, filling left-to-right over 3 seconds
- Duration: **3 seconds**

**Screen 2: "It is now safe to turn off your computer."**

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│                                                        │
│                                                        │
│      It is now safe to turn off your computer.         │
│                                                        │
│                                                        │
│                                                        │
│                                         ⏱ 00:03:14     │
│                                         ₹—             │
└────────────────────────────────────────────────────────┘
```

- Background: `#000000` black
- Text: `#FFA500` orange, 16px bold, centered
- **Faint billing timer** in bottom-right corner: `⏱ 00:03:14` — **still ticking**
- **Faint bill amount:** `₹—` (not a number, a dash)
- Duration: **10 seconds**

**Screen 3: Fade to black**

- Screen fades to full black over 500ms
- A small line appears: `Session active. Reload to return.`

**Screen 4: Reload returns to desktop**

- If the player reloads, the desktop returns
- Billing timer continues from where it was (not reset)
- Session Log has one new row: `[today] | [time] | GUEST | PC 03 | ATTEMPTED SHUTDOWN`

### 15.4 The Orange Text

**The critical detail:** "It is now safe to turn off your computer." must be in the exact orange (`#FFA500`) that Windows 98 used. Not red, not yellow. Orange.

### 15.5 Build Notes

- **Do:** Use three timed screens (3s, 10s, fade).
- **Do:** Show the billing timer in screen 2. This is the point.
- **Don't:** Actually shut down. The machine reloads.
- **Priority:** Screen 1 > Screen 2 > Orange text > Billing timer > Screen 3 > Reload behavior.

**Estimated: 20 min.**

---

## 16. App Integration Checklist

Before demo, verify every app works:

### Cross-app behavior
- [ ] Files open in the correct app (`.txt` → Notepad, `.xls` → Spreadsheet, etc.)
- [ ] Session Log grows when files are opened
- [ ] Multiple windows can be open simultaneously
- [ ] Taskbar shows a button per open window
- [ ] `Alt+Tab` cycles between windows

### Notepad
- [ ] Opens `.txt`, `.doc`, `.log` files
- [ ] Status bar shows cursor position
- [ ] `THE_PLAYER.DOC` blocks close for 30s
- [ ] `BHAIYA_NOTE.txt` blocks close until scrolled
- [ ] About dialog shows "licensed to: GUEST"

### Explorer
- [ ] `C:\BACKROOM$` opens via address bar
- [ ] `BACKROOM$` added to tree after first visit
- [ ] File dates are consistent (mostly `3/3/98`)
- [ ] `2026-11-01.IMG` shows `11/1/26` (stands out)
- [ ] Recycle Bin contains the three files
- [ ] Empty Recycle Bin triggers SHRED ending (if Ledger open)

### IE
- [ ] Homepage loads
- [ ] `backroom` URL works
- [ ] Back/Forward work
- [ ] Fake loading spinner appears

### Cafê Manager
- [ ] 12 PC tiles render
- [ ] PC 03 shows `STILL RUNNING`
- [ ] Timers update live
- [ ] Print PC 12 triggers the print trap

### Session Log
- [ ] Eipstein row appears at top
- [ ] Player's row appears at bottom on first open (**F01**)
- [ ] Player's city is correct
- [ ] New rows grow as files are opened
- [ ] "You cannot delete the log" dialog works

### Printer Queue
- [ ] 4 default documents
- [ ] `LEDGER_98.XLS` owner is `PROPRIETOR`
- [ ] Purge then Refresh restores queue
- [ ] Properties dialog works

### Spreadsheet
- [ ] Ledger renders 9 seats
- [ ] **Status changes live after 30s** (H01)
- [ ] GUEST row appears after 90s
- [ ] Print triggers real browser print
- [ ] SHRED ending works

### mIRC
- [ ] Hidden until 4 chat logs read
- [ ] Auto-joins `#quietroom`
- [ ] First 3 messages arrive with delays
- [ ] Any input → `we know.`
- [ ] 3 `we know.` → SEAT_00 monologue → SEAT_07 ending
- [ ] Slash commands work

### Paint
- [ ] Images render pixelated
- [ ] `SEATS.BMP` label changes after 30s

### Media Player
- [ ] Waveform animates
- [ ] Captions sync

### Calculator
- [ ] Basic arithmetic works
- [ ] `1998 + 2026 - 2050 = 1974` shows `Not a coincidence.`

### Find
- [ ] Search for `EIPSTEIN` finds the file
- [ ] Search for `PROJECT` finds `PROJECT_2050.DOC`
- [ ] Results open in correct app

### BSOD
- [ ] `Run → 2050` shows BSOD
- [ ] Text includes `PLAN STILL ON SCHEDULE`
- [ ] Returns to desktop after 3s

### Shut Down
- [ ] 3 screens (shutting down, safe to turn off, fade)
- [ ] Billing timer still ticking on screen 2
- [ ] Reload returns to desktop
- [ ] Session Log records the attempt

---

## 17. What Not to Build

| Don't build | Why |
|---|---|
| **A working text editor** (with save) | Files are read-only lore. Saving would break immersion. |
| **A working file manager** (with create/delete that persists) | All FS mutation is either visual or scripted. |
| **A real chat client** | mIRC is scripted. It must be. |
| **A real spreadsheet** | No formulas. No editing. |
| **Modern file preview** | Files open in their apps. Not in a modal. |
| **Smooth scrolling** | Win98 scrolled in chunks. |
| **Rounded anything** | Every corner is sharp. |
| **Search that works "too well"** | Find shows results slowly. It feels real. |
| **Apps that don't serve the story** | Every app must earn its place. |

---

## 18. The One Rule of This Document

> **Every app is a window into the story. Not a feature checklist.**

Notepad is not "a text editor." It is where the player reads `EIPSTEIN.DOC` and realizes they are being neutralized.

Explorer is not "a file manager." It is where the player types `C:\BACKROOM$` and everything changes.

mIRC is not "a chat client." It is where the player is told *"we know."*

**Build every app as if it were the only app that matters. Because for the player who just opened it, it is.**

---

## 19. Related Documents

| Document | What it covers |
|---|---|
| `README.md` | Public project overview |
| `story.md` | Full narrative, all endings |
| `easter_eggs.md` | All 61 eggs, prioritized |
| `features.md` | Windows 98 shell spec |
| `websites.md` | IE fake sites content |
| `settings.md` | Control Panel, Display Properties |
| `games.md` | Minesweeper, Solitaire, game studio |
| `docs_and_files.md` | Public PC files content |
| `chats_and_emails.md` | Chat logs, emails, drafts |
| `UIUX.md` | Boot sequence, audio, wallpaper, core functionality |

---

<div align="center">

**14 apps. 1 story. Every window is a door.**

**Start → Run → `2050`**

</div>

---

**End of `applications.md`. Ready for the next file: `websites.md`.**