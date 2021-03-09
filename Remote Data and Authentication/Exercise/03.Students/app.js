const inputs = document.querySelector('.inputs')
const firstNameInput = inputs.querySelector('[name="firstName"]')
const lastNameInput = inputs.querySelector('[name="lastName"]')
const facNumInput = inputs.querySelector('[name="facultyNumber"]')
const gradeInput = inputs.querySelector('[name="grade"]')
const url = 'http://localhost:3030/jsonstore/collections/students'

document.getElementById('submit').addEventListener('click', e => {
    e.preventDefault();
    submit()
    extract()
})

async function extract(){
    const tbody = document.querySelector('tbody')
    const response = await fetch(url);
    const data = await response.json(); 

    Object.values(data).forEach(element => {
        let td = tbody.insertRow();

        let firstNameTh = document.createElement('th');
        firstNameTh.textContent = `${element.firstName}`;
        td.appendChild(firstNameTh)

        let lastNameTh = document.createElement('th');
        lastNameTh.textContent = `${element.lastName}`;
        td.appendChild(lastNameTh)

        let facNumTh = document.createElement('th');
        facNumTh.textContent = `${element.facultyNumber}`;
        td.appendChild(facNumTh)

        let gradeTh = document.createElement('th');
        gradeTh.textContent = `${element.grade}`;
        td.appendChild(gradeTh)
    })
}

async function submit(){
    const firstName  = firstNameInput.value;
    firstNameInput.value = '';

    const lastName = lastNameInput.value;
    lastNameInput.value = '';

    const facNumber = facNumInput.value;
    facNumInput.value = '';

    let grade = Number(gradeInput.value);
    gradeInput.value = '';

    if (firstName == '' || lastName == '' || facNumber == '' || grade == '' || isNaN(grade)){
        return;
    }
    
    const data = {"firstName": `${firstName}`, "lastName": `${lastName}`, "facultyNumber": `${facNumber}`, "grade": `${grade}`}
        const response = await fetch(url, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        const result = await response.json();    
}
