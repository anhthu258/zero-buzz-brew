let iconKurv = document.querySelector('.iconKurv');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');
let listCart = {}; // Initialize listCart

document.querySelector('.checkout a').addEventListener('click', function(event) {
    cart.style.right = '-400px';
    container.style.transform = 'translateX(0)';
});


iconKurv.addEventListener('click', function() {
    if (cart.style.right === '-400px' || cart.style.right === '') {
        cart.style.right = '0';
        container.style.transform = 'translateX(-400px)';
    } else {
        cart.style.right = '-400px';
        container.style.transform = 'translateX(0)';
    }
});

close.addEventListener('click', function() {
    cart.style.right = '-400px';
    container.style.transform = 'translateX(0)';
});

let products = null;

fetch('product.json') //indhenter data fra json filen
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();
        checkCart(); // Check cart after fetching products
        addCartToHTML(); // Update cart HTML after fetching products
    });

function addDataToHTML() {  //tilføjer data til html
    let listProducts = document.querySelector('.listProducts');  //fjerner default data fra html
    listProducts.innerHTML = '';

    if (products != null) { // hvis der er data i json filen, så tilføjes data til html
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML = 
            `<img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <p class="pris">${product.price}</p>
            <button onclick="addCart(${product.id})">Tilføj til kurv</button>`;
            listProducts.appendChild(newProduct);
        });
    }
}

//anvender cookies således at .cart ikke nulstilles
function checkCart() {
    var cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));
    
    if (cookieValue) {
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }
}

function addCart($idProduct) {
    let productsCopy = JSON.parse(JSON.stringify(products));
    
    if (!listCart[$idProduct]) { // hvis produktet ikke er i kurven
        let dataProduct = productsCopy.filter(product => product.id == $idProduct)[0];
        listCart[$idProduct] = dataProduct;
        listCart[$idProduct].quantity = 1;
    } else {                   
        listCart[$idProduct].quantity++; // hvis produktet er i kurven bliver der tilføjet 1 til quantity
    }

    // gemmer data i cookies
    let date = new Date();
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
    let expires = "; expires=" + date.toUTCString();
    document.cookie = "listCart=" + JSON.stringify(listCart) + expires + "; path=/";
    addCartToHTML();
}

function addCartToHTML() {
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';

    let totalHTML = document.querySelector('.totalQuantity');
    let totalQuantity = 0;

    if (listCart) {
        Object.values(listCart).forEach(product => {
            if (product) {
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                `<img src="${product.image}" alt="">
                <div class="content">
                    <h3 class="name">${product.name}</h3>
                    <p class="price">${product.price}</p>
                </div>
                <section class="quantity">
                    <button onclick="changeQuantity(${product.id}, '-')">-</button>
                    <p>${product.quantity}</p>
                    <button onclick="changeQuantity(${product.id}, '+')">+</button>
                </section>`;
                listCartHTML.appendChild(newCart);
                totalQuantity += product.quantity;
            }
        });
    }

    totalHTML.innerText = totalQuantity;
}

function changeQuantity($idProduct, $type) {
    switch ($type) {
        case '+':
            listCart[$idProduct].quantity++;
            break;
        case '-':
            listCart[$idProduct].quantity--;

            // hvis quantity er 0, så fjernes produktet fra kurven
            if (listCart[$idProduct].quantity <= 0) {
                delete listCart[$idProduct];
            }
            break;
    
        default:
            break;
    }
    addCartToHTML();
}