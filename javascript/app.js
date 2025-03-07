let iconKurv = document.querySelector('.iconKurv');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');

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
})

function addDataToHTML() {  //tilføjer data til html
    let listProducts = document.querySelector('.listProducts');  //fjerner default data fra html
    listProductHTML.innerHTML = '';

    if(products != null) // hvis der er data i json filen, så tilføjes data til html
    {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML = 
            `<img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <p class="pris">${product.price}</p>
            <button onclick="addCart(${product.id})">Tilføj til kurv</button>`;
            listProductHTML.appendChild(newProduct);

        });
    };
}
//anvender cookies således at .cart ikke nulstilles

function checkCart(){
    var cookieValue = document.cookie
    .split('; ')
    find(row => row.startsWith('listCart='))
    if (cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }
}
function addCart($idProduct){
    let productsCopy = JSON.parse(JSON.stringify(products));
    
    if(!listCart[$idProduct]) //hvis produktet ikke er i kurven
    {
        let dataProduct = productsCopy.filter(product => product.id == $idProduct)[0];
        listCart[$idProduct] = dataProduct;
        listCart[$idProduct].quantity = 1;

    }else{                   
        listCart[$idProduct].quantity++;        //hvis produktet er i kurven bliver der tilføjet 1 til quantity
    }

    //gemmer data i cookies
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
    let expires = "; expires=" + date.toUTCString();
    document.cookie = "cart=" + JSON.stringify(listCart) + expires + "; path=/";
    addCartToHTML();
}

addCartToHTML();
function addCartToHTML(){
    //fjerner default data fra html
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';

    let totalHTML = document.querySelector('.totalQuantity');
    let totalQuantity = 0;
    // hvis der er produkter i kurven, så tilføjes de til html
    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                `<img src="${product.image}">
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
                totalQuantity = totalQuantity + product.quantity;
            }
        })
    }
    totalHTML.innerText = totalQuantity;
}
