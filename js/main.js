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
    { label: "Services", href: "services.html", page: "services" },
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
    { label: "Services", href: "services.html" },
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
    nav.querySelectorAll(".nav__link").forEach(function (a) {
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

  /* ---------- Contact form (front-end only) ---------- */
  function setupForm() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.querySelector("[data-form-note]");
      // Wire this to email / a backend / Formspree etc. when ready.
      if (note) {
        note.textContent = "Thank you — your note is on its way. We reply within two days.";
        note.style.display = "block";
      }
      form.reset();
    });
  }

  /* ---------- Init ---------- */
  function init() {
    var nav = buildNav();
    buildFooter();
    setupReveal();
    setupTypewriter();
    setupScroll(nav);
    setupMenu(nav);
    setupHeroSlideshow();
    setupForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
