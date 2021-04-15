import {html} from '../../node_modules/lit-html/lit-html.js';
import {searchListing} from '../api/data.js';

const searchTemplate = (onSearch, results = []) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

     <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">

       ${results.length ? results.map(resultsTemplate) 
          : html`<p class="no-cars"> No results.</p>`}
 
    </div>
</section>`;

const resultsTemplate = (result) => html`
<div class="listing">
    <div class="preview">
        <img src=${result.imageUrl}>
    </div>
    <h2>${result.brand} ${result.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${result.year}</h3>
            <h3>Price: ${result.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href=${'/details/${result._id}'} class="button-carDetails">Details</a>
        </div>
    </div>
</div>`    

export async function searchPage(ctx){
    if (ctx.querystring){
        const results = await searchListing(ctx.querystring.split('=').pop())
        return ctx.render(searchTemplate(onSearch, results))
    }
    ctx.render(searchTemplate(onSearch))

    function onSearch(){
        const input = document.getElementById('search-input');
        const query = Number(input.value.trim())

        if (isNaN(query) || query < 1){
            return alert('Please use valid year!')
        }
        input.value = '';
        ctx.page.redirect('/search?query=' + query)
    }

}