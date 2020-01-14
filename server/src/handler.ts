import { formatError } from 'apollo-errors';
import { GraphQLServerLambda, Options } from 'graphql-yoga';
import { Resolvers } from 'buddy-app-schema';
import schema from 'buddy-app-schema';
import { prisma } from './generated/prisma-client';
import Query from './resolvers/query';
import Mutation from './resolvers/mutation';
import Buddy from './resolvers/buddy';
import Newbie from './resolvers/newbie';
import BuddyTask from './resolvers/buddy-task';
import NewbieTask from './resolvers/newbie-task';
import User from './resolvers/user';
import Task from './resolvers/task';
import ERRORS from './errors';
import { authMiddleware, credentialsMiddleware } from './utils';

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
    const message = err.message.toLowerCase();
    const error =
      message.includes('database') || message.includes('field')
        ? new ERRORS.INTERNAL()
        : message.includes('token')
        ? new ERRORS.INVALID_TOKEN()
        : err;
    /* eslint-disable no-console */
    console.error(err);
    return formatError(error);
  },
  endpoint: '/graphql',
};

const { graphqlHandler, playgroundHandler } = new GraphQLServerLambda({
  typeDefs: schema,
  resolvers,
  context: (request: any) => {
    return {
      ...request,
      prisma,
    };
  },
  middlewares: [credentialsMiddleware, authMiddleware],
  options,
});

export { graphqlHandler, playgroundHandler };
