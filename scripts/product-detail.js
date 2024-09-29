const products = [
    {
        id: 1,
        title: "At.Long.Last.A$AP",
        price: 19.99,
        image: "../images/atlonglast.jpg",
        description: "The second studio album by American rapper ASAP Rocky, released in 2015. It includes a mix of psychedelic and experimental elements.",
        tracklist: {
            sideA: ["Holy Ghost", "Canal St.", "Fine Whine", "L$D", "Excuse Me"],
            sideB: ["JD", "Lord Pretty Flacko Jodye 2", "Electric Body", "Jukebox Joints", "Max B"]
        },
        singles: ["L$D", "Lord Pretty Flacko Jodye 2"]
    },
    {
        id: 2,
        title: "The Dark Side of the Moon",
        price: 29.99,
        image: "../images/darkside.png",
        description: "Pink Floyd’s 1973 iconic album, known for its unique sonic experiences and exploration of complex themes such as conflict, greed, and mental illness.",
        tracklist: {
            sideA: ["Speak to Me", "Breathe", "On the Run", "Time", "The Great Gig in the Sky"],
            sideB: ["Money", "Us and Them", "Any Colour You Like", "Brain Damage", "Eclipse"]
        },
        singles: ["Money", "Time"]
    },
    {
        id: 3,
        title: "Elvis Presley",
        price: 39.99,
        image: "../images/elvis.jpg",
        description: "The debut studio album by American rock and roll singer Elvis Presley. Released in 1956, it helped establish Presley as the King of Rock and Roll.",
        tracklist: {
            sideA: ["Blue Suede Shoes", "I'm Counting on You", "I Got a Woman", "One-Sided Love Affair", "I Love You Because"],
            sideB: ["Just Because", "Tutti Frutti", "Tryin' to Get to You", "I'm Gonna Sit Right Down and Cry", "Blue Moon"]
        },
        singles: ["Blue Suede Shoes", "Tutti Frutti"]
    },
    {
        id: 4,
        title: "Ghostbusters Soundtrack",
        price: 49.99,
        image: "../images/ghostbusters.jpg",
        description: "The iconic soundtrack to the 1984 hit movie 'Ghostbusters,' featuring the timeless hit song 'Ghostbusters' by Ray Parker Jr.",
        tracklist: {
            sideA: ["Ghostbusters", "Cleanin' Up the Town", "Savin' the Day", "In the Name of Love", "I Can Wait Forever"],
            sideB: ["Hot Night", "Magic", "Main Title Theme", "Dana's Theme", "End Credits Theme"]
        },
        singles: ["Ghostbusters", "Savin' the Day"]
    },
    {
        id: 5,
        title: "Graduation",
        price: 59.99,
        image: "../images/graduation.jpg",
        description: "The third studio album by American rapper Kanye West, released in 2007. Graduation marked a departure from his earlier 'chipmunk soul' style.",
        tracklist: {
            sideA: ["Good Morning", "Champion", "Stronger", "I Wonder", "Good Life"],
            sideB: ["Can't Tell Me Nothing", "Barry Bonds", "Flashing Lights", "Everything I Am", "The Glory"]
        },
        singles: ["Stronger", "Good Life", "Can't Tell Me Nothing"]
    },
    {
        id: 6,
        title: "Marvin's Marvelous Mechanical Museum",
        price: 69.99,
        image: "../images/tallyhall.jpeg",
        description: "The debut studio album by American rock band Tally Hall. A quirky blend of rock and pop with humorous and imaginative themes.",
        tracklist: {
            sideA: ["Good Day", "Greener", "Welcome to Tally Hall", "Taken for a Ride", "The Bidding"],
            sideB: ["Be Born", "Banana Man", "Just Apathy", "Spring and a Storm", "Two Wuv"]
        },
        singles: ["Good Day", "Banana Man"]
    },
    {
        id: 7,
        title: "Yeezus",
        price: 59.99,
        image: "../images/yeezus.png",
        description: "The sixth studio album by American rapper Kanye West, released in 2013. It is known for its minimalist production and abrasive sound.",
        tracklist: {
            sideA: ["On Sight", "Black Skinhead", "I Am a God", "New Slaves"],
            sideB: ["Hold My Liquor", "I'm In It", "Blood on the Leaves", "Bound 2"]
        },
        singles: ["Black Skinhead", "Bound 2"]
    },
    {
        id: 8,
        title: "Thriller",
        price: 69.99,
        image: "../images/thriller.png",
        description: "Michael Jackson's 1982 album 'Thriller' is the best-selling album of all time, blending pop, rock, and funk with groundbreaking production.",
        tracklist: {
            sideA: ["Wanna Be Startin' Somethin'", "Baby Be Mine", "The Girl Is Mine", "Thriller"],
            sideB: ["Beat It", "Billie Jean", "Human Nature", "P.Y.T. (Pretty Young Thing)", "The Lady in My Life"]
        },
        singles: ["Thriller", "Billie Jean", "Beat It"]
    }
];

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