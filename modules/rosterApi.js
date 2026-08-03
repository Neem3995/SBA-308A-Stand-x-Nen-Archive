// keeping the mockapi roster address in one place
// the saved character id only gets added for an update request
const rosterUrl = "https://6a6cec0aeb8865c4bf48c46d.mockapi.io/roster";

// getting all of the saved characters from mockapi
// this request runs when the page first opens
export async function getRoster() {
    // fetch uses get by default so a method does not need to be written here
    const response = await fetch(rosterUrl);

    // stopping the function if mockapi sends back a failed status
    if (!response.ok) {
        throw new Error("the saved roster request did not work");
    }

    // turning the response into the array used by the display function
    const roster = await response.json();

    if (!Array.isArray(roster)) {
        throw new Error("the saved roster list was missing");
    }

    return roster;
}

// sending a character to mockapi
// the new character gets returned after it is saved
export async function addCharacter(character) {
    // post creates a new roster record with the character object
    const response = await fetch(rosterUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

        // stringify turns the javascript object into json text for mockapi
        body: JSON.stringify(character),
    });

    if (!response.ok) {
        throw new Error("the character could not be saved");
    }

    return response.json();
}

// updating only the note for one saved character
// the character id gets added to the end of the url
export async function updateCharacterNote(id, note) {
    // put updates the saved record that matches this mockapi id
    const response = await fetch(`${rosterUrl}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },

        // only the note needs to be sent because the other data stays the same
        body: JSON.stringify({ note: note }),
    });

    if (!response.ok) {
        throw new Error("the character note could not be updated");
    }

    return response.json();
}
