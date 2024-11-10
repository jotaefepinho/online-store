const productsPerPage = 16;
let currentPage = 1;
const searchInput = document.getElementById('search-input');

function displayProducts() {
    const query = searchInput.value.toLowerCase();

    // Filtrar produtos com base no termo de busca, ou mostrar todos se estiver vazio
    const filteredProducts = query
        ? products.filter(product =>
            product.title.toLowerCase().includes(query) ||
            product.genre.some(genre => genre.toLowerCase().includes(query))||
            product.artist.toLowerCase().includes(query) 
          )
        : products;

    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = ''; // Limpa os produtos anteriores

    // Atualizar o número total de páginas com base nos produtos filtrados
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = Math.min(startIndex + productsPerPage, filteredProducts.length);

    for (let i = startIndex; i < endIndex; i++) {
        const product = filteredProducts[i];
        if (!product) continue; // Proteção para caso algum índice esteja fora do range

        const productItem = `
            <a class="no-decoration" href="product.html?id=${product.id}">
                <div class="product-item">
                    <img src="${product.image}" alt="${product.title}">
                    <div class="product-info">
                        <h3>${product.title}</h3>
                        <p>${product.artist} </p>
                        <p>${product.price.toFixed(2)}</p>
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
    pagination.innerHTML = ''; // Limpa a paginação anterior

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
    }
    displayProducts();
}

// Atualiza os produtos ao digitar na barra de busca
searchInput.addEventListener('input', () => {
    currentPage = 1; // Reinicia para a primeira página ao fazer uma nova busca
    displayProducts();
});

// Carrega a página inicial
document.addEventListener('DOMContentLoaded', loadPagination);
