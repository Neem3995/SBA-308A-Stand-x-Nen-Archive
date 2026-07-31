const animeApiUrl = "https://api.jikan.moe/v4";

// getting the jojo characters from the api
// this uses the anime id for the first jojo tv series
// then it returns the character list inside the data
export async function getJojoCharacters() {
    const response = await fetch(`${animeApiUrl}/anime/14719/characters`);

    if (!response.ok) {
        throw new Error("the jojo request did not work");
    }

    const characterData = await response.json();

    return characterData.data;
}
