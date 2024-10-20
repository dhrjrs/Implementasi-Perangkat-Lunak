
const totalAmountElement = document.getElementById('totalAmount');
const totalPayment = parseFloat(localStorage.getItem('totalPayment')) || 0.00;

function formatRupiah(amount) {
    return 'Rp' + amount.toLocaleString('id-ID', { minimumFractionDigits: 3 });
}

totalAmountElement.textContent = formatRupiah(totalPayment);


document.getElementById('confirmPayment').addEventListener('click', function () {
    const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked').value;


    alert(`Payment method: ${selectedPaymentMethod}\nTotal: ${formatRupiah(totalPayment)}`);

    window.location.href = 'tes.html';
});
