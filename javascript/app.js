let iconKurv = document.querySelector('.iconKurv');
let cart = document.querySelector('.cart');
let close = document.querySelector('.close');

iconKurv.addEventListener('click', () => {
  if(cart.style.right === '-100%'){
        cart.style.right = '0';
        container.style.transform = 'translateX(-400px)';
    } else{
        cart.style.right = '-100%';
        container.style.transform = 'translateX(0)'
    }
})

close.addEventListener('click', () => {
    cart.style.right = '-100%';
        container.style.transform = 'translateX(0)';
})
let listCart = [];

// Hent kurvdata fra localStorage
function checkCart() {
    const savedCart = localStorage.getItem('listCart');
    if (savedCart) {
        listCart = JSON.parse(savedCart);
    }
}

// Tilføj en vare til kurven
function addToCart(productId) {
    const product = products.find(p => p.id === productId); // Find produktet i product.json
    if (product) {
        const existingProduct = listCart.find(p => p.id === productId);
        if (existingProduct) {
            existingProduct.quantity += 1; // Øg antallet, hvis varen allerede er i kurven
        } else {
            product.quantity = 1; // Tilføj varen til kurven med antal 1
            listCart.push(product);
        }
        updateCart();
    }
}

// Opdater kurvens visning
function updateCart() {
    // Gem kurven i localStorage
    localStorage.setItem('listCart', JSON.stringify(listCart));

     // Hvis kurven er tom, nulstil priserne
     if (listCart.length === 0) {
        document.querySelector('.subtotal').innerText = 'DKK 0,00';
        document.querySelector('.shipping').innerText = 'DKK 0,00';
        document.querySelector('.discount').innerText = 'DKK 0,00';
        document.querySelector('.total span').innerText = 'DKK 0,00';
        return; // Afslut funktionen tidligt, da der ikke er noget at opdatere
    }

    // Opdater mini-kurven (total antal)
    const totalQuantity = listCart.reduce((total, product) => total + product.quantity, 0);
    document.querySelector('.totalQuantity').innerText = totalQuantity;

    // Opdater kurvsiden (hvis den er åben)
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

        // Opdater totalprisen
        document.querySelector('.total').innerText = `DKK ${totalPrice.toFixed(2)}`;
    }
}

// Indlæs produkter fra product.json
let products = [];
fetch('./javascript/product.json')
    .then(response => response.json())
    .then(data => {
        products = data;
    })
    .catch(error => console.error('Fejl ved indlæsning af produkter:', error));

// Tilføj event listeners til "Tilføj til kurv"-knapper
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = parseInt(button.getAttribute('data-id')); // Hent produktets ID
        addToCart(productId);
    });
});

// Indlæs kurven, når siden indlæses
window.addEventListener('load', () => {
    checkCart();
    updateCart();
});
document.querySelector('.continue').addEventListener('click', function(event) {
    

    // Hent værdierne fra inputfelterne
    const navn = document.querySelector('input[type="text"]').value;
    const efternavn = document.querySelectorAll('input[type="text"]')[1].value;
    const adresse = document.querySelectorAll('input[type="text"]')[2].value;
    const by = document.querySelectorAll('input[type="text"]')[3].value;
    const postnummer = document.querySelectorAll('input[type="text"]')[4].value;
    const land = document.querySelectorAll('input[type="text"]')[5].value;
    const telefon = document.querySelectorAll('input[type="text"]')[6].value;
    const email = document.querySelector('input[type="email"]').value;

    // Tjek om alle felter er udfyldt
    if (navn && efternavn && adresse && by && postnummer && land && telefon && email) {
        // Vis toast-notifikation
        const toast = document.getElementById('toast-notification');
        toast.classList.add('toast-visible');

        // Fjern notifikationen efter 3 sekunder
        setTimeout(function() {
            toast.classList.remove('toast-visible');
        }, 3000);
    } else {
        // Vis alert-boks, hvis ikke alle felter er udfyldt
        alert('Udfyld venligst alle felter.');
    }
});

