function lockedProfile() {
    getUsers()
}
async function getUsers(){
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';
    const response = await fetch(url);
    const data = await response.json()
    const main = document.getElementById('main')
    
    Object.values(data).map(createCard).forEach(element => {
        main.appendChild(element)
    });
}

function createCard({_id, username, email, age}){
    function e(type, classN, content){
        const result = document.createElement(type);
        if (classN){
            result.className = classN
        }
        if (content){
            result.textContent = content
        }
        return result;
    }

    const divProfile = e('div', 'profile');

    const img = e('img')
    img.src = './iconProfile2.png';
    img.className = 'userIcon';

    const lockLabel = e('label', null, 'Lock');

    const inputLock = e('input');
    inputLock.setAttribute('type', 'radio');
    inputLock.setAttribute('name', _id)
    inputLock.setAttribute('value', 'lock')
    inputLock.setAttribute('checked', 'true') 

    const unlockLabel = e('label', null, 'Unlock');

    const inputUnlock = e('input');
    inputLock.setAttribute('type', 'radio');
    inputLock.setAttribute('name', _id)
    inputLock.setAttribute('value', 'unlock')

    const br = e('br')
    const hr = e('hr')

    const usernameLabel = e('label', null, 'Username');

    const inputUsername = e('input');
    inputUsername.setAttribute('type', 'text');
    inputUsername.setAttribute('name', 'user1Username')
    inputUsername.setAttribute('value', username);
    inputUsername.setAttribute('disabled', 'true')
    inputUsername.setAttribute('readonly', 'true')

    const divHidden = e('div')
    divHidden.setAttribute('id', 'user1HiddenFields');

    const hr1 = e('hr')

    const emailLabel = ('label', null, 'Email:')

    const emailInput = e('input');
    emailInput.setAttribute('type', 'email')
    emailInput.setAttribute('name', 'user1Email')
    emailInput.setAttribute('value', email)
    emailInput.setAttribute('disabled', 'true')
    emailInput.setAttribute('readonly', 'true')

    const ageLabel = e('label', null, 'Age:')

    const ageInput = e('input')
    ageInput.setAttribute('type', 'email')
    ageInput.setAttribute('name', 'user1Age')
    ageInput.setAttribute('value', age)
    ageInput.setAttribute('disabled', 'true')
    ageInput.setAttribute('readonly', 'true')

    const showBtn = e('button', null, 'Show more')
    showBtn.addEventListener('click', () => {
        if(inputLock.checked){
            return
        }

        divHidden.style.display = showBtn.textContent == 'Hide it' ? 'none' : 'block';
        showBtn.textContent = showBtn.textContent == 'Show more' ? 'Hiode it' : 'Show more';
    })

    build(divProfile, img, lockLabel, inputLock, unlockLabel, inputUnlock, br, hr, usernameLabel, inputUsername)
    build(divHidden, hr1, emailLabel, emailInput, ageLabel, ageInput)

    return build(divProfile, divHidden, showBtn)
}

function build(main, ...rest){
    while (rest.length){
        main.append(rest.shift())
    }
    return main
}