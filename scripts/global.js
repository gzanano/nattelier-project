import './products.js';
import './contact.js';

/* ==========================================================================
   Cart UI Logic (Global)
   ========================================================================== */

window.updateCartUI = function() {
    const cartContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!cartContainer) return;

    if (cart.length === 0) {
        const isInPages = window.location.pathname.includes('/pages/');
        const productsPath = isInPages ? 'products.html' : './pages/products.html';

        cartContainer.innerHTML = `
            <div class="empty-cart-container" style="text-align: center; padding: 40px 20px;">
                <div style="font-size: 50px; margin-bottom: 20px;">🌿</div>
                <p style="font-family: 'Playfair Display', serif; color: #5a4633; font-style: italic;">
                    „თქვენი კალათა ისეთივე ცარიელია, როგორც დილა ყავის გარეშე. დაამატეთ რამე ესთეტიკური!“
                </p>
                <a href="${productsPath}" style="display: inline-block; margin-top: 15px; color: #8b735b; text-decoration: underline;">დაათვალიერეთ კოლექცია</a>
            </div>
        `;
        if (cartCount) cartCount.textContent = '0';
        if (cartTotal) cartTotal.textContent = '0 ₾';
        return;
    }

    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartContainer.innerHTML += `
            <div class="cart-item" style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px; padding: 10px; border-bottom: 1px solid #eee;">
                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;">
                <div style="flex-grow: 1;">
                    <h4 style="margin: 0; font-size: 14px; color: #5a4633;">${item.name}</h4>
                    <p style="margin: 5px 0; font-size: 13px; color: #888;">${item.price} ₾</p>
                    <div style="display: flex; align-items: center; gap: 10px; margin-top: 5px;">
                        <button onclick="changeQuantity(${index}, -1)" style="width: 25px; height: 25px; border: 1px solid #ddd; background: white; cursor: pointer; border-radius: 3px;">-</button>
                        <span style="font-size: 14px; font-weight: bold;">${item.quantity}</span>
                        <button onclick="changeQuantity(${index}, 1)" style="width: 25px; height: 25px; border: 1px solid #ddd; background: white; cursor: pointer; border-radius: 3px;">+</button>
                    </div>
                </div>
                <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #e74c3c; cursor: pointer; font-size: 18px; padding-left: 10px;">&times;</button>
            </div>
        `;
    });

    if (cartCount) cartCount.textContent = cart.length;
    if (cartTotal) cartTotal.textContent = `${total} ₾`;
};

window.changeQuantity = function(index, delta) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
        cart[index].quantity += delta;
        if (cart[index].quantity < 1) cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        window.updateCartUI();
    }
};

window.removeFromCart = function(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.updateCartUI();
};

/* ==========================================================================
   Main Event Listener
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    window.updateCartUI();

    // --- 1. Burger Menu ---
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('nav ul');
    if (burger) {
        burger.addEventListener('click', () => navLinks.classList.toggle('active'));
    }

    // --- 2. Scroll to Top Button ---
    const scrollBtn = document.getElementById('scroll-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            if (scrollBtn) scrollBtn.style.display = "flex";
        } else {
            if (scrollBtn) scrollBtn.style.display = "none";
        }
    });

    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // --- 3. Checkout Button ---
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const isInPages = window.location.pathname.includes('/pages/');
            const contactPath = isInPages ? 'contact.html' : './pages/contact.html';
            window.location.href = contactPath + '#contact-form';
        });
    }

    // --- 4. Cookie Notification, 5. Cart Drawer ---
    const cookieAccepted = localStorage.getItem('cookieAccepted');
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');

    if (!cookieAccepted && cookieBanner) cookieBanner.style.display = 'block';
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookieAccepted', 'true');
            if (cookieBanner) cookieBanner.style.display = 'none';
        });
    }

    const cartBtn = document.querySelector('.cart-icon');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCart = document.getElementById('close-cart');

    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            cartDrawer.classList.add('active');
            cartOverlay.classList.add('active');
        });
    }

    const hideCart = () => {
        cartDrawer.classList.remove('active');
        cartOverlay.classList.remove('active');
    };

    if (closeCart) closeCart.addEventListener('click', hideCart);
    if (cartOverlay) cartOverlay.addEventListener('click', hideCart);
});