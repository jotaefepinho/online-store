let currentProductId = null;

const productList = document.getElementById('product-list');
const productModal = document.getElementById('product-modal');
const modalTitle = document.getElementById('modal-title');
const productForm = document.getElementById('product-form');
const addProductBtn = document.getElementById('add-product-btn');
const closeModalBtn = document.querySelector('.close');

async function loadProducts() {
    try {
        const response = await fetch('http://localhost:3000/products');
        const products = await response.json();
        
        if (response.ok) {
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
        } else {
            console.error('Error while loading products');
        }
    } catch (error) {
        console.error('Error while loading products:', error);
    }
}

addProductBtn.addEventListener('click', () => {
    modalTitle.textContent = 'Add Product';
    productForm.reset();
    currentProductId = null;
    productModal.style.display = 'flex';
});

// Close modal window
closeModalBtn.addEventListener('click', () => {
    productModal.style.display = 'none';
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && productModal.style.display === 'flex') {
        productModal.style.display = 'none';
    }
});

productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        artist: productForm.artist.value,
        title: productForm.title.value,
        price: parseFloat(productForm.price.value),
        image: productForm.image.value,
        description: productForm.description.value,
        tracklist: {
            sideA: productForm.sideA.value.split(',').map(track => track.trim()),
            sideB: productForm.sideB.value.split(',').map(track => track.trim()),
        },
        singles: productForm.singles.value.split(',').map(single => single.trim()),
        sampleUrl: productForm.sample.value,
        genre: productForm.genre.value.split(',').map(g => g.trim()), // Add genre
        stock: parseInt(productForm.stock.value), // Add stock
        quantitySold: parseInt(productForm.quantitySold.value), // Add sold quantity
    };

    if (currentProductId === null) {
        // Add new product
        await createProduct(formData);
    } else {
        // Edit existing product
        await updateProduct(currentProductId, formData);
    }

    productModal.style.display = 'none';
});

// Open product edit modal
function openEditModal(e) {
    const productId = e.target.getAttribute('data-id');
    fetch(`http://localhost:3000/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            modalTitle.textContent = 'Edit Product';
            productForm.artist.value = product.artist;
            productForm.title.value = product.title;
            productForm.price.value = product.price;
            productForm.image.value = product.image;
            productForm.description.value = product.description;
            productForm.sideA.value = product.tracklist.sideA.join(', ');
            productForm.sideB.value = product.tracklist.sideB.join(', ');
            productForm.singles.value = product.singles.join(', ');
            productForm.sample.value = product.sampleUrl;
            productForm.genre.value = product.genre.join(', '); // fill genre
            productForm.stock.value = product.stock; // Fill stock
            productForm.quantitySold.value = product.quantitySold; // Fill quantity sold

            currentProductId = product.id; // Define current product ID
            productModal.style.display = 'flex';
        })
        .catch(error => {
            console.error('Error while loading product to edit:', error);
        });
}

async function createProduct(formData) {
    try {
        const response = await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Product created successfully!');
            loadProducts();
        } else {
            console.error('Error while creating product:', data.message);
        }
    } catch (error) {
        console.error('Error while creating product:', error);
    }
}

async function updateProduct(id, formData) {
    try {
        const response = await fetch(`http://localhost:3000/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Product updated successfully!');
            loadProducts();
        } else {
            console.error('Error while updating product:', data.message);
        }
    } catch (error) {
        console.error('Error while updating product:', error);
    }
}


async function deleteProduct(e) {
    const productId = e.target.getAttribute('data-id');
    try {
        const response = await fetch(`http://localhost:3000/products/${productId}`, {
            method: 'DELETE',
        });

        const data = await response.json();
        if (response.ok) {
            alert('Product deleted successfully!');
            loadProducts();
        } else {
            console.error('Error while deleting product:', data.message);
        }
    } catch (error) {
        console.error('Error while deleting product:', error);
    }
}


// Load current products upon page load
loadProducts();
