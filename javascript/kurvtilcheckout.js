document.addEventListener('DOMContentLoaded', function() {
    // Hent listCart fra localStorage
    let listCart = JSON.parse(localStorage.getItem('listCart')) || {};

    // Hent cart-items elementet
    let cartItems = document.querySelector('.cart-items');

    // Hent subtotal, shipping, discount og total elementerne
    let subtotalElement = document.querySelector('.subtotal');
    let shippingElement = document.querySelector('.shipping');
    let discountElement = document.querySelector('.discount');
    let totalElement = document.querySelector('.total span');

    // Funktion til at opdatere cart items
    function updateCartItems() {
        cartItems.innerHTML = '';
        let subtotal = 0;

        Object.values(listCart).forEach(product => {
            if (product) {
                let total = product.price * product.quantity;
                subtotal += total;

                let newCartItem = document.createElement('tr');
                newCartItem.innerHTML = `
                    <td>${product.name}</td>
                    <td>${product.quantity}</td>
                    <td>DKK ${product.price.toFixed(2)}</td>
                    <td>DKK ${total.toFixed(2)}</td>
                `;
                cartItems.appendChild(newCartItem);
            }
        });

        // Beregn og vis totals
        let shipping = 50; // Fast shipping pris
        let discount = 0; // Ingen rabatkode implementeret

        let total = subtotal + shipping - discount;

        subtotalElement.innerText = `DKK ${subtotal.toFixed(2)}`;
        shippingElement.innerText = `DKK ${shipping.toFixed(2)}`;
        discountElement.innerText = `DKK ${discount.toFixed(2)}`;
        totalElement.innerText = `DKK ${total.toFixed(2)}`;
    }

    // Kald updateCartItems når siden indlæses
    updateCartItems();
});

