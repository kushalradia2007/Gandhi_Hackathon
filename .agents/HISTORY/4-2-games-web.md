# 4-2 Games + fake web (docs/games.md, docs/websites.md)

New files only; nothing existing was edited, nothing committed.

## Files
- `js/apps/ie.js`: IE shell. Pages are written into an iframe with document.write, with no doctype so they render in quirks mode. It has Back/Forward/Stop/Refresh/Home/Search/Favorites/History, the address bar plus Go, the menus (File/Edit/View/Go/Favorites/Help), View Source (opens Notepad), Properties, a right-click menu, a throbber, a fake 200-800 ms load, a status bar that shows link targets and the zone, visited-link colours, and `data-tip` tooltips. noHistory pages (quiet.room, tuesday.html) never go into back/forward. /2050 locks navigation for 4 s and then calls `runCommand('2050')`. 2050.com shows its own BSOD and then returns. shutdown.com shows its own SAFE ending screens.
- `js/apps/sites/{index,util,art,intranet,search,web,geocities,eggs}.js`: the routing, the canvas "GIFs" and all the page content.
- `js/apps/games/{common,minesweeper,solitaire,hearts,freecell,gamestudio}.js`
- `css/games.css`, `css/ie.css`
- `data/lore/games/*.txt|csv` and `data/fs_games.json`: the Game Studio and BACKROOM$\TECH game files, as a fragment for the lead to merge.

## Registry ids
ie, minesweeper, solitaire, hearts, freecell, gta3, gta_player_sprite, gta_car_sprite, gta_city_map, gta_font_8px. Run box: mshearts, freecell.

## Decisions (where the docs conflict)
- Real brands became obvious parodies (Googol!, Yahoot!, AltaVesta, Ask Reeves, amazin.com, eBid, Reddish.com, IndiaTimeless, MSNot, America OffLine, GeoCitiez, NoTMaiL, dmozz). The real URLs still route to them.
- Prices use "Rs." instead of ₹, because the ₹ sign did not exist in 1998 and the existing code already uses "Rs.".
- The Minesweeper LEDs are red, as in the real Win98, not green as the doc says. In Solitaire the stock sits top-left and the foundations top-right, as in the real Win98, which is the opposite of the doc's diagram.
- Solitaire allows unlimited recycles outside Vegas mode; Vegas allows 3 passes with draw 3 and 1 pass with draw 1.
- Minesweeper Custom... works (clamped); the doc says visual only. The Sound toggle stays silent (games.md 10.2).
- BUILD_LOG has exactly 1,428 entries: 1,427 Tuesdays from 1998-03-03 plus a final 2026-11-01 line. That leaves a gap after 2025-07-01.
- "10224 days" is kept as the doc wrote it. The real number of days since 1998-03-03 is larger.

## Not done / needs wiring by the lead
- H07: GAMING_CALENDAR.csv ends with a `{TODAY}` row, and the spreadsheet must replace it with today's date. H08: GAME_GENRES.DOC has `egg:"sandbox"`. Notepad Ctrl+F "sandbox" should append: "Sandbox games were not designed to entertain. They were designed to retain. The player who builds a world in a game does not build one outside it."
- The GTA_7 Properties dialog shows Modified 03/03/98, but Explorer's Properties dialog has no Created field.
- Start menu entries for Hearts and FreeCell are missing.
- Game windows use the 'app' taskbar icon. Only the title-bar icon is custom.
- The Session Log row for shutdown.com comes from `import('./extras.js').addLog`. It needs repointing if addLog moved.
- Only part of the browser test was run before stopping: a headless pass covering all IE routes, plus Minesweeper, Solitaire and the win cascade. The card face/index layout fix (a clash with the old `.face` class) was not re-verified visually.
