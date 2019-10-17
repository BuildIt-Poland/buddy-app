//const jwt = require('jsonwebtoken');
import * as jwt from 'jsonwebtoken';
import { GraphQLResolveInfo } from 'graphql';
import { createError } from 'apollo-errors';
import { ResolverFn, Context, TaskStatus } from './generated/schema-types';

export const FooError = createError('FooError', {
  message: 'A foo error has occurred',
});

export const ERRORS = {
  ACCESS: 'Access denied',
  AUTH: 'Not authenticated',
  AUTH_SUB: 'Not authenticated',
  EXIST: 'Account already exist',
  PASSWORD: 'Invalid password',
  TASK_RESULT: 'No such task found',
  USER_RESULT: 'No such user found',
  INTERNAL: 'Internal server error',
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

  throw new Error(ERRORS.AUTH);
};

const isBuddyAuth = async (context: Context): Promise<boolean> => {
  const userId = auth(context);
  const isBuddy = await context.prisma.$exists.buddy({ id: userId });

  if (!isBuddy) {
    // throw new FooError({
    //   data: {
    //     statusCode: 400,
    //   },
    // });
    throw new Error(ERRORS.ACCESS);
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
