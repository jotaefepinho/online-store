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
        const code = document.getElementById('security-code').value;
    
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
    
        // Verify if code is 3 digits long
        if (!/^\d{3}$/.test(code)) {
            alert('Your Security Code should be 3 digits long.');
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
                body: JSON.stringify({ address, cardNumber, expirationDate, code }),
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
    
    document.addEventListener('DOMContentLoaded', () => {
        const cardNumberInput = document.getElementById('card-number');
        const expirationDateInput = document.getElementById('expiration-date');
        const securityCodeInput = document.getElementById('security-code');
    
        // Format card number into 4-digit blocks
        cardNumberInput.addEventListener('input', () => {
            const value = cardNumberInput.value.replace(/\D/g, ''); // Remove non-digits
            const formattedValue = value.match(/.{1,4}/g)?.join(' ') || value; // Group in blocks of 4
            cardNumberInput.value = formattedValue.substring(0, 19); // Limit to 19 characters (16 digits + 3 spaces)
        });
    
        // Automatically add '/' in expiration date and validate month
        expirationDateInput.addEventListener('input', (e) => {
            let value = expirationDateInput.value.replace(/\D/g, ''); // Remove non-digits
            if (value.length > 2) {
                value = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
            }
            expirationDateInput.value = value.substring(0, 5); // Limit to 5 characters (MM/YY)
    
            // Validate month
            const [month] = value.split('/');
            if (month && (parseInt(month, 10) < 1 || parseInt(month, 10) > 12)) {
                expirationDateInput.setCustomValidity('Enter a valid month (01-12)');
            } else {
                expirationDateInput.setCustomValidity('');
            }
        });
    
        // Restrict security code to 3 digits
        securityCodeInput.addEventListener('input', () => {
            securityCodeInput.value = securityCodeInput.value.replace(/\D/g, '').substring(0, 3); // Only digits, max length 3
        });
    
        // Ensure expiration date is in the future
        expirationDateInput.addEventListener('blur', () => {
            const today = new Date();
            const [month, year] = expirationDateInput.value.split('/').map(num => parseInt(num, 10));
            if (month && year) {
                const fullYear = year < 100 ? 2000 + year : year; // Convert YY to YYYY
                const expirationDate = new Date(fullYear, month - 1);
                if (expirationDate < today) {
                    expirationDateInput.setCustomValidity('Expiration date must be in the future');
                } else {
                    expirationDateInput.setCustomValidity('');
                }
            }
        });
    });
    

    // Load cart summary upon page load
    loadCartSummary();
});
