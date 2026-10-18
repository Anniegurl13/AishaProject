

const EMAILJS_PUBLIC_KEY = "Bnsonum9VD20yXOhM";
const EMAILJS_SERVICE_ID = "service_vaa3q6l";
const EMAILJS_TEMPLATE_ID = "template_3l5vb5c";

const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactFormStatus");
const contactSubmit = document.getElementById("contactSubmit");
const subjectSelect = document.getElementById("contactSubject");

function setContactStatus(message, type = "") {
  if (!contactStatus) return;
  contactStatus.textContent = message;
  contactStatus.classList.remove("is-success", "is-error");
  if (type) contactStatus.classList.add(type);
}

function emailJsIsConfigured() {
  return ![
    EMAILJS_PUBLIC_KEY,
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID
  ].some((value) => value.startsWith("YOUR_"));
}

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    setContactStatus("");

    if (!contactForm.reportValidity()) return;

    if (!emailJsIsConfigured()) {
      setContactStatus(
        "The contact form still needs to be connected to the foundation's email service.",
        "is-error"
      );
      return;
    }

    if (!window.emailjs) {
      setContactStatus(
        "The email service did not load. Please check your connection and try again.",
        "is-error"
      );
      return;
    }

    contactSubmit.disabled = true;
    contactSubmit.setAttribute("aria-busy", "true");
    contactSubmit.textContent = "Sending…";

    try {
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        contactForm
      );

      contactForm.reset();
      setContactStatus(
        "Thank you for reaching out. Your message has been sent.",
        "is-success"
      );
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setContactStatus(
        "Your message couldn't be sent just now. Please try again later.",
        "is-error"
      );
    } finally {
      contactSubmit.disabled = false;
      contactSubmit.removeAttribute("aria-busy");
      contactSubmit.innerHTML = 'Send message <span aria-hidden="true">→</span>';
    }
  });
}

document.querySelectorAll("[data-contact-topic]").forEach((link) => {
  link.addEventListener("click", () => {
    if (subjectSelect) {
      subjectSelect.value = link.dataset.contactTopic;
    }
  });
});
