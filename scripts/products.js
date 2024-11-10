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
        singles: ["L$D", "Lord Pretty Flacko Jodye 2"],
        sampleUrl: "",
        genre: ['rap','hip-hop', 'psychedelic'],
        artist: 'A$AP Rocky',
        stock: 10,
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
        singles: ["Money", "Us and Them"],
        sampleUrl: "",
        genre:  ["progressive rock", "rock", "classic rock"],
        artist: 'Pink Floyd',
        stock: 10,
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
        singles: ["Blue Suede Shoes", "Tutti Frutti"],
        sampleUrl: "",
        genre: ["rock", "classic rock"],
        artist: 'Elvis Presley',
        stock: 10,
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
        singles: ["Ghostbusters", "Savin' the Day"],
        sampleUrl: "",
        genre: ["soundtrack", "pop"],
        artist: 'Various',
        stock: 10,
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
        singles: ["Stronger", "Good Life", "Can't Tell Me Nothing"],
        sampleUrl: "",
        genre: ['rap','hip-hop'],
        artist: 'Kanye West',
        stock: 10,
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
        singles: ["Good Day", "Banana Man"],
        sampleUrl: "",
        genre: ["alt rock", "pop", "alternative"],
        artist: 'Tally Hall',
        stock: 10,
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
        singles: ["Black Skinhead", "Bound 2"],
        sampleUrl: "",
        genre: ['rap','hip-hop'],
        artist: 'Kanye West',
        stock: 10,
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
        singles: ["Thriller", "Billie Jean", "Beat It"],
        sampleUrl: "",
        genre: ["pop, dance"],
        artist: 'Michael Jackson',
        stock: 10,
    },
    {
        id: 9,
        title: "Let It Be",
        price: 39.99, 
        image: "../images/letitbe.jpeg", 
        description: "Let It Be was officially The Beatles' last album. Although most of the songs were initially recorded in January 1969 –before the recording of Abbey Road in September 1969– only Get Back and Don't Let Me Down were released on single later that April '69, and the rest of the recordings left unpublished due to The Beatles' busy schedule and personal difficulties in the band-/production-team. When The Beatles finally decided they would split up, the unreleased material was prepared for release with producer Phil Spector.",
        tracklist: {
            sideA: ['Two of Us', 'Dig a Pony', 'Across the Universe', 'I Me Mine', 'Dig It', 'Let It Be', 'Maggie Mae'], 
            sideB: ["I've Got a Feeling", 'One After 909', 'The Long and Winding Road', 'For You Blue', 'Get Back']
        }, 
        singles: ['Get Back', 'Across the Universe', 'Let It Be', 'The Long and Winding Road', 'For You Blue'],
        sampleUrl: "../samples/getback.ogg",
        genre: ['classic rock', 'rock'],
        artist: 'The Beatles',
        stock: 10,
    },
    {
        id: 10,
        title: "Abbey Road",
        price: 12.99,
        image: "https://lastfm.freetls.fastly.net/i/u/300x300/f304ba0296794c6fc9d0e1cccd194ed0.jpg",
        description: "Abbey Road is the 11th studio album released by the English rock band The Beatles. It is their last recorded album, although Let It Be was the last album released before the band's dissolution in 1970.",
        tracklist: {
            sideA: ['Come Together', 'Something', "Maxwell's Silver Hammer", 'Oh! Darling', "Octopus's Garden", "I Want You (She's So Heavy)", 'Here Comes the Sun', 'Because'],
            sideB: ['You Never Give Me Your Money', 'Sun King', 'Mean Mr. Mustard', 'Polythene Pam', 'She Came in Through the Bathroom Window', 'Golden Slumbers', 'Carry That Weight', 'The End', 'Her Majesty']
        },
        singles: [],
        sampleUrl: "",
        genre: ['rock', 'pop rock', 'psychedelic pop', 'progressive pop'],
        artist: 'The Beatles',
        stock: 10,
    },
    {
        id: 11,
        title: "Sgt. Pepper's Lonely Hearts Club Band",
        price: 48.99,
        image: "https://lastfm.freetls.fastly.net/i/u/300x300/7fbe49d499107104e22e8d64a71d57a5.png",
        description: "Sgt. Pepper's Lonely Hearts Club Band is the eighth album by British rock band The Beatles. It was recorded with breaks from the end of 1966 to the middle of 1967 and published on June 14, 1967.",
        tracklist: {
            sideA: ["Sgt. Pepper's Lonely Hearts Club Band", 'With a Little Help From My Friends', 'Lucy in the Sky With Diamonds', 'Getting Better', 'Fixing a Hole', "She's Leaving Home"],
            sideB: ['Being For The Benefit Of Mr. Kite!', 'Within You Without You', "When I'm Sixty-Four", 'Lovely Rita', 'Good Morning Good Morning', "Sgt. Pepper's Lonely Hearts Club Band", 'A Day in the Life']
        },
        singles: [],
        sampleUrl: "",
        genre: ['classic rock', 'psychedelic', 'rock'],
        artist: 'The Beatles',
        stock: 10,
    },
    {
        id: 12,
        title: "Revolver",
        price: 45.99,
        image: "https://lastfm.freetls.fastly.net/i/u/300x300/deaec2d4735bea0d1c45fc75261624ae.jpg",
        description: "Revolver is the seventh studio album by English rock band the Beatles, released on 5 August 1966 on the Parlophone label and produced by George Martin. Many of the tracks on Revolver feature an electric guitar-rock sound that contrasts with their previous LP, the folk rock inspired Rubber Soul (1965). In Britain, the fourteen tracks from Revolver were released to radio stations throughout July 1966, \"building anticipation for what would clearly be a radical new phase in the group's recording career\"",
        tracklist: {
            sideA: ['Taxman', 'Eleanor Rigby', "I'm Only Sleeping", 'Love You To', 'Here, There and Everywhere', 'Yellow Submarine', 'She Said She Said'],
            sideB: ['Good Day Sunshine', 'And Your Bird Can Sing', 'For No One', 'Doctor Robert', 'I Want to Tell You', 'Got to Get You Into My Life', 'Tomorrow Never Knows']
        },
        singles: [],
        sampleUrl: "",
        genre: ['rock', 'classic rock', 'psychedelic'],
        artist: 'The Beatles',
        stock: 10,
    },
    {
        id: 13,
        title: "The Fat of the Land",
        price: 39.99,
        image: "https://lastfm.freetls.fastly.net/i/u/300x300/a701147934594475c460612e9639cd06.png",
        description: "\"The Fat of the Land\" is an album by The Prodigy. The album was released by XL Recordings on June 30, 1997 (and on July 1, 1997 in the U.S.). The album caused some controversy in the UK.",
        tracklist: {
            sideA: ['Smack My Bitch Up', 'Breathe', 'Diesel Power', 'Funky Shit', 'Serial Thrilla'],
            sideB: ['Mindfields', 'Narayan', 'Firestarter', 'Climbatize', 'Fuel My Fire']
        },
        singles: [],
        sampleUrl: "",
        genre: ['electronic', 'big beat', 'techno'],
        artist: 'The Prodigy',
        stock: 10,
    },
    {
        id: 14,
        title: "Always Outnumbered Never Outgunned",
        price: 41.99,
        image: "https://lastfm.freetls.fastly.net/i/u/300x300/76b982c5570b431ba1a1ac8f00dac6ed.png",
        description: "No description available..",
        tracklist: {
            sideA: ['Spitfire', 'Girls', 'Memphis Bells', 'Get Up Get Off', 'Hotride', 'Wake Up Call'],
            sideB: ['Action Radar', "Medusa's Path", 'Phoenix', "You'll Be Under My Wheels", 'The Way It Is', 'Shoot Down']
        },
        singles: [],
        sampleUrl: "",
        genre: ['electronic', 'big beat', 'techno'],
        artist: 'The Prodigy',
        stock: 10,
    },
    {
        id: 15,
        title: "SOUR",
        price: 41.99,
        image: "https://lastfm.freetls.fastly.net/i/u/300x300/9da8add22ca31771a440d2a6f7615f6d.jpg",
        description: "Sour (stylized in all caps) is the debut studio album by American singer Olivia Rodrigo, released through Geffen and Interscope Records on May 21, 2021. The album was preceded by three singles, Rodrigo's debut single \"Drivers License\", which reached number one in various countries, including the US Billboard Hot 100, and its follow-up top ten single \"Deja Vu\" and the third Single \"Good 4 U\"..",
        tracklist: {
            sideA: ['brutal', 'traitor', 'drivers license', '1 step forward, 3 steps back', 'deja vu'],
            sideB: ['good 4 u', 'enough for you', 'happier', 'jealousy, jealousy', 'favorite crime', 'hope ur ok']
        },
        singles: [],
        sampleUrl: "",
        genre: ['pop', 'rock', 'pop rock', 'pop punk'],
        artist: 'Olivia Rodrigo',
        stock: 10,
    },
    {
        id: 16,
        title: "GUTS (Deluxe)",
        price: 27.99,
        image: "https://lastfm.freetls.fastly.net/i/u/300x300/5ee4030c238234514efd1495153633b1.jpg",
        description: "No description available..",
        tracklist: {
            sideA: ['all-american bitch', 'bad idea right?', 'vampire', 'lacy', 'ballad of a homeschooled girl', 'making the bed', 'logical', 'get him back!'],
            sideB: ['love is embarrassing', 'the grudge', "pretty isn't pretty", 'teenage dream', 'obsessed', 'scared of my guitar', 'stranger', "girl i've always been"]
        },
        singles: [],
        sampleUrl: "",
        genre: ['indie rock', 'pop punk'],
        artist: 'Olivia Rodrigo',
    },
    {
        id: 17,
        title: "My Beautiful Dark Twisted Fantasy",
        price: 12.99,
        image: "https://lastfm.freetls.fastly.net/i/u/300x300/f5afd8fe052b452c999b657664cae99f.png",
        description: "My Beautiful Dark Twisted Fantasy is the fifth studio album by American musician Kanye West. It was released by Def Jam Recordings and Roc-A-Fella Records on November 22, 2010, following a period of public controversy for West in the preceding year, for which he retreated to a \"self-imposed exile\" in Hawaii. There, he worked on the album in a communal recording environment that involved numerous contributing musicians and producers.",
        tracklist: {
            sideA: ['Dark Fantasy', 'Gorgeous', 'POWER', 'All of the Lights (Interlude)', 'All of the Lights', 'Monster'],
            sideB: ['So Appalled', 'Devil in a New Dress', 'Runaway', 'Hell of a Life', 'Blame Game', 'Lost in the World', 'Who Will Survive in America']
        },
        singles: [],
        sampleUrl: "",
        genre: ['rap','hip-hop'],
        artist: 'Kanye West',
        stock: 10,
    },
    {
        id: 19,
        title: "The Life of Pablo",
        price: 15.99,
        image: "https://lastfm.freetls.fastly.net/i/u/300x300/8c6af1315c66631bad022085c7992b34.jpg",
        description: "The Life of Pablo is the seventh studio album by American rapper Kanye West. It debuted on 12 February 2016 during Kanye's Adidas Yeezy 'Season 3' fashion show event and was subsequently released exclusively on the streaming service Tidal. Kanye West later tweeted: \"My album will never never never be on Apple.",
        tracklist: {
            sideA: ['Ultralight Beam', 'Father Stretch My Hands Pt. 1', 'Pt. 2', 'Famous', 'Feedback', 'Low Lights', 'Highlights', 'Freestyle 4', 'I Love Kanye'],
            sideB: ['Waves', 'FML', 'Real Friends', 'Wolves', 'Siiiiiiiiilver Surffffeeeeer Intermission', '30 Hours', 'No More Parties In LA', 'Facts (Charlie Heat Version)', 'Fade']
        },
        singles: [],
        sampleUrl: "",
        genre: ['rap','hip-hop'],
        artist: 'Kanye West',
        stock: 10,
    },{
        id: 20,
        title: "ye",
        price: 22.99,
        image: "https://lastfm.freetls.fastly.net/i/u/300x300/51e9b77a991331b154d61d5749842fa1.jpg",
        description: "ye is Kanye West’s eighth solo studio album. The album discusses topics in Kanye’s life, including mental health, family, and addiction. He also explicitly announces his diagnosis with bipolar disorder through the album’s artwork and a proclamation within the album.",
        tracklist: {
            sideA: ['I Thought About Killing You', 'Yikes', 'All Mine'],
            sideB: ["Wouldn't Leave", 'No Mistakes', 'Ghost Town', 'Violent Crimes']
        },
        singles: [],
        sampleUrl: "",
        genre: ['rap','hip-hop'],
        artist: 'Kanye West',
        stock: 10,
    }
    ,{
        id: 21,
        title: "Donda",
        price: 24.99,
        image: "https://lastfm.freetls.fastly.net/i/u/300x300/32f2b94ebebb2742709006790b9209b9.png",
        description: "Donda is the tenth studio album by Kanye West. It is named after West's late mother, Donda West. The album was released to digital download and streaming on August 29, 2021 through GOOD Music and distributed by Def Jam Recordings.",
        tracklist: {
            sideA: ['Donda Chant', 'Jail', 'God Breathed', 'Off the Grid', 'Hurricane', 'Praise God', 'Jonah', 'Ok Ok', 'Junya', 'Believe What I Say', '24', 'Remote Control', 'Moon'],
            sideB: ['Heaven and Hell', 'Donda', 'Keep My Spirit Alive', 'Jesus Lord', 'New Again', 'Tell the Vision', 'Lord I Need You', 'Pure Souls', 'Come to Life', 'No Child Left Behind', 'Jail Pt 2', 'Ok Ok, Pt. 2', 'Junya, Pt. 2', 'Jesus Lord, Pt. 2']
        },
        singles: [],
        sampleUrl: "",
        genre: ['rap','hip-hop'],
        artist: 'Kanye West',
        stock: 10,
    },
    {
        id: 22,
        title: "JESUS IS KING",
        price: 21.99,
        image: "https://lastfm.freetls.fastly.net/i/u/300x300/7477ac60ea2d22a4ec2281ae917d2d36.jpg",
        description: "JESUS IS KING is Kanye West’s ninth studio album and the follow-up to his June 2018 release, ye. The project debuted on October 25, 2019, a little over a year after the initial release date for Yandhi, which was scrapped and reworked into a gospel album. To the surprise of many, his wife Kim Kardashian took to Twitter on August 29, 2019, to announce Ye’s newest solo effort on his behalf—along with its title, tracklist, and release date.",
        tracklist: {
            sideA: ['Every Hour', 'Selah', 'Follow God', 'Closed on Sunday', 'On God'],
            sideB: ['Everything We Need', 'Water', 'God Is', 'Hands On', 'Use This Gospel', 'Jesus Is Lord']
        },
        singles: [],
        sampleUrl: "",
        genre: ['rap','hip-hop'],
        artist: 'Kanye West',
        stock: 10,
    },
    {
        id: 23,
        title: "Future Nostalgia",
        price: 45.99,
        image: "https://lastfm.freetls.fastly.net/i/u/300x300/7017c94ef74a476838e751b0cee1f014.png",
        description: "Future Nostalgia is the second studio album by English singer-songwriter, Dua Lipa. It was released on March 27th, 2020 by Warner Records. Lipa began working on the album in early 2018, enlisting writers and producers such as Jeff Bhasker, Ian Kirkpatrick, Stuart Price, The Monsters and the Strangerz and others in order to create a pop record with a \"nostalgic\" and electronic feel.",
        tracklist: {
            sideA: ['Future Nostalgia', "Don't Start Now", 'Cool', 'Physical', 'Levitating'],
            sideB: ['Pretty Please', 'Hallucinate', 'Love Again', 'Break My Heart', 'Good in Bed', 'Boys Will Be Boys']
        },
        singles: [],
        sampleUrl: "",
        genre: ['pop', 'disco', 'dance-pop', 'nu-disco', 'synthpop'],
        artist: 'Dua Lipa',
        stock: 10,
    },    
    {
        id: 24,
        title: "Dua Lipa",
        price: 31.99,
        image: "https://lastfm.freetls.fastly.net/i/u/300x300/c3b0f7e15fa201bdbb2934a4233e0425.png",
        description: "Dua Lipa is the self-titled debut studio album by English singer and songwriter Dua Lipa. It was released on 2 June 2017 by Warner Bros. Records.",
        tracklist: {
            sideA: ['Genesis', 'Lost in Your Light (feat. Miguel)', 'Hotter Than Hell', 'Be the One', 'IDGAF', 'Blow Your Mind (Mwah)', 'Garden', 'No Goodbyes'],
            sideB: ["Thinking 'Bout You", 'New Rules', 'Begging', 'Homesick', 'Dreams', 'Room for 2', 'New Love', 'Bad Together', 'Last Dance']
        },
        singles: [],
        sampleUrl: "",
        genre: ['pop', 'dance', 'electropop', 'synthpop', 'dance-pop'],
        artist: 'Dua Lipa',
        stock: 10,
    },
    {
        id: 25,
        title: "19",
        price: 38.99,
        image: "https://lastfm.freetls.fastly.net/i/u/300x300/cccfdb40c1e4c5949ce9076aad325942.jpg",
        description: "19 is the debut studio album by English singer-songwriter Adele. It was released on January 28, 2008, by XL Recordings. Following Adele's graduation from the BRIT School in April 2006, she began publishing songs and recorded a three-song demo for a class project and gave it to a friend, who posted the demo on Myspace, where it became very successful and led to interest from the record label.",
        tracklist: {
            sideA: ['Daydreamer', 'Best for Last', 'Chasing Pavements', 'Cold Shoulder', 'Crazy for You', 'Melt My Heart to Stone'],
            sideB: ['First Love', 'Right as Rain', 'Make You Feel My Love', 'My Same', 'Tired', 'Hometown Glory']
        },
        singles: [],
        sampleUrl: "",
        genre: ['soul', 'pop'],
        artist: 'Adele',
        stock: 10,
    },
    {
        id: 26,
        title: "21",
        price: 45.99,
        image: "https://lastfm.freetls.fastly.net/i/u/300x300/75075bd01c96465e54fc250b22f83296.jpg",
        description: "21 is the second studio album by English singer-songwriter Adele. It was released on 24 January 2011 in Europe and on 22 February 2011 in North America by XL Recordings and Columbia Records. The album was named after the age of the singer during its production.",
        tracklist: {
            sideA: ['Rolling in the Deep', 'Rumour Has It', 'Turning Tables', "Don't You Remember", 'Set Fire to the Rain'],
            sideB: ["He Won't Go", 'Take It All', "I'll Be Waiting", 'One and Only', 'Lovesong', 'Someone Like You']
        },
        singles: [],
        sampleUrl: "",
        genre: ['soul', 'pop'],
        artist: 'Adele',
        stock: 10,
    },
    {
        id: 27,
        title: "25",
        price: 13.99,
        image: "https://lastfm.freetls.fastly.net/i/u/300x300/6284ff0b115c46d1b28ae96e6d5b4099.jpg",
        description: "25 is the third studio album by English singer-songwriter Adele, released on November 20, 2015 by XL Recordings and Columbia Records. The album is titled as a reflection of her life and frame of mind at 25 years old and is termed a \"make-up record\". Its lyrical content features themes of Adele \"yearning for her old self, her nostalgia\", and \"melancholia about the passage of time\" according to an interview with the singer by Rolling Stone, as well as themes of motherhood and regret.",
        tracklist: {
            sideA: ['Hello', 'Send My Love (to Your New Lover)', 'I Miss You', 'When We Were Young', 'Remedy'],
            sideB: ['Water Under the Bridge', 'River Lea', 'Love in the Dark', 'Million Years Ago', 'All I Ask', 'Sweetest Devotion']
        },
        singles: [],
        sampleUrl: "",
        genre: ['soul', 'pop'],
        artist: 'Adele',
        stock: 10,
    },
    {
        id: 28,
        title: "30",
        price: 47.99,
        image: "https://lastfm.freetls.fastly.net/i/u/300x300/fb82ddd94c9fbdb5733a46133d16c073.jpg",
        description: "30 is the fourth studio album by Adele, released on November 19, 2021. The album is Adele's first project since her contract with XL Recordings expired after the release of 25 (2015). The album's title alludes to the age the singer first married ex-husband Simon Konecki, and the album features themes of separation, divorce, motherhood, and the anxiety of fame.",
        tracklist: {
            sideA: ['Strangers by Nature', 'Easy on Me', 'My Little Love', 'Cry Your Heart Out', 'Oh My God', 'Can I Get It'],
            sideB: ['I Drink Wine', 'All Night Parking (with Erroll Garner) Interlude', 'Woman Like Me', 'Hold On', 'To Be Loved', 'Love Is a Game']
        },
        singles: [],
        sampleUrl: "",
        genre: ['soul', 'pop'],
        artist: 'Adele',
        stock: 10,
    },
    {
        id: 29,
        title: "emails i can't send",
        price: 31.99,
        image: "https://lastfm.freetls.fastly.net/i/u/300x300/e4198cd6ab64b73da4a8387bb87c62d3.png",
        description: "\"emails i can't send\" is the fifth studio album by American singer and songwriter Sabrina Carpenter, released on July 15, 2022 by Island Records, and was recorded in New York. Sabrina has already expressed that this record has turned into her most honest and personal one expressing that this record is “the first one where I am myself”. The original release of the record was first teased during her music video for the January 2021 single “Skin”, where the singer can be seen on top of a car with the license plate “SC52021”.",
        tracklist: {
            sideA: ['emails i can’t send', 'Vicious', 'Read your Mind', 'Tornado Warnings', 'because i liked a boy', 'Already Over'],
            sideB: ['how many things', 'bet u wanna', 'Nonsense', 'Fast Times', 'skinny dipping', 'Bad for Business', 'decode']
        },
        singles: [],
        sampleUrl: "",
        genre: ['pop', 'indie pop', 'folk', 'rnb'],
        artist: 'Sabrina Carpenter',
    },
    {
        id: 30,
        title: "Short n' Sweet",
        price: 15.99,
        image: "https://lastfm.freetls.fastly.net/i/u/300x300/8bf0ab10e23c95ccea08f75bc62e4865.png",
        description: "Short n' Sweet is the sixth studio album by American singer Sabrina Carpenter. It was released on August 23, 2024, through Island Records. The record, marking Carpenter's second album with the record label after emails i can't send (2022).",
        tracklist: {
            sideA: ['Please Please Please'],
            sideB: ['Espresso']
        },
        singles: [],
        sampleUrl: "",
        artist: 'Sabrina Carpenter',
        genre: ['pop', 'aoty', 'country', 'synthpop'],
    }
    

];

localStorage.setItem('products', JSON.stringify(products));