# Stand x Nen Archive

Stand x Nen Archive is a single-page JavaScript application created for SBA 308A. It lets users browse JoJo's Bizarre Adventure and Hunter × Hunter characters, view their abilities, and save favorites to a roster.

## Features

- Browse 24 JoJo and 13 Hunter × Hunter characters
- Flip cards to see Stand and Nen ability images
- Save characters to a roster
- Add and update personal notes
- View loading, error, and duplicate messages

## APIs

- [Jikan API](https://jikan.moe/) for anime character data
- [MockAPI](https://mockapi.io/) for the saved roster and notes

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
```

## Testing

- Both character lists load correctly
- Ability cards flip forward and back
- Roster characters and notes save correctly
- Images load and the browser console has no errors

## Reflection

### What could you have done differently during the planning stages of your project to make the execution easier?

I could have chosen my final character list and images earlier. That would have made the later updates faster.

### Were there any requirements that were difficult to implement? What do you think would make them easier to implement in future projects?

Matching Jikan characters and managing multiple API requests were the hardest parts. Testing each endpoint before building the cards would make this easier next time.

### What would you add to, or change about your application if given more time?

I would add a Delete from Roster button, a simple character filter, and a few more image adjustments.

### Use this space to make notes for your future self about anything that you think is important to remember about this process, or that may aid you when attempting something similar again.

Check the API documentation before writing the display code. Keep the API, data, and display code in separate files, then test and commit after each small phase.

## Author

Joseph Garcia
