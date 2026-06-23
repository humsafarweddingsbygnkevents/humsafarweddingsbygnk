# Humsafar Wedding by GNK — Website

A standalone, editable website built from the Claude Design **V1 "Quiet Editorial"** direction.
No build step, no framework, no dependencies — just open the HTML files in a browser.

## Run it

Open `index.html` directly, or serve the folder for clean relative paths:

```bash
# from this folder
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Pages

| File | Page |
|---|---|
| `index.html` | Homepage |
| `about.html` | About Us |
| `services.html` | Our Services (parent) |
| `service-wedding-planning.html` | Services → Wedding Planning |
| `service-decoration.html` | Services → Decoration |
| `service-entertainment.html` | Services → Entertainment |
| `gallery.html` | Gallery |
| `testimonials.html` | Testimonials (wooden tri-stand) |
| `contact.html` | Contact (with form) |

## Project structure

```
css/style.css   ← the whole design system (colours, type, components, responsive)
js/main.js      ← shared nav + footer, scroll reveal, parallax, mobile menu, form
images/         ← haldi.jpg, hw-logo.png  (add your photos here)
*.html          ← one file per page
```

## How to make changes

- **Colours & fonts:** edit the tokens at the top of `css/style.css` (`:root`) — they retune the whole site.
- **Nav links / brand name:** edit the `NAV_LEFT`, `NAV_RIGHT`, `WORDMARK` arrays at the top of `js/main.js`. The header and footer are injected from there, so you change them in one place.
- **Text:** edit directly in each `.html` file. Content reads top to bottom.
- **Per-page nav style:** `<body data-nav="dark|paper|solid">` — `dark` = transparent over a hero image (homepage), `solid` = green bar (inner pages).

### Swapping in real photos

Image placeholders are `<figure class="frame">` blocks. To drop in a real photo, add an `<img>`:

```html
<!-- before (placeholder) -->
<figure class="frame" style="--h:380px"><span class="frame__label">Planning frame</span></figure>

<!-- after (your photo) -->
<figure class="frame" style="--h:380px"><img src="images/your-photo.jpg" alt="Description"></figure>
```

The label hides automatically once an image is present. Adjust the slot height with `--h`.

### Wiring the contact form

`js/main.js` currently shows a thank-you message on submit (front-end only). To actually receive
messages, point the `<form data-contact-form>` in `contact.html` at a backend or a service like
Formspree, or replace the handler in `setupForm()` in `js/main.js`.

## Notes

- `Humsafar Homepage.dc.html`, `support.js`, `image-slot.js` are the **original Claude Design export**
  and the other two unused directions (V2 Scrapbook, V3 Magazine). Kept for reference — not used by the
  live site. Safe to delete once you're happy with V1.
- Fonts (Bodoni Moda, Cinzel, Manrope) load from Google Fonts.
- Animations respect `prefers-reduced-motion`.
