import page from '../node_modules/page/page.mjs';
import {createPage} from './views/create.js';
import { dashboardPage } from './views/dashboard.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { loginPage } from './views/login.js'
import { myPage } from './views/myFurniture.js'
import { registerPage } from './views/register.js';

import * as api from './api/data.js';
window.api = api;

page('/', dashboardPage);
page('/dashboard', dashboardPage);
page('details/:id', detailsPage);
page('/create', createPage);
page('/edit/:id', editPage);
page('/register', registerPage);
page('/login', loginPage);
page('/my-furniture', myPage);
page.start()