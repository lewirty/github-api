import { getUser } from './services/user.js';
import { getRepos } from './services/repos.js';
import { user } from './objects/user.js';
import { screen } from './objects/screen.js';

function validateEmptyInput(userName) {
    if(userName.length === 0) {
        alert('Preencha o campo com o nome do usuário do GitHub')
        return true
    }
}

document.querySelector("#btn-search").addEventListener('click', () => {
    const userName = document.querySelector('#input-search').value;
    if(validateEmptyInput(userName)) return;
    getUserData(userName);
});

document.querySelector("#input-search").addEventListener('keyup', (e) => {
    const userName = e.target.value;
    const key = e.which || e.keyCode;
    const isEnterKeyPressed = key === 13;

    if (isEnterKeyPressed) {
        if(validateEmptyInput(userName)) return;
        getUserData(userName);
    }
});

async function getUserData(userName) {
    const userResponse = await getUser(userName);
    const reposResponse = await getRepos(userName);

    if(userResponse.message === "Not Found") {
        screen.renderNotFound();
        return;
    }

    user.setInfo(userResponse);
    user.setRepos(reposResponse);

    screen.renderUser(user);
};