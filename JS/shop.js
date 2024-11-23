const links = document.querySelectorAll('.nav-content-links li');
const menuBar = document.querySelector('.tab-menu');
const cartIcon = document.querySelector('.nav-content-icons .fa-cart-shopping');
const whishlistIcon = document.querySelector('.nav-content-icons .fa-heart');
const exitMenu = document.querySelector('.menu-exit-icon');
const menu = document.querySelector('.menu-links');
const categories_container = document.querySelector('.category-wrapper');
const products_container = document.querySelector('.Shop-by-category-products');


let categorySlug = "vegetarian";
const BASE_URL = "http://localhost:3000"
let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let whishlist = JSON.parse(localStorage.getItem('whishlist')) || [];
cartIcon.style.setProperty('--cart-content', `"${cart.length}"`);
whishlistIcon.style.setProperty('--whishlist-content', `"${whishlist.length}"`);

// Fetch data from the API
async function getCategory(){
    const response = await fetch(`${BASE_URL}/categories`);
    const data = await response.json();
    displayCategory(data);
    
}
async function getProducts(){
    const response = await fetch(`${BASE_URL}/products`);
    const data = await response.json();
    products=data;
    localStorage.setItem("products", JSON.stringify(products));
}
async function getCatProducts(categorySlug){
    const response = await fetch(`${BASE_URL}/products?categorySlug=${categorySlug}`);
    const data = await response.json();
    displayProducts(data,whishlist);
}
(async function(){
    await getCategory();
    await getCatProducts(categorySlug);
    await getProducts();
})();

//display categories

async function displayCategory(categories){
    await categories.forEach(category => {
        const isActive = category.slug == categorySlug ? "active" : "";
        categories_container.innerHTML += `
                <div class="category swiper-slide">
                    <div class="category-img ${isActive}">
                        <img src="${category.img}" alt="${category.name}">
                        <i class="fas fa-check"></i>
                    </div>
                    <h2>${category.name}</h2>
                </div>
    `
    });
    const category = document.querySelectorAll('.category-img');
    const checkedCategory = document.querySelectorAll('.category-img i');
    const categoryTitle = document.querySelectorAll('.category h2');
    categorieChecker(category,checkedCategory,categoryTitle);
}
//display products

async function displayProducts(products, whishlist) {
    products_container.innerHTML = ``;
    await products.forEach((product) => {
        let isInWishlist = whishlist.some(wishProduct => wishProduct.id === product.id);
        if (!isInWishlist) {
            products_container.innerHTML += `
            <div class="product ${product.typ == "new"? "new" : ""}">
                <div class="product-img">
                    <img src="${product.img}" alt="Burger">
                    <div class="img-icon d-block">
                        <i class="fas fa-heart" onclick="addToWhishlist(${product.id})"></i>
                    </div>
                    <div class="img-icon-unfavourite d-none">
                        <i class="fas fa-heart" onclick="removeFromWhishlist(${product.id})"></i>
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
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
            `;
        } else {
            products_container.innerHTML += `
            <div class="product ${product.typ == "new"? "new" : ""}">
                <div class="product-img">
                    <img src="${product.img}" alt="Burger">
                    <div class="img-icon d-none">
                        <i class="fas fa-heart" onclick="addToWhishlist(${product.id})"></i>
                    </div>
                    <div class="img-icon-unfavourite d-block">
                        <i class="fas fa-heart" onclick="removeFromWhishlist(${product.id})"></i>
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
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
            `;
        }
    });

    const favourite = document.querySelectorAll('.img-icon');
    const unfavourite = document.querySelectorAll('.img-icon-unfavourite');
    updateWhishlist(favourite, unfavourite);
    const img_icon1 = document.querySelectorAll('.img-icon .fa-heart');
    const img_icon2 = document.querySelectorAll('.img-icon-unfavourite i')

    const product = document.querySelectorAll('.product');
    openItem(products, product , img_icon1, img_icon2);
}

//add to cart
function addToCart(index,title){
    let singleProduct = products[index-1];
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

//add to whish list
function addToWhishlist(index){
    let singleProduct = products[index-1];
    let found = whishlist.find((product) => product.id === singleProduct.id);
    if (found == undefined) {
        whishlist.push(singleProduct);
    }
    localStorage.setItem('whishlist', JSON.stringify(whishlist));
    whishlistIcon.style.setProperty('--whishlist-content', `"${JSON.parse(localStorage.getItem('whishlist')).length}"`);
}
//remove from whishlist
function removeFromWhishlist(index) {
    let singleProduct = products[index - 1];
    let wishlistIndex = whishlist.findIndex((product) => product.id === singleProduct.id);
    
    if (wishlistIndex !== -1) {
        whishlist.splice(wishlistIndex, 1);
    }
    localStorage.setItem('whishlist', JSON.stringify(whishlist));
    whishlistIcon.style.setProperty('--whishlist-content', `"${JSON.parse(localStorage.getItem('whishlist')).length}"`);
}

function openItem(products,product,img_icon1,img_icon2) {
    products.forEach((item,index) => {
        product[index].childNodes[5].childNodes[1].addEventListener('click', () => {
            const queryString = new URLSearchParams(item).toString();
            window.location.href = `../searched-item.html?${queryString}`;
        });
        product[index].childNodes[1].addEventListener('click', (e) => {
            if (e.target != img_icon2[index] && e.target != img_icon1[index]) {
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


//change icons of whishlist sign {put in whishlist || remove from whishlist }
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

function categorieChecker(category,checkedCategory,categoryTitle) {
    category.forEach((item,index) => {
        item.addEventListener('click', async() => {
            categorySlug=categoryTitle[index].innerHTML.toLowerCase();
            await getCatProducts(categorySlug);
            category.forEach((cat,i) => {
                if(index === i){
                    cat.classList.add('active');
                }
                else{
                    cat.classList.remove('active');
                }
            });
        })
    })
}

cartIcon.addEventListener('click',() =>{
    window.location.assign("../cart.html");
});
whishlistIcon.addEventListener('click',() =>{
    window.location.assign("../whishlist.html");
});

const swiper = new Swiper('.category-content', {
    // Default parameters
    slidesPerView: 1,
    spaceBetween: 30,
    loopFillGroupWithBlank: true,
    pagination:{
        el:".swiper-pagination",
        clickable: true,
    },
    // Responsive breakpoints
    breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 290
        },
        // when window width is >= 480px
        721: {
          slidesPerView: 3,
          spaceBetween: 5,
        },
        // when window width is >= 640px
        950: {
          slidesPerView: 3,
          spaceBetween: 40
        },
        1080: {
          slidesPerView: 4,
          spaceBetween: 120
        }
      }
  })