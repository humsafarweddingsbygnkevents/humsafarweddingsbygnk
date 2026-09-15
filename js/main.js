/* ============================================================
   Humsafar Wedding by GNK — site behaviour
   Replaces the Claude design-canvas runtime with plain JS.
   - injects shared nav + footer
   - reveal-on-scroll
   - nav tone / scrolled state
   - hero parallax
   - mobile menu
   - contact form (front-end only)
   ============================================================ */
(function () {
  "use strict";

  /* ---- Site config: edit nav + brand here, once ---- */
  var NAV_LEFT = [
    { label: "About", href: "about.html", page: "about" },
    { label: "Offerings", href: "offerings.html", page: "offerings" },
    { label: "Gallery", href: "gallery.html", page: "gallery" }
  ];
  var NAV_RIGHT = [
    { label: "Testimonials", href: "testimonials.html", page: "testimonials" },
    { label: "Contact", children: [
      { label: "Client", href: "contact.html", page: "contact" },
      { label: "Vendor", href: "vendor.html", page: "vendor" },
      { label: "Career", href: "career.html", page: "career" }
    ] }
  ];
  var WORDMARK = "HUMSAFAR WEDDINGS";
  var TAGLINE = "By GNK Events";
  var FOOTER_TAGLINE = "By GnK Events"; // footer wordmark keeps mixed case (not uppercased)

  /* ---- Footer config: edit links + contact here, once ---- */
  var CONTACT = {
    email: "info@humsafarweddingbygnk.in",
    phoneLabel: "+91 93545 71642",
    whatsapp: "https://wa.me/919354571642",
    studio: "#18, Outside Corbett Platinum Heritage hotel, Peerumadara, Ramnagar, Uttarakhand"
  };
  var SOCIAL = [
    { label: "Instagram", href: "https://www.instagram.com/humsafarweddingsbygnkevents/" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61591217462973" },
    { label: "WhatsApp", href: "https://wa.me/919354571642" },
    { label: "Email", href: "mailto:info@humsafarweddingbygnk.in" }
  ];

  var body = document.body;
  var currentPage = body.getAttribute("data-page") || "";
  var navTone = body.getAttribute("data-nav") || "solid"; // dark | paper | solid

  /* ---------- Shared navigation ---------- */
  function linkHtml(item) {
    var current = item.page === currentPage ? ' aria-current="page"' : "";
    if (item.children && item.children.length) {
      var childCurrent = item.children.some(function (c) { return c.page && c.page === currentPage; });
      if (childCurrent) current = ' aria-current="page"';
      var menu = item.children.map(function (c) {
        return '<a class="nav__menu-link" href="' + c.href + '">' +
                 '<span class="nav__menu-title">' + c.label + "</span>" +
                 (c.desc ? '<span class="nav__menu-desc">' + c.desc + "</span>" : "") +
               "</a>";
      }).join("");
      var trigger = item.href
        ? '<a class="nav__link" href="' + item.href + '"' + current + ">" + item.label +
            '<span class="nav__caret" aria-hidden="true"></span></a>'
        : '<span class="nav__link nav__link--trigger" role="button" tabindex="0" aria-haspopup="true"' + current + ">" +
            item.label + '<span class="nav__caret" aria-hidden="true"></span></span>';
      return '<span class="nav__item">' +
               trigger +
               '<span class="nav__menu" role="menu">' + menu + "</span>" +
             "</span>";
    }
    return '<a class="nav__link" href="' + item.href + '"' + current + ">" + item.label + "</a>";
  }

  function buildNav() {
    var nav = document.createElement("header");
    nav.className = "nav";
    nav.setAttribute("data-tone", navTone);
    nav.innerHTML =
      '<div class="nav__inner">' +
        '<a class="nav__wordmark" href="index.html">' +
          '<img class="nav__logo" src="images/hw-logo.png" alt="' + WORDMARK + ' ' + TAGLINE + '">' +
          '<span class="nav__wordmark-text">' +
            '<span class="nav__wordmark-main">' + WORDMARK + '</span>' +
            '<span class="nav__wordmark-sub">' + TAGLINE + '</span>' +
          '</span>' +
        '</a>' +
        '<nav class="nav__group nav__group--right">' + NAV_LEFT.concat(NAV_RIGHT).map(linkHtml).join("") + "</nav>" +
        '<button class="nav__toggle" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
      "</div>";
    body.insertBefore(nav, body.firstChild);
    return nav;
  }

  /* ---------- Shared footer ---------- */
  var FOOTER_STRIP = [
    { src: "images/gallery/web/ADA00716.jpg", alt: "Bride in a yellow lehenga before a marigold haldi backdrop" },
    { src: "images/gallery/web/ADA00833.jpg", alt: "Bride and a young cousin in turbans and sunglasses at the haldi" },
    { src: "images/gallery/web/ADA00823.jpg", alt: "Guests in yellow singing and clapping at the haldi ceremony" },
    { src: "images/gallery/web/ADA08612.jpg", alt: "Whimsical floral mehndi decor with a swing and flamingo accents" },
    { src: "images/gallery/web/ADA08736.jpg", alt: "A guest dancing in white before a floral dreamcatcher backdrop" },
    { src: "images/gallery/web/ADA08746.jpg", alt: "Family exchanging blessings under hanging flowers" },
    { src: "images/gallery/web/ADA08779.jpg", alt: "Crowd dancing with pink and yellow napkins under floral decor" },
    { src: "images/gallery/web/ADA08704.jpg", alt: "Lounge seating with floral printed cushions in a tropical setting" },
    { src: "images/gallery/web/ADA01554-hero.jpg", alt: "A bride and groom on a red-and-white floral wedding stage under chandeliers" }
  ];
  var FOOTER_NAV = [
    [{ label: "Home", href: "index.html" }, { label: "Contact", href: "contact.html" }],
    [{ label: "Offerings", href: "offerings.html" }, { label: "About", href: "about.html" }],
    [{ label: "Gallery", href: "gallery.html" }, { label: "Testimonials", href: "testimonials.html" }]
  ];
  var ICONS = {
    Instagram: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r=".9" fill="currentColor" stroke="none"/></svg>',
    Facebook: '<svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
    WhatsApp: '<svg viewBox="0 0 24 24"><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L19 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>'
  };

  function buildFooter() {
    var footer = document.createElement("footer");
    footer.className = "footer";
    var year = new Date().getFullYear();
    var instagram = SOCIAL.filter(function (s) { return s.label === "Instagram"; })[0];
    var facebook = SOCIAL.filter(function (s) { return s.label === "Facebook"; })[0];
    var whatsapp = SOCIAL.filter(function (s) { return s.label === "WhatsApp"; })[0];

    footer.innerHTML =
      /* ---- row 1: giant wordmark ---- */
      '<div class="footer__top">' +
        '<a class="footer__wordmark" href="index.html">' +
          '<span class="footer__wordmark-main">' + WORDMARK + "</span>" +
          '<span class="footer__wordmark-sub">' + FOOTER_TAGLINE + "</span>" +
        "</a>" +
      "</div>" +

      /* ---- row 2: nine-photo strip ---- */
      '<div class="footer__strip" aria-hidden="true">' +
        FOOTER_STRIP.map(function (p) {
          return '<div class="footer__frame"><img src="' + p.src + '" alt="' + p.alt + '" loading="lazy" decoding="async"></div>';
        }).join("") +
      "</div>" +

      '<div class="container">' +

        /* ---- row 3: socials + email — nav grid ---- */
        '<div class="footer__mid">' +
          '<div class="footer__reach">' +
            '<div class="footer__social">' +
              (instagram ? '<a href="' + instagram.href + '" target="_blank" rel="noopener" aria-label="Instagram">' + ICONS.Instagram + "</a>" : "") +
              (facebook ? '<a href="' + facebook.href + '" target="_blank" rel="noopener" aria-label="Facebook">' + ICONS.Facebook + "</a>" : "") +
              (whatsapp ? '<a href="' + whatsapp.href + '" target="_blank" rel="noopener" aria-label="WhatsApp">' + ICONS.WhatsApp + "</a>" : "") +
            "</div>" +
            '<a class="footer__email" href="mailto:' + CONTACT.email + '">' + CONTACT.email + "</a>" +
          "</div>" +
          '<nav class="footer__nav" aria-label="Footer">' +
            FOOTER_NAV.map(function (row) {
              return '<div class="footer__nav-row">' +
                row.map(function (item) {
                  return '<a class="footer__nav-link" href="' + item.href + '"' +
                    (item.page === currentPage ? ' aria-current="page"' : "") + ">" + item.label + "</a>";
                }).join("") +
              "</div>";
            }).join("") +
          "</nav>" +
        "</div>" +

        /* ---- row 4: legal bar ---- */
        '<div class="footer__bottom">' +
          '<p class="footer__copy">© ' + year + "</p>" +
          '<p class="footer__tagline">Delhi &amp; Jim Corbett wedding planners — available across India</p>' +
          '<a class="footer__privacy" href="contact.html">Privacy Policy</a>' +
        "</div>" +

      "</div>";

    body.appendChild(footer);
  }

  /* ---------- Reveal on scroll ---------- */
  function setupReveal() {
    var items = document.querySelectorAll("[data-reveal], [data-reveal-fwd]");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.setAttribute("data-shown", "1"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-shown", "1");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Typewriter heading ---------- */
  function setupTypewriter() {
    var heads = [].slice.call(document.querySelectorAll("[data-typewriter]"));
    if (!heads.length) return;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    heads.forEach(function (h) {
      // each text-bearing child (span / em) is a segment we type into; <br> stays put
      var segs = [].slice.call(h.children).filter(function (el) {
        return el.tagName !== "BR";
      }).map(function (el) {
        return { el: el, text: el.textContent };
      });
      if (!segs.length || reduce) return; // leave full text in place

      segs.forEach(function (s) { s.el.textContent = ""; });

      var caret = document.createElement("span");
      caret.className = "tw-caret";
      caret.setAttribute("aria-hidden", "true");

      var started = false;
      function run() {
        if (started) return;
        started = true;
        var si = 0;
        function nextSeg() {
          if (si >= segs.length) {
            if (caret.parentNode) caret.parentNode.removeChild(caret);
            h.setAttribute("data-typed", "1");
            return;
          }
          var seg = segs[si];
          seg.el.insertAdjacentElement("afterend", caret); // caret trails the active line
          var ci = 0;
          (function typeChar() {
            seg.el.textContent = seg.text.slice(0, ci + 1);
            var ch = seg.text.charAt(ci);
            ci++;
            if (ci < seg.text.length) {
              var delay = /[,.—]/.test(ch) ? 250 : 40 + Math.random() * 38;
              setTimeout(typeChar, delay);
            } else {
              si++;
              setTimeout(nextSeg, 110);
            }
          })();
        }
        nextSeg();
      }

      if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { run(); io.unobserve(h); }
          });
        }, { threshold: 0.55 });
        io.observe(h);
      } else {
        run();
      }
    });
  }

  /* ---------- Nav scroll state + parallax ---------- */
  function setupScroll(nav) {
    var hero = document.querySelector("[data-parallax]");
    var parImgs = [].slice.call(document.querySelectorAll("[data-parallax-img]"));
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var ticking = false;

    function onScroll() {
      var y = window.scrollY || window.pageYOffset;
      // solid tone is always solid; dark/paper toggle to scrolled bar
      if (navTone !== "solid") {
        nav.setAttribute("data-scrolled", y > 40 ? "1" : "0");
      }
      if (hero) {
        hero.style.transform = "translateY(" + (y * 0.18) + "px)";
      }
      // gentle parallax inside each service photo frame
      if (!reduce && parImgs.length) {
        var vh = window.innerHeight;
        for (var i = 0; i < parImgs.length; i++) {
          var frame = parImgs[i].parentElement;
          var r = frame.getBoundingClientRect();
          if (r.bottom < -100 || r.top > vh + 100) continue; // skip off-screen
          // progress: -1 (frame entering from below) .. 1 (leaving at top)
          var prog = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
          if (prog > 1) prog = 1; else if (prog < -1) prog = -1;
          var shift = prog * (r.height * 0.07); // stay within the 8% overscan
          parImgs[i].style.transform = "translateY(" + shift.toFixed(1) + "px)";
        }
      }
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
    onScroll();
  }

  /* ---------- See-through nav over a photo hero ([data-nav-glass]) ----------
     translucent while the hero is still under the bar; solid again once the next section reaches it */
  function setupNavGlass(nav) {
    var hero = document.querySelector("[data-nav-glass]");
    if (!hero) return;
    var ticking = false;
    function update() {
      ticking = false;
      nav.setAttribute("data-glass", hero.getBoundingClientRect().bottom > nav.offsetHeight ? "1" : "0");
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- Mobile menu ---------- */
  function setupMenu(nav) {
    var toggle = nav.querySelector(".nav__toggle");
    if (!toggle) return;
    toggle.addEventListener("click", function () {
      var open = nav.getAttribute("data-open") === "1";
      nav.setAttribute("data-open", open ? "0" : "1");
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
    });
    nav.querySelectorAll(".nav__link, .nav__menu-link").forEach(function (a) {
      a.addEventListener("click", function () { nav.setAttribute("data-open", "0"); });
    });
  }

  /* ---------- Hero slideshow (crossfade) ---------- */
  function setupHeroSlideshow() {
    var stage = document.querySelector("[data-hero-slides]");
    if (!stage) return;
    var slides = stage.querySelectorAll(".hero__slide");
    if (slides.length < 2) return;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // keep the first slide static
    var i = 0;
    setInterval(function () {
      slides[i].classList.remove("is-active");
      i = (i + 1) % slides.length;
      slides[i].classList.add("is-active");
    }, 5500); // time each photo holds before the next fades in
  }

  /* ---------- Contact form (Formspree + validation) ---------- */
  function setupForm() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) return;
    var note = form.querySelector("[data-form-note]");
    var btn = form.querySelector('button[type="submit"]');
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setNote(msg, kind) {
      if (!note) return;
      note.textContent = msg;
      note.setAttribute("data-state", kind); // ok | error | sending
      note.style.display = "block";
    }
    // clear the invalid flag as the user fixes a field — works for any [required] field,
    // so this covers the contact, vendor and career forms alike without per-field wiring
    var requiredFields = [].slice.call(form.querySelectorAll("[required]"));
    requiredFields.forEach(function (el) {
      el.addEventListener("input", function () { el.setAttribute("aria-invalid", "false"); });
    });

    function validate() {
      var firstBad = null;
      requiredFields.forEach(function (el) {
        var val = el.value.trim();
        var ok = val !== "" && (el.type !== "email" || EMAIL_RE.test(val));
        el.setAttribute("aria-invalid", ok ? "false" : "true");
        if (!ok && !firstBad) firstBad = el;
      });
      return firstBad;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstBad = validate();
      if (firstBad) {
        setNote("Please fill in the required fields marked with *.", "error");
        firstBad.focus();
        return;
      }

      var endpoint = form.getAttribute("action");
      // No real endpoint wired yet → don't pretend it sent.
      if (!endpoint || /YOUR_FORM_ID/.test(endpoint)) {
        setNote("This form isn’t connected yet — please email info@humsafarweddingbygnk.in for now.", "error");
        return;
      }

      if (btn) { btn.disabled = true; }
      setNote("Sending…", "sending");

      fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          setNote("Thank you — your note is on its way. We reply within two days.", "ok");
        } else {
          return res.json().then(function (data) {
            var msg = (data && data.errors && data.errors.length)
              ? data.errors.map(function (x) { return x.message; }).join(", ")
              : "Something went wrong. Please email info@humsafarweddingbygnk.in instead.";
            setNote(msg, "error");
          });
        }
      }).catch(function () {
        setNote("Network error — please check your connection or email info@humsafarweddingbygnk.in.", "error");
      }).then(function () {
        if (btn) { btn.disabled = false; }
      });
    });
  }

  /* ---------- Gallery lightbox ---------- */
  function setupLightbox() {
    var triggers = [].slice.call(document.querySelectorAll("[data-lightbox]"));
    if (!triggers.length) return;

    var items = triggers.map(function (el) {
      return { full: el.getAttribute("data-full") || el.getAttribute("src"), cap: el.getAttribute("data-cap") || "" };
    });

    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.innerHTML =
      '<button class="lightbox__close" aria-label="Close">✕</button>' +
      '<button class="lightbox__btn lightbox__btn--prev" aria-label="Previous">‹</button>' +
      '<img class="lightbox__img" alt="">' +
      '<button class="lightbox__btn lightbox__btn--next" aria-label="Next">›</button>' +
      '<div class="lightbox__cap"></div>';
    body.appendChild(box);

    var imgEl = box.querySelector(".lightbox__img");
    var capEl = box.querySelector(".lightbox__cap");
    var idx = 0;

    function show(i) {
      idx = (i + items.length) % items.length;
      imgEl.src = items[idx].full;
      imgEl.alt = items[idx].cap || "Photograph";
      capEl.textContent = items[idx].cap;
    }
    function open(i) { show(i); box.setAttribute("data-open", "1"); document.documentElement.style.overflow = "hidden"; }
    function close() { box.removeAttribute("data-open"); document.documentElement.style.overflow = ""; }

    triggers.forEach(function (el, i) {
      el.addEventListener("click", function () { open(i); });
    });
    box.querySelector(".lightbox__close").addEventListener("click", close);
    box.querySelector(".lightbox__btn--prev").addEventListener("click", function () { show(idx - 1); });
    box.querySelector(".lightbox__btn--next").addEventListener("click", function () { show(idx + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", function (e) {
      if (box.getAttribute("data-open") !== "1") return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(idx - 1);
      else if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  /* ---------- Accordion ledger (What we handle) ---------- */
  function setupAccordion() {
    var groups = [].slice.call(document.querySelectorAll("[data-accordion]"));
    groups.forEach(function (group) {
      var rows = [].slice.call(group.querySelectorAll("[data-acc-item]"));
      rows.forEach(function (row, i) {
        var head = row.querySelector(".svc-acc__head");
        if (!head) return;
        if (i === 0) { row.setAttribute("data-open", "1"); head.setAttribute("aria-expanded", "true"); }
        head.addEventListener("click", function () {
          var wasOpen = row.getAttribute("data-open") === "1";
          rows.forEach(function (r) {
            r.setAttribute("data-open", "0");
            var h = r.querySelector(".svc-acc__head");
            if (h) h.setAttribute("aria-expanded", "false");
          });
          if (!wasOpen) { row.setAttribute("data-open", "1"); head.setAttribute("aria-expanded", "true"); }
        });
      });
    });
  }

  /* ---------- Offerings process accordion: reference behaviour (several may be open, 250ms height ease) ---------- */
  function setupROAcc() {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    [].slice.call(document.querySelectorAll("[data-ro-acc] .ro-acc__item")).forEach(function (item) {
      var btn = item.querySelector(".ro-acc__btn");
      var dd = item.querySelector(".ro-acc__dd");
      var timer = 0;
      btn.addEventListener("click", function () {
        var open = item.getAttribute("data-open") !== "true";
        clearTimeout(timer);
        dd.style.removeProperty("transition");
        dd.style.removeProperty("height");
        var from, to;
        if (open) { dd.classList.add("is-open"); from = 0; to = dd.getBoundingClientRect().height; }
        else { from = dd.getBoundingClientRect().height; to = 0; }
        item.setAttribute("data-open", open ? "true" : "false");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        if (reduce) { if (!open) dd.classList.remove("is-open"); return; }
        dd.style.height = from + "px";
        dd.getBoundingClientRect();
        dd.style.transition = "height 250ms cubic-bezier(0.66, 0, 0.34, 1)";
        dd.style.height = to + "px";
        timer = setTimeout(function () {
          if (!open) dd.classList.remove("is-open");
          dd.style.removeProperty("height");
          dd.style.removeProperty("transition");
        }, 250);
      });
    });
  }

  /* ---------- Scroll-activated timeline (How it unfolds) ---------- */
  function setupTimeline() {
    var lines = [].slice.call(document.querySelectorAll("[data-timeline]"));
    lines.forEach(function (tl) {
      var steps = [].slice.call(tl.querySelectorAll("[data-tl-step]"));
      var fill = tl.querySelector(".svc-tl__fill");
      if (!steps.length) return;

      function updateFill() {
        if (!fill) return;
        var active = steps.filter(function (s) { return s.getAttribute("data-active") === "1"; });
        if (!active.length) { fill.style.height = "0%"; return; }
        var last = active[active.length - 1];
        var tlRect = tl.getBoundingClientRect();
        var r = last.getBoundingClientRect();
        var y = (r.top - tlRect.top) + Math.min(r.height, 64);
        var pct = Math.max(0, Math.min(100, (y / tl.offsetHeight) * 100));
        fill.style.height = pct + "%";
      }

      if (!("IntersectionObserver" in window)) {
        steps.forEach(function (s) { s.setAttribute("data-active", "1"); });
        if (fill) fill.style.height = "100%";
        return;
      }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-active", "1");
            io.unobserve(e.target);
          }
        });
        updateFill();
      }, { threshold: 0.5, rootMargin: "0px 0px -22% 0px" });
      steps.forEach(function (s) { io.observe(s); });
    });
  }

  /* ---------- Testimonials: pinned horizontal rail ----------
     The whole row of cards slides sideways as you scroll vertically, so each
     card passes through the centre fully visible. The centred card is scaled
     up and brightened; the rest sit smaller and dimmer. */
  function setupTestimonialFan() {
    var track = document.querySelector("[data-tfan]");
    var rail = document.querySelector("[data-tfan-rail]");
    if (!track || !rail) return;
    var cards = [].slice.call(rail.querySelectorAll(".tcard"));
    if (!cards.length) return;

    var mql = window.matchMedia ? window.matchMedia("(max-width: 760px)") : null;
    var mode = null;        // "mobile" | "desktop" — what's currently wired
    var ticking = false;

    // Mobile: native horizontal swipe carousel — tap a card to open its note.
    function onCardTap() {
      /* jshint validthis:true */
      var card = this;
      var open = card.classList.contains("is-open");
      cards.forEach(function (c) { c.classList.remove("is-open"); });
      if (!open) card.classList.add("is-open");
    }

    function frame() {
      ticking = false;
      var vw = window.innerWidth;
      var travel = rail.scrollWidth - vw;          // total horizontal overflow
      var total = track.offsetHeight - window.innerHeight;
      var p = total > 0 ? (-track.getBoundingClientRect().top) / total : 0;
      if (p < 0) p = 0; else if (p > 1) p = 1;
      rail.style.setProperty("--shift", (-(p * travel)).toFixed(1) + "px");

      // emphasise whichever card is nearest the viewport centre — by scale only,
      // so every card stays fully opaque and its testimonial readable
      var vcx = vw / 2, nearest = null, nd = Infinity;
      cards.forEach(function (c) {
        var r = c.getBoundingClientRect();
        var cx = r.left + r.width / 2;
        var d = Math.abs(cx - vcx);
        var t = Math.max(0, 1 - d / (r.width * 1.4));    // 1 at centre → 0 far away
        c.style.setProperty("--cs", (0.9 + 0.15 * t).toFixed(3));   // 0.90 … 1.05
        if (d < nd) { nd = d; nearest = c; }
      });
      cards.forEach(function (c) { c.classList.toggle("is-active", c === nearest); });
    }
    function onScroll() {
      if (!ticking) { window.requestAnimationFrame(frame); ticking = true; }
    }

    function teardown() {
      if (mode === "desktop") {
        window.removeEventListener("scroll", onScroll, { passive: true });
        window.removeEventListener("resize", onScroll);
        // clear desktop-only inline styles so the mobile layout starts clean
        rail.style.removeProperty("--shift");
        cards.forEach(function (c) {
          c.style.removeProperty("--cs");
          c.classList.remove("is-active");
        });
      } else if (mode === "mobile") {
        cards.forEach(function (c) {
          c.removeEventListener("click", onCardTap);
          c.classList.remove("is-open");
        });
      }
    }

    function apply() {
      var next = mql && mql.matches ? "mobile" : "desktop";
      if (next === mode) return;
      teardown();
      mode = next;
      if (mode === "mobile") {
        cards.forEach(function (c) { c.addEventListener("click", onCardTap); });
      } else {
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        frame();
      }
    }

    apply();
    // re-wire when the viewport crosses the breakpoint (resize / device rotation)
    if (mql) {
      if (mql.addEventListener) mql.addEventListener("change", apply);
      else if (mql.addListener) mql.addListener(apply); // older Safari
    }
  }

  /* ---------- Drawn text shapes (underlineCurve) ----------
     Port of the reference "TextShape" highlight: one absolutely-positioned node per
     text row, an SVG path built from 4 anchor points with Catmull-Rom style control
     points (tensions .5/.5/.5/.1), drawn left-to-right over 0.5s (quad ease-out)
     250ms after the block enters the viewport. */
  function setupTextShapes() {
    var spans = document.querySelectorAll(".rr-hl");
    if (!spans.length) return;

    var reduceMotion = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function angleLen(p, q) {
      var dx = q[0] - p[0], dy = q[1] - p[1];
      return { length: Math.sqrt(dx * dx + dy * dy), angle: Math.atan2(dy, dx) };
    }
    function ctrl(t) {
      return function (cur, prev, next, reverse) {
        var a = angleLen(prev || cur, next || cur);
        var ang = a.angle + (reverse ? Math.PI : 0);
        var len = a.length * 0.5 * t;
        return [cur[0] + Math.cos(ang) * len, cur[1] + Math.sin(ang) * len];
      };
    }
    function underlineCurve(w, h) {
      var pts = [[0, h * 0.99], [w * 0.5, h * 0.88], [w, h * 0.89], [w * 0.98, h * 0.92]];
      var tens = [0.5, 0.5, 0.5, 0.1];
      var d = "M " + pts[0][0] + "," + pts[0][1];
      for (var i = 1; i < pts.length; i++) {
        var c = ctrl(tens[i]), prev = pts[i - 1];
        var cp1 = c(prev, pts[i - 2], pts[i]);
        var cp2 = c(pts[i], prev, pts[i + 1], true);
        d += " c " + (cp1[0] - prev[0]) + "," + (cp1[1] - prev[1]) +
             " "  + (cp2[0] - prev[0]) + "," + (cp2[1] - prev[1]) +
             " "  + (pts[i][0] - prev[0]) + "," + (pts[i][1] - prev[1]);
      }
      return d;
    }
    function easeOutQuad(t) { return -1 * t * (t - 2); }

    function rowRects(el) {
      var range = document.createRange();
      range.selectNodeContents(el);
      var list = range.getClientRects(), rows = [];
      for (var i = 0; i < list.length; i++) {
        var r = list[i];
        if (!r.width || !r.height) continue;
        var row = null;
        for (var j = 0; j < rows.length; j++) {
          if (Math.abs(rows[j].top - r.top) < 2) { row = rows[j]; break; }
        }
        if (row) {
          var left = Math.min(row.left, r.left), right = Math.max(row.right, r.right);
          var top = Math.min(row.top, r.top), bottom = Math.max(row.bottom, r.bottom);
          row.left = left; row.right = right; row.top = top; row.bottom = bottom;
          row.width = right - left; row.height = bottom - top;
        } else {
          rows.push({ left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height });
        }
      }
      return rows;
    }

    function Shape(span) {
      this.span = span;
      this.host = span.closest(".rr-shape-host") || span.parentNode;
      this.thicknessEm = parseFloat(span.getAttribute("data-hl-thickness")) || 0.1;
      this.color = span.getAttribute("data-hl-color") || "currentcolor";
      this.progress = -1;           // direction "right": -1 = hidden, 0 = drawn
      this.nodes = [];
      this.tween = null;
      this.readyTimer = null;
      this.layout();
    }
    Shape.prototype.layout = function () {
      var self = this;
      this.nodes.forEach(function (n) { n.node.remove(); });
      this.nodes = [];
      var fontSize = parseFloat(window.getComputedStyle(this.span).fontSize);
      var thickness = fontSize * this.thicknessEm;
      var nt = thickness - fontSize * 0.25;
      var hostRect = this.host.getBoundingClientRect();
      rowRects(this.span).forEach(function (r) {
        var w = Math.round(r.width - nt), h = Math.round(r.height);
        var node = document.createElement("div");
        node.className = "rr-shape";
        node.style.setProperty("--stroke", self.color);
        node.style.setProperty("--stroke-width", self.thicknessEm + "em");
        node.style.fontSize = fontSize + "px";
        node.style.width = w + "px";
        node.style.height = h + "px";
        node.style.left = Math.round(r.left - hostRect.left + nt * 0.5) + "px";
        node.style.top = Math.round(r.top - hostRect.top) + "px";
        node.innerHTML = '<svg><path d="' + underlineCurve(w, h) + '" /></svg>';
        self.host.appendChild(node);
        var path = node.querySelector("path");
        var len = 0;
        try { len = path.getTotalLength(); } catch (e) { len = w * 1.05; }
        self.nodes.push({ node: node, path: path, len: len });
      });
      this.render();
    };
    Shape.prototype.render = function () {
      var p = this.progress;
      this.nodes.forEach(function (n) {
        var L = Math.ceil(n.len);
        if (!L) return;
        n.path.setAttribute("stroke-dasharray", L);
        n.path.setAttribute("stroke-dashoffset", L * 2 + p * -L);
      });
    };
    Shape.prototype.stopTween = function () {
      if (this.tween) { cancelAnimationFrame(this.tween); this.tween = null; }
      if (this.readyTimer) { clearTimeout(this.readyTimer); this.readyTimer = null; }
    };
    Shape.prototype.reset = function () {
      this.stopTween();
      this.progress = reduceMotion ? 0 : -1;
      this.render();
    };
    Shape.prototype.ready = function () {
      var self = this;
      this.reset();
      if (reduceMotion) return;
      this.readyTimer = setTimeout(function () { self.animateTo(0, 0.5); }, 250);
    };
    Shape.prototype.animateTo = function (to, duration) {
      var self = this, from = this.progress, start = null;
      this.stopTween();
      function tick(now) {
        if (start === null) start = now;
        var t = Math.min((now - start) / 1000 / duration, 1);
        self.progress = from + (to - from) * easeOutQuad(t);
        self.render();
        if (t < 1) self.tween = requestAnimationFrame(tick);
        else self.tween = null;
      }
      this.tween = requestAnimationFrame(tick);
    };

    var shapes = [];
    for (var i = 0; i < spans.length; i++) shapes.push(new Shape(spans[i]));

    // (re)layout when fonts arrive or the viewport changes; keep current progress
    function relayoutAll() { shapes.forEach(function (s) { s.layout(); }); }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayoutAll);
    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(relayoutAll, 80);
    });

    // draw when the host block enters the viewport, hide again when it leaves
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          shapes.forEach(function (s) {
            if (s.host !== entry.target) return;
            if (entry.isIntersecting) s.ready(); else s.reset();
          });
        });
      }, { threshold: 0 });
      var hosts = [];
      shapes.forEach(function (s) { if (hosts.indexOf(s.host) < 0) hosts.push(s.host); });
      hosts.forEach(function (h) { io.observe(h); });
    } else {
      shapes.forEach(function (s) { s.progress = 0; s.render(); });
    }
  }

  /* ---------- Scaled text (= sqsrte-scaled-text) ----------
     The heading's font-size is scaled so the single line exactly fills its container,
     the same way the reference measures container/text width and multiplies. */
  function setupScaledText() {
    var items = document.querySelectorAll(".rr-scaled");
    if (!items.length) return;
    function fit(el) {
      var container = el.parentNode;
      container.classList.remove("loaded");
      var cw = Math.round(container.offsetWidth), tw = Math.round(el.offsetWidth);
      if (!cw || !tw) return;
      var f = parseFloat(window.getComputedStyle(el).fontSize);
      el.style.fontSize = Math.max(1, Math.round((cw / tw) * f * 10) / 10) + "px";
      container.classList.add("loaded");
    }
    function fitAll() { for (var i = 0; i < items.length; i++) fit(items[i]); }
    fitAll();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);
    var t;
    window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(fitAll, 40); });
  }

  /* ---------- Gallery slideshow (= sqs-gallery-design-stacked) ----------
     Autoplay every 3s, no controls; each change crossfades the outgoing and incoming slide
     over ~.85s (timing sampled from the reference). Static first slide under reduced motion. */
  function setupRRSlideshow() {
    var shows = document.querySelectorAll("[data-rr-slideshow]");
    if (!shows.length) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    [].forEach.call(shows, function (show) {
      var slides = show.querySelectorAll(".rr-slide");
      if (slides.length < 2) return;
      var i = 0;
      setInterval(function () {
        slides[i].classList.remove("is-active");
        i = (i + 1) % slides.length;
        slides[i].classList.add("is-active");
      }, 3000);
    });
  }

  /* ---------- Fit the services section to the screen ----------
     On laptop-height screens the text column (closing line + CTA) dropped below the fold. Shorten the
     two photos by whole grid rows so heading → CTA fits in the viewport under the fixed nav; the text
     block stays two rows below the photos, as in the reference. Desktop only (defaults = reference). */
  function setupRRFit() {
    var sec = document.querySelector(".rr-comp");
    if (!sec) return;
    var grid = sec.querySelector(".rr-grid"), head = sec.querySelector(".rr-comp__head"),
        copy = sec.querySelector(".rr-comp__copy .rr-block__inner"), nav = document.querySelector(".nav"),
        fig = sec.querySelector(".rr-comp__fig"), tag = fig && fig.querySelector(".rr-comp__tag");
    var lastNavH = -1;
    function navHeight() {
      if (!nav) return 0;
      var pos = window.getComputedStyle(nav).position;
      return (pos === "fixed" || pos === "sticky") ? nav.offsetHeight : 0;
    }
    function fit() {
      if (window.innerWidth < 768) {
        ["--ph-end", "--tx-start", "--tx-end", "--fig-max", "--sl-end"].forEach(function (p) { sec.style.removeProperty(p); });
        grid.style.removeProperty("--rows-d");
        return;
      }
      var rowH = parseFloat(window.getComputedStyle(grid).gridTemplateRows); // row 1 is never stretched
      var navH = lastNavH = navHeight();
      var top = head.getBoundingClientRect().top - sec.getBoundingClientRect().top;
      var avail = window.innerHeight - navH - top - 2 * rowH - copy.offsetHeight - 16;
      var rows = Math.max(8, Math.min(17, Math.floor(avail / rowH)));
      sec.style.setProperty("--ph-end", 3 + rows);
      sec.style.setProperty("--tx-start", 5 + rows);
      sec.style.setProperty("--tx-end", 14 + rows);

      // left photo: keep it 4:5 unless that pushes its "Planning" name below the screen — then
      // end the grid on the last row line that still fits and shorten only the photo to match
      if (!fig || !tag) return;
      ["--fig-max", "--sl-end"].forEach(function (p) { sec.style.removeProperty(p); });
      grid.style.removeProperty("--rows-d");
      var tracks = window.getComputedStyle(grid).gridTemplateRows.split(" ").map(parseFloat);
      var lineTop = function (n) { var y = 0; for (var i = 0; i < n - 1; i++) y += tracks[i]; return y; };
      var cs = window.getComputedStyle(sec);
      var limit = window.innerHeight - navH - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      var end = tracks.length + 1;
      if (lineTop(end) <= limit) return;                         // whole section already fits
      while (end > 9 && lineTop(end) > limit) end--;
      var natural = fig.offsetWidth * 1.25;
      var below = tag.offsetHeight / 2 - 0.12 * parseFloat(window.getComputedStyle(tag).fontSize) + 16;
      var figH = Math.max(natural * 0.55, Math.min(natural, lineTop(end) - lineTop(8) - below));
      if (figH < natural) sec.style.setProperty("--fig-max", figH.toFixed(1) + "px");
      sec.style.setProperty("--sl-end", end);
      grid.style.setProperty("--rows-d", Math.max(end - 1, 13 + rows));
    }
    fit();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    var t;
    window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(fit, 60); });
    // the nav changes height once scrolled; refit when it does
    window.addEventListener("scroll", function () { if (navHeight() !== lastNavH) fit(); }, { passive: true });
  }

  /* ---------- --nav-h: compact nav height for one-screen sections ---------- */
  function setupNavHeightVar() {
    var nav = document.querySelector(".nav");
    if (!nav) return;
    var last = -1;
    function set() {
      if (window.scrollY <= 40) return; // sections are viewed with the compact (scrolled) nav pinned on top
      var h = nav.offsetHeight;
      if (h !== last) { last = h; document.documentElement.style.setProperty("--nav-h", h + "px"); }
    }
    set();
    window.addEventListener("scroll", set, { passive: true });
    window.addEventListener("resize", function () { last = -1; set(); });
    nav.addEventListener("transitionend", set);
  }

  /* ---------- Init ---------- */
  function init() {
    var nav = buildNav();
    buildFooter();
    setupReveal();
    setupTypewriter();
    setupAccordion();
    setupROAcc();
    setupTimeline();
    setupScroll(nav);
    setupNavGlass(nav);
    setupMenu(nav);
    setupHeroSlideshow();
    setupForm();
    setupLightbox();
    setupTestimonialFan();
    setupScaledText();
    setupTextShapes();
    setupRRSlideshow();
    setupRRFit();
    setupNavHeightVar();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
