// Obtenha produtos e o carrinho armazenado no localStorage ou inicialize um carrinho padrão
const products = JSON.parse(localStorage.getItem('products')) || [];
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];


// Elemento do carrinho no DOM
const shoppingCart = document.getElementById('shopping-cart');

// Função para atualizar o total do carrinho
function updateCart() {
    let total = 0;

    cartItems.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            const itemTotal = product.price * item.quantity;
            total += itemTotal;
        }
    });

    // Atualiza o total exibido no carrinho
    const totalElement = document.getElementById('total');
    if (totalElement) {
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
}

// Função para renderizar os produtos no carrinho
function renderCart() {
    shoppingCart.innerHTML = ''; // Limpa o conteúdo anterior
    let totalCartValue = 0;

    cartItems.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            const productTotal = product.price * item.quantity;
            totalCartValue += productTotal;

            const cartProduct = document.createElement('div');
            cartProduct.className = 'cart-product';
            cartProduct.innerHTML = `
                <div class="cart-product-img">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="cart-product-info">
                    <div class="cart-product-details name">${product.title}</div>
                    <div class="cart-product-details price">$${product.price.toFixed(2)}</div>
                    <div class="cart-product-details count">
                        <input type="number" value="${item.quantity}" min="1" id="quantity-${item.id}" class="quantity-input">
                    </div>
                    <div class="cart-product-details total">$${productTotal.toFixed(2)}</div>
                    <div class="cart-product-details icon trash">
                        <i class="fas fa-trash" onclick="removeFromCart(${item.id})"></i>
                    </div>
                </div>
            `;
            shoppingCart.appendChild(cartProduct);

            // Evento para atualizar a quantidade automaticamente
            const quantityInput = cartProduct.querySelector(`#quantity-${item.id}`);
            quantityInput.addEventListener('change', () => updateQuantity(item.id));
        }
    });

    // Exibe o total do carrinho
    const totalDisplay = document.createElement('div');
    totalDisplay.className = 'cart-total';
    totalDisplay.innerHTML = `<h3>Total: $${totalCartValue.toFixed(2)}</h3>`;
    shoppingCart.appendChild(totalDisplay);

    // Atualiza o total no carrinho e no localStorage
    updateCart();
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Função para atualizar a quantidade de um produto
function updateQuantity(id) {
    const input = document.getElementById(`quantity-${id}`);
    const newQuantity = parseInt(input.value);

    if (newQuantity > 0) {
        const item = cartItems.find(item => item.id === id);
        if (item) {
            item.quantity = newQuantity;
        }
        renderCart();
    } else {
        removeFromCart(id);
    }
}

// Função para remover um item do carrinho
function removeFromCart(id) {
    cartItems = cartItems.filter(item => item.id !== id);
    renderCart();
}

// Inicializa o carrinho ao carregar a página
renderCart();
console.log(cartItems);