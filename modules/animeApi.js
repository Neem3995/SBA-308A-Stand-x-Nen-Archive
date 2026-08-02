import {
    hxhCharacters,
    jojoCharacters,
} from "./data/characterData.js";

const animeApiUrl = "https://api.jikan.moe/v4";

// getting one anime character list from jikan
// a failed list returns empty so the verified local portraits still work
async function getAnimeCharacterList(animeId) {
    try {
        const response = await fetch(`${animeApiUrl}/anime/${animeId}/characters`);

        if (!response.ok) {
            return [];
        }

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

    for (let i = 0; i < approvedCharacters.length; i++) {
        const localCharacter = approvedCharacters[i];
        const sameCharacterVersions = approvedCharacters.filter(function (character) {
            return character.apiCharacterId === localCharacter.apiCharacterId;
        });
        const apiMatch = apiCharacters.find(function (apiCharacter) {
            const idMatches = apiCharacter.character.mal_id
                === localCharacter.apiCharacterId;
            const nameMatches = localCharacter.searchNames.includes(
                apiCharacter.character.name,
            );

            return idMatches && nameMatches;
        });

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

    for (let i = 0; i < jojoAnimeIds.length; i++) {
        requests.push(getAnimeCharacterList(jojoAnimeIds[i]));
    }

    const characterLists = await Promise.all(requests);
    let apiCharacters = [];

    for (let i = 0; i < characterLists.length; i++) {
        apiCharacters = apiCharacters.concat(characterLists[i]);
    }

    return matchCharacterImages(jojoCharacters, apiCharacters);
}

// only showing the characters that made the final hxh list
// manga-only characters keep their verified local portrait
export async function getHunterCharacters() {
    const apiCharacters = await getAnimeCharacterList(11061);

    return matchCharacterImages(hxhCharacters, apiCharacters);
}
