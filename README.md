# Stand x Nen Archive

Stand x Nen Archive is a single-page JavaScript application created for SBA 308A.

The application lets users browse an approved list of characters from JoJo's Bizarre Adventure and Hunter × Hunter. Users can save separate character versions to a roster and update a personal note.

## Features

- 13 approved Hunter × Hunter characters
- 24 approved JoJo character versions
- Character portraits matched with verified Jikan/MyAnimeList IDs
- Stand, Hamon, Vampiric, and Nen ability information
- Clickable ability cards that flip to show Stand and Nen images
- GET requests for character information and the saved roster
- POST requests to save characters
- PUT requests to update personal notes
- Loading, error, empty, and duplicate messages
- Disabled series buttons while requests are loading
- Responsive character card layout

## APIs Used

- [Jikan API](https://jikan.moe/) for external anime character data and portraits
- [MockAPI](https://mockapi.io/) for the saved character roster and note updates

## File Structure

```text
index.html
style.css
script.js
modules/
  animeApi.js
  characterDisplay.js
  rosterApi.js
  data/
    characterData.js
    hxhCharacterData.js
    jojoCharacterData.js
```

## How to Run

1. Open the project folder in VS Code.
2. Start a local server such as Live Server.
3. Open `index.html` through the local server.
4. Choose a series to load its approved characters.
5. Click an ability card to flip it and see the character's ability image.

## Testing

- JoJo's Bizarre Adventure loads 24 approved character cards
- Hunter × Hunter loads 13 approved character cards
- All character portraits and ability images load without errors
- Ability cards flip forward and back when clicked
- Characters can be added to the saved roster
- Personal notes can be updated and reloaded
- Series buttons are disabled while a request is loading
- Browser console has no warnings or errors

## SBA Requirements Completed

- Single-page HTML, CSS, and JavaScript application
- External API GET requests
- MockAPI POST and PUT requests
- Promises and async/await
- Multiple JavaScript modules with imports and exports
- User interaction, loading states, and error handling
- Overlapping series requests prevented with disabled buttons
- Approved API results rendered in reusable cards

## Reflection

### What could you have done differently during the planning stages of your project to make the execution easier?

I could have decided on my final character list and image sources earlier. I changed some of the characters and images after the API features were already working. Planning those details first would have made the later updates faster.

### Were there any requirements that were difficult to implement? What do you think would make them easier to implement in future projects?

Matching Jikan results to the correct character versions and keeping the API requests from overlapping were the most difficult parts. Testing each endpoint before building the cards and completing one request at a time would make this easier in another project.

### What would you add to, or change about your application if given more time?

I would add a simple Delete from Roster button and a basic character filter. I would also keep adjusting a few image positions so every portrait and ability image fits its card as smoothly as possible.

### Use this space to make notes for your future self about anything that you think is important to remember about this process, or that may aid you when attempting something similar again.

I should always check the API documentation and returned property names before writing the display code. Keeping the API functions, character data, and page display in separate modules made the project easier to understand. Testing and committing after every small phase also made it easier to find and fix problems.

## Technologies Used

- HTML
- CSS
- JavaScript
- Jikan API
- MockAPI

## Author

Joseph Garcia
