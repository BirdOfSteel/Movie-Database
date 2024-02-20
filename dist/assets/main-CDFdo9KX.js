import"./watchlist-DMi4wsba.js";document.getElementById("search-bar-form");const c=document.getElementById("search-bar"),r=document.getElementById("search-results-div");document.getElementById("search-message-status-div");let o="Blade Runner",n=g();document.addEventListener("click",function(t){t.target.id=="search-btn"&&c.value?(o=c.value,f(o),c.value=""):t.target.classList.contains("add-to-watchlist-element")&&m(t.target.dataset.filmid)});function m(t){const s=document.querySelector(`[data-titleid=${t}title]`),e=document.querySelector(`[data-watchlistid=${t}watchlist]`);let a=[];for(let l of n)a.push(l.id);if(console.log(a),a.includes(t))e.textContent!="Already in watchlist"&&(e.textContent="Already in watchlist",e.classList.add("orange-text"),setTimeout(function(){e.textContent="Watchlist",e.classList.remove("orange-text")},4e3));else{const l={title:`${s.textContent}`,id:`${t}`};n.push(l),localStorage.setItem("filmArray",JSON.stringify(n)),e.textContent="Added to watchlist!",e.classList.add("green-text"),setTimeout(function(){e.textContent="Watchlist",e.classList.remove("green-text")},4e3)}}async function h(t){let s=[],e="";for(let a of t)s.push(a.imdbID);console.log(t);for(let a of s){const i=await(await fetch(`https://www.omdbapi.com/?apikey=9f3c3104&i=${a}`)).json();let d="";i.Poster!="N/A"&&(d=`<img src="${i.Poster}" class="film-img"></img>`),e+=`
            <div class="search-result">
                ${d}

                <div class="film-information-div">
                    <div class="film-title-and-rating-div">
                        <h1 class="film-title" data-titleid="${i.imdbID}title">${i.Title}</h1>
                        <div class="film-rating-div">
                            <p class="film-rating-star">&#11088;</p>
                            <p class="film-rating">${i.imdbRating}</p>
                        </div>
                    </div>
                    <div class="film-middle-div">
                        <p class="film-length">${i.Runtime}</p>
                        <p class="film-genres">${i.Genre}</p>
                        <span class="add-to-watchlist-span add-to-watchlist-element" data-filmid=${i.imdbID}>
                            <img src="/images/add-icon.png" class="add-to-watchlist-img add-to-watchlist-element" data-filmid=${i.imdbID}></img>
                            <p class="add-to-watchlist-text add-to-watchlist-element" data-filmid=${i.imdbID} data-watchlistid="${i.imdbID}watchlist">Watchlist</p>
                        </span>
                    </div>
                    <p class="film-description">${i.Plot}</p>
                </div>
            </div>`}r.innerHTML=e}async function f(t){const e=await(await fetch(`https://www.omdbapi.com/?apikey=9f3c3104&type=movie&s=${t}`)).json();e.Search?(h(e.Search),c.placeholder=". . ."):(r.innerHTML="",searchMessageDiv.innerHTML='<p id="search-message-error">Unable to find what you’re looking for. Please try another search term.</p>')}function g(){return localStorage.getItem("filmArray")?JSON.parse(localStorage.getItem("filmArray")):[]}
