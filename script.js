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
      .querySelectorAll(".category-filter")
      .forEach((el) => el.classList.toggle("dark-mode"));
    document
      .querySelectorAll(".product-card")
      .forEach((el) => el.classList.toggle("dark-mode"));
  });


document.querySelector(".search-bar").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach(function (product) {
    const productName = product.getAttribute("data-name").toLowerCase();
    if (productName.includes(searchTerm)) {
      product.style.display = "block"; 
    } else {
      product.style.display = "none"; 
    }
  });


  updateCategoryCounts();
});


const categoryFilters = document.querySelectorAll(".category-filter");

categoryFilters.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedCategory = this.getAttribute("data-category");
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach(function (product) {
      const productCategory = product.getAttribute("data-category");

      if (selectedCategory === "All" || productCategory === selectedCategory) {
        product.style.display = "block"; 
      } else {
        product.style.display = "none"; 
      }
    });


    updateCategoryCounts();
  });
});


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
   
      const originalText = categoryButton.textContent.split('(')[0].trim();
      categoryButton.textContent = `${originalText} (${count})`;
    }
  });


  const allCount = document.querySelectorAll(
    `.product-card:not([style*="display: none"])`
  ).length;
  const allButton = document.querySelector('.category-filter[data-category="All"]');
  if (allButton) {
    const originalText = allButton.textContent.split('(')[0].trim();
    allButton.textContent = `${originalText} (${allCount})`;
  }
}


updateCategoryCounts();


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
    const description = productCard.getAttribute('data-description'); 
    productTitle.textContent = title;
    productPrice.textContent = price;
    productImage.src = image;
    productDescription.textContent = description || `This is a detailed description of ${title}.`;

    modal.style.display = 'block';
  });
});


closeModalButton.addEventListener('click', () => {
  modal.style.display = 'none';
});


window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});


let cartCount = 0;
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Retrieve from localStorage if available


const addToCartButtons = document.querySelectorAll(".product-card button:first-of-type");


function updateCartCount() {
  const cartCountElement = document.querySelector(".cart-count");
  cartCountElement.textContent = cartItems.length;
}


updateCartCount();


addToCartButtons.forEach((button) => {
  button.addEventListener("click", function () {

    const productCard = button.closest(".product-card");
    const productName = productCard.getAttribute("data-name");
    const productPrice = productCard.querySelector("p:last-of-type").textContent;
    const productImage = productCard.querySelector("img").src; 
    

    cartItems.push({ name: productName, price: productPrice, image: productImage });
    

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    updateCartCount(); 
  });
});
