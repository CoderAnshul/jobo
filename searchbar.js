document.addEventListener("DOMContentLoaded", () => {
  // Get the existing search button from the website
  const searchButton = document.getElementById("searchButton"); // Ensure your button has this ID

  // Create search bar elements
  const searchContainer = document.createElement("div");
  searchContainer.style.cssText = `
        position: absolute;
        top: 0; /* Appears below the search button */
        left: 0;
        transform: translateX(-50%);
        width: 100%;
        min-height: 120px;
        height: fit-content;
        text-align: center;
        background: white;
        padding: 20px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        opacity: 0;
        transform: translateY(-20px);
        transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        display: none;
        z-index: 1000; /* Ensure it appears on top */
        align-items: center;
        justify-content: center;
      `;

  const searchBar = document.createElement("div");

  // Input field
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Search products...";
  input.style.cssText = `
        width: 86vw;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-right: 5px;
      `;

  // Close button
  const closeButton = document.createElement("button");
  closeButton.innerHTML = "✖";
  closeButton.style.cssText = `
        background: transparent;
        border: none;
        font-size: 26px;
        padding-left: 20px;
        cursor: pointer;
        // position: absolute;
        // top: 10px;
        // right: 10px;
        color: #888;
      `;
  closeButton.addEventListener("click", () => hideSearchBar());

  // Results container
  const results = document.createElement("ul");
  results.style.cssText = `
        list-style: none;
        padding: 0;
        max-height: 150px;
        overflow-y: auto;
        background: white;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-top: 5px;
        display: none;
        width: 86vw;
      `;

  searchBar.appendChild(input);
  searchBar.appendChild(closeButton);
  searchBar.appendChild(results);
  searchContainer.appendChild(searchBar);
  document.body.appendChild(searchContainer);

  // Product data
  const products = [
    { name: "16 Cavity Compression Molding Machine", link: "product.html" },
    { name: "24 Cavity Cap Compression Machine", link: "product-two.html" },
    { name: "36 Cavity Cap Making Machine", link: "product-three.html" },
    { name: "36 Cavity High Speed Cap Machine", link: "product-four.html" },
    { name: "Cap Folding Machine", link: "auxiliaries-1.html" },
    { name: "Cap Cooler Machine", link: "auxiliaries-2.html" },
    { name: "Cap Slitting Machine", link: "auxiliaries-3.html" },
    { name: "Cap Lining Machine", link: "auxiliaries-4.html" },
  ];

  // Toggle search bar animation
  searchButton.addEventListener("click", (event) => {
    event.stopPropagation();
    showSearchBar();
  });

  searchContainer.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent immediate closing
  });

  // Search functionality
  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();
    results.innerHTML = "";

    if (query === "") {
      results.style.display = "none"; // Hide results if input is empty
      return;
    }

    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );

    if (filteredProducts.length === 0) {
      results.style.display = "block";
      results.innerHTML = `<li style="padding: 10px; text-align: center; color: red;">No results found</li>`;
      return;
    }

    results.style.display = "block";

    filteredProducts.forEach((product) => {
      const li = document.createElement("li");
      li.textContent = product.name;
      li.style.cssText = `
            padding: 10px;
            cursor: pointer;
            border-bottom: 1px solid #ddd;
            text-align: left;
          `;
      li.addEventListener("click", () => {
        window.location.href = product.link;
      });
      results.appendChild(li);
    });
  });

  // Hide search bar when clicking outside
  document.addEventListener("click", () => hideSearchBar());

  // Functions to show and hide search bar
  function showSearchBar() {
    searchContainer.style.display = "flex";
    setTimeout(() => {
      searchContainer.style.opacity = "1";
      searchContainer.style.transform = "translateY(0)";
    }, 10);
  }

  function hideSearchBar() {
    searchContainer.style.opacity = "0";
    searchContainer.style.transform = "translateY(-20px)";
    setTimeout(() => {
      searchContainer.style.display = "none";
    }, 300);
  }
});
