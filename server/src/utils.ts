//const jwt = require('jsonwebtoken');
import * as jwt from 'jsonwebtoken';
import { GraphQLResolveInfo } from 'graphql';
import { ResolverFn, Context, TaskStatus } from './generated/schema-types';

export const ERRORS = {
  access: 'Access denied',
  auth: 'Not authenticated',
  exist: 'Account already exist',
  password: 'Invalid password',
  taskResult: 'No such task found',
  userResult: 'No such user found',
};

export const changeTaskStatus = (status: TaskStatus): TaskStatus =>
  status === TaskStatus.Completed ? TaskStatus.Uncompleted : TaskStatus.Completed;

const auth = (context: Context): string => {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId }: any = jwt.verify(token, process.env.APP_SECRET);
    return userId;
  }

  throw new Error(ERRORS.auth);
};

const isBuddyAuth = async (context: Context): Promise<boolean> => {
  const userId = auth(context);
  const isBuddy = await context.prisma.$exists.buddy({ id: userId });

  if (!isBuddy) {
    throw new Error(ERRORS.access);
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
    if (info.operation.operation === 'mutation') {
      await isBuddyAuth(context);
    } else {
      auth(context);
    }
  }

  return await resolve(root, args, context, info);
};
