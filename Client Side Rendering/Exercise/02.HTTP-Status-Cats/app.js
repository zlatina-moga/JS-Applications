import {html, render} from 'https://unpkg.com/lit-html?module';
import {cats} from './catSeeder.js';

const catTemplate = (data) => html `
<li>
    <img src="./images/${data.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn">Show status code</button>
            <div class="status" style="display: none" id=${data.id}>
                <h4>Status Code: ${data.statusCode}</h4>
                <p>${data.statusMessage}</p>
            </div>
     </div>
</li>`

const container = document.getElementById('allCats');

const result = html`
<ul @click=${toggleInfo}>
    ${cats.map(catTemplate)}
</ul>`

render(result, container);

function toggleInfo(event){
    const element = event.target.parentNode.querySelector('.status');
    if (element.style.display == 'none'){
        element.removeAttribute('style')
    } else {
        element.style.display == 'none';
    }
}
