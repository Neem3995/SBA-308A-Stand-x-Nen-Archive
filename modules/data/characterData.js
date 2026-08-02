import { hxhCharacters } from "./hxhCharacterData.js";
import { jojoCharacters } from "./jojoCharacterData.js";

// keeping both final character lists together
export const allCharacters = [
    ...hxhCharacters,
    ...jojoCharacters,
];

export { hxhCharacters, jojoCharacters };
