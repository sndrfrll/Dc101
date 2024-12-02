document.addEventListener("DOMContentLoaded", () => {
    const productRows = document.querySelectorAll('.row');

    productRows.forEach(row => {
        const img = row.querySelector('img');
        img.addEventListener('click', () => {
            const productName = row.querySelector('h4').textContent;
            const productPrice = row.querySelector('.truePrice').textContent;
            const productImage = img.getAttribute('src');

            const product = {
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            const existingProduct = cart.find(item => item.name === productName);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push(product); 
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            alert(`${productName} has been added to your cart!`);
        });
    });
}
);