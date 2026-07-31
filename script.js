import { getJojoCharacters } from "./modules/animeApi.js";
import { displayCharacters } from "./modules/characterDisplay.js";

// grabbing the jojo button
const jojoButton = document.getElementById("jojo-button");

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

jojoButton.addEventListener("click", loadJojoCharacters);
