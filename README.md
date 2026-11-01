<div align="center">

# 🖥️ SHREE CYBER ZONE — PC 03 (ADMIN)

### A Windows 98 cyber café admin terminal from Bhilai, 1998.
### Someone never logged out.

[![Live Demo](https://img.shields.io/badge/demo-LIVE-brightgreen?style=for-the-badge)](https://your-live-url.vercel.app)
[![GitHub](https://img.shields.io/badge/source-GitHub-black?style=for-the-badge&logo=github)](https://github.com/your-username/your-repo)
[![Made for Gandhi Hackathon](https://img.shields.io/badge/Gandhi%20Hackathon-2026-orange?style=for-the-badge)](https://github.com/OpenLake)
[![Windows 98](https://img.shields.io/badge/Windows-98-blue?style=for-the-badge)](https://en.wikipedia.org/wiki/Windows_98)

</div>

---

## 📖 Table of Contents

- [What Is This?](#-what-is-this)
- [The Story](#-the-story-spoiler-warning)
- [The Twist](#-the-twist--do-not-read-if-you-want-to-figure-it-out)
- [Story Bible & Characters](#-story-bible--characters)
- [Features](#-features)
- [How to Explore](#-how-to-explore)
- [File System Map](#-file-system-map)
- [Apps Included](#-apps-included)
- [Easter Eggs](#-easter-eggs)
- [Endings](#-endings)
- [Visual Authenticity Checklist](#-visual-authenticity-checklist)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Build Roadmap](#-build-roadmap)
- [Design Language](#-design-language)
- [Judge Demo Script](#-judge-demo-script-90-seconds)
- [Submission Checklist](#-submission-checklist)
- [Credits](#-credits)
- [License](#-license)
- [A Note on Content](#️-a-note-on-content)

---

## 🎯 What Is This?

**SHREE CYBER ZONE — PC 03 (ADMIN)** is a fully interactive Windows 98 replica that reconstructs the admin computer of a small cyber café in Bhilai, India, circa 1998.

On the surface, it is a nostalgic, warm, boring machine. ₹10/hour. ₹2/page printing. A dog named Tommy in the My Documents folder. A complaint letter about the AC. A tube TV playing a cricket match that never ends.

Beneath the surface, the machine is the terminal of a shadow committee called **THE QUIET ROOM** — a committee that planned, among other things: flying cars, an AI codename **GANDHI**, one specific war, and who would run the world by 2050.

> **The catch:** the previous session never ended. The billing timer for PC 03 has been running since 1998. And in the session log, there is already an entry for today — under your name.

This project was built for the **Gandhi Hackathon** by **OpenLake × Meraz**, **IIT Bhilai**, **1st November 2026**.

---

## 🕵️ The Story (Spoiler Warning)

> Skip to [Features](#-features) if you want to explore blind.

### The Surface

**SHREE CYBER ZONE**, Nehru Nagar, Bhilai. Twelve PCs. One admin machine behind the counter. A wooden partition. A tube TV. A broken chair nobody throws away. A rate card taped to the wall.

The player lands on a desktop that is deliberately *boring*. Nothing creepy. Nothing suspicious. The first thing that should go through a judge's mind is *"nice Windows 98 replica."*

The first weird signal is a single row in the Session Log: a session on `PC 03` dated 1998, customer `MR. EIPSTEIN`, duration `STILL RUNNING`.

### The Project

**PROJECT 2050** — a four-phase master plan to decide how the world would look and who would run it.

An excerpt from `PROJECT_2050.DOC`:

```text
PHASE I — CONVENIENCE. Give them the machines.
PHASE II — DEPENDENCE. Remove the ability to do it themselves.
PHASE III — SURVEILLANCE. Make them buy the cameras. Call it a feature.
PHASE IV — SUCCESSION. Select who runs the world in 2050.

DELIVERABLES:
Flying cars      DELAYED (1998 → 2020 → 2050 → 2075)
The AI           (codename GANDHI) IN PROGRESS
One (1) war      CONTAINMENT EVENT #4 — successful, expensive
Weather control  PARTIAL. We can only make it rain on one cricket
                 match. It was enough.

SELECTION CRITERIA FOR WORLD LEADERS (2050):
Must own a yacht. Must say "synergy" without flinching. Must never
have read a book past chapter three. Must be replaceable.
```

---

## 🎭 The Twist — Do Not Read If You Want to Figure It Out

> Still here? Fine.

**EIPSTEIN is not a person. It is the protocol.**

`EIPSTEIN.DOC` is not a dossier — it is an eight-step operating manual:

| Letter | Meaning |
|---|---|
| **E** | Extraction |
| **I** | Influence |
| **P** | Persistence |
| **S** | Surveillance |
| **T** | Takedown |
| **E** | Extortion |
| **I** | Infiltration |
| **N** | Neutralization |

Eight steps. One page each. There was never a mastermind — only a procedure. The Proprietor is the person who runs the procedure.

The final page of the manual — **N: Neutralization** — has one line:

> *"Applicable to anyone who reads this page."*

Then, faintly, the cyber café's front-door bell rings. A new session starts on PC 03. The billing timer starts counting **up from 0**. Logged in as: `GUEST`.

---

## 🧬 Story Bible & Characters

### The Surface

| Name | Role |
|---|---|
| **Bhaiya** | The owner. He appears in the 1998 shop-opening photo and the 2026 photo. He looks exactly the same. |
| **MR. EIPSTEIN** | A man in a beige safari suit who books PC 03 every Tuesday, 6 hours, cash, leaves a floppy behind. |
| **THE PROPRIETOR** | Never seen. Never named. Only a login prompt and a signature on documents. |
| **THE QUIET ROOM** | No logo, no building. Nine seats. Members referred to only by number: `SEAT 01` through `SEAT 09`. |
| **Tommy** | The dog. He is a password hint. |

### The Organigram

- **THE QUIET ROOM** — no logo, no letterhead. Just a ledger and a schedule.
- **THE PROPRIETOR** — the person who runs the protocol. Never seen.
- **MR. EIPSTEIN** — a *courier* who took the name of the protocol he serves, because the protocol requires it.
- **BHAIYA** — the local front. Runs the café. Signs for deliveries. Doesn't ask questions.

### The Rule of the Project

> The player assumes Mr. Eipstein is the big boss for the first half of the game. He isn't. The reveal that *EIPSTEIN is a protocol* is the entire emotional engine of the build.

---

## ✨ Features

### 🖥️ Full Windows 98 Desktop Environment

- Window manager with drag, resize, focus, minimize, maximize, close
- Beveled window chrome, navy title bars, grey `#C0C0C0` buttons
- Working Start menu with Programs, Favorites, Documents, Settings, Find, Help, Run, Log Off, Shut Down
- Taskbar with Start button, open-window buttons, and a live clock
- Classic `MS Sans Serif` 11px font throughout
- Pixelated cursor and hourglass
- Boot sequence (optional, ~4 seconds) before desktop appears

### 📁 Interactive Explorer

- Browse drives and folders
- Enter hidden paths via the address bar (`C:\BACKROOM$`)
- File icons with proper 98-era pixel art
- Recycle Bin that "restores" files… badly

### 🛠️ Working Applications

- **Notepad** — opens every `.txt` and `.doc` in the system
- **Paint** — opens scanned images and the sticky-note password hint
- **Explorer** — navigable file system with hidden directories
- **Internet Explorer** — fake 1998 intranet homepage + one hidden "dark" page
- **Café Manager 98** — 12 PC tiles with live session status and billing counters
- **Session Log** — grows in real time as you explore the filesystem
- **Printer Queue** — the trap. Don't click print.
- **Fake Spreadsheet** — renders `LEDGER_98.XLS`
- **Minesweeper** — with the `xyzzy` cheat
- **Solitaire** — comedy break, intact
- **Media Player** — plays "recorded calls" as waveforms + captions
- **BSOD** — the real thing

### 🔍 Discovery Mechanics

- Hidden folders require typing a path (no GUI reveal — authentic to 98-era power users)
- Session log records every file you open, timestamped, labeled `GUEST`
- Billing timer uses real seconds of your visit
- Nothing is explained by a narrator. Every reveal is a file you opened.

---

## 🖱️ How to Explore

1. **Start boring.** Read `rates_1998.doc`. Look at `tommy.jpg`. Open the complaint letter.
2. **Find the sticky note.** It's in Paint. It says the PC 03 password.
3. **Open the Session Log.** Notice the entry from 03:14 AM, 1998, customer `MR. EIPSTEIN`, duration `STILL RUNNING`.
4. **Navigate to `C:\BACKROOM$`** by typing the path in the Explorer address bar.
5. **Read everything.** `PROJECT_2050.DOC` first. Then `LEDGER_98.XLS`. Then `EIPSTEIN.DOC`.
6. **Try Start → Run.** There are secrets hidden in the Run box.
7. **Try shutting down.** See what happens.

> **Tip:** The deepest secrets require you to type things, not click things.

---

## 🗺️ File System Map

```text
Desktop
├── My Computer
├── Café Manager 98
├── Session Log
├── Printer Queue
├── Recycle Bin → do_not_shred.pdf, final_final.doc, a floppy icon
├── Internet Explorer
├── Notepad
├── Paint
├── My Documents
│   ├── rates_1998.doc          ("₹10/hr. Night ₹15. Student discount ₹8.")
│   ├── rules_cardboard.bmp     (handwritten sign, scanned)
│   ├── tommy.jpg               (the dog — password hint)
│   ├── complaint_letter.txt    ("the AC was not working and also the mouse")
│   └── bhaiya_1998.jpg
└── (hidden) BACKROOM$
    ├── LEDGER_98.XLS
    ├── PROJECT_2050.DOC
    ├── EIPSTEIN.DOC
    ├── SEATS.BMP
    └── Tuesdays
        ├── 1998-03-03.IMG
        ├── 1998-03-10.IMG
        └── 2026-11-01.IMG      ← today's date. Empty. 0 KB.
```

That last file — **today's date, 0 KB** — is present from the very first minute of the game. Nobody will notice it on their first pass. Everyone will notice it on their second.

---

## 📦 Apps Included

| Priority | App | Notes |
|---|---|---|
| **P0** | Window manager | Drag, focus, minimize, maximize, close. Beveled chrome. |
| **P0** | Start menu + taskbar + clock | Programs → Accessories, Games, Settings, Find, Run, Shut Down. |
| **P0** | Explorer | Drives, folders, address bar, hidden-folder path entry. |
| **P0** | Notepad | Opens all `.txt` / `.doc` lore. 80% of content lives here. |
| **P1** | Café Manager 98 | 12 PC tiles, green/red status, start/stop session, live billing. |
| **P1** | Session Log | Scrollable list. Grows in real time. Main storytelling device. |
| **P1** | Internet Explorer | Fake intranet homepage + one "dark" page from the backroom. |
| **P1** | Fake Spreadsheet | Renders `LEDGER_98.XLS`. Rows, columns, red text. No formulas needed. |
| **P2** | Minesweeper / Solitaire | Comedy break. `xyzzy` cheat = easter egg. |
| **P2** | Paint | Half-finished logo + sticky-note password. |
| **P2** | Media Player | Fake waveform + captions for "recorded calls." |
| **P2** | Print dialog | The trap. Jam animation, glitch, wallpaper change. |
| **P3** | BSOD / Shutdown screens | Pure polish, huge payoff for judges. |

---

## 🥚 Easter Eggs

Criterion #1 in the hackathon rubric is **"make the judges laugh."** Overbuild this section.

| # | Trigger | Result |
|---|---|---|
| 1 | Type `xyzzy` in Minesweeper | One pixel in the top-left of the screen changes color |
| 2 | Click the taskbar clock 5× | It briefly shows `2050` |
| 3 | Right-click → Properties → Wallpaper | Unlisted option `SEATS.BMP` — nine-seat org chart, one empty chair |
| 4 | Start → Run → `tommy` | A dog barks; Bhaiya's photo changes expression |
| 5 | Start → Run → `2050` | Future boot + BSOD reading `PLAN STILL ON SCHEDULE` |
| 6 | Start → Run → `gandhi` | GANDHI project opens: *"Tested on a hackathon in Bhilai. Results: promising. Participants were not informed."* |
| 7 | Open `Tuesdays\2026-11-01.IMG` | "Cannot open: file is 0 KB." Wait 10 seconds. It becomes `1 KB`. You can't re-open it. |
| 8 | Click the cricket TV widget | Score is `98/2`. It never changes. |
| 9 | Recycle Bin → `do_not_shred.pdf` → Restore | "Restored." It's back in the Bin. Three times. Then it stops saying anything. |
| 10 | Café Manager → PC 03 → End Session | Password prompt you don't have. The billing number is enormous and still ticking. |
| 11 | Start → Run → `help` | Windows Help opens, one topic: "What to do if you were never here." |
| 12 | Konami code on desktop | All icons turn into floppy disks for 3 seconds |
| 13 | **Café Manager → PC 12 → "Print bill"** | Print dialog opens. Printing triggers jam → glitch → wallpaper briefly changes to a photo of the café counter at night → new desktop icon appears: `PROPRIETOR` |
| 14 | **Open `LEDGER_98.XLS` → print** | Same trap as above, but faster |
| 15 | **Empty the Recycle Bin while Ledger is open** | Ending #3 (see below) |

### 🎯 The Best Easter Egg — The Hackathon Canon

Inside `PROJECT_2050.DOC`, under **PHASE III — SURVEILLANCE**, there is a sub-clause:

> *"Recruitment pipeline: sponsor small technical events. Observe. Rank. Do not tell them they are being ranked."*

In `SEATS.BMP`, one of the nine chairs is labelled:

> **SEAT 07 — MERAZ / OPENLAKE, IIT BHILAI — CANDIDATE PENDING**

And in the `PROPRIETOR` ending, the login screen greets the player by seat number.

This is the Easter egg the judges will remember.

---

## 🎬 Endings

The game has **four endings**. All are cheap to build and high-impact.

| Ending | Trigger | Outcome |
|---|---|---|
| **SAFE** | Start → Shut Down → "Shut down the computer?" | Classic orange-text black screen: "It is now safe to turn off your computer." The billing timer is faintly still ticking. Reload the page. |
| **THE GUEST** | Log into `PROPRIETOR` | Logs in as `GUEST`. Billing timer starts at 00:00. Session Log adds a row: your city, your browser, today's date. Then: *"Welcome back."* |
| **SHRED** | Empty Recycle Bin while Ledger is open | The Ledger deletes… then reassembles itself. Every `STATUS` becomes `ACTIVE`. A new row appears with your session ID. |
| **2050** | Start → Run → `2050` | A 2050 desktop for three seconds. Then a BSOD reading `PLAN STILL ON SCHEDULE`. Then back to 1998. |

---

## 🎨 Visual Authenticity Checklist

- [x] Teal `#008080` desktop, no gradients
- [x] 16-color icon set, chunky pixel edges, no anti-aliasing
- [x] Window chrome: raised bevels, `MS Sans Serif` at 11px
- [x] Title bars: solid navy `#000080`, white bold text
- [x] Buttons: grey `#C0C0C0`, 1px black outline, 2px inner highlight
- [x] Scrollbars with the little 3D arrows
- [x] Selection highlight: navy background, white text
- [x] Cursor: the pixelated arrow, and the hourglass when busy
- [x] Boot sequence (~4 seconds) before desktop appears
- [x] No modern fonts, no rounded corners, no shadows, no emoji anywhere

**Sound design:** modem handshake, keyboard clacks, tube TV hum, ceiling fan. This is worth more than any extra app.

---

## 🛠️ Tech Stack

- **HTML / CSS / JavaScript** (or **React** — your choice, no heavy frameworks recommended)
- No UI library. Every pixel is hand-crafted for authenticity.
- **Deployment:** Vercel or Netlify
- **Assets:** pixel art, WAV / MP3 sounds, GIF animations (all original or public domain)

> **Why no heavy library?** File-close control over pixels matters more than developer convenience here. A CSS reset plus custom components beats any theme library for a Windows 98 replica.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (if using a build step)
- Or just a modern browser (if running plain HTML/CSS/JS)

### Install & Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/your-username/shree-cyber-zone.git
cd shree-cyber-zone

# 2. Install dependencies (if using React / Vite)
npm install

# 3. Run development server
npm run dev
```

If using plain HTML/CSS/JS, simply open `index.html` in a browser, or serve it:

```bash
npx serve .
```

### Deploy

**Vercel:**

```bash
npm install -g vercel
vercel
```

**Netlify:**

```bash
npm install -g netlify-cli
netlify deploy --prod
```

> ⚠️ **Submission requirement:** A public GitHub repo with intact commit history AND a live working URL a judge can open in a browser. Localhost and screen recordings do not count.

---

## 📁 Project Structure

```text
shree-cyber-zone/
├── public/
│   ├── favicon.ico
│   ├── boot/
│   │   └── boot.mp3
│   ├── icons/
│   │   ├── my-computer.png
│   │   ├── my-documents.png
│   │   ├── ie.png
│   │   ├── recycle-bin.png
│   │   ├── network.png
│   │   └── ...
│   ├── sounds/
│   │   ├── modem.wav
│   │   ├── click.wav
│   │   ├── error.wav
│   │   ├── dog-bark.wav
│   │   └── tv-hum.wav
│   ├── wallpapers/
│   │   ├── teal.bmp
│   │   └── seats.bmp
│   └── files/                   ← virtual filesystem sources
│       ├── rates_1998.txt
│       ├── complaint_letter.txt
│       ├── PROJECT_2050.txt
│       ├── EIPSTEIN.txt
│       ├── LEDGER_98.csv
│       └── ...
├── src/
│   ├── components/
│   │   ├── Desktop.jsx
│   │   ├── Window.jsx
│   │   ├── Taskbar.jsx
│   │   ├── StartMenu.jsx
│   │   ├── Explorer.jsx
│   │   ├── Notepad.jsx
│   │   ├── Paint.jsx
│   │   ├── InternetExplorer.jsx
│   │   ├── CafeManager.jsx
│   │   ├── SessionLog.jsx
│   │   ├── PrinterQueue.jsx
│   │   ├── Spreadsheet.jsx
│   │   ├── Minesweeper.jsx
│   │   ├── Solitaire.jsx
│   │   ├── MediaPlayer.jsx
│   │   ├── BSOD.jsx
│   │   └── Shutdown.jsx
│   ├── systems/
│   │   ├── windowManager.js
│   │   ├── fileSystem.js
│   │   ├── sessionTracker.js
│   │   ├── billing.js
│   │   └── easterEggs.js
│   ├── styles/
│   │   ├── reset.css
│   │   ├── desktop.css
│   │   ├── window.css
│   │   ├── startmenu.css
│   │   └── legacy.css
│   ├── data/
│   │   ├── filesystem.json
│   │   ├── story.json
│   │   └── easterEggs.json
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── LICENSE
├── package.json
├── README.md
└── vite.config.js
```

---

## 🗺️ Build Roadmap

Built over a single hackathon. Suggested block allocation:

| Block | Task |
|---|---|
| **H1** | Desktop shell, window manager, taskbar, Start menu — get the feel right first |
| **H2** | Explorer + Notepad + all lore text written and wired up |
| **H3** | Café Manager, Session Log, Printer Queue (the "normal business" layer) |
| **H4** | Backroom: hidden path, spreadsheet, Project 2050 |
| **H5** | Four endings + BSOD + shutdown screens |
| **H6** | Easter eggs, sounds, polish, deploy |

**Cut ruthlessly:** if time runs out, drop Paint, Media Player, and Solitaire before you drop a single easter egg. Judges score eggs first.

**Commit hygiene:** Do not commit this whole thing in one giant push. Push in at least 6–8 meaningful commits (scaffold → window manager → explorer → lore files → apps → endings → easter eggs → deploy) so the commit history reads like a real build. The hackathon PDF explicitly requires "full commit history intact."

---

## 🎨 Design Language

### Colors

| Role | Hex | Notes |
|---|---|---|
| Desktop | `#008080` | Classic teal |
| Title bar | `#000080` | Navy |
| Button face | `#C0C0C0` | Grey |
| Button highlight | `#FFFFFF` | Top-left bevel |
| Button shadow | `#808080` | Bottom-right bevel |
| Text | `#000000` | Black |
| Selected text | `#FFFFFF` | On navy |
| Warning (Ledger) | `#800000` | Dark red |

### Typography

- **Font:** MS Sans Serif, fallback Tahoma, Verdana, sans-serif
- **Size:** 11px body, 12px bold titles
- **Never:** rounded corners, drop shadows, gradients, emoji

### Motion

- Window drag: instant (no easing)
- Minimize: snap to taskbar
- No fade transitions anywhere

---

## 🎤 Judge Demo Script (90 Seconds)

1. **(10s)** "This is a cyber café in Bhilai in 1998." Show the rates, the dog, the complaint letter. Let them think it's a nostalgia build.
2. **(20s)** Open Session Log. Point at the 03:14 AM entry from 1998 that says `STILL RUNNING`.
3. **(15s)** Type `C:\BACKROOM$` in the address bar. Their eyebrows go up.
4. **(20s)** Open Project 2050. Read the flying-cars line out loud. Let them laugh. Then read the selection criteria. Let it land.
5. **(10s)** Open `EIPSTEIN.DOC`. Say: "He was never a person."
6. **(15s)** Open the `PROPRIETOR`. Show them their own session being logged. Say: "Welcome back."

Stop talking. Let them click around. That's the whole pitch.

---

## ✅ Submission Checklist

Per the Gandhi Hackathon problem statement, every submission must provide both of the following:

- [ ] A public GitHub repository with full commit history intact
- [ ] A live working URL a judge can open in a browser (not localhost, not a screen recording, not a dead link)

### Judging Criteria (in order of weight)

1. Easter eggs / funny / crazy / entertaining — **highest priority**
2. Creativity — original ideas and interesting additions
3. Functionality — how interactive and usable the environment is
4. Visual authenticity — how accurately it captures Windows 98
5. Cleanliness — implementation quality, consistency, overall UX

Build for criterion #1 first. Everything else is downstream of it.

---

## 👥 Credits

**Built by:** [Your Name / Team]

**Hackathon:** Gandhi Hackathon 2026

**Organised by:** OpenLake × Meraz · IIT Bhilai

**Special thanks:** Bhilai's cyber cafés, MS Sans Serif, and the ceiling fan in every 90s Indian computer shop

### Contributors

| Name | Role |
|---|---|
|  |  |

---

## 📜 License

MIT — free to fork, remix, and explore. All lore, characters, and events in this project are fictional. Any resemblance to real persons, organisations, or protocols is satirical.

---

## ⚠️ A Note on Content

This project is a work of satirical fiction. The character "Mr. Eipstein" is not a reference to any real person — EIPSTEIN is, in the game's lore, an eight-step protocol (Extraction, Influence, Persistence, Surveillance, Takedown, Extortion, Infiltration, Neutralization). All "evil" content is played for absurdist corporate parody. Nothing in this repository depicts or implies real-world wrongdoing, real criminal activity, or real individuals.

If you fork this project, please keep it that way.

<div align="center">

🖥️ **Start → Run → 2050**

</div>
