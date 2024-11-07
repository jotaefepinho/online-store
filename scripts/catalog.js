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
function openProductPage(productId) {
    
    localStorage.setItem('currentPage', currentPage); 
    window.location.href = `product.html?productId=${productId}`;
}


function loadPagination() {
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
        currentPage = parseInt(savedPage);
        localStorage.removeItem('currentPage');
        loadProducts(currentPage);
    }
}

document.addEventListener('DOMContentLoaded', loadPagination);
// Initialize the product display
displayProducts();