import {html} from '../../node_modules/lit-html/lit-html.js';
import {getAllPets} from '../api/data.js'

const homeTemplate = (pets) => html`
        <section id="dashboard-page" class="dashboard">
            <h1>Dashboard</h1>

            ${pets.length > 0 ? pets.map(petTemplate)
            : html ` <p class="no-pets">No pets in database!</p>`}
           
        </section>`;

const petTemplate = (pet) => html `
<ul class="other-pets-list">
  <li class="otherPet">
    <h3>Name: ${pet.name}</h3>
    <p>Type: ${pet.type}</p>
    <p class="img"><img src=${pet.imageUrl} ></p>
    <a class="button" href=${`/details/${pet._id}`}>Details</a>
  </li>
</ul>`;

export async function homePage(ctx){
    const pets = await getAllPets()
    ctx.render(homeTemplate(pets))
}