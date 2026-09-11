# Humsafar Wedding by GNK — Website

A static website: plain HTML, CSS and JavaScript. No build step, no framework, no dependencies.
Deployed on Vercel straight from this folder.

## Run it

```bash
# from this folder
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Pages

| File | Page |
|---|---|
| `index.html` | Homepage |
| `about.html` | About |
| `service-wedding-planning.html` | Services → Wedding Planning |
| `service-decoration.html` | Services → Decoration |
| `service-entertainment.html` | Services → Entertainment |
| `gallery.html` | Gallery |
| `testimonials.html` | Testimonials |
| `contact.html` | Contact → Client (enquiry form, studio address, map) |
| `vendor.html` | Contact → Vendor (placeholder page) |
| `career.html` | Contact → Career (placeholder page) |

## Folder layout

```
*.html           ← one file per page (must stay at the root — Vercel serves them from here)
css/style.css    ← the whole design system: tokens, type, sections, responsive rules
js/main.js       ← shared nav + footer, scroll reveal, one-screen section fitting, contact form
images/          ← web-ready images used by the pages (gallery/ and testimonials/ subfolders)
vercel.json      ← cache + security headers
.vercelignore    ← keeps everything below out of deploys

docs/            ← design brief and service notes (not deployed)
archive/         ← original Claude Design export (git-ignored, not deployed)
source-assets/   ← git-ignored raw material, not deployed:
  photos/            original photos and downloads (the -web.jpg files in images/ are made from these)
  screenshots/       early reference screenshots
  reference/         reference-site research
  unused-web-copies/ web copies no page uses any more
```

## How to make changes

- **Colours & fonts:** edit the tokens at the top of `css/style.css` (`:root`).
- **Nav, footer, contact details:** edit the config at the top of `js/main.js` — `NAV_LEFT`, `NAV_RIGHT`,
  `WORDMARK`, `TAGLINE`, `CONTACT`, `SOCIAL`. The header and footer are injected from there on every page.
- **Text:** edit directly in each `.html` file.
- **Per-page nav style:** `<body data-nav="dark|paper|solid">` — `dark` = transparent over a hero image
  (homepage), `solid` = green bar (inner pages).
- **Cache-busting:** after changing `style.css` or `main.js`, bump the `?v=` number on the
  `<link>` / `<script>` tag in **every** page.

### Adding a photo

Keep the original in `source-assets/photos/`, and put a web-sized copy in `images/`:

```bash
sips -Z 1800 -s formatOptions 80 source-assets/photos/original.jpg --out images/name-web.jpg
```

(Skip the resize if the original is already under ~1800px.)

### Contact form

The form in `contact.html` posts to Formspree. Replace `YOUR_FORM_ID` in its `action`
(`https://formspree.io/f/YOUR_FORM_ID`) with your real form ID from formspree.io — until then the
form shows a "not connected yet" message.

## Notes

- Fonts load from Google Fonts: Newsreader (headings), EB Garamond (body serif), Jost (labels/UI),
  Cinzel (logo wordmark), Allison (script stand-in until the licensed Kallimata Script file is added).
- Animations respect `prefers-reduced-motion`.
