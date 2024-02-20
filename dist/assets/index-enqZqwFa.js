(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function s(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(t){if(t.ep)return;t.ep=!0;const i=s(t);fetch(t.href,i)}})();const g=document.getElementById("search-bar"),f=document.getElementById("search-results-div"),p=document.getElementById("search-message-status-div");let r=y();h();document.addEventListener("click",function(e){e.target.id=="search-btn"?v(g.value):(e.target.classList.contains("remove-from-watchlist-span")||e.target.classList.contains("remove-from-watchlist-img"))&&w(e.target.dataset.filmid)});function v(e){let a=[];for(let s of r)s.title.includes(e)&&a.push(s);d(a)}function h(){r.length>0?d(r):(f.innerHTML="",p.innerHTML="<p>Your watchlist is looking a little empty...</p>")}function w(e){for(let a of r)if(a.id==e){const s=r.indexOf(a);r.splice(s,1),localStorage.setItem("filmArray",JSON.stringify(r)),d(r),h()}}async function d(e){let a="";for(let s of e){console.log("executed");const t=await(await fetch(`https://www.omdbapi.com/?apikey=9f3c3104&i=${s.id}`)).json();let i="";t.Poster!="N/A"&&(i=`<img src="${t.Poster}" class="film-img"></img>`),a+=`
            <div class="search-result">
                ${i}

                <div class="film-information-div">
                    <div class="film-title-and-rating-div">
                        <h1 class="film-title">${t.Title}</h1>
                        <div class="film-rating-div">
                            <p class="film-rating-star">&#11088;</p>
                            <p class="film-rating">${t.imdbRating}</p>
                        </div>
                    </div>
                    <div class="film-middle-div">
                        <p class="film-length">${t.Runtime}</p>
                        <p class="film-genres">${t.Genre}</p>
                        <span class="remove-from-watchlist-span" data-filmid=${t.imdbID}>
                            <img src="/resources/remove-icon.png" class="remove-from-watchlist-img" data-filmid=${t.imdbID}>Watchlist</img>
                        </span>
                    </div>
                    <p class="film-description">${t.Plot}</p>
                </div>
            </div>`}f.innerHTML=a}function y(){return localStorage.getItem("filmArray")?JSON.parse(localStorage.getItem("filmArray")):[]}document.getElementById("search-bar-form");const n=document.getElementById("search-bar"),u=document.getElementById("search-results-div");document.getElementById("search-message-status-div");let m="Blade Runner",o=I();document.addEventListener("click",function(e){e.target.id=="search-btn"&&n.value?(m=n.value,L(m),n.value=""):e.target.classList.contains("add-to-watchlist-element")&&b(e.target.dataset.filmid)});function b(e){const a=document.querySelector(`[data-titleid=${e}title]`),s=document.querySelector(`[data-watchlistid=${e}watchlist]`);let l=[];for(let t of o)l.push(t.id);if(console.log(l),l.includes(e))s.textContent!="Already in watchlist"&&(s.textContent="Already in watchlist",s.classList.add("orange-text"),setTimeout(function(){s.textContent="Watchlist",s.classList.remove("orange-text")},4e3));else{const t={title:`${a.textContent}`,id:`${e}`};o.push(t),localStorage.setItem("filmArray",JSON.stringify(o)),s.textContent="Added to watchlist!",s.classList.add("green-text"),setTimeout(function(){s.textContent="Watchlist",s.classList.remove("green-text")},4e3)}}async function $(e){let a=[],s="";for(let l of e)a.push(l.imdbID);console.log(e);for(let l of a){const i=await(await fetch(`https://www.omdbapi.com/?apikey=9f3c3104&i=${l}`)).json();let c="";i.Poster!="N/A"&&(c=`<img src="${i.Poster}" class="film-img"></img>`),s+=`
            <div class="search-result">
                ${c}

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
                            <img src="/resources/add-icon.png" class="add-to-watchlist-img add-to-watchlist-element" data-filmid=${i.imdbID}></img>
                            <p class="add-to-watchlist-text add-to-watchlist-element" data-filmid=${i.imdbID} data-watchlistid="${i.imdbID}watchlist">Watchlist</p>
                        </span>
                    </div>
                    <p class="film-description">${i.Plot}</p>
                </div>
            </div>`}u.innerHTML=s}async function L(e){const s=await(await fetch(`https://www.omdbapi.com/?apikey=9f3c3104&type=movie&s=${e}`)).json();s.Search?($(s.Search),n.placeholder=". . ."):(u.innerHTML="",searchMessageDiv.innerHTML='<p id="search-message-error">Unable to find what you’re looking for. Please try another search term.</p>')}function I(){return localStorage.getItem("filmArray")?JSON.parse(localStorage.getItem("filmArray")):[]}
