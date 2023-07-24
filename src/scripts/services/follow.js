import { baseUrl } from "../variables.js";

async function getUserFollowers(userName) {
    const response = await fetch(`${baseUrl}/${userName}/followers`);
    return await response.json();
};

async function getUserFollowing(userName) {
    const response = await fetch(`${baseUrl}/${userName}/following{/other_user}`);
    return await response.json();
}

export { getUserFollowers, getUserFollowing }