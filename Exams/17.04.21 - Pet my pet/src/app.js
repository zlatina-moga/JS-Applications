import {render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import {homePage} from './views/home.js';
import {loginPage} from './views/login.js';
import {registerPage} from './views/register.js';
import {createPage} from './views/create.js';
import {detailsPage} from './views/details.js';
import {editPage} from './views/edit.js';
import {myPetsPage} from './views/myPets.js'
import { logout } from './api/api.js';

const main = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click', logoutUser)

page('/',decorateContext, homePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/create', decorateContext, createPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
page('/my-pets', decorateContext, myPetsPage);
setUserNav()
page()

function decorateContext(ctx, next){
    ctx.render = (content) => render(content, main)
    ctx.setUserNav = setUserNav();
    next()
}

function setUserNav(){
    const email = sessionStorage.getItem('email');
    if (email != null){
        document.getElementById('welcome-msg').innerHTML = `Welcome, ${email}`
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}

async function logoutUser(){
    await logout()
    setUserNav();
    page.redirect('/')
}