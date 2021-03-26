import {html, render} from 'https://unpkg.com/lit-html?module';
import {towns} from './towns.js'


const searchTemplate = (towns, match) => html`
<article>
   <div id="towns">
      <ul>
         ${towns.map(t => itemTemplate(t, match))}
      </ul>
   </div>
   <input type="text" id="searchText" />
  <button @click=${search}>Search</button>
  <div id="result"></div>
</article>`;

const itemTemplate = (name, match) => html `
<li class=${(match && name.toLowerCase().includes(match.toLowerCase())) ? 'active' : ''}>${name}</li>`

const main = document.body;
update()

function update(match = ''){
   const result = searchTemplate(towns, match);
   render(result, main)
}

function search(event) {
   const match = event.target.parentNode.querySelector('input').value;
   update(match)
}