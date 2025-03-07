document.addEventListener('DOMContentLoaded', function() {
    let iconCart = document.querySelector('.iconCart');
    let cart = document.querySelector('.cart');
    let close = document.querySelector('.close');
    let listCart = JSON.parse(localStorage.getItem('listCart')) || {};

    if (!iconCart || !cart || !close) {
        console.error('Fejl: DOM-elementer ikke fundet!');
        return;
    }

    // Åbn/luk kurv
    iconCart.addEventListener('click', function() {
        cart.classList.toggle('open');
    });

    close.addEventListener('click', function() {
        cart.classList.remove('open');
    });

    // Hent produkter fra JSON
    fetch("product.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            products = data;
            addCartToHTML();
        })
        .catch(error => {
            console.error('Fejl ved indlæsning af produkter:', error);
        });

    // Tilføj produkt til kurv
    function addCart(idProduct) {
        console.log("addCart kaldt med idProduct:", idProduct);
        if (!listCart[idProduct]) {
            let product = products.find(p => p.id == parseInt(idProduct));
            if (product) {
                listCart[idProduct] = { ...product, quantity: 1 };
            }
        } else {
            listCart[idProduct].quantity++;
        }
        saveCart();
        addCartToHTML();
    }

    // Gem kurv i localStorage
    function saveCart() {
        localStorage.setItem('listCart', JSON.stringify(listCart));
    }

    // Opdater kurvens visning
    function addCartToHTML() {
        let listCartHTML = document.querySelector('.listCart');
        if (!listCartHTML) {
            console.error('Fejl: .listCart ikke fundet!');
            return;
        }

        listCartHTML.innerHTML = '';
        let totalQuantity = 0;

        Object.values(listCart).forEach(product => {
            if (product) {
                let newCartItem = document.createElement('div');
                newCartItem.classList.add('item');
                newCartItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="content">
                        <h3 class="name">${product.name}</h3>
                        <p class="price">DKK ${product.price}</p>
                    </div>
                    <section class="quantity">
                        <button class="changeQuantityButton" data-product-id="${product.id}" data-type="-">-</button>
                        <p>${product.quantity}</p>
                        <button class="changeQuantityButton" data-product-id="${product.id}" data-type="+">+</button>
                    </section>
                `;
                listCartHTML.appendChild(newCartItem);
                totalQuantity += product.quantity;
            }
        });

        let totalQuantityElement = document.querySelector('.totalQuantity');
        if (totalQuantityElement) {
            totalQuantityElement.innerText = totalQuantity;
        }

        // Tilføj event listeners til knapperne "+" og "-"
        let changeQuantityButtons = document.querySelectorAll('.changeQuantityButton');
        changeQuantityButtons.forEach(button => {
            button.addEventListener('click', function() {
                let idProduct = this.dataset.productId;
                let type = this.dataset.type;
                changeQuantity(idProduct, type);
            });
        });
    }

    // Ændr antal af en vare i kurven
    function changeQuantity(idProduct, type) {
        if (listCart[idProduct]) {
            switch (type) {
                case '+':
                    listCart[idProduct].quantity++;
                    break;
                case '-':
                    listCart[idProduct].quantity--;
                    if (listCart[idProduct].quantity <= 0) {
                        delete listCart[idProduct];
                    }
                    break;
            }
            saveCart();
            addCartToHTML();
        }
    }

    // Hent alle "Tilføj til kurv"-knapper
    let addToCartButtons = document.querySelectorAll('.addToCartButton');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Hent produkt-id fra data-attributten
            let idProduct = this.closest('.grid-item').dataset.productId;
            addCart(idProduct);
        });
    });
});

