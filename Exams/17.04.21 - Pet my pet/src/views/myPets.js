import {html} from '../../node_modules/lit-html/lit-html.js';
import {myPets} from '../api/data.js'

const myPageTemplate = (pets) => html`
        <section id="my-pets-page" class="my-pets">
            <h1>My Pets</h1>
            
            ${pets.length > 0 ? pets.map(petTemplate) :
            html `<p class="no-pets">No pets in database!</p>`}
            
        </section>`;

const petTemplate = (pet) => html`
<ul class="my-pets-list">
    <li class="otherPet">
        <h3>Name: ${pet.name}</h3>
        <p>Type: ${pet.type}</p>
        <p class="img"><img src=${pet.imageUrl} ></p>
        <a class="button" href=${`/details/${pet._id}`}>Details</a>
    </li>
</ul>`;

export async function myPetsPage(ctx){
    const pets = await myPets();
    ctx.render(myPageTemplate(pets))
}