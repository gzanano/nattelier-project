const API_URL = "https://69dddc00410caa3d47ba15f2.mockapi.io/api/v1/products";

async function getProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        container.innerHTML = '';

        data.forEach(product => {
            const productCard = `
                <div class="product-card">
                    <div class="product-card__img">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-card__content">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <div class="product-card__footer">
                            <span class="price">${product.price} ₾</span>
                            <button class="order-btn" 
                                    data-id="${product.id}" 
                                    data-name="${product.name}" 
                                    data-price="${product.price}" 
                                    data-image="${product.image}">
                                შეკვეთა
                            </button>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += productCard;
        });

    
        setupCartListener(container);

    } catch (error) {
        container.innerHTML = '<p class="error-msg">მონაცემების ჩატვირთვა ვერ მოხერხდა.</p>';
        console.error("API Error:", error);
    }
}

function setupCartListener(container) {
    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('order-btn')) {
            const btn = e.target;
            
            const product = {
                id: btn.dataset.id,
                name: btn.dataset.name,
                price: parseFloat(btn.dataset.price),
                image: btn.dataset.image,
                quantity: 1
            };

            addToCart(product);
        }
    });
}

function addToCart(newProduct) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(item => item.id === newProduct.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(newProduct);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    if (typeof window.updateCartUI === 'function') {
        window.updateCartUI();
    }

    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartDrawer && cartOverlay) {
        cartDrawer.classList.add('active');
        cartOverlay.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', getProducts);