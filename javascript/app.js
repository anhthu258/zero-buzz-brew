document.addEventListener('DOMContentLoaded', function() {
    let iconCart = document.querySelector('.iconCart');
    let cart = document.querySelector('.cart');
    let close = document.querySelector('.close');
    let listCart = JSON.parse(localStorage.getItem('listCart')) || {};
    console.log(listCart);

    if (!iconCart || !cart || !close) {
        console.error('Fejl: DOM-elementer ikke fundet!');
        return;
    }

    // Åbn/luk kurv
    if (iconCart) {
        iconCart.addEventListener('click', function() {
            cart.classList.toggle('open');
        });
    }

    if (close) {
        close.addEventListener('click', function() {
            cart.classList.remove('open');
        });
    }

    // Hent produkter fra JSON
    if (document.querySelector('.grid-container')) {
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
                updateTotalQuantity();
                attachAddToCartListeners(); // Tilføj event listeners til "Tilføj til kurv"-knapperne
            })
            .catch(error => {
                console.error('Fejl ved indlæsning af produkter:', error);
            });
    }

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
        updateTotalQuantity();
    }

    // Gem kurv i localStorage
    function saveCart() {
        localStorage.setItem('listCart', JSON.stringify(listCart));
        updateTotalQuantity();
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

        updateTotalQuantity();
        attachChangeQuantityListeners(); // Tilføj event listeners til "+" og "-" knapperne
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
            updateTotalQuantity();
        }
    }

    // Opdater totalQuantityElement på alle sider
    function updateTotalQuantity() {
        let totalQuantityElement = document.querySelector('.totalQuantity');
        if (totalQuantityElement) {
            let totalQuantity = 0;

            Object.values(listCart).forEach(product => {
                if (product) {
                    totalQuantity += product.quantity;
                }
            });

            totalQuantityElement.innerText = totalQuantity;
        }
    }

    // Tilføj event listeners til "Tilføj til kurv"-knapperne
    function attachAddToCartListeners() {
        let addToCartButtons = document.querySelectorAll('.addToCartButton');

        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Hent produkt-id fra data-attributten
                let idProduct = this.closest('.grid-item').dataset.productId;
                addCart(idProduct);
            });
        });
    }

    // Tilføj event listeners til "+" og "-" knapperne
    function attachChangeQuantityListeners() {
        let changeQuantityButtons = document.querySelectorAll('.changeQuantityButton');
        changeQuantityButtons.forEach(button => {
            button.addEventListener('click', function() {
                let idProduct = this.dataset.productId;
                let type = this.dataset.type;
                changeQuantity(idProduct, type);
            });
        });
    }

    // Kald updateTotalQuantity, når siden indlæses
    updateTotalQuantity();

    // Lyt efter ændringer i localStorage
    window.addEventListener('storage', updateTotalQuantity);
});
