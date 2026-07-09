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
    { label: "Services", children: [
      { label: "Wedding Planning", href: "service-wedding-planning.html", desc: "The whole celebration, conducted" },
      { label: "Decoration", href: "service-decoration.html", desc: "Sets that earn the camera" },
      { label: "Entertainment", href: "service-entertainment.html", desc: "The sound of the night" }
    ] },
    { label: "Gallery", href: "gallery.html", page: "gallery" }
  ];
  var NAV_RIGHT = [
    { label: "Testimonials", href: "testimonials.html", page: "testimonials" },
    { label: "Contact", href: "contact.html", page: "contact" }
  ];
  var WORDMARK = "HUMSAFAR WEDDINGS";
  var TAGLINE = "By GNK Events";

  /* ---- Footer config: edit links + contact here, once ---- */
  var FOOTER_SERVICES = [
    { label: "Wedding Planning", href: "service-wedding-planning.html" },
    { label: "Decoration", href: "service-decoration.html" },
    { label: "Entertainment", href: "service-entertainment.html" }
  ];
  var FOOTER_EXPLORE = [
    { label: "About", href: "about.html" },
    { label: "Gallery", href: "gallery.html" },
    { label: "Testimonials", href: "testimonials.html" },
    { label: "Contact", href: "contact.html" }
  ];
  var CONTACT = {
    email: "hello@humsafargnk.com",
    phoneLabel: "+91 98 1100 4422",
    whatsapp: "https://wa.me/919811004422",
    studio: "Hauz Khas, New Delhi"
  };
  var SOCIAL = [
    { label: "Instagram", href: "https://instagram.com/humsafar.gnk" },
    { label: "WhatsApp", href: "https://wa.me/919811004422" },
    { label: "Email", href: "mailto:hello@humsafargnk.com" }
  ];

  var body = document.body;
  var currentPage = body.getAttribute("data-page") || "";
  var navTone = body.getAttribute("data-nav") || "solid"; // dark | paper | solid

  /* ---------- Shared navigation ---------- */
  function linkHtml(item) {
    var current = item.page === currentPage ? ' aria-current="page"' : "";
    if (item.children && item.children.length) {
      var menu = item.children.map(function (c) {
        return '<a class="nav__menu-link" href="' + c.href + '">' +
                 '<span class="nav__menu-title">' + c.label + "</span>" +
                 (c.desc ? '<span class="nav__menu-desc">' + c.desc + "</span>" : "") +
               "</a>";
      }).join("");
      var trigger = item.href
        ? '<a class="nav__link" href="' + item.href + '"' + current + ">" + item.label +
            '<span class="nav__caret" aria-hidden="true"></span></a>'
        : '<span class="nav__link nav__link--trigger" role="button" tabindex="0" aria-haspopup="true">' +
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
  function footerLink(item) {
    var ext = /^https?:|^mailto:/.test(item.href);
    var attrs = ext ? ' target="_blank" rel="noopener"' : "";
    return '<li><a class="footer__link" href="' + item.href + '"' + attrs + ">" + item.label + "</a></li>";
  }

  function buildFooter() {
    var footer = document.createElement("footer");
    footer.className = "footer";
    var year = new Date().getFullYear();

    footer.innerHTML =
      '<div class="container">' +

        /* ---- main grid ---- */
        '<div class="footer__main">' +

          /* brand */
          '<div class="footer__brand">' +
            '<a class="footer__wordmark" href="index.html">' +
              '<img class="footer__logo" src="images/hw-logo.png" alt="Humsafar Wedding by GNK">' +
              '<span class="footer__brand-text">' +
                '<span class="footer__brand-main">' + WORDMARK + "</span>" +
                '<span class="footer__brand-sub">' + TAGLINE + "</span>" +
              "</span>" +
            "</a>" +
            '<p class="footer__blurb">An Indian heart, a foreign polish — planning, decoration and entertainment for couples who want a celebration in two registers at once.</p>' +
            '<div class="footer__social">' +
              SOCIAL.map(function (s) {
                return '<a class="footer__social-link" href="' + s.href + '" target="_blank" rel="noopener">' + s.label + "</a>";
              }).join('<span class="footer__social-dot">·</span>') +
            "</div>" +
          "</div>" +

          /* explore */
          '<nav class="footer__col" aria-label="Site">' +
            '<div class="footer__col-head">Explore</div>' +
            "<ul class=\"footer__list\">" + FOOTER_EXPLORE.map(footerLink).join("") + "</ul>" +
          "</nav>" +

          /* services */
          '<nav class="footer__col" aria-label="Services">' +
            '<div class="footer__col-head">Services</div>' +
            "<ul class=\"footer__list\">" + FOOTER_SERVICES.map(footerLink).join("") + "</ul>" +
          "</nav>" +

          /* contact */
          '<div class="footer__col footer__col--contact">' +
            '<div class="footer__col-head">Get in touch</div>' +
            '<ul class="footer__list footer__list--contact">' +
              '<li><span class="footer__contact-label">Letters</span><a class="footer__link" href="mailto:' + CONTACT.email + '">' + CONTACT.email + "</a></li>" +
              '<li><span class="footer__contact-label">WhatsApp</span><a class="footer__link" href="' + CONTACT.whatsapp + '" target="_blank" rel="noopener">' + CONTACT.phoneLabel + "</a></li>" +
              '<li><span class="footer__contact-label">Studio</span><span class="footer__contact-value">' + CONTACT.studio + "</span></li>" +
            "</ul>" +
            '<a class="footer__cta" href="contact.html">Begin a conversation →</a>' +
          "</div>" +

        "</div>" +

        /* ---- bottom bar ---- */
        '<div class="footer__bottom">' +
          '<div class="footer__legal">© ' + year + " Humsafar Wedding by GNK · All rights reserved</div>" +
          '<div class="footer__sub-links">' +
            '<a class="footer__link" href="contact.html">Privacy</a>' +
            '<span class="footer__social-dot">·</span>' +
            '<a class="footer__link" href="contact.html">Terms</a>' +
            '<span class="footer__social-dot">·</span>' +
            '<span class="footer__credit">A GNK Events house · New Delhi</span>' +
          "</div>" +
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
    function fieldVal(name) {
      var el = form.querySelector('[name="' + name + '"]');
      return el ? el.value.trim() : "";
    }
    function markInvalid(name, bad) {
      var el = form.querySelector('[name="' + name + '"]');
      if (el) el.setAttribute("aria-invalid", bad ? "true" : "false");
      return el;
    }

    // clear the invalid flag as the user fixes a field
    ["name", "email", "message"].forEach(function (n) {
      var el = form.querySelector('[name="' + n + '"]');
      if (el) el.addEventListener("input", function () { el.setAttribute("aria-invalid", "false"); });
    });

    function validate() {
      var firstBad = null;
      [["name", fieldVal("name") !== ""],
       ["email", EMAIL_RE.test(fieldVal("email"))],
       ["message", fieldVal("message") !== ""]
      ].forEach(function (pair) {
        var ok = pair[1];
        var el = markInvalid(pair[0], !ok);
        if (!ok && !firstBad) firstBad = el;
      });
      return firstBad;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstBad = validate();
      if (firstBad) {
        setNote("Please add your names, a valid email, and a short note.", "error");
        firstBad.focus();
        return;
      }

      var endpoint = form.getAttribute("action");
      // No real endpoint wired yet → don't pretend it sent.
      if (!endpoint || /YOUR_FORM_ID/.test(endpoint)) {
        setNote("This form isn’t connected yet — please email hello@humsafargnk.com for now.", "error");
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
              : "Something went wrong. Please email hello@humsafargnk.com instead.";
            setNote(msg, "error");
          });
        }
      }).catch(function () {
        setNote("Network error — please check your connection or email hello@humsafargnk.com.", "error");
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

  /* ---------- Init ---------- */
  function init() {
    var nav = buildNav();
    buildFooter();
    setupReveal();
    setupTypewriter();
    setupAccordion();
    setupTimeline();
    setupScroll(nav);
    setupMenu(nav);
    setupHeroSlideshow();
    setupForm();
    setupLightbox();
    setupTestimonialFan();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
