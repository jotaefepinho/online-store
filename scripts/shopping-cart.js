// Pull cart from server
async function fetchCart() {
    const token = localStorage.getItem('authToken');

    if (token) {
        try {
            // Get items in user cart
            const cartResponse = await fetch('http://localhost:3000/cart', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!cartResponse.ok) {
                throw new Error('Error while searching user cart.');
            }

            const cartItems = await cartResponse.json();

            // Get each product's details
            const productDetailsPromises = cartItems.map(async (item) => {
                const productResponse = await fetch(`http://localhost:3000/products/${item.id}`);
                if (!productResponse.ok) {
                    throw new Error(`Error while searching data for product with ID ${item.id}`);
                }
                const productDetails = await productResponse.json();
                return {
                    id: item.id,
                    quantity: item.quantity,
                    productDetails: {
                        title: productDetails.title || 'No title available',
                        price: productDetails.price || 0,
                        image: productDetails.image || '/images/default-image.jpg',
                        artist: productDetails.artist || 'Unknown Artist',
                        stock: productDetails.stock || 0,
                    },
                };
            });

            // Wait for all promises
            const detailedCartItems = await Promise.all(productDetailsPromises);
            return detailedCartItems;
        } catch (error) {
            console.error('Error while searching cart:', error);
            return [];
        }
    } else {
        console.error('No token provided.');
        return [];
    }
}


// Render cart on DOM
async function renderCart() {
    const shoppingCart = document.getElementById('shopping-cart');
    shoppingCart.innerHTML = '';

    const cartItems = await fetchCart();

    if (cartItems.length === 0) {
        shoppingCart.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    let totalCartValue = 0;

    cartItems.forEach(item => {
        const { id, quantity, productDetails } = item;
        const { title, price, image, artist, stock } = productDetails;
        const productTotal = price * quantity;
        totalCartValue += productTotal;

        const cartProduct = document.createElement('div');
        cartProduct.className = 'cart-product';
        cartProduct.innerHTML = `
            <div class="cart-product-img">
                <img src="${image}" alt="${title}">
            </div>
            <div class="cart-product-info">
                <div class="cart-product-details name">${title}</div>
                <div class="cart-product-details artist">${artist}</div>
                <div class="cart-product-details price">Preço: $${price.toFixed(2)}</div>
                <div class="cart-product-details count">
                    <input type="number" value="${quantity}" min="1" max="${stock}" id="quantity-${id}" class="quantity-input">
                </div>
                <div class="cart-product-details total">Subtotal: $${productTotal.toFixed(2)}</div>
                <div class="cart-product-details icon trash">
                    <i class="fas fa-trash" onclick="handleRemoveFromCart('${id}')"></i>
                </div>
            </div>
        `;
        shoppingCart.appendChild(cartProduct);

        // Update quantity automatically
        const quantityInput = cartProduct.querySelector(`#quantity-${id}`);
        quantityInput.addEventListener('change', () => handleQuantityChange(id, quantityInput.value));
    });

    // Show total price on cart
    const totalDisplay = document.createElement('div');
    totalDisplay.className = 'cart-total';
    totalDisplay.innerHTML = `<h3>Total: $${totalCartValue.toFixed(2)}</h3>`;
    shoppingCart.appendChild(totalDisplay);
}

async function handleQuantityChange(id, newQuantity) {
    newQuantity = parseInt(newQuantity, 10);
    console.log(newQuantity);
    if (newQuantity > 0) {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.error('No token given.');
                return;
            }

            const response = await fetch(`http://localhost:3000/cart/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id, quantity: newQuantity })
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('Error while updating quantity:', error.message);
                return;
            }

            // Re-render cart with new quantity
            renderCart();
        } catch (error) {
            console.error('Error while updating quantity on cart:', error);
        }
    } else {
        // Remove item if quantity is less than 0
        handleRemoveFromCart(id);
    }
}

async function removeCartItem(id) {
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch(`/cart/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error while removing from cart');
        }

        console.log(`Item with ID ${id} removed successfully.`);
    } catch (error) {
        console.error('Error while removing item from cart:', error);
        alert(`Not possible to remove item: ${error.message}`);
    }
}

// Deal with deletion from cart
async function handleRemoveFromCart(id) {
    await removeCartItem(id);
    renderCart();
}
document.getElementById('checkout-btn').addEventListener('click', () => {
    window.location.href = '../pages/payment.html'; // Redirect to payment
});

// Initialize cart render upon page load
document.addEventListener('DOMContentLoaded', renderCart);