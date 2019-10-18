import { createError } from 'apollo-errors';

enum ERROR {
  ACCESS_DENIED = 'Access denied',
  ACCOUNT_EXIST = 'Account already exist',
  INTERNAL = 'Internal server error',
  INVALID_EMAIL = 'Invalid email address',
  INVALID_PASSWORD = 'Invalid password',
  INVALID_TOKEN = 'Invalid token',
  NO_TASK_FOUND = 'No such task found',
  NO_USER_FOUND = 'No such user found',
  UNAUTHENTICATED = 'Not authenticated',
}

const ERRORS: any = {};

for (let type in ERROR) {
  ERRORS[type] = createError(type, {
    message: ERROR[type as keyof typeof ERROR],
  });
}

export default ERRORS;
