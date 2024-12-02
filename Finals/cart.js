document.addEventListener("DOMContentLoaded", () => {
    const cartTableBody = document.getElementById('cart-items');
    const subtotalCell = document.getElementById('subtotal-value');
    const totalCell = document.getElementById('total-value');

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let overallSubtotal = 0;

    if (cart.length === 0) {
        cartTableBody.innerHTML = '<tr><td colspan="6">Your cart is empty.</td></tr>';
    } else {
        cart.forEach(product => {
            const unitPrice = parseFloat(product.price.replace(/[^\d.]/g, ''));
            const productSubtotal = unitPrice * product.quantity;
            overallSubtotal += productSubtotal;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td><a href="#" class="remove-item" data-name="${product.name}"><i class="fa-regular fa-circle-xmark"></i></a></td>
                <td><img src="${product.image}" alt="${product.name}" width="50"></td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td><input type="number" value="${product.quantity}" min="1" class="quantity-input" data-name="${product.name}"></td>
                <td>&#8369; ${productSubtotal.toFixed(2)}</td>
            `;
            cartTableBody.appendChild(row);
        });

        setupEventListeners();
    }

    updateOrderSummary();

    function updateOrderSummary() {
        subtotalCell.innerHTML = `&#8369; ${overallSubtotal.toFixed(2)}`;
        totalCell.innerHTML = `<strong>&#8369; ${overallSubtotal.toFixed(2)}</strong>`;
    }

    function setupEventListeners() {
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', event => {
                event.preventDefault();
                const name = event.target.closest('.remove-item').dataset.name;
                const updatedCart = cart.filter(product => product.name !== name);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                location.reload();
            });
        });

        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', event => {
                const name = event.target.dataset.name;
                const newQuantity = parseInt(event.target.value);

                if (newQuantity > 0) {
                    const product = cart.find(product => product.name === name);
                    product.quantity = newQuantity;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    location.reload();
                } else {
                    alert("Quantity must be at least 1.");
                    location.reload();
                }
            });
        });
    }
});
