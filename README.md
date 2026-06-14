# presentations

Talks by Václav Šlajs. Each talk lives in its own date-stamped subdirectory
in the `YYYY-MM-DD-name` format, published via GitHub Pages.

Live at **https://talks.slajs.eu/**

## Talks

| Date | Talk | Event |
|------|------|-------|
| 2026-06-15 | AI apps as an IT discipline | [AI That Works Brno #9](https://aithatworks.cz/events/brno-meetup-9) |

## Structure

```
shared/            # shared assets reused across talks (e.g. me.jpeg)
YYYY-MM-DD-name/
  index.html       # the deck itself (published)
  notes/           # speaker notes & sources — NOT published (.gitignore)
```

Decks reference shared assets via `../shared/...`; the landing page uses `shared/...`.

## Publishing

The site runs on GitHub Pages from the `main` branch. A given talk's deck is at
`https://talks.slajs.eu/YYYY-MM-DD-name/`.

## Deck controls

Arrow keys / spacebar / click = next slide · `F` = fullscreen.
