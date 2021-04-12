import {html, render} from 'https://unpkg.com/lit-html?module';

const notificationTemplate = (message) => html `
        <section id="notification" @click=${clear}>
           ${message}
           <span style="margin-left: 32px">\u2716</span>
        </section>
    `;
const container = document.getElementById('notification-holder')
export function notify(message){
    render(notificationTemplate(message), container)
}

export function clear(){
    render('', container)
}