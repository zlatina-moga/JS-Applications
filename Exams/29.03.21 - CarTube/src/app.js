import {render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import {loginPage} from './views/login.js';
import {registerPage} from './views/register.js';
import {homePage} from './views/home.js';
import {catalogPage} from './views/catalog.js';
import {createPage} from './views/create.js';
import {detailsPage} from './views/details.js';
import {editPage} from './views/edit.js';
import {myPage} from './views/myPage.js';
import { logout } from './api/api.js';
import { searchPage } from './views/search.js';

const main = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click', logoutUser)
setUpNav()

page('/', decorateContext, homePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/catalog', decorateContext, catalogPage);
page('/create', decorateContext, createPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
page('/my-page', decorateContext, myPage);
page('/search', decorateContext, searchPage)
page()

function decorateContext(ctx, next){
    ctx.render = (content) => render(content, main)
    ctx.setUpNav = setUpNav;
    next()
}

function setUpNav(){
    const userId = sessionStorage.getItem('userId');
    if (userId != null) {
        document.getElementById('guest').style.display = 'none';
        document.getElementById('profile').style.display = 'inline-block'
    } else {
        document.getElementById('guest').style.display = 'inline-block';
        document.getElementById('profile').style.display = 'none'
    }
}

async function logoutUser(){
    await logout()
    setUpNav()
    page.redirect('/')
}

