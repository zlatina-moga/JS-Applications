import {html} from '../../node_modules/lit-html/lit-html.js';
import {getMyListings} from '../api/data.js';

const listingsTemplate = (listings) => html`
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">

    ${listings.length > 0 ? 
        listings.map(listingTemplate) : 
        html `<p class="no-cars"> You haven't listed any cars yet.</p>`}  
            
    </div>
</section>`;

const listingTemplate = (listing) => html`
<div class="listing">
    <div class="preview">
        <img src=${listing.imageUrl}>
    </div>
    <h2>${listing.brand} ${listing.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${listing.year}</h3>
            <h3>Price: ${listing.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href=${`/details/${listing._id}`} class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;

export async function myPage(ctx){
    const listings = await getMyListings()
    ctx.render(listingsTemplate(listings))
}
  