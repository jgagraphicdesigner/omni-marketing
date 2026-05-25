const menuButton = document.querySelector("[data-menu-toggle]");
const siteNav = document.querySelector("[data-site-nav]");

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
