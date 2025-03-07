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
