const menuButton = document.querySelector("[data-menu-toggle]");
const siteNav = document.querySelector("[data-site-nav]");
const navDropdowns = document.querySelectorAll("[data-nav-dropdown]");
const desktopNav = window.matchMedia("(min-width: 901px)");
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
  ".section, .studio-marquee, .studio-metrics article, .feature-list article, .service-strip article, .service-cluster, .case-card, .value-card, .image-frame, .image-card, .contact-panel, .contact-form"
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
  ".feature-list article, .service-strip article, .service-cluster, .case-card, .value-card, .contact-panel, .contact-form, .cta-band"
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
