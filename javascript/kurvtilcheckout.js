let listCart = [];


function checkCart() {
    const savedCart = localStorage.getItem('listCart');
    if (savedCart) {
        listCart = JSON.parse(savedCart);
    }
}


function addToCart(productId) {
    const product = products.find(p => p.id === productId); 
    if (product) {
        const existingProduct = listCart.find(p => p.id === productId);
        if (existingProduct) {
            existingProduct.quantity += 1; 
        } else {
            product.quantity = 1; 
            listCart.push(product);
        }
        updateCart();
    }
}


function updateCart() {
    
    localStorage.setItem('listCart', JSON.stringify(listCart));

     
     if (listCart.length === 0) {
        document.querySelector('.subtotal').innerText = 'DKK 0,00';
        document.querySelector('.shipping').innerText = 'DKK 0,00';
        document.querySelector('.discount').innerText = 'DKK 0,00';
        document.querySelector('.total span').innerText = 'DKK 0,00';
        return; 
    }

    
    const totalQuantity = listCart.reduce((total, product) => total + product.quantity, 0);
    document.querySelector('.totalQuantity').innerText = totalQuantity;

   
    if (document.querySelector('.cart-items')) {
        const cartItems = document.querySelector('.cart-items');
        cartItems.innerHTML = '';

        let totalPrice = 0;
        listCart.forEach(product => {
            const cartItem = document.createElement('tr');
            cartItem.innerHTML = `
                <td><img src="${product.image}" alt="${product.name}" width="50"></td>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>DKK ${product.price}</td>
                <td>DKK ${(product.price * product.quantity).toFixed(2)}</td>
            `;
            cartItems.appendChild(cartItem);

            totalPrice += product.price * product.quantity;
        });

       
        document.querySelector('.total').innerText = `DKK ${totalPrice.toFixed(2)}`;
    }
}


let products = [];
fetch('./javascript/product.json')
    .then(response => response.json())
    .then(data => {
        products = data;
    })
    .catch(error => console.error('Fejl ved indlæsning af produkter:', error));


document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = parseInt(button.getAttribute('data-id')); // Hent produktets ID
        addToCart(productId);
    });
});


window.addEventListener('load', () => {
    checkCart();
    updateCart();
});

