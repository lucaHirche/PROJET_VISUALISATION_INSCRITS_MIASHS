const btnMenu = document.querySelector('.btn-menu')
const btnClose = document.querySelector('.btn-close')

const menuNavbar = document.querySelector('.menu-navbar')
const bgBlured = document.getElementById("blur")

btnMenu.onclick = () => {
    menuNavbar.style.right = '0px';
    bgBlured.classList.add('bg-blured');
}
btnClose.onclick = () => {
    menuNavbar.style.right = '-999px';
    bgBlured.classList.remove('bg-blured');
}
