const rosterUrl = "https://6a6cec0aeb8865c4bf48c46d.mockapi.io/roster";

// getting all of the saved characters from mockapi
// this request runs when the page first opens
export async function getRoster() {
    const response = await fetch(rosterUrl);

    if (!response.ok) {
        throw new Error("the saved roster request did not work");
    }

    const roster = await response.json();

    if (!Array.isArray(roster)) {
        throw new Error("the saved roster list was missing");
    }

    return roster;
}

// sending a character to mockapi
// the new character gets returned after it is saved
export async function addCharacter(character) {
    const response = await fetch(rosterUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(character),
    });

    if (!response.ok) {
        throw new Error("the character could not be saved");
    }

    return response.json();
}
