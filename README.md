# Buddy-app

[![Build Status](https://travis-ci.org/BuildIt-Poland/buddy-app.svg?branch=master)](https://travis-ci.org/BuildIt-Poland/buddy-app)
[![codecov](https://codecov.io/gh/BuildIt-Poland/buddy-app/branch/master/graph/badge.svg)](https://codecov.io/gh/BuildIt-Poland/buddy-app)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

> App that easies the follow up process between a Buddy and his assigned new joiner

## Develop

### Prerequisites

- Please assure that you have `Node.js` and `Yarn` installed on your machine.

### Commands

The following commands are intended to be launched from the project root directory.

- `$ yarn bootstrap` - Install all the needed dependencies in all packages.
- `$ yarn start` - Runs the app in the development mode.<br>
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.<br>
  Runs graphQL lambda functions locally.<br>
  Open [http://localhost:4000](http://localhost:4000) to view GraphQL playground it in the browser.

## Production

The following command is intended to be launched from the project root directory.

- `$ yarn build` - Builds all packages to generate production code.

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
