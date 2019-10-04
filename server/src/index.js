const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Buddy = require('./resolvers/Buddy');
const Newbie = require('./resolvers/Newbie');
const BuddyTask = require('./resolvers/BuddyTask');
const NewbieTask = require('./resolvers/NewbieTask');
const User = require('./resolvers/User');
const Task = require('./resolvers/Task');
const { authMiddleware } = require('./utils');

const resolvers = {
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
