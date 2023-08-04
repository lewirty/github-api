import { getUser } from './services/user.js';
import { getRepos } from './services/repos.js';
import { getEvents } from './services/events.js';
import { user } from './objects/user.js';
import { screen } from './objects/screen.js';

// Validação de Formulário
function validateEmptyInput(userName) {
    if(userName.length === 0) {
        alert('Preencha o campo com o nome do usuário do GitHub');
        return true;
    }
}

// Buscar com button
document.querySelector("#btn-search").addEventListener('click', () => {
    const userName = document.querySelector('#input-search').value;
    if(validateEmptyInput(userName)) return;
    getUserData(userName);
});

// Buscar com Enter
document.querySelector("#input-search").addEventListener('keyup', (e) => {
    const userName = e.target.value;
    const key = e.which || e.keyCode;
    const isEnterKeyPressed = key === 13;

    if (isEnterKeyPressed) {
        if(validateEmptyInput(userName)) return;
        getUserData(userName);
    }
});

// Pegar dados do usuário
async function getUserData(userName) {
    const userResponse = await getUser(userName);
    const reposResponse = await getRepos(userName);
    const eventsResponse = await getEvents(userName);

    // Exibir NotFound
    if(userResponse.message === "Not Found") {
        screen.renderNotFound();
        return;
    };

    user.setInfo(userResponse);
    user.setRepos(reposResponse);
    user.setEvents(eventsResponse);

    screen.renderUser(user);
};