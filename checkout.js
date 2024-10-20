document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.querySelector('.cart-items');
    const scrollToBottomButton = document.getElementById('scrollToBottom');

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>No items in the cart yet.</p>';
    } else {
        cartItemsContainer.innerHTML = cartItems
            .map((item, index) => `
                <div class="checkout-item">
                    <img src="${item.image}" alt="${item.name}" class="checkout-product-image" />
                    <div class="checkout-product-details">
                        <p><strong>${item.name}</strong></p>
                        <p>${item.price}</p>
                    </div>
                    <button class="remove-item" data-index="${index}">Hapus</button> <!-- Tombol Hapus -->
                </div>
            `)
            .join('');

        if (cartItemsContainer.children.length > 4) {
            scrollToBottomButton.style.display = 'block'; 
        }
    }

    const checkoutTotal = document.getElementById('checkoutTotal');
    const totalCheckout = cartItems.reduce((acc, item) => {
        return acc + parseFloat(item.price.replace('Rp', '').replace(/\./g, '').trim());
    }, 0);

    function formatRupiah(amount) {
        return 'Rp' + amount.toLocaleString('id-ID', { minimumFractionDigits: 2 });
    }

    checkoutTotal.textContent = formatRupiah(totalCheckout);

    document.getElementById('proceedToPayment').addEventListener('click', function () {
        localStorage.setItem('totalPayment', totalCheckout.toFixed(2));

        window.location.href = 'payment.html';
    });

    document.getElementById('backButton').addEventListener('click', function () {
        window.history.back(); 
    });

  
    cartItemsContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-item')) {
            const index = event.target.getAttribute('data-index');
            cartItems.splice(index, 1); 
            localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
            
          
            location.reload(); 
        }
    });

 
    scrollToBottomButton.addEventListener('click', () => {
        cartItemsContainer.scrollTop = cartItemsContainer.scrollHeight; 
    });
});
