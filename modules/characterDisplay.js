// changing the ability label for each type of character
// the same card function can show nen, stands, hamon, or vampire powers
// this keeps me from making a separate card for every series
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
    // article is used for both the search results and saved roster cards
    // cardClass gives each section the css style it needs
    const characterCard = document.createElement("article");
    characterCard.classList.add(cardClass);
    characterCard.dataset.localId = character.localId;

    // making a separate portrait area for the image or fallback message
    const portraitArea = document.createElement("div");
    portraitArea.classList.add("portrait-area");

    const imageFallback = document.createElement("div");
    imageFallback.classList.add("image-fallback");
    imageFallback.textContent = "Portrait unavailable";

    if (character.image) {
        // using the approved alt text when it exists
        // otherwise the character name still gives the image a description
        const characterImage = document.createElement("img");
        characterImage.src = character.image;
        characterImage.alt = character.imageAlt
            || `Portrait of ${character.name}`;

        characterImage.addEventListener("error", function () {
            // removing a broken image and showing a message in its place
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
        // jojo uses a part and hunter x hunter uses an arc when needed
        const characterPart = document.createElement("p");
        characterPart.classList.add("character-part");
        characterPart.textContent = character.partOrArc;
        characterCard.appendChild(characterPart);
    }

    const characterRole = document.createElement("p");
    characterRole.textContent = `Role: ${character.role}`;
    characterCard.appendChild(characterRole);

    if (character.nenType) {
        // nen type only gets added to hunter x hunter characters
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

    if (character.abilityImage && cardClass === "character-card") {
        // ability images only go on the main results because those cards flip
        // saved roster cards stay simple and show the written information
        const abilityImage = document.createElement("img");
        abilityImage.classList.add("ability-image");
        abilityImage.src = character.abilityImage;
        abilityImage.alt = `${character.name} using ${character.abilityName}`;
        characterCard.appendChild(abilityImage);
    }

    return characterCard;
}

// making the ability cards flip to show their powers
// the front keeps the normal character information
// the back shows the character using their ability
function addAbilityFlip(characterCard, character) {
    if (!character.abilityImage) {
        // characters without a stand or nen image keep the normal card
        return;
    }

    // grabbing the image before the rest of the card gets moved around
    const abilityImage = characterCard.querySelector(".ability-image");

    if (abilityImage) {
        abilityImage.remove();
    }

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");

    // moving the normal character information onto the front side
    while (characterCard.firstChild) {
        cardFront.appendChild(characterCard.firstChild);
    }

    const flipMessage = document.createElement("p");
    flipMessage.classList.add("flip-message");
    flipMessage.textContent = "flip to see ability";
    cardFront.appendChild(flipMessage);

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");

    // placing the ability image and explanation on the back side
    if (abilityImage) {
        cardBack.appendChild(abilityImage);
    }

    const abilityName = document.createElement("h3");
    abilityName.textContent = character.abilityName;

    const abilityDescription = document.createElement("p");
    abilityDescription.textContent = character.abilityDescription;

    const returnMessage = document.createElement("p");
    returnMessage.classList.add("return-message");
    returnMessage.textContent = "click to return";

    cardBack.appendChild(abilityName);
    cardBack.appendChild(abilityDescription);
    cardBack.appendChild(returnMessage);

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);

    // card-inner rotates while the outside card stays in the grid
    characterCard.classList.add("flip-card");
    characterCard.appendChild(cardInner);

    characterCard.addEventListener("click", function (event) {
        // clicking the roster button should not also flip the whole card
        if (event.target.tagName === "BUTTON") {
            return;
        }

        characterCard.classList.toggle("is-flipped");
    });
}

// showing only the approved characters inside the results section
export function displayCharacters(characters, saveCharacter) {
    const characterList = document.getElementById("character-list");

    // clearing the old series before building the new character cards
    characterList.innerHTML = "";

    if (characters.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.classList.add("empty-message");
        emptyMessage.textContent = "No characters were found.";

        characterList.appendChild(emptyMessage);
        return;
    }

    // creating one card and one save button for every approved character
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
            // disabling this button keeps the same card from posting twice
            addButton.disabled = true;

            try {
                await saveCharacter(savedCharacter);
            } finally {
                addButton.disabled = false;
            }
        });

        characterCard.appendChild(addButton);
        addAbilityFlip(characterCard, character);
        characterList.appendChild(characterCard);
    }
}

// showing the characters that were saved in mockapi
// this also shows a message when the roster is empty
export function displayRoster(roster, editCharacterNote) {
    const rosterList = document.getElementById("roster-list");

    // rebuilding the roster keeps added characters and notes up to date
    rosterList.innerHTML = "";

    if (roster.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.classList.add("empty-message");
        emptyMessage.textContent = "Your saved roster is empty.";

        rosterList.appendChild(emptyMessage);
        return;
    }

    // making one saved card for every approved mockapi record
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
            // keeping the edit button off while its note input is open
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
                // waiting for the update before letting another save happen
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
