# presentations

Talks by Václav Šlajs. Each talk lives in its own date-stamped subdirectory
in the `YYYY-MM-DD-name` format, published via GitHub Pages.

Live at **https://talks.slajs.eu/**

## Talks

| Date | Talk | Event |
|------|------|-------|
| 2026-06-18 | IT as a business partner | Company talk |
| 2026-06-16 | Getting started with Claude | YSoft training |
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

Hosted on **Cloudflare Workers** (static assets). `build.sh` builds the
publishable site into `dist/` (excluding `notes/`, `_template/`, docs); Cloudflare
serves `dist/`. Push to `main` → Cloudflare builds & deploys. A given talk's deck
is at `https://talks.slajs.eu/YYYY-MM-DD-name/`.

```
./build.sh                         # → dist/
python3 -m http.server -d dist     # local preview of the built site
```

## Deck controls

Arrow keys / spacebar = next slide · nav dots = jump · `F` = fullscreen · `T` = presenter timer.
