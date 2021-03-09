function attachEvents() {
    const authorInput = document.querySelector('[name="author"]');
    const messageInput = document.querySelector('[name="content"]');

    const url = 'http://localhost:3030/jsonstore/messenger'; 
    const submitBtn = document.getElementById('submit');
    const refreshBtn = document.getElementById('refresh');
    const textArea = document.getElementById('messages');
    let result = ''

    submitBtn.addEventListener('click', onSubmit);
    refreshBtn.addEventListener('click', onRefresh)

    async function onSubmit(){
        const authorName = authorInput.value;
        authorInput.value = '';

        const message = messageInput.value;
        messageInput.value = '';

        const data = {author: `${authorName}`, content: `${message}`}
        const response = await fetch(url, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        const result = await response.json();
    }

    async function onRefresh(){
        const response = await fetch(url);
        const data = await response.json();

        const messages = Object.values(data).forEach(element => {
            result += `${element.author}: ${element.content}\n`;
        });

        textArea.disabled = false;
        textArea.innerHTML = result
    }
}

attachEvents();                                