let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let backButton = document.getElementById('back');
let seeMoreButton = document.querySelectorAll('.seeMore');
let karousel = document.querySelectorAll('.karousel');
let listHTML = document.querySelector('.karousel .list');

nextButton.onclick = function() {
    showSlider('next');
}

prevButton.onclick = function() {
    showSlider('prev');
}

const showSlider = (type) => {
    let items = document.querySelectorAll('.karousel .list .item');
    if(type === 'next') {
        listHTML.appendChild(items[0]);
        karousel.classList.add('next');
    }
}