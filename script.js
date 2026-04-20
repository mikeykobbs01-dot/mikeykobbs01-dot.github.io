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

function toggleText(id) {
  const element = document.getElementById(id);

  if (element.style.display === "block") {
    element.style.display = "none";
  } else {
    element.style.display = "block";
  }
}

document.getElementById("contact-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  try {
    const response = await fetch("https://email-backend-7600.onrender.com/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Message sent successfully!");
    } else {
      alert("Failed to send message: " + data.error);
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong!");
  }
});

document.getElementById("contact-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  try {
    const response = await fetch("https://email-backend-7600.onrender.com/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "info@nanabenewaa.com",   // 👈 where YOU receive messages
        subject: "New Contact Form Message",
        message: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Message sent successfully!");
    } else {
      alert("Error: " + data.error);
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  }
});
