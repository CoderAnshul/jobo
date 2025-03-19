document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navbarContent = document.querySelector(".navbar-content");

  mobileMenuBtn.addEventListener("click", function () {
    this.classList.toggle("active");
    navbarContent.classList.toggle("active");
  });

  // For mobile: make dropdown work with click instead of hover
  if (window.innerWidth <= 900) {
    const dropdowns = document.querySelectorAll(".dropdown");
    const subDropdowns = document.querySelectorAll(".sub-dropdown");

    dropdowns.forEach((dropdown) => {
      dropdown.querySelector("a").addEventListener("click", function (e) {
        e.preventDefault();
        dropdown.classList.toggle("active");
      });
    });

    subDropdowns.forEach((subDropdown) => {
      subDropdown.querySelector("a").addEventListener("click", function (e) {
        e.preventDefault();
        subDropdown.classList.toggle("active");

        // Close other sub-dropdowns
        subDropdowns.forEach((item) => {
          if (item !== subDropdown) {
            item.classList.remove("active");
          }
        });
      });
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-links a");
  const currentPage = window.location.pathname;

  // Define parent-child relationships for the "Products" menu
  const productPages = [
    "/working.html",
    "/product.html",
    "/product-two.html",
    "/product-three.html",
    "/product-four.html",
    "/auxiliaries-1.html",
    "/auxiliaries-2.html",
    "/auxiliaries-3.html",
    "/auxiliaries-4.html",
  ];

  // Loop through all links and apply active class
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Check if the current page belongs to Products and activate the "Products" tab
  if (productPages.includes(currentPage)) {
    document.querySelector(".dropdown > a").classList.add("active");
  }
});
