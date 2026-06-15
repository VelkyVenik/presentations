# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static collection of talk decks by Václav Šlajs, published via GitHub Pages from the `main` branch at **https://talks.slajs.eu/** (custom domain set in `CNAME`). There is no build step, no package manager, and no tests — everything is hand-written HTML/CSS/vanilla JS served as-is.

To preview locally, open the relevant `index.html` directly in a browser, or serve the repo root (e.g. `python3 -m http.server`) so that `../shared/...` paths resolve.

## Layout

- `index.html` (root) — landing page linking to each talk. References shared assets as `shared/...`.
- `YYYY-MM-DD-name/index.html` — one self-contained deck per talk. References shared assets as `../shared/...`.
- `shared/` — assets reused across talks (e.g. `me.jpeg`).
- `YYYY-MM-DD-name/notes/` — speaker notes & source backups. **Not published** — `**/notes/` is gitignored. Decks are written in Czech; notes too.

When adding a talk: create a new `YYYY-MM-DD-name/` dir with its own `index.html`, and add a card to the root `index.html` and a row to the README table.

## Deck architecture (the part that matters)

Each deck `index.html` is a single file with all CSS and JS inline. The structure is a convention shared across decks, not a shared library — there is no common JS/CSS file, so changes to deck behavior must be applied per-deck.

- Slides are `<section class="slide">`; the active one gets `.active`. Each slide contains a `.stage` element that holds the actual content at a fixed design size.
- The inline `<script>` at the bottom drives everything: nav dots, progress bar, counter, keyboard/click navigation, the `fit()` scaling, and the presenter timer. Slide state lives in the URL hash (`#3` = slide 3).
- **Desktop scaling**: `fit()` scales each `.stage` to the viewport via CSS `zoom` (kept sharp for projectors). Recomputed on resize and after web fonts load.
- **Mobile**: detected once up front via `matchMedia('(max-width: 819px)')`; the script then rewrites the viewport meta to `width=1400` and lets the browser fit + native pinch-zoom handle scaling — `fit()` is a no-op on mobile. `html.m` class toggles mobile-specific CSS. Be careful editing this: the desktop and mobile scaling paths are deliberately separate (see git history — several reverts here).

### Controls
- Arrow keys / Space / PageUp/Down / click = navigate · Home/End = first/last · `F` = fullscreen.
- `T` = show + (re)start the presenter timer (hidden by default); `R` = restart it. Talk length is set by `TALK_MINUTES` in the script.

## Conventions

- Commit messages are in Czech and prefixed with `Deck:` for deck changes (or describe the area, e.g. `Rozcestník:` for the landing page).
- Design language is consistent across decks: warm paper background, CSS custom properties (`--ink`, `--paper`, `--amber`, …) defined in `:root`, fonts Space Grotesk / Inter / JetBrains Mono loaded from Google Fonts.
- QR codes are generated via the `api.qrserver.com` URL API inline in the markup.
