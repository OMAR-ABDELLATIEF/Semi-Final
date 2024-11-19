const links = document.querySelectorAll('.nav-content-links li');
const menuBar = document.querySelector('.tab-menu');
const cartIcon = document.querySelector('.nav-content-icons .fa-cart-shopping');
const whishlistIcon = document.querySelector('.nav-content-icons .fa-heart');
const exitMenu = document.querySelector('.menu-exit-icon');
const menu = document.querySelector('.menu-links');
const whishlist_container = document.querySelector('.whishlist');
const products_container = document.querySelector('.whishlist-products');
const empty_container = document.querySelector('.whishlist-details');
const explore_products = document.querySelector('.whishlist-details-head button');


let cart = JSON.parse(localStorage.getItem('cart')) || [];
let whishlist = JSON.parse(localStorage.getItem('whishlist')) || [];
whishlistIcon.style.setProperty('--whishlist-content', `"${whishlist.length}"`);
cartIcon.style.setProperty('--cart-content', `"${cart.length}"`);


function displayProducts(whishlist) {
    if (whishlist.length>0) {
        empty_container.classList.add('d-none')
        products_container.innerHTML = ``;
        whishlist.forEach((product,index) => {
            products_container.innerHTML += `
                <div class="product ${product.typ == "new"? "new" : ""}">
                    <div class="product-img">
                        <img src="${product.img}" alt="Burger">
                        <div class="img-icon d-none">
                            <i class="fas fa-heart" onclick="addToWhishlist(${index})"></i>
                        </div>
                        <div class="img-icon-unfavourite d-block">
                            <i class="fas fa-heart" onclick="removeFromWhishlist(${index})"></i>
                        </div>
                    </div>
                    <div class="product-cost-rate">
                        <h2>${product.price} EG</h2>
                        <i class="fas fa-star"><span>${product.rate}</span></i>
                    </div>
                    <div class="product-info">
                        <h2>${product.title}</h2>
                        <div class="product-info-icons">
                            <i class="fa-regular fa-circle-check"><span>${product.mealDescribtion1}</span></i>
                            <i class="fa-regular fa-circle-check"><span>${product.mealDescribtion2}</span></i>
                        </div>
                        <button onclick="addToCart(${index})">Add to Cart</button>
                    </div>
                </div>
                `;
            });
    
        const favourite = document.querySelectorAll('.img-icon');
        const unfavourite = document.querySelectorAll('.img-icon-unfavourite');
        updateWhishlist(favourite, unfavourite);

        const img_icon1 = document.querySelectorAll('.img-icon .fa-heart');
        const img_icon2 = document.querySelectorAll('.img-icon-unfavourite i')

        const products = document.querySelectorAll('.product');
        openItem(whishlist, products , img_icon1, img_icon2);
    }
    else
    {
        empty_container.classList.remove('d-none')
        whishlist_container.classList.add('d-none')
    }
}
displayProducts(whishlist);

function addToCart(index){
    let singleProduct = whishlist[index];
    let found = cart.find((product) => product.id === singleProduct.id);
    if (found == undefined) {
        cart.push({...singleProduct, quantity : 1});
    }
    else{
        found.quantity++;
    }
    // let sortedCart =cart.sort((a, b) => a.id - b.id);
    localStorage.setItem('cart', JSON.stringify(cart));
    cartIcon.style.setProperty('--cart-content', `"${JSON.parse(localStorage.getItem('cart')).length}"`);
}
function removeFromWhishlist(index) {
    whishlist.splice(index, 1);
    
    localStorage.setItem('whishlist', JSON.stringify(whishlist));
    whishlistIcon.style.setProperty('--whishlist-content', `"${JSON.parse(localStorage.getItem('whishlist')).length}"`);
    displayProducts(whishlist)
    if (whishlist.length <= 0) {
        empty_container.classList.remove('d-none')
        whishlist_container.classList.add('d-none')    }
    else
    {
        empty_container.classList.add('d-none')
        whishlist_container.classList.remove('d-none')
    }
}
function updateWhishlist(favourite,unfavourite){
    unfavourite.forEach((item,index) => {
        item.addEventListener('click', () => {
            item.classList.replace('d-block','d-none');
            favourite[index].classList.replace('d-none','d-block');
        })
    })
}

function openItem(whishlist,products,img_icon1,img_icon2) {
    whishlist.forEach((item,index) => {
        products[index].childNodes[5].childNodes[1].addEventListener('click', () => {
            const queryString = new URLSearchParams(item).toString();
            window.location.href = `../searched-item.html?${queryString}`;
        });
        products[index].childNodes[1].addEventListener('click', (e) => {
            if (e.target != img_icon2[index]) {
                const queryString = new URLSearchParams(item).toString();
                window.location.href = `../searched-item.html?${queryString}`;
            }
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