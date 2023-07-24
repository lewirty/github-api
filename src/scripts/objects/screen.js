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

        let repositoriesItems = ''
        user.repositories.forEach(repo => repositoriesItems += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`);

        if(user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                <h2>Repositórios</h2>
                <ul>${repositoriesItems}</ul>
            </div>`;
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>O Usuário que você tentou procurar não existe 🫤</h3>"
    }
}

export { screen }