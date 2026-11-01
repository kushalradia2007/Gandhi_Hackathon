# UIUX.md

> **Project:** SHREE CYBER ZONE — PC 03 (ADMIN)
> **For:** Gandhi Hackathon 2026 · OpenLake × Meraz · IIT Bhilai · 1st November 2026
> **Document status:** LOCKED · The experience bible · Build-ready
> **Rule:** This is the document that ties everything together. If `features.md` is the blueprint, `UIUX.md` is the *feeling*. Every pixel, every sound, every pause, every color — this is where the machine becomes a place.

---

## 0. How to Read This Document

This is the **final** document in the spec. It assumes you have read:

- `features.md` — the shell spec (windows, menus, taskbar, dialogs)
- `applications.md` — the app specs (Notepad, Explorer, mIRC, etc.)
- `settings.md` — the Control Panel spec
- `games.md` — the game specs
- `docs_and_files.md` — the file content
- `chats_and_emails.md` — the conversation content
- `websites.md` — the fake web content
- `story.md` — the narrative
- `easter_eggs.md` — the eggs

**This document does not repeat those specs.** It specifies the things that are *cross-cutting*:

1. **The Boot Experience** — the first 4 seconds
2. **The Sound Design** — every sound, when, and why
3. **The Wallpaper System** — the visual identity
4. **The Cursor System** — the physical feel
5. **The Motion Rules** — what moves, what doesn't
6. **The Color System** — the exact palette
7. **The Typography** — the exact fonts
8. **The Resolution Strategy** — how it scales
9. **The Performance Budget** — how it stays smooth
10. **The First 10 Seconds** — the moment the judge decides
11. **The Idle Experience** — what the machine does when you leave
12. **The Shutdown Experience** — the exit that doesn't exit
13. **The Accessibility Layer** — how to include everyone without breaking the aesthetic
14. **The Emotional Arc of the UI** — how the interface changes as the player learns
15. **The Checklist** — everything before demo

**This is the last file. When you finish reading it, you are ready to build.**

---

## 1. The Boot Experience

### 1.1 The Philosophy

The boot sequence is **the first impression.** It is the moment the player decides whether this is a real machine or a web page pretending to be one.

**The rule:** The boot sequence must feel like a machine turning on. Not a loading screen. Not a splash. A **machine.**

It must be **skippable** (click anywhere). It must be **short** (4 seconds). It must be **unforgettable** (the BIOS text, the chime, the moment the desktop appears).

### 1.2 The Exact Timeline

| Time | Screen | Duration | Notes |
|---|---|---|---|
| **-0.5s** | Black screen | 500ms | The machine is "off." No cursor. No hint. |
| **0.0s** | BIOS POST screen | 1000ms | White monospace text on black. The machine is "booting." |
| **1.0s** | BIOS logo/splash | 400ms | The Award BIOS logo or a generic "Energy Star" logo. |
| **1.4s** | Black screen | 200ms | A pause. A breath. |
| **1.6s** | Windows 98 splash | 1600ms | The classic cloud logo. The "Microsoft Windows 98" text. |
| **3.2s** | Black screen | 300ms | Another pause. |
| **3.5s** | Desktop fade-in | 500ms | The teal desktop, icons, and taskbar appear. |
| **4.0s** | Startup chime | 1500ms | The Windows 98 startup sound plays. |
| **5.5s** | Interactive | — | The machine is ready. |

**Total: 5.5 seconds.** The player can skip at any point.

### 1.3 The BIOS Screen

**Text (monospace, white on black, 14px):**

```
Award Modular BIOS v4.51PG, An Energy Star Ally
Copyright (C) 1984-98, Award Software, Inc.

Pentium II 350 MHz
Memory Test: 65536K OK

Award Plug and Play BIOS Extension v1.0A
Copyright (C) 1998, Award Software, Inc.

Detecting IDE Primary Master  ... None
Detecting IDE Primary Slave   ... None
Detecting IDE Secondary Master ... CD-ROM
Detecting IDE Secondary Slave  ... None

Press DEL to enter SETUP
03/03/98-i440BX-8671-2A69KA1AC-00
```

**Layout:** Left-aligned, starting ~20% from top. Line height 18px. The entire block is ~300px tall.

**The bottom line:** `03/03/98-i440BX-8671-2A69KA1AC-00` — this is a real BIOS identifier string. The date `03/03/98` is the café's opening date. The player who notices it will smile. The player who doesn't will not.

**The easter egg:** If the player presses `DEL` during the BIOS screen, a mock BIOS setup screen appears for 1 second, then the boot continues. The player cannot interact with it.

### 1.4 The Windows 98 Splash

**Design:** The classic Windows 98 startup screen.

- Background: Black
- Center: The Windows 98 cloud logo (the blue sky, the clouds, the "Microsoft Windows 98" text)
- Bottom: `Copyright © 1981-1998 Microsoft Corporation`
- Bottom-right: A small animated progress indicator (a "loading" bar or a spinning cursor)

**The build's version:** The splash is a **PNG image** (drawn or sourced) of the Windows 98 startup screen. It fades in over 200ms, holds for 1.2s, and fades out over 200ms.

**The subtitle:** In small text at the bottom of the splash, there is a line:

```
SHREE CYBER ZONE — PC 03 (ADMIN)
```

This is not standard Windows 98. It is the machine's **OEM branding.** The café put its name on the boot screen. It has been there since 1998.

### 1.5 The Startup Chime

**Sound:** The Windows 98 startup sound (the "The Microsoft Sound" by Brian Eno).

**Rule:** If you cannot source the original, use a **generic 90s synth chime.** No modern music. No custom composition. The chime must sound like it came from a 1998 sound card.

**Volume:** 60% of the master volume. The chime is the loudest sound in the build. It announces the machine.

**Timing:** The chime starts at **4.0s** — when the desktop appears. It plays for **1.5s**.

**Mute behavior:** If the player has muted audio (via the system tray), the chime does not play. The boot sequence still takes the same time. **The chime is not a substitute for the wait.**

### 1.6 The Skip Behavior

**Trigger:** Click anywhere, press any key, or touch the screen during the boot sequence.

**Result:**
- The boot sequence instantly jumps to the desktop.
- The startup chime is **cut off** (not played).
- The transition is instant (no fade).

**Rule:** A player who skips the boot has already seen it. They should not be forced to sit through it again.

### 1.7 The Boot Persistence

**Rule:** The boot sequence plays **once per session.** It does not replay on every page load.

**Implementation:**

```javascript
if (!sessionStorage.getItem('booted')) {
  playBootSequence();
  sessionStorage.setItem('booted', 'true');
} else {
  showDesktop();
}
```

**Exception:** If the player triggers `Start → Shut Down → Restart`, the boot sequence plays again. This is a **deliberate replay.** The machine is "rebooting."

**Exception:** If the player clears session storage (closes the tab and reopens), the boot plays again.

### 1.8 The Boot Build Notes

- **Do:** Use CSS + JS only. No video. No external assets.
- **Do:** Make the BIOS text monospace (`Courier New`, 14px, white on black).
- **Do:** Make the splash a single PNG image.
- **Do:** Make the transition to desktop instant (no fade). Win98 booted instantly.
- **Do:** Add the `SHREE CYBER ZONE — PC 03 (ADMIN)` line to the splash.
- **Don't:** Add modern loading spinners, progress bars with percentages, or "loading..." text. This is not a web app. It is a boot.
- **Don't:** Make the boot longer than 4 seconds. Judges are impatient.
- **Priority:** Boot timeline > BIOS text > Splash > Chime > Skip.

**Estimated: 45 min.**

---

## 2. The Sound Design

### 2.1 The Philosophy

**Sound is the difference between "a nice replica" and "a place."**

The player who hears the startup chime, the click of a button, the error beep when a dialog opens — they are not looking at a website. They are *inside a machine.*

But sound is also **dangerous.** A loud sound in a public demo is a fail. A missing mute button is a fail. A sound that plays without user interaction is a fail.

**The rules:**

1. **Every sound is optional.** Default to **muted.** The player opts in.
2. **Every sound is short.** < 1.5 seconds, except ambient loops.
3. **Every sound is quiet.** Maximum 60% volume.
4. **Every sound is original or public domain.** No copyrighted audio.
5. **Every sound is 1998.** No modern synths. No electronic music. No sound effects from 2020s games.

### 2.2 The Sound Inventory

| # | Sound | Trigger | Duration | Volume | Priority |
|---|---|---|---|---|---|
| 1 | **Startup chime** | Boot completes | 1.5s | 60% | P1 |
| 2 | **Click** | Button press, menu item | 50ms | 40% | P0 |
| 3 | **Info beep** | Info dialog opens | 100ms | 40% | P1 |
| 4 | **Warning beep** | Warning dialog opens | 100ms | 50% | P1 |
| 5 | **Error beep** | Error dialog opens | 150ms | 50% | P1 |
| 6 | **Dog bark** | Run → `tommy` | 300ms | 60% | P1 |
| 7 | **Modem handshake** | Opening a new chat session | 8s | 40% | P2 |
| 8 | **Print whir** | Print dialog open | 500ms | 30% | P2 |
| 9 | **Paper jam** | Print trap | 1s | 50% | P2 |
| 10 | **Tube TV hum** | Ambient (optional) | Loop | 10% | P2 |
| 11 | **Ceiling fan** | Ambient (optional) | Loop | 5% | P2 |
| 12 | **Cricket crowd** | Ambient (optional) | Loop | 5% | P2 |
| 13 | **Windows 98 startup** | Alternative to #1 | 2s | 60% | P1 |

**Total: 13 sounds.** The P0 (click) and P1s are essential. The ambient loops are optional.

### 2.3 The Click Sound

**The most important sound in the build.** It plays every time the player clicks a button, opens a menu, or interacts with the UI.

**Design:** A short, dry, mechanical click. Like a **mouse button** being pressed. Not a beep. Not a pop. A **click.**

**Duration:** 50ms. Any longer and it feels laggy.
**Volume:** 40%. Quiet enough to not be annoying after 100 clicks.

**Implementation:**

```javascript
const clickSound = new Audio('/sounds/click.wav');
clickSound.volume = 0.4;

function playClick() {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {}); // Ignore autoplay errors
}

// Attach to every button, menu item, and clickable
document.querySelectorAll('button, .menu-item').forEach(el => {
  el.addEventListener('mousedown', playClick);
});
```

**Rule:** The click must **not** play on every `mousedown` on the desktop. Only on interactive elements. The desktop click is silent.

### 2.4 The Dialog Beeps

**Info beep:** A short, soft `ding`. Plays when an informational dialog opens (e.g., "Cannot open file").
**Warning beep:** A higher-pitched `beep`. Plays when a warning dialog opens.
**Error beep:** A harsh, two-tone `buzz`. Plays when an error dialog opens.

**Rule:** These are the **Windows 98 standard sounds.** They are the sounds everyone remembers. If you cannot source the originals, use synthesized approximations.

**Rule:** The dialog beep plays **after** the dialog appears, not before. It is the sound of the dialog, not the sound of the click.

### 2.5 The Ambient Sounds (P2)

**The café is a place.** It has a ceiling fan, a tube TV, a cricket match, and the occasional chai cup clinking.

**These sounds are optional.** They are muted by default. They are enabled via the system tray volume icon or a settings panel.

**The ambient mix:**

- **Ceiling fan:** A low, rhythmic whir. 5% volume. Loops every 30s.
- **Tube TV hum:** A faint electrical hum. 10% volume. Loops every 20s.
- **Cricket crowd:** A distant crowd murmur. 5% volume. Loops every 45s. Occasionally a faint cheer.

**The rule:** The ambient sounds must **not** be distracting. They must be **background.** They are the sound of a room, not the sound of a game.

**The easter egg:** If the player enables ambient sounds and then opens `C:\BACKROOM$`, the sounds **fade out.** The room goes quiet. The machine is listening.

### 2.6 The Audio Controls

**Mute toggle:** A small speaker icon in the system tray. Clicking it mutes/unmutes all sounds. The icon changes to a speaker with a red X when muted.

**Default state:** **Muted.** The player must click the speaker icon to enable sound.

**Why:** Judges demo in public. A machine that suddenly plays a startup chime in a quiet room is a fail. **Muted by default is respectful.**

**The banner:** When the player unmutes, a small yellow banner appears at the top of the screen for 3 seconds:

```
Audio enabled. Ambient sounds are off by default.
```

**The ambient toggle:** A second icon in the system tray (a small radio or a fan icon) toggles ambient sounds. Default: off.

### 2.7 The Sound Build Notes

- **Do:** Default to muted.
- **Do:** Provide a mute toggle in the system tray.
- **Do:** Make the click sound feel right — short, dry, quiet.
- **Do:** Use the Windows 98 dialog beeps (or close approximations).
- **Don't:** Use modern sound effects. No whooshes, no pops, no swooshes.
- **Don't:** Play sound without user interaction. No "autoplay."
- **Don't:** Make ambient sounds mandatory.
- **Priority:** Mute toggle > click sound > dialog beeps > startup chime > dog bark > ambient.

**Estimated: 60 min.**

---

## 3. The Wallpaper System

### 3.1 The Philosophy

**The wallpaper is the identity of the machine.**

The default is **solid teal `#008080`.** This is not a wallpaper. It is the **absence** of a wallpaper. It is the classic Windows 98 default. It is the color the machine has been since 1998.

The player can change it. The player can select from a list of period-accurate wallpapers. And — the most important thing — the player can select **`SEATS.BMP`**, which is the hackathon canon egg.

### 3.2 The Default: Teal

**Color:** `#008080`
**Texture:** None. Solid.
**Why:** This is the Windows 98 default desktop. It is the color of every cyber café in 1998. It is the color of the machine.

**Rule:** Do not add patterns, gradients, or images to the default. The teal is the teal. It has been the teal since 1998.

### 3.3 The Wallpaper List

| Wallpaper | Description | Priority | Source |
|---|---|---|---|
| `(None)` | Solid teal | P0 | Default |
| `Clouds` | Pixelated cloud wallpaper (classic Win98) | P2 | Public domain / draw |
| `Forest` | Pixelated forest (classic Win98) | P2 | Public domain / draw |
| `GoldWeave` | Gold pattern (classic Win98) | P2 | Draw |
| `Honey` | Honeycomb pattern (classic Win98) | P2 | Draw |
| `SEATS` | **The nine-chair org chart** | **P0** | Draw |
| `Teal` | Solid teal (duplicate of None) | P2 | Default |
| `Windows 98` | Windows 98 logo wallpaper | P2 | Public domain / draw |
| `Red, White, and Blue` | Patriotic wallpaper | P2 | Public domain / draw |
| `Straw Mat` | Textured wallpaper | P2 | Draw |

**Only `SEATS` (P0) and `(None)` (P0) are essential.** The rest are polish. If time is short, ship only those two.

### 3.4 The `SEATS.BMP` Wallpaper

**This is the most important wallpaper in the build.** It is the hackathon canon egg. It is the screenshot moment.

**Design:**

- **Dimensions:** 800×600 (standard for 1998)
- **Background:** `#000080` navy
- **Content:** Nine chairs in a 3×3 grid
- **Each chair:** A simple pixel-art chair (backrest, seat, legs). White fill, grey shadow.
- **Under each chair:** A label in 8px pixel font, white.

**The labels:**

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

**The visual hierarchy:**

- `SEAT_07`'s label is **six lines long.** It takes up more vertical space than any other label. It is visibly different.
- `SEAT_03`'s chair is **empty.** It is drawn as just a chair frame, no seat. The label is `VACANT`.
- `SEAT_05`'s chair is **crossed out.** A thin red `X` over the chair. The label is `NEUTRALIZED`.
- All other chairs are drawn full and solid.

**The one sentence:** `MERAZ / OPENLAKE, IIT BHILAI — CANDIDATE PENDING` — the player's seat. The player's name. The player's organization. The player's status.

**The build:** Draw this as a single PNG. Do not use CSS. It is a bitmap. It is 16-color. It is 1998.

### 3.5 The Wallpaper Display Modes

When the player selects a wallpaper, the display mode is **Stretch** by default (Win98 behavior).

| Mode | Behavior |
|---|---|
| **Center** | The image is centered at its native size. Teal shows around it. |
| **Tile** | The image repeats to fill the desktop. |
| **Stretch** | The image is scaled to fill the desktop. |

**Rule:** `SEATS.BMP` is `Stretch` by default. It fills the desktop. The chairs are visible.

### 3.6 The Wallpaper Change Animation

**Rule:** No animation. The wallpaper changes **instantly.** Win98 did not fade. It changed.

**Exception:** The `SEATS.BMP` wallpaper — when applied — has a **very subtle** 200ms fade-in. This is a deliberate exception. It is the player's reward. It should feel like the machine is **looking back.**

### 3.7 The Wallpaper Build Notes

- **Do:** Ship `(None)` (teal) as default.
- **Do:** Ship `SEATS.BMP` as a hidden option (last in the list, no thumbnail).
- **Do:** Make `SEATS.BMP` the hackathon canon egg.
- **Do:** Draw the chairs in pixel art. No CSS.
- **Don't:** Add wallpapers that break the aesthetic. No modern art. No photos.
- **Priority:** Teal > SEATS > Other wallpapers.

**Estimated: 60 min** (mostly drawing the SEATS image).

---

## 4. The Cursor System

### 4.1 The Philosophy

**The cursor is the player's hand.** It is how they touch the machine. It must be **physical**, **pixelated**, and **1998.**

**The rule:** The default cursor is the Windows 98 arrow. Not the modern arrow. Not a pointer. The **Win98 arrow** — white fill, black outline, black shadow offset 1px down-right.

### 4.2 The Cursor Set

| State | Cursor | Trigger |
|---|---|---|
| **Default** | Win98 arrow | Desktop, windows, most elements |
| **Text** | I-beam | Over text content (Notepad, dialog fields) |
| **Busy** | Hourglass | During loading or blocking operations |
| **Hand** | Pointing hand | Over links, buttons |
| **Move** | Four-arrow | Over window title bars |
| **Resize** | Diagonal arrows | Over window resize corner |
| **Not allowed** | Circle with slash | Over blocked actions |
| **Crosshair** | Crosshair | Over Paint canvas |
| **Help** | Arrow with `?` | (Optional, for tooltips) |

**Rule:** All cursors are **pixel art.** No anti-aliasing. No smooth edges. They are 32×32 PNGs with transparent backgrounds.

### 4.3 The Cursor Implementation

**CSS:**

```css
body {
  cursor: url('/cursors/arrow.png') 0 0, auto;
}

.text {
  cursor: url('/cursors/ibeam.png') 0 0, text;
}

.window-titlebar {
  cursor: url('/cursors/move.png') 0 0, move;
}

.window-resize {
  cursor: url('/cursors/nwse-resize.png') 0 0, nwse-resize;
}
```

**Rule:** The `url()` cursor must be a PNG. SVG cursors work in modern browsers but do not feel 1998. PNGs are pixel-perfect.

**Rule:** The cursor hotspot is `0 0` (top-left) for most cursors. For the I-beam, it is `0 0`. For the move cursor, it is `8 8` (center).

### 4.4 The Busy Cursor

**Trigger:** When the machine is doing something (opening a large file, loading a fake page, running a search).

**Behavior:**

1. The cursor becomes the hourglass.
2. The action completes.
3. The cursor returns to the default.

**Duration:** The busy cursor shows for a **minimum of 300ms.** This makes the machine feel real. Even if the action is instant, the cursor shows for 300ms.

**Implementation:**

```javascript
function withBusyCursor(fn) {
  document.body.style.cursor = 'url(/cursors/hourglass.png) 0 0, wait';
  const start = Date.now();
  fn();
  const elapsed = Date.now() - start;
  const remaining = Math.max(0, 300 - elapsed);
  setTimeout(() => {
    document.body.style.cursor = '';
  }, remaining);
}
```

### 4.5 The Ghost Cursor (Easter Egg A05)

**Trigger:** The player is idle on the desktop for **60 seconds.**

**Behavior:**

1. A **second cursor** appears in the top-right corner of the screen.
2. It moves slowly and independently for **4 seconds.**
3. It disappears.

**Design:** The ghost cursor is the **same Win98 arrow.** It is not a different shape. It is the same cursor. It should look like someone else is moving the mouse.

**Implementation:**

```javascript
let idleTimer;
let ghostCursor;

document.addEventListener('mousemove', resetIdle);

function resetIdle() {
  clearTimeout(idleTimer);
  if (ghostCursor) ghostCursor.remove();
  idleTimer = setTimeout(showGhostCursor, 60000);
}

function showGhostCursor() {
  ghostCursor = document.createElement('div');
  ghostCursor.style.cssText = `
    position: fixed;
    top: 100px;
    right: 200px;
    width: 32px;
    height: 32px;
    background: url('/cursors/arrow.png') no-repeat;
    pointer-events: none;
    z-index: 9999;
    transition: top 1s ease, right 1s ease;
  `;
  document.body.appendChild(ghostCursor);

  // Move it around
  setTimeout(() => {
    ghostCursor.style.top = '300px';
    ghostCursor.style.right = '400px';
  }, 100);
  setTimeout(() => {
    ghostCursor.style.top = '200px';
    ghostCursor.style.right = '300px';
  }, 2000);

  // Remove after 4 seconds
  setTimeout(() => {
    if (ghostCursor) {
      ghostCursor.style.opacity = '0';
      ghostCursor.style.transition = 'opacity 0.5s';
      setTimeout(() => ghostCursor.remove(), 500);
    }
  }, 4000);
}
```

**The one sentence:** There is no sentence. The ghost cursor is the sentence. The player will notice it. They will wonder who moved it. They will not be told.

### 4.6 The Cursor Trails (Settings)

**Already specified in `settings.md` section 3.7.** The player can enable pointer trails via Mouse Properties → Motion. When enabled, a fading trail of cursor images follows the mouse.

**The rule:** Cursor trails are **optional.** Default: off.

**The easter egg:** If the player has set the `SEAT_07` cursor scheme (all cursors are chairs) **and** enabled trails, the trail is a trail of **tiny chairs.** This is the funniest moment in the build.

### 4.7 The Cursor Build Notes

- **Do:** Use PNG cursors. 32×32. Pixel art.
- **Do:** Make the busy cursor work with a minimum 300ms duration.
- **Do:** Add the ghost cursor after 60s idle.
- **Don't:** Use modern cursors. No smooth arrows. No macOS cursors.
- **Priority:** Default arrow > busy hourglass > text I-beam > ghost cursor > trails > other cursors.

**Estimated: 45 min.**

---

## 5. The Motion Rules

### 5.1 The Philosophy

**Windows 98 had almost no animations.** Windows appeared instantly. Menus opened instantly. Buttons changed state instantly. The only animations were the start menu's "unfold" effect and the cursor trails.

**The rule:** The build must feel **instant.** No easing. No fades. No transitions. Every action happens immediately.

### 5.2 The Motion Rules

| Action | Rule |
|---|---|
| **Window open** | Instant. No fade. No scale. |
| **Window close** | Instant. |
| **Window minimize** | Instant. (Win98 had a "zoom to taskbar" animation, but it was 200ms and rarely noticed. Skip it.) |
| **Window maximize** | Instant. |
| **Window drag** | The window follows the cursor **exactly.** No lag. No easing. |
| **Window resize** | Instant. Content reflows immediately. |
| **Menu open** | Instant. (The "unfold" animation is optional — see `settings.md` Effects tab.) |
| **Menu close** | Instant. |
| **Button press** | Instant. The bevel flips. The click sound plays. |
| **Button release** | Instant. The bevel flips back. |
| **Dialog open** | Instant. The dialog appears. |
| **Dialog close** | Instant. |
| **Tab switch** | Instant. No slide. No fade. |
| **Scrollbar scroll** | Instant. No smooth scrolling. |
| **Icon select** | Instant. The icon highlights. |
| **Icon drag** | The ghost follows the cursor exactly. No lag. |
| **Wallpaper change** | Instant (except `SEATS.BMP`, which has a 200ms fade). |
| **Color scheme change** | Instant. The entire desktop updates immediately. |
| **Boot sequence** | The only sequenced animation in the build. See section 1. |
| **Screensaver** | The only continuous animation (starfield). See `features.md` section 18. |

### 5.3 The `prefers-reduced-motion` Rule

**Accessibility:** If the player's browser has `prefers-reduced-motion: reduce` set, the build must **disable**:

- The boot sequence animations (show the desktop immediately)
- The screensaver
- The ghost cursor
- The cursor trails
- The `SEATS.BMP` fade-in
- The flying cards animation (Solitaire)

**Rule:** `prefers-reduced-motion` is respected. But the build still **works.** No features are removed. Only animations are disabled.

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 5.4 The Motion Build Notes

- **Do:** Make everything instant.
- **Do:** Use `transition: none` on buttons, menus, and windows.
- **Do:** Make the boot sequence the only sequenced animation.
- **Do:** Respect `prefers-reduced-motion`.
- **Don't:** Add fades, slides, scales, or bounces to anything. Not even the cursor.
- **Priority:** Instant windows > instant menus > instant scroll > boot sequence.

**Estimated: 30 min.** (It's mostly *removing* animations, not adding them.)

---

## 6. The Color System

### 6.1 The Exact Palette

| Role | Hex | Usage |
|---|---|---|
| **Desktop** | `#008080` | Teal background |
| **Window face** | `#C0C0C0` | Buttons, taskbar, dialog backgrounds |
| **Title bar active** | `#000080` | Active window title |
| **Title bar inactive** | `#808080` | Inactive window title |
| **Title text active** | `#FFFFFF` | Active title |
| **Title text inactive** | `#C0C0C0` | Inactive title |
| **Highlight** | `#000080` | Selection background |
| **Highlight text** | `#FFFFFF` | Selected text |
| **Button highlight** | `#FFFFFF` | Top-left bevel |
| **Button shadow** | `#808080` | Bottom-right bevel |
| **Button dark shadow** | `#000000` | Outer border |
| **Text** | `#000000` | Standard text |
| **Disabled text** | `#808080` | Greyed text |
| **Warning** | `#800000` | Ledger red text |
| **Error** | `#FF0000` | Error dialog |
| **Link** | `#0000FF` | IE hyperlinks |
| **Visited link** | `#800080` | IE visited |
| **BSOD blue** | `#0000AA` | BSOD background |
| **BSOD text** | `#FFFFFF` | BSOD text |
| **Shutdown orange** | `#FFA500` | "It is now safe..." |
| **SEATS navy** | `#000080` | SEATS wallpaper background |

### 6.2 The Bevel System

**Every button, every dialog, every window chrome uses the 3D bevel.** The bevel is the visual signature of Windows 98.

**Raised (un-pressed):**

```
Top:    1px #FFFFFF
Left:   1px #FFFFFF
Right:  1px #000000
Bottom: 1px #000000
Inner top:    1px #C0C0C0
Inner left:   1px #C0C0C0
Inner right:  1px #808080
Inner bottom: 1px #808080
```

**Pressed:**

```
Top:    1px #000000
Left:   1px #000000
Right:  1px #FFFFFF
Bottom: 1px #FFFFFF
```

**Sunken (for scrollbar tracks, text fields):**

```
Top:    1px #808080
Left:   1px #808080
Right:  1px #FFFFFF
Bottom: 1px #FFFFFF
```

**Rule:** Every bevel is 1px or 2px. No 3px, no 4px, no "deep" bevels. Win98 was flat but beveled.

### 6.3 The `SEAT` Scheme

**Already specified in `settings.md` section 2.8.** A hidden color scheme that inverts the desktop to black-and-white. It triggers a message and reverts after 10 seconds.

**The one sentence:** `You are already in the chair.`

### 6.4 The Color Build Notes

- **Do:** Use the exact hex values. No "close enough."
- **Do:** Make the bevel consistent everywhere.
- **Do:** Make the teal `#008080` the default desktop.
- **Don't:** Use gradients, shadows, or transparency.
- **Don't:** Add modern colors. No "accent colors." No Material Design.
- **Priority:** Teal > window face > title bars > bevels > highlights.

**Estimated: 30 min.**

---

## 7. The Typography

### 7.1 The Font Stack

| Use | Font | Size | Weight |
|---|---|---|---|
| **Body text** | MS Sans Serif (fallback: Tahoma, Verdana, sans-serif) | 11px | normal |
| **Title bar text** | MS Sans Serif | 11px | bold |
| **Menu items** | MS Sans Serif | 11px | normal |
| **Button text** | MS Sans Serif | 11px | normal |
| **Status bar** | MS Sans Serif | 11px | normal |
| **Icon labels** | MS Sans Serif | 11px | normal |
| **Dialog text** | MS Sans Serif | 11px | normal |
| **Notepad content** | Fixedsys (fallback: Courier New, monospace) | 12px | normal |
| **BSOD text** | Courier New | 14px | normal |
| **BIOS text** | Courier New | 14px | normal |

**Rule:** MS Sans Serif is the default. If it cannot be loaded, Tahoma is the closest match. **Never use Arial, Helvetica, or system-ui.**

### 7.2 The Metrics

- **Line height:** 16px for body text, 14px for title bar, 18px for Notepad.
- **Letter spacing:** 0. No adjustments.
- **Word spacing:** Default.
- **Text rendering:** `-webkit-font-smoothing: none; text-rendering: optimizeSpeed;`

**Rule:** No anti-aliasing. The text must look **pixelated.** Modern browsers anti-alias by default. Override with the CSS above.

### 7.3 The Pixel Fonts

For the **BIOS text**, **BSOD text**, **splash subtitle**, and **LED displays** (mine counter, timer), use a **pixel font.** Options:

- **Fixedsys** (if available via web font)
- **Press Start 2P** (Google Fonts — close approximation)
- **VT323** (Google Fonts — close approximation)
- **Custom pixel font** (draw your own)

**Rule:** The pixel fonts must be **loaded as web fonts.** Do not rely on the system having them.

### 7.4 The Icon Labels

- **Font:** 11px MS Sans Serif
- **Color:** `#FFFFFF` (white)
- **Shadow:** `1px 1px 0 #000000` (black text shadow, offset 1px down-right)
- **Max width:** 75px (the icon cell width)
- **Max lines:** 2 lines
- **Truncation:** `…` after the second line

**Why the shadow:** The icon labels are on the **teal desktop.** White text on teal is readable, but the shadow makes it legible on any wallpaper (including `SEATS.BMP`).

### 7.5 The Typography Build Notes

- **Do:** Load MS Sans Serif via `@font-face` if possible.
- **Do:** Fall back to Tahoma.
- **Do:** Disable anti-aliasing.
- **Do:** Use pixel fonts for BIOS, BSOD, and LEDs.
- **Don't:** Use modern fonts. No Inter, Roboto, SF Pro, system-ui.
- **Don't:** Use rounded fonts. No Arial Rounded. No Comic Sans (except in GeoCities pages, where it belongs).
- **Priority:** MS Sans Serif > pixel fonts > metrics > icon labels.

**Estimated: 30 min.**

---

## 8. The Resolution Strategy

### 8.1 The Philosophy

**Windows 98 was designed for 800×600.** The build should feel like it was designed for 800×600, even on a 4K monitor.

**The rule:** The build is **fixed-width.** It does not reflow. It does not adapt. It **scales.**

### 8.2 The Scaling Approach

**The build uses a fixed virtual resolution of 1024×768** (a common 1998 resolution). The entire UI is designed at this resolution. Then it is **scaled to fit the viewport.**

**Implementation:**

```css
#desktop {
  width: 1024px;
  height: 768px;
  transform-origin: top left;
  transform: scale(var(--scale));
}

/* JS calculates --scale based on viewport */
function setScale() {
  const scaleX = window.innerWidth / 1024;
  const scaleY = window.innerHeight / 768;
  const scale = Math.min(scaleX, scaleY);
  document.documentElement.style.setProperty('--scale', scale);
}
window.addEventListener('resize', setScale);
setScale();
```

**The result:** The build always looks like a 1024×768 Windows 98 desktop. On a larger screen, it is centered with teal borders. On a smaller screen, it is scaled down (but still 1024×768 in proportion).

### 8.3 The Image Rendering

**Rule:** All images must be rendered with `image-rendering: pixelated` when scaled.

```css
img, .icon {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}
```

**Why:** When the 1024×768 desktop is scaled up to a 4K monitor, the icons must remain **pixelated.** They must not be smoothed by the browser.

### 8.4 The Screen Area Setting

**Already specified in `settings.md` section 2.11.** The player can change the virtual resolution via Display Properties → Settings:

| Setting | Virtual Resolution | Scale |
|---|---|---|
| `640 by 480` | 640×480 | 1.6× |
| `800 by 600` | 800×600 | 1.28× |
| `1024 by 768` | 1024×768 | 1.0× (default) |
| `1280 by 1024` | 1280×1024 | 0.8× |

**Rule:** Changing the screen area **zooms the build.** It does not change the layout. The same windows, the same icons, the same taskbar — just larger or smaller.

### 8.5 The Mobile Strategy

**Rule:** The build is **not designed for mobile.** It is designed for desktop browsers.

**What happens on mobile:** The build loads. It scales down to fit the viewport. It is **barely usable** because the windows are tiny and the text is small. This is **intentional.** A Windows 98 machine is not a mobile app.

**The fallback:** A small banner at the bottom of the screen on mobile:

```
This machine is best viewed on a desktop.
```

**The banner is styled like a Win98 dialog.** It is dismissible.

### 8.6 The Resolution Build Notes

- **Do:** Design at 1024×768.
- **Do:** Scale to fit the viewport.
- **Do:** Use `image-rendering: pixelated`.
- **Do:** Center the build with teal borders on larger screens.
- **Don't:** Make the build responsive. No media queries that change layout.
- **Don't:** Use vector icons. Use pixel art.
- **Priority:** 1024×768 virtual > scaling > pixelated rendering > mobile banner.

**Estimated: 20 min.**

---

## 9. The Performance Budget

### 9.1 The Philosophy

**The machine must feel fast.** A 1998 Pentium II did not have a GPU. It rendered Windows 98 at 60fps on a 14-inch CRT. The build must feel the same.

**The budget:**

| Metric | Target |
|---|---|
| **Initial load** | < 1.5 seconds |
| **Time to interactive** | < 2 seconds |
| **Frame rate** | 60fps |
| **Window open** | < 16ms (1 frame) |
| **Window drag** | 60fps (no lag) |
| **File open** | < 100ms |
| **Total bundle size** | < 5 MB |

### 9.2 The Asset Budget

| Asset type | Budget |
|---|---|
| **Icons** | < 200 KB total (16-color PNGs, 32×32 or 16×16) |
| **Wallpapers** | < 500 KB total (BMP or PNG) |
| **Sounds** | < 1 MB total (WAV or MP3, 8-bit or 16-bit) |
| **Fonts** | < 100 KB total (subset if possible) |
| **Code** | < 300 KB (minified) |
| **Total** | < 2.5 MB (excluding images that are lazy-loaded) |

### 9.3 The Lazy Loading

**Rule:** Files are loaded **on demand.** Opening a file reads its content from a bundled JSON file. The content is not in the initial HTML.

**Implementation:**

```javascript
async function openFile(path) {
  const fs = await import('./data/filesystem.json');
  const content = fs.default[path];
  showNotepad(path, content);
}
```

### 9.4 The Animation Budget

**Rule:** Only **three** things animate continuously:

1. **The boot sequence** (5.5s, one-time)
2. **The screensaver** (after 3 min idle)
3. **The cursor trails** (if enabled)

**Everything else is instant.** No transitions, no fades, no easing.

### 9.5 The Performance Build Notes

- **Do:** Keep the bundle small.
- **Do:** Lazy-load content.
- **Do:** Test on a low-end device.
- **Don't:** Use heavy frameworks. No React, no Vue, no Angular. Plain JS.
- **Don't:** Use CSS-in-JS. Plain CSS.
- **Don't:** Use large images. 16-color PNGs.
- **Priority:** Bundle size > load time > frame rate > animation budget.

**Estimated: 30 min** (mostly discipline, not code).

---

## 10. The First 10 Seconds

### 10.1 The Moment

**This is the moment the judge decides.** The first 10 seconds are not about the story. They are about **credibility.** The judge must think: *"This is a real Windows 98 machine."*

### 10.2 The Timeline

| Time | What happens | What the judge thinks |
|---|---|---|
| **0.0s** | Black screen | "It's loading." |
| **0.5s** | BIOS text appears | "Wait, that's a real BIOS screen." |
| **1.0s** | BIOS logo appears | "Nice." |
| **1.6s** | Windows 98 splash | "Oh, this is a Windows 98 replica." |
| **3.5s** | Desktop appears | "It looks right. The teal. The icons." |
| **4.0s** | Startup chime plays | "Wait, it has sound?" |
| **5.5s** | Interactive | "Okay. Let me click something." |
| **6.0s** | The judge clicks "My Documents" | "It opens. It actually opens." |
| **7.0s** | The judge reads `rates_1998.doc` | "This is a real café. ₹10 per hour." |
| **8.0s** | The judge laughs at the complaint letter | "This is funny." |
| **9.0s** | The judge opens `tommy.jpg` | "A dog. Okay." |
| **10.0s** | The judge is hooked | *"What else is on this machine?"* |

### 10.3 The Three Things That Must Work in 10 Seconds

1. **The boot sequence.** It must play. It must look real. It must be skippable.
2. **The desktop.** It must appear instantly. The teal must be perfect. The icons must be pixel-perfect.
3. **The first click.** Clicking an icon must open a window. The window must look right. The content must be readable.

**If any of these fails, the judge is gone.**

### 10.4 The First 10 Seconds Build Notes

- **Do:** Test the boot sequence on a real device. Not just in the browser.
- **Do:** Make the first click work. Every time.
- **Do:** Make the first file (`rates_1998.doc`) readable in under 2 seconds.
- **Don't:** Add a splash screen with a "click to start" button. The machine boots.
- **Don't:** Add a loading spinner. The BIOS is the loading spinner.
- **Priority:** Boot > desktop > first click > first file.

**Estimated: 15 min** (mostly testing).

---

## 11. The Idle Experience

### 11.1 The Philosophy

**The machine is alive when you are not looking.** The session log grows. The billing timer ticks. The screensaver shows the session log. The ghost cursor appears.

**The rule:** The player who leaves for 5 minutes should come back to a machine that has been **doing things.**

### 11.2 The Idle Timeline

| Idle time | What happens |
|---|---|
| **30 seconds** | Nothing visible. The billing timer ticks. |
| **60 seconds** | A ghost cursor appears in the corner. Moves for 4s. Disappears. |
| **3 minutes** | The screensaver activates. The session log appears in the starfield. |
| **5 minutes** | The session log grows with a new row: `[time] | GUEST | PC 03 | SESSION ACTIVE`. |
| **10 minutes** | The session log grows with another row. The billing timer is now noticeably large. |
| **30 minutes** | The player has been "in the room" for half an hour. The session log has 6 new rows. |

### 11.3 The Screensaver

**Already specified in `settings.md` section 2.7.** The Starfield Simulation with the session log overlay.

**The rule:** The screensaver does not pause the billing timer. It does not pause the session. The machine keeps running.

**The one sentence:** There is no sentence. The screensaver is the sentence. The player comes back to find the session log has grown. They realize the machine was **working** while they were gone.

### 11.4 The Idle Build Notes

- **Do:** Make the billing timer tick in real time.
- **Do:** Make the session log grow on idle.
- **Do:** Make the ghost cursor appear after 60s.
- **Do:** Make the screensaver show the live session log.
- **Don't:** Make the idle experience intrusive. It is subtle. It is the machine breathing.
- **Priority:** Billing timer > ghost cursor > screensaver > session log growth.

**Estimated: 30 min.**

---

## 12. The Shutdown Experience

### 12.1 The Philosophy

**The shutdown is the exit that does not exit.** The player tries to leave. The machine does not let them.

**The rule:** The shutdown must feel **real.** The orange text. The billing timer. The inability to leave.

### 12.2 The Timeline

| Screen | Duration | Content |
|---|---|---|
| **"Windows is shutting down..."** | 3 seconds | Navy background, white text, progress bar |
| **"It is now safe to turn off your computer."** | 10 seconds | Black background, orange text, faint billing timer |
| **Fade to black** | 500ms | Full black, small line: `Session active. Reload to return.` |
| **Reload** | — | The desktop returns. The billing timer continues. |

**Full spec in `applications.md` section 15.**

### 12.3 The Orange Text

**The most important detail in the shutdown.**

- **Color:** `#FFA500` (orange)
- **Font:** Courier New, 16px, bold
- **Text:** `It is now safe to turn off your computer.`
- **Alignment:** Centered, at ~40% vertical position

**Why orange:** This is the exact color Windows 98 used. It is not red. It is not yellow. It is **orange.** It is the color of the machine's polite refusal.

### 12.4 The Billing Timer

**In the bottom-right corner of the shutdown screen:**

```
⏱ 00:03:14
```

**The timer is still ticking.** It continues to count up. It does not stop. It does not reset. The machine is still running.

**The rule:** The timer is **faint.** It is `rgba(255,255,255,0.3)` — barely visible. But it is there. The player who looks will see it.

### 12.5 The Shutdown Build Notes

- **Do:** Make the shutdown take 3 screens.
- **Do:** Use the exact orange.
- **Do:** Show the billing timer.
- **Do:** Make reload return to the desktop.
- **Don't:** Actually shut down. The machine does not shut down.
- **Priority:** Orange text > billing timer > fade > reload.

**Estimated: 20 min.**

---

## 13. The Accessibility Layer

### 13.1 The Philosophy

**The build must be inclusive without breaking the aesthetic.**

**The rule:** Every interactive element is keyboard-accessible. Every image has alt text. The color contrast is sufficient. But **the visual design does not change.**

### 13.2 The Accessibility Features

| Feature | Implementation |
|---|---|
| **Keyboard navigation** | Tab through icons, buttons, menu items. Enter/Space activates. |
| **Alt text** | Every image has descriptive alt text. |
| **Focus indicators** | Dotted border on focused elements (Win98 style). |
| **Screen reader labels** | `aria-label` on every interactive element. |
| **Color contrast** | All text meets WCAG AA (the Win98 palette is high-contrast). |
| **`prefers-reduced-motion`** | Disables animations. See section 5.3. |
| **`prefers-color-scheme`** | Ignored. The build is light. |

### 13.3 The Keyboard Shortcuts

**Already specified in `features.md` section 12.** `Alt+F4`, `Alt+Tab`, `Ctrl+Alt+Del`, `Esc`, `Enter`, `F1`.

**The rule:** Every shortcut works. The keyboard is the primary interface for power users.

### 13.4 The Focus Indicators

**Design:** A 1px dotted black border around the focused element.

```css
*:focus-visible {
  outline: 1px dotted #000000;
  outline-offset: 1px;
}
```

**Rule:** The focus indicator is **always visible** on keyboard focus. It is **not** visible on mouse click. This is the standard Win98 behavior.

### 13.5 The Accessibility Build Notes

- **Do:** Make every element keyboard-accessible.
- **Do:** Add alt text to every image.
- **Do:** Use the dotted focus border.
- **Do:** Respect `prefers-reduced-motion`.
- **Don't:** Add modern accessibility features that change the visual design (no large cursor modes, no high-contrast yellow-on-black).
- **Don't:** Use ARIA in ways that conflict with the native semantics.
- **Priority:** Keyboard navigation > alt text > focus indicators > screen reader labels.

**Estimated: 30 min.**

---

## 14. The Emotional Arc of the UI

### 14.1 The Philosophy

**The interface changes as the player learns.** Not visually — the teal does not change. But the **meaning** of the interface changes.

### 14.2 The Arc

| Act | What the player feels | What the UI does |
|---|---|---|
| **Act 0** | "Nice Windows 98 replica." | Everything looks normal. The café files are warm. |
| **Act 1** | "Wait. What's that in the session log?" | The session log has a row from 1998. The billing timer is large. |
| **Act 2** | "This is a conspiracy." | The backroom exists. `PROJECT_2050.DOC` is there. |
| **Act 3** | "Who is Eipstein?" | The `EIPSTEIN.DOC` reveals the protocol. The fourth wall breaks. |
| **Act 4** | "GTA too?" | The Game Studio. The design doc. The player's childhood. |
| **Act 5** | "This is about me." | `THE_PLAYER.DOC` cannot be closed. The camera saw them. |
| **Act 6** | "Oh no. Bhaiya." | `TECH_GENETICS.DOC`. The photograph. The dog. |
| **Act 7** | "I need to talk to someone." | mIRC. The room. `we know.` |
| **Act 8** | "I was always in the room." | The ending. SEAT_07. The chair. |

### 14.3 The UI Changes

**The UI does not change visually.** But:

- **The session log grows.** Every file the player opens adds a row.
- **The billing timer grows.** Every second the player spends adds to the bill.
- **The `PROPRIETOR` icon appears.** After the print trap.
- **The `mIRC` icon appears.** After the chat logs.
- **The `for_you.txt` file appears.** After the Recycle Bin.
- **The `SEAT_07` cursor scheme becomes available.** After the mouse settings.
- **The `SEATS.BMP` wallpaper becomes available.** After the player looks for it.

**The UI does not tell the player what is happening.** The player figures it out. The machine just keeps running.

### 14.4 The Final Moment

**When the player reaches the ending (SEAT_07):**

1. The desktop fades.
2. A single centered window appears.
3. The window says: `SEAT_07 — ACKNOWLEDGED`.
4. The window lists the player's city.
5. The window says: `The seat is warm.`
6. The window cannot be closed for 20 seconds.
7. The session log adds a row: `SEAT_07 | [city] | ACTIVE | billing: ∞`.
8. The window closes. The desktop returns.
9. The session log row remains.

**The one sentence:** `The seat is warm.` — the machine has been waiting. The chair was always the player's. The game was never about escaping. It was about arriving.

### 14.5 The Emotional Arc Build Notes

- **Do:** Make the session log grow with every file opened.
- **Do:** Make the billing timer tick in real time.
- **Do:** Make the UI change only through **new files** and **new icons**, not through visual redesign.
- **Don't:** Add dramatic music. Add screen flashes. Add jump scares.
- **Don't:** Explain the emotional arc to the player. Let them feel it.
- **Priority:** Session log growth > billing timer > new icons > the ending.

**Estimated: 20 min.**

---

## 15. The Checklist

### 15.1 Before Demo

Every item must be checked.

#### Boot & Startup
- [ ] Boot sequence plays once per session
- [ ] BIOS text is monospace, white on black
- [ ] `03/03/98` appears in BIOS string
- [ ] Windows 98 splash appears
- [ ] `SHREE CYBER ZONE — PC 03 (ADMIN)` appears on splash
- [ ] Startup chime plays (if unmuted)
- [ ] Boot is skippable by click/key
- [ ] Desktop appears instantly after boot

#### Audio
- [ ] Audio is **muted by default**
- [ ] Mute toggle in system tray works
- [ ] Click sound plays on button press
- [ ] Dialog beeps play
- [ ] Startup chime plays if unmuted
- [ ] Dog bark plays on `Run → tommy`
- [ ] All sounds respect mute state
- [ ] Ambient sounds are optional, off by default

#### Wallpaper
- [ ] Default is solid teal `#008080`
- [ ] `SEATS.BMP` is in the wallpaper list (last item)
- [ ] `SEATS.BMP` shows the nine chairs
- [ ] `SEAT_07` label is `MERAZ / OPENLAKE, IIT BHILAI — CANDIDATE PENDING`
- [ ] `SEAT_03` is visibly empty
- [ ] `SEAT_05` is crossed out
- [ ] Wallpaper changes are instant (except SEATS 200ms fade)

#### Cursors
- [ ] Default cursor is Win98 arrow
- [ ] Busy cursor is hourglass
- [ ] Text cursor is I-beam
- [ ] Move cursor on title bars
- [ ] Ghost cursor appears after 60s idle
- [ ] Cursor trails work (if enabled)

#### Motion
- [ ] Windows open instantly
- [ ] Windows close instantly
- [ ] Window drag follows cursor exactly
- [ ] Menus open instantly
- [ ] No fades, slides, or easing anywhere
- [ ] `prefers-reduced-motion` disables animations

#### Colors
- [ ] Teal is `#008080`
- [ ] Window face is `#C0C0C0`
- [ ] Title bar active is `#000080`
- [ ] Bevels are 1px or 2px
- [ ] No gradients, shadows, or transparency
- [ ] `SEAT` scheme exists and reverts after 10s

#### Typography
- [ ] MS Sans Serif (or Tahoma) is loaded
- [ ] 11px body, 11px bold title
- [ ] Anti-aliasing is disabled
- [ ] Notepad uses Fixedsys/Courier
- [ ] BIOS/BSOD use monospace
- [ ] Icon labels have 1px black shadow

#### Resolution
- [ ] Build is designed at 1024×768
- [ ] Build scales to fit viewport
- [ ] Images use `image-rendering: pixelated`
- [ ] Mobile shows "best viewed on desktop" banner

#### First 10 Seconds
- [ ] Boot plays
- [ ] Desktop appears
- [ ] First click opens a window
- [ ] First file is readable in < 2s

#### Idle
- [ ] Billing timer ticks in real time
- [ ] Session log grows on file open
- [ ] Ghost cursor after 60s
- [ ] Screensaver after 3 min
- [ ] Session log appears in screensaver

#### Shutdown
- [ ] "Windows is shutting down..." screen (3s)
- [ ] "It is now safe to turn off your computer." (orange, 10s)
- [ ] Billing timer visible in corner
- [ ] Fade to black
- [ ] Reload returns to desktop
- [ ] Session log records the attempt

#### Accessibility
- [ ] Tab navigation works
- [ ] Alt text on all images
- [ ] Focus indicators visible
- [ ] `aria-label` on interactive elements
- [ ] `prefers-reduced-motion` respected

#### Emotional Arc
- [ ] Session log grows on file open
- [ ] Billing timer ticks
- [ ] `PROPRIETOR` icon appears after print trap
- [ ] `mIRC` icon appears after 4 chat logs
- [ ] `for_you.txt` appears after Recycle Bin empty
- [ ] SEAT_07 ending works
- [ ] Session log shows `SEAT_07 | [city] | ACTIVE | billing: ∞`

---

## 16. The One Rule of This Document

> **The machine is not a website. It is a place.**

A website is something you visit. A place is something you **inhabit.** The teal desktop, the startup chime, the clicking buttons, the growing session log — these are not features. They are the **texture of a place.**

The player who spends 20 minutes on this machine is not browsing. They are **sitting at a desk in a cyber café in Bhilai.** They are reading files someone left behind. They are watching a session that never ended.

**Build the machine as if it has been running since 1998. Because in the story, it has.**

**Build the machine as if the player will forget they are in a browser. Because if you build it right, they will.**

---

## 17. Related Documents

| Document | What it covers |
|---|---|
| `README.md` | Public project overview |
| `story.md` | Full narrative, all endings |
| `easter_eggs.md` | All 61 eggs, prioritized |
| `features.md` | Windows 98 shell spec |
| `applications.md` | App-by-app build specs |
| `websites.md` | IE fake sites content |
| `settings.md` | Control Panel, Display Properties |
| `games.md` | Minesweeper, Solitaire, game studio |
| `docs_and_files.md` | Public PC files content |
| `chats_and_emails.md` | Chat logs, emails, drafts |

---

<div align="center">

**This is the last document.**

**Every spec is locked. Every story is told. Every pixel is specified.**

**The machine is ready.**

**Boot it.**

**Start → Run → `2050`**

</div>

---

**End of `UIUX.md`.**

**End of the specification.**

**The build begins.**