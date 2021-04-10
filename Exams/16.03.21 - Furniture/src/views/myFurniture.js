import {html} from 'https://unpkg.com/lit-html?module';
import {getMyFurniture} from '../api/data.js';
import {itemTemplate} from './common/item.js'

const myTemplate = (data) => html `
<div class="row space-top">
    <div class="col-md-12">
        <h1>My Furniture</h1>
        <p>This is a list of your publications.</p>
    </div>
</div>
<div class="row space-top">
    ${data.map(itemTemplate)}
</div>`;

export async function myPage(ctx){
    const data = await getMyFurniture();
    ctx.render(myTemplate(data))
}