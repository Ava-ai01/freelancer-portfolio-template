/* ============================================================
   CONFIG — rebrand this whole template from ONE place.
   ============================================================
   Edit the values below and the entire site updates:
   name, role, accent color, project cards, and social links —
   no HTML or CSS editing required.

   FIELDS
   ------
   name          Full display name (nav, hero headline, footer)
   monogram      1–2 letters used for the brand mark
   role          One-line role shown in the footer + meta
   kicker        Small line above the hero headline
   lede          Hero intro paragraph
   availability  Badge text next to the hero visual
   ctaLabel      Text of the ONE primary button everywhere
   email / phone Contact details (used in contact + mobile menu)
   location      Short location (hero kicker, mobile menu, footer)
   locationFull  Longer location line in the contact section
   colors        Set enabled: true and change accent to rebrand
                 the whole palette from JS (e.g. "#b3451f").
                 Set enabled: false to edit styles.css by hand.
   projects      The work grid — add, remove, or reorder cards.
                 image: path to the card photo (local, in assets/)
                 alt:   describe the photo for screen readers/SEO
   socials       Footer social links — add or remove freely.
   ============================================================ */

const CONFIG = {
  name: "Maya Chen",
  monogram: "MC",
  role: "Product designer & front-end developer",
  kicker: "Product designer & front-end developer — Chicago, IL",
  lede: "I design and build brands, websites, and product interfaces that make small businesses look — and convert — like they hired an agency.",
  availability: "Available for new projects",
  ctaLabel: "Start a project",
  email: "hello@mayachen.design",
  phone: "+1 (312) 555-0194",
  location: "Chicago, IL",
  locationFull: "Chicago, IL — working with clients everywhere",

  colors: {
    enabled: true,
    accent: "#3f3fd6"
  },

  projects: [
    {
      title: "Copperline Café — Rebrand & Site",
      category: "Brand & Website",
      result: "Full rebrand and one-page site for a neighborhood coffee shop. Online orders up 40% in the first quarter.",
      image: "assets/mayaport-cafe.jpg",
      alt: "Barista pouring coffee in the moody, rebranded Copperline Café"
    },
    {
      title: "Northloop — App Redesign",
      category: "Product Design",
      result: "End-to-end UI overhaul for a fitness app. 4.8-star App Store rating after relaunch.",
      image: "assets/mayaport-app.jpg",
      alt: "Upward view between glass skyscrapers — the graphic launch visual for the Northloop app"
    },
    {
      title: "Fieldnotes — Editorial System",
      category: "Editorial Design",
      result: "Identity and print system for a quarterly journal. Both print runs sold out twice.",
      image: "assets/mayaport-editorial.jpg",
      alt: "A wall of stacked books showcasing the Fieldnotes journal identity system"
    },
    {
      title: "Orchard Box — Packaging",
      category: "Brand & Packaging",
      result: "Logo and packaging for a farm-box subscription. Unboxings now drive a third of their social traffic.",
      image: "assets/mayaport-package.jpg",
      alt: "Fresh strawberries in Orchard Box's new branded farm-box packaging"
    },
    {
      title: "Ledgerly — SaaS Dashboard",
      category: "Product UI",
      result: "Dashboard design system for an accounting SaaS. Trial sign-ups doubled within two months of launch.",
      image: "assets/mayaport-dashboard.jpg",
      alt: "Swirling light trails in a tunnel — the launch visual for the Ledgerly dashboard redesign"
    },
    {
      title: "Atelier Nord — Portfolio Site",
      category: "Website",
      result: "Portfolio site for a furniture studio. Picked up an Awwwards honorable mention on launch week.",
      image: "assets/mayaport-studio.jpg",
      alt: "Inside the Atelier Nord showroom featured on their new portfolio site"
    }
  ],

  socials: [
    { label: "Instagram", url: "https://instagram.com/" },
    { label: "LinkedIn", url: "https://linkedin.com/" },
    { label: "Dribbble", url: "https://dribbble.com/" }
  ]
};

/* ============================================================
   Below this line is engine code — you don't need to touch it.
   ============================================================ */
(function () {
  "use strict";

  /* ---- 1. Apply the brand color ---------------------------------- */
  if (CONFIG.colors && CONFIG.colors.enabled && CONFIG.colors.accent) {
    document.documentElement.style.setProperty("--accent", CONFIG.colors.accent);
  }

  /* ---- 2. Stamp text fields onto every [data-cfg] element -------- */
  // data-cfg="name"           -> sets text content to CONFIG.name
  // data-cfg="emailLink"      -> sets BOTH text and href (mailto:)
  // data-cfg="phoneLink"      -> sets BOTH text and href (tel:)
  // data-cfg-label="ctaLabel" -> overrides the text with CONFIG.ctaLabel
  var linkFields = {
    emailLink: "mailto:" + CONFIG.email,
    phoneLink: "tel:" + CONFIG.phone.replace(/[^+\d]/g, ""),
    ctaMail: "mailto:" + CONFIG.email + "?subject=Project%20inquiry"
  };
  var nameParts = String(CONFIG.name || "").split(/\s+/);
  var derived = {
    nameFirst: nameParts[0] || "",
    nameLast: nameParts.slice(1).join(" ") || ""
  };
  document.querySelectorAll("[data-cfg]").forEach(function (el) {
    var key = el.getAttribute("data-cfg");
    var text;
    if (key in derived) {
      text = derived[key];
    } else if (key === "emailLink") {
      text = CONFIG.email;
    } else if (key === "phoneLink") {
      text = CONFIG.phone;
    } else {
      text = CONFIG[key];
    }
    if (el.hasAttribute("data-cfg-label")) {
      text = CONFIG[el.getAttribute("data-cfg-label")];
    }
    if (text != null) el.textContent = text;
    if (key in linkFields) el.setAttribute("href", linkFields[key]);
  });

  /* ---- 3. Build the work grid from CONFIG.projects --------------- */
  var grid = document.getElementById("workGrid");
  if (grid && Array.isArray(CONFIG.projects)) {
    grid.innerHTML = CONFIG.projects
      .map(function (p, i) {
        var delay = i % 2 === 0 ? "" : ' data-reveal-delay="1"';
        return (
          '<article class="work-card reveal"' + delay + ">" +
          '<div class="work-frame">' +
          '<img src="' + p.image + '" alt="' + p.alt + '" loading="lazy" width="900" height="675" />' +
          '<div class="work-veil" aria-hidden="true"><span>View case study</span></div>' +
          "</div>" +
          '<div class="work-meta">' +
          '<span class="work-tag">' + p.category + "</span>" +
          "<h3>" + p.title + "</h3>" +
          "<p>" + p.result + "</p>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  /* ---- 4. Build the footer social links --------------------------- */
  var social = document.getElementById("footerSocial");
  if (social && Array.isArray(CONFIG.socials)) {
    social.innerHTML = CONFIG.socials
      .map(function (s) {
        return '<a href="' + s.url + '" target="_blank" rel="noopener">' + s.label + "</a>";
      })
      .join("");
  }

  /* ---- 5. Footer year --------------------------------------------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---- 6. Sticky nav state ---------------------------------------- */
  var nav = document.getElementById("siteNav");
  var onScroll = function () {
    nav.classList.toggle("scrolled", window.scrollY > 24);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- 7. Full-screen mobile menu --------------------------------- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("mobileMenu");
  var setMenu = function (open) {
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.setAttribute("aria-hidden", String(!open));
  };
  toggle.addEventListener("click", function () {
    setMenu(!document.body.classList.contains("menu-open"));
  });
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { setMenu(false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  /* ---- 8. Scroll reveals (IntersectionObserver) ------------------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---- 9. Animated stat counters ---------------------------------- */
  var counters = document.querySelectorAll("[data-count]");
  var animateCount = function (el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    if (reduceMotion) {
      el.textContent = target.toFixed(decimals);
      return;
    }
    var start = null;
    var duration = 1400;
    var step = function (ts) {
      if (!start) start = ts;
      var t = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window && !reduceMotion) {
    var cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(animateCount);
  }
})();
