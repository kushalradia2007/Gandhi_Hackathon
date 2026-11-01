# features.md

> **Project:** SHREE CYBER ZONE — PC 03 (ADMIN)
> **For:** Gandhi Hackathon 2026 · OpenLake × Meraz · IIT Bhilai · 1st November 2026
> **Document status:** LOCKED · Full Windows 98 feature spec · Build-ready
> **Rule:** Every feature listed here must feel like 1998. No modern shortcuts. No "close enough." The shell IS the game.

---

## 0. How to Read This Document

This document specifies every **Windows 98 shell feature** the build must replicate. It is organized by system layer:

1. **Boot & Startup** — what the player sees first
2. **Desktop** — the teal canvas
3. **Window Manager** — the core interaction model
4. **Taskbar** — the anchor
5. **Start Menu** — the tree
6. **System Tray** — the small icons
7. **Dialogs** — the modal world
8. **Cursor & Pointer** — the physical feel
9. **Fonts & Metrics** — the exact numbers
10. **Colors** — the exact palette
11. **Sounds** — the audio layer
12. **Keyboard Shortcuts** — the power-user layer
13. **Context Menus** — the right-click world
14. **Drag & Drop** — the physical metaphor
15. **Scrollbars** — the 3D arrows
16. **Status Bars** — the bottom strip
17. **Tooltips** — the yellow boxes
18. **Screensaver** — the idle state
19. **Shutdown & Restart** — the exit (that doesn't exit)
20. **Feature Completeness Checklist** — the ship list

**Every item has a priority:**
- **P0** = must ship. The build fails without it.
- **P1** = must ship if time permits. The build feels wrong without it.
- **P2** = polish. Ship if you have 20 minutes.

---

## 1. Boot & Startup

### 1.1 The Boot Sequence (P0)

The player sees a **4-second boot sequence** before the desktop appears. It is skippable (click anywhere). It is essential.

**Sequence:**

| Time | Screen | Notes |
|---|---|---|
| 0.0s | Black screen | 200ms pause |
| 0.2s | BIOS text (white on black, monospace) | `Award Modular BIOS v4.51PG` / `Copyright (C) 1984-98, Award Software, Inc.` / `PENTIUM II 350 MHz` / `Memory Test: 65536K OK` |
| 1.2s | Boot logo (the classic Windows 98 cloud logo, if available, or a custom "SHREE CYBER ZONE" splash) | Centered, 2 seconds |
| 3.2s | Black screen | 300ms |
| 3.5s | Desktop wallpaper fades in, icons populate | No fade — instant, per Win98 |
| 4.0s | Taskbar and Start button appear | Instant |
| 4.2s | Startup sound plays (if audio enabled) | The classic Windows 98 startup chime |

**Implementation:** A full-screen `<div>` overlay with timed state changes. No external video. CSS + JS only. The BIOS text is a monospace `<pre>` block.

**Skip behavior:** Clicking anywhere or pressing any key jumps to the desktop instantly.

**Persistence:** The boot sequence plays **once per session**. It does not replay on reload unless the player clears session storage or opens a new incognito window.

### 1.2 The Startup Sound (P1)

The Windows 98 startup chime. If the audio asset is unavailable, a generic 90s synth chime is acceptable. It plays **after** the boot sequence, when the desktop appears.

**Rule:** Always respect `prefers-reduced-motion` and `prefers-reduced-data`. Always provide a mute button in the system tray.

### 1.3 The Login Screen (P1)

**Not shown by default.** The machine is already logged in as `GUEST`. The login screen appears only:

- When the player double-clicks the `PROPRIETOR` icon (after the print-jam trap)
- When the player triggers Ending 2 (THE GUEST)

**Login screen design:**

```
Windows 98
[logo]

Type a user name and password to log on to Windows.

User name:  [GUEST________]
Password:   [************]

[ OK ]  [ Cancel ]
```

**Rule:** Any password is accepted. The login does not fail. This is intentional. The Proprietor does not need to verify you. The Proprietor knows you.

---

## 2. Desktop

### 2.1 The Desktop Surface (P0)

**Background:** Solid `#008080` (classic teal). No gradients. No patterns. No images. Just teal.

**Exception:** The `SEATS.BMP` wallpaper (easter egg A03). When applied, it replaces the teal with the nine-chair org chart.

**Desktop dimensions:** Full viewport. The desktop is the entire browser window. No margins. No browser chrome visible (the player is inside the machine).

### 2.2 Desktop Icons (P0)

Icons are **32×32 pixels**, arranged in a grid, default position top-left.

**Grid:**
- Cell size: **75px wide × 75px tall**
- Icon image: **32×32**, centered horizontally, top-aligned
- Label: centered below icon, **11px MS Sans Serif**, white text, 2px black shadow

**Default icons (top-left, in order):**

| Icon | Label | Opens |
|---|---|---|
| My Computer | `My Computer` | Explorer at `C:\` |
| My Documents | `My Documents` | Explorer at `C:\My Documents\` |
| Internet Explorer | `Internet Explorer` | IE with intranet homepage |
| Recycle Bin | `Recycle Bin` | Explorer at `C:\Recycle Bin\` |
| Cafê Manager 98 | `Cafê Manager 98` | CafeManager app |
| Session Log | `Session Log` | SessionLog app |
| Printer Queue | `Printer Queue` | PrinterQueue app |
| Notepad | `Notepad` | Notepad app (empty) |
| Paint | `Paint` | Paint app |
| Media Player | `Media Player` | Media Player app |
| Minesweeper | `Minesweeper` | Minesweeper game |
| Solitaire | `Solitaire` | Solitaire game |

**Conditional icons (appear later):**

| Icon | Trigger | Label |
|---|---|---|
| mIRC 5.7 | After reading 4 of 5 chat logs | `mIRC` |
| PROPRIETOR | After print-jam trap (G03) | `PROPRIETOR` |
| for_you.txt | After emptying Recycle Bin (D03) | `for_you` |

**Icon states:**

| State | Appearance |
|---|---|
| Default | Icon image, white label |
| Hover | Icon slightly brighter (CSS `filter: brightness(1.1)`), label unchanged |
| Selected (single click) | Icon image has navy `#000080` background behind it, label has navy background |
| Focused (after selection) | Dotted border around label |
| Drag | Ghost image follows cursor, original stays in place |

**Icon text color:** White `#FFFFFF`, with 1px black text shadow for readability on teal.

**Icon text wrapping:** Max 2 lines. Text truncates with `…` if longer.

**Double-click to open.** Single click selects. This is not modern — in Win98, **single click selects, double-click opens.** This is P0.

### 2.3 Desktop Right-Click Menu (P1)

Right-clicking the desktop opens a context menu:

```
Arrange Icons
Line up Icons
Refresh
-----------
Paste
Paste Shortcut
-----------
New >
-----------
Properties
```

**Rule:** `Properties` opens Display Properties (see `settings.md`). `Refresh` does nothing visible (the desktop is already live). `New >` shows Folder, Shortcut, Text Document — all create items in `C:\Windows\Desktop\`, which is hidden from the player.

### 2.4 Desktop Selection Box (P2)

Dragging on an empty desktop area draws a dotted selection rectangle (navy border, translucent navy fill). Icons inside the rectangle become selected.

**Implementation:** CSS border `1px dashed #000080`, background `rgba(0,0,128,0.1)`.

---

## 3. Window Manager

This is the **most important system in the build.** The window manager is the game engine.

### 3.1 Window Anatomy (P0)

Every window has:

```
┌──────────────────────────────────────────┐ ← 3px raised border
│ [icon] Title Text        [_] [□] [X]    │ ← title bar (18px tall)
├──────────────────────────────────────────┤
│                                          │
│   Window content                         │
│                                          │
├──────────────────────────────────────────┤
│ Status bar text (optional)               │ ← 20px tall
└──────────────────────────────────────────┘
```

**Title bar:**
- Height: **18px**
- Background: `#000080` (navy) when active, `#808080` (grey) when inactive
- Text: **11px MS Sans Serif bold**, white when active, `#C0C0C0` when inactive
- Icon: 16×16, left-aligned, 2px from left edge
- Title text: left-aligned, 6px from icon
- Buttons: right-aligned, 16×14px each, 2px spacing

**Title bar buttons:**

| Button | Glyph | Action |
|---|---|---|
| Minimize | `_` (underscore, bottom-aligned) | Hide window, show taskbar button |
| Maximize | `□` (square) | Resize to full desktop, change glyph to restore icon |
| Close | `X` (X) | Close window |

**Button styling:** Raised 3D bevel. Background `#C0C0C0`. Border: top/left `#FFFFFF`, bottom/right `#808080`. Pressed state: inverted bevel.

**Window border:**
- Outer: 1px `#000000`
- Inner: 1px `#FFFFFF` top/left, 1px `#808080` bottom/right
- Content inset: 2px from inner border

**Window shadow:** None. Win98 has no drop shadows.

### 3.2 Window States (P0)

| State | Appearance |
|---|---|
| Active | Title bar navy, buttons active |
| Inactive | Title bar grey, buttons active but muted |
| Minimized | Hidden, taskbar button un-pressed |
| Maximized | Full desktop (minus taskbar), title bar shows restore glyph |
| Restored | Previous size and position |
| Modal | Blocks input to other windows (for dialogs) |

**Z-order:** Last focused window is on top. Clicking a window brings it to front. Clicking a taskbar button focuses its window.

### 3.3 Window Drag (P0)

Dragging the **title bar** moves the window.

**Behavior:**
- Cursor changes to `move` (four-arrow) cursor on title bar hover
- Drag follows cursor instantly (no easing, no smoothing)
- Window cannot be dragged below the taskbar line
- Window cannot be dragged above the desktop top
- Window can be dragged partially off-screen left/right (Win98 behavior) — but for this build, **bounce back** (easter egg A09)

### 3.4 Window Resize (P0)

Windows are resizable from the **bottom-right corner** only (Win98 default).

**Resize handle:** 12×12px area at bottom-right corner. Cursor changes to `nwse-resize`.

**Minimum window size:** 200×150px.

**Behavior:** Live resize (no ghost outline). Window content reflows instantly.

### 3.5 Window Focus (P0)

Clicking anywhere in a window brings it to front and makes it active.

**Rule:** The title bar of the active window is navy. All others are grey. Only ONE window is active at a time.

### 3.6 Window Close (P0)

Clicking `X` closes the window.

**Special case:** `THE_PLAYER.DOC` cannot be closed for 30 seconds after opening (easter egg E10). The `X` button does nothing during this period. After 30 seconds, it works normally.

**Special case:** `BHAIYA_NOTE.txt` cannot be closed until it has been scrolled to the bottom. The `X` button does nothing until the scroll reaches the bottom.

### 3.7 Window Minimize (P0)

Clicking `_` hides the window. A taskbar button remains.

**Animation:** None. Instant hide. (Win98 had no minimize animation.)

### 3.8 Window Maximize (P0)

Clicking `□` resizes the window to fill the desktop (minus taskbar). The button glyph changes to the "restore" icon (two overlapping squares).

Clicking again restores the previous size and position.

### 3.9 Window Menu (P2)

Clicking the **window icon** (top-left of title bar) opens a small menu:

```
Restore
Move
Size
Minimize
Maximize
-----------
Close    Alt+F4
```

**Rule:** `Restore`, `Minimize`, `Maximize`, `Close` work. `Move` and `Size` are visual only (do nothing). This is faithful to the real Win98 behavior on simple windows.

### 3.10 Window Content Scroll (P0)

When window content exceeds the window size, scrollbars appear.

**Scrollbar dimensions:**
- Vertical: 16px wide
- Horizontal: 16px tall
- Arrow buttons: 16×16px at each end
- Thumb: sized proportionally to content

**Scrollbar styling:** See section 15.

---

## 4. Taskbar

### 4.1 The Taskbar (P0)

Bottom of the screen, full width, **28px tall**. Background `#C0C0C0`. Top border: 1px `#FFFFFF` raised bevel.

**Layout (left to right):**

```
[Start] | [Task buttons...] | [System Tray]
```

### 4.2 Start Button (P0)

**Dimensions:** 54×22px, 2px from left, vertically centered.

**Design:**
- Background `#C0C0C0`
- Left: Windows flag icon (16×16, the 4-color flag)
- Text: `Start` in **11px MS Sans Serif bold**, black, with the "S" bold and "tart" normal (the iconic design)
- Raised 3D bevel
- Pressed state: inverted bevel, pressed appearance

**Click behavior:** Opens the Start Menu (see section 5).

### 4.3 Task Buttons (P0)

One button per open (or minimized) window.

**Dimensions:** 160px wide × 22px tall, 2px spacing. If more than 5 buttons, they shrink to fit.

**Design:**
- Background `#C0C0C0`
- Text: 11px MS Sans Serif, truncated with `…` if too long
- Left-aligned icon (16×16) — optional but nice
- Raised bevel when window is not active
- Pressed bevel when window is active (focused)
- Clicking focuses the window (or restores if minimized)

**Behavior:** Minimized windows keep their task button. The button is un-pressed (raised). Clicking it restores the window.

### 4.4 System Tray (P0)

Right side of the taskbar. Contains:

| Icon | Tooltip | Behavior |
|---|---|---|
| Volume | `Volume: — (speakers disconnected in 1998)` | Click: nothing. Hover: tooltip. |
| Network | `Network: 12 computers connected. 1 unknown device.` | Double-click: dialog (easter egg E02) |
| Clock | Live time (e.g., `3:14 AM`) | Hover: date tooltip. 5 clicks in 3s: shows `20:50` (easter egg A02) |

**Clock format:** 12-hour, no leading zero, `h:mm AM/PM`. Updates every second.

**Clock font:** 11px MS Sans Serif, black, 2px from right edge.

**Tray separator:** A 1px raised vertical line between the task buttons and the tray icons.

### 4.5 Cricket TV Widget (P1)

Bottom-right corner of the desktop (not the taskbar). A small 120×80px "TV" showing a cricket score.

**Content:** `IND 98/2 (34.2 ov)` — always the same. It never changes (easter egg E03).

**Styling:** CRT-like bezel, glowing green text on black. Static.

**Click:** Shows a tooltip: `Match in progress since 1998.`

---

## 5. Start Menu

### 5.1 Start Menu Structure (P0)

Clicking the Start button opens the Start Menu. It is a **cascading menu** — hovering over items with submenus opens them.

**Design:**
- Background: `#C0C0C0`
- Border: raised 3D bevel
- Width: 180px (first level)
- Item height: 22px
- Left sidebar: 20px wide, gradient navy-to-black (the classic Win98 sidebar with vertical "Windows 98" text)

**Top-level items (in order):**

```
Windows Update
-----------
Programs          ►
Favorites         ►
Documents         ►
Settings          ►
Find              ►
Help
Run...
-----------
Log Off GUEST...
Shut Down...
```

### 5.2 Submenu: Programs (P0)

```
Accessories       ►
Games             ►
StartUp           ►
-----------
Internet Explorer
MS-DOS Prompt
Windows Explorer
```

**Accessories:**
```
Calculator
Notepad
Paint
Media Player
-----------
System Tools ► (empty)
```

**Games:**
```
Minesweeper
Solitaire
```

### 5.3 Submenu: Favorites (P1)

```
Channels          ► (empty)
Links             ► (empty)
-----------
SHREE CYBER ZONE Homepage
Project 2050 (does not open — tooltip: "Not available")
```

**Rule:** `SHREE CYBER ZONE Homepage` opens Internet Explorer to the intranet homepage. `Project 2050` does nothing — the tooltip tells the player it is not available. This is a subtle hint.

### 5.4 Submenu: Documents (P1)

Recent documents (up to 15):

```
rates_1998.doc
complaint_letter.txt
tommy.jpg
-----------
My Documents
```

**Rule:** This list **grows as the player opens files.** It is a real MRU (most-recently-used) list. This is a small but powerful authenticity detail.

### 5.5 Submenu: Settings (P1)

```
Control Panel
Printers
Taskbar & Start Menu...
-----------
Folder Options...
Active Desktop ► (empty)
Windows Update (does nothing)
```

**Rule:** `Control Panel` opens the Control Panel window (see `settings.md`). `Printers` opens the Printer Queue. The others do nothing or open a "not implemented" dialog styled like Win98.

### 5.6 Submenu: Find (P1)

```
Files or Folders...
Computer...
On the Internet...
People...
```

**Rule:** `Files or Folders...` opens a Find dialog that searches the virtual filesystem. This is a powerful discovery tool — a curious player can search for `PROJECT` or `EIPSTEIN` and find the files. This should be **intentionally implemented.**

### 5.7 Help (P1)

Opens Windows Help. See easter egg B04. One topic: `"What to do if you were never here."`

### 5.8 Run (P0)

Opens the Run dialog:

```
Run

Type the name of a program, folder, document, or
Internet resource, and Windows will open it for you.

Open: [_________________________]

[ OK ]  [ Cancel ]  [ Browse... ]

[ ] Run in separate memory space
```

**Behavior:** The Run box accepts typed commands. The easter eggs B02, B03, B04, B05, B06, B07, B08, B10, B11, B12 all trigger here.

**Unknown command:** Shows a dialog:

```
Cannot find the file '[command]' (or one of its components).
Make sure the path and filename are correct and that all
required libraries are available.

[ OK ]
```

### 5.9 Log Off GUEST (P1)

Shows a dialog:

```
Log Off Windows

Are you sure you want to log off?

[ Yes ]  [ No ]
```

**Behavior:** Clicking `Yes` shows a brief "logging off" screen, then returns to the desktop. The session log adds a row: `GUEST | LOGGED OFF | IMMEDIATELY LOGGED BACK IN`. The billing timer does not stop.

### 5.10 Shut Down (P0)

Shows a dialog:

```
Shut Down Windows

What do you want the computer to do?

( ) Stand by
(•) Shut down
( ) Restart
( ) Restart in MS-DOS mode

[ OK ]  [ Cancel ]  [ Help ]
```

**Behavior:**
- `Shut down` → Ending 1 (SAFE)
- `Restart` → Replays the boot sequence
- `Stand by` → Shows a black screen for 3 seconds, then returns to desktop (the machine refuses to sleep)
- `Restart in MS-DOS mode` → Shows a fake DOS prompt for 3 seconds, then returns to desktop. A single line: `C:\WINDOWS> _` — typing anything returns `Bad command or file name`.

---

## 6. System Tray (Detail)

### 6.1 Volume Icon (P1)

- 16×16 pixel speaker icon
- Hover: tooltip `Volume: — (speakers disconnected in 1998)`
- Click: nothing
- Double-click: a Volume Control window opens, but all sliders are greyed out. A label: `No audio device detected.`

### 6.2 Network Icon (P1)

- 16×16 pixel network card icon (two small monitors)
- Hover: tooltip `Network: 12 computers connected. 1 unknown device.`
- Double-click: a dialog:

```
Network

Connected to: SHREE_CYBER_ZONE
Computers connected: 12
Unknown devices: 1
Last unknown device seen: 1998

[ OK ]
```

### 6.3 Clock (P0)

- 11px MS Sans Serif, black, right-aligned
- Format: `3:14 AM`
- Hover: tooltip with full date `Sunday, November 01, 2026`
- 5 clicks in 3 seconds: shows `20:50` for 400ms, then reverts (easter egg A02)

---

## 7. Dialogs

### 7.1 Modal Dialog Anatomy (P0)

Dialogs are small windows that block interaction with the rest of the desktop until dismissed.

**Design:**
- Same window chrome as regular windows
- **No minimize or maximize buttons** — only close (`X`)
- Centered on screen (or centered on parent window)
- Cannot be resized
- Cannot be dragged off the top of the screen

### 7.2 Standard Dialog Types

**Alert dialog:**
```
┌──────────────────────────────────┐
│ [icon] Title              [X]    │
├──────────────────────────────────┤
│                                  │
│ Message text here.               │
│                                  │
│                    [ OK ]        │
└──────────────────────────────────┘
```

**Confirm dialog:**
```
┌──────────────────────────────────┐
│ [icon] Title              [X]    │
├──────────────────────────────────┤
│                                  │
│ Are you sure?                    │
│                                  │
│           [ Yes ]  [ No ]        │
└──────────────────────────────────┘
```

**Input dialog:**
```
┌──────────────────────────────────┐
│ [icon] Title              [X]    │
├──────────────────────────────────┤
│                                  │
│ Enter a value:                   │
│ [_________________________]      │
│                                  │
│           [ OK ]  [ Cancel ]     │
└──────────────────────────────────┘
```

### 7.3 Dialog Button Order

**Windows 98 order:** `[ OK ] [ Cancel ]` (OK on left). This is the reverse of modern conventions. **Do not use modern order.**

### 7.4 Dialog Icons

| Icon | Use |
|---|---|
| ⓘ Info | Informational messages |
| ⚠ Warning | Warnings (yellow triangle, black `!`) |
| ✖ Error | Errors (red circle with white `X`) |
| ? Question | Confirmations (blue question mark) |

**Icon size:** 32×32 pixels, left-aligned in the dialog content area.

### 7.5 Dialog Beeps (P1)

Standard dialogs play a system beep on open:
- Info: `ding` (soft)
- Warning: `beep` (higher)
- Error: `error` (harsh, the classic Windows error sound)

**Rule:** Only if audio is unmuted. Always respect user preference.

### 7.6 Specific Dialogs to Build

| Dialog | Trigger | Priority |
|---|---|---|
| Shut Down Windows | Start → Shut Down | P0 |
| Run | Start → Run | P0 |
| Find Files | Start → Find → Files | P1 |
| Display Properties | Desktop right-click → Properties | P1 |
| Error: Cannot find file | Run with invalid command | P1 |
| Print dialog | File → Print in Ledger | P0 |
| PROPRIETOR login | Double-click PROPRIETOR icon | P1 |
| BSOD | Run → 2050 | P0 |
| Welcome back | Ending 2 | P1 |
| Seat acknowledged | Ending 5 | P0 |
| Network | Tray network icon double-click | P1 |
| Volume | Tray volume icon double-click | P2 |

---

## 8. Cursor & Pointer

### 8.1 Default Cursor (P0)

The classic Windows 98 arrow cursor. White fill, black 1px border, black drop shadow offset 1px down-right.

**Size:** 32×32 (the arrow itself is ~11×17 within the canvas).

**Implementation:** A custom SVG or PNG cursor. Use `cursor: url('cursor.png'), auto` — with the PNG at 32×32.

### 8.2 Cursor States (P0)

| State | Cursor | Trigger |
|---|---|---|
| Default | Arrow | Over desktop, windows |
| Select text | I-beam | Over text content |
| Busy | Hourglass | During loading or blocking operations |
| Pointer/hand | Pointing hand | Over links, buttons |
| Move | Four-arrow | Over title bar |
| Resize | Diagonal arrows | Over window resize corner |
| Not allowed | Circle with slash | Over blocked actions |
| Crosshair | Crosshair | Over Paint canvas |

**Rule:** These must be real cursors, not CSS-only. Use SVG data URIs for authenticity.

### 8.3 The Busy Cursor (P1)

When the machine is "busy" (e.g., opening a large file, playing the boot sequence), the cursor becomes the **hourglass**.

**Duration:** 300ms minimum. This makes the machine feel real.

### 8.4 The Ghost Cursor (P0)

After 60 seconds idle, a second cursor appears in the corner of the screen and moves independently for 4 seconds, then disappears (easter egg A05).

---

## 9. Fonts & Metrics

### 9.1 Font Stack (P0)

**Primary:** `MS Sans Serif`
**Fallback:** `Tahoma, Verdana, sans-serif`

**Rule:** Load MS Sans Serif via `@font-face` if available. If not, Tahoma is the closest match. **Never use Arial, Helvetica, or system-ui.**

### 9.2 Font Sizes (P0)

| Use | Size | Weight |
|---|---|---|
| Body text | 11px | normal |
| Title bar text | 11px | bold |
| Menu items | 11px | normal |
| Button text | 11px | normal |
| Status bar text | 11px | normal |
| Icon labels | 11px | normal |
| Dialog text | 11px | normal |
| Notepad content | 12px | normal (monospace for .txt) |
| BSOD text | 14px | normal (monospace) |

### 9.3 Line Height (P0)

- Body text: **16px** line height
- Title bar: **14px** (vertically centered in 18px bar)
- Notepad: **18px**

### 9.4 Letter Spacing

- Default: **0**
- Title bar: **0**
- Everything else: **0**

**Rule:** No letter-spacing tweaks. Win98 did not adjust letter-spacing.

### 9.5 Text Rendering (P0)

- **No anti-aliasing** on small text where possible
- Use `-webkit-font-smoothing: none` (where supported)
- Use `text-rendering: optimizeSpeed`
- **No subpixel rendering tweaks** — allow browser defaults, but avoid CSS that smooths text
- **No text shadows except on desktop icon labels** (1px black shadow for readability)

### 9.6 Monospace Fonts (P1)

For Notepad, DOS prompt, BSOD, and BIOS text:
- **Primary:** `Fixedsys` (if available via web font)
- **Fallback:** `Courier New, monospace`
- Size: **12px** (notepad), **14px** (BSOD)

---

## 10. Colors

### 10.1 The Exact Palette (P0)

| Role | Hex | Use |
|---|---|---|
| Desktop | `#008080` | Teal background |
| Window face | `#C0C0C0` | Buttons, taskbar, dialog backgrounds |
| Title bar active | `#000080` | Active window title |
| Title bar inactive | `#808080` | Inactive window title |
| Title text active | `#FFFFFF` | Active title |
| Title text inactive | `#C0C0C0` | Inactive title |
| Highlight | `#000080` | Selection background |
| Highlight text | `#FFFFFF` | Selected text |
| Button highlight | `#FFFFFF` | Top-left bevel |
| Button shadow | `#808080` | Bottom-right bevel |
| Button dark shadow | `#000000` | Outer border |
| Text | `#000000` | Standard text |
| Disabled text | `#808080` | Greyed text |
| Warning | `#800000` | Ledger red text |
| Error | `#FF0000` | Error dialog |
| Link | `#0000FF` | IE hyperlinks |
| Visited link | `#800080` | IE visited |

### 10.2 Bevel Styling (P0)

Windows 98 uses 3D bevels for buttons and borders. The pattern:

**Raised (un-pressed button):**
```
Border top: 1px #FFFFFF
Border left: 1px #FFFFFF
Border right: 1px #000000
Border bottom: 1px #000000
Inner top: 1px #C0C0C0 (or background)
Inner left: 1px #C0C0C0
Inner right: 1px #808080
Inner bottom: 1px #808080
```

**Pressed (pressed button):**
```
Border top: 1px #000000
Border left: 1px #000000
Border right: 1px #FFFFFF
Border bottom: 1px #FFFFFF
```

**Rule:** Every button, every dialog, every window chrome uses this exact bevel. No exceptions. No rounded corners.

### 10.3 Selection Styling (P0)

When text is selected:
- Background: `#000080`
- Text: `#FFFFFF`
- No rounded corners, no transitions

---

## 11. Sounds

### 11.1 Sound Design Principles (P1)

Sound is **polish**. If it works, it doubles the authenticity. If it fails, it ruins the experience.

**Rule:** All sounds must be:
- **Short** (< 1.5s)
- **Quiet** (default to low volume or mute)
- **Original** (royalty-free or CC0, or synthesized)
- **Muteable** (always offer a mute toggle)

### 11.2 Required Sounds (P1)

| Sound | Trigger | Notes |
|---|---|---|
| Startup chime | Boot sequence completes | Soft, synth, 90s-style |
| Click | Button press, menu open | Short, dry click |
| Error beep | Error dialog opens | Harsh, high |
| Info beep | Info dialog opens | Softer, mid |
| Warning beep | Warning dialog opens | Mid-high, two-tone |
| Dog bark | Run → `tommy` | One bark, not three |
| Modem handshake | Opening a new chat session | The iconic dial-up handshake |
| Cricket ambience | Background (optional) | Faint hum, match crowd |
| Tube TV hum | Background (optional) | Low hum |
| Ceiling fan | Background (optional) | Faint whir |
| Print whir | Print dialog open | Mechanical print sound |
| Paper jam | Print jam trap | Grinding, then silence |

### 11.3 Ambient Sound (P2)

The café ambience is optional but high-impact:
- Ceiling fan whir (looping, very quiet)
- Tube TV hum (looping, very quiet)
- Occasional distant cricket crowd (rare, quiet)

**Rule:** All ambience is **muted by default**. The player must enable it via the system tray or a settings panel. Most judges will demo in public. Respect that.

### 11.4 Audio Controls (P0)

- Mute button in the system tray (a small speaker icon)
- All sound respects `prefers-reduced-motion` (no sudden sounds)
- All sound respects `prefers-reduced-data` (no loading sound assets)

---

## 12. Keyboard Shortcuts

### 12.1 Global Shortcuts (P0)

| Shortcut | Action |
|---|---|
| `Win` (or `Ctrl+Esc`) | Opens Start Menu |
| `Alt+F4` | Closes active window |
| `Alt+Tab` | Cycles through open windows |
| `Ctrl+Alt+Del` | Shows "Close Program" dialog |
| `Esc` | Closes active menu or dialog |
| `Enter` | Activates default button in dialog |
| `F1` | Opens Help |

### 12.2 Window Shortcuts (P1)

| Shortcut | Action |
|---|---|
| `Alt+F4` | Close window |
| `Alt+Space` | Open window menu |
| `Ctrl+F6` | Cycle windows (rarely used, but authentic) |

### 12.3 Notepad Shortcuts (P1)

| Shortcut | Action |
|---|---|
| `Ctrl+F` | Opens Find in file |
| `Ctrl+S` | Save (no-op if file is read-only) |
| `Ctrl+O` | Opens File Open dialog |
| `Ctrl+A` | Select all |
| `Ctrl+C` | Copy |
| `Ctrl+V` | Paste (actually works via clipboard API) |

### 12.4 Explorer Shortcuts (P1)

| Shortcut | Action |
|---|---|
| `Backspace` | Go up one folder |
| `Alt+Left` | Back |
| `Alt+Right` | Forward |
| `Ctrl+F` | Find |
| `F5` | Refresh |
| `Ctrl+N` | New Explorer window |

### 12.5 The `Ctrl+Alt+Del` Dialog (P1)

The classic Windows 98 "Close Program" dialog:

```
Close Program

Press Ctrl+Alt+Del again to restart your computer.
You will lose any unsaved information in all programs.

MS-DOS Prompt
Session Log
Explorer
Cafê Manager
Printer Queue

[ End Task ]  [ Shut Down ]  [ Cancel ]
```

**Behavior:** `End Task` closes the selected program (or does nothing if it's Explorer/System). `Shut Down` opens the Shut Down dialog. `Cancel` closes.

---

## 13. Context Menus

### 13.1 File Context Menu (P1)

Right-click a file:

```
Open
Print
-----------
Send To ►
Cut
Copy
-----------
Create Shortcut
Delete
Rename
-----------
Properties
```

**Rule:** Only `Open`, `Delete`, `Rename`, and `Properties` do anything meaningful. The rest are visual only (or open a "not available" dialog).

### 13.2 Folder Context Menu (P1)

Right-click a folder:

```
Open
Explore
Find...
-----------
Cut
Copy
-----------
Create Shortcut
Delete
Rename
-----------
Properties
```

### 13.3 Desktop Context Menu (P1)

See section 2.3.

### 13.4 Taskbar Context Menu (P2)

Right-click the taskbar:

```
Toolbars ►
-----------
Cascade Windows
Tile Windows Horizontally
Tile Windows Vertically
Minimize All Windows
-----------
Properties
```

**Rule:** `Minimize All Windows` actually works (minimizes every open window). The others are visual only.

---

## 14. Drag & Drop

### 14.1 File Drag (P2)

Dragging a file icon:
- Shows a semi-transparent ghost of the icon following the cursor
- The original icon stays in place
- Dropping on a folder **moves the file** in the virtual filesystem
- Dropping on the desktop creates a shortcut (or moves the file to Desktop)
- Dropping outside a valid target shows the "not allowed" cursor (circle with slash)

**Implementation:** This is a P2 feature. The virtual filesystem should support it, but if time is short, drag & drop can be visual-only.

### 14.2 Window Drag (P0)

Already covered in section 3.3.

### 14.3 Selection Drag (P2)

Dragging on empty desktop area creates a selection rectangle (section 2.4).

---

## 15. Scrollbars

### 15.1 Scrollbar Design (P0)

Windows 98 scrollbars are the **chunkiest, most distinctive** element of the UI. They must be perfect.

**Dimensions:**
- Vertical scrollbar: **16px wide**
- Horizontal scrollbar: **16px tall**
- Arrow buttons: **16×16px**
- Thumb (slider): sized proportionally to visible content
- Empty track: 3D sunken bevel

**Colors:**
- Arrow buttons: `#C0C0C0` with raised bevel
- Track: `#808080` (sunken bevel, the "trough")
- Thumb: `#C0C0C0` with raised bevel

**Arrows:**
- Up arrow: small black triangle pointing up (▼ for down, ▶ for right, ◀ for left)
- Arrow glyph: **black `#000000`**, filled, approximately 6×6 within the 16×16 button

### 15.2 Scrollbar Behavior (P0)

- **Click arrow:** Scrolls by one line (small step)
- **Click track:** Scrolls by one page (larger step)
- **Drag thumb:** Smooth scroll following drag
- **Keyboard:** Arrow keys, Page Up, Page Down, Home, End

### 15.3 Scrollbar Visibility (P0)

- Only show when needed (content > container)
- Show both horizontal and vertical if both needed
- Corner intersection: a small 16×16 empty `#C0C0C0` square where scrollbars meet

---

## 16. Status Bars

### 16.1 Status Bar Design (P1)

Many windows have a status bar at the bottom, **20px tall**.

**Design:**
- Background: `#C0C0C0`
- Top border: 1px raised bevel (highlight on top, shadow on bottom)
- Text: 11px MS Sans Serif, left-aligned, 4px from left edge
- Segments: separated by raised vertical dividers (optional)

### 16.2 Notepad Status Bar (P1)

Notepad shows:
```
Ln 1, Col 1                        100%
```

Left segment: cursor position. Right segment: zoom percentage (always `100%`).

### 16.3 Explorer Status Bar (P1)

Explorer shows:
```
12 object(s)                        1.44 MB
```

Left segment: item count. Right segment: total size (or `My Computer`).

---

## 17. Tooltips

### 17.1 Tooltip Design (P1)

Hovering over buttons, tray icons, or file icons (after a delay) shows a tooltip.

**Design:**
- Background: `#FFFFE1` (pale yellow)
- Border: 1px `#000000`
- Text: 11px MS Sans Serif, black, 2px padding
- No shadow, no rounded corners
- Appears after **500ms delay**
- Disappears when cursor moves away

**Implementation:** A single absolutely-positioned `<div>` follows the cursor. One tooltip at a time.

### 17.2 Tooltip Content (P1)

| Element | Tooltip |
|---|---|
| Volume icon | `Volume: — (speakers disconnected in 1998)` |
| Network icon | `Network: 12 computers connected. 1 unknown device.` |
| Clock | Full date |
| Start button | (none — authentic Win98 has no tooltip) |
| Taskbar buttons | Full window title (if truncated) |
| File icons | File name (if truncated) |

---

## 18. Screensaver

### 18.1 The Screensaver (P1)

After **3 minutes of idle**, the screensaver activates.

**Design:** The classic Windows 98 "3D Flying Objects" screensaver — text flying in 3D, or the simpler "Starfield Simulation."

**Special behavior:** One of the flying objects is a small window showing the **Session Log**, still updating in real time. This is easter egg A06.

**Dismissal:** Move mouse or press any key.

**Rule:** The screensaver does not pause the billing timer. The session keeps running. The machine is still alive.

---

## 19. Shutdown & Restart

### 19.1 The Shut Down Flow (P0)

`Start → Shut Down → Yes` triggers Ending 1 (SAFE).

**Screen 1: "Windows is shutting down..."**
```
┌──────────────────────────────────┐
│                                  │
│     Windows is shutting down...  │
│                                  │
│        [  progress bar  ]        │
│                                  │
└──────────────────────────────────┘
```
- Background: `#000080` (navy) or black
- Text: white, 14px bold
- Progress bar: small rectangular animation, or a spinning cursor

**Screen 2: "It is now safe to turn off your computer."**
- Background: `#000000` (black)
- Text: **orange `#FFA500`**, 16px bold, centered
- The billing timer remains faintly visible in the bottom-right corner, still counting
- After 10 seconds, the screen fades to black

**Rule:** Reloading the page returns to the 1998 desktop. Nothing changes. The session never ended. The billing timer continues.

### 19.2 Restart (P1)

`Start → Shut Down → Restart → Yes`:
- Shows "Windows is restarting..."
- Replays the boot sequence
- Returns to desktop

### 19.3 Stand By (P2)

`Start → Shut Down → Stand by → Yes`:
- Screen goes black for 3 seconds
- Returns to desktop
- A dialog appears: `The machine did not sleep.` (small easter egg)

### 19.4 Restart in MS-DOS Mode (P2)

`Start → Shut Down → Restart in MS-DOS mode → Yes`:
- Shows a black fullscreen with white monospace text:
  ```
  Starting Windows 98...
  
  C:\WINDOWS> _
  ```
- Any typed command returns `Bad command or file name.`
- Typing `exit` returns to Windows (replays boot sequence)
- A small line at the top: `MS-DOS 7.10 (C)Copyright Microsoft Corp 1981-1998`

---

## 20. Feature Completeness Checklist

Before demo, verify every P0 item works.

### Boot & Startup
- [ ] Boot sequence plays (~4s)
- [ ] BIOS text is monospace white on black
- [ ] Startup chime plays (if unmuted)
- [ ] Boot sequence skippable by click/key

### Desktop
- [ ] Teal `#008080` background
- [ ] All 12 default icons present
- [ ] Icons are 32×32 with white labels
- [ ] Single click selects, double click opens
- [ ] Right-click opens desktop context menu
- [ ] `SEATS.BMP` wallpaper available via Properties

### Window Manager
- [ ] Windows have 18px navy title bars
- [ ] Minimize, maximize, close buttons work
- [ ] Window drag works from title bar
- [ ] Window resize works from bottom-right
- [ ] Focus brings window to front
- [ ] Inactive windows have grey title bars
- [ ] One window is active at a time
- [ ] Windows do not have drop shadows or rounded corners

### Taskbar
- [ ] 28px tall, grey `#C0C0C0`
- [ ] Start button works
- [ ] Task buttons per open window
- [ ] System tray with volume, network, clock
- [ ] Clock updates every second
- [ ] Task buttons show pressed state when focused

### Start Menu
- [ ] Opens on Start click
- [ ] All items present (Programs, Favorites, Documents, Settings, Find, Help, Run, Log Off, Shut Down)
- [ ] Submenus cascade on hover
- [ ] Items are 22px tall
- [ ] Sidebar with vertical "Windows 98" text
- [ ] Closes on outside click or `Esc`

### Dialogs
- [ ] Shut Down dialog works
- [ ] Run dialog accepts commands
- [ ] Find dialog searches virtual FS
- [ ] Error dialogs use Windows 98 styling
- [ ] Button order: `[ OK ] [ Cancel ]` (Win98 order)
- [ ] Modal (blocks input to parent)

### Cursor
- [ ] Default arrow cursor is Win98 style
- [ ] Busy cursor is hourglass
- [ ] Resize cursor on window corner
- [ ] Move cursor on title bar
- [ ] Ghost cursor after 60s idle

### Fonts & Colors
- [ ] MS Sans Serif (or Tahoma fallback)
- [ ] 11px body, 11px bold title
- [ ] Exact colors from section 10
- [ ] Bevels on all buttons
- [ ] No rounded corners, no gradients, no shadows

### Sounds
- [ ] Startup chime
- [ ] Click on buttons
- [ ] Error beep on error dialogs
- [ ] Mute toggle in system tray
- [ ] All sounds respect `prefers-reduced-motion`

### Keyboard
- [ ] `Alt+F4` closes active window
- [ ] `Alt+Tab` cycles windows
- [ ] `Ctrl+Alt+Del` opens Close Program dialog
- [ ] `Ctrl+Esc` opens Start Menu
- [ ] `Esc` closes menus/dialogs

### Context Menus
- [ ] File context menu
- [ ] Folder context menu
- [ ] Desktop context menu
- [ ] Taskbar context menu (optional)

### Scrollbars
- [ ] 16px wide/tall
- [ ] 3D arrow buttons
- [ ] Sunken track, raised thumb
- [ ] Arrows scroll by line, track click scrolls by page
- [ ] Thumb drag works

### Status Bars
- [ ] Notepad shows `Ln X, Col Y`
- [ ] Explorer shows item count and size

### Tooltips
- [ ] Pale yellow `#FFFFE1` background
- [ ] 1px black border
- [ ] Appear after 500ms delay
- [ ] Tray icons have tooltips

### Screensaver
- [ ] Activates after 3 minutes idle
- [ ] Session Log overlay visible in screensaver
- [ ] Dismisses on mouse/keyboard

### Shutdown
- [ ] "Windows is shutting down..." screen
- [ ] "It is now safe to turn off your computer." orange text
- [ ] Billing timer still ticking in corner
- [ ] Reload returns to desktop

---

## 21. What Not to Build

These are **tempting but wrong.** Do not build them.

| Feature | Why not |
|---|---|
| **Frosted glass / Aero effects** | This is Windows 98. No transparency. |
| **Animations on window open/close** | Win98 had instant window rendering. |
| **Smooth scrolling** | Win98 scrolled in chunks. Use `scroll-behavior: auto`. |
| **Rounded corners anywhere** | Not a single rounded corner. Ever. |
| **Drop shadows** | Only text shadows on icon labels. Nothing else. |
| **Gradients** | Only the Start Menu sidebar. Nowhere else. |
| **Modern fonts** | MS Sans Serif or Tahoma. Nothing else. |
| **Emoji anywhere** | This is 1998. |
| **Dark mode** | Win98 has no dark mode. |
| **Retina-scaling icons** | Pixelated icons are the point. Use `image-rendering: pixelated`. |
| **Accessibility that breaks the aesthetic** | Provide keyboard shortcuts and screen reader labels, but do not change the visual design to "modernize" it. |
| **Cookie banners** | This is a game, not a website. |
| **Loading spinners** | Use the hourglass cursor. |
| **Hover animations on buttons** | Instant state changes. No transitions. |

---

## 22. The One Rule of This Document

> **Every pixel should feel like it was rendered in 1998.**

The build is not a "modern UI inspired by Windows 98." It is a **Windows 98 desktop** that happens to run in a browser. If a modern browser limitation forces a compromise, solve it in a way that preserves the illusion.

**The shell is not decoration. The shell is the game.**

---

## 23. Related Documents

| Document | What it covers |
|---|---|
| `README.md` | Public project overview |
| `story.md` | Full narrative, all endings |
| `easter_eggs.md` | All 61 eggs, prioritized |
| `applications.md` | App-by-app build specs |
| `websites.md` | Internet Explorer fake sites |
| `settings.md` | Control Panel, Display Properties |
| `games.md` | Minesweeper, Solitaire, game studio |
| `docs_and_files.md` | Public PC files |
| `chats_and_emails.md` | Chat logs, emails, drafts |
| `UIUX.md` | Boot sequence, audio, wallpaper, core functionality |

---

<div align="center">

**Every bevel. Every pixel. Every grey button.**

**This is Windows 98. Act like it.**

**Start → Run → `2050`**

</div>

---

**End of `features.md`. Ready for the next file: `applications.md`.**