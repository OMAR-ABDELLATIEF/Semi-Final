const links = document.querySelectorAll('.nav-content-links li');
const menuBar = document.querySelector('.tab-menu');
const cartIcon = document.querySelector('.nav-content-icons .fa-cart-shopping');
const whishlistIcon = document.querySelector('.nav-content-icons .fa-heart');
const exitMenu = document.querySelector('.menu-exit-icon');
const menu = document.querySelector('.menu-links');


let cart = JSON.parse(localStorage.getItem('cart')) || [];
let whishlist = JSON.parse(localStorage.getItem('whishlist')) || [];
whishlistIcon.style.setProperty('--whishlist-content', `"${whishlist.length}"`);
cartIcon.style.setProperty('--cart-content', `"${cart.length}"`);
let arr = []




function getProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const product = {
        id: +params.get('id'),
        title: params.get('title'),
        price: +params.get('price'),
        rate: +params.get('rate'),
        mealDescribtion1: params.get('mealDescribtion1'),
        mealDescribtion2: params.get('mealDescribtion2'),
        categorySlug: params.get('categorySlug'),
        img: params.get('img'),
    };
    arr = [product]
    let isInWishlist = whishlist.some(wishProduct => wishProduct.id === product.id);
    console.log(isInWishlist);
    if (isInWishlist) {
        document.querySelector('.searched-item').innerHTML = `
        <div class="searched-item-head">
            <h2>Shop by category</h2>
            <h1>${product.title}</h1>
        </div>
        <div class="searched-item-info">
            <div class="item-img">
                <img src="${product.img}" alt="">
                <div class="img-icon d-none">
                    <i class="fas fa-heart" onclick="addToWhishlist()"></i>
                </div>
                <div class="img-icon-unfavourite d-block">
                    <i class="fas fa-heart" onclick="removeFromWhishlist()"></i>
                </div>
            </div>
            <div class="item-details">
                <h3>${product.title}</h3>
                <p>Lorem ipsum dolor sit amet consectetur. Enim ullamcorper pellentesque consectetur egestas diam volutpat laoreet amet. Proin elit eu adipiscing suspendisse.</p>
                <h4>${product.price} EG</h4>
                <button onclick="addToCart()">Add to Cart</button>
            </div>
        </div>
        `
    } 
    else {
        document.querySelector('.searched-item').innerHTML = `
        <div class="searched-item-head">
            <h2>Shop by category</h2>
            <h1>${product.title}</h1>
        </div>
        <div class="searched-item-info">
            <div class="item-img">
                <img src="${product.img}" alt="">
                <div class="img-icon d-block">
                    <i class="fas fa-heart" onclick="addToWhishlist()"></i>
                </div>
                <div class="img-icon-unfavourite d-none" >
                    <i class="fas fa-heart" onclick="removeFromWhishlist()"></i>
                </div>
            </div>
            <div class="item-details">
                <h3>${product.title}</h3>
                <p>Lorem ipsum dolor sit amet consectetur. Enim ullamcorper pellentesque consectetur egestas diam volutpat laoreet amet. Proin elit eu adipiscing suspendisse.</p>
                <h4>${product.price} EG</h4>
                <button onclick="addToCart()">Add to Cart</button>
            </div>
        </div>
        `
    }
    const favourite = document.querySelectorAll('.img-icon');
    const unfavourite = document.querySelectorAll('.img-icon-unfavourite');
    updateWhishlist(favourite, unfavourite);

    const products = document.querySelectorAll('.product');
}
window.onload = getProductDetails();

function addToCart(){
    let found = cart.find((product) => product.id === arr[0].id);
    if (found == undefined) {
        cart.push({...arr[0], quantity : 1});
    }
    else{
        found.quantity++;
    }
    // let sortedCart =cart.sort((a, b) => a.id - b.id);
    localStorage.setItem('cart', JSON.stringify(cart));
    cartIcon.style.setProperty('--cart-content', `"${JSON.parse(localStorage.getItem('cart')).length}"`);
}


function addToWhishlist(){
    let found = whishlist.find((product) => product.id === arr[0].id);
    if (found == undefined) {
        whishlist.push(arr[0]);
    }
    localStorage.setItem('whishlist', JSON.stringify(whishlist));
    whishlistIcon.style.setProperty('--whishlist-content', `"${JSON.parse(localStorage.getItem('whishlist')).length}"`);
}

function removeFromWhishlist() {
    let wishlistIndex = whishlist.findIndex((product) => product.id === arr[0].id);
    if (wishlistIndex !== -1) {
        whishlist.splice(wishlistIndex, 1);
    }
    localStorage.setItem('whishlist', JSON.stringify(whishlist));
    whishlistIcon.style.setProperty('--whishlist-content', `"${JSON.parse(localStorage.getItem('whishlist')).length}"`);
}

function updateWhishlist(favourite,unfavourite){
    favourite.forEach((item,index) => {
        item.addEventListener('click', () => {
            item.classList.replace('d-block','d-none');
            unfavourite[index].classList.replace('d-none','d-block');
        })
    })
    unfavourite.forEach((item,index) => {
        item.addEventListener('click', () => {
            item.classList.replace('d-block','d-none');
            favourite[index].classList.replace('d-none','d-block');
        })
    })
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
