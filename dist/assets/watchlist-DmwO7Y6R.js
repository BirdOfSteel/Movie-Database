import"./watchlist-DMi4wsba.js";const o=document.getElementById("search-bar"),r=document.getElementById("search-results-div"),m=document.getElementById("search-message-status-div");let s=g();n();document.addEventListener("click",function(t){t.target.id=="search-btn"?d(o.value):(t.target.classList.contains("remove-from-watchlist-span")||t.target.classList.contains("remove-from-watchlist-img"))&&f(t.target.dataset.filmid)});function d(t){let e=[];for(let a of s)a.title.includes(t)&&e.push(a);l(e)}function n(){s.length>0?l(s):(r.innerHTML="",m.innerHTML="<p>Your watchlist is looking a little empty...</p>")}function f(t){for(let e of s)if(e.id==t){const a=s.indexOf(e);s.splice(a,1),localStorage.setItem("filmArray",JSON.stringify(s)),l(s),n()}}async function l(t){let e="";for(let a of t){console.log("executed");const i=await(await fetch(`https://www.omdbapi.com/?apikey=9f3c3104&i=${a.id}`)).json();let c="";i.Poster!="N/A"&&(c=`<img src="${i.Poster}" class="film-img"></img>`),e+=`
            <div class="search-result">
                ${c}

                <div class="film-information-div">
                    <div class="film-title-and-rating-div">
                        <h1 class="film-title">${i.Title}</h1>
                        <div class="film-rating-div">
                            <p class="film-rating-star">&#11088;</p>
                            <p class="film-rating">${i.imdbRating}</p>
                        </div>
                    </div>
                    <div class="film-middle-div">
                        <p class="film-length">${i.Runtime}</p>
                        <p class="film-genres">${i.Genre}</p>
                        <span class="remove-from-watchlist-span" data-filmid=${i.imdbID}>
                            <img src="/images/remove-icon.png" class="remove-from-watchlist-img" data-filmid=${i.imdbID}>Watchlist</img>
                        </span>
                    </div>
                    <p class="film-description">${i.Plot}</p>
                </div>
            </div>`}r.innerHTML=e}function g(){return localStorage.getItem("filmArray")?JSON.parse(localStorage.getItem("filmArray")):[]}
