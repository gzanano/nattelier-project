const API_URL = "https://69dddc00410caa3d47ba15f2.mockapi.io/api/v1/products";

async function getProducts() {
    const container = document.getElementById('products-container');
    
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
                            <span class="price">${product.price}</span>
                            <button class="order-btn">შეკვეთა</button>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += productCard;
        });
    } catch (error) {
        container.innerHTML = '<p class="error-msg">მონაცემების ჩატვირთვა ვერ მოხერხდა.</p>';
        console.error("API Error:", error);
    }
}

document.addEventListener('DOMContentLoaded', getProducts);