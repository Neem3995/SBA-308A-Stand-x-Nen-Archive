import {
    getJojoCharacters,
    getHunterCharacters,
} from "./modules/animeApi.js";
import { displayCharacters } from "./modules/characterDisplay.js";

// grabbing the two series buttons
const jojoButton = document.getElementById("jojo-button");
const hunterButton = document.getElementById("hunter-button");

// getting the characters after the button is clicked
// then the character data gets passed to the display function
// loading messages and better errors will be added in another phase
async function loadJojoCharacters() {
    try {
        const characters = await getJojoCharacters();

        displayCharacters(characters, "JoJo's Bizarre Adventure");
    } catch (error) {
        console.error("there was an issue loading the jojo characters...", error);
    }
}

// getting the hunter x hunter characters
// the same display function can make these cards too
// this keeps us from writing the card code a second time
async function loadHunterCharacters() {
    try {
        const characters = await getHunterCharacters();

        displayCharacters(characters, "Hunter x Hunter");
    } catch (error) {
        console.error("there was an issue loading the hunter characters...", error);
    }
}

jojoButton.addEventListener("click", loadJojoCharacters);
hunterButton.addEventListener("click", loadHunterCharacters);
