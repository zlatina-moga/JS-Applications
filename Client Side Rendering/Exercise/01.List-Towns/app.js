import {html, render} from 'https://unpkg.com/lit-html?module';

const townTemplate = (data) => html`
<ul>
    ${data.map(t => html`<li>${t}</li>`)}
</ul>`;

document.getElementById('btnLoadTowns').addEventListener('click', (event) => {
    event.preventDefault();
    const townsAsStr = document.getElementById('towns').value;
    const container = document.getElementById('root');
    const towns = townsAsStr.split(', ').map(t => t.trim());

    const result = townTemplate(towns);
    render(result, container)
})