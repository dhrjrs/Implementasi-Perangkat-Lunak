// Dark Mode Toggle Functionality
document
  .getElementById("darkModeToggle")
  .addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".sidebar").classList.toggle("dark-mode");
    document
      .querySelectorAll(".dark-mode-toggle")
      .forEach((el) => el.classList.toggle("dark-mode"));
    document
      .querySelectorAll(".search-bar")
      .forEach((el) => el.classList.toggle("dark-mode"));
    document
      .querySelectorAll(".search-button")
      .forEach((el) => el.classList.toggle("dark-mode"));
    document
      .querySelectorAll(".category")
      .forEach((el) => el.classList.toggle("dark-mode"));
    document
      .querySelectorAll(".product-card")
      .forEach((el) => el.classList.toggle("dark-mode"));
  });

// Filter functionality for search
document.querySelector(".search-bar").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach(function (product) {
    const productName = product.getAttribute("data-name").toLowerCase();
    if (productName.includes(searchTerm)) {
      product.style.display = "block"; // Show product
    } else {
      product.style.display = "none"; // Hide product
    }
  });

  // Update category counts after filtering
  updateCategoryCounts();
});

// Filter by category
const categoryFilters = document.querySelectorAll(".category-filter");

categoryFilters.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedCategory = this.getAttribute("data-category");
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach(function (product) {
      const productCategory = product.getAttribute("data-category");

      if (selectedCategory === "All" || productCategory === selectedCategory) {
        product.style.display = "block"; // Show product
      } else {
        product.style.display = "none"; // Hide product
      }
    });

    // Update counts after filtering
    updateCategoryCounts();
  });
});

// Update the category count dynamically without changing original button text
function updateCategoryCounts() {
  const categories = [
    "Elektronik",
    "Pakaian",
    "Peralatan Rumah Tangga",
    "Kecantikan",
  ];

  categories.forEach((category) => {
    const count = document.querySelectorAll(
      `.product-card[data-category="${category}"]:not([style*="display: none"])`
    ).length;

    const categoryButton = document.querySelector(
      `.category-filter[data-category="${category}"]`
    );

    if (categoryButton) {
      // Update hanya teks angka tanpa mengubah teks kategori lainnya
      const originalText = categoryButton.textContent.split('(')[0].trim();
      categoryButton.textContent = `${originalText} (${count})`;
    }
  });

  // Update 'All' category count
  const allCount = document.querySelectorAll(
    `.product-card:not([style*="display: none"])`
  ).length;
  const allButton = document.querySelector('.category-filter[data-category="All"]');
  if (allButton) {
    const originalText = allButton.textContent.split('(')[0].trim();
    allButton.textContent = `${originalText} (${allCount})`;
  }
}

// Initial category count setup
updateCategoryCounts();

// Product detail functionality
const detailButtons = document.querySelectorAll('.detail-button');
const modal = document.getElementById('productDetailModal');
const closeModalButton = document.querySelector('.close');
const productTitle = document.getElementById('productTitle');
const productImage = document.getElementById('productImage');
const productDescription = document.getElementById('productDescription');
const productPrice = document.getElementById('productPrice');

detailButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const productCard = event.target.closest('.product-card');
    const title = productCard.getAttribute('data-name');
    const price = productCard.querySelector('p:last-of-type').textContent;
    const image = productCard.querySelector('img').src;
    
    productTitle.textContent = title;
    productPrice.textContent = price;
    productImage.src = image;

    // Set a default description, you can modify this as needed
    productDescription.textContent = 'This is a detailed description of ' + title + '.';

    modal.style.display = 'block';
  });
});

// Close modal functionality
closeModalButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal when clicking outside of the modal
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Variable to store the cart count
let cartCount = 0;
let cartItems = []; // Array to store the cart items

// Select all "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll(".product-card button:first-of-type");

// Update cart count function
function updateCartCount() {
  const cartCountElement = document.querySelector(".cart-count");
  cartCountElement.textContent = cartCount;
}

// Add event listeners to all "Add to Cart" buttons
addToCartButtons.forEach((button) => {
  button.addEventListener("click", function () {
    cartCount += 1; // Increment cart count by 1
    updateCartCount(); // Update the cart count in the icon
    
    // Get product details from the clicked product
    const productCard = button.closest(".product-card");
    const productName = productCard.getAttribute("data-name");
    const productPrice = productCard.querySelector("p:last-of-type").textContent;
    const productImage = productCard.querySelector("img").src; // Get the image URL
    
    // Add product to the cart items array
    cartItems.push({ name: productName, price: productPrice, image: productImage });
    
    // Save cart items to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  });
});
