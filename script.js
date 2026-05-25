const menuButton = document.querySelector("[data-menu-toggle]");
const siteNav = document.querySelector("[data-site-nav]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

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

const revealTargets = document.querySelectorAll(
  ".section, .feature-list article, .service-strip article, .service-cluster, .case-card, .value-card, .image-frame, .image-card, .contact-panel, .contact-form"
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

const growthCanvas = document.querySelector("[data-growth-canvas]");

if (growthCanvas && !reducedMotion.matches) {
  const context = growthCanvas.getContext("2d", { alpha: true });
  let animationFrame = 0;
  let particles = [];

  if (!context) {
    growthCanvas.hidden = true;
  } else {
  const setupCanvas = () => {
    const rect = growthCanvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    growthCanvas.width = Math.max(1, Math.floor(rect.width * dpr));
    growthCanvas.height = Math.max(1, Math.floor(rect.height * dpr));
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = rect.width < 700 ? 24 : 40;
    particles = Array.from({ length: count }, (_, index) => ({
      x: ((index * 137) % rect.width) + Math.random() * 24,
      y: ((index * 89) % rect.height) + Math.random() * 24,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.18,
      radius: Math.random() * 1.8 + 1.1,
      phase: Math.random() * Math.PI * 2,
    }));
  };

  const drawNetwork = (time = 0) => {
    const rect = growthCanvas.getBoundingClientRect();
    context.clearRect(0, 0, rect.width, rect.height);

    const gradient = context.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "rgba(255, 219, 111, 0.72)");
    gradient.addColorStop(0.48, "rgba(230, 185, 65, 0.3)");
    gradient.addColorStop(1, "rgba(230, 185, 65, 0.52)");

    particles.forEach((particle) => {
      particle.x += particle.vx + Math.sin(time / 1200 + particle.phase) * 0.08;
      particle.y += particle.vy + Math.cos(time / 1400 + particle.phase) * 0.06;

      if (particle.x < 0 || particle.x > rect.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > rect.height) particle.vy *= -1;
      particle.x = Math.max(0, Math.min(rect.width, particle.x));
      particle.y = Math.max(0, Math.min(rect.height, particle.y));
    });

    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const first = particles[i];
        const second = particles[j];
        const dx = first.x - second.x;
        const dy = first.y - second.y;
        const distance = Math.hypot(dx, dy);
        const maxDistance = rect.width < 700 ? 118 : 168;

        if (distance < maxDistance) {
          context.globalAlpha = (1 - distance / maxDistance) * 0.42;
          context.strokeStyle = gradient;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(first.x, first.y);
          context.lineTo(second.x, second.y);
          context.stroke();
        }
      }
    }

    particles.forEach((particle) => {
      const pulse = Math.sin(time / 500 + particle.phase) * 0.8;
      context.globalAlpha = 0.86;
      context.fillStyle = "rgba(255, 219, 111, 0.92)";
      context.beginPath();
      context.arc(particle.x, particle.y, Math.max(1, particle.radius + pulse), 0, Math.PI * 2);
      context.fill();
    });

    context.globalAlpha = 1;
    animationFrame = requestAnimationFrame(drawNetwork);
  };

  setupCanvas();
  animationFrame = requestAnimationFrame(drawNetwork);

  window.addEventListener("resize", setupCanvas, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrame);
      return;
    }

    setupCanvas();
    animationFrame = requestAnimationFrame(drawNetwork);
  });
  }
}

document.querySelectorAll("[data-site-nav] a").forEach((link) => {
  link.addEventListener("click", () => {
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
