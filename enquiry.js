// Enquiry page: validation, simple response generation, and optional async send
(function () {
  function validateEmail(email) {
    return /.+@.+\..+/.test(email);
  }

  function buildResponse({ type, participants }) {
    const p = Number(participants || 0);
    switch (type) {
      case "circumcision":
        return "Estimated availability within 7–10 days. Our team will contact you to schedule. Educational materials and aftercare guidance included.";
      case "hiv-support":
        return "HIV testing and counseling are available weekly. You can book a confidential session; ART support can be arranged if required.";
      case "workshop": {
        const base = 1500; // ZAR base fee example
        const perHead = 30;
        const est = base + Math.max(0, p) * perHead;
        return `Workshops are available on weekdays. Estimated facilitation cost: ~ZAR ${est.toLocaleString()} (includes materials).`;
      }
      case "volunteer":
        return "Thank you for your interest! We’ll share our volunteer onboarding pack and sponsorship tiers within 24 hours.";
      default:
        return "Thanks for your enquiry. Our team will respond shortly with details.";
    }
  }

  async function send(formData) {
    // Replace with your real Formspree endpoint to receive submissions
    const endpoint = "https://formspree.io/f/your_form_id";
    try {
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
    } catch (e) {
      // Best-effort; response card is still shown
      console.warn("Enquiry send failed (non-blocking)", e);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("enquiry-form");
    const message = form?.querySelector(".form-message");
    const responseCard = document.getElementById("enquiry-response");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const nameEl = document.getElementById("enq-name");
      const emailEl = document.getElementById("enq-email");
      const typeEl = document.getElementById("enq-type");
      const partEl = document.getElementById("enq-participants");
      const msgEl = document.getElementById("enq-msg");
      const termsEl = document.getElementById("enq-terms");

      const name = nameEl.value.trim();
      const email = emailEl.value.trim();
      const type = typeEl.value;
      const participants = partEl.value;
      const msg = msgEl.value.trim();

      if (name.length < 2) {
        message.textContent = "Please enter your full name.";
        message.style.color = "#a30000";
        nameEl.focus();
        return;
      }
      if (!validateEmail(email)) {
        message.textContent = "Please enter a valid email address.";
        message.style.color = "#a30000";
        emailEl.focus();
        return;
      }
      if (!type) {
        message.textContent = "Please select an enquiry type.";
        message.style.color = "#a30000";
        typeEl.focus();
        return;
      }
      if (msg.length < 10) {
        message.textContent = "Please provide a brief message (10+ characters).";
        message.style.color = "#a30000";
        msgEl.focus();
        return;
      }
      if (!termsEl.checked) {
        message.textContent = "Please agree to be contacted so we can respond.";
        message.style.color = "#a30000";
        termsEl.focus();
        return;
      }

      // Build user-facing response and show it
      const reply = buildResponse({ type, participants });
      if (responseCard) {
        responseCard.style.display = "block";
        responseCard.innerHTML = `<h3>Immediate Response</h3><p>${reply}</p>`;
        if (window.revealObserve) window.revealObserve(responseCard);
        // Ensure it animates in even if already in view
        requestAnimationFrame(() => responseCard.classList.add("visible"));
      }
      message.textContent = "Thanks! We’ve received your enquiry.";
      message.style.color = "#0a7a2f";

      // Best-effort async send
      const formData = new FormData(form);
      formData.set("source", "enquiry.html");
      await send(formData);
      form.reset();
    });
  });
})();


