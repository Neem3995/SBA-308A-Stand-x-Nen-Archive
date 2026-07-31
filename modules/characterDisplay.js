// showing the characters inside the character section
// this makes one card for each character we want to show
// only the first 12 are used so the page does not get too crowded
export function displayCharacters(characters, series) {
    const characterList = document.getElementById("character-list");

    characterList.innerHTML = "";

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
