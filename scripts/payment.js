document.addEventListener('DOMContentLoaded', () => {
    // Function to load and populate cart
    async function loadCartSummary() {
        try {
            // Fetch cart items through api
            const cartItems = await fetchCart();
    
            // Select cart element in DOM
            const orderItemsContainer = document.getElementById('order-items');
            orderItemsContainer.innerHTML = ''; //Clean older content in cart
            let totalAmount = 0;
    
            // For each item in cart, get details and show them
            cartItems.forEach(item => {
                const { productDetails, quantity } = item;
                const { title, price, image } = productDetails;
                const productTotal = price * quantity;
                totalAmount += productTotal;
    
                // Create each item element in the cart
                const itemElement = document.createElement('div');
                itemElement.classList.add('order-item');
                itemElement.innerHTML = `
                    <img src="${image}" alt="${title}" class="product-image">
                    <span>${quantity}</span>
                    <span>Price: $${price.toFixed(2)}</span>
                    <span>Subtotal: $${productTotal.toFixed(2)}</span>
                `;
                orderItemsContainer.appendChild(itemElement);
            });
    
            // Refresh cart total and show value
            document.getElementById('total-amount').innerText = `$${totalAmount.toFixed(2)}`;
        } catch (error) {
            console.error('Error while loading cart:', error);
        }
    }
    

    document.getElementById('payment-form').addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const cardNumber = document.getElementById('card-number').value;
        const expirationDate = document.getElementById('expiration-date').value;
        const pin = document.getElementById('pin').value;
    
        // Verify if card number is 16 digits long
        if (!/^\d{16}$/.test(cardNumber)) {
            alert('Your card should be 16 digits long.');
            return;
        }
    
        // Verify date format as mm/yy
        if (!/^\d{2}\/\d{2}$/.test(expirationDate)) {
            alert('The date of expiry should be mm/yy.');
            return;
        }
    
        // Verify if pin is 4 digits long
        if (!/^\d{4}$/.test(pin)) {
            alert('Your PIN should be 4 digits long.');
            return;
        }
    
        const address = {
            street: document.getElementById('street').value,
            number: document.getElementById('number').value,
            city: document.getElementById('city').value,
            country: document.getElementById('country').value,
        };
        const token = localStorage.getItem('authToken');

        try {
            // Submit payment data
            const paymentResponse = await fetch('/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ address, cardNumber, expirationDate, pin }),
            });
    
            const paymentResult = await paymentResponse.json();
            if (paymentResult.success) {
                // Reset user cart and update stock
                const cartResponse = await fetch('/cart', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
    
                const cartResult = await cartResponse.json();
                if (cartResult.success) {
                    alert('Your purchase was successful!');
                    window.location.href = 'shopping-cart.html';
                } else {
                    alert('Error while cleaning your cart. Try again.');
                }
            } else {
                alert('Error while finalizing purchase. Try again later.');
            }
        } catch (error) {
            console.error('Error while processing payment:', error);
            alert('Error while processing payment. Try again later.');
        }
    });
    

    // Load cart summary upon page load
    loadCartSummary();
});
