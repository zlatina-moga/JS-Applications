import {render} from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

import {homePage} from './views/home.js';
import {catalogPage} from './views/catalog.js';
import {createPage} from './views/create.js';
import {detailsPage} from './views/details.js';
import {editPage} from './views/edit.js';
import {loginPage} from './views/login.js';
import {registerPage} from './views/register.js';
import { logout as logoutBtn} from './api/api.js';
import {searchPage} from './views/search.js'

const main = document.getElementById("main-content");
document.getElementById('logoutBtn').addEventListener('click', logout)
setUserNav()

page('/', decorateContext, guestUsersOnly, homePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage)
page('/catalog', decorateContext, catalogPage)
page('/create', decorateContext, createPage)
page('/details/:id', decorateContext, detailsPage)
page('/edit/:id', decorateContext, editPage)
page('/search', decorateContext, searchPage)
page.start()

function guestUsersOnly(ctx, next){
    const token = sessionStorage.getItem('authToken')
    if (token != null){
        return ctx.page.redirect('/')
    }
    next();
}

function decorateContext(ctx, next){
    ctx.render = (content) => render(content, main)
    ctx.setUserNav = setUserNav;
    setUserNav()
    next()
}

function setUserNav(){
    const email = sessionStorage.getItem('email')
    if (email != null){
        document.querySelector('#user').style.display = 'inline-block';
        document.querySelector('#guest').style.display = 'none';
    } else {
        document.querySelector('#user').style.display = 'none';
        document.querySelector('#guest').style.display = 'inline-block';
    }
}

async function logout(){
    if (sessionStorage.length != 0){
        await logoutBtn();
        setUserNav();
        page.redirect('/')
    }   
}