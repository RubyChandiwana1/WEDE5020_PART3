// Client-side validation and AJAX submit for newsletter forms

(function () {
  function validateEmail(email) {
    // Lightweight email regex suitable for client-side checks
    return /.+@.+\..+/.test(email);
  }

  async function submitForm(form) {
    const message = form.querySelector(".form-message");
    const submitBtn = form.querySelector("button[type='submit']");

    const formData = new FormData(form);
    const payload = {
      name: formData.get("name") || "",
      email: formData.get("email") || "",
      source: window.location.pathname,
    };

    // Replace with your real Formspree endpoint or backend URL
    const endpoint = form.dataset.endpoint || "https://formspree.io/f/your_form_id";

    try {
      submitBtn.disabled = true;
      if (message) {
        message.textContent = "Submitting…";
        message.style.color = "#333";
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Network error");

      if (message) {
        message.textContent = "Thanks! You’re subscribed.";
        message.style.color = "#0a7a2f";
      }
      form.reset();
    } catch (err) {
      if (message) {
        message.textContent = "Could not submit right now. Please try again later.";
        message.style.color = "#a30000";
      }
      console.error(err);
    } finally {
      submitBtn.disabled = false;
    }
  }

  function attachNewsletterHandlers() {
    const forms = document.querySelectorAll("form.js-newsletter");
    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nameEl = form.querySelector("input[name='name']");
        const emailEl = form.querySelector("input[name='email']");
        const message = form.querySelector(".form-message");

        const name = nameEl ? nameEl.value.trim() : "";
        const email = emailEl ? emailEl.value.trim() : "";

        if (nameEl && name.length < 2) {
          if (message) {
            message.textContent = "Please enter your full name.";
            message.style.color = "#a30000";
          }
          nameEl.focus();
          return;
        }

        if (!validateEmail(email)) {
          if (message) {
            message.textContent = "Please enter a valid email address.";
            message.style.color = "#a30000";
          }
          if (emailEl) emailEl.focus();
          return;
        }

        submitForm(form);
      });
    });
  }

  function attachEnquiryHandlers() {
    const forms = document.querySelectorAll("form.js-enquiry");
    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nameEl = form.querySelector("#enq-name");
        const emailEl = form.querySelector("#enq-email");
        const typeEl = form.querySelector("#enq-type");
        const msgEl = form.querySelector("#enq-msg");
        const termsEl = form.querySelector("#enq-terms");
        const message = form.querySelector(".form-message");

        const name = nameEl.value.trim();
        const email = emailEl.value.trim();
        const type = typeEl.value.trim();
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

        submitForm(form);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function(){
    document.body.classList.add("page-loaded");
    attachNewsletterHandlers();
    attachEnquiryHandlers();
    // Scroll reveal animations
    (function setupScrollReveal(){
      const initial = Array.from(document.querySelectorAll("section, .gallery-item, .card, .impact-card"));
      let io = null;
      const addReveal = (el) => {
        if (!el) return;
        el.classList.add("reveal");
        if (io) {
          io.observe(el);
        }
      };
      if ("IntersectionObserver" in window) {
        io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              io.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12 });
        initial.forEach(addReveal);
      } else {
        // Fallback: reveal without observing
        setTimeout(() => initial.forEach((el) => el.classList.add("visible")), 300);
      }

      // Expose a hook so dynamic content (e.g., gallery items) can be observed
      window.revealObserve = function(elements) {
        if (!elements) return;
        const list = elements instanceof Element ? [elements] : Array.from(elements);
        list.forEach(addReveal);
      };
    })();
  });
})();


