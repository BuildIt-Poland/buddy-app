# 'buddy-app-schema' module

> Buddy app module that shares GraphQL schema and generated ts types with schema introspection

## Develop

### Prerequisites

- To make it work pls run `npm install`. This should install all the needed dependencies and automatically create module build.

### Commands
The following commands are intended to be launched from the schema directory.
- ```$ npm run copy``` - Copies schema.json from './src/generated' directory to './build/'.
- ```$ npm run codegen``` - Generates ts types with schema introspection.
- ```$ npm run build``` - Create/update module build.
- ```$ npm run upgrade``` - Automatically applies changes to all projects, generates and updates module build. So once you've finished with your update to `schema.graphql`, just run this comand.

## Production

This module is used as local dependency for client and server projects, thus no publish needed.
