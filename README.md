# Stand x Nen Archive

Stand x Nen Archive is a single-page JavaScript application created for SBA 308A.

The application lets users browse an approved list of characters from JoJo's Bizarre Adventure and Hunter × Hunter. Users can save separate character versions to a roster and update a personal note.

## Features

- 13 approved Hunter × Hunter characters
- 24 approved JoJo character versions
- Character portraits matched with verified Jikan/MyAnimeList IDs
- Stand, Hamon, Vampiric, and Nen ability information
- GET requests for character information and the saved roster
- POST requests to save characters
- PUT requests to update personal notes
- Loading, error, empty, and duplicate messages
- Responsive character card layout

## APIs Used

- Jikan API for external anime character data and portraits
- MockAPI for the saved character roster and note updates

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

## SBA Requirements Completed

- Single-page HTML, CSS, and JavaScript application
- External API GET requests
- MockAPI POST and PUT requests
- Promises and async/await
- Multiple JavaScript modules with imports and exports
- User interaction, loading states, and error handling
- Approved API results rendered in reusable cards

## Reflection

This project helped me practice organizing JavaScript into modules, matching API data to a local list, working with async requests, and updating the page after saved data changes.

## Technologies Used

- HTML
- CSS
- JavaScript
- Jikan API
- MockAPI

## Author

Joseph Garcia
