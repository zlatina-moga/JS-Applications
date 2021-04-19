import {html} from '../../node_modules/lit-html/lit-html.js';
import {getPetById, deletePet, likePet} from '../api/data.js'

const detailsTemplate = (pet, isCreator, onDelete, likeThisPet) => html`
        <section id="details-page" class="details">
            <div class="pet-information">
                <h3>Name: ${pet.name}</h3>
                <p class="type">Type: ${pet.type}</p>
                <p class="img"><img src=${pet.imageUrl} ></p>
                <div class="actions">

                ${isCreator ? html`
                    <a class="button" href=${`/edit/${pet._id}`}>Edit</a>
                    <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>` 
                    : html `<a @click=${likeThisPet} id="likesSpan" class="button" href="#">Like</a>`}
                    
                </div>
            </div>
            <div class="pet-description">
                <h3>Description:</h3>
                <p>${pet.description}</p>
            </div>
        </section>`;

export async function detailsPage(ctx){
    const petId = ctx.params.id;
    const pet = await getPetById(petId);
    const userId = sessionStorage.getItem('userId')
    const isCreator = userId === pet._ownerId;
    ctx.render(detailsTemplate(pet, isCreator, onDelete, likeThisPet))

    async function onDelete(){
        const confirmed = confirm('Are you sure you want to delete this pet?')
        if (confirmed){
            await deletePet(pet._id)
            ctx.page.redirect('/')
        }
    }

    async function likeThisPet(event){
        const likesSpan = document.getElementById('likesSpan')
        event.target.remove();
        const id = pet._id
        const likes = await likePet(id)
        likes++;
        likesSpan.textContent = likes + 'like' + (likes == 1 ? '' : 's')
    }
}