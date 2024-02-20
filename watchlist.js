import './styles/index.css';
import './styles/watchlist.css';

// rest of your JavaScript code...
const searchBarInput = document.getElementById("search-bar");
const searchResultsDiv = document.getElementById("search-results-div");
const searchMessageStatusDiv = document.getElementById("search-message-status-div");

//watchlist will be set to whatever is in filmsArray in local storage 
let watchlistArray = initialiseLocalStorage()
checkForEmptyWatchlist()

document.addEventListener("click",function(e){
    
    if (e.target.id == "search-btn") {
        searchWatchlist(searchBarInput.value)
    }
    
    else if(e.target.classList.contains("remove-from-watchlist-span") || e.target.classList.contains("remove-from-watchlist-img")) {
        removeFromWatchlist(e.target.dataset.filmid);
    }
    
})

function searchWatchlist(searchTerm) {
    let searchArray = [] 
    
    for (let object of watchlistArray) {
        if (object.title.includes(searchTerm)) {
            searchArray.push(object)
        }
    }
    
    renderWatchlist(searchArray)
}

function checkForEmptyWatchlist() {    
    if (watchlistArray.length > 0) {
        renderWatchlist(watchlistArray)
    } 
    else {
        searchResultsDiv.innerHTML = "";
        searchMessageStatusDiv.innerHTML = 
            `<p>Your watchlist is looking a little empty...</p>`
    }
}

function removeFromWatchlist(filmID) {
    
    for (let object of watchlistArray) {
        if (object.id == filmID) {
        
        const objectIndex = watchlistArray.indexOf(object);
        watchlistArray.splice(objectIndex,1);
        localStorage.setItem("filmArray",JSON.stringify(watchlistArray));
        renderWatchlist(watchlistArray);
        checkForEmptyWatchlist();
        }
    }    
}


async function renderWatchlist(watchlistArray) {
    
    let watchlistHTML = "";
    
    for (let object of watchlistArray) {
        console.log("executed")
        const response = await fetch(`https://www.omdbapi.com/?apikey=9f3c3104&i=${object.id}`)
        const filmObject = await response.json()
        
        
        let imgElement = ``;        
        if (filmObject.Poster != "N/A") {
            imgElement = `<img src="${filmObject.Poster}" class="film-img"></img>`
        }
        
        watchlistHTML+= `
            <div class="search-result">
                ${imgElement}

                <div class="film-information-div">
                    <div class="film-title-and-rating-div">
                        <h1 class="film-title">${filmObject.Title}</h1>
                        <div class="film-rating-div">
                            <p class="film-rating-star">&#11088;</p>
                            <p class="film-rating">${filmObject.imdbRating}</p>
                        </div>
                    </div>
                    <div class="film-middle-div">
                        <p class="film-length">${filmObject.Runtime}</p>
                        <p class="film-genres">${filmObject.Genre}</p>
                        <span class="remove-from-watchlist-span" data-filmid=${filmObject.imdbID}>
                            <img src="public/remove-icon.png" class="remove-from-watchlist-img" data-filmid=${filmObject.imdbID}>Watchlist</img>
                        </span>
                    </div>
                    <p class="film-description">${filmObject.Plot}</p>
                </div>
            </div>`
    }
    
    searchResultsDiv.innerHTML = watchlistHTML
}


function initialiseLocalStorage() { 
    
    if (localStorage.getItem("filmArray")) {
        let watchlistArray = JSON.parse(localStorage.getItem("filmArray"))
        return watchlistArray
    }

    else {
        let watchlistArray = []
        return watchlistArray
    }
}
