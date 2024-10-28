let currentProductId = null;

const productList = document.getElementById('product-list');
const productModal = document.getElementById('product-modal');
const modalTitle = document.getElementById('modal-title');
const productForm = document.getElementById('product-form');
const addProductBtn = document.getElementById('add-product-btn');
const closeModalBtn = document.querySelector('.close');


function loadProducts() {
    productList.innerHTML = '';
    products.forEach(product => {
        const productRow = `
            <tr>
                <td><img src="${product.image}" alt="${product.title}"></td>
                <td>${product.title}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.description}</td>
                <td>
                    <button class="edit-btn" data-id="${product.id}">Edit</button>
                    <button class="delete-btn" data-id="${product.id}">Delete</button>
                </td>
            </tr>
        `;
        productList.innerHTML += productRow;
    });


    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', openEditModal);
    });


    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', deleteProduct);
    });
}


addProductBtn.addEventListener('click', () => {
    modalTitle.textContent = 'Add Product';
    productForm.reset();
    currentProductId = null;
    productModal.style.display = 'flex';
});

// Fechar modal
closeModalBtn.addEventListener('click', () => {
    productModal.style.display = 'none';
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && productModal.style.display === 'flex') {
        productModal.style.display = 'none';
    }
});
// Abrir modal de edição de produto
function openEditModal(e) {
    const productId = e.target.getAttribute('data-id');
    const product = products.find(p => p.id == productId);

    modalTitle.textContent = 'Edit Product';
    productForm.title.value = product.title;
    productForm.price.value = product.price;
    productForm.image.value = product.image;
    productForm.description.value = product.description;
    productForm.sideA.value = product.tracklist.sideA.join(', ');
    productForm.sideB.value = product.tracklist.sideB.join(', ');
    productForm.singles.value = product.singles.join(', ');
    productForm.sample.value = product.sampleUrl;

    currentProductId = product.id; // Define o ID do produto atual
    productModal.style.display = 'flex';
}

// Função para deletar produto
function deleteProduct(e) {
    const productId = e.target.getAttribute('data-id');
    products = products.filter(p => p.id != productId);
    loadProducts();
}

// Função para salvar produto (adicionar/editar)
productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        title: productForm.title.value,
        price: parseFloat(productForm.price.value),
        image: productForm.image.value,
        description: productForm.description.value,
        tracklist: {
            sideA: productForm.sideA.value.split(',').map(track => track.trim()),
            sideB: productForm.sideB.value.split(',').map(track => track.trim()),
        },
        singles: productForm.singles.value.split(',').map(single => single.trim()),
        sampleUrl: productForm.sample.value
    };

    if (currentProductId === null) {
        // Adicionar novo produto
        formData.id = products.length + 1;
        products.push(formData);
    } else {
        // Editar produto existente
        const productIndex = products.findIndex(p => p.id == currentProductId);
        products[productIndex] = { ...formData, id: currentProductId };
    }

    loadProducts();
    productModal.style.display = 'none';
});

// Carregar produtos iniciais
loadProducts();