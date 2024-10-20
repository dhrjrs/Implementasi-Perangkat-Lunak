document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.querySelector('.cart-items');
    const scrollToBottomButton = document.getElementById('scrollToBottom');

    // Mengambil item dari localStorage
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

        // Cek jumlah produk
        if (cartItemsContainer.children.length > 4) {
            scrollToBottomButton.style.display = 'block'; // Tampilkan tombol scroll
        }
    }

    // Menghitung total checkout
    const checkoutTotal = document.getElementById('checkoutTotal');
    const totalCheckout = cartItems.reduce((acc, item) => {
        // Menghilangkan 'Rp' dan mengubah ke float untuk penghitungan
        return acc + parseFloat(item.price.replace('Rp', '').replace(/\./g, '').trim());
    }, 0);

    // Fungsi untuk format angka menjadi rupiah
    function formatRupiah(amount) {
        return 'Rp' + amount.toLocaleString('id-ID', { minimumFractionDigits: 2 });
    }

    checkoutTotal.textContent = formatRupiah(totalCheckout);

    // Fungsi ketika tombol "Proceed to Payment" ditekan
    document.getElementById('proceedToPayment').addEventListener('click', function () {
        // Menyimpan total ke localStorage sebelum pindah ke halaman pembayaran
        localStorage.setItem('totalPayment', totalCheckout.toFixed(2));

        // Arahkan ke halaman pembayaran
        window.location.href = 'payment.html';
    });

    // Menambahkan event listener untuk tombol "Kembali"
    document.getElementById('backButton').addEventListener('click', function () {
        // Mengarahkan pengguna ke halaman sebelumnya
        window.history.back(); // Kembali ke halaman sebelumnya
    });

    // Menangani tombol "Hapus" untuk setiap item
    cartItemsContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-item')) {
            const index = event.target.getAttribute('data-index');
            cartItems.splice(index, 1); // Menghapus item dari array
            localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Memperbarui localStorage
            
            // Memperbarui tampilan
            location.reload(); // Memuat ulang halaman untuk memperbarui daftar item
        }
    });

    // Tambahkan event listener untuk scroll
    scrollToBottomButton.addEventListener('click', () => {
        cartItemsContainer.scrollTop = cartItemsContainer.scrollHeight; // Scroll ke bawah
    });
});
