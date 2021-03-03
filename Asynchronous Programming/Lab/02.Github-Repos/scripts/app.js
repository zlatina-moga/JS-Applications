function loadRepos() {
	const username = document.getElementById('username').value;
	const url = `https://api.github.com/users/${username}/repos`

	fetch(url)
	    .then(response => response.json())
		.then(data => 
			{
				const ulElement = document.getElementById('repos');
				ulElement.innerHTML = ''
				data.forEach(repo => {
					const liElement = document.createElement('li');
					liElement.textContent = repo.full_name;
					ulElement.appendChild(liElement)
				});
			});
}