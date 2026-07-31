// showing the characters inside the character section
// this makes one card for each character we want to show
// only the first 12 are used so the page does not get too crowded
export function displayCharacters(characters, series) {
    const characterList = document.getElementById("character-list");

    characterList.innerHTML = "";

    if (characters.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.classList.add("empty-message");
        emptyMessage.textContent = "No characters were found.";

        characterList.appendChild(emptyMessage);
        return;
    }

    for (let i = 0; i < characters.length && i < 12; i++) {
        const characterInfo = characters[i].character;

        const characterCard = document.createElement("article");
        characterCard.classList.add("character-card");

        const characterImage = document.createElement("img");
        characterImage.src = characterInfo.images.jpg.image_url;
        characterImage.alt = characterInfo.name;

        const characterName = document.createElement("h3");
        characterName.textContent = characterInfo.name;

        const characterRole = document.createElement("p");
        characterRole.textContent = `Role: ${characters[i].role}`;

        const characterSeries = document.createElement("p");
        characterSeries.textContent = `Series: ${series}`;

        characterCard.appendChild(characterImage);
        characterCard.appendChild(characterName);
        characterCard.appendChild(characterRole);
        characterCard.appendChild(characterSeries);

        characterList.appendChild(characterCard);
    }
}

// clearing old cards before another request starts
// this also keeps old results off the page if a request fails
export function clearCharacters() {
    const characterList = document.getElementById("character-list");
    characterList.innerHTML = "";
}

// showing a message while the request is running
// the error class gets removed in case the last request failed
export function showLoading(message) {
    const pageMessage = document.getElementById("page-message");
    pageMessage.classList.remove("error-message");
    pageMessage.textContent = message;
}

// showing an error on the page instead of only using the console
export function showError(message) {
    const pageMessage = document.getElementById("page-message");
    pageMessage.classList.add("error-message");
    pageMessage.textContent = message;
}

// removing the message after everything works
export function clearMessage() {
    const pageMessage = document.getElementById("page-message");
    pageMessage.classList.remove("error-message");
    pageMessage.textContent = "";
}
