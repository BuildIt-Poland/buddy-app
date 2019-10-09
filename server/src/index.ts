/* eslint-disable */
import { config } from 'dotenv';
config();
import { GraphQLServer } from 'graphql-yoga';
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
import { authMiddleware } from './utils';

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

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    prisma,
  }),
  middlewares: [authMiddleware],
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
/* eslint-enable */
