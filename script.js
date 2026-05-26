const menuButton = document.querySelector("[data-menu-toggle]");
const siteNav = document.querySelector("[data-site-nav]");
let navDropdowns = document.querySelectorAll("[data-nav-dropdown]");
const desktopNav = window.matchMedia("(min-width: 901px)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const servicesMegaMarkup = `
  <div class="mega-grid mega-services-grid">
    <section class="mega-service-card">
      <div class="mega-service-heading"><span class="mega-icon icon-strategy" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13l-1 5.5L5.5 14l5.5-1 1-5.5 4.5 1.5z"></path></svg></span><h3>Strategy &amp; Positioning</h3></div>
      <ul>
        <li><a href="services.html#strategy">Growth Marketing</a></li>
        <li><a href="services.html#strategy">Marketing Strategy</a></li>
        <li><a href="services.html#strategy">Digital Strategy</a></li>
        <li><a href="services.html#strategy">Brand Positioning</a></li>
        <li><a href="services.html#strategy">Offer Positioning</a></li>
        <li><a href="services.html#strategy">Messaging Strategy</a></li>
      </ul>
      <a class="mega-all-link" href="services.html#strategy">All Strategy Services</a>
    </section>
    <section class="mega-service-card">
      <div class="mega-service-heading"><span class="mega-icon icon-acquisition" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm0-13a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3z"></path></svg></span><h3>Acquisition &amp; Media</h3></div>
      <ul>
        <li><a href="services.html#acquisition">Customer Acquisition</a></li>
        <li><a href="services.html#acquisition">Lead Generation</a></li>
        <li><a href="services.html#acquisition">Audience Growth</a></li>
        <li><a href="services.html#acquisition">LinkedIn Growth Marketing</a></li>
        <li><a href="services.html#acquisition">Social Media Marketing</a></li>
        <li><a href="services.html#acquisition">Performance Marketing</a></li>
      </ul>
      <a class="mega-all-link" href="services.html#acquisition">All Acquisition Services</a>
    </section>
    <section class="mega-service-card">
      <div class="mega-service-heading"><span class="mega-icon icon-automation" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path></svg></span><h3>CRM &amp; Automation</h3></div>
      <ul>
        <li><a href="services.html#automation">CRM Systems</a></li>
        <li><a href="services.html#automation">Go High Level</a></li>
        <li><a href="services.html#automation">Marketing Automation</a></li>
        <li><a href="services.html#automation">Lead Nurture Systems</a></li>
        <li><a href="services.html#automation">Email Marketing</a></li>
        <li><a href="services.html#automation">Marketing Operations</a></li>
      </ul>
      <a class="mega-all-link" href="services.html#automation">All CRM Services</a>
    </section>
    <section class="mega-service-card">
      <div class="mega-service-heading"><span class="mega-icon icon-conversion" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path></svg></span><h3>Funnels &amp; Conversion</h3></div>
      <ul>
        <li><a href="services.html#conversion">Funnel Strategy</a></li>
        <li><a href="services.html#conversion">Funnel Optimisation</a></li>
        <li><a href="services.html#conversion">Conversion Optimisation</a></li>
        <li><a href="services.html#conversion">Conversion Systems</a></li>
        <li><a href="services.html#conversion">Customer Journey Optimisation</a></li>
        <li><a href="services.html#conversion">Copywriting</a></li>
      </ul>
      <a class="mega-all-link" href="services.html#conversion">All Funnel Services</a>
    </section>
    <section class="mega-service-card">
      <div class="mega-service-heading"><span class="mega-icon icon-content" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"></path></svg></span><h3>Content &amp; Creative</h3></div>
      <ul>
        <li><a href="services.html#content">Content Strategy</a></li>
        <li><a href="services.html#content">Creative Strategy</a></li>
        <li><a href="services.html#content">Messaging Strategy</a></li>
        <li><a href="services.html#content">Webinar Marketing</a></li>
        <li><a href="services.html#content">Social Media Marketing</a></li>
        <li><a href="services.html#content">Email Marketing</a></li>
      </ul>
      <a class="mega-all-link" href="services.html#content">All Content Services</a>
    </section>
    <section class="mega-service-card">
      <div class="mega-service-heading"><span class="mega-icon icon-analytics" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path></svg></span><h3>Analytics &amp; Leadership</h3></div>
      <ul>
        <li><a href="services.html#analytics">Marketing Analytics</a></li>
        <li><a href="services.html#analytics">KPI Reporting</a></li>
        <li><a href="services.html#analytics">Campaign Strategy</a></li>
        <li><a href="services.html#analytics">Team Leadership</a></li>
        <li><a href="services.html#analytics">Marketing Operations</a></li>
      </ul>
      <a class="mega-all-link" href="services.html#analytics">All Analytics Services</a>
    </section>
  </div>
`;

document.querySelectorAll(".nav-services .nav-mega").forEach((panel) => {
  panel.innerHTML = servicesMegaMarkup;
  panel.setAttribute("aria-label", "Service categories");
});

const getCurrentPage = () => window.location.pathname.split("/").pop() || "index.html";

if (siteNav) {
  const currentPage = getCurrentPage();
  const directNavItems = Array.from(siteNav.children);
  const homeLink = directNavItems.find((item) => item.matches('a[href="index.html"]'));
  const aboutLink = directNavItems.find((item) => item.matches('a[href="about.html"]'));

  if (homeLink) {
    homeLink.remove();
  }

  if (aboutLink) {
    const aboutDropdown = document.createElement("details");
    aboutDropdown.className = "nav-dropdown nav-about";
    aboutDropdown.setAttribute("data-nav-dropdown", "");
    aboutDropdown.innerHTML = `
      <summary class="nav-link${currentPage === "about.html" ? " is-active" : ""}">About</summary>
      <div class="nav-panel nav-small-menu">
        <a href="about.html"><strong>About Omni</strong><span>How we connect strategy, systems and content.</span></a>
        <a href="about.html#approach"><strong>Approach</strong><span>Clearer offers, cleaner journeys and sharper reporting.</span></a>
        <a href="contact.html"><strong>Start a Conversation</strong><span>Talk through the next growth move.</span></a>
      </div>
    `;
    aboutLink.replaceWith(aboutDropdown);
  }
}

if (siteNav && !siteNav.querySelector('a[href="blog.html"]')) {
  const blogLink = document.createElement("a");
  const currentPage = getCurrentPage();
  blogLink.className = currentPage === "blog.html" ? "nav-link is-active" : "nav-link";
  blogLink.href = "blog.html";
  blogLink.textContent = "Blog";

  const resourcesMenu = siteNav.querySelector(".nav-resources");
  siteNav.insertBefore(blogLink, resourcesMenu || siteNav.querySelector(".nav-cta"));
}

if (siteNav && !siteNav.querySelector(".nav-search")) {
  const searchDropdown = document.createElement("details");
  searchDropdown.className = "nav-dropdown nav-search";
  searchDropdown.setAttribute("data-nav-dropdown", "");
  searchDropdown.innerHTML = `
    <summary class="nav-search-button" aria-label="Search Omni Marketing">
      <span class="sr-only">Search</span>
    </summary>
    <div class="nav-panel nav-search-panel">
      <form class="site-search" role="search" action="blog.html">
        <label for="site-search-input">Search Omni</label>
        <div class="site-search-row">
          <input id="site-search-input" name="q" type="search" placeholder="Services, blog, resources">
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  `;
  siteNav.appendChild(searchDropdown);
}

document.querySelectorAll('.footer-column[aria-label="Footer explore navigation"]').forEach((footerNav) => {
  if (footerNav.querySelector('a[href="blog.html"]')) return;

  const blogFooterLink = document.createElement("a");
  blogFooterLink.href = "blog.html";
  blogFooterLink.textContent = "Blog";

  const caseStudiesLink = footerNav.querySelector('a[href="work.html"]');
  footerNav.insertBefore(blogFooterLink, caseStudiesLink || null);
});

document.querySelectorAll(".footer-wrap").forEach((footerWrap) => {
  footerWrap.innerHTML = `
    <section class="footer-brand-block">
      <a class="footer-brand" href="index.html" aria-label="Omni Marketing home">
        <img class="footer-logo" src="assets/omni-logo.svg" data-logo-png="assets/omni-logo-black.png" alt="Omni Marketing Online">
      </a>
      <p>Omni Marketing Online</p>
      <p>Creative Content Solutions for connected growth systems.</p>
      <div class="footer-social-links">
        <a href="https://linkedin.com/company/omnimarketingonline" target="_blank" rel="noopener" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
        </a>
        <a href="https://twitter.com/omnimarketingonline" target="_blank" rel="noopener" aria-label="X / Twitter">
          <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
        </a>
        <a href="https://instagram.com/omnimarketingonline" target="_blank" rel="noopener" aria-label="Instagram">
          <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"></path></svg>
        </a>
      </div>
    </section>
    <nav class="footer-column" aria-label="Footer page navigation">
      <h2>Pages</h2>
      <a href="about.html">About</a>
      <a href="services.html">Services</a>
      <a href="blog.html">Blog</a>
      <a href="contact.html">Contact Us</a>
      <a href="contact.html">Get a Quote</a>
    </nav>
    <nav class="footer-column" aria-label="Footer service navigation">
      <h2>Services</h2>
      <a href="services.html#strategy">Strategy &amp; Positioning</a>
      <a href="services.html#acquisition">Acquisition &amp; Media</a>
      <a href="services.html#automation">CRM &amp; Automation</a>
      <a href="services.html#conversion">Funnels &amp; Conversion</a>
      <a href="services.html#content">Content &amp; Creative</a>
      <a href="services.html#analytics">Analytics &amp; Leadership</a>
    </nav>
    <nav class="footer-column" aria-label="Footer resource navigation">
      <h2>Resources</h2>
      <a href="work.html">Case Studies</a>
      <a href="white-papers.html">White Papers</a>
      <a href="blog.html">Blog Articles</a>
      <a href="contact.html">Newsletter</a>
    </nav>
    <section class="footer-column footer-contact">
      <h2>Contact</h2>
      <a href="mailto:hello@omnimarketingonline.com">hello@omnimarketingonline.com</a>
      <a href="contact.html">Start a conversation</a>
    </section>
  `;
});

navDropdowns = document.querySelectorAll("[data-nav-dropdown]");

document.querySelectorAll("[data-logo-png]").forEach((logo) => {
  const pngSource = logo.getAttribute("data-logo-png");
  if (!pngSource) return;

  const testImage = new Image();
  testImage.onload = () => {
    logo.src = pngSource;
  };
  testImage.src = pngSource;
});

if (menuButton && siteNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

const closeNavDropdowns = (exception) => {
  navDropdowns.forEach((dropdown) => {
    if (dropdown !== exception) {
      dropdown.open = false;
    }
  });
};

navDropdowns.forEach((dropdown) => {
  let closeTimer = 0;

  dropdown.addEventListener("toggle", () => {
    if (dropdown.open) {
      closeNavDropdowns(dropdown);
    }
  });

  dropdown.addEventListener("mouseenter", () => {
    if (!desktopNav.matches) return;
    window.clearTimeout(closeTimer);
    dropdown.open = true;
  });

  dropdown.addEventListener("mouseleave", () => {
    if (!desktopNav.matches) return;
    closeTimer = window.setTimeout(() => {
      dropdown.open = false;
    }, 140);
  });
});

document.addEventListener("click", (event) => {
  if (siteNav && !siteNav.contains(event.target)) {
    closeNavDropdowns();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNavDropdowns();
  }
});

const revealTargets = document.querySelectorAll(
  ".section, .studio-marquee, .studio-metrics article, .feature-list article, .service-strip article, .service-cluster, .case-card, .value-card, .image-frame, .image-card, .contact-panel, .contact-form, .infographic-step, .image-placeholder, .blog-card"
);

if (revealTargets.length) {
  revealTargets.forEach((target) => target.classList.add("is-reveal"));

  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.16 }
    );

    revealTargets.forEach((target) => revealObserver.observe(target));
  }
}

const spotlightTargets = document.querySelectorAll(
  ".feature-list article, .service-strip article, .service-cluster, .case-card, .value-card, .contact-panel, .contact-form, .cta-band, .infographic-step, .blog-card"
);

spotlightTargets.forEach((target) => {
  target.addEventListener("pointermove", (event) => {
    const rect = target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    target.style.setProperty("--mouse-x", `${x.toFixed(1)}%`);
    target.style.setProperty("--mouse-y", `${y.toFixed(1)}%`);
  });
});

const growthCanvas = document.querySelector("[data-growth-canvas]");

if (growthCanvas && !reducedMotion.matches) {
  const context = growthCanvas.getContext("2d", { alpha: true });
  let animationFrame = 0;
  let channels = [];

  if (!context) {
    growthCanvas.hidden = true;
  } else {
  const setupCanvas = () => {
    const rect = growthCanvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    growthCanvas.width = Math.max(1, Math.floor(rect.width * dpr));
    growthCanvas.height = Math.max(1, Math.floor(rect.height * dpr));
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const laneCount = rect.width < 700 ? 4 : 6;
    const centerY = rect.height * 0.53;
    channels = Array.from({ length: laneCount }, (_, index) => {
      const ratio = laneCount === 1 ? 0 : index / (laneCount - 1);
      const startY = rect.height * (0.16 + ratio * 0.62);
      const endY = centerY + (ratio - 0.5) * rect.height * 0.22;

      return {
        start: { x: -rect.width * 0.08, y: startY },
        controlA: {
          x: rect.width * (0.18 + ratio * 0.08),
          y: startY + Math.sin(index * 1.3) * rect.height * 0.11,
        },
        controlB: {
          x: rect.width * (0.56 + ratio * 0.08),
          y: endY - Math.cos(index * 1.2) * rect.height * 0.12,
        },
        end: { x: rect.width * (0.9 + ratio * 0.09), y: endY },
        delay: index * 0.135,
        speed: 0.00013 + index * 0.00001,
        width: index % 2 === 0 ? 1.4 : 1,
      };
    });
  };

  const cubicPoint = (channel, amount) => {
    const oneMinus = 1 - amount;
    const x =
      oneMinus ** 3 * channel.start.x +
      3 * oneMinus ** 2 * amount * channel.controlA.x +
      3 * oneMinus * amount ** 2 * channel.controlB.x +
      amount ** 3 * channel.end.x;
    const y =
      oneMinus ** 3 * channel.start.y +
      3 * oneMinus ** 2 * amount * channel.controlA.y +
      3 * oneMinus * amount ** 2 * channel.controlB.y +
      amount ** 3 * channel.end.y;

    return { x, y };
  };

  const drawChannelPath = (channel, strokeStyle, width) => {
    context.beginPath();
    context.moveTo(channel.start.x, channel.start.y);
    context.bezierCurveTo(
      channel.controlA.x,
      channel.controlA.y,
      channel.controlB.x,
      channel.controlB.y,
      channel.end.x,
      channel.end.y
    );
    context.strokeStyle = strokeStyle;
    context.lineWidth = width;
    context.stroke();
  };

  const drawSignal = (point, radius, alpha) => {
    const glow = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius * 5);
    glow.addColorStop(0, `rgba(255, 219, 111, ${alpha})`);
    glow.addColorStop(0.28, `rgba(230, 185, 65, ${alpha * 0.38})`);
    glow.addColorStop(1, "rgba(230, 185, 65, 0)");

    context.fillStyle = glow;
    context.beginPath();
    context.arc(point.x, point.y, radius * 5, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = `rgba(255, 236, 166, ${Math.min(1, alpha + 0.18)})`;
    context.beginPath();
    context.arc(point.x, point.y, radius, 0, Math.PI * 2);
    context.fill();
  };

  const drawGrowthStream = (time = 0) => {
    const rect = growthCanvas.getBoundingClientRect();
    context.clearRect(0, 0, rect.width, rect.height);

    const sweep = (time * 0.00008) % 1;
    const backgroundGradient = context.createLinearGradient(0, 0, rect.width, rect.height);
    backgroundGradient.addColorStop(0, "rgba(255, 219, 111, 0)");
    backgroundGradient.addColorStop(Math.max(0, sweep - 0.18), "rgba(255, 219, 111, 0)");
    backgroundGradient.addColorStop(sweep, "rgba(255, 219, 111, 0.09)");
    backgroundGradient.addColorStop(Math.min(1, sweep + 0.18), "rgba(255, 219, 111, 0)");
    backgroundGradient.addColorStop(1, "rgba(255, 219, 111, 0)");

    context.fillStyle = backgroundGradient;
    context.fillRect(0, 0, rect.width, rect.height);

    channels.forEach((channel, index) => {
      drawChannelPath(channel, "rgba(255, 219, 111, 0.1)", channel.width);
      drawChannelPath(channel, "rgba(230, 185, 65, 0.055)", channel.width + 7);

      const pulse = (time * channel.speed + channel.delay) % 1;
      const tailStart = Math.max(0, pulse - 0.13);
      const tailEnd = Math.min(1, pulse + 0.015);

      if (tailEnd > 0 && tailStart < 1) {
        context.beginPath();
        for (let step = 0; step <= 24; step += 1) {
          const amount = tailStart + (tailEnd - tailStart) * (step / 24);
          const point = cubicPoint(channel, amount);
          if (step === 0) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        }

        const trail = context.createLinearGradient(
          channel.start.x,
          channel.start.y,
          channel.end.x,
          channel.end.y
        );
        trail.addColorStop(0, "rgba(255, 219, 111, 0)");
        trail.addColorStop(0.78, "rgba(230, 185, 65, 0.28)");
        trail.addColorStop(1, "rgba(255, 236, 166, 0.82)");
        context.strokeStyle = trail;
        context.lineWidth = channel.width + 1.2;
        context.stroke();
      }

      const signalPoint = cubicPoint(channel, pulse);
      const signalSize = rect.width < 700 ? 1.9 : 2.4;
      drawSignal(signalPoint, signalSize + Math.sin(time / 280 + index) * 0.35, 0.82);

      [0.18, 0.52, 0.82].forEach((anchor, anchorIndex) => {
        const point = cubicPoint(channel, anchor);
        const nodePulse = 0.4 + Math.sin(time / 620 + index + anchorIndex) * 0.18;
        context.strokeStyle = `rgba(230, 185, 65, ${0.12 + nodePulse * 0.12})`;
        context.lineWidth = 1;
        context.beginPath();
        context.arc(point.x, point.y, 6 + nodePulse * 6, 0, Math.PI * 2);
        context.stroke();
        drawSignal(point, 1.3, 0.22 + nodePulse * 0.18);
      });
    });

    context.globalAlpha = 1;
    animationFrame = requestAnimationFrame(drawGrowthStream);
  };

  setupCanvas();
  animationFrame = requestAnimationFrame(drawGrowthStream);

  window.addEventListener("resize", setupCanvas, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrame);
      return;
    }

    setupCanvas();
    animationFrame = requestAnimationFrame(drawGrowthStream);
  });
  }
}

document.querySelectorAll("[data-site-nav] a").forEach((link) => {
  link.addEventListener("click", () => {
    closeNavDropdowns();

    if (siteNav && menuButton) {
      siteNav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
});

const contactForm = document.querySelector("[data-contact-form]");
const contactStatus = document.querySelector("[data-contact-status]");

if (contactForm && contactStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      contactStatus.textContent = "Please complete your name, email and message.";
      contactStatus.className = "form-status is-error";
      return;
    }

    const subject = encodeURIComponent(`Omni Marketing inquiry from ${name}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${formData.get("company") || ""}`,
        `Primary need: ${formData.get("need") || ""}`,
        "",
        message,
      ].join("\n")
    );

    window.location.href = `mailto:hello@omnimarketingonline.com?subject=${subject}&body=${body}`;
    contactStatus.textContent = "Your email app is opening with the inquiry prepared.";
    contactStatus.className = "form-status is-success";
  });
}

const systemStageButtons = document.querySelectorAll("[data-system-step]");
const systemLabelOutput = document.querySelector("[data-system-label-output]");
const systemTitleOutput = document.querySelector("[data-system-title-output]");
const systemCopyOutput = document.querySelector("[data-system-copy-output]");

if (systemStageButtons.length && systemLabelOutput && systemTitleOutput && systemCopyOutput) {
  let activeSystemIndex = 0;
  let userSelectedSystem = false;

  const activateSystemStage = (button, index) => {
    systemStageButtons.forEach((stageButton) => {
      stageButton.classList.toggle("is-active", stageButton === button);
    });

    activeSystemIndex = index;
    systemLabelOutput.textContent = button.dataset.systemLabel || button.textContent.trim();
    systemTitleOutput.textContent = button.dataset.systemTitle || "";
    systemCopyOutput.textContent = button.dataset.systemCopy || "";
  };

  systemStageButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      userSelectedSystem = true;
      activateSystemStage(button, index);
    });
  });

  if (!reducedMotion.matches) {
    window.setInterval(() => {
      if (userSelectedSystem || document.hidden) return;
      const nextIndex = (activeSystemIndex + 1) % systemStageButtons.length;
      activateSystemStage(systemStageButtons[nextIndex], nextIndex);
    }, 4200);
  }
}

document.querySelectorAll("[data-tilt-surface]").forEach((surface) => {
  surface.addEventListener("pointermove", (event) => {
    const rect = surface.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    surface.style.setProperty("--tilt-x", `${(-y * 5).toFixed(2)}deg`);
    surface.style.setProperty("--tilt-y", `${(x * 6).toFixed(2)}deg`);
    surface.style.setProperty("--tilt-lift", "-8px");
    surface.style.setProperty("--mouse-x", `${((x + 0.5) * 100).toFixed(1)}%`);
    surface.style.setProperty("--mouse-y", `${((y + 0.5) * 100).toFixed(1)}%`);
  });

  surface.addEventListener("pointerleave", () => {
    surface.style.setProperty("--tilt-x", "0deg");
    surface.style.setProperty("--tilt-y", "0deg");
    surface.style.setProperty("--tilt-lift", "0px");
    surface.style.setProperty("--mouse-x", "50%");
    surface.style.setProperty("--mouse-y", "50%");
  });
});

document.querySelectorAll(".button, .nav-cta").forEach((button) => {
  button.addEventListener("pointermove", (event) => {
    const rect = button.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;

    button.style.setProperty("--magnet-x", `${x.toFixed(1)}px`);
    button.style.setProperty("--magnet-y", `${y.toFixed(1)}px`);
  });

  button.addEventListener("pointerleave", () => {
    button.style.setProperty("--magnet-x", "0px");
    button.style.setProperty("--magnet-y", "0px");
  });
});

const metricNumbers = document.querySelectorAll(".studio-metrics strong");

if (metricNumbers.length && "IntersectionObserver" in window && !reducedMotion.matches) {
  const metricObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const target = entry.target;
        const finalValue = Number.parseInt(target.textContent, 10);
        if (!Number.isFinite(finalValue)) return;

        const duration = 950;
        const start = performance.now();

        const update = (time) => {
          const progress = Math.min(1, (time - start) / duration);
          const eased = 1 - (1 - progress) ** 3;
          target.textContent = String(Math.round(finalValue * eased));

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            target.textContent = String(finalValue);
          }
        };

        target.textContent = "0";
        requestAnimationFrame(update);
        observer.unobserve(target);
      });
    },
    { threshold: 0.35 }
  );

  metricNumbers.forEach((metric) => metricObserver.observe(metric));
}
