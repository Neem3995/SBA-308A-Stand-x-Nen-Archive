import { hxhCharacters } from "./hxhCharacterData.js";
import { jojoCharacters } from "./jojoCharacterData.js";

// keeping both final character lists together
// script.js uses this full list to approve old saved roster records
// the api file can still import each series by itself
export const allCharacters = [
    ...hxhCharacters,
    ...jojoCharacters,
];

export { hxhCharacters, jojoCharacters };
