// Dark mode toggle functionality
const darkModeToggle = document.getElementById("darkModeToggle");
const darkModeToggleMobile = document.getElementById("darkModeToggleMobile");
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "dark";
if (currentTheme === "dark") {
  html.classList.add("dark");
} else {
  html.classList.remove("dark");
}

function toggleDarkMode() {
  html.classList.toggle("dark");
  const theme = html.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
}

darkModeToggle.addEventListener("click", toggleDarkMode);
darkModeToggleMobile.addEventListener("click", toggleDarkMode);

// Mobile menu functionality
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const closeMobileMenu = document.getElementById("closeMobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-link");

mobileMenuToggle.addEventListener("click", () => {
  mobileMenu.classList.add("open");
});

closeMobileMenu.addEventListener("click", () => {
  mobileMenu.classList.remove("open");
});

// Close mobile menu when clicking on a link
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Contact form handling
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // Simple form validation
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields.");
    return;
  }

  // Simulate form submission
  alert("Thank you for your message! I'll get back to you soon.");
  this.reset();
});

// Add scroll effect to navbar
window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");
  if (window.scrollY > 100) {
    nav.classList.add("shadow-lg");
  } else {
    nav.classList.remove("shadow-lg");
  }
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("slide-in");
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll(".skill-card, .project-card").forEach((el) => {
  observer.observe(el);
});

// Typing effect for home section (optional enhancement)
const titles = [
  "Software Developer",
  "Full-Stack Developer",
  "Software Engineer",
];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const titleElement = document.getElementById("typewriter");

function typeEffect() {
  const currentTitle = titles[titleIndex];

  if (isDeleting) {
    titleElement.textContent = currentTitle.substring(0, charIndex - 1);
    charIndex--;
  } else {
    titleElement.textContent = currentTitle.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentTitle.length) {
    setTimeout(() => (isDeleting = true), 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
  }

  const typingSpeed = isDeleting ? 50 : 100;
  setTimeout(typeEffect, typingSpeed);
}

// Start typing effect after page load
setTimeout(typeEffect, 1000);
