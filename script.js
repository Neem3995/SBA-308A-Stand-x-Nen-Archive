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
import { getRoster, addCharacter } from "./modules/rosterApi.js";

// grabbing the two series buttons
const jojoButton = document.getElementById("jojo-button");
const hunterButton = document.getElementById("hunter-button");
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

        displayCharacters(characters, series, addCharacterToRoster);
        clearMessage();
    } catch (error) {
        console.error(`there was an issue loading ${series} characters...`, error);
        showError("The characters could not be loaded. Please try again.");
    } finally {
        disableSeriesButtons(false);
    }
}

// loading the saved roster when the page first opens
// the same function runs again after somebody gets added
async function loadSavedRoster() {
    disableSeriesButtons(true);
    showLoading("Loading saved roster...");

    try {
        savedRoster = await getRoster();
        displayRoster(savedRoster);
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
        return savedCharacter.characterId === character.characterId
            && savedCharacter.series === character.series;
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
        await addCharacter(character);

        savedRoster = await getRoster();
        displayRoster(savedRoster);
        clearMessage();
    } catch (error) {
        console.error("there was an issue saving the character...", error);
        showError("The character could not be added to the roster.");
    } finally {
        disableSeriesButtons(false);
    }
}

jojoButton.addEventListener("click", function () {
    loadCharacters(getJojoCharacters, "JoJo's Bizarre Adventure");
});

hunterButton.addEventListener("click", function () {
    loadCharacters(getHunterCharacters, "Hunter x Hunter");
});

loadSavedRoster();
