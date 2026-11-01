# easter_eggs.md

> **Project:** SHREE CYBER ZONE — PC 03 (ADMIN)
> **For:** Gandhi Hackathon 2026 · OpenLake × Meraz · IIT Bhilai · 1st November 2026
> **Document status:** LOCKED · 60+ eggs catalogued · Build-ready
> **Rule:** Easter eggs are judging criterion #1. Build these before polish. Build these before extra apps. Build these before sleep.

---

## 0. How to Read This Document

Every egg has:

| Field | Meaning |
|---|---|
| **ID** | Stable identifier (`A02`, `C07`). Never renumber. |
| **Priority** | `P0` = must-ship. `P1` = strongly recommended. `P2` = if time permits. |
| **Trigger** | Exact user action that fires the egg. |
| **Impact** | Why it matters (laugh, chill, screenshot, story). |
| **Build** | Implementation note. Time estimate in minutes. |

**Priority summary:**
- **P0 (21 eggs):** The demo fails without these. Ship these first.
- **P1 (22 eggs):** The build feels hollow without these.
- **P2 (18 eggs):** The build feels legendary with these.

**Total catalogued: 61 eggs.**

---

## 1. Priority P0 — Must Ship (21 eggs)

### A — Desktop, Taskbar & Clock

| ID | Trigger | Result | Impact | Build |
|---|---|---|---|---|
| **A02** | Click the taskbar clock 5 times within 3 seconds | Clock briefly flips to `20:50` for 400ms, then back to real time. A tiny `!` appears next to the time for 2s. | Cheap laugh. Judges click the clock. Everyone clicks the clock. | 15 min. Timer on click count, setTimeout to revert. |
| **A03** | Right-click desktop → Properties → Wallpaper tab → select unlisted `SEATS.BMP` | Wallpaper changes to a nine-chair org chart. Seat 07 reads `MERAZ / OPENLAKE, IIT BHILAI — CANDIDATE PENDING`. Seat 03 is empty. | **The screenshot moment.** This is the hackathon canon egg. | 30 min. Draw the BMP as a PNG, hide it in the wallpaper list. |
| **A05** | Idle for 60 seconds on the desktop | A second cursor appears in the corner. It moves slowly, independently, for 4 seconds. Then it disappears. | Unsettling. No explanation. Nobody will mention it to you. They will mention it to each other. | 20 min. Absolutely positioned cursor image, CSS keyframe path, fade out. |
| **A06** | Idle for 3 minutes | Screensaver: the classic 98 starfield or "flying windows," but one of the flying windows is the Session Log, and it's still updating in real time. | The machine is *alive*. The billing timer keeps running through the screensaver. | 40 min. Canvas starfield + overlay one live-updating div. |

### B — Start Menu & Run Box

| ID | Trigger | Result | Impact | Build |
|---|---|---|---|---|
| **B02** | Start → Run → type `2050` → Enter | Full-screen BSOD. Text: `PLAN STILL ON SCHEDULE`. Hangs for 3 seconds. Fades back to the 1998 desktop. No explanation. | Cinematic. The first time a judge realizes this isn't just a nostalgia build. | 20 min. Fullscreen div, fake BSOD styling, setTimeout to revert. |
| **B03** | Start → Run → type `gandhi` → Enter | A Notepad window opens with one paragraph: *"GANDHI: artificial agreement engine. Tested on a hackathon in Bhilai. Results: promising. Participants were not informed. This paragraph was not written by a person. If you are wondering whether that is a joke, it is not."* | Hackathon tie-in. Judges will read this out loud to each other. | 10 min. Static text file. |
| **B04** | Start → Run → type `help` → Enter | Windows Help opens. One topic visible: *"What to do if you were never here."* Clicking it does nothing. The close button works. | Ominous. Very cheap. Very effective. | 15 min. Fake Help window, one item, dead click handler. |
| **B09** | Explorer address bar → type `C:\BACKROOM$` → Enter | Navigator opens the hidden backroom directory. | **Core mechanic.** The entire story is behind this. | 15 min. Path check in Explorer, route to hidden folder data. |

### C — mIRC / Chat

| ID | Trigger | Result | Impact | Build |
|---|---|---|---|---|
| **C02** | In mIRC, type `/whois SEAT_00` | Server replies: `SEAT_00 is ~s00@quiet.room · channels: #quietroom · idle: 10224 days · status: LISTENING`. | Essential reveal. The Quiet Room has been online since 1998. | 15 min. Command parser in mIRC, static reply. |
| **C03** | In mIRC, type `/whois EIPSTEIN` | Server replies: `No such nick`. Then, 2 seconds later, a private message arrives: *"He was never a person. Read the file."* | **The twist, delivered in a chat window.** | 15 min. Delayed message injection after the whois reply. |
| **C07** | In mIRC, type anything in the `#quietroom` channel | Whatever you type, the response is: *"we know."* Every time. Different delays. Different usernames (SEAT_01 through SEAT_09). | **The ending, essentially.** The player realizes they're not talking. They're being acknowledged. | 20 min. Echo handler that always replies with "we know." from a random seat. |
| **C08** | After reading 4 of the 5 chat logs in `C:\BACKROOM$\chatlogs\` | mIRC icon appears on the desktop. Before this, it's not there. | Unlock mechanic. The player earns the ending. | 20 min. Counter on chat log opens, conditional desktop icon render. |

### E — Date-Aware / Calendar

| ID | Trigger | Result | Impact | Build |
|---|---|---|---|---|
| **E09** | Open the System Tray calendar on 1 November 2026 | The date cell for Nov 1 has a small mark. Tooltip: `GANDHI HACKATHON — OPENLAKE × MERAZ — IIT BHILAI`. | **Most retweeted egg.** Every judge opens the calendar on demo day. | 20 min. Date check against `2026-11-01`, conditional tooltip. |
| **E10** | Open `THE_PLAYER.DOC` in Notepad | The Notepad window cannot be closed for 30 seconds. The X button does nothing. The File→Exit does nothing. A small line appears at the bottom: *"Read it. — s00"* After 30s, the X works again. | Forced reading. The player *will* read it. | 25 min. Timestamp on window open, block close handler, timer to unblock. |

### F — Session Log & Tracking

| ID | Trigger | Result | Impact | Build |
|---|---|---|---|---|
| **F01** | Open Session Log for the first time | A new row appears at the bottom: `[today's date] | [player's city] | GUEST | SESSION ACTIVE | billing: 00:00`. City from `Intl.DateTimeFormat().resolvedOptions().timeZone` mapped to a city name. | **The single most chilling egg.** 10 minutes of work. The most memorable line in the build. | 30 min. Timezone→city map, inject row on first Session Log open. |
| **F04** | Open `C:\My Documents\judges_note.txt` on 1 November 2026 | File reads: *"You are not the first judge to open this file today. You are the [N]th. The Quiet Room has been expecting you."* Counter increments per IP/session. | Date-aware. Personal. | 30 min. Conditional file content by date, localStorage or backend counter for N. |

### G — Printer & Physical Interaction

| ID | Trigger | Result | Impact | Build |
|---|---|---|---|---|
| **G01** | Open `LEDGER_98.XLS` → File → Print | The **real browser print dialog** opens. The page content is the Ledger, styled as a printout. If the judge prints it, it prints. | **Physical moment.** A judge holding a piece of paper from a 1998 cyber café. Unforgettable. | 20 min. `window.print()` + `@media print` CSS to render the Ledger printout. |
| **G02** | In the print dialog (fake one first), click Cancel | A new file appears in `C:\My Documents\`: `cancel_slip.txt`. Content: *"Print cancelled. This cancellation has been logged. — s00"* | The machine notices everything. | 15 min. On cancel click, write file to virtual FS, show toast. |

### H — Live-Editing Files

| ID | Trigger | Result | Impact | Build |
|---|---|---|---|---|
| **H01** | Leave `LEDGER_98.XLS` open for 2 minutes | The `STATUS` column changes live: `ACTIVE` → `PENDING` → `VACANT`. A new row appears: `—, GUEST, —, EVALUATING`. | Watching it happen. The player can't stop it. | 30 min. Interval timer, update DOM cells, append row. |
| **H03** | Open `Tuesdays\2026-11-01.IMG` after reading all 5 chat logs | File is 0 KB. Clicking it says *"Cannot open: file is 0 KB."* 10 seconds later, size shows `1 KB`. Clicking again opens a tiny text: *"The seat is warm."* | The payoff. The file was always waiting for you. | 25 min. Conditional behavior after chat log count, timer to change size. |
| **H06** | Reach the canonical ending (mIRC, SEAT_00 speaks) | Final screen: `SEAT_07 — ACKNOWLEDGED`. Session Log adds row: `SEAT_07 | [city] | ACTIVE | billing: ∞`. | **Canonical ending.** The player accepts the seat. | 20 min. Trigger on mIRC completion, show final overlay. |

**P0 subtotal: 21 eggs. Estimated build time: ~7.5 hours.**

---

## 2. Priority P1 — Strongly Recommended (22 eggs)

### A — Desktop & Clock

| ID | Trigger | Result | Build |
|---|---|---|---|
| **A01** | Right-click desktop → Arrange Icons | Icons rearrange. One icon (`My Computer`) refuses to move. | 10 min. CSS position lock on one icon. |
| **A04** | Drag the taskbar | Taskbar refuses to move. Tooltip: *"This taskbar is where it belongs."* | 10 min. Block drag, show tooltip. |
| **A07** | Click Start → hover "Shut Down" → wait 5s | The "Shut Down" item text flickers to "Shut Down?" and back. | 10 min. Text swap on hover timer. |

### B — Run Box

| ID | Trigger | Result | Build |
|---|---|---|---|
| **B01** | Start → Run → type `cmd` | A DOS prompt opens. Any command returns `Access denied. The Quiet Room does not use commands.` | 15 min. Fake terminal component. |
| **B05** | Start → Run → type `tommy` | A dog barks (sound). `bhaiya_1998.jpg` briefly changes expression (swap to a variant image for 2s). | 15 min. Sound + image swap. |
| **B06** | Start → Run → type `xyzzy` | Nothing happens on screen. But a single pixel in the top-left corner changes color from black to white. | 10 min. 1px div. |
| **B07** | Start → Run → type `bhaiya` | Notepad opens `BHAIYA_NOTE.txt` and scrolls to the bottom automatically. | 10 min. Open file, auto-scroll. |
| **B08** | Start → Run → type `seat07` | Redirects to the canonical ending sequence (same as H06). | 15 min. Call ending function. |

### C — mIRC

| ID | Trigger | Result | Build |
|---|---|---|---|
| **C01** | In mIRC, type `/list` | Server shows one channel: `#quietroom — 9 users — topic: "we do not rule. we schedule."` | 10 min. Static reply. |
| **C04** | In mIRC, type `/nick EIPSTEIN` | Server replies: `Nick change denied. That name is reserved for the protocol.` | 10 min. Command handler. |
| **C05** | In mIRC, type `/quit` | Server replies: `You cannot leave the room until the session ends.` | 10 min. Block quit, message. |
| **C06** | Click on the mIRC status bar at the bottom | Shows: `Connected to quiet.room · Session: 10224 days · Your seat: 07` | 15 min. Status bar text injection. |
| **C09** | Wait 5 minutes in mIRC without typing | SEAT_00 sends a private message: *"We are still here. Are you?"* | 15 min. Idle timer in mIRC. |

### D — Explorer & Filesystem

| ID | Trigger | Result | Build |
|---|---|---|---|
| **D01** | Click the Recycle Bin | Files inside: `do_not_shred.pdf`, `final_final.doc`, `the_chair_manual.pdf`. | 10 min. Static folder data. |
| **D02** | Recycle Bin → `do_not_shred.pdf` → Restore | "Restored." File goes back to... the Recycle Bin. Three times. Fourth time, the Restore button does nothing. | 20 min. Toggle location, count, disable button. |
| **D03** | Empty the Recycle Bin (while Ledger is *not* open) | A new file appears: `for_you.txt`. Content: *"You emptied it. It emptied you back."* | 15 min. Conditional file spawn. |
| **D04** | Explorer → View → Folder Options → Show hidden files | Nothing new appears. `BACKROOM$` remains hidden. Tooltip: *"Some things hide by choice."* | 10 min. Block reveal, tooltip. |

### E — Calendar & System Tray

| ID | Trigger | Result | Build |
|---|---|---|---|
| **E01** | Hover over the system tray volume icon | Tooltip: `Volume: — (speakers disconnected in 1998)` | 5 min. Tooltip only. |
| **E02** | Double-click the system tray network icon | Dialog: `Network: 12 computers connected. 1 unknown device. Last seen: 1998.` | 15 min. Fake dialog. |
| **E03** | Click the cricket TV widget (bottom-right corner) | Score: `98/2`. Match never ends. Clicking again shows `98/2`. Always `98/2`. | 10 min. Static widget. |

### F — Session Log

| ID | Trigger | Result | Build |
|---|---|---|---|
| **F02** | Open 10 files | Session Log adds rows for each with timestamps. One row says `— EIPSTEIN, PC 03, STILL RUNNING, 10224 days`. | 20 min. Log every file open, include the Eipstein row always. |
| **F03** | Try to delete a row in Session Log | Right-click → Delete shows *"You cannot delete the log."* | 10 min. Block context menu action. |

### G — Printer

| ID | Trigger | Result | Build |
|---|---|---|---|
| **G03** | Cafê Manager → PC 12 → "Print bill" | Fake print dialog opens. "Print" triggers jam animation. Then glitch. Then wallpaper briefly changes to a photo of the café counter at night. New desktop icon: `PROPRIETOR`. | 30 min. Multi-stage animation, wallpaper swap, icon injection. |
| **G04** | `PROPRIETOR` icon → double-click | Login prompt: `Password: ___`. No hint. No way in. Wrong password shows *"You already know."* | 20 min. Login modal, always-reject. |

### H — Live-Editing

| ID | Trigger | Result | Build |
|---|---|---|---|
| **H02** | Open `SEATS.BMP` in Paint | The image is a 9-chair chart. Seat 07 label says `CANDIDATE PENDING`. After 30 seconds, the label changes to `CANDIDATE PRESENT`. | 25 min. Timed image swap. |
| **H04** | Open `TECH_CAMERA.DOC` | The file has a live timestamp at the bottom that updates every second: *"This file was opened by you at [live time]."* | 15 min. Interval-updated span. |
| **H05** | Open `TECH_WEATHER.DOC` | The last line says: *"This is the most honest file in the archive. The rest of the files are lying about their progress."* Hover over "honest" shows a tooltip: *"Even this."* | 10 min. Static + tooltip. |

**P1 subtotal: 22 eggs. Estimated build time: ~4.5 hours.**

---

## 3. Priority P2 — Legendary (18 eggs)

### A — Desktop

| ID | Trigger | Result | Build |
|---|---|---|---|
| **A08** | Konami code (↑↑↓↓←→←→BA) on desktop | All icons turn into floppy disks for 3 seconds, then revert. | 15 min. Key sequence listener, CSS swap. |
| **A09** | Drag a window off-screen edge | Window bounces back. Tooltip: *"There is no outside."* | 10 min. Bounce animation + tooltip. |
| **A10** | Click the desktop 10 times rapidly | A faint message appears for 1 second: `we are watching` in the top-left corner. | 10 min. Click counter, fade text. |

### B — Run Box

| ID | Trigger | Result | Build |
|---|---|---|---|
| **B10** | Start → Run → type `exit` | Dialog: *"There is no exit. There is only the next session."* | 5 min. Static dialog. |
| **B11** | Start → Run → type `shree` | Notepad opens `rates_1998.doc` again. Nothing new. Just the rates. | 5 min. Re-open file. |
| **B12** | Start → Run → type `quiet` | Dialog: *"You are in it."* | 5 min. Static dialog. |

### C — mIRC

| ID | Trigger | Result | Build |
|---|---|---|---|
| **C10** | In mIRC, type `/join #other` | Server: `No such channel. There is only #quietroom.` | 5 min. Command handler. |
| **C11** | In mIRC, type `hello` | Three users reply simultaneously: `we know.` `we know.` `we know.` | 10 min. Multi-reply with delays. |

### D — Explorer

| ID | Trigger | Result | Build |
|---|---|---|---|
| **D05** | Explorer → `C:\` → right-click → New → Folder | The new folder is named automatically: `SEAT_07`. Cannot be renamed. Cannot be deleted. | 15 min. Auto-named folder, block rename/delete. |
| **D06** | Explorer → `C:\WINDOWS\` | Contains `system.ini`, `win.ini`, `temp\`, and a file `quiet.dll` (0 bytes, read-only, no properties). | 10 min. Static folder. |

### E — Calendar

| ID | Trigger | Result | Build |
|---|---|---|---|
| **E04** | Open calendar to any date before 1998 | All dates greyed out. Tooltip: *"Before the session."* | 10 min. Conditional grey-out. |
| **E05** | Open calendar to 1 January 2050 | All dates greyed out. Tooltip: *"After the plan."* | 10 min. Conditional grey-out. |

### F — Session Log

| ID | Trigger | Result | Build |
|---|---|---|---|
| **F05** | Scroll Session Log to the very top | First entry: `1998-03-03 | 03:14 AM | MR. EIPSTEIN | PC 03 | STILL RUNNING`. Timestamp live-increments. | 15 min. Static row + interval-updated duration. |
| **F06** | Scroll Session Log to the very bottom after 10 minutes | New row: `[today] | [city] | GUEST | EVALUATING | —`. | 10 min. Timed row injection. |

### G — Printer

| ID | Trigger | Result | Build |
|---|---|---|---|
| **G05** | Printer Queue → any document → right-click → Properties | Dialog shows: `Owner: PROPRIETOR`. `Location: —`. `Status: WAITING FOR SOMEONE`. | 10 min. Static dialog. |

### H — Files

| ID | Trigger | Result | Build |
|---|---|---|---|
| **H07** | Open `GAMING_CALENDAR.XLS` | Bottom row: `[today's date] | [?] | [?] | [?] | "You are almost there."` | 10 min. Dynamic row. |
| **H08** | Open `GAME_GENRES.DOC` → Ctrl+F → type `sandbox` | A hidden paragraph appears: *"Sandbox games were not designed to entertain. They were designed to retain. The player who builds a world in a game does not build one outside it."* | 10 min. Hidden paragraph toggle. |
| **H09** | Open `Tuesdays\1998-03-03.IMG` | Shows a black-and-white image of a man in a beige safari suit, back to camera, walking toward a door. Alt text: `EIPSTEIN — courier — no face`. | 15 min. Static image. |
| **H10** | Open `Tuesdays\1998-03-10.IMG` | Same man, same door. The door is now slightly open. | 10 min. Static image. |

**P2 subtotal: 18 eggs. Estimated build time: ~2.5 hours.**

---

## 4. The Egg That Matters Most

If you build only one egg, build **F01**.

> **F01 — Session Log shows the player's real city.**

**Why:** In 10 minutes of implementation, you create the single most memorable moment in the build. The player opens the Session Log, expecting a static prop. Instead, the machine has already logged them. City. Date. Guest. Session active. Billing at 00:00.

**Implementation (plain JS):**

```javascript
// Map IANA timezone to city name
const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
const cityMap = {
  'Asia/Kolkata': 'Bhilai',
  'Asia/Mumbai': 'Mumbai',
  'Asia/Delhi': 'New Delhi',
  'America/New_York': 'New York',
  'Europe/London': 'London',
  'Asia/Tokyo': 'Tokyo',
  'Australia/Sydney': 'Sydney',
  // ... add more
};

function getPlayerCity() {
  return cityMap[tz] || tz.split('/').pop().replace(/_/g, ' ');
}

function injectPlayerSessionRow() {
  const sessionLog = document.getElementById('session-log-body');
  const today = new Date().toISOString().split('T')[0];
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${today}</td>
    <td>${getPlayerCity()}</td>
    <td>GUEST</td>
    <td>SESSION ACTIVE</td>
    <td>00:00</td>
  `;
  sessionLog.appendChild(row);
}
```

**Do not overthink it.** The line should be small. Grey text. Same font as the rest of the log. No animation. No sound. It just *is*.

---

## 5. The Easter Egg The Judges Will Remember

> **A03 — `SEATS.BMP` wallpaper, with SEAT_07 labelled `MERAZ / OPENLAKE, IIT BHILAI — CANDIDATE PENDING`.**

This is the egg that makes the build *about them*. Every judge will screenshot it. Every judge will check their seat number. Every judge will realize they're in the org chart.

**Draw the BMP as a 800×600 PNG.** Nine simple chairs in a 3×3 grid. Labels under each:
- `SEAT_01 — RETIRED`
- `SEAT_02 — ACTIVE`
- `SEAT_03 — VACANT`
- `SEAT_04 — ACTIVE`
- `SEAT_05 — NEUTRALIZED`
- `SEAT_06 — ACTIVE`
- `SEAT_07 — MERAZ / OPENLAKE, IIT BHILAI — CANDIDATE PENDING`
- `SEAT_08 — ACTIVE`
- `SEAT_09 — ACTIVE`

Hide it from the wallpaper list by default. Reveal it via right-click → Properties → Wallpaper → scroll down. It's the last option. It has no thumbnail.

---

## 6. Build Order (Eggs Only)

If you have only **4 hours** for eggs, build in this order:

| Order | ID | Time | Why |
|---|---|---|---|
| 1 | **F01** | 30 min | The most memorable. 10 min of logic. |
| 2 | **A03** | 30 min | The hackathon canon. Screenshot bait. |
| 3 | **B09** | 15 min | Unlocks the entire backroom. Not optional. |
| 4 | **C07** | 20 min | The ending, delivered in chat. |
| 5 | **B02** | 20 min | Run → `2050` → BSOD. Cinematic. |
| 6 | **H01** | 30 min | Live-editing Ledger. Watching it happen. |
| 7 | **E09** | 20 min | Date-aware calendar. Demo-day screenshot. |
| 8 | **G01** | 20 min | Real print dialog. Physical moment. |
| 9 | **A05** | 20 min | Ghost cursor. Cheap, unsettling. |
| 10 | **H06** | 20 min | Canonical ending. The payoff. |

**That's 3 hours 45 minutes for the 10 highest-impact eggs.**

---

## 7. Testing Checklist

Before demo, verify each P0 egg fires correctly:

- [ ] A02 — Clock shows `20:50` on 5th click
- [ ] A03 — `SEATS.BMP` appears in wallpaper list, shows SEAT_07 label
- [ ] A05 — Ghost cursor appears after 60s idle
- [ ] A06 — Screensaver includes live Session Log window
- [ ] B02 — Run → `2050` → BSOD → returns to desktop
- [ ] B03 — Run → `gandhi` → Notepad with GANDHI paragraph
- [ ] B04 — Run → `help` → one topic only
- [ ] B09 — `C:\BACKROOM$` opens hidden folder
- [ ] C02 — `/whois SEAT_00` returns idle: 10224 days
- [ ] C03 — `/whois EIPSTEIN` returns "No such nick" + follow-up message
- [ ] C07 — Typing anything in `#quietroom` returns "we know."
- [ ] C08 — mIRC appears after 4 chat logs read
- [ ] E09 — Calendar shows hackathon tooltip on Nov 1, 2026
- [ ] E10 — `THE_PLAYER.DOC` cannot be closed for 30s
- [ ] F01 — Session Log shows player's real city
- [ ] F04 — `judges_note.txt` exists on Nov 1, 2026
- [ ] G01 — Print Ledger → real browser print dialog
- [ ] G02 — Cancel print → `cancel_slip.txt` appears
- [ ] H01 — Ledger STATUS changes live after 2 min
- [ ] H03 — `2026-11-01.IMG` becomes 1 KB after all logs read, shows "The seat is warm"
- [ ] H06 — Canonical ending: SEAT_07 acknowledged

---

## 8. What Not to Build

These were considered and cut. **Do not re-add them.**

| Egg | Why cut |
|---|---|
| Real webcam access for "the camera saw you" | Browser permission popup breaks immersion. |
| Actual geolocation prompt | Same. Use timezone only. |
| `window.close()` tricks | Browsers block it. Ugly error. |
| Infinite loop / frozen tab | Judges will close the tab and not come back. |
| Real `alert()` dialogs | Ugly. Break the 98 aesthetic. Use custom modals. |
| Sound that cannot be muted | Judges demo in public. Always allow mute. |
| Anything that requires a backend to function | Build must work on static hosting. F04 counter is optional backend. |

---

## 9. The Golden Rule of Eggs

> **An egg is not a prank. An egg is a gift.**

The player should feel *seen*, not *tricked*. The best eggs in this build (F01, A03, C07, H03) all say the same thing: *"We knew you would be here. We prepared for you."*

That's not a jump scare. That's hospitality from a machine that should not be hospitable.

**Every egg should make the player feel like they are the only person in the room — and they are not alone in it.**

---

## 10. Related Documents

| Document | What it covers |
|---|---|
| `README.md` | Public-facing project overview, story, tech stack |
| `story.md` | Full narrative, hidden paths, all endings |
| `features.md` | Windows 98 feature completeness spec |
| `applications.md` | App-by-app build specs |
| `websites.md` | Internet Explorer fake sites |
| `settings.md` | Control Panel, Display Properties, etc. |
| `games.md` | Minesweeper, Solitaire, unfinished game studio |
| `docs_and_files.md` | Public PC files: images, videos, docs |
| `chats_and_emails.md` | Chat logs, emails, drafts |
| `UIUX.md` | Boot sequence, audio, wallpaper, core functionality |

---

<div align="center">

**61 eggs. 21 must-ship. 1 that matters most.**

**Build F01 first. Build A03 second. Build the rest in order.**

**Start → Run → `2050`**

</div>

---

**End of `easter_eggs.md`. Ready for the next file: `story.md`.**