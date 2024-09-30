console.log(products);

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
        document.body.innerHTML = "<h1>Product not found</h1>";
    }
}

// only call function on page loaded
window.onload = loadProduct;