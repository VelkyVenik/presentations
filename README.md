# presentations

Talks by Václav Šlajs. Each talk lives in its own date-stamped subdirectory
in the `YYYY-MM-DD-name` format, published via GitHub Pages.

Live at **https://talks.slajs.eu/**

## Talks

| Date | Talk | Event |
|------|------|-------|
| 2026-06-18 | IT as a business partner | Company talk |
| 2026-06-15 | AI apps as an IT discipline | [AI That Works Brno #9](https://aithatworks.cz/events/brno-meetup-9) |

## Structure

```
_template/         # canonical deck stack + skeletons — copy this to start a talk (not published)
shared/            # shared assets reused across talks (e.g. me.jpeg)
YYYY-MM-DD-name/
  index.html       # the deck itself (published) — synced from notes/structure.md
  notes/           # NOT published (.gitignore): story.md (source) + structure.md (slide spec)
```

Decks reference shared assets via `../shared/...`; the landing page uses `shared/...`.
A new talk starts by copying `_template/`. See `CLAUDE.md` for the full workflow.

## Publishing

The site runs on GitHub Pages from the `main` branch. A given talk's deck is at
`https://talks.slajs.eu/YYYY-MM-DD-name/`.

## Deck controls

Arrow keys / spacebar = next slide · nav dots = jump · `F` = fullscreen · `T` = presenter timer.
