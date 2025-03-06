let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let karousel = document.querySelector('.karousel');
let listHTML = document.querySelector('.karousel .list');
let seeMoreButtons = document.querySelectorAll('.seeMore');
let backButton = document.getElementById('back');

nextButton.onclick = function(){
    showSlider('next');
}
prevButton.onclick = function(){
    showSlider('prev');
}
let unAcceppClick;
const showSlider = (type) => {
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';

    karousel.classList.remove('next', 'prev');
    let items = document.querySelectorAll('.karousel .list .item');
    if(type === 'next'){
        listHTML.appendChild(items[0]);
        karousel.classList.add('next');
    }else{
        listHTML.prepend(items[items.length - 1]);
        karousel.classList.add('prev');
        
    }
    clearTimeout(unAcceppClick);
    unAcceppClick = setTimeout(()=>{
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 700)
}
seeMoreButtons.forEach((button) => {
    button.onclick = function(){
        karousel.classList.remove('next', 'prev');
        karousel.classList.add('showDetail');
    }
});
backButton.onclick = function(){
    karousel.classList.remove('showDetail');
}