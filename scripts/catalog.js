const productsPerPage = 16;
let currentPage = 1;
const searchInput = document.getElementById('search-input');
let products = []; // Array to store products

async function loadProducts() {
    try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();

        if (response.ok) {
            products = data;
            displayProducts(); //Show products after api response
        } else {
            console.error('Error while loading products');
        }
    } catch (error) {
        console.error('Error while searching products:', error);
    }
}

function displayProducts() {
    const query = searchInput.value.toLowerCase();

    // Filter products by search parameters, show nothing if no results
    const filteredProducts = query
        ? products.filter(product =>
            product.title.toLowerCase().includes(query) ||
            (Array.isArray(product.genre) && product.genre.some(genre => genre.toLowerCase().includes(query))) || 
            product.artist.toLowerCase().includes(query)
          )
        : products;

    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = ''; // Clear last products

    // Update pagination numbers to current total
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = Math.min(startIndex + productsPerPage, filteredProducts.length);

    for (let i = startIndex; i < endIndex; i++) {
        const product = filteredProducts[i];
        if (!product) continue; // Protect against invalid indexes

        const productItem = `
            <a class="no-decoration" href="product.html?id=${product.id}">
                <div class="product-item">
                    <img src="${product.image}" alt="${product.title}">
                    <div class="product-info">
                        <h3>${product.title}</h3>
                        <p>${product.artist}</p>
                        <p>$${product.price.toFixed(2)}</p>
                        <button>More Details</button>
                    </div>
                </div>
            </a>
        `;
        productGrid.innerHTML += productItem;
    }

    displayPagination(totalPages);
}

function displayPagination(totalPages) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = ''; // Clear last results

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('a');
        pageButton.textContent = i;
        pageButton.href = '#';
        pageButton.className = (i === currentPage) ? 'active' : '';
        pageButton.onclick = function() {
            currentPage = i;
            displayProducts();
        };
        pagination.appendChild(pageButton);
    }
}

function loadPagination() {
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
        currentPage = parseInt(savedPage);
        localStorage.removeItem('currentPage');
    }
    displayProducts();
}

// Update page upon type on search
searchInput.addEventListener('input', () => {
    currentPage = 1; // Change to first page upon search
    displayProducts();
});

// Load products upon page load
document.addEventListener('DOMContentLoaded', loadProducts);
