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

// only call function on page loaded
window.onload = loadProduct;