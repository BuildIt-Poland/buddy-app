/* eslint-disable */
require('dotenv').config();
import { formatError } from 'apollo-errors';
import { GraphQLServer, Options } from 'graphql-yoga';
import { prisma } from './generated/prisma-client';
import { Resolvers } from './generated/schema-types';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Buddy from './resolvers/Buddy';
import Newbie from './resolvers/Newbie';
import BuddyTask from './resolvers/BuddyTask';
import NewbieTask from './resolvers/NewbieTask';
import User from './resolvers/User';
import Task from './resolvers/Task';
import { authMiddleware, ERRORS } from './utils';
/* eslint-enable */

const resolvers: Resolvers = {
  Query,
  Mutation,
  Buddy,
  Newbie,
  BuddyTask,
  NewbieTask,
  User,
  Task,
};

const options: Options = {
  formatError: (err: any) => {
    if (err.message.startsWith('Database')) {
      return new Error(ERRORS.INTERNAL);
    }
    return formatError(err);
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    prisma,
  }),
  middlewares: [authMiddleware],
});

/* eslint-disable no-console */
server.start(options, () =>
  console.log(`GraphQL API is running on http://localhost:4000`)
);
