const searchBarForm = document.getElementById("search-bar-form");
const searchBarInput = document.getElementById("search-bar");
const searchResultsDiv = document.getElementById("search-results-div");
const searchMessageStatusDiv = document.getElementById("search-message-status-div");

/* Change this to the film title you want to load on start */
let searchTerm = "Blade Runner"; 

let watchlist = initialiseLocalStorage()


document.addEventListener("click",function(e){
    
    if (e.target.id == "search-btn" && searchBarInput.value) {
        searchTerm = searchBarInput.value;
        fetchThenRenderFilms(searchTerm);
        searchBarInput.value = "";
    }

    else if(e.target.classList.contains("add-to-watchlist-element")) {
        addToWatchlist(e.target.dataset.filmid);
    }
    
})

function addToWatchlist(filmID) {
    
    const titleElement = document.querySelector(`[data-titleid=${filmID}title]`);
    const textElement = document.querySelector(`[data-watchlistid=${filmID}watchlist]`);

    let watchlistIDArray = [];

    for (let object of watchlist) {
        watchlistIDArray.push(object.id)
    };

    console.log(watchlistIDArray);

    if (!watchlistIDArray.includes(filmID)) {
        const watchlistObject = {
            title: `${titleElement.textContent}`,
            id: `${filmID}`
            
        };
        watchlist.push(watchlistObject);
        localStorage.setItem("filmArray",JSON.stringify(watchlist));
        
        textElement.textContent = "Added to watchlist!";
        textElement.classList.add("green-text");
        
        setTimeout(function(){
            textElement.textContent = "Watchlist";
            textElement.classList.remove("green-text");
        },4000);
        
    }
    
    else if (textElement.textContent != "Already in watchlist"){
        textElement.textContent = "Already in watchlist";
        textElement.classList.add("orange-text");
        
        setTimeout(function(){
            textElement.textContent = "Watchlist";
            textElement.classList.remove("orange-text");
        },4000);
    }
}

async function renderSearchResults(searchResultsArray) {

    let idArray = [];
    let filmListHTML = ``;
    
    for (let filmObject of searchResultsArray) {
        idArray.push(filmObject.imdbID);
    }
    console.log(searchResultsArray)
    for (let id of idArray) {
        const response = await fetch(`https://www.omdbapi.com/?apikey=9f3c3104&i=${id}`);
        const filmObject = await response.json();
        
        let imgElement = ``;        
        if (filmObject.Poster != "N/A") {
            imgElement = `<img src="${filmObject.Poster}" class="film-img"></img>`;
        }
        
        filmListHTML+= `
            <div class="search-result">
                ${imgElement}

                <div class="film-information-div">
                    <div class="film-title-and-rating-div">
                        <h1 class="film-title" data-titleid="${filmObject.imdbID}title">${filmObject.Title}</h1>
                        <div class="film-rating-div">
                            <p class="film-rating-star">&#11088;</p>
                            <p class="film-rating">${filmObject.imdbRating}</p>
                        </div>
                    </div>
                    <div class="film-middle-div">
                        <p class="film-length">${filmObject.Runtime}</p>
                        <p class="film-genres">${filmObject.Genre}</p>
                        <span class="add-to-watchlist-span add-to-watchlist-element" data-filmid=${filmObject.imdbID}>
                            <img src="/resources/add-icon.png" class="add-to-watchlist-img add-to-watchlist-element" data-filmid=${filmObject.imdbID}></img>
                            <p class="add-to-watchlist-text add-to-watchlist-element" data-filmid=${filmObject.imdbID} data-watchlistid="${filmObject.imdbID}watchlist">Watchlist</p>
                        </span>
                    </div>
                    <p class="film-description">${filmObject.Plot}</p>
                </div>
            </div>`
    }
    
    searchResultsDiv.innerHTML = filmListHTML
}

async function fetchThenRenderFilms(filmName) {
    
    const response = await fetch(`https://www.omdbapi.com/?apikey=9f3c3104&type=movie&s=${filmName}`);
    const data = await response.json();
    
    
    
    if (data.Search) {
        renderSearchResults(data.Search);
        searchBarInput.placeholder = ". . .";
    }
    
    else {
        searchResultsDiv.innerHTML = "";
        searchMessageDiv.innerHTML = 
            `<p id="search-message-error">Unable to find what you’re looking for. Please try another search term.</p>`;
    }
    
}

function initialiseLocalStorage() {
    
    if (localStorage.getItem("filmArray")) {
        let watchlist = JSON.parse(localStorage.getItem("filmArray"));
        return watchlist
    }

    else {
        let watchlist = [];
        return watchlist
    }
}