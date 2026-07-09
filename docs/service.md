# Service Section — Build Notes

What was changed to bring the Services area in line with the Gallery + Contact
design pattern (the canonical "two-tone title over a curved photo hero" look),
plus a hover dropdown on the nav.

Date: 2026-06-23

---

## 1. Nav dropdown on "Services"

Hovering "Services" in the shared nav now reveals a dropdown with three links:
Wedding Planning, Decoration, Entertainment.

**Files:**
- `js/main.js`
  - `NAV_LEFT` → the `Services` item got a `children: [...]` array (label + href +
    short `desc`).
  - `linkHtml()` now renders a `.nav__item` wrapper containing the link (with a
    `.nav__caret` chevron) and a `.nav__menu` panel when `children` exist.
  - `setupMenu()` close-on-click now also targets `.nav__menu-link` so tapping a
    submenu item closes the mobile slide-in menu.
- `css/style.css` — section "8. Services dropdown":
  - `.nav__item`, `.nav__caret`, `.nav__menu`, `.nav__menu-link`,
    `.nav__menu-title`, `.nav__menu-desc`.
  - Opens on `:hover` **and** `:focus-within` (keyboard friendly). An invisible
    hover bridge (`.nav__menu::before`) keeps it open while the cursor travels down.
  - Mobile (`max-width: 760px`): the dropdown flattens into an always-open,
    centered sub-list inside the existing slide-in menu; caret + descriptions hidden.

Because the nav is injected by the shared `js/main.js`, the dropdown appears on
**every** page automatically.

---

## 2. Three service detail pages — rebuilt on the Gallery hero pattern

`service-wedding-planning.html`, `service-decoration.html`,
`service-entertainment.html` were rewritten to use the gallery's hero:

- `.galx-hero` photo banner with curved hem + scrim + breadcrumb
  (`Home · Services · <page>`).
- `.galx-titleband` two-tone big title that straddles the hem — **cream over the
  photo, green below** (gradient clip in `.galx-bigtitle`). New modifier
  `.galx-bigtitle--svc` shrinks the type so longer words ("Wedding Planning",
  "Entertainment") fit on one line.
- Italic `.galx-sub` one-line message under the title, with `.galx-sub__hot`
  (saffron) / `.galx-sub__gold` highlight spans.

Body below the hero (uniform across all three pages):
1. **Intro split** — the in-page photo in a tilted `.svc-figure` (hover lifts +
   straightens + zooms) beside an editorial column (`.svc-lead`).
2. **What we handle** — six numbered `.svc-card`s (gold serif index, sans-uppercase
   title, body). Hover lifts the card and grows an accent rail.
3. **Process** — the existing dark `.section--ink` "How it unfolds" four-step block.
4. **CTA** — ornament + closing line + "Begin a conversation" button.

Each page sets a per-page accent via `--svc-accent` on `<main class="svc">`:
- Wedding Planning → `var(--gold)`
- Decoration → `var(--peacock)`
- Entertainment → `var(--rose)`

All animations use the site's existing `data-reveal` / `data-reveal-fwd` /
`data-reveal-x` scroll system — no new JS.

**CSS added** (`css/style.css` section "9. Service detail pages"):
`.galx-bigtitle--svc`, `.svc`, `.svc-intro`, `.svc-intro__grid`, `.svc-figure`
(+`__tag`), `.svc-lead` (+`__eyebrow`, `__title`, `__rule`), `.svc-offer`
(+`__head`, `__title`), `.svc-cards`, `.svc-card` (+`__no`, `__title`, `__copy`),
plus responsive rules at 980px / 760px.

---

## 3. Image mapping

Source photos were resized/recompressed with `sips` into `images/`:

| Page             | Hero background (`-hero.jpg`)        | In-page photo (`-photo.jpg`)      |
|------------------|-------------------------------------|-----------------------------------|
| Wedding Planning | `svc-planning-hero.jpg` ← Bride and Groom Wedding Photo (1).jpg (henna handshake) | `svc-planning-photo.jpg` ← Man Woman Couch Photo.jpg |
| Decoration       | `svc-decor-hero.jpg` ← ADA09639.jpg (mirror-ball ceiling) | `svc-decor-photo.jpg` ← ADA01351.jpg (candlelit garden) |
| Entertainment    | `svc-ent-hero.jpg` ← ADA09379.jpg (singer, blue light) | `svc-ent-photo.jpg` ← ADA_7623.jpg (singer, B&W suit) |

Heroes resized to max 2400px, in-page photos to max 1800px (JPEG q70–72).
Regenerate with, e.g.:
`sips -Z 2400 -s format jpeg -s formatOptions 70 "SOURCE.jpg" --out images/svc-*-hero.jpg`

---

## 4. Cache busting

All HTML pages were bumped to `css/style.css?v=10` and `js/main.js?v=10` so the
new shared nav + styles load everywhere.

## 5. Not yet done / to verify

- Visual QA in a real browser (headless screenshot step was interrupted). Check:
  the title straddle on the curved hem, the dropdown hover, and mobile menu.
- `services.html` overview page still uses the older `.page-hero` layout and
  placeholder `.frame` blocks — could later be moved onto the same gallery hero
  for full consistency.
