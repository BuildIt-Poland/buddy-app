# GraphQL schema module

> Buddy app module that shares GraphQL schema and generated ts types with schema introspection

## Develop

### Commands

The following commands are intended to be launched from the schema directory.

- `$ yarn copy` - Copies schema.json from './src/generated' directory to './build/'.
- `$ yarn codegen` - Generates ts types with schema introspection.
- `$ yarn build` - Create/update module build.
- `$ yarn upgrade` - Automatically applies changes to all projects, generates and updates module build. So once you've finished with your update to `schema.graphql`, just run this comand.

## Production

This module is used as local dependency for client and server projects, thus no publish needed.
