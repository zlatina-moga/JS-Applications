import { render } from 'https://unpkg.com/lit-html?module';
import {contacts} from './contacts.js';
import cardTemplate from './card.js'


const container = document.getElementById('contacts');
const result = contacts.map(cardTemplate);
render(result, container)

