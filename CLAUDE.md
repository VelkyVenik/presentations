# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static collection of talk decks by Václav Šlajs, served at **https://talks.slajs.eu/**. Hosting is **Cloudflare Workers (static assets)**: `build.sh` copies the publishable files into `dist/` (excluding `notes/`, `_template/`, docs) and Cloudflare serves `dist/`. Everything is hand-written HTML/CSS/vanilla JS — no framework, no tests. *(Migrating from GitHub Pages; until the DNS cutover the live site may still be GitHub Pages.)*

To preview locally, open the relevant `index.html` directly in a browser (the deck self-fits), or serve the repo root (`python3 -m http.server`) so that `../shared/...` paths resolve.

## Layout

- `index.html` (root) — landing page linking to each talk. References shared assets as `shared/...`.
- `YYYY-MM-DD-name/index.html` — one self-contained deck per talk (published). References shared assets as `../shared/...`.
- `YYYY-MM-DD-name/notes/` — **source of the deck**, committed in the (private) repo so it travels, but excluded from `dist/` by `build.sh` → never reaches the web. *(Currently still gitignored — flips to committed once the repo is private.)* Holds:
  - `story.md` — raw narrative / source material (dump, notes, numbers, links).
  - `structure.md` — the slide-by-slide spec. **`index.html` is generated/synced from this file.**
- `shared/deck.css` + `shared/deck.js` — **the framework** (loaded by every deck via `../shared/deck.*`). All slide-type CSS + the nav/fit/timer runtime live here. Change once → applies to every deck.
- `shared/` — also holds assets reused across talks (e.g. `me.jpeg`).
- `_template/` — thin starter deck + skeletons, **committed but excluded from the build** (`build.sh`). Copy it to start a new talk.
- `build.sh` / `wrangler.jsonc` — Cloudflare Workers deploy (see **Deploy** below).

## Creating a new talk (the workflow)

1. `cp -r _template/ YYYY-MM-DD-name/` then move the two skeletons into a gitignored notes dir: the talk ends up with `YYYY-MM-DD-name/index.html` + `YYYY-MM-DD-name/notes/{story.md,structure.md}`.
2. Capture the user's raw input in `notes/story.md`.
3. Shape it into `notes/structure.md` (slide-by-slide). The user edits **structure.md**; that is the working surface.
4. **Generate/sync `index.html` from `structure.md`** — Claude does this by hand (there is no build script). Keep the two in lockstep: every content edit goes into both, and the `.deck-counter` (`1 / N`) and `TALK_MINUTES` stay correct.
5. Preview with `open YYYY-MM-DD-name/index.html`. Iterate on structure.md → re-sync.
6. When the user says to publish: commit + push (deck is live in ~30–90 s). Add to the root `index.html` card list + README table **only when the talk should be public** (some talks live on the direct URL only until ready).

## Deck architecture

Each deck `index.html` is **thin**: it links the shared framework (`../shared/deck.css` + `../shared/deck.js`) and contains only the `<div class="deck">` slides. Change the framework once in `shared/` and it applies to every deck. Presenter-timer length is set via `data-minutes` on the `deck.js` script tag. (Exception: `2026-06-15-ai-that-works/` predates the framework and stays fully self-contained with bespoke per-slide layouts — leave it.)

- Slides are `<section class="slide">`; the active one gets `.active`. Each holds a `.stage` at a fixed design width (default 1040px).
- The inline `<script>` drives nav dots, progress bar, counter, keyboard navigation, `fit()` scaling, and the presenter timer. Slide state lives in the URL hash (`#3` = slide 3).
- **Desktop scaling**: `fit()` scales each `.stage` to the viewport via CSS `zoom`. Recomputed on resize and after fonts load.
- **Mobile**: detected once via `matchMedia('(max-width: 819px)')`; the script rewrites the viewport meta to a fixed width and lets native fit + pinch-zoom handle it — `fit()` is a no-op on mobile (`html.m` toggles mobile CSS). The desktop and mobile paths are deliberately separate — edit with care.

### Slide-type library (see `_template/index.html` for a live example of each)
`title` (standardized intro) · `content` (bullets `.points`, or `.cards` / `.cards.three`, optional `.note`) · `divider` (section break, big amber number) · `statement` (punchy thesis, `.hl` marker) · `stat` (big number) · `quote` · `framework` (`.ptable` with `good`/`ok`/`bad` chips) · živá ukázka / demo (`.slide-head .live` tag) · `qna` · `thanks` (standardized closing).

### Standardized intro & closing
- **Intro** (`title-slide`): eyebrow (date) · big h1 with one `.hl` word · subtitle · meta pill with avatar (`../shared/me.jpeg`) + name + role.
- **Closing** (`thanks`): "Díky!" · avatar + name/role (`.me`) · contacts (e-mail + LinkedIn inline links) · QR (`api.qrserver.com`) to `talks.slajs.eu/YYYY-MM-DD-name/`.

### Controls
- Arrow keys / Space / PageUp-Down = navigate · Home/End = first/last · `F` = fullscreen · clickable nav dots.
- **No click-to-advance** (mouse click does not move the deck — deliberate).
- `T` = show + (re)start the presenter timer (hidden by default); `R` = restart. Length = `TALK_MINUTES` in the script.

## Conventions

- **Commit messages in English**, prefixed `Deck:` for deck changes (or the area, e.g. `Landing:`). Conversation with the user stays Czech; only commits are English.
- Design language is shared: warm paper background, CSS custom properties (`--ink`, `--paper`, `--amber`, …) in `:root`, fonts Space Grotesk / Inter / JetBrains Mono from Google Fonts.
- Decks are written in the talk's audience language (recent ones: Czech, plus one English). `notes/` matches.
- QR codes are generated inline via the `api.qrserver.com` URL API.

## Deploy

- **`build.sh`** → produces `dist/` (the publishable site) by copying everything except `notes/`, `_template/`, docs and build/config files. `dist/` is gitignored.
- **`wrangler.jsonc`** → an assets-only Cloudflare Worker serving `./dist` (no server code).
- **Cloudflare Workers Builds** is wired to the repo: build command `bash build.sh`, then it deploys `dist/`. Custom domain `talks.slajs.eu` is set in the Cloudflare dashboard (not via a `CNAME` file).
- The repo is **private**, so committed `notes/` stay private; the build keeps them off the web. To publish: push to `main` → Cloudflare builds & deploys.
- Preview locally: `./build.sh && python3 -m http.server -d dist`, or just open a deck's `index.html` directly.
