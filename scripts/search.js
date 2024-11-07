const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-input');
const productsPerPage = 16; // Change this number to show more or fewer products
let currentPage = 1;

function displayProducts() {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = ''; // Clear previous products

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = Math.min(startIndex + productsPerPage, products.length);

    for (let i = startIndex; i < endIndex; i++) {
        const product = products[i];
        const productItem = `
            <a class="no-decoration" href="product.html?id=${product.id}">
                <div class="product-item">
                    <img src="${product.image}" alt="${product.title}">
                    <div class="product-info">
                        <h3>${product.title}</h3>
                        <p>$${product.price.toFixed(2)}</p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            </a>
        `;
        productGrid.innerHTML += productItem;
    }

    displayPagination();
}

function displayPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = ''; // Clear previous pagination

    const totalPages = Math.ceil(products.length / productsPerPage);
    console.log(totalPages);
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

function searchProducts() {
    const query = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.genre.some(genre => genre.toLowerCase().includes(query)) ||
        product.artist.toLowerCase().includes(query)
    );

    displayProducts(filteredProducts);
}


searchInput.addEventListener('input', searchProducts);

displayProducts(products);