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
