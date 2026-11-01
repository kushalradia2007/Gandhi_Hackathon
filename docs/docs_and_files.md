# docs_and_files.md

> **Project:** SHREE CYBER ZONE — PC 03 (ADMIN)
> **For:** Gandhi Hackathon 2026 · OpenLake × Meraz · IIT Bhilai · 1st November 2026
> **Document status:** LOCKED · Full public filesystem content · Build-ready
> **Rule:** Every file in this document is a **public** file. The player can find it by clicking. The hidden backroom files are in `story.md`. The chat logs are in `chats_and_emails.md`. This document covers everything else.

---

## 0. How to Read This Document

This document specifies every **public file** on the machine — the files the player can find without typing a hidden path. They are organized by location:

1. **The Public Filesystem** — the shape of the visible machine
2. **`C:\My Documents\`** — the warm, boring, Act 0 files
3. **`C:\Windows\Desktop\`** — desktop shortcuts and their targets
4. **`C:\WINDOWS\`** — system files
5. **`C:\WINDOWS\Media\`** — the recorded calls
6. **`C:\WINDOWS\System\`** — the .dll files and configuration
7. **`C:\Program Files\`** — installed applications
8. **`C:\Temp\`** — temporary files (the "found things")
9. **`C:\`** — the root files
10. **`A:\`** — the floppy drive (empty, but not really)
11. **`D:\`** — the CD-ROM drive (empty)
12. **`C:\Recycle Bin\`** — the recycled files
13. **The Game Studio** — cross-reference to `games.md`
14. **File Content Voice Guide** — how to write the public files
15. **Build Notes** — priorities, time estimates, what not to build

**Every file has:**
- **Priority** (P0 / P1 / P2)
- **Path** (exact location)
- **Opens in** (Notepad, Paint, etc.)
- **Size** (fake, for authenticity)
- **Date** (fake, for authenticity)
- **Content** (the actual text or description)
- **Purpose** (what the file does for the story)

---

## 1. The Public Filesystem

### 1.1 The Shape

The public filesystem is the machine as it *appears* to be: a working admin PC in a small cyber café. It has:

- **12 default desktop icons** (see `features.md` section 2.2)
- **`C:\My Documents\`** — the café's personal files
- **`C:\WINDOWS\`** — system files
- **`C:\Program Files\`** — installed software
- **`C:\Temp\`** — miscellaneous
- **`C:\`** — root files (`AUTOEXEC.BAT`, `CONFIG.SYS`, `COMMAND.COM`)
- **`A:\`** — empty floppy
- **`D:\`** — empty CD-ROM
- **`C:\Recycle Bin\`** — three recycled files
- **`C:\BACKROOM$`** — *hidden, not part of the public filesystem*

### 1.2 The Vibe

The public filesystem is **warm, boring, and nostalgic.** Nothing here is scary. Nothing here is a clue (except in retrospect). These are the files that make the player think *"nice Windows 98 replica."*

**The conspiracy is not here.** The conspiracy is in `C:\BACKROOM$`. The public files are the **setup.** The hidden files are the **payoff.**

### 1.3 The Date Rule

Most public files are dated **3 March 1998** or in the weeks after. A few are dated later.

**The player who looks at file dates will see a pattern:** the café's files are all from 1998. The machine has not been used for anything since. Except — and this is the subtle tell — the **Session Log**, which is still updating.

---

## 2. `C:\My Documents\` — The Warm Files

These are the files the player will open first. They establish the world. They are Act 0.

### 2.1 `rates_1998.doc` (P0)

- **Path:** `C:\My Documents\rates_1998.doc`
- **Opens in:** Notepad
- **Size:** 2 KB
- **Date:** `3/3/98 10:00 AM`
- **Purpose:** Establishes the café as a real business. Boring. Warm.

**Content:**

```
SHREE CYBER ZONE
Nehru Nagar, Sector 4
Bhilai, Chhattisgarh 490020
Phone: (0788) 224-1998

========================================
RATES
========================================

Internet:
  Regular                  Rs. 10 per hour
  Night (after 10 PM)      Rs. 15 per hour
  Student (with ID)        Rs. 8 per hour

Printing:
  Black & White            Rs. 2 per page
  Color                    Rs. 5 per page

Scanning:
  Per page                 Rs. 10

Floppy:
  Blank 1.44 MB            Rs. 5

CD:
  Blank CD-R               Rs. 25
  Burning (per disc)       Rs. 50

Food:
  Chai                     Rs. 5 per glass
  Cold drink               Rs. 10 per bottle

========================================
NOTES
========================================

1. No refunds.
2. No food at computers. Chai is allowed.
3. Do not download big files.
4. Pay before you start.
5. Do not touch PC 03. That is the admin machine.
6. If a machine is slow, tell Bhaiya.
7. Do not restart the machines yourself.
8. Be back before 11 PM. We close.

Thank you for visiting SHREE CYBER ZONE.
```

**Rule:** No conspiracy. No hidden message. Just a rate card. The `Do not touch PC 03` line is the only hint, and it reads as a normal admin-machine warning.

**The one sentence:** *"Do not touch PC 03. That is the admin machine."* — it is the first quiet mention of the machine the player is using.

### 2.2 `rules_cardboard.bmp` (P1)

- **Path:** `C:\My Documents\rules_cardboard.bmp`
- **Opens in:** Paint
- **Size:** 128 KB
- **Date:** `3/3/98 10:30 AM`
- **Purpose:** The handwritten house rules, scanned. Adds texture. Slightly ominous.

**Image description:**

A scanned photograph of a piece of cardboard taped to the café wall. The cardboard is slightly yellowed. The handwriting is in blue marker, in a mix of Hindi and English.

```
+------------------------------------------+
|   CYBER ZONE RULES                       |
|                                          |
|   1. No smoking                          |
|   2. No food                             |
|   3. No fighting                         |
|   4. No downloading "big" files          |
|   5. No printing without permission      |
|   6. No changing wallpaper               |
|   7. Do not touch PC 03                  |
|   8. Do not ask about the floppy         |
|   9. Do not ask what is in the back room |
|                                          |
|   - Bhaiya                               |
+------------------------------------------+
```

**The text is in a mix of handwriting styles** — as if written by more than one person. The last three rules (7, 8, 9) are in **different handwriting** — smaller, more careful. The player who notices this will wonder who wrote them.

**The one sentence:** *"Do not ask what is in the back room."* — the rules tell the player the back room exists.

**Easter egg:** Right-clicking the image in Paint → Properties shows:

```
rules_cardboard.bmp

Type:        Bitmap Image
Size:        128 KB
Location:    C:\My Documents
Created:     3/3/98 10:30 AM
Modified:    3/3/98 10:30 AM
Attributes:  [✓] Read-only

[ OK ]
```

Nothing unusual. The file is exactly what it appears to be.

### 2.3 `tommy.jpg` (P0)

- **Path:** `C:\My Documents\tommy.jpg`
- **Opens in:** Paint
- **Size:** 48 KB
- **Date:** `3/3/98 10:14 AM`
- **Purpose:** The dog. The password hint. The one thing in the game that is exactly what it appears to be.

**Image description:**

A grainy, slightly low-resolution photograph of a brown-and-white mixed-breed dog. He is sitting on the tiled floor of the café, looking directly at the camera, tongue out, ears slightly uneven. Behind him, a corner of a computer table is visible. A CRT monitor. A chair leg.

The photo is taken with an early digital camera. It is not professionally lit. It is a photo someone took because they loved the dog.

**The one sentence:** There is no sentence. The image is the sentence. The dog is the dog.

**Easter egg:** Run → `tommy` plays a dog bark and briefly changes `bhaiya_1998.jpg`'s expression (see `easter_eggs.md` B05). This only works if `tommy.jpg` has been opened at least once — the machine waits for the player to meet Tommy first.

### 2.4 `complaint_letter.txt` (P0)

- **Path:** `C:\My Documents\complaint_letter.txt`
- **Opens in:** Notepad
- **Size:** 1 KB
- **Date:** `5/7/98 2:15 PM`
- **Purpose:** Comedy. Warmth. A period-accurate customer complaint.

**Content:**

```
To Bhaiya,
SHREE CYBER ZONE

Date: 7 May 1998

Dear Bhaiya,

I came to your cyber cafe yesterday at 4 PM. I sat at PC 07.

I have some complaints.

1. The AC was not working. You said it was working. It
   was not working. It was making noise but not cold air.

2. The mouse was sticking. I had to lift it and put it
   down three times to make it move.

3. The keyboard had no "\" key. I needed the "\" key. I
   could not use it.

4. The boy at PC 09 was playing the same song on repeat
   for one hour. You did not tell him to stop. I did not
   tell him to stop. Nobody told him to stop.

5. The chai was good. This is not a complaint. I am
   mentioning it so you know I am not angry. The chai was
   good.

6. When I asked for a floppy, you gave me a floppy. It
   had something on it. You said it was blank. It was
   not blank. I did not open it. I gave it back. You did
   not say anything. You put it in a drawer.

I am not angry. I am just telling you.

Please fix the AC.

Regards,
A customer
(You know which one)
```

**The one sentence:** *"I did not open it. I gave it back."* — the floppy is mentioned. The player has now seen a floppy in a file. They will see it again.

**Rule:** No conspiracy content. The complaint letter is a complaint letter. The floppy is the only thing that connects to the story, and it is mentioned so casually that it reads as a customer detail.

### 2.5 `bhaiya_1998.jpg` (P0)

- **Path:** `C:\My Documents\bhaiya_1998.jpg`
- **Opens in:** Paint
- **Size:** 128 KB
- **Date:** `3/3/98 10:45 AM`
- **Purpose:** The photograph that proves Bhaiya does not age.

**Image description:**

A photograph of the grand opening of SHREE CYBER ZONE on 3 March 1998. There are 12 PCs visible on three long tables. A wooden partition. A tube TV on the wall. A ribbon cutting.

**Bhaiya is in the center of the photo.** He is cutting the ribbon with oversized scissors. He is wearing a white shirt. He is smiling. He looks like a man in his mid-30s.

**Tommy is in the bottom-right corner**, sniffing a chair leg.

**The one sentence:** There is no sentence. The image is the sentence.

**Easter egg:** If the player opens `bhaiya_2026.jpg` (see section 2.6) and then re-opens `bhaiya_1998.jpg`, the two photos are side by side. **Bhaiya looks the same in both.** He has not aged. Not by a day.

### 2.6 `bhaiya_2026.jpg` (P1)

- **Path:** `C:\My Documents\bhaiya_2026.jpg`
- **Opens in:** Paint
- **Size:** 124 KB
- **Date:** `11/1/26 03:14 AM` — **today's date**
- **Purpose:** The photograph that makes the player look twice.

**Image description:**

A photograph of the same cyber café, taken **today**, from the same angle as `bhaiya_1998.jpg`. The 12 PCs are still there, but they are older. The tube TV is still there. The wooden partition is still there. The ribbon is gone.

**Bhaiya is in the same spot.** He is not cutting a ribbon. He is standing behind the counter, looking at the camera. He is wearing a white shirt. He is smiling. **He looks exactly the same as in 1998.**

**Tommy is in the bottom-right corner**, sitting on the broken chair. He is older. His muzzle is grey. But he is alive.

**The one sentence:** There is no sentence. The image is the sentence.

**The reveal:** The player who compares the two photos will see that Bhaiya has not aged. Tommy has. This is the first time the player realizes something is wrong with Bhaiya.

**Rule:** Do not explain this in a file. Do not add a caption. Let the player notice.

**The date:** `11/1/26 03:14 AM` — the file was **created at the exact moment the session started**. It was placed in My Documents at 3:14 AM today. The player who notices this will wonder who took the photo.

**Easter egg:** If the player opens this file and then closes it, and then opens it again, a small mark appears in the bottom-right corner of the image: `— s00`. It was not there the first time.

### 2.7 `judges_note.txt` (P0 on November 1, 2026)

- **Path:** `C:\My Documents\judges_note.txt`
- **Opens in:** Notepad
- **Size:** 1 KB
- **Date:** `11/1/26 03:14 AM`
- **Purpose:** The date-aware file. The most personal moment in the game.

**Content (shown only on November 1, 2026):**

```
To the judge who opened this file,

You are not the first person to open this file today.

You are the 14th.

The Quiet Room has been expecting you since 3:14 AM.

The chair is warm. The seat was always yours.

You do not need to do anything. You are already in
the room.

— s00
```

**The number `14` is dynamic.** It increments every time the file is opened. The first judge to open it sees `1`. The second sees `2`. And so on.

**Implementation:**

```javascript
const today = new Date();
const isHackathonDay = today.getFullYear() === 2026 && today.getMonth() === 10 && today.getDate() === 1;

if (isHackathonDay) {
  let count = parseInt(localStorage.getItem('judges_note_count') || '0');
  count += 1;
  localStorage.setItem('judges_note_count', count.toString());
  // Show judges_note.txt with count
} else {
  // Show visitor_note.txt
}
```

**Rule:** The count is **per browser**, not per user. Judges in different browsers see different counts. The first judge sees `1`. The second judge in the same browser sees `2`. The tone is *"you are not alone here."*

**The one sentence:** *"You are already in the room."* — the fourth-wall break that says the player is already seen.

### 2.8 `visitor_note.txt` (P1 on all other days)

- **Path:** `C:\My Documents\visitor_note.txt`
- **Opens in:** Notepad
- **Size:** 1 KB
- **Date:** `11/1/26 03:14 AM`
- **Purpose:** The date-aware file for non-hackathon days.

**Content (shown on any day that is not November 1, 2026):**

```
To the visitor,

You are reading this on a machine that is not yours.

The chair you are sitting in is not yours.

The session you started is not yours.

You are welcome anyway.

The machine has been waiting for someone to sit here.

The machine has been waiting for you.

— s00
```

**The one sentence:** *"The machine has been waiting for you."*

### 2.9 The `My Documents` Folder Properties

Right-clicking `My Documents` → Properties:

```
My Documents Properties

Type:        Folder
Location:    C:\My Documents
Size:        304 KB
Contains:    8 files, 0 folders

Attributes:
[✓] Read-only
[ ] Hidden
[✓] Archive

[ OK ]
```

Nothing unusual. Except the **size**: `304 KB`. The player who checks the size will see it is much smaller than a typical My Documents folder. The machine has very little in it.

### 2.10 `My Documents` Build Notes

- **Do:** Make every file openable in the correct app.
- **Do:** Set the correct dates (mostly `3/3/98`).
- **Do:** Make `judges_note.txt` conditional on the date.
- **Do:** Make `bhaiya_2026.jpg` show the same man as `bhaiya_1998.jpg`.
- **Don't:** Add any conspiracy content to these files. They are the warm, boring setup.
- **Priority:** `rates_1998.doc` > `tommy.jpg` > `bhaiya_1998.jpg` > `complaint_letter.txt` > `judges_note.txt` > `bhaiya_2026.jpg` > `rules_cardboard.bmp`.

**Estimated: 45 min** (writing content, setting up files).

---

## 3. `C:\Windows\Desktop\` — The Desktop Shortcuts

### 3.1 Purpose

The Desktop folder contains the shortcuts that appear as icons on the desktop. The player usually does not see this folder directly (desktop icons are the interface), but a player who navigates to `C:\WINDOWS\Desktop\` will see the files.

### 3.2 Contents

```
C:\WINDOWS\Desktop\
├── My Computer.lnk
├── My Documents.lnk
├── Internet Explorer.lnk
├── Network Neighborhood.lnk
├── Recycle Bin.lnk
├── Cafê Manager 98.lnk
├── Session Log.lnk
├── Printer Queue.lnk
├── Notepad.lnk
├── Paint.lnk
├── Media Player.lnk
├── Minesweeper.lnk
├── Solitaire.lnk
├── mIRC.lnk          (appears after unlock)
├── PROPRIETOR.lnk    (appears after print trap)
└── for_you.txt       (appears after Recycle Bin empty)
```

### 3.3 The `.lnk` Files

Each `.lnk` file is a Windows shortcut. Double-clicking it opens the corresponding app. Right-clicking shows the standard shortcut context menu (`Open`, `Delete`, `Rename`, `Properties`).

**Properties dialog** for any `.lnk`:

```
[App Name] Shortcut Properties

Target type:  Application
Target:       C:\Program Files\[App]\[App].exe
Start in:     C:\Program Files\[App]
Shortcut key: None
Run:          Normal window

[ Change Icon... ]  [ Find Target... ]

[ OK ]  [ Cancel ]
```

**Rule:** Do not implement `Change Icon...` or `Find Target...`. Visual only.

### 3.4 Special Shortcuts

| Shortcut | Special behavior |
|---|---|
| `Cafê Manager 98.lnk` | Target: `C:\Program Files\SHREE CYBER ZONE\cafemanager.exe` |
| `Session Log.lnk` | Target: `C:\Program Files\SHREE CYBER ZONE\sessionlog.exe` |
| `PROPRIETOR.lnk` | Target: `C:\WINDOWS\System\proprietor.exe` — the file does not exist |
| `for_you.txt` | **Not a shortcut.** A text file. See `chats_and_emails.md` section 7. |

**`PROPRIETOR.lnk` Properties:**

```
PROPRIETOR Shortcut Properties

Target type:  Application
Target:       C:\WINDOWS\System\proprietor.exe
Start in:     C:\WINDOWS\System
Shortcut key: None
Run:          Normal window

[ Change Icon... ]  [ Find Target... ]

[ OK ]  [ Cancel ]
```

**Clicking `Find Target...`** shows:

```
Cannot find the file 'C:\WINDOWS\System\proprietor.exe'
(or one of its components).

Make sure the path and filename are correct and that
all required libraries are available.

[ OK ]
```

**The joke:** The shortcut exists. The target does not. The Proprietor is a shortcut to nothing.

### 3.5 The Desktop Folder Build Notes

- **Do:** Create the `.lnk` files that represent the default desktop icons.
- **Do:** Make double-clicking them open the corresponding app.
- **Do:** Make `PROPRIETOR.lnk` have a broken target.
- **Don't:** Implement the full shortcut properties dialog. Show it, but make most fields read-only.
- **Priority:** `.lnk` files for default icons > `.lnk` files for unlocked icons > `PROPRIETOR.lnk` broken target.

**Estimated: 15 min.**

---

## 4. `C:\WINDOWS\` — System Files

### 4.1 Purpose

The WINDOWS folder is the machine's **operating system.** Most files are boring, system-y things. But a few contain the machine's memory of itself.

### 4.2 Contents

```
C:\WINDOWS\
├── Application Data\
│   └── Microsoft\
│       └── Internet Explorer\
│           └── Quick Launch\
├── Desktop\                    (see section 3)
├── Favorites\
│   └── SHREE CYBER ZONE.url
├── Fonts\                      (see settings.md section 13)
├── Help\
│   └── windows.hlp
├── Media\                      (see section 5)
├── Recent\
│   ├── rates_1998.lnk
│   ├── tommy.lnk
│   └── complaint_letter.lnk
├── Start Menu\
│   └── Programs\
│       ├── Accessories\
│       ├── Games\
│       └── StartUp\
├── System\
│   ├── quiet.dll              (0 bytes)
│   ├── seat07.dll             (0 bytes)
│   ├── eipstein.dll           (0 bytes)
│   └── ...                    (standard DLLs)
├── Temp\                       (see section 8)
├── Win.ini
├── System.ini
├── Win.com
├── Explorer.exe
├── Notepad.exe
├── Calc.exe
├── Sol.exe
├── Winmine.exe
└── ...
```

### 4.3 `Favorites\SHREE CYBER ZONE.url` (P2)

- **Path:** `C:\WINDOWS\Favorites\SHREE CYBER ZONE.url`
- **Opens in:** Internet Explorer
- **Purpose:** A shortcut to the intranet homepage.

**Content:**

```
[InternetShortcut]
URL=http://shreecyberzone.local/
```

**Double-clicking** it opens IE at the intranet homepage. This is authentic — Windows 98 stored Favorites as `.url` files.

### 4.4 `Recent\` Folder (P1)

- **Path:** `C:\WINDOWS\Recent\`
- **Purpose:** The most-recently-used files list. Populated as the player opens files.

**Contents:**

The folder shows `.lnk` shortcuts to the last files opened. This is connected to the Start → Documents menu (see `features.md` section 5.4).

**Initial contents (before any files opened):**

```
rates_1998.lnk
tommy.lnk
complaint_letter.lnk
```

These are the files someone opened in 1998. The dates are all `3/3/98` or `5/7/98`. **No file from the backroom appears here.** The backroom files were never opened from the desktop.

**The subtle tell:** The Recent folder shows that the machine has not opened any new files since 1998. The player is the first person to open a file in 28 years.

### 4.5 `System\quiet.dll` (P1)

- **Path:** `C:\WINDOWS\System\quiet.dll`
- **Opens in:** Nothing (dialog)
- **Size:** 0 bytes
- **Date:** `3/3/98 03:14 AM`
- **Purpose:** The file that should not exist.

**Double-clicking it** shows:

```
Cannot open file.

The file is empty.

The file is not empty.

[ OK ]
```

**Right-clicking → Properties:**

```
quiet.dll Properties

Type:        Application Extension
Location:    C:\WINDOWS\System
Size:        0 bytes
Created:     3/3/98 03:14 AM
Modified:    3/3/98 03:14 AM

Attributes:
[✓] Read-only
[✓] Hidden
[ ] Archive

[ OK ]
```

**The joke:** The file is 0 bytes. It is hidden. It was created on the first day. The player cannot open it. It is named `quiet`.

**The one sentence:** *"The file is not empty."*

### 4.6 `System\seat07.dll` (P1)

- **Path:** `C:\WINDOWS\System\seat07.dll`
- **Opens in:** Nothing (dialog)
- **Size:** 0 bytes
- **Date:** `11/1/26 03:14 AM` — **today's date**
- **Purpose:** The file that was created for the player.

**Double-clicking it** shows:

```
Cannot open file.

The file is being written.

Please do not close the machine.

[ OK ]
```

**Right-clicking → Properties:**

```
seat07.dll Properties

Type:        Application Extension
Location:    C:\WINDOWS\System
Size:        0 bytes
Created:     11/1/26 03:14 AM
Modified:    11/1/26 03:14 AM

Attributes:
[✓] Read-only
[ ] Hidden
[ ] Archive

[ OK ]
```

**The reveal:** The file was created **today** at 3:14 AM. It is being written. It is 0 bytes. It has been 0 bytes all day. It will be 0 bytes forever. But the machine says it is being written.

**The one sentence:** *"The file is being written."*

### 4.7 `System\eipstein.dll` (P1)

- **Path:** `C:\WINDOWS\System\eipstein.dll`
- **Opens in:** Nothing (dialog)
- **Size:** 8 KB
- **Date:** `3/3/98 03:14 AM`
- **Purpose:** The protocol, compiled.

**Double-clicking it** shows:

```
Cannot open file.

The file is a library.

The library is in use.

[ OK ]
```

**Properties:**

```
eipstein.dll Properties

Type:        Application Extension
Location:    C:\WINDOWS\System
Size:        8 KB
Created:     3/3/98 03:14 AM
Modified:    11/1/26 03:14 AM

Attributes:
[✓] Read-only
[✓] Hidden
[ ] Archive

[ OK ]
```

**The reveal:** The file was created on `3/3/98` but **modified today at 3:14 AM**. The protocol is still being updated. The player who checks file dates will see this.

### 4.8 `Win.ini` and `System.ini` (P2)

Standard Windows 98 configuration files. Opening them in Notepad shows the expected contents:

**`Win.ini`:**

```
[windows]
load=
run=
NullPort=None
device=HP LaserJet 6L,LPT1:

[Desktop]
Wallpaper=(None)
TileWallpaper=0
WallpaperStyle=2

[colors]
Background=0 128 128
```

**`System.ini`:**

```
[386Enh]
woafont=dosapp.fon
EMMExclude=A000-FFFF
device=*vxd
device=*vshare
device=*vmcpd

[drivers]
wave=mmdrv.dll
timer=timer.drv

[mci]
cdaudio=mcicda.drv
sequencer=mciseq.drv
waveaudio=mciwave.drv
```

**The subtle tell in `Win.ini`:** `Background=0 128 128` — that's the RGB for teal `#008080`. The desktop color is hardcoded in `Win.ini`. It has been teal since 1998.

**Easter egg:** If the player scrolls to the bottom of `Win.ini`, there is a section no Windows 98 `Win.ini` should have:

```
[quiet]
session=active
seat=07
```

Nothing else. Just those two lines.

### 4.9 `C:\WINDOWS\` Build Notes

- **Do:** Create the folder structure.
- **Do:** Create the three special DLLs (`quiet.dll`, `seat07.dll`, `eipstein.dll`) with their dialogs.
- **Do:** Make `Win.ini` and `System.ini` authentic, with one subtle addition.
- **Don't:** Implement a real Windows 98 system. The shell is the game; `C:\WINDOWS\` is texture.
- **Priority:** System DLLs > Win.ini addition > Recent folder > Favorites > Other folders.

**Estimated: 20 min.**

---

## 5. `C:\WINDOWS\Media\` — The Recorded Calls

### 5.1 Purpose

The Media folder contains the "recorded calls" that play in Media Player. They are the audio texture of the machine.

### 5.2 Contents

```
C:\WINDOWS\Media\
├── call_03141998.wav
├── call_03101998.wav
├── call_11012026.wav     (appears after all chat logs read)
├── The Microsoft Sound.wav
├── ding.wav
├── chord.wav
├── tada.wav
└── ...
```

### 5.3 `call_03141998.wav` (P1)

- **Path:** `C:\WINDOWS\Media\call_03141998.wav`
- **Opens in:** Media Player
- **Size:** 2.1 MB
- **Date:** `3/3/98 03:14 AM`
- **Duration:** 2:14

**Caption transcript:**

```
[00:00] (phone ringing)
[00:03] Bhaiya: Hello?
[00:05] (pause)
[00:07] Bhaiya: Haan, bhaiya bol raha hoon.
[00:10] (pause)
[00:12] Bhaiya: Theek hai. Theek hai.
[00:15] (pause)
[00:18] Bhaiya: Main dekh lunga.
[00:22] (pause)
[00:25] Bhaiya: Haan, PC 03 chalta rahega.
[00:30] (pause)
[00:33] Bhaiya: Kab tak?
[00:36] (long pause)
[00:44] Bhaiya: Theek hai.
[00:47] (phone hangs up)
[00:49] (silence for the rest of the file)
```

**The one sentence:** *"Kab tak?"* (Until when?) — Bhaiya asks. He does not get an answer. The player does not get an answer either.

### 5.4 `call_03101998.wav` (P1)

- **Path:** `C:\WINDOWS\Media\call_03101998.wav`
- **Opens in:** Media Player
- **Size:** 1.8 MB
- **Date:** `3/10/98 03:14 AM`
- **Duration:** 1:47

**Caption transcript:**

```
[00:00] (phone ringing)
[00:03] Voice (formal, male): The delivery is confirmed.
[00:06] Voice: The floppy has been placed.
[00:09] Voice: The session is open.
[00:12] Voice: Do not close it.
[00:15] (pause)
[00:18] Voice: Do not open the floppy.
[00:21] (pause)
[00:24] Voice: Do not ask what Phase V is.
[00:27] (pause)
[00:31] Bhaiya: ...Theek hai.
[00:34] (phone hangs up)
[00:37] (silence)
```

**The one sentence:** *"Do not ask what Phase V is."* — the first mention of the fifth phase.

### 5.5 `call_11012026.wav` (P1, unlocked)

- **Path:** `C:\WINDOWS\Media\call_11012026.wav`
- **Opens in:** Media Player
- **Unlocked:** After reading all 5 chat logs
- **Size:** 0.4 MB
- **Date:** `11/1/26 03:14 AM`
- **Duration:** 0:31

**Caption transcript:**

```
[00:00] (static)
[00:05] (static)
[00:10] Voice (same formal male): The candidate has arrived.
[00:14] (pause)
[00:17] Voice: The seat is ready.
[00:20] (pause)
[00:23] Voice: Proceed.
[00:26] (static)
[00:31] (end)
```

**The one sentence:** *"The candidate has arrived."* — the player is the candidate. The machine knew they were coming.

**Rule:** This file does not exist until the unlock. The player who navigates to `C:\WINDOWS\Media\` before the unlock will not see it. After the unlock, it appears — with today's date. The file was created today.

### 5.6 Standard Windows Sounds (P2)

The standard Windows 98 `.wav` files are also in this folder:

- `The Microsoft Sound.wav` — the startup chime
- `ding.wav` — the info dialog beep
- `chord.wav` — the warning dialog beep
- `tada.wav` — the "success" sound
- `chimes.wav` — another beep
- `ding.wav` — already listed

**Rule:** These are the sounds that play when dialogs open (see `features.md` section 11). They are authentic. They are 1998. They are the sound of the machine.

### 5.7 Media Build Notes

- **Do:** Create the three `call_*.wav` files (fake files, fake durations).
- **Do:** Write the caption transcripts.
- **Do:** Make Media Player show the captions synced to a fake timeline.
- **Do:** Unlock `call_11012026.wav` after all chat logs read.
- **Don't:** Generate actual audio. The captions are the point.
- **Priority:** Call 1 > Call 2 > Call 3 (unlock) > Standard sounds.

**Estimated: 20 min.**

---

## 6. `C:\WINDOWS\System\` — The DLLs

Already covered in section 4.5–4.7. The three special DLLs are the key files here.

### 6.1 Other DLLs (P2)

The System folder also contains the standard Windows 98 DLLs: `kernel32.dll`, `user32.dll`, `gdi32.dll`, `shell32.dll`, etc. These are visual only.

**Rule:** Do not implement the DLLs. Show them in the folder. Double-clicking shows:

```
Cannot open file.

This is a system file.

It is in use by Windows.

[ OK ]
```

### 6.2 `C:\WINDOWS\System\` Build Notes

- **Do:** Create the three special DLLs with their dialogs.
- **Do:** List the standard DLLs in the folder.
- **Don't:** Implement actual functionality.
- **Priority:** quiet.dll > seat07.dll > eipstein.dll > standard DLLs.

**Estimated: 10 min** (already partially covered in section 4).

---

## 7. `C:\Program Files\` — The Installed Apps

### 7.1 Purpose

The Program Files folder contains the executables for every app. It is the machine's **installed software.**

### 7.2 Contents

```
C:\Program Files\
├── Accessories\
│   ├── Notepad.exe
│   ├── Paint.exe
│   └── Calc.exe
├── Internet Explorer\
│   └── IEXPLORE.EXE
├── mIRC\
│   └── mirc32.exe
├── SHREE CYBER ZONE\
│   ├── cafemanager.exe
│   ├── sessionlog.exe
│   ├── printerqueue.exe
│   └── scz.ini
├── Windows Media Player\
│   └── mplayer.exe
└── Windows NT\
    └── [empty — leftover from a previous install]
```

### 7.3 The SHREE CYBER ZONE Folder (P1)

This is the **custom software** installed on this machine. It is the only folder that is not a standard 1998 app.

**`cafemanager.exe`:**
- Double-clicking opens Cafê Manager 98.
- Properties: `Cafê Manager 98 · Version 1.0 · 3.2 MB · 3/3/98`

**`sessionlog.exe`:**
- Double-clicking opens Session Log.
- Properties: `Session Log · Version 1.0 · 0.4 MB · 3/3/98`

**`printerqueue.exe`:**
- Double-clicking opens Printer Queue.
- Properties: `Printer Queue · Version 1.0 · 0.2 MB · 3/3/98`

**`scz.ini` (P1):**

This is the **configuration file** for the café software. It opens in Notepad.

**Content:**

```
[General]
Version=1.0
Installed=3/3/98
Registered=GUEST

[Session]
PC03=STILL_RUNNING
PC03_Start=3/3/98 03:14:00
PC03_Customer=MR. EIPSTEIN
PC03_Billing=infinite

[Backroom]
Path=C:\BACKROOM$
Hidden=true
Access=password

[Seats]
SEAT_00=ACTIVE
SEAT_01=ACTIVE
SEAT_02=ACTIVE
SEAT_03=VACANT
SEAT_04=ACTIVE
SEAT_05=NEUTRALIZED
SEAT_06=ACTIVE
SEAT_07=CANDIDATE_PENDING
SEAT_08=ACTIVE
SEAT_09=ACTIVE

[Phase]
Current=IV
Next=V
```

**The one sentence:** *"PC03_Billing=infinite"* — the billing is infinite. The file says so. The player now knows the timer does not stop.

**The reveal:** `scz.ini` **contains the path to `C:\BACKROOM$`.** The player who opens this file will find the hidden folder's path. This is an alternate discovery path (see `story.md` section 7, Path 1).

**The subtle tell:** The `[Seats]` section lists all nine seats. The player who reads it will see `SEAT_07=CANDIDATE_PENDING`. They will wonder who SEAT_07 is. They will find out.

### 7.4 The Windows NT Folder (P2)

An empty folder named `Windows NT`. It was left over from a previous installation or a failed upgrade.

**Right-clicking → Properties:**

```
Windows NT Properties

Type:        Folder
Location:    C:\Program Files
Size:        0 bytes
Contains:    0 files, 0 folders
Created:     3/3/98 03:14 AM
Modified:    3/3/98 03:14 AM

[ OK ]
```

**The joke:** Windows NT was the business version of Windows. It was never installed on this machine. But the folder exists. Empty. Created on the first day. Someone started installing it and stopped.

### 7.5 The Program Files Build Notes

- **Do:** Create the folder structure.
- **Do:** Make the executables open their apps.
- **Do:** Write `scz.ini` with the full contents.
- **Don't:** Implement actual executables.
- **Priority:** `scz.ini` > SHREE CYBER ZONE folder > Windows NT folder > Standard app folders.

**Estimated: 15 min.**

---

## 8. `C:\Temp\` — The Found Things

### 8.1 Purpose

The Temp folder is where the machine puts files it does not know what to do with. It is the **most interesting** part of the public filesystem because it is where the "found things" live — files someone downloaded, someone started, someone forgot.

### 8.2 Contents

```
C:\Temp\
├── download.tmp           (0 KB, incomplete)
├── ~tmp0001.tmp           (0 KB)
├── ~tmp0002.tmp           (0 KB)
├── draft.txt              (P1 — a love letter)
├── todo.txt               (P2 — a list)
├── scan0001.bmp           (P2 — a scanned image)
├── scan0002.bmp           (P2 — a scanned image)
└── backup_1998.zip        (P2 — a zip file, empty)
```

### 8.3 `draft.txt` (P1)

- **Path:** `C:\Temp\draft.txt`
- **Opens in:** Notepad
- **Size:** 2 KB
- **Date:** `6/12/98 09:14 PM`
- **Purpose:** A love letter. A human moment. A side track.

**Content:**

```
Priya,

I do not know how to say this.

I have been coming to this cyber cafe for three months now.
I sit at PC 07. You sit at PC 05. We have never talked.

I know your name because Bhaiya said it once. I know you
study at the college. I know you come on Tuesdays and
Thursdays. I know you always order chai.

I am writing this in Notepad because I do not have the
courage to say it.

I like you.

I do not know what to do about it.

If you are reading this, it means I sent it to you. It
means I found the courage. It means I pressed Send.

If I did not press Send, this file is still here. It is
still in Temp. It has been in Temp for 28 years.

I am sorry. I am not a brave person.

I hope you are well.

-- A
```

**The one sentence:** *"It has been in Temp for 28 years."* — the draft was never sent. The player is reading a love letter that was never delivered.

**The reveal:** Someone loved someone. They never told her. The file is still here. The machine remembers.

**Rule:** This is a **side track.** It has nothing to do with the conspiracy. It is a human moment. It is the kind of thing that makes the machine feel **inhabited** rather than **haunted.**

### 8.4 `todo.txt` (P2)

- **Path:** `C:\Temp\todo.txt`
- **Opens in:** Notepad
- **Size:** 1 KB
- **Date:** `3/3/98 09:00 AM`

**Content:**

```
TODO

- Buy new mouse for PC 07
- Fix AC
- Order more floppies
- Call the cable wala
- Pay electricity bill
- Ask about the floppy
- Do not ask about the floppy
- Do not ask about the floppy
- Do not ask about the floppy
```

**The one sentence:** The line *"Do not ask about the floppy"* repeats three times. It was written. Then written again. Then written again. **Bhaiya was trying to convince himself.**

**Rule:** The repetition is the point. Do not explain it.

### 8.5 `scan0001.bmp` and `scan0002.bmp` (P2)

- **Paths:** `C:\Temp\scan0001.bmp`, `C:\Temp\scan0002.bmp`
- **Opens in:** Paint
- **Size:** 256 KB each
- **Date:** `7/15/98`
- **Purpose:** Scanned documents. Texture.

**Image descriptions:**

`scan0001.bmp`: A scanned photograph of a cricket match on a tube TV. The score is `IND 98/2`. The scan is grainy.

`scan0002.bmp`: A scanned photograph of the café counter. On the counter: a CRT monitor, a keyboard, a mouse, a pencil, and a **floppy disk**. The floppy is clearly visible.

**The reveal:** The floppy is on the counter. It was there in 1998. The player has now seen it in three places: the complaint letter, `todo.txt`, and `scan0002.bmp`. The machine is telling them something.

### 8.6 `backup_1998.zip` (P2)

- **Path:** `C:\Temp\backup_1998.zip`
- **Opens in:** Dialog
- **Size:** 0 KB

**Double-clicking it** shows:

```
Cannot open file.

The archive is empty.

The archive has always been empty.

[ OK ]
```

**The joke:** The backup was never made. The archive exists. It is empty. It has been empty since 1998.

### 8.7 Temp Build Notes

- **Do:** Write `draft.txt` — it is the most human file in the build.
- **Do:** Write `todo.txt` with the repeated line.
- **Do:** Include the scanned images.
- **Don't:** Connect these files to the conspiracy. They are side tracks.
- **Priority:** `draft.txt` > `todo.txt` > `scan0002.bmp` > `scan0001.bmp` > `backup_1998.zip` > `.tmp` files.

**Estimated: 20 min.**

---

## 9. `C:\` — The Root Files

### 9.1 Purpose

The root folder contains the system boot files. They are boring. They are also where the machine's **oldest memory** lives.

### 9.2 Contents

```
C:\
├── AUTOEXEC.BAT
├── CONFIG.SYS
├── COMMAND.COM
├── IO.SYS
├── MSDOS.SYS
├── My Documents\           (see section 2)
├── Program Files\          (see section 7)
├── Recycle Bin\            (see section 12)
├── Temp\                   (see section 8)
├── WINDOWS\                (see section 4)
└── BACKROOM$               (hidden — see story.md)
```

### 9.3 `AUTOEXEC.BAT` (P1)

- **Path:** `C:\AUTOEXEC.BAT`
- **Opens in:** Notepad
- **Size:** 1 KB
- **Date:** `3/3/98 09:00 AM`

**Content:**

```
@ECHO OFF
PROMPT $p$g
PATH C:\WINDOWS;C:\WINDOWS\COMMAND
SET TEMP=C:\TEMP
SET BLASTER=A220 I5 D1 T4
LH C:\WINDOWS\COMMAND\MSCDEX.EXE /D:MSCD001
C:\WINDOWS\COMMAND\DOSKEY

REM Added 3/3/98
CALL C:\WINDOWS\SYSTEM\SCZSTART.BAT
```

**The one sentence:** *"CALL C:\WINDOWS\SYSTEM\SCZSTART.BAT"* — a batch file is called at startup. The player can navigate to `C:\WINDOWS\SYSTEM\SCZSTART.BAT` and read it.

### 9.4 `SCZSTART.BAT` (P1)

- **Path:** `C:\WINDOWS\SYSTEM\SCZSTART.BAT`
- **Opens in:** Notepad
- **Size:** 0.5 KB
- **Date:** `3/3/98 03:14 AM`

**Content:**

```
@ECHO OFF
REM SHREE CYBER ZONE STARTUP
REM DO NOT EDIT THIS FILE

C:\PROGRA~1\SHREE_~1\SESSIONLOG.EXE /AUTO
C:\PROGRA~1\SHREE_~1\CAFEMAN~1.EXE /MINIMIZE

REM Start session
CALL C:\WINDOWS\SYSTEM\SCZSESSION.BAT

REM DO NOT EDIT THIS FILE
```

**The one sentence:** *"DO NOT EDIT THIS FILE"* — the file is telling the player not to edit it. The player cannot edit it anyway (it's read-only). But the message is there.

### 9.5 `SCZSESSION.BAT` (P2)

- **Path:** `C:\WINDOWS\SYSTEM\SCZSESSION.BAT`
- **Opens in:** Notepad
- **Size:** 0.2 KB
- **Date:** `3/3/98 03:14 AM`

**Content:**

```
@ECHO OFF
REM SESSION MANAGER
REM This file starts the session and does not end it

SET SESSION_ID=PC03
SET SESSION_START=1998-03-03T03:14:00
SET SESSION_END=NEVER

:loop
GOTO loop
```

**The one sentence:** *"SET SESSION_END=NEVER"* — the session end is set to `NEVER`. Then the batch file enters an infinite loop. It never exits. The session never ends.

**The reveal:** The player who reads this file will understand why the session is still running. It is a batch file. It loops. It will loop forever. It was written that way.

### 9.6 Root Files Build Notes

- **Do:** Create the root files.
- **Do:** Write `AUTOEXEC.BAT` with the `CALL SCZSTART.BAT` line.
- **Do:** Write `SCZSTART.BAT` and `SCZSESSION.BAT`.
- **Don't:** Make the batch files actually run anything.
- **Priority:** `SCZSESSION.BAT` > `AUTOEXEC.BAT` > `SCZSTART.BAT` > Standard root files.

**Estimated: 10 min.**

---

## 10. `A:\` — The Floppy Drive

### 10.1 Purpose

The floppy drive is empty. But it is also not empty.

### 10.2 Behavior

Double-clicking `A:\` in Explorer shows:

```
A:\ is not accessible.

The device is not ready.

[ Retry ]  [ Cancel ]
```

Clicking `Retry` shows the same dialog. Clicking `Cancel` closes it.

**The subtle tell:** The dialog is standard Win98. The floppy drive is empty. **But the machine knows the player tried.**

### 10.3 The Easter Egg

After the player has opened `EIPSTEIN.DOC` (in the backroom), double-clicking `A:\` shows:

```
A:\ is not accessible.

The device is not ready.

The device is waiting.

[ Retry ]  [ Cancel ]
```

The line *"The device is waiting"* is new. It only appears after the Eipstein reveal. The floppy is waiting. For what? The player will wonder. The machine will not say.

**Rule:** The floppy is a motif. It appears in the complaint letter, in `todo.txt`, in `scan0002.bmp`, and here. It is never opened. It is never explained. **It is the one thing the player cannot touch.**

### 10.4 Floppy Build Notes

- **Do:** Make `A:\` show the "not accessible" dialog.
- **Do:** Add the "waiting" line after the Eipstein reveal.
- **Priority:** Standard dialog > Conditional line.

**Estimated: 5 min.**

---

## 11. `D:\` — The CD-ROM Drive

### 11.1 Purpose

The CD-ROM drive is empty. It is a prop. It is the drive the café used for burning CDs.

### 11.2 Behavior

Double-clicking `D:\` in Explorer shows:

```
D:\ is not accessible.

The device is not ready.

[ Retry ]  [ Cancel ]
```

Same as the floppy. But there is no conditional line. The CD-ROM is empty and always empty.

### 11.3 CD-ROM Build Notes

- **Do:** Show the "not accessible" dialog.
- **Don't:** Add any conditional behavior.
- **Priority:** Standard dialog.

**Estimated: 2 min.**

---

## 12. `C:\Recycle Bin\` — The Recycled Files

### 12.1 Purpose

The Recycle Bin contains three files that the café tried to throw away. They did not go away.

### 12.2 Contents

```
C:\Recycle Bin\
├── do_not_shred.pdf
├── final_final.doc
└── the_chair_manual.pdf
```

### 12.3 `do_not_shred.pdf` (P1)

- **Path:** `C:\Recycle Bin\do_not_shred.pdf`
- **Opens in:** Dialog
- **Size:** 12 KB
- **Date:** `3/3/98 03:14 AM`

**Double-clicking it** shows:

```
Cannot open file.

The file is corrupted.

The file is not corrupted.

[ OK ]
```

**The one sentence:** *"The file is not corrupted."*

**Right-click → Restore:** Shows:

```
Restoring do_not_shred.pdf...

Restored.

```

The file is **moved back** to the Recycle Bin. Yes, that is where it was. It goes back there.

**Do this three times.** On the third restore, the file just says:

```
Restored.
```

Nothing else. No path. No explanation.

On the fourth restore attempt, the **Restore button does nothing.**

### 12.4 `final_final.doc` (P2)

- **Path:** `C:\Recycle Bin\final_final.doc`
- **Opens in:** Notepad
- **Size:** 1 KB
- **Date:** `3/3/98 03:14 AM`

**Content:**

```
PROJECT 2050

[This file is empty.]

[It was empty when it was created.]

[It was created in 1998.]

[It has been empty for 28 years.]

[The project is not in this file.]
```

**The one sentence:** *"The project is not in this file."* — the file is a decoy. The real project is in `C:\BACKROOM$`. The player has now seen a name they will see again.

**Restore behavior:** Same as `do_not_shred.pdf`. Restores to the Recycle Bin.

### 12.5 `the_chair_manual.pdf` (P2)

- **Path:** `C:\Recycle Bin\the_chair_manual.pdf`
- **Opens in:** Dialog
- **Size:** 8 KB
- **Date:** `3/3/98 03:14 AM`

**Double-clicking it** shows:

```
Cannot open file.

This is a PDF file.

PDF files are not supported.

Please install Adobe Acrobat Reader 3.0.

[ OK ]
```

**The joke:** The player cannot read the chair manual. They will never read the chair manual. It is a PDF. It requires Acrobat. Acrobat is not installed. The manual is lost.

**The easter egg:** If the player right-clicks the file → Properties:

```
the_chair_manual.pdf Properties

Type:        PDF Document
Location:    C:\Recycle Bin
Size:        8 KB
Created:     3/3/98 03:14 AM

Title:       The Chair
Author:      —
Subject:     Seating
Keywords:    seat, seven, pending
Comments:    This manual is for the chair you are sitting in.

[ OK ]
```

**The one sentence:** *"This manual is for the chair you are sitting in."* — the chair manual is about SEAT_07. The player cannot read it. They are sitting in it anyway.

### 12.6 The Recycle Bin Emptying

**Emptying the Recycle Bin** (Right-click → Empty Recycle Bin):

- If `LEDGER_98.XLS` is open → triggers **Ending 3 (SHRED)**. See `story.md` section 8, Ending 3.
- If the Ledger is not open → the three files disappear. A new file appears on the desktop: `for_you.txt`.

**`for_you.txt` content:**

```
You emptied it.

It emptied you back.

— s00
```

**Rule:** After the Recycle Bin is emptied (once), the three files are gone. They do not come back. The player has destroyed the last physical evidence of 1998.

### 12.7 Recycle Bin Build Notes

- **Do:** Create the three files.
- **Do:** Make `do_not_shred.pdf` and `final_final.doc` restore to the Recycle Bin.
- **Do:** Make `the_chair_manual.pdf` impossible to open.
- **Do:** Make emptying the Recycle Bin trigger the appropriate ending/file.
- **Priority:** Three files > Restore behavior > `for_you.txt` > `the_chair_manual.pdf` properties.

**Estimated: 25 min.**

---

## 13. The Game Studio

See `games.md` section 7. The Game Studio is a folder in `C:\My Documents\Game Studio\` containing the unfinished GTA 3 project.

**Files:**

```
C:\My Documents\Game Studio\
├── README.TXT
├── GTA_3\
│   ├── GTA3.EXE
│   ├── DESIGN.DOC
│   ├── BUILD_LOG.TXT
│   └── ASSETS\
│       ├── player_sprite.bmp
│       ├── car_sprite.bmp
│       ├── city_map.bmp
│       └── font_8px.bmp
├── GTA_4\
├── GTA_5\
├── GTA_6\
├── GTA_7\
└── GTA_8\            (appears after all chat logs read)
```

**Full details in `games.md` section 7.**

---

## 14. File Content Voice Guide

### 14.1 The Public Files Voice

The public files are **warm, boring, and 1998.** They are written by:

- **Bhaiya** — for the rules, the rates, the todo list. His voice is Hindi-English, simple, tired.
- **A customer** — for the complaint letter. Their voice is polite, detailed, a little petty.
- **A stranger** — for the love letter. Their voice is hesitant, honest, a little sad.
- **The machine** — for the special DLLs, the `scz.ini`, the batch files. Its voice is formal, precise, and unsettling.

**The rule:** The public files must not *try* to be scary. They are ordinary files. The horror comes from the player reading them **after** they have seen the backroom.

### 14.2 The One Sentence Rule

Every public file must have **one sentence** that makes the player stop, once they know the context.

Examples:

- `rates_1998.doc`: *"Do not touch PC 03."*
- `rules_cardboard.bmp`: *"Do not ask what is in the back room."*
- `complaint_letter.txt`: *"I did not open it. I gave it back."*
- `todo.txt`: *"Do not ask about the floppy. Do not ask about the floppy. Do not ask about the floppy."*
- `scz.ini`: *"PC03_Billing=infinite"*
- `SCZSESSION.BAT`: *"SET SESSION_END=NEVER"*
- `draft.txt`: *"It has been in Temp for 28 years."*
- `do_not_shred.pdf`: *"The file is not corrupted."*
- `final_final.doc`: *"The project is not in this file."*
- `the_chair_manual.pdf`: *"This manual is for the chair you are sitting in."*
- `quiet.dll`: *"The file is not empty."*
- `seat07.dll`: *"The file is being written."*

**If a public file does not have one of these sentences, the file is not done.**

### 14.3 The Bhaiya Test

Before shipping any file, ask: *"Does this make me feel sorry for Bhaiya?"*

If yes, the file is in the right tone. If no, the file is too cold.

### 14.4 What to Never Write

| Don't write | Why |
|---|---|
| Conspiracy content in public files | The public files are the setup. The conspiracy is in `C:\BACKROOM$`. |
| Modern references | This is 1998. |
| Emoji, internet slang | This is 1998. |
| Explanations | The player figures it out. |
| Named wars, real people | Ethical guardrail. |
| Anything that breaks the fourth wall | That happens only in `TECH_CAMERA.DOC`, `THE_PLAYER.DOC`, and the endings. |

---

## 15. Build Notes

### 15.1 Priority Order

If you have **2 hours** for public files, build in this order:

| Order | File | Time | Why |
|---|---|---|---|
| 1 | **`rates_1998.doc`** | 10 min | The first file the player reads |
| 2 | **`tommy.jpg`** | 5 min | The dog. The password hint. |
| 3 | **`bhaiya_1998.jpg`** | 5 min | The photo that sets up Bhaiya |
| 4 | **`complaint_letter.txt`** | 10 min | Comedy, warmth, the floppy |
| 5 | **`judges_note.txt`** | 10 min | The date-aware file |
| 6 | **`SCZSESSION.BAT`** | 5 min | The infinite loop explanation |
| 7 | **`scz.ini`** | 10 min | Contains the backroom path |
| 8 | **`draft.txt`** | 10 min | The love letter |
| 9 | **`todo.txt`** | 5 min | The repeated line |
| 10 | **`quiet.dll`, `seat07.dll`, `eipstein.dll`** | 15 min | The system DLLs |
| 11 | **`the_chair_manual.pdf`** | 10 min | The unreadable manual |
| 12 | **`do_not_shred.pdf`** | 10 min | The unshreddable file |
| 13 | **`final_final.doc`** | 5 min | The empty project file |

**Total: ~2 hours** for the essential public files.

If you have **4 hours**, add:

| Order | File | Time |
|---|---|---|
| 14 | **`bhaiya_2026.jpg`** | 5 min |
| 15 | **`rules_cardboard.bmp`** | 10 min |
| 16 | **`call_03141998.wav`** | 10 min |
| 17 | **`call_03101998.wav`** | 10 min |
| 18 | **`call_11012026.wav`** (unlock) | 10 min |
| 19 | **`AUTOEXEC.BAT`, `SCZSTART.BAT`** | 10 min |
| 20 | **`scan0002.bmp`** | 5 min |

**Total: ~3 hours** for the full public filesystem.

### 15.2 What Not to Build

| Don't build | Why |
|---|---|
| **A full working filesystem** | The virtual filesystem is data, not real files. |
| **Real batch files that run** | The batch files are text. They do not execute. |
| **A working Recycle Bin** | The Recycle Bin has three files. Emptying it triggers a script. |
| **A real floppy driver** | The floppy is a dialog. |
| **A real CD-ROM driver** | The CD-ROM is a dialog. |
| **Modern file preview** | Files open in their apps. |
| **File creation that persists** | All FS mutation is visual or scripted. |

### 15.3 Integration Checklist

Before demo, verify:

- [ ] `C:\My Documents\rates_1998.doc` opens in Notepad
- [ ] `C:\My Documents\tommy.jpg` opens in Paint
- [ ] `C:\My Documents\bhaiya_1998.jpg` opens in Paint
- [ ] `C:\My Documents\complaint_letter.txt` opens in Notepad
- [ ] `C:\My Documents\judges_note.txt` exists on Nov 1, 2026
- [ ] `C:\My Documents\visitor_note.txt` exists on other days
- [ ] `C:\My Documents\bhaiya_2026.jpg` shows same man as 1998
- [ ] `C:\WINDOWS\System\quiet.dll` shows "The file is not empty"
- [ ] `C:\WINDOWS\System\seat07.dll` shows "The file is being written"
- [ ] `C:\WINDOWS\System\eipstein.dll` shows modified today
- [ ] `C:\Program Files\SHREE CYBER ZONE\scz.ini` contains backroom path
- [ ] `C:\Temp\draft.txt` is readable
- [ ] `C:\Temp\todo.txt` has the repeated line
- [ ] `C:\AUTOEXEC.BAT` calls `SCZSTART.BAT`
- [ ] `C:\WINDOWS\System\SCZSESSION.BAT` has the infinite loop
- [ ] `A:\` shows "not accessible"
- [ ] `A:\` shows "waiting" after Eipstein reveal
- [ ] `C:\Recycle Bin\do_not_shred.pdf` restores to itself
- [ ] `C:\Recycle Bin\final_final.doc` is empty
- [ ] `C:\Recycle Bin\the_chair_manual.pdf` cannot be opened
- [ ] `the_chair_manual.pdf` properties show "chair you are sitting in"
- [ ] Emptying Recycle Bin creates `for_you.txt` (or triggers SHRED)
- [ ] Game Studio folder exists with GTA 3 files
- [ ] `C:\WINDOWS\Media\call_*.wav` files open in Media Player
- [ ] `call_11012026.wav` appears after chat logs read

### 15.4 Related Documents

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
| `chats_and_emails.md` | Chat logs, emails, drafts |
| `UIUX.md` | Boot sequence, audio, wallpaper, core functionality |

---

<div align="center">

**The public files are the warmth. The backroom is the cold.**

**Every file is a door. Every door is a choice.**

**Start → Run → `2050`**

</div>

---

**End of `docs_and_files.md`. Ready for the next file: `chats_and_emails.md`.**