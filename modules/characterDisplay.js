// changing the ability label for each type of character
function getAbilityLabel(character) {
    if (character.abilityType === "Nen") {
        return "Nen Ability";
    }

    if (character.abilityType === "Stand") {
        return "Stand";
    }

    if (character.abilityType === "Hamon") {
        return "Hamon";
    }

    if (character.abilityType === "Vampirism") {
        return "Vampiric Ability";
    }

    return "Ability";
}

// making one reusable card for main results and saved characters
// this keeps all of the approved information in the same order
function createCharacterCard(character, cardClass) {
    const characterCard = document.createElement("article");
    characterCard.classList.add(cardClass);
    characterCard.dataset.localId = character.localId;

    const portraitArea = document.createElement("div");
    portraitArea.classList.add("portrait-area");

    const imageFallback = document.createElement("div");
    imageFallback.classList.add("image-fallback");
    imageFallback.textContent = "Portrait unavailable";

    if (character.image) {
        const characterImage = document.createElement("img");
        characterImage.src = character.image;
        characterImage.alt = character.imageAlt
            || `Portrait of ${character.name}`;

        characterImage.addEventListener("error", function () {
            characterImage.remove();
            imageFallback.classList.add("show-fallback");
        });

        portraitArea.appendChild(characterImage);
    } else {
        imageFallback.classList.add("show-fallback");
    }

    portraitArea.appendChild(imageFallback);
    characterCard.appendChild(portraitArea);

    const characterName = document.createElement("h3");
    characterName.textContent = character.name;
    characterCard.appendChild(characterName);

    const characterSeries = document.createElement("p");
    characterSeries.textContent = `Series: ${character.series}`;
    characterCard.appendChild(characterSeries);

    if (character.partOrArc) {
        const characterPart = document.createElement("p");
        characterPart.classList.add("character-part");
        characterPart.textContent = character.partOrArc;
        characterCard.appendChild(characterPart);
    }

    const characterRole = document.createElement("p");
    characterRole.textContent = `Role: ${character.role}`;
    characterCard.appendChild(characterRole);

    if (character.nenType) {
        const nenType = document.createElement("p");
        nenType.classList.add("nen-type");
        nenType.textContent = `Nen Type: ${character.nenType}`;
        characterCard.appendChild(nenType);
    }

    const characterAbility = document.createElement("p");
    characterAbility.classList.add("ability-name");
    characterAbility.textContent = `${getAbilityLabel(character)}: ${character.abilityName}`;
    characterCard.appendChild(characterAbility);

    const abilityDescription = document.createElement("p");
    abilityDescription.classList.add("ability-description");
    abilityDescription.textContent = character.abilityDescription;
    characterCard.appendChild(abilityDescription);

    if (character.abilityImage) {
        const abilityImage = document.createElement("img");
        abilityImage.classList.add("ability-image");
        abilityImage.src = character.abilityImage;
        abilityImage.alt = `${character.name} using ${character.abilityName}`;
        characterCard.appendChild(abilityImage);
    }

    return characterCard;
}

// showing only the approved characters inside the results section
export function displayCharacters(characters, saveCharacter) {
    const characterList = document.getElementById("character-list");
    characterList.innerHTML = "";

    if (characters.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.classList.add("empty-message");
        emptyMessage.textContent = "No characters were found.";

        characterList.appendChild(emptyMessage);
        return;
    }

    for (let i = 0; i < characters.length; i++) {
        const character = characters[i];
        const characterCard = createCharacterCard(character, "character-card");
        const addButton = document.createElement("button");
        addButton.type = "button";
        addButton.textContent = "Add to Roster";

        // building the final object that gets sent to mockapi
        const savedCharacter = {
            localId: character.localId,
            apiCharacterId: character.apiCharacterId,
            name: character.name,
            series: character.series,
            partOrArc: character.partOrArc || "",
            image: character.image,
            abilityImage: character.abilityImage || "",
            role: character.role,
            abilityType: character.abilityType,
            nenType: character.nenType || "",
            abilityName: character.abilityName,
            abilityDescription: character.abilityDescription,
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

        characterCard.appendChild(addButton);
        characterList.appendChild(characterCard);
    }
}

// showing the characters that were saved in mockapi
// this also shows a message when the roster is empty
export function displayRoster(roster, editCharacterNote) {
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
        const rosterCard = createCharacterCard(roster[i], "roster-card");

        const characterNote = document.createElement("p");
        characterNote.classList.add("character-note");
        characterNote.textContent = roster[i].note
            ? `Personal Note: ${roster[i].note}`
            : "Personal Note: No note added yet.";

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.textContent = "Edit Note";

        // showing a small input under the character information
        // the save button sends the new note back to the main file
        editButton.addEventListener("click", function () {
            editButton.disabled = true;

            const noteInput = document.createElement("input");
            noteInput.type = "text";
            noteInput.classList.add("note-input");
            noteInput.value = roster[i].note;
            noteInput.placeholder = "Write a short note";

            const saveButton = document.createElement("button");
            saveButton.type = "button";
            saveButton.textContent = "Save Note";

            saveButton.addEventListener("click", async function () {
                saveButton.disabled = true;

                try {
                    await editCharacterNote(roster[i].id, noteInput.value.trim());
                } finally {
                    saveButton.disabled = false;
                    editButton.disabled = false;
                }
            });

            rosterCard.appendChild(noteInput);
            rosterCard.appendChild(saveButton);
            noteInput.focus();
        });

        rosterCard.appendChild(characterNote);
        rosterCard.appendChild(editButton);

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
