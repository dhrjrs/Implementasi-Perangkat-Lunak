// Mengambil total pembayaran dari localStorage
const totalAmountElement = document.getElementById('totalAmount');
const totalPayment = parseFloat(localStorage.getItem('totalPayment')) || 0.00;

// Fungsi untuk format angka menjadi rupiah
function formatRupiah(amount) {
    return 'Rp' + amount.toLocaleString('id-ID', { minimumFractionDigits: 3 });
}

// Menampilkan total pembayaran
totalAmountElement.textContent = formatRupiah(totalPayment);

// Ketika tombol Confirm Payment ditekan
document.getElementById('confirmPayment').addEventListener('click', function () {
    const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

    // Menampilkan metode pembayaran yang dipilih
    alert(`Payment method: ${selectedPaymentMethod}\nTotal: ${formatRupiah(totalPayment)}`);

    window.location.href = 'tes.html';
});
