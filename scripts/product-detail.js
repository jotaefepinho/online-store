// Obtain URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Load Product details on product ID
async function loadProduct() {
    const id = getQueryParam('id'); // Get numeric ID from url
    if (!id || isNaN(id)) {
        displayErrorPage();
        return;
    }

    try {
        // Get product details from products API
        const response = await fetch(`http://localhost:3000/products/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }

        const product = await response.json();
        displayProduct(product);
    } catch (error) {
        console.error('Error while loading product:', error);
        displayErrorPage();
    }
}

//Display product on page
function displayProduct(product) {
    document.getElementById('album-title').textContent = product.title;
    document.getElementById('album-artist').textContent = product.artist;
    document.getElementById('album-price').textContent = product.price;
    document.getElementById('album-description').textContent = product.description;
    document.getElementById('album-cover').src = product.image;

    if(product.sampleUrl === ""){
        document.getElementById('album-sample').style = "display: none";    
    }
    document.getElementById('album-sample').src = product.sampleUrl;

    // Display Genre
    const genreContainer = document.getElementById('album-genre');
    genreContainer.textContent = product.genre.join(', ');

    // Render Tracklist
    const tracklistContainer = document.getElementById('tracklist-container');

    // A Side
    let sideAHTML = '<h4>A Side</h4><ol>';
    product.tracklist.sideA.forEach(track => {
        sideAHTML += product.singles.includes(track)
            ? `<li><span class="singles">${track}</span></li>`
            : `<li>${track}</li>`;
    });
    sideAHTML += '</ol>';

    // B Side
    let sideBHTML = '<h4>B Side</h4><ol>';
    product.tracklist.sideB.forEach(track => {
        sideBHTML += product.singles.includes(track)
            ? `<li><span class="singles">${track}</span></li>`
            : `<li>${track}</li>`;
    });
    sideBHTML += '</ol>';

    tracklistContainer.innerHTML = sideAHTML + sideBHTML;
}

// Error page, if product ID is invalid
function displayErrorPage() {
    document.body.innerHTML = `
        <main class='error-page'>
            <h1 class='error-404'>404</h1>
            <p>Oops, the page you're looking for does not exist.</p>
            <p>Go back to the <a href='../pages/index.html'>home page</a> or use the navigation bar.</p>
        </main>`;
}

function goBackToCatalog() {
    const savedPage = localStorage.getItem('currentPage');
    // redirect to catalog with correct index number
    if (savedPage) {
        window.location.href = `catalog.html?page=${savedPage}`;
    } else {
        window.location.href = 'catalog.html';
    }
}

// Redirect to cart
function goToCart() {
    window.location.href = '../pages/shopping-cart.html';
}

async function addToCart() {
    const id = getQueryParam('id');
    const quantity = parseInt(document.getElementById('quantity').value) || 1;

    //Get authentication token
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('You need to be logged in to see your Shopping Cart.');
        return;
    }

    try {
        // Verify product on database
        const productResponse = await fetch(`http://localhost:3000/products/${id}`);
        const product = await productResponse.json();
        // Verify if product exists
        if (!product) {
            alert('Product not found');
            return;
        }

        // Verify cart
        const cartResponse = await fetch('http://localhost:3000/cart', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const cart = await cartResponse.json();
        
        const productInCart = cart.find(item => parseInt(item.id) === parseInt(id));

        // Making sure quantity on cart is less than the current stock for item
        const maxQuantity = Math.min(quantity, product.stock);

        // Verify quantity < stock
        if (quantity > product.stock) {
            alert(`The quantity of the item is invalid. The current stock is ${maxQuantity}.`);
            return;
        }

        if (productInCart) {
            // Increment product if it's already in cart
            const newQuantity = productInCart.quantity + quantity;

            // Verify if new quantity is less than stock
            if (newQuantity > product.stock) {
                alert(`The quantity of the item is invalid. The current stock is ${product.stock}.`);
                return;
            }

            // Update cart with PUT
            const updateResponse = await fetch(`http://localhost:3000/cart/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ quantity: newQuantity })
            });

            if (updateResponse.ok) {
                alert('Cart updated successfully!');
            } else {
                alert('Error while updating cart.');
            }
        } else {
            // Create product on cart, if cart does not exist
            const addResponse = await fetch('http://localhost:3000/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id: id, quantity: maxQuantity })
            });

            if (addResponse.ok) {
                alert('Product added to cart!');
            } else {
                alert('Error while adding product');
            }
        }

    } catch (error) {
        console.error('Error while adding to cart:', error);
        alert(error.message || 'Error while adding to cart. Try again later.');
    }
}

// Call load product function upon page load
window.onload = loadProduct;