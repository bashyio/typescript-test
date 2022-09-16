## Some Implementation Details

- I used a Live "Fake" API to test the AutoComplete Feature.
- Results are fetched from: https://jsonplaceholder.typicode.com/posts
- I didn't use 3rd Party Libraries for the implementation as required but I set up eslint & prettier to enforce quality coding style.
- I wrote a debounce function for the purpose of this project (to limit the number of requests made while typing), but in a live implementation I would most likely use a lodash or underscore debounce/throttle function.
- Searched Results are cached for 600 seconds to improve performance (This duration/behaviour will be determined by the frequency of updates the endpoint receives in a live project).
- Search string is converted to lowercase to limit unneccessary requests and maximize the cache
- If a user keeps typing when no result is found, API requests will no longer be made (as long as the last string that returned an empty response) is at the beginning of their current value. (This behaviour can be extended to only stop requests for a certain duration of time if data rapidly updates/changes.)

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**
