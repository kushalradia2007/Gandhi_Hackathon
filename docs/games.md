# games.md

> **Project:** SHREE CYBER ZONE — PC 03 (ADMIN)
> **For:** Gandhi Hackathon 2026 · OpenLake × Meraz · IIT Bhilai · 1st November 2026
> **Document status:** LOCKED · 6 playable games · 1 game studio · Build-ready
> **Rule:** Every game must be playable. Every game must be a joke. Every game must be a leash.

---

## 0. How to Read This Document

This document specifies every **game** the build must ship, plus the **Game Studio** — a fictional game development folder that exists on the machine and tells the GTA story. It is organized as:

1. **The Philosophy** — why games matter in this build
2. **The Game Inventory** — every game, prioritized
3. **Minesweeper** — full spec, with the `xyzzy` cheat
4. **Solitaire** — full spec, with the flying cards
5. **Hearts** — optional, the third Win98 game
6. **FreeCell** — optional, the fourth Win98 game
7. **The Game Studio** — the unfinished GTA 3 folder
8. **The Gaming Lore Files** — how the files connect to the games
9. **Game-Related Easter Eggs** — the eggs that live inside games
10. **Build Notes** — priorities, time estimates, what not to build

**Games are not filler.** In this build, they are the **thesis**. The player who laughs at Minesweeper is the player who later reads `GAMING_INDUSTRY.DOC` and stops laughing. The games are the setup. The lore is the punchline.

---

## 1. The Philosophy

### 1.1 Why Games Are in This Build

There are three reasons games exist on PC 03:

1. **Authenticity.** A Windows 98 machine without Minesweeper and Solitaire is not a Windows 98 machine. These games shipped with every copy of Windows. They are as much a part of the OS as the Start button.

2. **Comedy.** Minesweeper is funny. Solitaire is funny. The `xyzzy` cheat is funny. The flying cards on win are funny. These are the moments that make judges laugh before the story gets dark.

3. **Thesis.** In the story's lore, the Quiet Room created GTA — not the video game, but the *protocol* — to capture talented teenagers. The games on this machine are the *evidence*. The player who plays Solitaire is doing exactly what the Quiet Room predicted they would do. The game is the leash.

### 1.2 The One Rule

> **Every game must be playable. Not a screenshot. Not a mock. Playable.**

If a judge clicks Minesweeper and it doesn't work, the build loses credibility. If a judge clicks Minesweeper and it works, the build gains a fan.

### 1.3 The Second Rule

> **Every game must have one easter egg.**

Minesweeper has `xyzzy`. Solitaire has the flying cards. Hearts has the "shooting the moon" cheat. FreeCell has the impossible deal. **The eggs are why the games are in the build.**

---

## 2. The Game Inventory

| # | Game | Priority | Playable | Egg | Build time |
|---|---|---|---|---|---|
| 1 | **Minesweeper** | P0 | Yes | `xyzzy` cheat | 120 min |
| 2 | **Solitaire** | P0 | Yes | Flying cards on win | 180 min |
| 3 | **Hearts** | P2 | Partial | "Shooting the moon" message | 90 min |
| 4 | **FreeCell** | P2 | Partial | Impossible deal #11982 | 90 min |
| 5 | **Game Studio** (GTA 3 folder) | P1 | No — it's files | The GTA protocol reveal | 60 min |
| 6 | **Games page** (intranet) | P1 | No — it's a webpage | GTA demo 404 | 15 min |

**Total estimated: ~9.5 hours.** This is the full game layer. Cut Hearts and FreeCell first if time is short. **Never cut Minesweeper or Solitaire.**

---

## 3. Minesweeper

### 3.1 Purpose

Minesweeper is the **simplest game, the most iconic game, and the home of the `xyzzy` cheat.** It is the first game the player will click. It must work.

### 3.2 Priority

**P0.** Non-negotiable.

### 3.3 Window Layout

```
┌──────────────────────────────────────────────────────┐
│ [mine] Minesweeper                      [_] [□] [X]  │
├──────────────────────────────────────────────────────┤
│ Game  Help                                           │
├──────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────┐ │
│ │ ┌─────┐                                    ┌─────┐│ │
│ │ │ 010 │                                    │ 000 ││ │
│ │ └─────┘                                    └─────┘│ │
│ │ ┌────┐  ┌──────────────────────────────┐  ┌────┐ │ │
│ │ │ 🙂 │  │                              │  │ ⏱  │ │ │
│ │ └────┘  │    [9×9 grid of cells]       │  └────┘ │ │
│ │         │                              │         │ │
│ │         │                              │         │ │
│ │         │                              │         │ │
│ │         └──────────────────────────────┘         │ │
│ └──────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

**Dimensions:**
- Window content: **280×316px** (for Beginner: 9×9 grid)
- Title bar: 18px
- Menu bar: 20px
- Top panel: 40px (mine counter, smiley, timer)
- Grid: 9×9 cells × 16px = 144×144px
- Border: 2px raised bevel around the whole thing

### 3.4 The Grid

**Cell size:** 16×16 pixels.

**Cell states:**

| State | Appearance |
|---|---|
| Hidden | Raised 3D bevel (`#C0C0C0`, top/left white, bottom/right grey) |
| Revealed (empty) | Flat `#C0C0C0`, thin `#808080` border |
| Revealed (number) | Flat `#C0C0C0`, number centered in 11px bold font |
| Revealed (mine) | Flat `#C0C0C0`, a black mine icon (💣 pixel art) |
| Flagged | Hidden bevel + red flag icon |
| Question mark | Hidden bevel + black `?` |
| Pressed (while clicking) | Flat `#C0C0C0` (the "pushed in" state) |

**Number colors (standard Minesweeper):**

| Number | Color |
|---|---|
| 1 | `#0000FF` (blue) |
| 2 | `#008000` (green) |
| 3 | `#FF0000` (red) |
| 4 | `#000080` (navy) |
| 5 | `#800000` (maroon) |
| 6 | `#008080` (teal) |
| 7 | `#000000` (black) |
| 8 | `#808080` (grey) |

### 3.5 The Top Panel

**Left: Mine counter**
- A 3-digit LED display (green-on-black, 7-segment style)
- Starts at `010` (10 mines for Beginner)
- Decrements by 1 for each flag placed
- Can go negative (`-01`, `-02`)

**Center: Smiley face**
- A 24×24 pixel smiley
- Default: `🙂` (normal smile)
- While clicking (mouse held down): `😮` (surprised — the "O" face)
- On win: `😎` (sunglasses)
- On loss: `😵` (dead X eyes)

**Right: Timer**
- A 3-digit LED display
- Starts at `000`
- Starts counting when the first cell is clicked
- Stops on win or loss
- Maximum display: `999`

### 3.6 Menus

| Menu | Items |
|---|---|
| **Game** | New, Beginner, Intermediate, Expert, Custom..., Marks (?), Color, Sound, Best Times..., Exit |
| **Help** | Contents, Search for Help on..., Using Help, About Minesweeper |

**Working items:**
- `New` — starts a new game
- `Beginner` — 9×9, 10 mines
- `Intermediate` — 16×16, 40 mines
- `Expert` — 30×16, 99 mines
- `Custom...` — opens a dialog for rows, columns, mines (visual only — defaults to Beginner)
- `Marks (?)` — toggles right-click cycle between flag → question mark → empty
- `Exit` — closes the window

**Best Times...** — opens a dialog:

```
Fastest Mine Sweepers

Beginner:     999 seconds   [Name]
Intermediate: 999 seconds   [Name]
Expert:       999 seconds   [Name]

[ Reset Scores ]  [ OK ]
```

**The easter egg:** The names are not "Anonymous." They are:

```
Beginner:     003 seconds   SEAT_00
Intermediate: 008 seconds   EIPSTEIN
Expert:       014 seconds   PROPRIETOR
```

**These times are impossible.** 3 seconds for Beginner is not achievable. The player who looks at Best Times will see that the machine's records were set by people who do not exist.

### 3.7 Game Logic

**First click is always safe.** The board is generated after the first click, ensuring the clicked cell is empty (0 adjacent mines).

**Win condition:** All non-mine cells are revealed.

**Loss condition:** A mine is revealed.

**Flagging:** Right-click cycles through flag → question mark → empty (if Marks is on) or flag → empty (if Marks is off).

**Chord (middle-click):** If a revealed number has the correct number of flags adjacent, middle-clicking reveals all non-flagged adjacent cells. **This must work.**

**Flood fill:** Clicking an empty cell (0 adjacent mines) reveals all connected empty cells and their numbered borders.

### 3.8 The `xyzzy` Cheat

**The legend:** In the real Windows 98 Minesweeper, typing `xyzzy` then holding `Shift+Enter` and moving the mouse over a cell would make a single pixel in the top-left corner of the screen change color. White meant the cell was safe. Black meant it was a mine.

**Our version:**

**Trigger:** Type `xyzzy` while the Minesweeper window is focused. There is no visible confirmation.

**Effect:** A **single pixel** in the top-left corner of the screen (position 0, 0 in the viewport) changes color when the mouse hovers over a cell:
- **White** (`#FFFFFF`) if the cell is safe
- **Black** (`#000000`) if the cell is a mine

**Implementation:**

```javascript
// A 1×1 div, absolutely positioned at (0, 0)
let pixel = document.createElement('div');
pixel.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;background:#FFFFFF;z-index:9999;';
document.body.appendChild(pixel);

let xyzzyActive = false;
let keyBuffer = '';

document.addEventListener('keydown', (e) => {
  if (!minesweeperWindow.focused) return;
  keyBuffer += e.key;
  if (keyBuffer.endsWith('xyzzy')) {
    xyzzyActive = true;
  }
  if (keyBuffer.length > 10) keyBuffer = keyBuffer.slice(-10);
});

// On cell hover:
cell.addEventListener('mouseenter', () => {
  if (!xyzzyActive) return;
  pixel.style.background = cell.hasMine ? '#000000' : '#FFFFFF';
});
```

**Rule:** The pixel is **1×1**. It is the top-left pixel of the screen. Most players will never see it. The player who knows the legend will check.

**Easter egg within the easter egg:** After `xyzzy` has been active for 60 seconds, the pixel changes to a **third color** — a faint yellow `#FFFF00` — and a tiny tooltip appears at the corner: `You know the cheat.`

Then the pixel returns to white/black. The `xyzzy` cheat continues to work.

### 3.9 The Loss Screen

When the player clicks a mine:

1. All mines are revealed.
2. The clicked mine has a **red background** (`#FF0000`).
3. Incorrectly flagged cells show an `X` over the mine (red `X`).
4. The smiley face becomes `😵`.
5. The timer stops.
6. A brief delay (500ms) before the game is officially over.

**No dialog box.** The real Minesweeper does not show a dialog on loss. It just shows the board.

### 3.10 The Win Screen

When the player reveals all non-mine cells:

1. All mines are auto-flagged.
2. The smiley face becomes `😎`.
3. The timer stops.
4. A dialog appears:

```
┌──────────────────────────────────┐
│ [smiley] Congratulations!  [X]   │
├──────────────────────────────────┤
│                                  │
│ You have the fastest time for    │
│ Beginner level.                  │
│                                  │
│ What name do you want to use?    │
│                                  │
│ [_________________________]      │
│                                  │
│           [ OK ]  [ Cancel ]     │
└──────────────────────────────────┘
```

**If the player enters a name:** The Best Times dialog is updated with the player's name. But — **the machine's records (`SEAT_00`, `EIPSTEIN`, `PROPRIETOR`) are not replaced.** The player's name is added to a separate list:

```
Fastest Mine Sweepers

Beginner:     003 seconds   SEAT_00
Intermediate: 008 seconds   EIPSTEIN
Expert:       014 seconds   PROPRIETOR
-----------
Other players:
              [XX] seconds  [Player Name]
```

The player's time is always `[XX]` — literally the string "XX". It cannot be parsed. The machine does not acknowledge the player's record as real.

### 3.11 The `xyzzy` + Best Times Egg

If the player has activated `xyzzy` and then opens `Best Times...`, the names change:

```
Beginner:     003 seconds   YOU
Intermediate: 008 seconds   YOU
Expert:       014 seconds   YOU
```

All three names are `YOU`. This is visible for 3 seconds, then reverts.

### 3.12 Build Notes

- **Do:** Implement the full game logic. This is not optional.
- **Do:** Use a `<table>` or CSS grid for the cells. 16×16 cells with 3D bevels.
- **Do:** Implement flood fill correctly. This is the most important algorithm.
- **Do:** Implement chord (middle-click). This is the power-user feature.
- **Do:** Make the `xyzzy` cheat work exactly as described — 1 pixel, top-left corner.
- **Don't:** Add a "first click always safe" dialog. Just implement it silently.
- **Don't:** Use modern UI. This is 1998. The smiley is pixel art. The LEDs are 7-segment.
- **Priority:** Grid rendering > click logic > mine placement > flood fill > win/loss > flagging > chord > xyzzy > best times.

**Estimated: 120 min.**

---

## 4. Solitaire

### 4.1 Purpose

Solitaire is the **second most iconic game** in the build. It is also the **biggest build investment** — a full Solitaire implementation is complex. But the payoff is enormous: the flying cards on win are one of the most satisfying moments in 1998 gaming.

### 4.2 Priority

**P0.** Non-negotiable.

### 4.3 Scope Decision

**Full Solitaire (Klondike) is hard.** A complete implementation with drag-and-drop, valid move checking, auto-complete, and the flying cards animation is ~8 hours of work. That is too much for a hackathon.

**Recommended scope:**

| Feature | Priority |
|---|---|
| **Deal a full Klondike game** | P0 |
| **Draw 3 cards from stock** | P0 |
| **Move cards between tableau piles** | P0 |
| **Move cards to foundation piles** | P0 |
| **Validate moves** (alternating colors, descending ranks) | P0 |
| **Win detection** (all 4 foundations complete) | P0 |
| **Flying cards animation on win** | P0 |
| **Undo** | P1 |
| **Draw 1 vs Draw 3 toggle** | P2 |
| **Sound** | P2 |
| **Score / timer** | P2 |

**Rule:** Ship the P0 features. The flying cards are non-negotiable. The rest is optional.

### 4.4 Window Layout

```
┌──────────────────────────────────────────────────────────────┐
│ [cards] Solitaire                              [_] [□] [X]   │
├──────────────────────────────────────────────────────────────┤
│ Game  Deal  Help                                             │
├──────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────────┐ │
│ │  ┌──┐  ┌──┐  ┌──┐  ┌──┐        ┌──┐  ┌──┐  ┌──┐  ┌──┐  │ │
│ │  │  │  │  │  │  │  │  │        │  │  │  │  │  │  │  │  │ │
│ │  └──┘  └──┘  └──┘  └──┘        └──┘  └──┘  └──┘  └──┘  │ │
│ │  Empty Foundation piles          Stock          Waste    │ │
│ │                                                          │ │
│ │  ┌──┐  ┌──┐  ┌──┐  ┌──┐  ┌──┐  ┌──┐  ┌──┐              │ │
│ │  │  │  │  │  │  │  │  │  │  │  │  │  │  │              │ │
│ │  │  │  │  │  │  │  │  │  │  │  │  │  │  │              │ │
│ │  │  │  │  │  │  │  │  │  │  │  │  │  │  │              │ │
│ │  └──┘  └──┘  └──┘  └──┘  └──┘  └──┘  └──┘              │ │
│ │  Tableau piles (7)                                       │ │
│ └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

**Dimensions:**
- Window content: **~620×440px**
- Card size: **71×96px** (the standard Win98 Solitaire card size)
- Card overlap (tableau): **20px** vertical between face-up cards
- Card overlap (waste): **20px** horizontal
- Stock: top-right, 4 cards stacked face-down
- Waste: to the left of stock, up to 3 cards visible (Draw 3)
- Foundations: top-left, 4 empty piles

### 4.5 Card Design

**Cards are drawn with CSS**, not images. Each card is a `<div>` with:
- White background (`#FFFFFF`)
- 1px black border (`#000000`)
- Rounded corners: **0px** (Win98 cards had sharp corners)
- Rank and suit in the top-left corner (and bottom-right, inverted)
- Center suit symbol (large)

**Suits:**
- ♠ Spades (black `#000000`)
- ♥ Hearts (red `#FF0000`)
- ♦ Diamonds (red `#FF0000`)
- ♣ Clubs (black `#000000`)

**Ranks:** A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K.

**Font:** 11px MS Sans Serif for rank, or a pixel font for authenticity.

**Card back:** A blue-and-white pattern (the classic Win98 "castle" back, or a simpler repeating pattern).

### 4.6 Game Setup (Klondike)

**Deal:**
- Tableau pile 1: 1 card (face-up)
- Tableau pile 2: 2 cards (1 face-down, 1 face-up)
- Tableau pile 3: 3 cards (2 face-down, 1 face-up)
- Tableau pile 4: 4 cards (3 face-down, 1 face-up)
- Tableau pile 5: 5 cards (4 face-down, 1 face-up)
- Tableau pile 6: 6 cards (5 face-down, 1 face-up)
- Tableau pile 7: 7 cards (6 face-down, 1 face-up)

**Stock:** Remaining 24 cards, face-down.

**Draw mode:** Draw 3 (default Win98) or Draw 1.

### 4.7 Rules

**Moving cards:**
- A card can be moved onto another card if:
  - The moving card's rank is one less than the target card's rank
  - The colors alternate (red on black, black on red)
- A card can be moved to an empty tableau pile if it is a King.
- An Ace can be moved to an empty foundation pile.
- A card can be moved to a foundation if it is the next rank of the same suit.

**Revealing:** When the top card of a tableau pile is moved, the face-down card beneath it flips face-up.

**Stock:** Clicking the stock draws 3 cards (or 1) to the waste pile. When the stock is empty, clicking it recycles the waste back into the stock (up to 3 passes by default in Win98).

**Winning:** All 52 cards are in the 4 foundation piles (Ace through King, one suit per pile).

### 4.8 Interactions

| Interaction | Result |
|---|---|
| Click stock | Draw cards to waste |
| Click waste top card | If valid, auto-move to foundation or tableau |
| Drag a card | Move to valid pile |
| Drag a stack of cards | Move the whole stack if the sequence is valid |
| Double-click a card | Auto-move to foundation if possible |
| Right-click | Nothing (Win98 did not have right-click in Solitaire) |

**Drag-and-drop implementation:**

- `mousedown` on a card: record the card and its position.
- `mousemove`: create a floating ghost of the card(s) that follows the cursor.
- `mouseup`: check if the drop target is a valid pile. If yes, move. If no, return to origin.

**The drag ghost must be the actual card(s)**, not a semi-transparent placeholder. Win98 Solitaire dragged the real card.

### 4.9 Win Animation — The Flying Cards

**This is the point.** When the player wins:

1. **All cards are revealed.** (If the player wins with cards still face-down, they flip.)
2. **A 500ms pause.**
3. **Cards begin flying off the top of the window**, one by one, in a stream.
4. Each card follows a **sine wave** path across the screen, bouncing off the edges.
5. The cards trail behind each other, leaving a colorful stream.
6. The animation continues until all cards have flown.
7. **The screen clears.**
8. A dialog appears:

```
┌──────────────────────────────────┐
│ [cards] Congratulations!  [X]    │
├──────────────────────────────────┤
│                                  │
│ You won!                         │
│                                  │
│ Time: 03:14                      │
│ Moves: 142                       │
│                                  │
│           [ Play Again ]         │
└──────────────────────────────────┘
```

**The flying cards animation:**

```javascript
function animateWin(cards) {
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.cssText = 'position:fixed;top:0;left:0;z-index:9999;pointer-events:none;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let activeCards = cards.map((card, i) => ({
    x: card.x,
    y: card.y,
    vx: (Math.random() - 0.5) * 20,
    vy: (Math.random() - 0.5) * 20 - 5,
    rotation: Math.random() * 360,
    vr: (Math.random() - 0.5) * 10,
    delay: i * 50,
    image: renderCardToImage(card),
  }));

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let allGone = true;
    activeCards.forEach(c => {
      if (c.delay > 0) { c.delay -= 16; allGone = false; return; }
      c.x += c.vx;
      c.y += c.vy;
      c.vy += 0.5; // gravity
      c.rotation += c.vr;
      // Bounce off edges
      if (c.x < 0 || c.x > canvas.width) c.vx *= -1;
      if (c.y > canvas.height + 100) return; // gone
      allGone = false;
      // Draw card
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.rotation * Math.PI / 180);
      ctx.drawImage(c.image, -35, -48);
      ctx.restore();
    });
    if (!allGone) requestAnimationFrame(frame);
    else {
      canvas.remove();
      showWinDialog();
    }
  }
  frame();
}
```

**Rule:** The animation must **bounce off the edges.** This is what makes it iconic.

### 4.10 Special: The Impossible Win

If the player wins and then starts a **new game**, the new deal is **always a winnable deal** (Solitaire deals are randomly generated, but some are unwinnable; the build should shuffle until it gets a winnable one, or just generate random and hope).

**The easter egg:** On the **third consecutive win**, the win dialog changes:

```
┌──────────────────────────────────┐
│ [cards] Congratulations!  [X]    │
├──────────────────────────────────┤
│                                  │
│ You won!                         │
│                                  │
│ Time: 03:14                      │
│ Moves: 142                       │
│                                  │
│ You are very good at this game.  │
│                                  │
│           [ Play Again ]         │
└──────────────────────────────────┘
```

Then, after 3 seconds, a second line appears:

```
You have played this game before.
```

Then, after 3 more seconds:

```
You will play it again.
```

The "Play Again" button still works. The game continues.

### 4.11 The Draw 3 vs Draw 1 Toggle

In the `Game → Options` menu:

```
┌──────────────────────────────────┐
│ Options                    [X]   │
├──────────────────────────────────┤
│ Draw:                            │
│  (•) Draw three                  │
│  ( ) Draw one                    │
│                                  │
│ Scoring:                         │
│  (•) Standard                    │
│  ( ) Vegas                       │
│  ( ) None                        │
│                                  │
│ [✓] Keep score                   │
│ [✓] Timed game                   │
│                                  │
│           [ OK ]  [ Cancel ]     │
└──────────────────────────────────┘
```

**Draw 1 vs Draw 3** changes the draw mode for the next game. **It works.**

**Scoring:** Standard, Vegas, None. **None is the default.** The status bar shows `Score: 0` when None is selected.

### 4.12 Build Notes

- **Do:** Use CSS for cards. No images needed.
- **Do:** Implement the flying cards animation. This is the payoff.
- **Do:** Implement drag-and-drop with a real drag ghost.
- **Don't:** Implement "auto-complete" (the feature that finishes the game for you when all cards are in order). It's optional.
- **Don't:** Add sound. Win98 Solitaire had no sound.
- **Priority:** Deal > draw from stock > tableau moves > foundation moves > win detection > flying cards > three-win easter egg > undo > options.

**Estimated: 180 min.** This is the biggest single build item in the entire game. If you have to cut a game, cut Hearts or FreeCell — **never cut Solitaire.**

---

## 5. Hearts

### 5.1 Purpose

Hearts is the **third Win98 game.** It is included for authenticity. If time is short, it can be replaced with a "not available" dialog that still feels period-accurate.

### 5.2 Priority

**P2.** Cut if time is short.

### 5.3 Window Layout

```
┌──────────────────────────────────────────────────────────────┐
│ [heart] Hearts                                 [_] [□] [X]   │
├──────────────────────────────────────────────────────────────┤
│ Game  Help                                                   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│              [Player 2's cards — face down]                   │
│              [  🂠 ] [  🂠 ] [  🂠 ] ...                      │
│                                                              │
│  [P3]                                            [P4]        │
│  [cards]                                        [cards]     │
│                                                              │
│              [Your cards — face up]                          │
│              [🂡] [🂢] [🂣] [🂤] [🂥] ...                      │
│                                                              │
│  Score:   You: 0   P2: 0   P3: 0   P4: 0                     │
└──────────────────────────────────────────────────────────────┘
```

### 5.4 Scope Decision

**Full Hearts is hard.** Four-player card game with AI opponents, passing phase, trick-taking logic, scoring, and shooting the moon.

**Recommended scope:** **Do not build the full game.** Instead, build a **Hearts window that looks correct** and shows a dialog:

```
┌──────────────────────────────────┐
│ Hearts                     [X]   │
├──────────────────────────────────┤
│                                  │
│ Hearts is not available.         │
│                                  │
│ The game requires 4 players.     │
│                                  │
│ You are the only player.         │
│                                  │
│           [ OK ]                 │
└──────────────────────────────────┘
```

**This is funnier than a half-built Hearts.** The machine acknowledges that the player is alone.

### 5.5 The Easter Egg

After clicking `OK`, the Hearts window stays open (empty). After 10 seconds, a line appears in the status bar:

```
Waiting for other players... (3 seats available)
```

Then, after 10 more seconds:

```
Waiting for other players... (3 seats available)
```

This line repeats forever, unchanged. The machine is patient. The player is not.

### 5.6 Build Notes

- **Do:** Draw the Hearts window with the correct layout (empty card slots).
- **Do:** Show the "not available" dialog.
- **Do:** Show the waiting status bar.
- **Don't:** Implement the game.
- **Priority:** Window > Dialog > Status bar.

**Estimated: 20 min** (for the "not available" version). **90 min** if you actually build Hearts, which you should not.

---

## 6. FreeCell

### 6.1 Purpose

Same as Hearts. Included for authenticity, scoped to be funny.

### 6.2 Priority

**P2.** Cut if time is short.

### 6.3 Window Layout

```
┌──────────────────────────────────────────────────────────────┐
│ [cards] FreeCell                               [_] [□] [X]   │
├──────────────────────────────────────────────────────────────┤
│ Game  Help                                                   │
├──────────────────────────────────────────────────────────────┤
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐      ┌──┐ ┌──┐ ┌──┐ ┌──┐              │
│  │  │ │  │ │  │ │  │      │ A│ │ 2│ │ 3│ │ 4│              │
│  └──┘ └──┘ └──┘ └──┘      └──┘ └──┘ └──┘ └──┘              │
│  Free cells                 Foundations                      │
│                                                              │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐                   │
│  │  │ │  │ │  │ │  │ │  │ │  │ │  │ │  │                   │
│  │  │ │  │ │  │ │  │ │  │ │  │ │  │ │  │                   │
│  │  │ │  │ │  │ │  │ │  │ │  │ │  │ │  │                   │
│  └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘                   │
│  Tableau piles (8)                                           │
└──────────────────────────────────────────────────────────────┘
```

### 6.4 Scope Decision

**Same as Hearts: do not build the full game.** Build a window that shows:

```
┌──────────────────────────────────┐
│ FreeCell                   [X]   │
├──────────────────────────────────┤
│                                  │
│ Game #: [ 11982 ]   [ New Game ] │
│                                  │
│ FreeCell is not available.       │
│                                  │
│ The deal cannot be solved.       │
│                                  │
│           [ OK ]                 │
└──────────────────────────────────┘
```

### 6.5 The Easter Egg — Deal #11982

**Deal #11982 is the only unsolvable deal in the standard FreeCell set.** This is a real thing. In every copy of Windows, deal #11982 cannot be won.

**The joke:** The machine has been sitting on this deal since 1998. It cannot be solved. The player cannot solve it either.

**Behavior:** The game number field shows `11982` by default. Clicking `New Game` shows:

```
Cannot start a new game.

The deal is still #11982.

It has always been #11982.

[ OK ]
```

### 6.6 Build Notes

- **Do:** Build the window.
- **Do:** Show the "not available" dialog.
- **Do:** Show `11982` in the game number field.
- **Priority:** Window > Dialog > 11982 easter egg.

**Estimated: 20 min** (for the "not available" version).

---

## 7. The Game Studio — `C:\My Documents\Game Studio\`

### 7.1 Purpose

**The Game Studio is the bridge between the games and the lore.** It is a folder on the machine that contains the **unfinished GTA 3** — an actual game project that was in development in 1998. It is the artifact that makes the GTA protocol real.

### 7.2 Priority

**P1.** This is the storytelling payoff of having games in the build.

### 7.3 Location

```
C:\My Documents\Game Studio\
```

This folder is **visible by default** — it is not hidden like `C:\BACKROOM$`. But it is not on the desktop. The player finds it by exploring `My Documents`.

### 7.4 Folder Contents

```
Game Studio\
├── README.TXT
├── GTA_3\
│   ├── GTA3.EXE
│   ├── DESIGN.DOC
│   ├── ASSETS\
│   │   ├── player_sprite.bmp
│   │   ├── car_sprite.bmp
│   │   ├── city_map.bmp
│   │   └── font_8px.bmp
│   └── BUILD_LOG.TXT
├── GTA_4\
│   └── [empty — folder is named but empty]
├── GTA_5\
│   └── [empty]
├── GTA_6\
│   └── [empty]
└── GTA_7\
    └── [empty]
```

### 7.5 `README.TXT`

```
GAME STUDIO

This folder contains the work-in-progress files for
Project GTA.

GTA = Generational Trajectory Adjustment

Do not distribute.
Do not open without permission.
Do not ask why there are seven folders.

— s00
```

**Rule:** The README uses the same voice as the backroom files. It is the first hint that the Game Studio is not what it appears.

### 7.6 `GTA_3\GTA3.EXE`

**Double-clicking this file** shows a dialog:

```
GTA3.EXE

Cannot run this program.

The game is not complete.

The game is 0% complete.

The game has been 0% complete since 1998.

[ OK ]
```

**The joke:** GTA 3 was released in 2001. But on this machine, it was in development in 1998 and is 0% complete. The player will laugh. Then they will think about it.

### 7.7 `GTA_3\DESIGN.DOC`

This is **the most important file in the Game Studio.** It opens in Notepad.

```
GTA 3 — DESIGN DOCUMENT
Project: Generational Trajectory Adjustment
Phase 3: Capture

STATUS: IN PROGRESS (0%)

OBJECTIVE
The player is a young person in a city. They are given
freedom. They are given goals. They are given a sandbox.

They will not leave the sandbox.

MECHANICS
- Open world: The player goes where they want.
- Missions: The player is given objectives.
- Vehicles: The player steals them. This is rewarded.
- Time: The player loses track of it.
- Money: The player accumulates it. It does not matter.
- Reputation: The player builds it. It means nothing.

The game is designed so that the player cannot "finish" it.
The player can only stop playing.

When the player stops playing, they will feel empty.
This is intentional.

When the player feels empty, they will play again.

RECRUITMENT
The player who finishes all missions is a candidate.
The player who finds all secrets is a candidate.
The player who writes about the game is a candidate.

The game is not the goal. The game is the filter.

PHASE 3 GOAL
Retain 90% of players for 40+ hours.
Retain 10% of players for 100+ hours.
Identify the 1% who never stop.

These are SEAT_07.
```

**This is the reveal.** The Game Studio is not a game development folder. It is a **recruitment pipeline.** GTA 3 was never a game. It was a way to find people who could not be distracted from a goal. The player who reads this file will realize they were one of those people.

### 7.8 `GTA_3\BUILD_LOG.TXT`

```
BUILD LOG — GTA 3

1998-03-03   Project started. 0% complete.
1998-03-10   Project started. 0% complete.
1998-03-17   Project started. 0% complete.
1998-03-24   Project started. 0% complete.
1998-03-31   Project started. 0% complete.
...
[repeating every Tuesday for 1,428 weeks]
...
2026-11-01   Project started. 0% complete.
```

**The build log has 1,428 entries.** Every Tuesday. Every week. For 28 years. The project is always "0% complete." It is never updated. It is never abandoned. It is always started.

**The joke:** The project is not a game. It is a **ritual.** Every Tuesday, someone sits down and starts the project again. They never finish it. They never intend to.

### 7.9 `GTA_3\ASSETS\` Folder

Contains four fake asset files:

| File | Description | Size |
|---|---|---|
| `player_sprite.bmp` | A tiny 16×16 pixel art of a person. It looks like a generic sprite. Opening it in Paint shows a pixelated figure. | 1 KB |
| `car_sprite.bmp` | A tiny 16×16 pixel art of a car. | 1 KB |
| `city_map.bmp` | A 256×256 pixel map of a city. It is mostly empty. | 8 KB |
| `font_8px.bmp` | An 8×8 pixel font sheet. | 2 KB |

**The `player_sprite.bmp`:** The sprite is a **tiny person with no face.** Opening it in Paint, the player can zoom in. The sprite's head is a solid color. There are no eyes. **It could be anyone.** It could be the player.

### 7.10 The Empty Folders

`GTA_4`, `GTA_5`, `GTA_6`, `GTA_7` are **named** but **empty**.

**Double-clicking any of them** opens an empty folder. The status bar says `0 object(s)`.

**The joke:** The folders for GTA 4, 5, 6, and 7 exist. They are empty. But they are named. Someone created them. Someone planned for them. **The plan is not just one game. It is a series.**

**Easter egg:** Right-clicking `GTA_7` → Properties shows:

```
GTA_7 Properties

Type:        Folder
Location:    C:\My Documents\Game Studio
Size:        0 bytes
Created:     3/3/1998
Modified:    3/3/1998

Attributes:
[ ] Read-only
[ ] Hidden
[✓] Archive

[ OK ]
```

The folder was **created on 3/3/1998** — the same day as the Session Log's first entry. Someone knew in 1998 that there would be a GTA 7.

### 7.11 The Seventh Folder

**After the player has read all chat logs** (the same unlock as mIRC), a new folder appears:

```
GTA_8\
```

It is empty. Its properties show:

```
GTA_8 Properties

Created:     [today's date]
Modified:    [today's date]

Attributes:
[ ] Read-only
[ ] Hidden
[✓] Archive

[ OK ]
```

**The folder was created today.** It was created by someone. It was created for someone.

### 7.12 The Game Studio Build Notes

- **Do:** Create the folder structure exactly as specified.
- **Do:** Write the `DESIGN.DOC` and `BUILD_LOG.TXT` files.
- **Do:** Make `GTA3.EXE` show the "not complete" dialog.
- **Do:** Make the empty folders openable and show their properties.
- **Do:** Add `GTA_8` after all chat logs are read.
- **Don't:** Make the `.EXE` actually run anything.
- **Priority:** Folder structure > DESIGN.DOC > BUILD_LOG.TXT > README.TXT > .EXE dialog > empty folder properties > GTA_8.

**Estimated: 60 min.**

---

## 8. The Gaming Lore Files

These files are **already specified** in `chats_and_emails.md` and `docs_and_files.md`. This section is the **summary** of how they connect to the games.

### 8.1 `TECH\GAMING_INDUSTRY.DOC`

**Location:** `C:\BACKROOM$\TECH\GAMING_INDUSTRY.DOC`

**Content summary:**

> The most dangerous person in the world is a talented teenager with a goal.
>
> The four pillars of a distraction product:
> 1. **Progress.** Give them a bar to fill.
> 2. **Identity.** Let them choose who they are.
> 3. **Community.** Give them a group that needs them.
> 4. **Fear of Leaving.** Make them feel that leaving is a betrayal.
>
> They got what they paid for. They paid for the wrong question.

**Connection to the build:** This file is the **thesis** of the game layer. The player who plays Solitaire is filling a progress bar. The player who plays Minesweeper is choosing an identity. The player who plays GTA 3 is part of a community. The player who plays any game on this machine is the target.

### 8.2 `TECH\TECH_GTA_PROTOCOL.DOC`

**Location:** `C:\BACKROOM$\TECH\TECH_GTA_PROTOCOL.DOC`

**Content summary:**

> **GTA = Generational Trajectory Adjustment.**
>
> Not Grand Theft Auto. The game was a cover story. The protocol was formalized in 1998 under the cover name.
>
> **G — Generational:** Each generation is captured by a different product.
> **T — Trajectory:** The product directs the player's life path.
> **A — Adjustment:** The path is adjusted to match the Quiet Room's needs.
>
> Five phases:
> 1. **Awareness.** The player hears about the game.
> 2. **Desire.** The player wants the game.
> 3. **Capture.** The player buys the game.
> 4. **Retention.** The player cannot stop playing.
> 5. **Succession.** The player becomes the next generation.
>
> They thought they were escaping. They were arriving.

**Connection to the build:** This is the **second acronym reveal.** The player who reads this file will never look at a video game the same way again. The Game Studio folder is the **physical evidence** that GTA was a protocol, not a game.

### 8.3 `TECH\GAME_GENRES.DOC`

**Location:** `C:\BACKROOM$\TECH\GAME_GENRES.DOC`

**Content summary:**

> Six genres with their function:
>
> | Genre | Function | Target |
> |---|---|---|
> | Open-world crime | Autonomy | Talented teenagers |
> | Fantasy violence | Power | Angry teenagers |
> | Strategy / empire | Control | Ambitious teenagers |
> | Pastoral / farming | Patience | Escapist teenagers |
> | Competitive multiplayer | Status | Social teenagers |
> | Sandbox / creative | Identity | Lonely teenagers |
>
> The sandbox is the most dangerous. The player who builds a world in a game does not build one outside it.

**Connection to the build:** This file categorizes the games on the machine. Solitaire is a patience game. Minesweeper is a control game. The player who plays them is being categorized. **The player does not know this.**

### 8.4 `TECH\GAMING_CALENDAR.XLS`

**Location:** `C:\BACKROOM$\TECH\GAMING_CALENDAR.XLS`

**Content summary:**

A spreadsheet mapping fictional game titles to real-world eras. The bottom row is live:

```
[today] | [?] | [?] | [?] | "You are almost there."
```

**Connection to the build:** The player who opens this file sees that the calendar ends today. They see that the row for today is empty. They see that it says *"You are almost there."* The calendar is waiting for the player to finish.

---

## 9. Game-Related Easter Eggs

These eggs live inside or around the games. They are summarized here for the build team.

| # | Egg | Game | Trigger | Impact |
|---|---|---|---|---|
| **G01** | `xyzzy` cheat | Minesweeper | Type `xyzzy`, then hover | The 1-pixel reveal |
| **G02** | `xyzzy` prolonged | Minesweeper | Keep `xyzzy` active for 60s | "You know the cheat" tooltip |
| **G03** | Impossible best times | Minesweeper | Open Best Times | SEAT_00, EIPSTEIN, PROPRIETOR |
| **G04** | `xyzzy` + best times | Minesweeper | Activate `xyzzy`, open Best Times | Names become `YOU` |
| **G05** | Flying cards | Solitaire | Win the game | The iconic animation |
| **G06** | Three-win message | Solitaire | Win 3 times in a row | "You have played this game before" |
| **G07** | Hearts unavailable | Hearts | Open Hearts | "You are the only player" |
| **G08** | Waiting forever | Hearts | Open Hearts, wait | "Waiting for other players..." |
| **G09** | FreeCell #11982 | FreeCell | Open FreeCell | The unsolvable deal |
| **G10** | Game Studio README | Game Studio | Open `README.TXT` | "Do not ask why there are seven folders" |
| **G11** | GTA 3 is 0% complete | Game Studio | Open `GTA3.EXE` | "0% complete since 1998" |
| **G12** | GTA 3 design doc | Game Studio | Open `DESIGN.DOC` | The recruitment pipeline reveal |
| **G13** | GTA 3 build log | Game Studio | Open `BUILD_LOG.TXT` | 1,428 entries, every Tuesday |
| **G14** | Faceless sprite | Game Studio | Open `player_sprite.bmp` | "It could be anyone" |
| **G15** | GTA 7 created in 1998 | Game Studio | Right-click `GTA_7` → Properties | The plan is long-term |
| **G16** | GTA 8 appears | Game Studio | After all chat logs read | Created today |
| **G17** | Games page GTA demo | Intranet | `shreecyberzone.local/games` | "File removed in 1998" |
| **G18** | Amazon Tommy book | Amazon | Search Amazon | The dog is merchandise |
| **G19** | eBay PROJECT 2050 | eBay | Browse eBay | "Withdrawn by the seller" |

**The best game eggs are G01, G05, G09, and G12.** Build these first.

---

## 10. Build Notes

### 10.1 Priority Order

If you have **4 hours** for games, build in this order:

| Order | Item | Time | Why |
|---|---|---|---|
| 1 | **Minesweeper (full)** | 120 min | The most iconic game. `xyzzy` is essential. |
| 2 | **Game Studio folder** | 60 min | The lore payoff. `DESIGN.DOC` is essential. |
| 3 | **Solitaire (playable, no flying cards)** | 90 min | Playable Solitaire is essential. The flying cards can be added later. |
| 4 | **Solitaire flying cards** | 30 min | The payoff. Add if time permits. |

**Total: ~5 hours.** This is the minimum to feel complete.

If you have **8 hours**, add:

| Order | Item | Time |
|---|---|---|
| 5 | **Hearts (not available)** | 20 min |
| 6 | **FreeCell (not available)** | 20 min |
| 7 | **Solitaire three-win easter egg** | 15 min |
| 8 | **Minesweeper best times easter egg** | 10 min |
| 9 | **GTA 8 appears** | 10 min |

**Total: ~6 hours** for the full game layer.

### 10.2 What Not to Build

| Don't build | Why |
|---|---|
| **Full Hearts** | 4-player card game is too complex. The "not available" dialog is funnier. |
| **Full FreeCell** | Same. The #11982 joke is enough. |
| **Wolfenstein 3D / Doom** | Not in scope. Not Win98 default. |
| **A working GTA 3** | The joke is that it doesn't work. |
| **Multiplayer** | No. |
| **Sound effects in games** | Win98 Minesweeper and Solitaire had no sound. |
| **Modern graphics** | Pixel art. 16-color. 1998. |
| **Smooth animations** | Win98 games were instant. No easing. |

### 10.3 The One Rule of This Document

> **Every game is a leash. The player who pulls on it is the player the machine is waiting for.**

The games are not decoration. They are not filler. They are the **proof** that the Quiet Room's thesis is correct: a talented person with a goal will sit at a machine for hours and not notice the time passing.

The player who plays Solitaire for 20 minutes is the player the machine was built for.

**Build the games as if the player will get lost in them. Because they will.**

### 10.4 Integration Checklist

Before demo, verify:

- [ ] Minesweeper opens from Start → Programs → Games → Minesweeper
- [ ] Minesweeper: 9×9 grid, 10 mines, smiley, LEDs
- [ ] Minesweeper: first click is safe
- [ ] Minesweeper: flood fill works
- [ ] Minesweeper: flagging works
- [ ] Minesweeper: chord (middle-click) works
- [ ] Minesweeper: win/loss states work
- [ ] Minesweeper: `xyzzy` cheat works (1 pixel, top-left)
- [ ] Minesweeper: Best Times shows SEAT_00, EIPSTEIN, PROPRIETOR
- [ ] Solitaire opens from Start → Programs → Games → Solitaire
- [ ] Solitaire: deals a full Klondike game
- [ ] Solitaire: draw from stock works
- [ ] Solitaire: tableau moves work (alternating colors, descending ranks)
- [ ] Solitaire: foundation moves work
- [ ] Solitaire: drag-and-drop works
- [ ] Solitaire: win triggers flying cards
- [ ] Solitaire: three-win message appears
- [ ] Hearts: shows "not available" dialog
- [ ] Hearts: shows "waiting for other players" status
- [ ] FreeCell: shows "not available" dialog
- [ ] FreeCell: shows deal #11982
- [ ] Game Studio folder exists in `My Documents`
- [ ] `README.TXT` mentions seven folders
- [ ] `GTA3.EXE` shows "0% complete" dialog
- [ ] `DESIGN.DOC` reveals the recruitment pipeline
- [ ] `BUILD_LOG.TXT` has 1,428 entries
- [ ] `player_sprite.bmp` has no face
- [ ] `GTA_7` properties show created `3/3/1998`
- [ ] `GTA_8` appears after all chat logs read
- [ ] Intranet Games page shows GTA DEMO with 404

### 10.5 Related Documents

| Document | What it covers |
|---|---|
| `README.md` | Public project overview |
| `story.md` | Full narrative, all endings |
| `easter_eggs.md` | All 61 eggs, prioritized |
| `features.md` | Windows 98 shell spec |
| `applications.md` | App-by-app build specs |
| `websites.md` | IE fake sites content |
| `settings.md` | Control Panel, Display Properties |
| `docs_and_files.md` | Public PC files content |
| `chats_and_emails.md` | Chat logs, emails, drafts |
| `UIUX.md` | Boot sequence, audio, wallpaper, core functionality |

---

<div align="center">

**Minesweeper. Solitaire. Hearts. FreeCell.**

**One game studio. Seven folders. Zero percent complete.**

**The games are the leash. You are the player.**

**Start → Run → `2050`**

</div>

---

**End of `games.md`. Ready for the next file: `docs_and_files.md`.**