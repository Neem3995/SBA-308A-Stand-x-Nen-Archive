import {
    getJojoCharacters,
    getHunterCharacters,
} from "./modules/animeApi.js";
import {
    displayCharacters,
    displayRoster,
    clearCharacters,
    showLoading,
    showError,
    clearMessage,
} from "./modules/characterDisplay.js";
import {
    getRoster,
    addCharacter,
    updateCharacterNote,
} from "./modules/rosterApi.js";
import { allCharacters } from "./modules/data/characterData.js";

// grabbing the two series buttons
const jojoButton = document.getElementById("jojo-button");
const hunterButton = document.getElementById("hunter-button");

// keeping a copy of the roster in the main file
// this lets me check if somebody is already saved
// before another post request gets sent
let savedRoster = [];

// changing both buttons at the same time
// disabled buttons keep another request from starting too early
function disableSeriesButtons(disabled) {
    jojoButton.disabled = disabled;
    hunterButton.disabled = disabled;
}

// getting the characters for whichever series was clicked
// this handles the loading message, errors, and button states
// finally turns the buttons back on even if the request fails
async function loadCharacters(characterRequest, series) {
    if (jojoButton.disabled || hunterButton.disabled) {
        return;
    }

    disableSeriesButtons(true);
    clearCharacters();
    showLoading(`Loading ${series} characters...`);

    try {
        const characters = await characterRequest();

        displayCharacters(characters, addCharacterToRoster);
        clearMessage();
    } catch (error) {
        console.error(`there was an issue loading ${series} characters...`, error);
        showError("The characters could not be loaded. Please try again.");
    } finally {
        disableSeriesButtons(false);
    }
}

// matching old and new roster records to the approved local list
// unapproved saved records do not get displayed in the final app
function getApprovedRoster(roster) {
    const approvedRoster = [];

    // checking every mockapi record against my final character data
    // older records used the api id instead of the new local id
    // this keeps both kinds of saved records working
    for (let i = 0; i < roster.length; i++) {
        const savedCharacter = roster[i];
        const approvedCharacter = allCharacters.find(function (character) {
            if (savedCharacter.localId) {
                return character.localId === savedCharacter.localId;
            }

            // changing the older series symbol so the names can still match
            const savedSeries = (savedCharacter.series || "").replace("×", "x");

            return character.apiCharacterId === savedCharacter.characterId
                && character.series.replace("×", "x") === savedSeries;
        });

        if (approvedCharacter) {
            // some characters have more than one version in the app
            // local id makes sure the exact version only gets added once
            const alreadyAdded = approvedRoster.some(function (character) {
                return character.localId === approvedCharacter.localId;
            });

            if (alreadyAdded) {
                continue;
            }

            const rosterCharacter = {
                ...approvedCharacter,
                id: savedCharacter.id,
                note: savedCharacter.note || "",
            };

            // using my approved character details with the saved id and note
            approvedRoster.push(rosterCharacter);
        }
    }

    return approvedRoster;
}

// loading the saved roster when the page first opens
// the same function runs again after somebody gets added
async function loadSavedRoster() {
    disableSeriesButtons(true);
    showLoading("Loading saved roster...");

    try {
        // getting the records first and then filtering the old data
        // only approved characters get passed to the display function
        const roster = await getRoster();
        savedRoster = getApprovedRoster(roster);
        displayRoster(savedRoster, editRosterNote);
        clearMessage();
    } catch (error) {
        console.error("there was an issue loading the saved roster...", error);
        showError("The saved roster could not be loaded.");
    } finally {
        disableSeriesButtons(false);
    }
}

// checking the roster before sending the post request
// then the roster gets reloaded so the new card shows up
async function addCharacterToRoster(character) {
    const alreadySaved = savedRoster.some(function (savedCharacter) {
        return savedCharacter.localId === character.localId;
    });

    if (alreadySaved) {
        showError("This character is already saved.");
        return;
    }

    if (jojoButton.disabled || hunterButton.disabled) {
        return;
    }

    disableSeriesButtons(true);
    showLoading(`Saving ${character.name}...`);

    try {
        // waiting for the post request before getting the new roster
        // this keeps the page from reloading the list too early
        await addCharacter(character);

        const roster = await getRoster();
        savedRoster = getApprovedRoster(roster);
        displayRoster(savedRoster, editRosterNote);
        clearMessage();
    } catch (error) {
        console.error("there was an issue saving the character...", error);
        showError("The character could not be added to the roster.");
    } finally {
        disableSeriesButtons(false);
    }
}

// sending the new note to mockapi with a put request
// the roster gets loaded again after the note is updated
async function editRosterNote(id, note) {
    if (jojoButton.disabled || hunterButton.disabled) {
        return;
    }

    disableSeriesButtons(true);
    showLoading("Updating character note...");

    try {
        // waiting for mockapi to finish changing the note
        // then getting the roster again so the new note appears
        await updateCharacterNote(id, note);

        const roster = await getRoster();
        savedRoster = getApprovedRoster(roster);
        displayRoster(savedRoster, editRosterNote);
        clearMessage();
    } catch (error) {
        console.error("there was an issue updating the character note...", error);
        showError("The character note could not be updated.");
    } finally {
        disableSeriesButtons(false);
    }
}

// each button sends its own request function into loadCharacters
// the shared function handles the loading and error steps for both
jojoButton.addEventListener("click", function () {
    loadCharacters(getJojoCharacters, "JoJo's Bizarre Adventure");
});

hunterButton.addEventListener("click", function () {
    loadCharacters(getHunterCharacters, "Hunter × Hunter");
});

loadSavedRoster();
