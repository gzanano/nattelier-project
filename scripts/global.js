import './products.js';
import './contact.js';

/* ==========================================================================
   Burger Menu, Scroll to Top Button, Cookie Notification
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Burger Menu ---
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('nav ul');

    if (burger) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- 2. Scroll to Top Button ---
    const scrollBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = "flex";
        } else {
            scrollBtn.style.display = "none";
        }
    });

    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 3. Cookie Notification (LocalStorage) ---
    const cookieAccepted = localStorage.getItem('cookieAccepted');
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');

    if (!cookieAccepted && cookieBanner) {
        cookieBanner.style.display = 'block';
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookieAccepted', 'true');
            cookieBanner.style.display = 'none';
        });
    }
});