const menuButton = document.querySelector("[data-menu-toggle]");
const siteNav = document.querySelector("[data-site-nav]");
let navDropdowns = document.querySelectorAll("[data-nav-dropdown]");
const desktopNav = window.matchMedia("(min-width: 901px)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const servicesMegaMarkup = `
  <div class="mega-grid mega-services-grid">
    <section class="mega-service-card">
      <div class="mega-service-heading"><span class="mega-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7"></circle><circle cx="12" cy="12" r="2"></circle><path d="M12 3v3M12 18v3M3 12h3M18 12h3"></path></svg></span><h3>Strategy &amp; Positioning</h3></div>
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
      <div class="mega-service-heading"><span class="mega-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path><path d="M3 21v-2a4 4 0 0 1 4-4h1"></path><path d="M15 8l5 5-5 5"></path><path d="M10 13h10"></path></svg></span><h3>Acquisition &amp; Media</h3></div>
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
      <div class="mega-service-heading"><span class="mega-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="7" ry="3"></ellipse><path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5"></path><path d="M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7"></path></svg></span><h3>CRM &amp; Automation</h3></div>
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
      <div class="mega-service-heading"><span class="mega-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 5h16l-6 7v5l-4 2v-7L4 5Z"></path><path d="M9 5h6"></path></svg></span><h3>Funnels &amp; Conversion</h3></div>
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
      <div class="mega-service-heading"><span class="mega-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 20l4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z"></path><path d="M14 7l3 3"></path><path d="M4 20h16"></path></svg></span><h3>Content &amp; Creative</h3></div>
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
      <div class="mega-service-heading"><span class="mega-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 19V5"></path><path d="M4 19h16"></path><path d="M8 16v-5"></path><path d="M12 16V8"></path><path d="M16 16v-3"></path><path d="M20 16V6"></path></svg></span><h3>Analytics &amp; Leadership</h3></div>
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
