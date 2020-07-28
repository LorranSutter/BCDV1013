## Lab 13: Todo App

Create a todo tracking application that stores the todo items in your browser using IndexedDB. Your submission should be a single javascript file, ie App.js. **Do not submit your whole react project** or you will receive 0 (but you can re-submit).

The point of this lab is to get experience using IndexedDB, which is the most powerful browser storage that works across all browsers.

- Create a new react project using `create-react-app`
- Install the idb package:
    `npm i --save idb`
- Download the file App.js and put it into the src directory in your app. It is a starting point you can use.
- Edit the App.js file, and look for the places that say EDIT ME. Replace them with code that implements at least the following:
    - Saves new todo items to IndexedDB (check they appear in devtools).
    - Displays the list of todo items on the page (make sure they appear after refreshing the browser).
    - Marking todo items as completed.
- BONUS:
    - Have a way to filter todo items by status (ie only open or closed), or by priority (high/medium/low). Use indices so that you don't have to loop over all items.
    - Style the app so it looks nice!