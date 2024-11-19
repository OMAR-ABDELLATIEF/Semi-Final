const links = document.querySelectorAll('.nav-content-links li');
const menuBar = document.querySelector('.tab-menu');
const exitMenu = document.querySelector('.menu-exit-icon');
const menu = document.querySelector('.menu-links');
const cartIcon = document.querySelector('.nav-content-icons .fa-cart-shopping');
const whishlistIcon = document.querySelector('.nav-content-icons .fa-heart');


let cart = JSON.parse(localStorage.getItem('cart')) || [];
let whishlist = JSON.parse(localStorage.getItem('whishlist')) || [];
whishlistIcon.style.setProperty('--whishlist-content', `"${whishlist.length}"`);
cartIcon.style.setProperty('--cart-content', `"${cart.length}"`);

// Add click event listeners to each link
links.forEach((link, index) => {
    link.addEventListener('click', () => {
    // Remove the 'active' class from all links
    links.forEach((link) => {
        link.classList.remove('active');
    });
    // Add the 'active' class to the clicked link
    link.classList.add('active');
    });
});


menuBar.addEventListener('click', () => {
    menu.classList.toggle('menu-links-view');
});

exitMenu.addEventListener('click', () => {
    menu.classList.remove('menu-links-view');
});

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        menu.classList.remove('menu-links-view');
    }
})

cartIcon.addEventListener('click',() =>{
    window.location.assign("../cart.html");
});
whishlistIcon.addEventListener('click',() =>{
    window.location.assign("../whishlist.html");
});
