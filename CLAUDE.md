# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static collection of talk decks by Václav Šlajs, published via GitHub Pages from the `main` branch at **https://talks.slajs.eu/** (custom domain set in `CNAME`). There is no build step, no package manager, and no tests — everything is hand-written HTML/CSS/vanilla JS served as-is. Pages runs Jekyll (no `.nojekyll`), so directories starting with `_` (e.g. `_template/`) are **not** published.

To preview locally, open the relevant `index.html` directly in a browser (the deck self-fits), or serve the repo root (`python3 -m http.server`) so that `../shared/...` paths resolve.

## Layout

- `index.html` (root) — landing page linking to each talk. References shared assets as `shared/...`.
- `YYYY-MM-DD-name/index.html` — one self-contained deck per talk (published). References shared assets as `../shared/...`.
- `YYYY-MM-DD-name/notes/` — **source of the deck, not published** (`**/notes/` is gitignored). Holds:
  - `story.md` — raw narrative / source material (dump, notes, numbers, links).
  - `structure.md` — the slide-by-slide spec. **`index.html` is generated/synced from this file.**
- `_template/` — the canonical deck "stack" + skeletons, **committed but not published** (underscore dir). Copy it to start a new talk.
- `shared/` — assets reused across talks (e.g. `me.jpeg`).

## Creating a new talk (the workflow)

1. `cp -r _template/ YYYY-MM-DD-name/` then move the two skeletons into a gitignored notes dir: the talk ends up with `YYYY-MM-DD-name/index.html` + `YYYY-MM-DD-name/notes/{story.md,structure.md}`.
2. Capture the user's raw input in `notes/story.md`.
3. Shape it into `notes/structure.md` (slide-by-slide). The user edits **structure.md**; that is the working surface.
4. **Generate/sync `index.html` from `structure.md`** — Claude does this by hand (there is no build script). Keep the two in lockstep: every content edit goes into both, and the `.deck-counter` (`1 / N`) and `TALK_MINUTES` stay correct.
5. Preview with `open YYYY-MM-DD-name/index.html`. Iterate on structure.md → re-sync.
6. When the user says to publish: commit + push (deck is live in ~30–90 s). Add to the root `index.html` card list + README table **only when the talk should be public** (some talks live on the direct URL only until ready).

## Deck architecture

Each deck `index.html` is one self-contained file (all CSS + JS inline). It is a **shared convention, not a shared library** — there is no common JS/CSS file, so the stack is copied from `_template/` per deck and behavior changes must be applied per-deck (or to the template for future decks).

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
