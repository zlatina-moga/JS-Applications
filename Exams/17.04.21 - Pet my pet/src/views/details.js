import {html} from '../../node_modules/lit-html/lit-html.js';
import {getPetById, deletePet, likePet, getLikesByPetId} from '../api/data.js'

const detailsTemplate = (pet, isCreator, userId, onDelete, likeThisPet, likes) => html`
        <section id="details-page" class="details">
            <div class="pet-information">
                <h3>Name: ${pet.name}</h3>
                <p class="type">Type: ${pet.type}</p>
                <p class="img"><img src=${pet.imageUrl} ></p>
                <div class="actions">

                ${isCreator ? html`
                    <a class="button" href=${`/edit/${pet._id}`}>Edit</a>
                    <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>` 
                    : ''}

                ${(userId && !isCreator) ? html `
                <a @click=${likeThisPet} class="button" href="javascript:void(0)">Like</a>
                    <div class="likes">
						<img class="hearts" src="/images/heart.png">
						<span id="total-likes">Likes: ${likes}</span>
					</div>`
                 : html `<div class="likes">
						<img class="hearts" src="/images/heart.png">
						<span id="total-likes">Likes: ${likes}</span>
					</div>`}
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
    const id = pet._id
    const likes = await getLikesByPetId(id)
    const userId = sessionStorage.getItem('userId')
    const isCreator = userId === pet._ownerId;
    ctx.render(detailsTemplate(pet, isCreator, userId, onDelete, likeThisPet, likes))

    async function onDelete(){
        const confirmed = confirm('Are you sure you want to delete this pet?')
        if (confirmed){
            await deletePet(pet._id)
            ctx.page.redirect('/')
        }
    }

    async function likeThisPet(event){
        event.target.remove();
        await likePet(id)
        likes = await getLikesByPetId(id);
        const likesSpan = document.getElementById('total-likes')
        likesSpan.textContent = likes + 'like' + (likes == 1 ? '' : 's')
    }
}
