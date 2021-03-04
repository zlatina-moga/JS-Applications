const usernameInput = document.getElementById('username');
const repoInput = document.getElementById('repo');
const commitsUL = document.getElementById('commits')

function loadCommits() {
    commitsUL.innerHTML = '';

    const username = usernameInput.value;
    const repo = repoInput.value;

    const url = `https://api.github.com/repos/${username}/${repo}/commits`;


    fetch(url)
        .then(response => {
            if (!response.ok){
                throw response
            }

            return response.json()
        }).then(data => {
            [...data].forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `${item.commit.author.name}: ${item.commit.message}`;
                commitsUL.appendChild(li)
            })
        }).catch(error => {
            const li = document.createElement('li');
            li.innerHTML = `$Error: ${error.status} (${error.statusText})`;
            commitsUL.appendChild(li)
        })
}