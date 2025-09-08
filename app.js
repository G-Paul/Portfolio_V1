// Smooth-scroll for internal anchor links
document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const id = link.getAttribute("href");
  const target = document.querySelector(id);
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", id);
  }
});

// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Simple reveal-on-scroll using IntersectionObserver
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Copy email to clipboard and show toast
(function () {
  const btn = document.getElementById("emailBtn");
  if (!btn) return;

  const email = btn.getAttribute("data-email");
  const toast = document.getElementById("toast");
  let hideTimer = null;

  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    toast.classList.add("is-visible");
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      toast.classList.remove("is-visible");
      // wait for transition to finish before hiding for screen readers
      setTimeout(() => (toast.hidden = true), 250);
    }, 1600);
  };

  // Work Experience: toggle expand/collapse
  document.querySelectorAll(".we-row").forEach((row) => {
    row.addEventListener("click", () => {
      const open = row.getAttribute("aria-expanded") === "true";
      // Close others (optional)
      document
        .querySelectorAll(".we-row[aria-expanded='true']")
        .forEach((r) => {
          if (r !== row) r.setAttribute("aria-expanded", "false");
        });
      row.setAttribute("aria-expanded", String(!open));
    });
  });

  const copyText = async (text) => {
    // Modern API (requires HTTPS or localhost)
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for older browsers / non-HTTPS
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch (e) {
      document.body.removeChild(ta);
      return false;
    }
  };

  btn.addEventListener("click", async (e) => {
    e.preventDefault(); // prevent navigation
    if (!email) return;

    try {
      const ok = await copyText(email);
      showToast(
        ok ? "Email copied to clipboard" : "Copy failed. Tap to open mail app."
      );
      // Optional: if copy fails, fallback to opening mailto
      if (!ok) window.location.href = `mailto:${email}`;
    } catch {
      showToast("Copy failed. Tap to open mail app.");
      window.location.href = `mailto:${email}`;
    }
  });
})();
