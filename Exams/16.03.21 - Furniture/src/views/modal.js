import {html, render} from 'https://unpkg.com/lit-html?module';

const modalTemplate = (msg, onChoice) => html`
        <div id="modal">
            <p>${msg}</p>
            <button @click=${onChoice}>OK</button>
            <button @click=${onChoice}>Cancel</button>
        </div>`;

const overlay = document.createElement('div');
overlay.id = 'overlay';

export function createModal(msg, callback){
    render(modalTemplate(msg, onChoice), overlay);
    document.body.appendChild(overlay)

    function onChoice(choice){
        clearModal()
        callback(choice)
    }

    function clearModal(){
        overlay.remove()
    }
}