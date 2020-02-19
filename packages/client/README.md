# Buddy App Client 

> Buddy App front end app.

## Develop

### Prerequisites

- Create `.env` file in the `client` folder:

```
REACT_APP_SERVER_URL=http://localhost:4000/graphql
REACT_APP_AUTH_USER=auth-user
```

### Commands

The following commands are intended to be launched from the project root directory.

- `$ yarn start` - Runs the app in the development mode.<br>
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.<br>
- `$ yarn cy:open` - Runs the Cypress app, then you can navigate and choose a test to run
- `$ yarn cy:run` - Runs tests headlessly in the Electron browser
- `$ yarn cy:ci` - Runs the app in the development mode, then runs tests headlessly in the Electron browser and close dev server.
- `$ npm test` - Launches the test runner in the interactive watch mode.
- `$ yarn eject` - Removes the single build dependency from your project.
- `$ yarn lighthouse` - Run lighthouse ci locally


## Production

The following command is intended to be launched from the project root directory.

- `$ npm run build` - Builds the app for production to the `build` folder.
