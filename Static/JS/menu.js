"use strict";

document.addEventListener("DOMContentLoaded", function() {

    let  burgerMenu = document.getElementById('menu-burger'),
         crossMenu = document.getElementById('cross-menu'),
         mobileMenuOpen = document.getElementById('main-menu-mobile'),
         mobileNavHidden = document.querySelector('.nav-section-mobile-hidden'),
         navBarMenu = document.getElementById("nav-bar-mobile"),
         navItems =  document.querySelectorAll('.nav-item');

    function openNav() {
        burgerMenu.style.display = 'none';
        crossMenu.style.display = 'block';
        navBarMenu.style.display = 'block';
        mobileNavHidden.style.display = 'block';
        mobileMenuOpen.style.width = '100%';
        mobileMenuOpen.style.transition = '0.5s';
    }

    function closeNav() {
        mobileMenuOpen.style.width = '0';
        burgerMenu.style.display = 'block';
        navBarMenu.style.display = 'none';
        mobileNavHidden.style.display = 'none';
        crossMenu.style.display = 'none';
    }



    document.getElementById('menu-burger').addEventListener('click', openNav, false);
    navItems.forEach(function(navItem) {
        navItem.addEventListener('click', closeNav)
    });
    document.getElementById('cross-menu').addEventListener('click', closeNav, false);
});