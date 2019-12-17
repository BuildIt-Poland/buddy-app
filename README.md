# Buddy-app

[![Build Status](https://travis-ci.org/BuildIt-Poland/buddy-app.svg?branch=master)](https://travis-ci.org/BuildIt-Poland/buddy-app)
[![codecov](https://codecov.io/gh/BuildIt-Poland/buddy-app/branch/master/graph/badge.svg)](https://codecov.io/gh/BuildIt-Poland/buddy-app)

> App that easies the follow up process between a Buddy and his assigned new joiner

## Develop

### Prerequisites

- Please assure that you have Node.js installed on your machine.

- To make it work, please create `.env` file in the `root` folder:
```
REACT_APP_SERVER_URL=http://localhost:4000/graphql
REACT_APP_AUTH_USER=auth-user
```
- And one more `.env` file in the `/server` folder(the values can be changed to your own):
```
PRISMA_ENDPOINT=https://eu1.prisma.sh/anton-lunov/Buddy-app/test
PRISMA_SECRET=buddy-app-graphql-prisma-secret
APP_SECRET=BUDDY-APP-GraphQL-1s-aw3some
PORT=4000
```

### Commands
The following commands are intended to be launched from the project root directory.
- ```$ npm install``` - Install all the needed dependencies.
- ```$ npm start``` - Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.<br>
You will also see any lint errors in the console.
- ```$ npm run server``` - Runs graphQL server.<br>
Open [http://localhost:4000](http://localhost:4000) to view GraphQL playground it in the browser.
- ```$ npm run cy:open``` - Runs the Cypress app, then you can navigate and choose a test to run
- ```$ npm run cy:run``` - Runs tests headlessly in the Electron browser
- ```$ npm run cy:ci``` - Runs the app in the development mode, then runs tests headlessly in the Electron browser and close dev server.
- ```$ npm test``` - Launches the test runner in the interactive watch mode.
- ```$ npm run eject``` - Removes the single build dependency from your project.

### App login
The App allows to login as **buddy** or **new joiner**.

A valid registered email and password are needed for a successful login. These data can be found inside the DB in use. If you have setup the server .env file with the data above, then you need to access the same [Prisma admin panel](https://eu1.prisma.sh/anton-lunov/Buddy-app/test/_admin). Please note that this is a development setup and this db will be removed as part of future development.

Trying to visit the above Prisma admin panel will return an error of invalid token. Please enter the settings and add the following token:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJCdWRkeS1hcHBAdGVzdCIsInJvbGVzIjpbImFkbWluIl19LCJpYXQiOjE1NzY1ODUzMTYsImV4cCI6MTU3NzE5MDExNn0.AON8wjG6Fv1XTLWu9Blfepg4B-L9ypiKjGBqJBxPiB4
```

This will allow you admin access to the temporary database in use for development.

## Production

The following command is intended to be launched from the project root directory.

- ```$ npm run build``` - Builds the app for production to the `build` folder.

## Contributing

If you encounter any bug using the App, please file an [issue](https://github.com/BuildIt-Poland/buddy-app/issues).

Before creating your branch please create a new issue that describe the purpose of your contribution. You will be required to link it to the pull request.

### Branch convention

The `master` is the most up-to-date production-ready branch. Please create new branches from `master` using the following pattern:

- feature/[issue number]-[short descriptive name] - the branch will introduce a new functionality. Only 1 functionality per pull request.
- fix/[issue number]-[short descriptive name] - the branch will introduce only fixes to existing code.
- chore/[issue number]-[short descriptive name] - the branch will introduce enhancements that don't impact the functionality of the existing code, like code refactoring. Issue number is optional.
- doc/[issue number]-[short descriptive name] - the branch will introduce or amend documentation only. Issue number is optional.

### Pull request convention

Once the development is done, please open a pull request.

Each pull request must have a `title` that includes the Jira/GitHub issue ID number at the beginning, a `description` and a a `checklist`. Optionally you can include `screenshots`.

Please remember to use the BUD- prefix if pointing to a Jira issue.

Below is an example of a properly written pull request description.

```
# [34] Settings screen typo fix

## Description
Fixes a typo on the word "Notification" in the settings screen

## Checklist
- [X] The word "Notification" is written correctly.
```

### Other reccomendations

Do not add `TODO` in the code. TODOs are indications of unfinished work, so please finish your work before submitting it. If you CAN'T finish your development for any reason, please open an issue regard it, so that work can be planned and awareness is properly raised around that. Mention of the unfinished work must be added to the pull request description aside of the new issue reference.

Use `arrow functions` for `anonymous functions`

For targeting components directly in tests (e2e and unit) use `data-testid` property, for example:

```html
<button data-testid="add-task-button">New task</button>
```

Separate `external and internal imports` with new line

Keep your `imports order` correct – the higher a file is in directory structure, the higher on the list it should be:

```js
import React from 'react';
import PropTypes from 'prop-types';

import Headline from '../../Headline';
import { SugarCat } from './Characters';
```
