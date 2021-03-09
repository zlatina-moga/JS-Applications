function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const phonebookUl = document.getElementById('phonebook');
    const personInput = document.getElementById('person');
    const phoneInput = document.getElementById('phone');

    document.getElementById('btnLoad').addEventListener('click', onLoad);
    document.getElementById('btnCreate').addEventListener('click', onCreate);

    async function onLoad() {
        const response = await fetch(url);
        const data = await response.json();

        Object.values(data).forEach(element => {
            const result = `${element.person}: ${element.phone}`;
            const liElement = document.createElement('li');
            liElement.textContent = result;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            liElement.appendChild(deleteBtn)

            phonebookUl.appendChild(liElement);

            const key = element._id;

            deleteBtn.addEventListener('click', e => {
                deleteData(key)
                e.target.parentNode.remove()
            })
        });

        async function deleteData(key){
            const response = await fetch(`http://localhost:3030/jsonstore/phonebook/:${key}`, {
                method: 'delete'
            })
            const result = await response.json()
        }
    }

    async function onCreate(){
        const personName = personInput.value;
        personInput.value = '';

        const phoneNumber = phoneInput.value;
        phoneInput.value = '';

        const data = {"person": `${personName}`, "phone": `${phoneNumber}`}
        const response = await fetch(url, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        const result = await response.json();    

        const newElement = `${personName}: ${phoneNumber}`;
        const liElement = document.createElement('li');
        liElement.textContent = newElement;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        liElement.appendChild(deleteBtn)

        phonebookUl.appendChild(liElement);
    }
}

attachEvents();