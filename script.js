// Highlight the active navbar link
document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-link");
  
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
      }
    });
  });
  
  // Contact form validation
  document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.querySelector(".contact-form form");
  
    if (contactForm) {
      contactForm.addEventListener("submit", function (event) {
        const name = contactForm.querySelector("#name").value.trim();
        const email = contactForm.querySelector("#email").value.trim();
        const message = contactForm.querySelector("#message").value.trim();
  
        if (!name || !email || !message) {
          alert("Please fill out all fields before submitting.");
          event.preventDefault();
        }
      });
    }
  });
  
  // Smooth scrolling for anchor links
  document.addEventListener("DOMContentLoaded", function () {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
    anchorLinks.forEach((link) => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
  
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  });
  
  // Update the footer year dynamically
  document.addEventListener("DOMContentLoaded", function () {
    const footerYear = document.querySelector("#footer-year");
  
    if (footerYear) {
      const currentYear = new Date().getFullYear();
      footerYear.textContent = currentYear;
    }
  });
  
  // Lazy load images
  document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll("img[data-src]");
  
    const lazyLoad = (image) => {
      image.setAttribute("src", image.getAttribute("data-src"));
      image.onload = () => image.removeAttribute("data-src");
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          lazyLoad(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });
  
    lazyImages.forEach((image) => observer.observe(image));
  });
  
  // Back to Top button
  document.addEventListener("DOMContentLoaded", function () {
    const backToTopButton = document.createElement("button");
    backToTopButton.textContent = "↑";
    backToTopButton.classList.add("back-to-top");
    document.body.appendChild(backToTopButton);
  
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopButton.style.display = "block";
      } else {
        backToTopButton.style.display = "none";
      }
    });
  });