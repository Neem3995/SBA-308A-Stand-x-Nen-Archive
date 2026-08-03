import {
    hxhCharacters,
    jojoCharacters,
} from "./data/characterData.js";

// keeping the main jikan address in one variable
// the anime id and characters route get added inside each request
const animeApiUrl = "https://api.jikan.moe/v4";

// getting one anime character list from jikan
// a failed list returns empty so the verified local portraits still work
async function getAnimeCharacterList(animeId) {
    try {
        // fetch sends the get request and await pauses this function
        // response.ok checks the status before trying to use the json
        const response = await fetch(`${animeApiUrl}/anime/${animeId}/characters`);

        if (!response.ok) {
            return [];
        }

        // turning the json response into a javascript object
        const characterData = await response.json();

        if (!Array.isArray(characterData.data)) {
            return [];
        }

        return characterData.data;
    } catch (error) {
        console.error("there was an issue getting an anime character list...", error);
        return [];
    }
}

// matching the api image to the approved local character
// both the verified api id and an approved search name must match
function matchCharacterImages(approvedCharacters, apiCharacters) {
    const matchedCharacters = [];

    // going through my approved list instead of displaying every api result
    // the local list controls the names, parts, roles, and abilities
    for (let i = 0; i < approvedCharacters.length; i++) {
        const localCharacter = approvedCharacters[i];

        // finding out if this person has several versions in the final list
        const sameCharacterVersions = approvedCharacters.filter(function (character) {
            return character.apiCharacterId === localCharacter.apiCharacterId;
        });

        // the id and approved name both need to match the jikan record
        const apiMatch = apiCharacters.find(function (apiCharacter) {
            const idMatches = apiCharacter.character.mal_id
                === localCharacter.apiCharacterId;
            const nameMatches = localCharacter.searchNames.includes(
                apiCharacter.character.name,
            );

            return idMatches && nameMatches;
        });

        // making a copy keeps the original character data unchanged
        const matchedCharacter = { ...localCharacter };

        // different versions of the same person keep their part image
        if (
            sameCharacterVersions.length === 1
            && apiMatch
            && apiMatch.character.images.jpg.image_url
        ) {
            matchedCharacter.image = apiMatch.character.images.jpg.image_url;
        }

        matchedCharacters.push(matchedCharacter);
    }

    return matchedCharacters;
}

// only showing the characters that made the final jojo list
// several anime ids are used because the records come from different parts
export async function getJojoCharacters() {
    const jojoAnimeIds = [14719, 20899, 31933, 37991, 48661];
    const requests = [];

    // making one promise for each animated jojo part
    // nothing gets displayed until all of these requests finish
    for (let i = 0; i < jojoAnimeIds.length; i++) {
        requests.push(getAnimeCharacterList(jojoAnimeIds[i]));
    }

    // Promise.all runs the requests together and keeps their original order
    const characterLists = await Promise.all(requests);
    let apiCharacters = [];

    // combining the separate part lists into one list to search through
    for (let i = 0; i < characterLists.length; i++) {
        apiCharacters = apiCharacters.concat(characterLists[i]);
    }

    return matchCharacterImages(jojoCharacters, apiCharacters);
}

// only showing the characters that made the final hxh list
// manga-only characters keep their verified local portrait
export async function getHunterCharacters() {
    // hunter x hunter only needs one anime id for its animated characters
    const apiCharacters = await getAnimeCharacterList(11061);

    return matchCharacterImages(hxhCharacters, apiCharacters);
}
