# settings.md

> **Project:** SHREE CYBER ZONE — PC 03 (ADMIN)
> **For:** Gandhi Hackathon 2026 · OpenLake × Meraz · IIT Bhilai · 1st November 2026
> **Document status:** LOCKED · Full Control Panel spec · Build-ready
> **Rule:** Settings are where the machine reveals itself. Every panel is a door. Every option is a choice the player does not know they are making.

---

## 0. How to Read This Document

This document specifies every **settings surface** in the build:

1. **Control Panel** — the shell that contains all applets
2. **Display Properties** — wallpaper, screensaver, appearance, effects
3. **Mouse Properties** — pointers, cursor speed, trails
4. **Keyboard Properties** — repeat rate, cursor blink
5. **Date/Time Properties** — the clock, the calendar, the date-aware eggs
6. **Sounds Properties** — event sounds, audio scheme
7. **Add/Remove Programs** — what is installed, what cannot be removed
8. **System Properties** — device manager, performance, computer name
9. **Regional Settings** — locale, time zone, currency
10. **Printers** — the queue, the driver, the jam
11. **Network** — the 12 PCs, the unknown device
12. **Modems** — the dial-up handshake
13. **Fonts** — the installed fonts
14. **Users** — GUEST, PROPRIETOR, the empty seat
15. **Accessibility** — the options nobody uses
16. **Taskbar & Start Menu Properties** — the customization
17. **Folder Options** — the hidden files
18. **Internet Options** — the browser settings
19. **The Settings-Only Easter Eggs** — the eggs that only live here
20. **Build Notes** — implementation, priorities, what not to build

**Every panel has:**
- **Priority** (P0 / P1 / P2)
- **Access path** (how the player gets here)
- **Layout** (tabs, fields, buttons)
- **Behavior** (what works, what doesn't)
- **Eggs** (easter eggs triggered here)
- **Build time** (estimate)

**Settings are not decoration. They are the machine's memory of itself.** The player who opens Control Panel will find the machine's self-knowledge — and the machine's lies.

---

## 1. Control Panel

### 1.1 Purpose

Control Panel is the **hub** for all settings. It is the app that makes the machine feel like a real Windows 98 installation, not a game pretending to be one.

### 1.2 Priority

**P1.** Strongly recommended. The build feels hollow without it, but it can be skipped if time is short.

### 1.3 Access Paths

| Path | Notes |
|---|---|
| Start → Settings → Control Panel | Primary |
| My Computer → Control Panel | Secondary |
| Explorer address bar → `Control Panel` | Tertiary |
| Explorer address bar → `C:\WINDOWS\Control Panel` | Authentic path |

### 1.4 Window Layout

```
┌──────────────────────────────────────────────────────────────┐
│ [control panel] Control Panel                  [_] [□] [X]   │
├──────────────────────────────────────────────────────────────┤
│ File  Edit  View  Go  Favorites  Help                        │
├──────────────────────────────────────────────────────────────┤
│ Address: [Control Panel_____________________________]  Go    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  [🖥 Display]       [🖱 Mouse]        [⌨ Keyboard]           │
│  [🔊 Sounds]        [🕐 Date/Time]    [🌐 Regional]          │
│  [🖨 Printers]      [📞 Modems]       [🌐 Network]           │
│  [➕ Add/Remove]    [💻 System]       [🔤 Fonts]             │
│  [👤 Users]         [♿ Accessibility] [📁 Folder Options]    │
│  [🌍 Internet]      [📋 Taskbar]      [🔋 Power]             │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ 18 object(s)                                                 │
└──────────────────────────────────────────────────────────────┘
```

### 1.5 Applet Icons

Each applet is a **32×32 pixel icon** with a label below, in **Large Icons** view (default). The icons must be period-accurate pixel art.

| Icon | Label | Opens |
|---|---|---|
| Monitor with screen | `Display` | Display Properties |
| Mouse | `Mouse` | Mouse Properties |
| Keyboard | `Keyboard` | Keyboard Properties |
| Speaker | `Sounds` | Sounds Properties |
| Clock | `Date/Time` | Date/Time Properties |
| Globe with grid | `Regional Settings` | Regional Settings |
| Printer | `Printers` | Printers folder |
| Telephone | `Modems` | Modem Properties |
| Two computers | `Network` | Network dialog |
| Floppy with plus | `Add/Remove Programs` | Add/Remove |
| Computer tower | `System` | System Properties |
| Letter "A" | `Fonts` | Fonts folder |
| Two people | `Users` | User Properties |
| Wheelchair | `Accessibility` | Accessibility Options |
| Folder | `Folder Options` | Folder Options |
| Globe with "e" | `Internet Options` | Internet Properties |
| Taskbar | `Taskbar & Start Menu` | Taskbar Properties |
| Battery | `Power Management` | Power Properties |

### 1.6 Special Egg

**Double-clicking Control Panel's title bar** (not the icon) shows a tooltip: `These settings are read-only.`

**Hovering over the `System` icon for 5 seconds** shows a tooltip: `The system is fine. The system is always fine.`

### 1.7 Build Notes

- **Do:** Use a CSS grid for the icon layout (4 columns × 5 rows).
- **Do:** Make every icon open its corresponding applet window.
- **Don't:** Implement every single field in every applet. The **feel** of the settings panel matters more than the functionality.
- **Priority:** Icon layout > Display Properties > Date/Time > System > Add/Remove > Everything else.

**Estimated: 30 min** (shell + 5 applets; more applets increase time).

---

## 2. Display Properties

### 2.1 Purpose

**Display Properties** is the **most important settings panel in the game.** It hosts the `SEATS.BMP` wallpaper (egg A03), the screensaver, and the appearance. It is where the machine's visual identity is exposed.

### 2.2 Priority

**P0.** The `SEATS.BMP` wallpaper alone justifies this.

### 2.3 Access Paths

- Control Panel → Display
- Desktop right-click → Properties
- Start → Settings → Active Desktop (does nothing)

### 2.4 Window Layout

Display Properties is a **tabbed dialog** with 6 tabs: Background, Screen Saver, Appearance, Effects, Web, Settings.

```
┌──────────────────────────────────────────────────────────────┐
│ Display Properties                             [_] [X]       │
├──────────────────────────────────────────────────────────────┤
│ ┌─Background─┬─Screen Saver─┬─Appearance─┬─Effects─┬─...─┐   │
│ │                                                        │   │
│ │  Wallpaper                                             │   │
│ │  ┌────────────────────────┐  ┌───────────────────────┐ │   │
│ │  │ (None)                 │  │                       │ │   │
│ │  │ Clouds                 │  │                       │ │   │
│ │  │ Forest                 │  │  [Preview monitor]    │ │   │
│ │  │ SEATS                  │  │                       │ │   │
│ │  │ Teal                   │  │                       │ │   │
│ │  │ Windows 98             │  │                       │ │   │
│ │  │ ...                    │  │                       │ │   │
│ │  └────────────────────────┘  └───────────────────────┘ │   │
│ │                                                        │   │
│ │  Display:  [Stretch ▼]                                 │   │
│ │                                                        │   │
│ │  [ Pattern... ]  [ Apply ]  [ OK ]  [ Cancel ]         │   │
│ └────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

### 2.5 Background Tab

**Wallpaper list (scrollable):**

| Wallpaper | Description |
|---|---|
| `(None)` | Solid `#008080` teal |
| `Clouds` | A 1998 Windows wallpaper — pixelated clouds |
| `Forest` | A 1998 Windows wallpaper — pixelated forest |
| `GoldWeave` | A classic Windows 98 wallpaper — gold pattern |
| `Honey` | A classic Windows 98 wallpaper — amber honeycomb |
| `SEATS` | **THE EASTER EGG.** A nine-chair org chart. |
| `Teal` | Solid teal (same as None, but listed) |
| `Windows 98` | The Windows 98 logo wallpaper |
| `Red, White, and Blue` | Patriotic wallpaper (period-accurate) |
| `Straw Mat` | A classic textured wallpaper |

**`SEATS.BMP` is the last item in the list.** It has **no thumbnail.** It is not visible unless the player scrolls to the bottom of the list.

**Display dropdown:**
- `Center`
- `Tile`
- `Stretch`
- Default: `Stretch`

**Preview monitor:**
- A 16:12 pixel-art monitor
- Shows the selected wallpaper in miniature
- When `SEATS` is selected, the preview shows the org chart

**Pattern button:**
- Opens a Pattern dialog (P2)
- Only works if wallpaper is `(None)`
- Shows a list of 1998 patterns (none work — visual only)

### 2.6 The `SEATS.BMP` Wallpaper (Egg A03)

**When the player selects `SEATS` and clicks `Apply`:**

1. The preview shows the org chart.
2. Clicking `OK` closes the dialog.
3. The desktop wallpaper changes to `SEATS.BMP`.
4. The taskbar and icons remain visible.

**The wallpaper design:**

A 800×600 bitmap, **16-color palette**, showing nine chairs in a 3×3 grid. Each chair is a simple pixel-art chair (backrest, seat, legs). Under each chair is a label in 8px pixel font:

```
SEAT_01        SEAT_02        SEAT_03
RETIRED        ACTIVE         VACANT

SEAT_04        SEAT_05        SEAT_06
ACTIVE         NEUTRALIZED    ACTIVE

SEAT_07        SEAT_08        SEAT_09
MERAZ /        ACTIVE         ACTIVE
OPENLAKE,
IIT BHILAI
CANDIDATE
PENDING
```

**Rule:** `SEAT_07`'s label is **six lines long.** It is visibly longer than the others. It is the only chair with a description beyond a single word. It is the only chair with a name.

**Background of wallpaper:** `#000080` navy. The chairs and text are white, grey, and the 16-color palette.

**Font in wallpaper:** A pixel font (or 8px Arial with `-webkit-font-smoothing: none`).

**Build note:** Pre-render this as a PNG. Do not attempt to draw it with CSS. It is a real bitmap file.

### 2.7 Screen Saver Tab

```
┌──────────────────────────────────────────────────────────────┐
│ Screen Saver                                                 │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │ [Starfield Simulation]                           ▼  │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │                                                      │    │
│  │     [ Animated preview of the screensaver ]          │    │
│  │                                                      │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
│  Wait:  [ 3 ] minutes    [✓] Password protected              │
│                                                              │
│  [ Settings... ]  [ Preview ]                                │
│                                                              │
│  Energy saving features of monitor:                          │
│  [ Settings... ]                                             │
└──────────────────────────────────────────────────────────────┘
```

**Screensaver dropdown:**

| Option | Behavior |
|---|---|
| `(None)` | No screensaver |
| `3D Flying Objects` | Text flying in 3D |
| `3D Maze` | A maze flythrough |
| `3D Pipes` | Pipes growing |
| `Curves and Colors` | Colorful curves |
| `Flying Windows` | Flying Windows 98 logos |
| `Mystify` | Trailing lines |
| `Scrolling Marquee` | Scrolling text |
| `Starfield Simulation` | **Default.** Stars flying toward the viewer |

**Default:** `Starfield Simulation`, 3 minutes.

**The easter egg (A06):** In the `Starfield Simulation`, one of the stars is actually a **tiny Session Log window**, flying toward the viewer with the stars. It is visible for 2-3 seconds before it "passes" the camera.

**Implementation:** In the screensaver canvas, render one overlay div containing a live Session Log snapshot (updated every second). The div is positioned and scaled like a star, moving toward the camera. When it "passes" the camera (reaches full screen size), it is removed and a new one is spawned on a timer.

**Preview button:** Runs the screensaver in the preview box for 5 seconds.

**Settings button:** Opens a dialog with settings for the selected screensaver. For `Starfield Simulation`, the settings are:

```
Starfield Simulation Settings

Warp Speed:   [ ████████░░ ] 
Number of Stars: [ 400 ]
[✓] Blink

[ OK ]  [ Cancel ]
```

**Password protected:** Checkbox. Checking it shows a dialog:

```
Password Protection

You must type a password to return to Windows after the
screen saver has started.

Password: [********]

[ OK ]  [ Cancel ]
```

The password field accepts anything. It does not matter. The screensaver does not lock. **This is the joke.**

### 2.8 Appearance Tab

```
┌──────────────────────────────────────────────────────────────┐
│ Appearance                                                   │
│                                                              │
│  Scheme:  [ Windows Standard                      ▼ ]        │
│                                                              │
│  Item:    [ Desktop                             ▼ ]          │
│  Size:    [ 0 ]  Color:  [ ██ ]  Font: [ MS Sans Serif ]    │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │                                                      │    │
│  │  [ Preview: a tiny window showing the scheme ]        │    │
│  │                                                      │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
│  [ Save As... ]  [ Delete ]                                  │
│                                                              │
│  [ Apply ]  [ OK ]  [ Cancel ]                               │
└──────────────────────────────────────────────────────────────┘
```

**Scheme dropdown:**

| Scheme | Description |
|---|---|
| `Windows Standard` | **Default.** Navy title bars, grey buttons. |
| `Brick` | Red title bars |
| `Desert` | Tan title bars |
| `Eggplant` | Purple title bars |
| `High Contrast Black` | Black background, white text |
| `High Contrast White` | White background, black text |
| `Lilac` | Purple-pink title bars |
| `Maple` | Brown title bars |
| `Marine` | Teal title bars |
| `Rose` | Pink title bars |
| `Spruce` | Green title bars |
| `Storm` | Grey title bars |
| `Wheat` | Yellow title bars |

**Behavior:** Selecting a scheme and clicking `Apply` changes the **entire desktop color scheme.** Title bars, buttons, and window chrome update instantly.

**The easter egg:** There is a **hidden scheme** at the bottom of the dropdown list, after `Wheat`:

```
SEAT
```

Selecting `SEAT` applies a **black-and-white scheme**: white title bars, black text, white buttons, black text. Every window on the desktop becomes **inverted.** This is a subtle nod to `SEATS.BMP`.

**Rule:** After 10 seconds in `SEAT` scheme, a small line appears in the taskbar: `You are already in the chair.` Then the scheme reverts to `Windows Standard` automatically.

**Item dropdown:**

| Item | Description |
|---|---|
| `Active Title Bar` | The bar itself |
| `Active Title Bar Text` | The text on the bar |
| `Button Face` | The button color |
| `Button Text` | The button text color |
| `Desktop` | The desktop color |
| `Inactive Title Bar` | The inactive bar |
| `Menu` | The menu background |
| `Menu Bar` | The menu bar |
| `Message Box` | Dialog background |
| `Selected Items` | Selection background |
| `ToolTip` | The tooltip background |
| `Window` | Window content background |

**Size field:** Only editable for items that have a size (title bar height, window border width, etc.).

**Color field:** A color picker button that opens a Windows 98 color picker dialog. **The picker works**, but changes are not applied (visual only) — the scheme is the master.

**Font field:** Shows the current font for the selected item. Read-only.

### 2.9 Effects Tab

```
┌──────────────────────────────────────────────────────────────┐
│ Visual effects                                               │
│                                                              │
│  [✓] Use large icons                                         │
│  [✓] Show icons using all possible colors                    │
│  [✓] Animate windows, menus and lists                        │
│  [ ] Smooth edges of screen fonts                            │
│  [✓] Show window contents while dragging                     │
│  [ ] Hide icons when the desktop is viewed as a Web page     │
│                                                              │
│  [ Apply ]  [ OK ]  [ Cancel ]                               │
└──────────────────────────────────────────────────────────────┘
```

**Behavior:** The checkboxes **work.** Toggling them changes the desktop:

- `Use large icons` — toggles icon size from 32px to 48px
- `Animate windows, menus and lists` — toggles the menu opening animation (Win98's classic "unfold" animation)
- `Smooth edges of screen fonts` — **must remain OFF** (the aesthetic rule is no anti-aliasing)
- `Show window contents while dragging` — toggles live window drag (off = outline drag, on = content drag)

**Rule:** Toggling `Smooth edges of screen fonts` ON shows a dialog:

```
Smooth edges of screen fonts

This option would break the aesthetic.
Windows 98 did not have this.
Please turn it back off.

[ Turn it off ]
```

Clicking the button turns it back off. The checkbox cannot stay on.

### 2.10 Web Tab

```
┌──────────────────────────────────────────────────────────────┐
│ Active Desktop                                               │
│                                                              │
│  [ ] View my Active Desktop as a web page                    │
│                                                              │
│  [ New... ]  [ Delete ]  [ Properties ]  [ Synchronize ]     │
│                                                              │
│  [ Apply ]  [ OK ]  [ Cancel ]                               │
└──────────────────────────────────────────────────────────────┘
```

**Behavior:** Toggling `View my Active Desktop as a web page` shows a dialog:

```
Active Desktop

Active Desktop is not available on this machine.

The machine does not browse itself.

[ OK ]
```

### 2.11 Settings Tab

```
┌──────────────────────────────────────────────────────────────┐
│ Display                                                      │
│                                                              │
│  Colors:  [ 16 Color                          ▼ ]            │
│                                                              │
│  Screen area:                                                │
│    Less  ─────●────  More                                    │
│          800 by 600 pixels                                   │
│                                                              │
│  Font size: [ Small fonts                       ▼ ]          │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  [ Display: Plug and Play Monitor on Generic VGA ]   │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
│  [ Advanced... ]                                             │
│                                                              │
│  [ Apply ]  [ OK ]  [ Cancel ]                               │
└──────────────────────────────────────────────────────────────┘
```

**Colors dropdown:**

| Option | Behavior |
|---|---|
| `16 Color` | **Default.** Everything renders as 16-color (this is the build's default) |
| `256 Color` | Same visual (the build is 16-color everywhere) |
| `High Color (16 bit)` | Same visual |
| `True Color (32 bit)` | **Cannot be selected.** Shows a dialog: `This machine is 16-color. It has always been 16-color.` |

**Screen area slider:**

| Value | Behavior |
|---|---|
| `640 by 480` | Changes the CSS pixel scale (zooms the whole build 1.25×) |
| `800 by 600` | **Default.** Normal scale. |
| `1024 by 768` | Zooms the build 0.8× |
| `1280 by 1024` | Zooms the build 0.625× |

**Font size dropdown:**

| Option | Behavior |
|---|---|
| `Small fonts` | **Default.** 11px MS Sans Serif |
| `Large fonts` | 13px MS Sans Serif (visibly larger across the entire build) |

**Advanced button:** Opens a new tabbed dialog with Adapter, Monitor, Performance, Color Management, Troubleshooting tabs. **All tabs are visual-only** except Troubleshooting, which shows:

```
Troubleshooting

If you are having trouble with your display:

1. Try turning it off and on again.
2. Try not looking at it.
3. Try accepting that it is fine.

The display is fine.
```

### 2.12 Display Properties Build Notes

- **Do:** Make wallpaper changes apply instantly.
- **Do:** Make scheme changes apply instantly.
- **Do:** Make font size changes apply instantly.
- **Do:** Make screen area changes zoom the whole build.
- **Don't:** Actually implement 256-color mode. The build is 16-color.
- **Don't:** Actually implement a color picker that changes the scheme. Scheme is the master.
- **Priority:** Background tab + SEATS > Appearance tab + SEAT scheme > Screen Saver tab + Starfield + Session Log overlay > Effects tab > Settings tab > Advanced.

**Estimated: 90 min.**

---

## 3. Mouse Properties

### 3.1 Purpose

Mouse Properties is a **small, satisfying** panel. It lets the player see the cursor schemes, adjust speed, and (optionally) enable cursor trails. It is one of the panels that makes the machine feel real.

### 3.2 Priority

**P1.** Low-cost, high-charm.

### 3.3 Access Paths

- Control Panel → Mouse
- (No other paths — this is the only one)

### 3.4 Window Layout

Four tabs: Buttons, Pointers, Motion, Hardware.

```
┌──────────────────────────────────────────────────────────────┐
│ Mouse Properties                               [_] [X]       │
├──────────────────────────────────────────────────────────────┤
│ ┌─Buttons─┬─Pointers─┬─Motion─┬─Hardware─┐                    │
│ │                                          │                │
│ │  Button configuration                    │                │
│ │  [✓] Right-handed                        │                │
│ │  [ ] Left-handed                         │                │
│ │                                          │                │
│ │  Double-click speed                      │                │
│ │  Slow  ─────●────  Fast                  │                │
│ │                                          │                │
│ │  [ Test area: double-click the mouse ]   │                │
│ │                                          │                │
│ │  [ Apply ]  [ OK ]  [ Cancel ]           │                │
│ └──────────────────────────────────────────┘                │
└──────────────────────────────────────────────────────────────┘
```

### 3.5 Buttons Tab

- **Right-handed / Left-handed radio buttons:** Toggling changes the cursor and click behavior. **Right-handed** is default.
- **Double-click speed slider:** Works. Changing it actually affects the double-click detection window.
- **Test area:** A small grey box. Double-clicking it triggers a "Jack-in-the-box" animation (the classic Win98 Easter egg). If the double-click speed is too slow, the box opens and closes without animation.

### 3.6 Pointers Tab

```
┌──────────────────────────────────────────────────────────────┐
│ Scheme:  [ Windows Standard                     ▼ ]          │
│                                                              │
│  ┌──────────────────────┐  ┌──────────────────────────┐     │
│  │ Normal Select        │  │ [cursor preview]         │     │
│  │ Help Select          │  │                          │     │
│  │ Working in Background│  │                          │     │
│  │ Busy                 │  │                          │     │
│  │ Precision Select     │  │                          │     │
│  │ Text Select          │  │                          │     │
│  │ Handwriting          │  │                          │     │
│  │ Unavailable          │  │                          │     │
│  │ Vertical Resize      │  │                          │     │
│  │ Horizontal Resize    │  │                          │     │
│  │ Diagonal Resize 1    │  │                          │     │
│  │ Diagonal Resize 2    │  │                          │     │
│  │ Move                 │  │                          │     │
│  │ Alternate Select     │  │                          │     │
│  │ Link Select          │  │                          │     │
│  └──────────────────────┘  └──────────────────────────┘     │
│                                                              │
│  [✓] Enable pointer shadow                                   │
│                                                              │
│  [ Save As... ]  [ Delete ]                                  │
│                                                              │
│  [ Apply ]  [ OK ]  [ Cancel ]                               │
└──────────────────────────────────────────────────────────────┘
```

**Scheme dropdown:**

| Scheme | Description |
|---|---|
| `Windows Standard` | **Default.** Arrow, hourglass, I-beam, etc. |
| `Animated Hourglasses` | The hourglass spins (Win98 style) |
| `Black and White` | Monochrome cursors |
| `Conductor` | Musical cursors |
| `Dinosaur` | A tiny dinosaur cursor |
| `Magnified` | Very large cursors |
| `Old Fashioned` | Vintage Mac-style cursors |
| `3D Bronze` | 3D-shaded bronze cursors |
| `Windows 98` | The classic Windows 98 cursors |

**Rule:** Changing the scheme changes all cursors on the desktop instantly. Not every scheme needs to be fully rendered — the cursor images can be reused with color swaps.

**The easter egg:** There is a **hidden scheme** at the bottom of the list, after `Windows 98`:

```
SEAT_07
```

Selecting `SEAT_07` changes all cursors to a **single cursor shape**: a small white chair (16×16). Every cursor state (arrow, hourglass, I-beam, resize, etc.) becomes the same chair cursor. Clicking `OK`:

- The desktop cursor becomes a chair.
- The title bar of the Mouse Properties dialog gets a subtle yellow highlight.
- A tooltip appears (persisting for 5 seconds): `You are already here.`

After 10 seconds, the cursor reverts to the previous scheme automatically. A small line appears in the taskbar: `The chair is where you sit.`

**Preview list:** Clicking any cursor state shows its preview on the right. **The preview is accurate** — it shows the actual cursor image.

**"Enable pointer shadow":** Checkbox. Win98 had this. Toggling it adds a subtle shadow to the default cursor. Default is ON.

### 3.7 Motion Tab

```
┌──────────────────────────────────────────────────────────────┐
│ Speed                                                        │
│  Slow  ─────●────  Fast                                      │
│                                                              │
│ Acceleration                                                 │
│  [ None ▼ ]                                                  │
│                                                              │
│ [ ] Show pointer trails                                      │
│                                                              │
│ [ Apply ]  [ OK ]  [ Cancel ]                                │
└──────────────────────────────────────────────────────────────┘
```

**Speed slider:** Works. Changes cursor movement speed (only visible if the cursor is controlled by JS, which it is not — cursor is the real browser cursor). **Visual only.**

**Acceleration dropdown:** None, Low, Medium, High. Visual only.

**"Show pointer trails":** The **most fun setting in the build.** Toggling it adds a trail to the cursor. Every time the mouse moves, a fading trail of cursor images follows it.

**Implementation:**

- On `mousemove`, create a small `<img>` or `<div>` with the cursor image at the current position.
- Animate it to fade out over 400ms.
- Remove it after fade.
- Limit to ~8 trail images on screen at once (the oldest fades first).

**The trail uses the cursor scheme's current cursor.** If the player set `SEAT_07` scheme and enabled trails, they see a trail of tiny chairs. This is the funniest moment in the entire build.

### 3.8 Hardware Tab

Standard Win98 hardware tab (visual only):

```
┌──────────────────────────────────────────────────────────────┐
│ Devices:                                                     │
│                                                              │
│  [🖱] PS/2 Compatible Mouse                    [Properties]  │
│                                                              │
│  Device status:                                              │
│  This device is working properly.                            │
│                                                              │
│  [ Troubleshoot... ]                                         │
└──────────────────────────────────────────────────────────────┘
```

**Properties button:** Opens a dialog with fields `Device type: Mouse`, `Manufacturer: (Standard mouse types)`, `Location: PS/2`. Everything is visual.

**Troubleshoot button:** Shows:

```
Troubleshoot

The mouse works. The mouse has always worked.

If the mouse stops working, it is not the mouse.

[ OK ]
```

### 3.9 Mouse Properties Build Notes

- **Do:** Make the pointer schemes work (they are just cursor image swaps).
- **Do:** Make the pointer trails work.
- **Do:** Make the double-click speed slider actually affect double-click detection.
- **Don't:** Implement cursor speed (browser cursor is controlled by OS).
- **Priority:** Buttons tab > Pointers tab + SEAT_07 > Motion tab + trails > Hardware tab.

**Estimated: 45 min.**

---

## 4. Keyboard Properties

### 4.1 Purpose

Low-priority settings. Mostly visual. But it must exist, because keyboard properties existed on every machine.

### 4.2 Priority

**P2.** Skip if time is short.

### 4.3 Window Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Keyboard Properties                            [_] [X]       │
├──────────────────────────────────────────────────────────────┤
│ ┌─Speed─┬─Input Locales─┬─Hardware─┐                         │
│ │                                    │                     │
│ │  Character repeat                  │                     │
│ │  Repeat delay:                     │                     │
│ │  Long  ─────●────  Short           │                     │
│ │                                    │                     │
│ │  Repeat rate:                      │                     │
│ │  Slow  ─────●────  Fast            │                     │
│ │                                    │                     │
│ │  Cursor blink rate                 │                     │
│ │  None  ─────●────  Fast            │                     │
│ │                                    │                     │
│ │  [ Test area: type here ]          │                     │
│ │                                    │                     │
│ │  [ Apply ]  [ OK ]  [ Cancel ]     │                     │
│ └────────────────────────────────────┘                     │
└──────────────────────────────────────────────────────────────┘
```

### 4.4 Behavior

- **Repeat delay / rate:** Visual only.
- **Cursor blink rate:** Actually affects the text cursor blink speed in input fields. Works.
- **Test area:** An input field where the player can type. The repeat rate and blink rate are visible here.

### 4.5 Input Locales Tab

```
┌──────────────────────────────────────────────────────────────┐
│ Installed input locales:                                     │
│                                                              │
│  [ English (United States)         ]  [ Properties ]         │
│  [ English (India)                 ]  [ Add... ]             │
│  [ Hindi                           ]  [ Remove ]             │
│                                                              │
│  [✓] Enable indicator on taskbar                             │
│                                                              │
│  [ Apply ]  [ OK ]  [ Cancel ]                               │
└──────────────────────────────────────────────────────────────┘
```

**Behavior:** `English (India)` is the **default** (the café is in Bhilai). `Hindi` is listed but adding it does nothing.

### 4.6 Hardware Tab

Standard hardware tab (visual only).

### 4.7 Keyboard Properties Build Notes

- **Do:** Make the test area responsive.
- **Don't:** Implement keyboard layouts.
- **Priority:** Speed tab > Test area > Input locales > Hardware.

**Estimated: 20 min.**

---

## 5. Date/Time Properties

### 5.1 Purpose

**Date/Time Properties** is the **storytelling settings panel.** It hosts the date-aware eggs (E09), the calendar, and the time zone. It is where the player realizes the machine knows what day it is.

### 5.2 Priority

**P0.** The calendar and date-aware eggs are among the most important.

### 5.3 Access Paths

- Control Panel → Date/Time
- Double-click the taskbar clock
- Start → Settings → Date/Time (does not exist; do not add)

### 5.4 Window Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Date/Time Properties                           [_] [X]       │
├──────────────────────────────────────────────────────────────┤
│ Date                                                         │
│  ┌───────────────────────────────────────────────────────┐   │
│  │      November 2026                                    │   │
│  │   Su Mo Tu We Th Fr Sa                                │   │
│  │                1  2  3  4  5  6                       │   │
│  │    7  8  9 10 11 12 13                                │   │
│  │   14 15 16 17 18 19 20                                │   │
│  │   21 22 23 24 25 26 27                                │   │
│  │   28 29 30                                            │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                              │
│ Time                                                         │
│  [ 03 : 14 : 22 AM ]   [▲]                                   │
│                        [▼]                                   │
│                                                              │
│ Time zone                                                    │
│  [ (GMT+05:30) Bombay, Calcutta, Madras, New Delhi  ▼ ]      │
│                                                              │
│ [✓] Automatically adjust clock for daylight saving changes   │
│                                                              │
│ [ Apply ]  [ OK ]  [ Cancel ]                                │
└──────────────────────────────────────────────────────────────┘
```

### 5.5 The Calendar

- **Current month:** Initialized to the player's real current month (e.g., November 2026).
- **Selected date:** Today's date, highlighted in navy.
- **Date selector:** Left/right arrows to change month. The player can navigate to any month.
- **Today's date** is pre-selected.

### 5.6 The Date-Aware Egg (E09)

**On 1 November 2026 (the hackathon date):**

- The cell for `1` has a **small mark** (a tiny dot or underline).
- **Hovering** over it shows a tooltip:
  ```
  GANDHI HACKATHON
  OPENLAKE × MERAZ
  IIT BHILAI
  ```
- Clicking it does nothing (the tooltip is the reveal).

**On any other date:** No mark, no tooltip. Just the normal date.

**Implementation:**

```javascript
const today = new Date();
if (today.getFullYear() === 2026 && today.getMonth() === 10 && today.getDate() === 1) {
  // Add the mark and tooltip to the cell for Nov 1
}
```

**Why this matters:** The hackathon is on November 1, 2026. Every judge will open the calendar. Every judge will find the mark. Every judge will screenshot it.

### 5.7 The Range Eggs (E04, E05)

**On any date before 1998:**

- All date cells are **greyed out** (`#808080` text on `#E0E0E0` background).
- **Hovering** over any date shows a tooltip: `Before the session.`
- The month/year navigation still works.

**On any date after 31 December 2049 (i.e., 2050):**

- All date cells are **greyed out.**
- Hovering over any date shows: `After the plan.`

**Rule:** The boundary dates are exact. 31 December 1997 → normal (as far as the player knows). 1 January 1998 → normal. 31 December 2049 → normal. 1 January 2050 → greyed out. After 2050 → greyed out.

**The player can navigate to 1998 and see nothing wrong.** The player can navigate to 2050 and see something wrong. The player can navigate to 2049 and see nothing wrong. **The plan ends in 2050.** The calendar acknowledges it.

### 5.8 The Time

- **Current time:** Displayed as `HH : MM : SS AM/PM`.
- **Spinner buttons:** Up/down arrows to change the time. **Do they work?** Yes and no.
  - Clicking `▲` increases the time by 1 hour.
  - Clicking `▼` decreases by 1 hour.
  - **The changes do not apply until the player clicks `Apply` or `OK`.**
  - **When the player clicks `Apply`**, the taskbar clock **does not change.** Instead, a dialog appears:
    ```
    Time change denied.

    The session clock does not adjust.

    [ OK ]
    ```
- **The time is live.** The seconds increment in real-time while the dialog is open.

### 5.9 Time Zone

Dropdown with the standard Win98 time zones:

| Zone | Offset |
|---|---|
| `(GMT-08:00) Pacific Time` | -8 |
| `(GMT-07:00) Mountain Time` | -7 |
| `(GMT-06:00) Central Time` | -6 |
| `(GMT-05:00) Eastern Time` | -5 |
| `(GMT) Greenwich Mean Time` | 0 |
| `(GMT+01:00) Amsterdam, Berlin, Rome` | +1 |
| `(GMT+05:30) Bombay, Calcutta, Madras, New Delhi` | +5:30 |
| `(GMT+08:00) Beijing, Hong Kong` | +8 |
| `(GMT+09:00) Tokyo` | +9 |
| `(GMT+10:00) Sydney` | +10 |

**Default:** `(GMT+05:30) Bombay, Calcutta, Madras, New Delhi` — because the café is in Bhilai.

**Behavior:** Changing the time zone **works**. Changing it to a different zone changes the taskbar clock display. But:

- **The billing timer does not change.** It continues from the original time.
- A subtle yellow bar appears at the bottom of the Date/Time dialog: `Session time is absolute.`

**The player who tries to change the time zone to see the story differently will find that the machine will not let them.** This is a deliberate guardrail.

### 5.10 Daylight Saving Checkbox

- Checkbox `Automatically adjust clock for daylight saving changes`. Default OFF (India does not observe DST).
- Toggling it changes nothing. Visual only.

### 5.11 The `/date` Command Easter Egg

If the player types `date` in the MS-DOS Prompt (see `applications.md` — P2 feature), the output is:

```
The current date is: Sun 11/01/2026
```

Then, 2 seconds later, another line appears:

```
The session date is: Tue 03/03/1998
```

Then, 2 seconds later:

```
The session never ended.
```

The prompt does not return. It stays at the line above. Typing anything after that shows:

```
Bad command or file name.
```

### 5.12 Date/Time Properties Build Notes

- **Do:** Make the calendar navigable.
- **Do:** Mark Nov 1, 2026 with the hackathon tooltip.
- **Do:** Grey out dates before 1998 and after 2050.
- **Do:** Deny time changes with a dialog.
- **Don't:** Allow the time zone change to affect the billing timer.
- **Priority:** Calendar + navigation > E09 (hackathon tooltip) > E04/E05 (date range) > Time denial > Time zone change.

**Estimated: 60 min.**

---

## 6. Sounds Properties

### 6.1 Purpose

Sounds Properties lets the player see and change the sound scheme. It also explains why **no sounds play** — because the machine is disconnected.

### 6.2 Priority

**P2.** Skip if time is short.

### 6.3 Window Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Sounds Properties                              [_] [X]       │
├──────────────────────────────────────────────────────────────┤
│ Scheme:  [ Windows Default                      ▼ ]          │
│                                                              │
│ Events:                                                      │
│  ┌───────────────────────────────────────────────────────┐   │
│  │ Asterisk                     [►] [ (None) ▼ ]         │   │
│  │ Critical Stop                [►] [ (None) ▼ ]         │   │
│  │ Default Beep                 [►] [ (None) ▼ ]         │   │
│  │ Exclamation                  [►] [ (None) ▼ ]         │   │
│  │ Exit Windows                 [►] [ (None) ▼ ]         │   │
│  │ Maximize                     [►] [ (None) ▼ ]         │   │
│  │ Menu Command                 [►] [ (None) ▼ ]         │   │
│  │ Minimize                     [►] [ (None) ▼ ]         │   │
│  │ Open Program                 [►] [ (None) ▼ ]         │   │
│  │ Question                     [►] [ (None) ▼ ]         │   │
│  │ Restore Down                 [►] [ (None) ▼ ]         │   │
│  │ Windows Start                [►] [ (None) ▼ ]         │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                              │
│ [✓] Show sounds                                              │
│                                                              │
│ [ Apply ]  [ OK ]  [ Cancel ]                                │
└──────────────────────────────────────────────────────────────┘
```

### 6.4 Behavior

- **Scheme dropdown:** `Windows Default`, `Jungle`, `Musica`, `Robotz`, `Utopia`. Visual only.
- **Events list:** Every event has a play button and a sound dropdown. **All dropdowns are `(None)`.** All play buttons do nothing.
- **`Show sounds` checkbox:** On. Visual only.
- **`Apply` button:** Clicking it shows a dialog:

```
Sound Scheme

No audio device is connected.

The speakers were disconnected in 1998.

[ OK ]
```

### 6.5 The Hidden Event

If the player scrolls to the bottom of the events list, there is a **hidden event:**

```
Session Started             [►] [ (None) ▼ ]
```

Clicking the play button on this event does nothing visible. But two seconds later, a faint line appears in the taskbar: `It is still playing.`

### 6.6 Sounds Properties Build Notes

- **Do:** Show all events as `(None)`.
- **Do:** Make `Apply` show the "speakers disconnected in 1998" dialog.
- **Priority:** Layout > Events list > Apply dialog > Hidden event.

**Estimated: 20 min.**

---

## 7. Add/Remove Programs

### 7.1 Purpose

Add/Remove Programs shows the installed software. It is **an inventory of the machine's fiction.** Every program in the list is a lore hint.

### 7.2 Priority

**P1.** Cheap, high-charm.

### 7.3 Window Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Add/Remove Programs                            [_] [X]       │
├──────────────────────────────────────────────────────────────┤
│ ┌─Install/Uninstall─┬─Windows Setup─┬─Startup Disk─┐         │
│ │                                                   │       │
│ │  The following software can be automatically      │       │
│ │  removed.                                         │       │
│ │                                                   │       │
│ │  ┌─────────────────────────────────────────────┐  │       │
│ │  │ Cafê Manager 98                     (3.2 MB)│  │       │
│ │  │ Internet Explorer 4.0                (12 MB)│  │       │
│ │  │ Media Player                        (4.1 MB)│  │       │
│ │  │ mIRC 5.7                            (2.8 MB)│  │       │
│ │  │ QuickTime 3.0                       (7.2 MB)│  │       │
│ │  │ SHREE CYBER ZONE — Admin            (0.1 MB)│  │       │
│ │  │ Winamp 2.0                          (3.5 MB)│  │       │
│ │  │ Windows 98                          (195 MB)│  │       │
│ │  │ WinZip 6.3                          (2.1 MB)│  │       │
│ │  └─────────────────────────────────────────────┘  │       │
│ │                                                   │       │
│ │  [ Add/Remove... ]  [ Add New Program... ]        │       │
│ └───────────────────────────────────────────────────┘       │
└──────────────────────────────────────────────────────────────┘
```

### 7.4 The Program List

| Program | Size | Notes |
|---|---|---|
| Cafê Manager 98 | 3.2 MB | The café admin app |
| Internet Explorer 4.0 | 12 MB | Standard |
| Media Player | 4.1 MB | Standard |
| mIRC 5.7 | 2.8 MB | **Not installed by default** — appears only after unlock (egg C08) |
| QuickTime 3.0 | 7.2 MB | Period-accurate |
| SHREE CYBER ZONE — Admin | 0.1 MB | **This is the custom app.** Only 100 KB. |
| Winamp 2.0 | 3.5 MB | Period-accurate |
| Windows 98 | 195 MB | The OS |
| WinZip 6.3 | 2.1 MB | Period-accurate |

### 7.5 The `SHREE CYBER ZONE — Admin` Entry

**This is the key entry.** It is the only program that is *not* a standard 1998 app.

**Hovering over it** shows a tooltip: `Admin console. Installed by: —. Last used: —.`

**Selecting it and clicking `Add/Remove...`** shows:

```
Uninstall SHREE CYBER ZONE — Admin

This program cannot be removed.

It is running.

[ OK ]
```

**The `Add/Remove...` button for every other program** shows:

```
Uninstall [Program Name]

Are you sure you want to remove [Program Name] and all of its components?

[ Yes ]  [ No ]
```

Clicking `Yes` shows:

```
Cannot uninstall [Program Name].

The program is required by the session.

[ OK ]
```

**Every program is required. This is not a normal machine.**

### 7.6 The mIRC Entry

When mIRC is unlocked (after 4 chat logs read), the program list gets a new entry:

```
mIRC 5.7                            (2.8 MB)
Installed by: PROPRIETOR
Date: 3/3/1998
```

Hovering shows: `Installed by the Proprietor. This program is not removable.`

### 7.7 The Windows Setup Tab

Visual only. Shows `Accessories`, `Communications`, `Multimedia`, etc. with checkboxes. None work.

### 7.8 The Startup Disk Tab

Visual only. Shows a button: `Create Disk...`. Clicking it shows:

```
Cannot create startup disk.

The floppy drive is not ready.

The floppy drive is never ready.

[ OK ]
```

### 7.9 Add/Remove Programs Build Notes

- **Do:** Make the program list scrollable.
- **Do:** Make uninstall confirm dialogs work.
- **Do:** Make the uninstall always fail with the required-by-session message.
- **Don't:** Actually uninstall anything.
- **Priority:** Program list > SHREE CYBER ZONE — Admin entry > Uninstall denial > mIRC conditional entry > Other tabs.

**Estimated: 30 min.**

---

## 8. System Properties

### 8.1 Purpose

**System Properties** is the **machine's self-portrait.** It tells the player what the machine *thinks* it is. It lies in interesting ways.

### 8.2 Priority

**P1.** High-lore value.

### 8.3 Window Layout

```
┌──────────────────────────────────────────────────────────────┐
│ System Properties                              [_] [X]       │
├──────────────────────────────────────────────────────────────┤
│ ┌─General─┬─Device Manager─┬─Hardware Profiles─┬─Performance─┐│
│ │                                                            ││
│ │  System:                                                   ││
│ │    Microsoft Windows 98                                    ││
│ │    4.10.1998                                               ││
│ │                                                            ││
│ │  Registered to:                                            ││
│ │    GUEST                                                   ││
│ │    SHREE CYBER ZONE, Bhilai                                ││
│ │    12345-678-9012345-67890                                 ││
│ │                                                            ││
│ │  Computer:                                                 ││
│ │    Intel Pentium II Processor                              ││
│ │    350 MHz                                                 ││
│ │    64.0 MB RAM                                             ││
│ │                                                            ││
│ │                              [ OK ]  [ Cancel ]            ││
│ └────────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────┘
```

### 8.4 General Tab

**"Registered to: GUEST"** — This is the classic Win98 registration dialog. It's usually the machine's owner. It's `GUEST` here.

**"SHREE CYBER ZONE, Bhilai"** — The organization. This is authentic.

**Version `4.10.1998`** — The actual Win98 SE version. `1998` in the version string is a coincidence. But on this machine, it is not a coincidence.

**Computer specs:**
- `Intel Pentium II Processor` — period-accurate
- `350 MHz` — period-accurate
- `64.0 MB RAM` — period-accurate

**The easter egg:** The RAM shows `64.0 MB`. If the player visits System Properties **three times**, the RAM value changes:

- First visit: `64.0 MB RAM`
- Second visit: `64.0 MB RAM`
- Third visit: `64.0 MB RAM`
- Fourth visit: `65,536 MB RAM`

Then a small line appears at the bottom of the General tab: `The machine has been expanding.`

### 8.5 Device Manager Tab

```
┌──────────────────────────────────────────────────────────────┐
│  Devices by type:                                            │
│                                                              │
│  [🖥] Computer                                                │
│  [🔌] Disk drives                                             │
│  [🖥] Display adapters                                        │
│  [⌨] Keyboard                                                 │
│  [🖱] Mouse                                                    │
│  [📞] Modems                                                   │
│  [🌐] Network adapters                                         │
│  [🖨] Ports                                                    │
│  [🔊] Sound, video and game controllers                        │
│  [💾] System devices                                          │
│  [📼] Universal Serial Bus controllers                        │
│                                                              │
│  [ Properties ]  [ Refresh ]  [ Remove ]  [ Print... ]       │
└──────────────────────────────────────────────────────────────┘
```

**Tree view expansion:** Each category expands to show devices. Most show one or two devices.

**The easter egg:** One category is **not in the standard list**:

```
[?] Unknown Devices
```

Expanding it shows:

```
SEAT_07
   Location: Behind the counter
   Status: Active
```

Double-clicking `SEAT_07` shows a Properties dialog:

```
SEAT_07 Properties

General
   Device type:   Human (assumed)
   Manufacturer:  (Unknown)
   Location:      Behind the counter
   Status:        Active

   [ ] Use automatic settings
   [✓] Device is present

   Device usage:
   ( ) Disabled in this hardware profile
   ( ) Disabled in all hardware profiles
   (•) Exists in all hardware profiles
   [ ] Do not use in this hardware profile

   [ OK ]  [ Cancel ]
```

**Every field is read-only.** The `OK` and `Cancel` buttons both close the dialog and do nothing.

**The `Refresh` button:** Clicking it shows:

```
Refreshing device list...

1 change detected.

[ OK ]
```

After clicking `OK`, the Device Manager shows the `SEAT_07` entry highlighted in yellow for 5 seconds.

### 8.6 Hardware Profiles Tab

Standard Win98 tab. Shows:

```
Available hardware profiles:

Original Configuration (Current)
```

Visual only.

### 8.7 Performance Tab

```
┌──────────────────────────────────────────────────────────────┐
│ Performance status                                           │
│  Memory:  64.0 MB of RAM                                     │
│  System Resources: 95% free                                  │
│  File System: 32-bit                                         │
│  Virtual Memory: 32-bit                                      │
│  PC Card (PCMCIA): No PCMCIA socket                          │
│                                                              │
│  Your system is configured for optimal performance.          │
│                                                              │
│  [ File System... ]  [ Graphics... ]  [ Virtual Memory... ]  │
│                                                              │
│  [ OK ]  [ Cancel ]                                          │
└──────────────────────────────────────────────────────────────┘
```

**The `System Resources: 95% free`** value is fixed. It never changes. The machine is not under load. **The machine is idle because it is waiting.**

**The easter egg:** If the player clicks `File System...` and then closes the resulting dialog, a new line appears in Performance:

```
Session Resources: —% free
```

No number. Just a dash. The machine's session does not have a resource value.

### 8.8 System Properties Build Notes

- **Do:** Make the General tab render correctly.
- **Do:** Make the Device Manager tree expand.
- **Do:** Make the `SEAT_07` device visible and openable.
- **Do:** Make RAM change on fourth visit.
- **Don't:** Implement actual hardware profiles.
- **Priority:** General tab > Device Manager + SEAT_07 > Performance tab > Hardware Profiles.

**Estimated: 45 min.**

---

## 9. Regional Settings

### 9.1 Purpose

Regional Settings lets the player see and change the locale. Mostly visual.

### 9.2 Priority

**P2.** Skip if time is short.

### 9.3 Window Layout

Five tabs: Regional Settings, Numbers, Currency, Time, Date.

```
┌──────────────────────────────────────────────────────────────┐
│ Regional Settings                              [_] [X]       │
├──────────────────────────────────────────────────────────────┤
│ ┌─Regional Settings─┬─Numbers─┬─Currency─┬─Time─┬─Date─┐     │
│ │                                                      │     │
│ │  Locale:                                             │     │
│ │  [ English (United States)                 ▼ ]       │     │
│ │                                                      │     │
│ │  When you change the locale, the way numbers,        │     │
│ │  currencies, times, and dates are displayed will     │     │
│ │  also change.                                        │     │
│ │                                                      │     │
│ │  [ Apply ]  [ OK ]  [ Cancel ]                       │     │
│ └──────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────┘
```

### 9.4 Locale Dropdown

Options: `English (United States)`, `English (India)`, `Hindi`, `Bengali`, `Tamil`, `Telugu`, `Marathi`, `Gujarati`, `Kannada`, `Malayalam`, `Punjabi`, `Urdu`.

**Default:** `English (India)`.

**Behavior:** Changing the locale changes the **format** of numbers, dates, and currency throughout the machine. **The taskbar clock format changes** (12-hour to 24-hour if the locale uses it). The Date/Time Properties calendar changes first-day-of-week.

**The billing amounts and rates do not change.** They stay in `₹`.

### 9.5 Numbers Tab

```
Decimal symbol:      [ . ]
Digit grouping:      [ , ]
No. of digits after: [ 2 ]
Negative sign:       [ - ]
Negative number:     [ -1.1 ]
Digit grouping sym:  [ , ]
Measurement system:  [ Metric ]

[ Apply ]  [ OK ]  [ Cancel ]
```

Visual only.

### 9.6 Currency Tab

```
Currency symbol:     [ ₹ ]
Position:            [ ₹1.1 ]
Negative:            [ -₹1.1 ]
Decimal symbol:      [ . ]
No. of digits after: [ 2 ]
Digit grouping:      [ , ]

[ Apply ]  [ OK ]  [ Cancel ]
```

**Default currency symbol:** `₹` (the rupee).

Visual only except that `₹` is used across the machine.

### 9.7 Time Tab

```
Time style:          [ HH:mm:ss ]
Time separator:      [ : ]
AM symbol:           [ AM ]
PM symbol:           [ PM ]

[ Apply ]  [ OK ]  [ Cancel ]
```

Visual only.

### 9.8 Date Tab

```
Short date style:    [ dd-MM-yy ]
Long date style:     [ dddd, MMMM dd, yyyy ]
Date separator:      [ - ]
Calendar type:       [ Gregorian Calendar ]

[ Apply ]  [ OK ]  [ Cancel ]
```

Visual only.

### 9.9 Regional Settings Build Notes

- **Do:** Change the taskbar clock format when the locale changes.
- **Don't:** Change the visual design based on locale.
- **Priority:** Layout > Locale dropdown > Clock format change > Other tabs.

**Estimated: 20 min.**

---

## 10. Printers

### 10.1 Purpose

Printers shows the installed printers and their status. It is a shortcut to the Printer Queue app.

### 10.2 Priority

**P1.** Also accessible via Start → Settings → Printers.

### 10.3 Window Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Printers                                       [_] [□] [X]   │
├──────────────────────────────────────────────────────────────┤
│ File  Edit  View  Go  Favorites  Help                        │
├──────────────────────────────────────────────────────────────┤
│ Address: [Printers_____________________________]  Go         │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  [🖨] HP LaserJet 6L                                          │
│       Default printer                                        │
│       Idle                                                   │
│                                                              │
│  [➕] Add Printer                                             │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ 1 object(s)                                                  │
└──────────────────────────────────────────────────────────────┘
```

### 10.4 Behavior

- **Double-click the printer:** Opens Printer Queue (see `applications.md` section 7).
- **Right-click the printer:** Shows a context menu with `Set as Default`, `Pause Printing`, `Purge Print Documents`, `Properties`.
- **Right-click menu items:** All work except `Properties` (which opens a standard dialog with several tabs — all visual).

### 10.5 Add Printer

Double-clicking `Add Printer` opens the **Add Printer Wizard**. This is a 4-step wizard:

1. **Welcome:** `This wizard helps you install a new printer.` `[Next >]`
2. **Local or Network:** Radio buttons. Default: `Local printer`. `[Next >]`
3. **Manufacturer/Model:** A list of manufacturers and models. Select `HP LaserJet 6L`. `[Next >]`
4. **Port:** `LPT1: Printer Port`. `[Next >]`
5. **Name:** `HP LaserJet 6L`. `[Next >]`
6. **Test page:** `[✓] Yes` `[Finish]`

Clicking `Finish` shows:

```
Add Printer

The printer is already installed.

You cannot have two of the same printer.

The second printer would print the same page twice.

[ OK ]
```

### 10.6 Printer Properties Dialog

Right-click the printer → `Properties` opens a tabbed dialog:

```
┌──────────────────────────────────────────────────────────────┐
│ HP LaserJet 6L Properties                     [_] [X]        │
├──────────────────────────────────────────────────────────────┤
│ ┌─General─┬─Details─┬─Sharing─┬─Paper─┬─Graphics─┬─...─┐     │
│ │                                                      │     │
│ │  HP LaserJet 6L                                      │     │
│ │                                                      │     │
│ │  Model:         HP LaserJet 6L                       │     │
│ │  Features:      Black and white                      │     │
│ │  Print quality: [ 600 dpi               ▼ ]          │     │
│ │  Status:        [ Idle                  ▼ ]          │     │
│ │                                                      │     │
│ │  ┌────────────────────────────────────────────┐      │     │
│ │  │ [printer icon]                             │      │     │
│ │  └────────────────────────────────────────────┘      │     │
│ │                                                      │     │
│ │  Location:      [ Behind the counter ]               │     │
│ │  Comment:       [ Do not use without permission ]    │     │
│ │                                                      │     │
│ │  [ Print Test Page ]                                 │     │
│ │                                                      │     │
│ │  [ OK ]  [ Cancel ]  [ Apply ]                       │     │
│ └──────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────┘
```

**Comment field:** `Do not use without permission` — this is the same as the house rule (see `websites.md` section 1.3).

**Print Test Page button:** Clicking it triggers the **print trap** (same as G03). This is a **second path** to the PROPRIETOR icon.

### 10.7 Printers Build Notes

- **Do:** Make the printer icon open the queue.
- **Do:** Make the Add Printer wizard work through all 6 steps and then fail.
- **Do:** Make Print Test Page trigger the print trap.
- **Priority:** Printer icon > Properties dialog > Add Printer wizard > Print test page trap.

**Estimated: 20 min.**

---

## 11. Network

### 11.1 Purpose

Network is the 12 PCs + unknown device. It is also where the player can see `SHREE_CYBER_ZONE` as a workgroup.

### 11.2 Priority

**P1.** Ties into Cafê Manager and the network tray egg.

### 11.3 Window Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Network                                        [_] [□] [X]   │
├──────────────────────────────────────────────────────────────┤
│ File  Edit  View  Go  Favorites  Help                        │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  [🌐] Entire Network                                          │
│  [🏢] SHREE_CYBER_ZONE                                        │
│       ├─ PC01                                                │
│       ├─ PC02                                                │
│       ├─ PC03 (ADMIN)                                        │
│       ├─ PC04                                                │
│       ├─ PC05                                                │
│       ├─ PC06                                                │
│       ├─ PC07                                                │
│       ├─ PC08                                                │
│       ├─ PC09                                                │
│       ├─ PC10                                                │
│       ├─ PC11                                                │
│       ├─ PC12                                                │
│       └─ —                                                   │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ 13 object(s)                                                 │
└──────────────────────────────────────────────────────────────┘
```

### 11.4 The Unknown Device

Below the 12 PCs, there is a **13th entry**. It has **no name.** It is a dash. `—`.

**Double-clicking it** shows:

```
Network

Cannot access this device.

The device is not on the network.

The device is the network.

[ OK ]
```

**Hovering over it** shows a tooltip: `Last seen: 1998-03-03 03:14:00`.

### 11.5 The PC Details

Double-clicking any PC (except the 13th entry) shows a dialog:

```
PC01

Name:         PC01
Workgroup:    SHREE_CYBER_ZONE
IP Address:   192.168.0.11
Status:       ACTIVE
Session:      Started 12:34:56
```

For PC03:

```
PC03 (ADMIN)

Name:         PC03
Workgroup:    SHREE_CYBER_ZONE
IP Address:   192.168.0.13
Status:       STILL RUNNING
Session:      Started 1998-03-03 03:14:00
Duration:     10224 days
```

**Rule:** `Duration` is calculated live. Every second, the number increments. This is a real calculation.

### 11.6 Network Neighborhood

The desktop also has a `Network Neighborhood` icon (part of the default desktop icons — see `features.md` section 2.2). Double-clicking it opens this same window.

### 11.7 Network Build Notes

- **Do:** Make the PC list clickable.
- **Do:** Show the PC details dialog.
- **Do:** Show PC03's live duration.
- **Do:** Make the 13th entry (`—`) unopenable.
- **Priority:** Window layout > PC list > PC details > 13th entry > PC03 live duration.

**Estimated: 25 min.**

---

## 12. Modems

### 12.1 Purpose

Modems shows the installed modem and lets the player hear the dial-up handshake. It is the funniest audio easter egg in the build.

### 12.2 Priority

**P2.** Skip if time is short.

### 12.3 Window Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Modems Properties                              [_] [X]       │
├──────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────┐       │
│  │  [📞] Standard 56000 bps Modem                    │       │
│  └───────────────────────────────────────────────────┘       │
│                                                              │
│  [ Add... ]  [ Remove ]  [ Properties ]  [ Diagnostics ]     │
│                                                              │
│  [ OK ]  [ Cancel ]                                          │
└──────────────────────────────────────────────────────────────┘
```

### 12.4 Diagnostics Tab

Clicking `Diagnostics` opens a new tab:

```
┌──────────────────────────────────────────────────────────────┐
│ Modems Properties — Diagnostics                [_] [X]       │
├──────────────────────────────────────────────────────────────┤
│  [📞] COM 2 — Standard 56000 bps Modem                       │
│                                                              │
│  [ Query Modem ]                                             │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐   │
│  │ Command     | Response                                │   │
│  │ ATI1        | (empty)                                 │   │
│  │ ATI2        | (empty)                                 │   │
│  │ ATI3        | (empty)                                 │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                              │
│  [ More Info... ]                                            │
│                                                              │
│  [ OK ]  [ Cancel ]  [ Apply ]                               │
└──────────────────────────────────────────────────────────────┘
```

### 12.5 Query Modem

Clicking `Query Modem`:

1. A progress bar fills over 3 seconds.
2. **The dial-up handshake sound plays.** (If unmuted.)
3. The response column fills:
   - `ATI1` → `56000`
   - `ATI2` → `OK`
   - `ATI3` → `SHREE CYBER ZONE`
4. Then a new line appears:
   ```
   ATI4 | SESSION ACTIVE
   ```
5. Then:
   ```
   ATI5 | DO NOT CLOSE
   ```

The query doesn't stop at ATI3. It adds two lines that no modem would return.

### 12.6 `More Info...` Button

Shows a dialog:

```
Modem Information

Modem:         Standard 56000 bps Modem
Port:          COM 2
Status:        Connected
Connected to:  quiet.room
Duration:      10224 days
Speed:         56000 bps
Data sent:     0 KB
Data received: 0 KB

[ OK ]
```

**"Data sent: 0 KB"** — the machine has never sent anything. It has only received.

**"Data received: 0 KB"** — but it has received nothing. So what has it been doing for 28 years?

### 12.7 Modems Build Notes

- **Do:** Play the dial-up handshake (only if unmuted).
- **Do:** Show the ATI responses.
- **Don't:** Actually query a modem.
- **Priority:** Layout > Diagnostics tab > Query Modem > More Info.

**Estimated: 15 min.**

---

## 13. Fonts

### 13.1 Purpose

Fonts shows the installed fonts. It is a small visual texture.

### 13.2 Priority

**P2.** Skip if time is short.

### 13.3 Window Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Fonts                                          [_] [□] [X]   │
├──────────────────────────────────────────────────────────────┤
│ File  Edit  View  Go  Favorites  Help                        │
├──────────────────────────────────────────────────────────────┤
│ Address: [C:\WINDOWS\Fonts_____________________]  Go         │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  [Aa] Arial          [Aa] Comic Sans MS                     │
│  [Aa] Courier New    [Aa] Fixedsys                          │
│  [Aa] Impact         [Aa] MS Sans Serif                     │
│  [Aa] Symbol         [Aa] Times New Roman                   │
│  [Aa] Verdana        [Aa] Webdings                          │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ 10 object(s)                                                 │
└──────────────────────────────────────────────────────────────┘
```

### 13.4 Behavior

- Double-clicking a font opens a preview window showing the font at various sizes and styles.
- The preview is authentic.

### 13.5 The Hidden Font

If the player scrolls down (there are only 10 fonts, but the window can hold fewer), they find one more:

```
[Aa] SEAT_07
```

Double-clicking it opens a preview:

```
SEAT_07
Regular

ABCDEFGHIJKLMNOPQRSTUVWXYZ
abcdefghijklmnopqrstuvwxyz
0123456789

12   The quick brown fox jumps over the lazy dog.
18   The quick brown fox jumps over the lazy dog.
24   The quick brown fox jumps over the lazy dog.
36   The quick brown fox jumps over the lazy dog.

The quick brown fox was scheduled in 1998.
```

The font itself is a **pixel font with chair-shaped letters.** Yes, every letter is made of chairs. Or, if that's too hard, every letter is rendered in white-on-black with a pixel font — but the last line is the important part.

### 13.6 Fonts Build Notes

- **Do:** Show the font list.
- **Do:** Show the SEAT_07 font preview with the closing line.
- **Don't:** Implement chair-shaped letters unless you have time.
- **Priority:** Font list > SEAT_07 font > Preview dialog.

**Estimated: 15 min.**

---

## 14. Users

### 14.1 Purpose

Users shows the configured users and lets the player "switch" users. It is the closest thing to a login screen that exists by default.

### 14.2 Priority

**P1.** Ties into the PROPRIETOR.

### 14.3 Window Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Users Properties                               [_] [X]       │
├──────────────────────────────────────────────────────────────┤
│  Users on this computer:                                     │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ [👤] GUEST                                           │     │
│  │      Guest account                                   │     │
│  │      [ Properties... ]  [ Delete ]  [ Copy... ]      │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ [👤] PROPRIETOR                                      │     │
│  │      Administrator                                   │     │
│  │      [ Properties... ]  [ Delete ]  [ Copy... ]      │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                              │
│  [ Add... ]                                                  │
│                                                              │
│  [ OK ]  [ Cancel ]                                          │
└──────────────────────────────────────────────────────────────┘
```

### 14.4 The Two Users

**GUEST:**
- Description: `Guest account`
- Properties: Full name `GUEST`, description `Guest account`. Visual only.
- Delete: `You cannot delete this account. It is in use.`
- Copy: `You cannot copy this account. There is only one GUEST.`

**PROPRIETOR:**
- Description: `Administrator`
- Properties: Full name `PROPRIETOR`, description `Administrator`, password `********`. **The password is not editable.**
- Delete: `You cannot delete the PROPRIETOR. The PROPRIETOR is not an account.`
- Copy: `You cannot copy the PROPRIETOR.`

### 14.5 Add Button

Clicking `Add` opens the **Add User Wizard**:

1. `Add User` — `[Next >]`
2. `User Name: [_______________]` `[Next >]`
3. `Password: [_______________]` `Confirm: [_______________]` `[Next >]`
4. `Personalize Your Windows` — checkboxes for desktop icons, documents, etc. `[Next >]`
5. `You have successfully created a user.` `[Finish]`

Clicking `Finish` shows:

```
Add User

Cannot add user.

The session is full.

[ OK ]
```

### 14.6 The Hidden Third User

**After visiting Users Properties three times**, a third entry appears:

```
[👤] SEAT_07
     Candidate
     [ Properties... ]  [ Delete ]  [ Copy... ]
```

**Properties:** 
```
SEAT_07 Properties

Full name:    SEAT_07
Description:  Candidate
Account type: Candidate
Status:       PENDING

[ OK ]  [ Cancel ]
```

**Delete:**
```
Delete SEAT_07?

Are you sure you want to delete this account?

[ Yes ]  [ No ]
```

Clicking `Yes` shows:

```
Cannot delete SEAT_07.

The account is not open yet.

It will be opened by you.

[ OK ]
```

The account cannot be deleted. **It is the player's account.**

### 14.7 Users Build Notes

- **Do:** Show GUEST and PROPRIETOR.
- **Do:** Make all user operations fail with the message.
- **Do:** Add the SEAT_07 entry after three visits.
- **Priority:** Two-user list > failed operations > SEAT_07 > Add User Wizard.

**Estimated: 25 min.**

---

## 15. Accessibility Options

### 15.1 Purpose

Accessibility Options is a small, period-accurate panel. It does nothing important, but it is charming.

### 15.2 Priority

**P2.** Skip if time is short.

### 15.3 Window Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Accessibility Options                          [_] [X]       │
├──────────────────────────────────────────────────────────────┤
│ ┌─Keyboard─┬─Sound─┬─Display─┬─Mouse─┬─General─┐            │
│ │                                                │          │
│ │  StickyKeys                                    │          │
│ │  [ ] Use StickyKeys                            │          │
│ │                                                │          │
│ │  FilterKeys                                    │          │
│ │  [ ] Use FilterKeys                            │          │
│ │                                                │          │
│ │  ToggleKeys                                    │          │
│ │  [ ] Use ToggleKeys                            │          │
│ │                                                │          │
│ │  [ Settings... ]                               │          │
│ │                                                │          │
│ │  [ Apply ]  [ OK ]  [ Cancel ]                 │          │
│ └────────────────────────────────────────────────┘          │
└──────────────────────────────────────────────────────────────┘
```

### 15.4 Behavior

- All checkboxes are **visual only.**
- The `Settings...` button opens a nested dialog (visual only).
- The Display tab has a `Use High Contrast` checkbox. Toggling it **actually works** — the desktop switches to a high-contrast scheme (black background, white text, yellow highlights). This is the only accessibility option that works. It applies the same change as the Appearance tab's `High Contrast Black` scheme.

### 15.5 Accessibility Build Notes

- **Do:** Make High Contrast work.
- **Don't:** Implement StickyKeys, FilterKeys, ToggleKeys.
- **Priority:** Layout > High Contrast toggle > Everything else.

**Estimated: 10 min.**

---

## 16. Taskbar & Start Menu Properties

### 16.1 Purpose

Taskbar & Start Menu Properties lets the player see and change the taskbar behavior. Mostly visual.

### 16.2 Priority

**P2.** Skip if time is short.

### 16.3 Access Paths

- Start → Settings → Taskbar & Start Menu
- Right-click taskbar → Properties

### 16.4 Window Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Taskbar Properties                             [_] [X]       │
├──────────────────────────────────────────────────────────────┤
│ ┌─Taskbar Options─┬─Start Menu Programs─┐                     │
│ │                                       │                   │
│ │  [✓] Always on top                    │                   │
│ │  [✓] Auto hide                        │                   │
│ │  [✓] Show small icons in Start menu   │                   │
│ │  [ ] Show clock                       │                   │
│ │                                       │                   │
│ │  [ Apply ]  [ OK ]  [ Cancel ]        │                   │
│ └───────────────────────────────────────┘                   │
└──────────────────────────────────────────────────────────────┘
```

### 16.5 Behavior

- `Always on top` — **works.** Toggling it hides/shows the taskbar.
- `Auto hide` — **works.** Toggling it makes the taskbar auto-hide (appears on mouse hover at the bottom edge).
- `Show small icons in Start menu` — **works.** Toggling it changes Start menu icon size.
- `Show clock` — **works.** Toggling it hides/shows the clock in the system tray.

**The `Auto hide` warning:** When the player toggles `Auto hide` ON, a dialog appears:

```
Auto hide

If you hide the taskbar, you will not see the clock.

The clock is still running.

[ OK ]
```

### 16.6 Start Menu Programs Tab

```
┌──────────────────────────────────────────────────────────────┐
│ Customize Start Menu                                         │
│                                                              │
│  [ Add... ]  [ Remove... ]  [ Advanced... ]                  │
│                                                              │
│  Start Menu folders:                                         │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ Accessories                                          │     │
│  │ Games                                                │     │
│  │ StartUp                                              │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                              │
│  [✓] Expand Start Menu                                     │
│                                                              │
│  [ OK ]  [ Cancel ]                                          │
└──────────────────────────────────────────────────────────────┘
```

Visual only.

### 16.7 Taskbar Properties Build Notes

- **Do:** Make the four checkboxes work.
- **Do:** Show the Auto hide warning dialog.
- **Don't:** Implement Start Menu Programs customization.
- **Priority:** Four checkboxes > Auto hide warning > Start Menu Programs tab.

**Estimated: 15 min.**

---

## 17. Folder Options

### 17.1 Purpose

Folder Options controls how Explorer displays folders. It hosts the "Show hidden files" checkbox, which is where the player **tries** to reveal `BACKROOM$` and discovers they cannot.

### 17.2 Priority

**P1.** Ties directly to the Explorer mystery.

### 17.3 Window Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Folder Options                                 [_] [X]       │
├──────────────────────────────────────────────────────────────┤
│ ┌─General─┬─View─┬─File Types─┐                              │
│ │                              │                             │
│ │  Folder view settings        │                             │
│ │  [✓] Show all files          │                             │
│ │  [ ] Show hidden files       │                             │
│ │                              │                             │
│ │  [ Apply ]  [ OK ]  [ Cancel ]│                            │
│ └──────────────────────────────┘                             │
└──────────────────────────────────────────────────────────────┘
```

### 17.4 The Show Hidden Files Checkbox

**This is the important one.**

- **Checking it** shows a dialog:

```
Show hidden files

Hidden files will now be displayed.

Note: some files hide by choice.

[ OK ]
```

After clicking `OK`:

- The checkbox remains checked.
- `BACKROOM$` **does not appear** in Explorer's tree or file list.
- A small yellow banner appears at the top of every Explorer window: `Hidden files are shown. Some files are still hidden.` (egg D04)

- **Unchecking it** removes the banner.

**Rule:** The checkbox is a lie. `BACKROOM$` cannot be revealed this way. The only way is to type the path.

### 17.5 File Types Tab

```
┌──────────────────────────────────────────────────────────────┐
│ Registered file types:                                       │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐   │
│  │ BMP     Bitmap Image                                  │   │
│  │ DOC     Microsoft Word Document                       │   │
│  │ IMG     Image File                                    │   │
│  │ JPG     JPEG Image                                    │   │
│  │ LOG     Text Document                                 │   │
│  │ TXT     Text Document                                 │   │
│  │ XLS     Microsoft Excel Worksheet                     │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                              │
│  File type details:                                          │
│                                                              │
│  Extension:    [IMG]                                         │
│  Content type: [image/unknown]                               │
│  Opens with:   [SHREE CYBER ZONE Image Viewer]               │
│                                                              │
│  [ Edit... ]  [ Remove ]                                     │
└──────────────────────────────────────────────────────────────┘
```

**The `.IMG` type:** This is unusual. Standard Windows 98 had no `.IMG` type. The fact that this machine does is a subtle tell.

### 17.6 Folder Options Build Notes

- **Do:** Make `Show hidden files` toggle the banner.
- **Do:** Make `BACKROOM$` **remain hidden** when this checkbox is checked. This is critical.
- **Do:** Show the `.IMG` type.
- **Priority:** Show hidden files checkbox > Banner > File Types > General tab.

**Estimated: 20 min.**

---

## 18. Internet Options

### 18.1 Purpose

Internet Options controls IE behavior. Mostly visual, but it exposes the machine's connection state.

### 18.2 Priority

**P1.** Ties into the story.

### 18.3 Window Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Internet Options                               [_] [X]       │
├──────────────────────────────────────────────────────────────┤
│ ┌─General─┬─Security─┬─Content─┬─Connection─┬─Programs─┬─...─┐│
│ │                                                            ││
│ │  Home page:                                                ││
│ │  Address: [http://shreecyberzone.local/_______] [Use Current]││
│ │                                                            ││
│ │  Temporary Internet files:                                 ││
│ │  [ Delete Files... ]  [ Settings... ]                     ││
│ │                                                            ││
│ │  History:                                                  ││
│ │  Days to keep pages in history:  [ 20 ]                    ││
│ │  [ Clear History ]                                         ││
│ │                                                            ││
│ │  [ Apply ]  [ OK ]  [ Cancel ]                             ││
│ └────────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────┘
```

### 18.4 General Tab

- **Home page:** `http://shreecyberzone.local/`. Editable. Changing it changes IE's Home button target.
- **Delete Files button:** Shows a progress bar. Then: `Files deleted. (0 KB)`. There is nothing to delete. The cache is empty.
- **Clear History button:** Shows a confirm dialog. If the player confirms, the back/forward history in IE clears.
- **History days:** Visual only.

### 18.5 Connection Tab

```
┌──────────────────────────────────────────────────────────────┐
│  Connection                                                  │
│                                                              │
│  [ ] Connect to the Internet using a modem                   │
│  [•] Connect to the Internet using a local area network      │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐   │
│  │  SHREE_CYBER_ZONE LAN Settings                        │   │
│  │  IP:   192.168.0.13                                   │   │
│  │  DNS:  192.168.0.1                                    │   │
│  │  Status: Connected                                    │   │
│  │  Duration: 10224 days                                 │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                              │
│  [ LAN Settings... ]  [ Dial-Up Settings... ]                │
└──────────────────────────────────────────────────────────────┘
```

**LAN Settings button:** Opens a dialog with proxy settings (visual only).

**Dial-Up Settings button:** Shows:

```
Dial-Up Networking

There is no dial tone.

The modem is connected.

The modem has been connected since 1998.

[ OK ]
```

### 18.6 Content Tab

`Content Advisor` — visual only. Clicking `Enable` shows:

```
Content Advisor

Content Advisor is disabled.

It cannot be enabled.

Some content cannot be filtered.

[ OK ]
```

### 18.7 Security Tab

Standard IE security zones (Internet, Local intranet, Trusted sites, Restricted sites). Visual only.

### 18.8 Programs Tab

`HTML editor: Notepad`. `E-mail: Outlook Express`. `News: Outlook Express`. `Internet call: NetMeeting`. Visual only.

### 18.9 Advanced Tab

A long scrolling list of checkboxes. Visual only.

### 18.10 Internet Options Build Notes

- **Do:** Make the Home page editable and reflect in IE.
- **Do:** Make Clear History work.
- **Do:** Show Connection tab with duration.
- **Don't:** Implement Content Advisor.
- **Priority:** General tab > Home page > Connection tab > Clear History > Everything else.

**Estimated: 25 min.**

---

## 19. The Settings-Only Easter Eggs

These eggs only live in settings panels. Some of these are already listed above as part of specific applets; this section is a summary for the build team.

| # | Egg | Panel | Trigger | Impact |
|---|---|---|---|---|
| **S01** | `SEATS.BMP` wallpaper | Display → Background | Select `SEATS`, click Apply | The hackathon canon egg (A03) |
| **S02** | `SEAT` scheme | Display → Appearance | Select hidden `SEAT` scheme | 10s of inverted desktop |
| **S03** | Session Log in screensaver | Display → Screen Saver | Set 3-min screensaver, wait | The machine is alive (A06) |
| **S04** | `SEAT_07` cursor scheme | Mouse → Pointers | Select hidden `SEAT_07` scheme | All cursors become chairs |
| **S05** | Cursor trails | Mouse → Motion | Enable pointer trails | Trail of chairs if S04 active |
| **S06** | Hackathon calendar tooltip | Date/Time | Open on Nov 1, 2026 | "GANDHI HACKATHON" (E09) |
| **S07** | Pre-1998 dates greyed | Date/Time | Navigate to 1997 | "Before the session" (E04) |
| **S08** | 2050 dates greyed | Date/Time | Navigate to 2050 | "After the plan" (E05) |
| **S09** | Time change denied | Date/Time | Try to change the time | "The session clock does not adjust" |
| **S10** | Speakers disconnected | Sounds | Click Apply | "Speakers disconnected in 1998" |
| **S11** | Hidden "Session Started" event | Sounds | Scroll to bottom | "It is still playing" |
| **S12** | SHREE CYBER ZONE — Admin entry | Add/Remove | Look at program list | 0.1 MB. What is it? |
| **S13** | Cannot uninstall SHREE CYBER ZONE — Admin | Add/Remove | Select + click Add/Remove | "It is running" |
| **S14** | mIRC entry appears after unlock | Add/Remove | After 4 chat logs read | Installed by PROPRIETOR |
| **S15** | RAM expands on 4th visit | System → General | Open System Properties 4 times | 64 MB → 65,536 MB |
| **S16** | SEAT_07 unknown device | System → Device Manager | Expand Unknown Devices | The player's "device" |
| **S17** | Session Resources: —% | System → Performance | Click File System, close, return | The dash |
| **S18** | 13th network device (`—`) | Network | Look below PC12 | The unknown device |
| **S19** | PC03 duration live-increments | Network | Open PC03 details | 10,224 days, ticking |
| **S20** | Modem ATI4/ATI5 responses | Modems → Diagnostics | Query Modem | SESSION ACTIVE / DO NOT CLOSE |
| **S21** | SEAT_07 font | Fonts | Scroll to bottom | A font named for the player |
| **S22** | SEAT_07 third user | Users | Open Users 3 times | The player's account |
| **S23** | Cannot delete SEAT_07 | Users | Try to delete | "It will be opened by you" |
| **S24** | Show hidden files doesn't reveal BACKROOM$ | Folder Options | Check the box | "Some files hide by choice" |
| **S25** | .IMG file type | Folder Options → File Types | Scroll to IMG | The suspicious file type |
| **S26** | LAN connected since 1998 | Internet Options → Connection | Look at duration | 10,224 days |
| **S27** | Dial-up "no dial tone" | Internet Options → Connection → Dial-Up | Click Dial-Up Settings | The modem is connected |

**The best settings eggs are S01, S02, S04, S06, and S22.** Build these first.

---

## 20. Build Notes

### 20.1 Priority Order

If you have **2 hours** for all settings, build in this order:

| Order | Panel | Time | Why |
|---|---|---|---|
| 1 | **Display → Background** | 30 min | `SEATS.BMP` is the canon egg |
| 2 | **Date/Time** | 30 min | Hackathon tooltip, date ranges |
| 3 | **Display → Appearance** | 20 min | `SEAT` scheme |
| 4 | **Mouse → Pointers + Motion** | 20 min | `SEAT_07` cursor + trails |
| 5 | **System → Device Manager** | 20 min | `SEAT_07` unknown device |
| 6 | **Add/Remove Programs** | 15 min | The uninstallable admin |
| 7 | **Folder Options** | 10 min | `Show hidden files` lie |

**Total: ~2h 25min.** This is the minimum to feel complete.

If you have **4 hours**, add:

| Order | Panel | Time |
|---|---|---|
| 8 | **Screen Saver** | 20 min |
| 9 | **Network** | 25 min |
| 10 | **Users** | 25 min |
| 11 | **Internet Options** | 25 min |
| 12 | **Printers** | 20 min |
| 13 | **Modems** | 15 min |

**Total: ~3h 30min** for the full settings layer.

### 20.2 What Not to Build

| Don't build | Why |
|---|---|
| **Actual color picker changes** | The scheme is the master. Changing individual colors would break the aesthetic. |
| **Actual display resolution changes** | The zoom approach is enough. Real resolution changes would break the layout. |
| **Actual font installation** | The font list is fixed. |
| **Actual hardware profiles** | Visual only. |
| **A real Add User Wizard** | The wizard always fails. |
| **A working Content Advisor** | It cannot be enabled. |
| **A working dial-up connection** | The modem is connected. It has been connected. |

### 20.3 The One Rule of This Document

> **Every settings panel is a mirror. The machine shows the player what it thinks it is. The machine is lying about some things, and telling the truth about others. The player must learn which is which.**

The **Background tab** tells the truth: the player is in the chair.

The **Date/Time panel** tells the truth: the session has been running for 28 years.

The **System Properties** panel tells the truth: this is a Pentium II. It is 1998. But it is also 2026.

The **Folder Options** panel lies: it says hidden files can be shown. They cannot.

**The player who explores every settings panel will know the machine better than the machine knows itself.** That is the point.

### 20.4 Integration Checklist

Before demo, verify:

- [ ] Control Panel opens from Start → Settings → Control Panel
- [ ] All 18 applet icons are present and clickable
- [ ] Display Properties → Background tab: `SEATS` is the last wallpaper, applies correctly
- [ ] Display Properties → Appearance tab: `SEAT` scheme exists, applies, reverts after 10s
- [ ] Display Properties → Screen Saver: Session Log overlay appears in screensaver
- [ ] Display Properties → Effects: Smooth fonts cannot stay on
- [ ] Date/Time: calendar opens on current month, Nov 1 2026 has hackathon tooltip
- [ ] Date/Time: pre-1998 dates greyed with "Before the session"
- [ ] Date/Time: 2050 dates greyed with "After the plan"
- [ ] Date/Time: time change denied with "session clock does not adjust"
- [ ] Mouse → Pointers: `SEAT_07` scheme exists, all cursors become chairs
- [ ] Mouse → Motion: pointer trails work
- [ ] System → Device Manager: `SEAT_07` in Unknown Devices
- [ ] System → General: RAM expands on 4th visit
- [ ] Add/Remove: SHREE CYBER ZONE — Admin is present and uninstallable
- [ ] Add/Remove: all uninstalls denied
- [ ] Users: SEAT_07 appears after 3 visits, cannot be deleted
- [ ] Folder Options: Show hidden files does NOT reveal `BACKROOM$`
- [ ] Network: 13th device (`—`) present, PC03 duration live
- [ ] Modems: query shows SESSION ACTIVE, DO NOT CLOSE
- [ ] Fonts: SEAT_07 font at bottom
- [ ] Internet Options: LAN duration is 10,224 days

### 20.5 Related Documents

| Document | What it covers |
|---|---|
| `README.md` | Public project overview |
| `story.md` | Full narrative, all endings |
| `easter_eggs.md` | All 61 eggs, prioritized |
| `features.md` | Windows 98 shell spec |
| `applications.md` | App-by-app build specs |
| `websites.md` | IE fake sites content |
| `games.md` | Minesweeper, Solitaire, game studio |
| `docs_and_files.md` | Public PC files content |
| `chats_and_emails.md` | Chat logs, emails, drafts |
| `UIUX.md` | Boot sequence, audio, wallpaper, core functionality |

---

<div align="center">

**18 panels. 27 eggs. 1 mirror.**

**Open Control Panel. The machine is looking back.**

**Start → Run → `2050`**

</div>

---

**End of `settings.md`. Ready for the next file: `games.md`.**