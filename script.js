/* =========================================================
   1. DARK MODE TOGGLE & LOCAL STORAGE
========================================================= */
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    const icon = darkModeToggle ? darkModeToggle.querySelector("i") : null;
    if (icon) {
        icon.classList.replace("fa-moon", "fa-sun");
    }
}

if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        const icon = darkModeToggle.querySelector("i");
        
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            if (icon) icon.classList.replace("fa-moon", "fa-sun");
        } else {
            localStorage.setItem("darkMode", "disabled");
            if (icon) icon.classList.replace("fa-sun", "fa-moon");
        }
    });
}

/* =========================================================
   2. NAVIGATION LINK HIGHLIGHT (SCROLLSPY)
========================================================= */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

/* =========================================================
   3. COPY EMAIL LOGIC
========================================================= */
function copyEmail() {
    const emailText = document.getElementById("emailAddr").innerText;
    navigator.clipboard.writeText(emailText).then(() => {
        alert("Email address copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy: ", err);
    });
}

/* =========================================================
   4. IN-PAGE CONTACT FORM (DIRECT TO GMAIL - NO OUTLOOK)
========================================================= */
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
        submitBtn.disabled = true;
        formStatus.style.color = "#2563eb";
        formStatus.innerHTML = "Sending message...";

        const formData = new FormData(contactForm);

        // Uses FormSubmit directly to orjamecel@gmail.com
        fetch("https://formsubmit.co/ajax/orjamecel@gmail.com", {
            method: "POST",
            body: formData
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.ok) {
                formStatus.style.color = "#10b981";
                formStatus.innerHTML = "✓ Message sent successfully!";
                contactForm.reset();
            } else {
                formStatus.style.color = "#ef4444";
                formStatus.innerHTML = "Failed to send message.";
            }
        })
        .catch(error => {
            formStatus.style.color = "#ef4444";
            formStatus.innerHTML = "Failed to send message. Please try again.";
        })
        .then(() => {
            submitBtn.disabled = false;
            setTimeout(() => {
                formStatus.innerHTML = "";
            }, 5000);
        });
    });
}

/* =========================================================
   5. SMOOTH SCROLLING FOR ANCHORS
========================================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});