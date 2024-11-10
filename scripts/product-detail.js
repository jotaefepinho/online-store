// Obtain URL Parameteres
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Loads product data based on ID
function loadProduct() {
    const productId = getQueryParam('id');
    const product = products.find(p => p.id == productId);

    if (product) {
        document.getElementById('album-title').textContent = product.title;
        document.getElementById('album-artist').textContent = product.artist;
        document.getElementById('album-price').textContent = product.price;
        document.getElementById('album-description').textContent = product.description;
        document.getElementById('album-cover').src = product.image;

        // Display Genre
        const genreContainer = document.getElementById('album-genre');
        genreContainer.textContent = product.genre.map(genre => genre.split(' ').map(word => word.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('-')).join(' ')).join(', ');

        // Render Tracklist
        const tracklistContainer = document.getElementById('tracklist-container');


        // A side
        let sideAHTML = '<h4>A Side</h4><ol>';
        product.tracklist.sideA.forEach(track => {
            if(product.singles.includes(track)){
                sideAHTML += `<li><span class="singles">${track}</span></li>`;
            }
            else{
                sideAHTML += `<li>${track}</li>`;
            }
        });
        sideAHTML += '</ol>';
        
        // B side
        let sideBHTML = '<h4>B Side</h4><ol>';
        product.tracklist.sideB.forEach(track => {
            if(product.singles.includes(track)){
                sideBHTML += `<li><span class="singles">${track}</span></li>`;
            }
            else{
                sideBHTML += `<li>${track}</li>`;
            }
        });
        sideBHTML += '</ol>';

        tracklistContainer.innerHTML = sideAHTML + sideBHTML;
    } else {
        document.body.innerHTML = "<main class='error-page'><h1 class='error-404'>404</h1><p>Oops, the page you're looking for does not exist.</p><p>Go back to the <a href='../pages/index.html'>home page</a> or use the navigation bar.</p></main>";
    }
}

function goBackToCatalog() {
    const savedPage = localStorage.getItem('currentPage');
    // Redireciona para a página do catálogo com o número da página salvo
    if (savedPage) {
        window.location.href = `catalog.html?page=${savedPage}`;
    } else {
        window.location.href = 'catalog.html';
    }
}

// Função para redirecionar para a página de carrinho
function goToCart() {
    window.location.href = '../pages/shopping-cart.html';
    console.log(cartItems);
}

function addToCart() {
    const productId = getQueryParam('id');
    const product = products.find(p => p.id == productId);
    if (!product) return;

    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Verifica se o produto já está no carrinho
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += quantity; // Atualiza a quantidade
    } else {
        // Adiciona um novo item ao carrinho
        cartItems.push({ id: product.id, title: product.title, price: product.price, image: product.image, quantity });
    }

    // Salva o carrinho atualizado no localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert(`${product.title} foi adicionado ao seu carrinho!`);
}


// only call function on page loaded
window.onload = loadProduct;