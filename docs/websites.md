# websites.md

> **Project:** SHREE CYBER ZONE — PC 03 (ADMIN)
> **For:** Gandhi Hackathon 2026 · OpenLake × Meraz · IIT Bhilai · 1st November 2026
> **Document status:** LOCKED · 24 fake sites · Build-ready
> **Rule:** Every website must be a 1998 website. Tables, Comic Sans, under-construction GIFs, visitor counters, "Best viewed in Netscape" badges. No modern web. Ever.

---

## 0. How to Read This Document

This document specifies every **website** the player can reach through Internet Explorer. It is organized by category:

1. **The Intranet** — `shreecyberzone.local` (the café's own site, the story's home)
2. **The Dark Pages** — hidden URLs that carry the lore
3. **Search Engines** — 1998-era Google, Yahoo, Altavista, Ask Jeeves
4. **E-Commerce** — Amazon 1998, eBay 1998
5. **Portals & News** — Rediff, Indiatimes, MSN, AOL
6. **GeoCities & Personal Pages** — the 1998 personal web
7. **Webmail** — Hotmail 1998, Yahoo Mail 1998
8. **Web Directories** — Yahoo Directory, DMOZ
9. **Easter Egg Pages** — the URLs that are jokes
10. **Build Notes** — the rules of fake-web construction

**Website content is HTML.** Every page is written in 1998-era HTML (tables, `<font>`, `<center>`, `<marquee>`, animated GIFs). Modern HTML/CSS is **not allowed** inside IE pages. This is the whole point.

**All URLs are virtual.** No real network requests. The IE shell (see `applications.md` section 4) routes URLs to internal page components.

---

## 1. The Intranet — `shreecyberzone.local`

The intranet is the café's own homepage. It is the **first page the player sees** when they open Internet Explorer. It is warm, boring, and full of texture.

### 1.1 Homepage — `http://shreecyberzone.local/`

**Page title:** `SHREE CYBER ZONE - Nehru Nagar, Bhilai - Est. 1998`

**Layout:** Table-based, 640px wide, centered. Background `#FFFFFF` with a repeating star background image (a tiny 16×16 tile). Border: `2px outset #C0C0C0`.

**Content:**

```
┌─────────────────────────────────────────────────────────┐
│  [SHREE CYBER ZONE LOGO — animated spinning "S"]        │
│  ═══════════════════════════════════════════════════    │
│                                                         │
│  ★ WELCOME TO SHREE CYBER ZONE ★                        │
│  Nehru Nagar, Bhilai, Chhattisgarh                      │
│  Phone: (0788) 224-1998                                 │
│                                                         │
│  [🚧 UNDER CONSTRUCTION 🚧 — animated GIF]              │
│                                                         │
│  ─────────────  RATES  ─────────────                    │
│  Regular:    ₹10/hour                                   │
│  Night:      ₹15/hour (after 10 PM)                     │
│  Student:    ₹8/hour (with ID)                          │
│  Printing:   ₹2/page                                    │
│  Floppy:     ₹5 (blank, 1.44 MB)                        │
│  ────────────────────────────────────                   │
│                                                         │
│  ★ NOW FEATURING ★                                      │
│  • 12 Pentium II computers                              │
│  • ISDN internet (fast!)                                │
│  • Color printing                                       │
│  • Air conditioned (working on it)                      │
│  • Chai available (₹5)                                  │
│                                                         │
│  ─────────────  LINKS  ─────────────                    │
│  [Rates] [Rules] [Games] [Contact Us]                   │
│                                                         │
│  ═══════════════════════════════════════════════════    │
│                                                         │
│  Best viewed in Netscape Navigator 4.0 at 800x600       │
│  You are visitor number: [000142834]                    │
│                                                         │
│  Copyright (C) 1998 SHREE CYBER ZONE. All rights        │
│  reserved.                                              │
│                                                         │
│  [Email Webmaster] — webmaster@shreecyberzone.local     │
│                                                         │
│  [🔵 Netscape Now!] [🔴 Microsoft IE 4.0]               │
│  [Made with Windows 98] [Y2K COMPLIANT]                 │
└─────────────────────────────────────────────────────────┘
```

**Details:**

- **Logo:** 200×80, animated (spin, glow, or pixel-pulse). If no animated GIF, use CSS `animation` — but keep it janky.
- **Under Construction GIF:** The classic yellow-black barrier GIF. Animated. Must load.
- **Visitor counter:** Six-digit, green-on-black LCD font. Start at `000142834`. **Increments by 1 every time the player visits** — this is a real counter, not static.
- **"Best viewed in Netscape Navigator 4.0":** A period-accurate lie. The café uses IE. It's still there.
- **Footer badges:** 88×31 pixel GIFs — Netscape, IE, "Made with Windows 98," "Y2K Compliant." None of them work. That's the joke.
- **`<marquee>`** at top: `Welcome to Shree Cyber Zone! We are open 9 AM to 11 PM. Chai available.` Scrolls right-to-left. Continuous.

**Easter egg:** Hovering over the visitor counter for 3 seconds shows a tooltip: `This counter has not been reset since 1998.`

### 1.2 Rates Page — `http://shreecyberzone.local/rates`

Same layout. Content is the rates, expanded:

```
┌─────────────────────────────────────────────────────────┐
│  [LOGO]                                                 │
│                                                         │
│  ★ RATES 1998 ★                                         │
│                                                         │
│  ┌───────────────────────────────────┐                  │
│  │ SERVICE              | RATE       │                  │
│  │───────────────────────────────────│                  │
│  │ Regular internet     | ₹10/hour   │                  │
│  │ Night (after 10 PM)  | ₹15/hour   │                  │
│  │ Student (with ID)    | ₹8/hour    │                  │
│  │ Printing (B&W)       | ₹2/page    │                  │
│  │ Printing (Color)     | ₹5/page    │                  │
│  │ Floppy (blank)       | ₹5         │                  │
│  │ Scanning             | ₹10/page   │                  │
│  │ CD burning           | ₹50/disc   │                  │
│  │ Chai                 | ₹5/glass   │                  │
│  │ Cold drink           | ₹10/bottle │                  │
│  └───────────────────────────────────┘                  │
│                                                         │
│  NOTE:                                                  │
│  • No refunds.                                          │
│  • No food at computers.                                │
│  • Do not download "big files." It slows the internet   │
│    for everyone.                                        │
│  • Please don't touch PC 03. That is the admin machine. │
│                                                         │
│  [Back to Home]                                         │
└─────────────────────────────────────────────────────────┘
```

**Easter egg:** The line `Please don't touch PC 03.` is a hyperlink. Clicking it goes nowhere (`href="#"`). Tooltip: `Too late.`

### 1.3 Rules Page — `http://shreecyberzone.local/rules`

Same layout. Content is the house rules — mundane, funny, and a little ominous:

```
★ HOUSE RULES ★

1. Pay before you start. No credit.
2. Do not unplug the machines. They take 5 minutes to boot.
3. Do not download anything over 5 MB. We will know.
4. Do not print anything without permission. We will know.
5. Do not change the wallpaper. We will know.
6. If a machine is slow, tell Bhaiya. Do not restart it yourself.
7. Do not touch PC 03.
8. If you see something strange on PC 03, do not ask about it.
9. If someone asks you to open a floppy, do not open the floppy.
10. Please do not ask what is in the back room.
```

**Rule:** Rules 7–10 are the *entire conspiracy in plain sight.* They are written as house rules. They read as warnings. Nobody reads the rules. The player who reads them will feel their stomach drop.

### 1.4 Games Page — `http://shreecyberzone.local/games`

A list of the games installed on the PCs:

```
★ GAMES AVAILABLE ★

• Solitaire
• Minesweeper
• Wolfenstein 3D
• Doom (shareware)
• Prince of Persia
• Dave
• Skyroads
• Grand Theft Auto (DEMO) ← NEW!

Note: We have 1 licensed copy of each. Please do not install
your own games. We will know.

[Back to Home]
```

**Rule:** "Grand Theft Auto (DEMO) ← NEW!" is the only line in `marquee` tag. It scrolls. The "← NEW!" blinks.

**Easter egg:** The line `Grand Theft Auto (DEMO)` is a hyperlink to `http://shreecyberzone.local/gta_demo`. That page shows:

```
File not found.

The file you are looking for was removed in 1998.

We cannot tell you why.
```

### 1.5 Contact Page — `http://shreecyberzone.local/contact`

```
★ CONTACT US ★

Address:
SHREE CYBER ZONE
Nehru Nagar, Sector 4
Bhilai, Chhattisgarh 490020
India

Phone: (0788) 224-1998
Fax: (0788) 224-1999

Email: bhaiya@shreecyberzone.local

Hours:
Monday-Sunday: 9 AM - 11 PM
Closed on Tuesdays at 3:14 AM

[Send us a message] — form (non-functional)

[Back to Home]
```

**Easter egg:** The line `Closed on Tuesdays at 3:14 AM` is unusual. Hovering shows a tooltip: `The session is still running.`

The "Send us a message" form is a `<form>` with `<input>` fields and a `<submit>` button. Clicking submit shows:

```
Mail delivery failed.
Reason: no recipient is listening.
```

### 1.6 The 404 Page — `http://shreecyberzone.local/[anything-wrong]`

```
Page not found

The page you are looking for does not exist.

If you are looking for something specific, perhaps you
are looking for something else.

[Back to Home]
```

**Rule:** The line "perhaps you are looking for something else" is a hyperlink to `http://shreecyberzone.local/backroom`. It is not highlighted. It is not blue. It is the same color as the body text. Only a player who moves their cursor over the text will find it.

---

## 2. The Dark Pages

These are the URLs the player **must type.** They are not linked from anywhere. They are the discovery path.

### 2.1 The Backroom Page — `http://shreecyberzone.local/backroom`

This is the "dark page" from `README.md`. It is the most important page on the internet.

**Design:** Minimal. A black background, white monospace text, no images. It looks like a page written by someone who did not want to design a page.

```
SHREE CYBER ZONE — INTERNAL

You are not supposed to be here.

[1] PROJECT 2050
[2] EIPSTEIN PROTOCOL
[3] DELAY LEDGER
[4] LEDGER 1998
[5] SEATS
[6] Tuesdays

If you are reading this, the session has already started.
If the session has already started, you are already in it.

Do not print anything.
Do not share anything.
Do not close this page.

— s00
```

**Behavior:** Each numbered link points to a page that does not exist (`[1]` → `http://shreecyberzone.local/backroom/project_2050`), which returns:

```
Access denied.

The file exists. The access does not.

Open it from the machine.
```

**The point:** This page **cannot deliver the lore.** It only tells the player that the lore exists. The player must go back to `C:\BACKROOM$` and open the files through the filesystem. The dark page is a **tease**, not a delivery mechanism.

**This is critical.** If the dark page delivered the files, the player would never explore the filesystem. The filesystem is where the game happens. The dark page only whispers.

### 2.2 The 2050 Page — `http://shreecyberzone.local/2050`

```
PLAN STILL ON SCHEDULE

Phase IV — Succession — is in progress.
All seats accounted for.
SEAT_07 — status: pending.

The session is still running.
The billing timer is still counting.

This page will not update. It does not need to.

— s00
```

**Rule:** This page renders for 4 seconds, then shows the BSOD (same as `Run → 2050`). It cannot be navigated away from.

### 2.3 The Quiet Room Page — `http://quiet.room`

A single-page site. Black background. White text. No navigation. No footer. No nothing.

```
we do not rule.
we schedule.

[there is no form. there is no contact. there is nothing to click.]

we know.
```

**Rule:** This page is a terminal. There is no `<form>`. There is no `<input>`. There is no `<a>`. It is a static page that says *"we know."*

**If the player tries to navigate away**, the Back button works. But the forward history to this page is **removed**. They can type the URL again, but they cannot go back to it via Back/Forward.

### 2.4 The Camera Page — `http://shreecyberzone.local/camera`

```
Camera 03 — Feed

[Static image: a grainy, black-and-white photo of a cyber café counter, 
taken from above. A CRT monitor is visible. A keyboard. A mouse. 
A chair. A figure — back to camera — walking away. No face.]

Status: LIVE
Last recorded motion: [today's date] at [your current time]
Location: Nehru Nagar, Bhilai

If you are reading this page, you are the motion.

— s00
```

**The image is a still.** It is not a live feed. But the timestamp under it updates live. This is the fourth-wall break (see `story.md` section 11, `TECH_CAMERA.DOC`).

**Easter egg:** If the player reloads the page 3 times, the image changes. Same café. Same counter. Same CRT. But now there is **no figure.** It has walked away.

---

## 3. Search Engines

The player can visit search engines from 1998. These are period-accurate recreations, not working searches. **But** typing certain queries returns easter egg results.

### 3.1 Google 1998 — `http://google.com`

**Design:** The 1998 Google homepage. Yes, it existed (as `google.stanford.edu` in 1997, `google.com` in late 1998).

- Centered logo: `Google!` (with exclamation mark — this was real)
- Search input + "Search Google!" button
- Below: `Search the web · I'm feeling lucky`
- Small line: `©1998 Google Inc.`
- **No** "About," "Advertising," "Business," "Privacy" links (those came later)
- **No** doodles
- Table-based layout, no CSS
- Font: Times New Roman, 14px

**Searches:**

| Query | Result |
|---|---|
| `shree cyber zone` | One result: `SHREE CYBER ZONE - Nehru Nagar, Bhilai` (links to intranet) |
| `eipstein` | One result: `EIPSTEIN protocol - file not found` |
| `project 2050` | **No results.** Text: `Your search - "project 2050" - did not match any documents.` Then, 2 seconds later, a line appears below: `Did you mean: what you were looking for?` |
| `quiet room` | One result: `quiet.room` (links to `http://quiet.room`) |
| `bhaiya` | One result: `BHAIYA - owner - SHREE CYBER ZONE` (links to intranet contact page) |
| `gta` | Results: `Grand Theft Auto - Rockstar Games - 1997` (broken link, 404), `GTA - Generational Trajectory Adjustment - [no description]` |
| `tommy` | Results: `tommy.jpg` (linked to intranet), `Tommy - the dog - Bhilai` |
| `bhaiya age` | **No results.** A small `!` appears in the corner. |
| `1998` | 10,000 results. All are generic links to 1998 pages. |

**Easter egg:** Searching for `eipstein` and clicking the result takes you to `http://shreecyberzone.local/backroom` — but the page is **blank.** A single line at the top: `The file is on the machine. Not on the internet.`

### 3.2 Yahoo! 1998 — `http://yahoo.com`

**Design:** The 1998 Yahoo homepage. Classic.

- Top banner ad (fake ad for "WebCrawler" or "GeoCities")
- Yahoo! logo (with the red `!`)
- Categories: `Arts & Humanities, Business & Economy, Computers & Internet, Education, Entertainment, Government, Health, News & Media, Recreation & Sports, Reference, Regional, Science, Social Science, Society & Culture`
- Search bar
- Below: `Shopping - Auctions - Yellow Pages - People Search - Maps - Travel - Classifieds - Personals - Games - Chat - Clubs - Email`
- `In the News:` (3 headlines, period-accurate, fake)
- Footer: `©1998 Yahoo! Inc.`

**Searches:**

| Query | Result |
|---|---|
| `cyber café` | Category: `Computers & Internet > Internet > Cyber Cafés` |
| `bhaiya` | No results |
| `quiet room` | No results |

**Easter egg:** The category `Computers & Internet > Internet > Cyber Cafés` has one listing in India: `SHREE CYBER ZONE - Bhilai`. Clicking it goes to the intranet.

### 3.3 Altavista — `http://altavista.com`

The classic. Simplest design.

- Logo: `AltaVista` with the mountain
- Search box
- `Search · Usenet · Images · Web Directory`
- Line: `The most comprehensive index of the web.`
- Below: `[Translate] [Shopping] [Free Email] [My AltaVista]`

**Searches:** Same as Google. Slightly different results ordering.

**Easter egg:** Searching for `eipstein` returns **one result**: `EIPSTEIN — 8 steps — protocol — [no description]`. Clicking it shows:

```
Document not found.

The file is on the machine.
```

### 3.4 Ask Jeeves — `http://askjeeves.com`

**Design:** The 1998 Ask Jeeves. A butler illustration (or a simple 1998-era cartoon butler).

- Logo: `Ask Jeeves`
- Search box with placeholder: `Type your question here`
- Below: `Example: Where can I find a cyber café in Bhilai?`

**Searches:**

| Query | Result |
|---|---|
| `What is the quiet room?` | `I'm sorry. I don't have an answer to that question.` After 3 seconds: `Perhaps you should ask someone inside it.` |
| `Who is Eipstein?` | `Eipstein is a protocol, not a person. Would you like to know more?` `[Yes] [No]` — clicking `Yes` goes to the backroom dark page. Clicking `No` shows: `The file is on the machine.` |
| `Where is PC 03?` | `PC 03 is behind the counter. It is running. It has been running since 1998.` |
| `How do I leave?` | `You don't.` |

**This is the funniest search engine in the game.** Build it.

---

## 4. E-Commerce

### 4.1 Amazon 1998 — `http://amazon.com`

**Design:** The 1998 Amazon homepage. It was a **bookstore.**

- Logo: `amazon.com` with the `a` and smile arrow (the 1998 version was simpler)
- Tagline: `Earth's Biggest Bookstore`
- Search box: `Search books`
- Left sidebar: categories (`Arts & Literature, Biographies, Business, Children's Books, Computers & Internet, Cooking, Health, History, Music, Mystery, Non-fiction, Romance, Science, Science Fiction, Sports, Travel`)
- Main area: `Featured in Books` — a rotating list (fake book titles)
- Below: `Amazon.com Delivers — Sign up for our free email newsletters`
- Footer: `©1998 Amazon.com, Inc.`

**Featured books (fake):**
- *The Quiet Room: A Bureaucratic History of the 21st Century* — `[no author]` — `[out of stock]`
- *Flying Cars: Why They Were Delayed* — `[out of print]`
- *The EIPSTEIN Protocol: 8 Steps* — `[classified]`
- *Tommy: A Dog's Life in Bhilai* — `₹250` — **(This one works. Clicking it shows a fake product page with a picture of Tommy and a "Buy Now" button that doesn't work.)**

**Easter egg:** Searching for `project 2050` returns:

```
0 results for "project 2050"

Did you mean: "the file is on the machine"?
```

### 4.2 eBay 1998 — `http://ebay.com`

**Design:** The 1998 eBay. It was called `AuctionWeb` until 1997, then `eBay` in 1997. By 1998 it was already recognizable.

- Logo: `eBay` with the multi-colored letters
- Tagline: `The world's online marketplace`
- Categories: `Antiques, Books, Computers, Electronics, Collectibles, Music, Sports, Toys, Everything Else`
- Search box: `Search`
- `Featured Auctions` (fake):
  - `Windows 98 CD (sealed) — ₹400 — 2 bids`
  - `Pentium II 350 — ₹8,000 — 5 bids`
  - `Floppy disk (blank, 1.44 MB) — ₹5 — 12 bids`
  - `PROJECT 2050 (unopened) — ₹— — [no bids]` **(Easter egg)**

**Easter egg:** The `PROJECT 2050 (unopened)` listing is not clickable. The `₹—` bid amount does not update. Hovering over the listing shows a tooltip: `This item was withdrawn by the seller.`

---

## 5. Portals & News

### 5.1 Rediff 1998 — `http://rediff.com`

**Design:** The 1998 Rediff (Indian portal). This is the period-accurate version.

- Logo: `Rediff.com` with the classic red-and-black
- Left sidebar: `News, Business, Cricket, Movies, Chat, Email`
- Main area: `Top Stories` (fake, period-accurate)
- Below: `Cricket — India vs Pakistan — score: 98/2` **(never changes)**
- Footer: `©1998 Rediff.com India Ltd.`

**Top stories (fake):**
- `India's software exports cross ₹10,000 crore`
- `Sachin Tendulkar scores 100th century` (fake — happened later)
- `Cyber cafés boom in small towns`
- `Y2K bug: what you need to know`

**Easter egg:** Clicking `Cyber cafés boom in small towns` opens a fake article:

```
Cyber Cafés Boom in Small Towns

BHILAI: In towns across India, cyber cafés have become the
new community centers. One such café, SHREE CYBER ZONE in
Nehru Nagar, has been open since 1998.

The owner, who goes by "Bhaiya," has not aged in 28 years.
When asked about this, he said: "I do not know why. I have
stopped asking."

The café's admin machine, PC 03, has been running
continuously since 1998. Its billing timer is still
counting.
```

This is **the only place on the internet that acknowledges Bhaiya's age.** It is written as a news article, not a conspiracy file. The tone is normal. The subject is not.

### 5.2 Indiatimes — `http://indiatimes.com`

**Design:** 1998 Indiatimes. Similar to Rediff.

- Logo: `indiatimes.com`
- Top stories (fake, period-accurate)
- Left sidebar: `News, Business, Cricket, Bollywood`
- Footer: `©1998 Times Internet Limited`

**Easter egg:** Clicking `Bollywood` shows a page with a `[404]` error and a single line: `The film you are looking for was delayed.`

### 5.3 MSN 1998 — `http://msn.com`

**Design:** 1998 MSN. The "butterfly" logo was `msn.com`.

- Logo: `msn`
- Top: `Hotmail | Search | Shopping | Money | People & Chat`
- News, weather, sports (fake, period-accurate)
- Footer: `©1998 Microsoft Corporation`

**Easter egg:** Clicking `Search` goes to `http://search.msn.com` which redirects to a page:

```
MSN Search is not available.

Please use Google! instead.
```

(In 1998, Google was newer and smaller. This is a joke about tech history.)

### 5.4 AOL — `http://aol.com`

**Design:** 1998 AOL. The classic.

- Logo: `AOL` with the running man
- `AOL 4.0 is here! Click to download` (broken link)
- Categories, news, chat
- Footer: `©1998 America Online, Inc.`

**Easter egg:** Clicking `AOL 4.0 is here! Click to download` shows:

```
Download failed.

The file is too large for this café's ISDN line.

Please try again in 2050.
```

---

## 6. GeoCities & Personal Pages

GeoCities is **the heart of the 1998 web.** Personal pages, garish backgrounds, visitor counters, webrings, "Best viewed in 800×600."

### 6.1 The GeoCities Portal — `http://geocities.com`

**Design:** The 1998 GeoCities homepage.

- Logo: `GeoCities` with the neon green text
- Categories: `Hollywood, RodeoDrive, SunsetStrip, SiliconValley, Area51, Tokyo, Athens, ...`
- `Featured Neighborhoods` (fake)
- Footer: `©1998 GeoCities`

**Easter egg:** One featured neighborhood is **`Area51`**, with a tagline: `For those who know.`

Clicking `Area51` shows a page:

```
AREA 51
The truth is in the files.
[There are no files here.]
[s00]
```

### 6.2 Tommy's Page — `http://geocities.com/SiliconValley/Pines/1998/tommy.html`

**Design:** A fan page for Tommy the dog. Written by someone who loves Tommy very much.

- Background: A tiled image of bone-shaped dog treats
- Title: `TOMMY'S PAGE!!!` in `<font size="+3" color="red"><b><u>`
- `<marquee>`: `WELCOME TO MY PAGE!!! I AM A GOOD BOY!!!`
- Content:
  ```
  Hi! I am Tommy!
  
  I live at SHREE CYBER ZONE in Bhilai. My human is Bhaiya.
  He is nice. He gives me biscuits.
  
  [IMAGE: tommy.jpg — the same picture from My Documents]
  
  My favourite things:
  • Biscuits
  • Sleeping under the counter
  • Barking at the postman
  • Sitting on the broken chair (nobody else wants it)
  
  My least favourite things:
  • The Tuesday man in the safari suit
  • The floppy disk. I am not allowed to touch it.
  
  Visitor counter: [000000042] ← Updated: 1998
  
  [Sign my guestbook!] [View my webring!]
  ```
- Below: A webring navigator: `< [ Previous ] [ Random ] [ Next ] >`

**Easter egg:** Clicking `Sign my guestbook!` shows a guestbook with one entry:

```
Name: s00
Comment: He is a good boy.
Date: March 3, 1998
```

### 6.3 Bhaiya's Personal Page — `http://geocities.com/SiliconValley/Heights/1998/bhaiya.html`

**Design:** A simple personal page. Less garish than Tommy's.

- Background: Light grey. No tiled image. 
- Title: `Bhaiya's Home Page` in `<font face="Arial" size="4">`
- Content:
  ```
  Hello. My name is Bhaiya. Welcome to my page.
  
  I run a cyber café in Bhilai. We have 12 computers. They
  are good computers. Come visit us.
  
  I have a dog. His name is Tommy. He is also a good dog.
  
  I have been running this café for many years. I do not
  remember how many. The years are long.
  
  I do not have much to say. I am sorry.
  
  — Bhaiya
  
  [Sign my guestbook] [Back to SHREE CYBER ZONE]
  ```
- `<font size="2" color="#666666">Last updated: March 3, 1998</font>`

**Easter egg:** Clicking `Sign my guestbook` shows:

```
[guestbook empty]
```

Two seconds later, a new entry appears:

```
Name: s00
Comment: You are doing fine.
Date: March 3, 1998
```

The player cannot close this entry.

### 6.4 The Tuesday Man's Page — `http://geocities.com/SiliconValley/Heights/1998/tuesday.html`

**Design:** A page that should not exist. Minimal. Suspicious.

- Background: Black
- Title: `<font color="white" face="Courier">tuesday</font>`
- Content:
  ```
  Tuesdays, 6 hours, cash.
  
  The floppy is placed at 3:14 AM.
  The session is not closed.
  The file is not opened.
  
  If you are reading this, you have already been scheduled.
  
  [no counter. no guestbook. no webring.]
  ```
- The page has no footer, no links, no nothing.

**Easter egg:** If the player tries to use the Back button, it works — but the forward history is removed. The page is not in the browser history.

### 6.5 The Webring — `http://geocities.com/webring/cybercafe/`

**Design:** A 1998 webring directory for cyber café websites.

- Title: `Cyber Café Webring`
- List of ~15 fake cyber café websites (all broken links)
- One entry: `SHREE CYBER ZONE — Bhilai — [visits: 142,834]` (links to intranet)
- Bottom: `[← Prev] [List Sites] [Next →] [Random] [Join the Ring]`

**Easter egg:** Clicking `[Random]` takes you to `http://quiet.room`.

### 6.6 The Webmaster's Page — `http://geocities.com/SiliconValley/Heights/1998/webmaster.html`

**Design:** The personal page of whoever "made" the SHREE CYBER ZONE website. They never say who they are.

- Title: `the webmaster`
- Content:
  ```
  I made a website for the café.
  
  I do not work at the café.
  I do not know who asked me to make it.
  I do not remember making it.
  
  But it is there.
  
  — the webmaster
  ```

This is a `P1` egg. It explains nothing. It deepens everything.

---

## 7. Webmail

### 7.1 Hotmail 1998 — `http://hotmail.com`

**Design:** 1998 Hotmail. The classic.

- Logo: `HoTMaiL` (the mixed-case version)
- Tagline: `The World's FREE Web-Based E-mail`
- Login form: `Login Name: [_____] Password: [_____]` `[Sign In]`
- Below: `New to Hotmail? [Sign up now!]`

**Behavior:** Login does nothing. It does not fail, it does not succeed. It just shows a blank white page after a 2-second "loading" spinner.

**Easter egg:** If the player types `GUEST` in the login name and any password:

```
Welcome, GUEST.

You have 1 new message.

From: s00@quiet.room
Subject: [no subject]

You are already in the room.
You do not need email.

Delete this message. It will come back.

Delete it again. It will come back.

There is no way to leave.
```

The delete button does nothing. Refreshing shows the message again. **This is intentional.**

### 7.2 Yahoo Mail 1998 — `http://mail.yahoo.com`

**Design:** 1998 Yahoo Mail login.

- Logo: `Yahoo! Mail`
- Login form: `Yahoo! ID: [_____] Password: [_____]` `[Sign In]`
- Below: `New to Yahoo!? [Sign up now!]`

**Behavior:** Login with any credentials shows:

```
Sign in error.

The account you are looking for does not exist.
Please try again.

(It will not work.)
```

The parenthetical is real. It's in the page source, not visible in the UI. A player who views source will find it.

---

## 8. Web Directories

### 8.1 Yahoo Directory — `http://dir.yahoo.com`

**Design:** The 1998 Yahoo Directory. A hierarchical tree of categories.

- Root: `Arts & Humanities, Business & Economy, Computers & Internet, ...`
- `Computers & Internet > Internet > Cyber Cafés > India > Chhattisgarh > Bhilai`
- One entry: `SHREE CYBER ZONE` (links to intranet)

**Easter egg:** Below the directory tree, a small line:

```
Can't find what you're looking for?
Try searching for it. 
```

The word `searching` is a hyperlink to `http://quiet.room`.

### 8.2 DMOZ — `http://dmoz.org`

**Design:** The 1998 DMOZ (Open Directory Project).

- Logo: `dmoz` with the green-and-black
- Categories
- Footer: `©1998 Netscape Communications Corp.`

**Easter egg:** Searching `quiet room` returns one entry:

```
Quiet Room - [no description] - [no editor] - [submitted: 1998-03-03]
```

Clicking it goes to `http://quiet.room`.

---

## 9. Easter Egg Pages

### 9.1 `http://www.shreecyberzone.com`

**Note:** This URL is different from `http://shreecyberzone.local`. It is the **public** website for the café, and it is **dead.**

**Result:** A browser error page styled like 1998 IE:

```
The page cannot be displayed

The page you are looking for is currently unavailable.
The Web site might be experiencing technical difficulties,
or you may need to adjust your browser settings.

Cannot find server or DNS Error
Internet Explorer
```

**Easter egg:** If the player clicks `Detect Network Settings` at the bottom, a dialog appears:

```
Network Settings

Connected to: SHREE_CYBER_ZONE
Session: 10224 days
Seat: 07

[ OK ]
```

### 9.2 `http://www.gandhi.com`

**Result:** A page that resolves to a very simple site:

```
GANDHI
Artificial Agreement Engine

Status: RUNNING
Uptime: 10224 days
Last tested: [today's date] at [your current time]
Location: [your city]

This page was generated in 0.4 seconds.
You did not notice.

[s00]
```

**Easter egg:** The line `This page was generated in 0.4 seconds.` fades in after 4 seconds. The line `You did not notice.` fades in 2 seconds after that. The `[s00]` appears 2 seconds after that. **The page is timing its reveals to the player's reading.**

### 9.3 `http://www.2050.com`

**Result:** A page that loads a **future desktop** (see Ending 4 in `story.md`).

- The page shows a browser window with a 2050-themed UI
- 3 seconds later, a BSOD appears
- `PLAN STILL ON SCHEDULE`
- Then the page returns to the 1998 IE

### 9.4 `http://www.seat07.com`

**Result:** A blank white page. A single line, centered:

```
acknowledged
```

Nothing else. No footer. No links. No navigation. Just the word.

### 9.5 `http://www.tommy.com`

**Result:** A page with a single image:

```
[IMAGE: tommy.jpg]
```

Below the image: `good boy`.

Below that: `[s00]`.

Nothing else.

### 9.6 `http://www.tuesday.com`

**Result:** A single-page site:

```
Tuesdays.
6 hours.
Cash.

[no further information]
```

### 9.7 `http://www.1998.com`

**Result:** A page that just says:

```
1998

It was a good year.

We were not ready.

[s00]
```

### 9.8 `http://www.shutdown.com`

**Result:** A page that, on load, triggers Ending 1 (SAFE) — the classic orange-text shutdown screen.

**Rule:** This is a one-way path. The player must reload to return to the desktop.

---

## 10. Build Notes

### 10.1 The Rules of Fake-Web Construction

**Do:**

- Use `<table>` for layout. Every page.
- Use `<font>` for text styling. Every page.
- Use `<center>` for centering. Every page.
- Use `<marquee>` for scrolling text. At least 4 pages.
- Use `<blink>` (or CSS animation) for blinking text. At least 2 pages.
- Use `<hr>` for dividers. Every page.
- Use `<br>` for line breaks. No `<p>`.
- Include a "Best viewed in Netscape Navigator" badge on at least 3 pages.
- Include a visitor counter on at least 3 pages.
- Include an "Under Construction" GIF on at least 2 pages.
- Include a webring on at least 2 pages.
- Include a `<mailto:>` link on at least 2 pages.
- Include the `<title>` tag with the café name.
- Use **Comic Sans** on at least 1 page (GeoCities rule).
- Use **Times New Roman** for body text (default browser font).
- Use **Arial** for headings (period-accurate).

**Don't:**

- Use CSS Grid or Flexbox. Tables are the layout.
- Use `border-radius`, `box-shadow`, or `gradient`. Ever.
- Use modern fonts (Inter, Roboto, system-ui). Ever.
- Use any CSS framework. Ever.
- Use emoji. Ever.
- Use modern JavaScript (arrow functions, `const`, `=>` are fine in the *app*, but not in the *pages*).
- Use `fetch()` inside pages. All content is static.
- Use responsive design. Pages are 640px wide, fixed. No mobile.

### 10.2 Image Assets Needed

| Image | Purpose | Style |
|---|---|---|
| `logo.gif` | SHREE CYBER ZONE logo | Animated, 200×80, spinning "S" |
| `under_construction.gif` | Under construction | Yellow-black barrier, animated |
| `visitor_counter.gif` | Visitor counter background | LCD green-on-black |
| `netscape_now.gif` | Netscape badge | 88×31, purple-and-white |
| `ie4.gif` | IE badge | 88×31, blue-and-white |
| `made_with_win98.gif` | Windows 98 badge | 88×31, grey-and-black |
| `y2k.gif` | Y2K compliant badge | 88×31, red-and-yellow |
| `tommy.jpg` | Tommy the dog | Real photo, grainy |
| `bhaiya_1998.jpg` | Bhaiya opening the café | Real photo, grainy |
| `bones_bg.gif` | Tommy's page background | Tiled, bone-shaped dog treats |
| `geocities_logo.gif` | GeoCities logo | Neon green |
| `webring.gif` | Webring navigator | 468×60, classic |
| `hotmail_logo.gif` | Hotmail logo | Red-and-white |
| `yahoo_logo.gif` | Yahoo logo | Red `!` |
| `google_logo.gif` | Google! logo | Blue, with exclamation |

**Total: 15 images.** All can be created in Paint or sourced from public domain 1998 web archives (with attribution).

### 10.3 The Counter is Real

**Rule:** The visitor counter on the intranet homepage must **increment on every visit.** Not fake.

**Implementation:**

```javascript
// In localStorage
let visits = parseInt(localStorage.getItem('scz_visits') || '142834');
visits += 1;
localStorage.setItem('scz_visits', visits.toString());
// Pad to 6 digits
document.getElementById('counter').textContent = visits.toString().padStart(6, '0');
```

This is a **single line** of code that adds enormous authenticity.

### 10.4 What the Player Sees vs. What They Find

| Page | Visible to all | Hidden egg |
|---|---|---|
| Intranet homepage | Yes | Visitor counter tooltip |
| Rates | Yes | `PC 03` hyperlink |
| Rules | Yes | Rules 7–10 |
| Games | Yes | GTA demo 404 |
| Contact | Yes | Tuesday 3:14 AM tooltip |
| 404 | Yes | `backroom` link |
| Backroom | Hidden | Everything |
| 2050 | Hidden | BSOD |
| quiet.room | Hidden | Everything |
| Camera | Hidden | Reload reveals figure gone |
| Google | Yes | `project 2050` no results + follow-up |
| Yahoo | Yes | Cyber café category |
| Altavista | Yes | Eipstein result |
| Ask Jeeves | Yes | Every answer |
| Amazon | Yes | Tommy book, project 2050 search |
| eBay | Yes | PROJECT 2050 listing |
| Rediff | Yes | Cyber café article |
| Indiatimes | Yes | Bollywood 404 |
| MSN | Yes | Redirect to Google |
| AOL | Yes | Download fails, try again in 2050 |
| Tommy's page | Hidden | Guestbook entry |
| Bhaiya's page | Hidden | Guestbook entry |
| Tuesday's page | Hidden | Everything |
| Webmaster's page | Hidden | Everything |
| Webring | Hidden | Random → quiet.room |
| Hotmail | Yes | GUEST login |
| Yahoo Mail | Yes | Source-code parenthetical |
| Yahoo Directory | Yes | Search link to quiet.room |
| DMOZ | Yes | quiet room entry |
| shreecyberzone.com | Yes | Network settings dialog |
| gandhi.com | Hidden | Every reveal |
| 2050.com | Hidden | BSOD |
| seat07.com | Hidden | Everything |
| tommy.com | Hidden | Everything |
| tuesday.com | Hidden | Everything |
| 1998.com | Hidden | Everything |
| shutdown.com | Hidden | Ending 1 |

### 10.5 The Discovery Ladder

The websites should be discoverable in this order:

1. **Intranet homepage** (default IE page) — no typing needed
2. **Intranet links** (rates, rules, games, contact) — clickable
3. **Google / Yahoo / Altavista / Ask Jeeves** — type a URL
4. **Amazon / eBay / Rediff / MSN / AOL** — type a URL
5. **GeoCities pages** — type a URL (or find via directory)
6. **Hotmail / Yahoo Mail** — type a URL
7. **Yahoo Directory / DMOZ** — type a URL
8. **`shreecyberzone.com`** — type a URL (dead site)
9. **`backroom`** — find via 404 page or type a URL
10. **`quiet.room`** — find via Yahoo Directory, webring, or type a URL
11. **`gandhi.com`, `2050.com`, `seat07.com`, `tommy.com`, `tuesday.com`, `1998.com`, `shutdown.com`** — the last eggs

**The websites form a second path through the game.** A player who never opens Explorer can still find the story, but they will find it in fragments. A player who opens both can piece it all together.

### 10.6 Integration with `applications.md`

The IE shell (see `applications.md` section 4) is responsible for:
- The IE window chrome (menu, toolbar, address bar, status bar)
- Back/Forward history
- Fake loading spinner
- Rendering the current page in a content `<div>`

This document is responsible for:
- The **content** of every page
- The **routing** (URL → page)
- The **easter eggs** on each page

### 10.7 File Structure

```
src/
  pages/
    intranet/
      Home.jsx
      Rates.jsx
      Rules.jsx
      Games.jsx
      Contact.jsx
      NotFound.jsx
    dark/
      Backroom.jsx
      2050.jsx
      QuietRoom.jsx
      Camera.jsx
    search/
      Google.jsx
      Yahoo.jsx
      Altavista.jsx
      AskJeeves.jsx
    ecommerce/
      Amazon.jsx
      Ebay.jsx
    portals/
      Rediff.jsx
      Indiatimes.jsx
      MSN.jsx
      AOL.jsx
    geocities/
      TommysPage.jsx
      BhaiyasPage.jsx
      TuesdaysPage.jsx
      WebmastersPage.jsx
      Webring.jsx
    webmail/
      Hotmail.jsx
      YahooMail.jsx
    directories/
      YahooDirectory.jsx
      DMOZ.jsx
    eggs/
      Gandhi.jsx
      2050com.jsx
      Seat07.jsx
      TommyCom.jsx
      TuesdayCom.jsx
      1998Com.jsx
      Shutdown.jsx
      ShreeCyberZoneCom.jsx
  data/
    websites.json   // URL → page component map
```

---

## 11. What Not to Build

| Don't build | Why |
|---|---|
| **A working search engine** | Searches return canned results. The point is the results, not the search. |
| **A real login system** | Logins succeed or fail based on scripted rules. |
| **A real email client** | Hotmail is a 1-message inbox. Nothing else. |
| **A real shopping cart** | Products are static. Buy Now does nothing. |
| **A working form** | Forms always fail. That's the joke. |
| **Modern responsive layout** | Every page is 640px wide, fixed. |
| **Smooth page transitions** | Instant. Win98 style. |
| **Loading skeletons** | Use the fake loading spinner. |
| **Any page that requires JS to render** | Content is static HTML. |

---

## 12. The One Rule of This Document

> **Every website is a prop. Not a destination.**

The player should not spend 45 minutes browsing fake websites. They should spend 45 *seconds* on each, and every second should reward them. The intranet is the anchor. The dark pages are the door. The others are texture, jokes, and the occasional gut-punch.

**Build the websites as if the player will only visit each one once. Make that once count.**

---

## 13. Related Documents

| Document | What it covers |
|---|---|
| `README.md` | Public project overview |
| `story.md` | Full narrative, all endings |
| `easter_eggs.md` | All 61 eggs, prioritized |
| `features.md` | Windows 98 shell spec |
| `applications.md` | IE shell, Notepad, Explorer, etc. |
| `settings.md` | Control Panel, Display Properties |
| `games.md` | Minesweeper, Solitaire, game studio |
| `docs_and_files.md` | Public PC files content |
| `chats_and_emails.md` | Chat logs, emails, drafts |
| `UIUX.md` | Boot sequence, audio, wallpaper, core functionality |

---

<div align="center">

**36 URLs. 24 sites. 1 discovery ladder.**

**Type the URL. Read the page. Feel the room.**

**Start → Run → `2050`**

</div>

---

**End of `websites.md`. Ready for the next file: `settings.md`.**