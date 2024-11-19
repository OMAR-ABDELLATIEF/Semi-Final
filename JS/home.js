const links = document.querySelectorAll('.nav-content-links li');
const menuBar = document.querySelector('.tab-menu');
const exitMenu = document.querySelector('.menu-exit-icon');
const menu = document.querySelector('.menu-links');
const favourite = document.querySelectorAll('.img-icon');
const unfavourite = document.querySelectorAll('.img-icon-unfavourite');
const overlay = document.querySelector('.overlay ');
const playButton = document.querySelector('.overlay button');
const video = document.querySelector('.video-player video');
let i = 0
console.log(favourite);
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
// if (window.innerWidth < 768) {
//     menu.classList.add('d-none');
// }
menuBar.addEventListener('click', () => {
    menu.classList.toggle('menu-links-view');
    console.log("clicked");
});

exitMenu.addEventListener('click', () => {
    menu.classList.remove('menu-links-view');
});

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        menu.classList.remove('menu-links-view');
    }
    console.log(e.key);
})

favourite.forEach((item,index) => {
    item.addEventListener('click', () => {
        item.classList.replace('d-block','d-none');
        unfavourite[index].classList.replace('d-none','d-block');
        console.log('item');
    })
})
unfavourite.forEach((item,index) => {
    item.addEventListener('click', () => {
        item.classList.replace('d-block','d-none');
        favourite[index].classList.replace('d-none','d-block');
        console.log('7');
    })
})

playButton.addEventListener('click', () => {
    overlay.classList.add('d-none');
    video.setAttribute('controls','true')
    document.querySelector('video').play();

})