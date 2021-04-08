import {setUpHome, showHome} from './home.js';
import {setUpDetails} from './details.js';
import {setUpLogIn, showLogIn} from './login.js';
import {setUpRegister, showRegister} from './register.js';
import {setUpCreate, showCreate} from './create.js';
import {setUpEdit} from './edit.js';

const main = document.querySelector('main');

const links = {
    "homeLink": showHome,
    "loginLink": showLogIn,
    "registerLink": showRegister,
    "createLink": showCreate
}

setUpSection('home-page', setUpHome);
setUpSection('add-movie', setUpCreate);
setUpSection('movie-details', setUpDetails);
setUpSection('edit-movie', setUpEdit);
setUpSection('form-login', setUpLogIn);
setUpSection('form-sign-up', setUpRegister);

setUpNavigation()
//start application in home view
showHome()

function setUpSection(sectionId, setup){
    const section = document.getElementById(sectionId)
    setup(main, section)
}

function setUpNavigation(){
    const email = sessionStorage.getItem('email');
    if (email != null){
        document.getElementById("welcome-msg").textContent = `Welcome, ${email}`;

        [...document.querySelectorAll('nav .user')].forEach(l => l.style.display = 'block');
        [...document.querySelectorAll('nav .guest')].forEach(l => l.style.display = 'none');
    } else {
        [...document.querySelectorAll('nav .user')].forEach(l => l.style.display = 'none');
        [...document.querySelectorAll('nav .guest')].forEach(l => l.style.display = 'block');
    }
    

    document.querySelector('nav').addEventListener('click', (event) => {
        const view = links[event.target.id];
        if (typeof view == 'function') {
            event.preventDefault();
            view()
        }
    })

    document.getElementById("createLink").addEventListener('click', (event) => {
        event.preventDefault()
        showCreate()
    })

    document.getElementById('logoutBtn').addEventListener('click', logout)
}


async function logout(){
    const token = sessionStorage.getItem('authToken');
    const response = await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: {'X-Authorization': token}
    })

    if (response.ok){
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('email');

        [...document.querySelectorAll('nav .user')].forEach(l => l.style.display = 'none');
        [...document.querySelectorAll('nav .guest')].forEach(l => l.style.display = 'block');
        showHome()
    } else {
        const error = await response.json()
        alert(error.message)
    }
}
