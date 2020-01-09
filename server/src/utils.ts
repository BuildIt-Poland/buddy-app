//const jwt = require('jsonwebtoken');
import * as jwt from 'jsonwebtoken';
import { GraphQLResolveInfo } from 'graphql';
import { ResolverFn, Context, TaskStatus } from 'buddy-app-schema';
import ERRORS from './errors';

const MAX_PASSWORD_LENGTH = 24;

const emailValidator = (email: string): boolean =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export const changeTaskStatus = (status: TaskStatus): TaskStatus =>
  status === TaskStatus.Completed ? TaskStatus.Uncompleted : TaskStatus.Completed;

const auth = (context: Context): string => {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId }: any = jwt.verify(token, process.env.APP_SECRET);
    return userId;
  }

  throw new ERRORS.UNAUTHENTICATED();
};

const isBuddyAuth = async (context: Context): Promise<boolean> => {
  const userId = auth(context);
  const isBuddy = await context.prisma.$exists.buddy({ id: userId });

  if (!isBuddy) {
    throw new ERRORS.ACCESS_DENIED();
  }
  return isBuddy;
};

export const authMiddleware = async (
  resolve: ResolverFn<any, any, Context, any>,
  root: any,
  args: any,
  context: Context,
  info: GraphQLResolveInfo
): Promise<any> => {
  if (info.fieldName !== 'login' && info.parentType.name !== 'AuthPayload') {
    if (
      info.operation.operation === 'mutation' &&
      info.operation.name &&
      info.operation.name.value !== 'updateTaskStatus'
    ) {
      await isBuddyAuth(context);
    } else {
      auth(context);
    }
  }

  return await resolve(root, args, context, info);
};

export const credentialsMiddleware = async (
  resolve: ResolverFn<any, any, Context, any>,
  root: any,
  args: any,
  context: Context,
  info: GraphQLResolveInfo
): Promise<any> => {
  if (/addBuddy$|addNewbie$|login/.test(info.fieldName)) {
    const input = args.input || args;
    const password = input.password || '';
    const email = input.email || '';

    if (!email || !emailValidator(email)) {
      throw new ERRORS.INVALID_EMAIL();
    }
    if (!password || password.length > MAX_PASSWORD_LENGTH) {
      throw new ERRORS.INVALID_PASSWORD();
    }
  }

  return await resolve(root, args, context, info);
};
