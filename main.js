// main.js
// Reset on load, offset anchor scrolling by header height, mobile menu toggle.

(function () {
  // --- Reset to initial stance on load (no hash, top of page) ---
  if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname);
    window.scrollTo(0, 0);
  }

  // helper: read --header-h from :root
  function getHeaderHeight() {
    const v = getComputedStyle(document.documentElement)
      .getPropertyValue("--header-h")
      .trim();
    // assume px value; parse number
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : 0;
  }

  // smooth scroll to id with offset = header height
  function scrollToId(id) {
    const el = document.querySelector(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - getHeaderHeight();
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile menu toggle
  const burger = document.querySelector(".burger");
  const mobileMenu = document.getElementById("mobileMenu");
  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      const open = mobileMenu.style.display === "flex";
      mobileMenu.style.display = open ? "none" : "flex";
      burger.setAttribute("aria-expanded", String(!open));
    });
  }

  // Intercept in-page links and use our offset logic
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id && id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          scrollToId(id);
          if (mobileMenu) mobileMenu.style.display = "none";
          if (burger) burger.setAttribute("aria-expanded", "false");
        }
      }
    });
  });
})();
