const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML =
       `<img src="${user.avatarUrl}" alt="Foto de perfil do usuário">
        <div class="data">
            <h1>${user.name ?? 'Não possui nome cadastrado 🤷‍♂️'}</h1>
            <p>${user.followers} seguidores, segue ${user.following} pessoas</p>
            <p>${user.bio ?? 'Não possui biografia'}</p>
        </div>`;

        let repositoriesItems = '';
        user.repositories.forEach(function(repo) {
            let repoLanguage = repo.language

            if(repoLanguage == null) {
                repoLanguage = '?'; 
            }

            repositoriesItems += 
           `<li><a href="${repo.html_url}" target="_blank">${repo.name} <br> 
            <span class="stats">
                <p>🍴${repo.forks}</p>
                <p>⭐${repo.stargazers_count}</p>
                <p>👀${repo.watchers_count}</p>
                <p class="linguagem">👨‍🏫${repoLanguage}</p>
            </span></a></li>`
        });

        if(user.repositories.length > 0) {
            this.userProfile.innerHTML += 
            `<div class="repositories section">
                <h2>Repositórios</h2>
                <ul>${repositoriesItems}</ul>
            </div>`;
        }

        let eventsItems = '';
        user.events.forEach(function(event) { 
            let commitMessage = event.payload.commits[1].message;

            if(commitMessage > 0) {
                commitMessage = `${commitMessage}`
            } else {
                commitMessage = "Sem mensagens registradas"
            }

            eventsItems += 
            `<li><b>${event.repo.name}</b> - ${commitMessage}</li>`;
        });

        if(user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events section">
                <h2>Eventos</h2>
                <ul>${eventsItems}</ul>
            </div>`;
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>O Usuário que você tentou procurar não existe 🫤</h3>"
    }
}

export { screen }