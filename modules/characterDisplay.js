// showing the characters inside the character section
// this makes one card for each character we want to show
// only the first 12 are used so the page does not get too crowded
export function displayCharacters(characters, series, saveCharacter) {
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

        const addButton = document.createElement("button");
        addButton.type = "button";
        addButton.textContent = "Add to Roster";

        // putting the character information into a simple object
        // this is the object that gets sent to mockapi
        const savedCharacter = {
            characterId: characterInfo.mal_id,
            name: characterInfo.name,
            series: series,
            image: characterInfo.images.jpg.image_url,
            note: "",
        };

        addButton.addEventListener("click", async function () {
            addButton.disabled = true;

            try {
                await saveCharacter(savedCharacter);
            } finally {
                addButton.disabled = false;
            }
        });

        characterCard.appendChild(characterImage);
        characterCard.appendChild(characterName);
        characterCard.appendChild(characterRole);
        characterCard.appendChild(characterSeries);
        characterCard.appendChild(addButton);

        characterList.appendChild(characterCard);
    }
}

// showing the characters that were saved in mockapi
// this also shows a message when the roster is empty
export function displayRoster(roster) {
    const rosterList = document.getElementById("roster-list");
    rosterList.innerHTML = "";

    if (roster.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.classList.add("empty-message");
        emptyMessage.textContent = "Your saved roster is empty.";

        rosterList.appendChild(emptyMessage);
        return;
    }

    for (let i = 0; i < roster.length; i++) {
        const rosterCard = document.createElement("article");
        rosterCard.classList.add("roster-card");

        const characterImage = document.createElement("img");
        characterImage.src = roster[i].image;
        characterImage.alt = roster[i].name;

        const characterName = document.createElement("h3");
        characterName.textContent = roster[i].name;

        const characterSeries = document.createElement("p");
        characterSeries.textContent = `Series: ${roster[i].series}`;

        const characterNote = document.createElement("p");
        characterNote.textContent = roster[i].note || "No note added yet.";

        rosterCard.appendChild(characterImage);
        rosterCard.appendChild(characterName);
        rosterCard.appendChild(characterSeries);
        rosterCard.appendChild(characterNote);

        rosterList.appendChild(rosterCard);
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
