const links = document.querySelectorAll('.nav-content-links li');
const menuBar = document.querySelector('.tab-menu');
const cartIcon = document.querySelector('.nav-content-icons .fa-cart-shopping');
const whishlistIcon = document.querySelector('.nav-content-icons .fa-heart');
const exitMenu = document.querySelector('.menu-exit-icon');
const menu = document.querySelector('.menu-links');
const cart_items = document.querySelector('.cart-items')
const check_out = document.querySelector('.check-out');
const cart_head = document.querySelector('.cart-head h2');
const cart_body = document.querySelector('.cart');
const empty_cart = document.querySelector('.shop-cart-details');
const explore_products = document.querySelector('.shop-cart-details-head button');

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let whishlist = JSON.parse(localStorage.getItem('whishlist')) || [];
cartIcon.style.setProperty('--cart-content', `"${cart.length}"`);
whishlistIcon.style.setProperty('--whishlist-content', `"${whishlist.length}"`);


function displayCartItems(cart) {
    cart_items.innerHTML = '';  // Clear previous cart items
    cart.forEach((item,index)=> {
        cart_items.innerHTML +=`
        <div class="cart-item">
            <div class="cart-item-img">
                <img src="${item.img}" alt="">
            </div>
            <div class="cart-item-details">
                <h3>${item.title}</h3>
                <h4>${item.price} EG</h4>
                <div class="cart-item-details-description">
                    <p>${item.mealDescribtion1}</p>
                    <p> ${item.mealDescribtion2}</p>
                </div>
            </div>
            <div class="cart-item-quantity">
                <i class="fas fa-minus" onclick ="removeFromoQuantity(${index})"></i>
                <p>${item.quantity}</p>
                <i class="fas fa-plus" onclick ="addToQuantity(${index})"></i>
            </div>
        </div>
    `;
})
    const products = document.querySelectorAll('.cart-item');
    openItem(cart, products);
}


function displayCheckOut(cart,checkOut) {
    let totalPrice = 0 ;
    checkOut.innerHTML = '';  // Clear previous check-out items
    cart.forEach( item => {
        totalPrice += item.price * item.quantity;
    })
    checkOut.innerHTML = `
    <div class="price">
        <h2>Total</h2>
        <p>${totalPrice} Eg</p>
        </div>
    <div class="shipping">
        <h2>shipping</h2>
        <p>Free</p>
    </div>
    <button>checkout</button>
    `;
}
if (cart.length > 0) {
    displayCartItems(cart)
    displayCheckOut(cart,check_out);
    displayCartHeader();
    empty_cart.classList.add('d-none')
    cart_body.classList.remove('d-none')
}
else{
    empty_cart.classList.remove('d-none')
    cart_body.classList.add('d-none')
}


function displayCartHeader() {
    cart_head.textContent =``;
    cart_head.textContent=`${cart.length} Items in cart`
}


function addToQuantity(i) {
    cart[i].quantity++
    localStorage.setItem('cart', JSON.stringify(cart));
    cartIcon.style.setProperty('--cart-content', `"${JSON.parse(localStorage.getItem('cart')).length}"`);
    displayCartItems(cart)
    displayCheckOut(cart, check_out);
    displayCartHeader();
}
function removeFromoQuantity(i) {
    if (cart[i].quantity >= 1) {
        cart[i].quantity--;
    }
    if (cart[i].quantity <= 0) {
        cart.splice(i, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    cartIcon.style.setProperty('--cart-content', `"${JSON.parse(localStorage.getItem('cart')).length}"`);
    if (cart.length > 0) {
        displayCartItems(cart)
        displayCheckOut(cart,check_out);
        displayCartHeader();
        empty_cart.classList.add('d-none')
        cart_body.classList.remove('d-none')
    }
    else{
        empty_cart.classList.remove('d-none')
        cart_body.classList.add('d-none')
    }
}

function openItem(cart,products) {
    cart.forEach((item,index) => {
        products[index].childNodes[3].childNodes[1].addEventListener('click', () => {
            const queryString = new URLSearchParams(item).toString();
            window.location.href = `../searched-item.html?${queryString}`;
        });
        products[index].childNodes[1].addEventListener('click', (e) => {
            const queryString = new URLSearchParams(item).toString();
            window.location.href = `../searched-item.html?${queryString}`;
        });
    });
}

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

explore_products.addEventListener('click',() =>{
    window.location.assign("../shop.html");
});