import {html} from '../../node_modules/lit-html/lit-html.js';
import {searchArticle} from '../api/data.js';

const searchTemplate = (articles) => html`
<section id="search-page" class="content">
    <h1>Search</h1>
    <form id="search-form">
        <p class="field search">
            <input id="searchField" type="text" placeholder="Search by article title" name="search">
        </p>
        <p class="field submit">
            <input id="searchBtn" class="btn submit" type="submit" value="Search">
        </p>
    </form>
    <div class="search-container">
    ${((articles||[]).length!==0)
        ?html`${articles.map(itemTemplate)}`
        :html`<h3 class="no-articles">No matching articles</h3>`
        }
    </div>
</section>`;

const itemTemplate = (article) => html`
 <a class="article-preview" href="/details/${article._id}">
        <article>
            <h3>Topic: <span>${article.title}</span></h3>
            <p>Category: <span>${article.category}</span></p>
        </article>
    </a>   
`;

export async function searchPage(ctx) {
    ctx.render(searchTemplate())

    const searchBtn = document.getElementById('searchBtn')
    const searchField = document.getElementById('searchField');
    searchBtn.addEventListener('click', search)

    async function search(event) {
        event.preventDefault();
        const query = searchField.value;
        const data = await searchArticle(query)
        ctx.render(searchTemplate(data));
    }
}
