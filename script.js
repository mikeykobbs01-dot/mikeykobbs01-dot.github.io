const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", async function (e) {
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
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Message sent successfully!");
      } else {
        alert("❌ Error: " + data.error);
      }

    } catch (error) {
      console.error(error);
      alert("❌ Network error.");
    }
  });
}


