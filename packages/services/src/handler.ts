import { formatError } from "apollo-errors";
import { GraphQLServerLambda, Options } from "graphql-yoga";
import { IMiddleware } from "graphql-middleware";
import schema, { IResolvers } from "@buddy-app/schema";
import { prisma } from "./generated/prisma-client";
import Query from "./resolvers/query";
import Mutation from "./resolvers/mutation";
import Talent from "./resolvers/talent";
import Buddy from "./resolvers/buddy";
import Newbie from "./resolvers/newbie";
import BuddyTask from "./resolvers/buddy-task";
import NewbieTask from "./resolvers/newbie-task";
import User from "./resolvers/user";
import Task from "./resolvers/task";
import ERRORS from "./errors";
import { authMiddleware, credentialsMiddleware } from "./utils";

interface StringIndexSignatureInterface {
  [index: string]: any;
}

type StringIndexed<T> = T & StringIndexSignatureInterface;

const resolvers: StringIndexed<IResolvers> = {
  Query,
  Mutation,
  Talent,
  Buddy,
  Newbie,
  BuddyTask,
  NewbieTask,
  User,
  Task
};

const options: Options = {
  formatError: (err: any) => {
    const message = err.message.toLowerCase();
    const error =
      message.includes("database") || message.includes("field")
        ? new ERRORS.INTERNAL()
        : message.includes("token")
        ? new ERRORS.INVALID_TOKEN()
        : err;
    /* eslint-disable no-console */
    console.error(err);
    return formatError(error);
  },
  endpoint: "/graphql"
};

const {
  graphqlHandler: graphql,
  playgroundHandler: graphqlPlayground
} = new GraphQLServerLambda({
  typeDefs: schema,
  resolvers,
  context: event => ({
    ...event,
    prisma
  }),
  middlewares: [credentialsMiddleware, authMiddleware] as IMiddleware[],
  options
});

export { graphql, graphqlPlayground };
