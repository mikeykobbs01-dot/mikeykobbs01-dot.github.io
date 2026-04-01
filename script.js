document.addEventListener("DOMContentLoaded", function () {

  // ===== SCROLL ANIMATION FOR CARDS =====
  window.addEventListener("scroll", () => {
    document.querySelectorAll('.card').forEach(card => {
      const rect = card.getBoundingClientRect();

      if (rect.top < window.innerHeight - 50) {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }
    });
  });

  // ===== HAMBURGER MENU =====
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // ===== LOGO SCROLL EFFECT =====
  const logo = document.querySelector(".logo");

  if (logo) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        logo.classList.add("scroll-active");
      } else {
        logo.classList.remove("scroll-active");
      }
    });
  }

});