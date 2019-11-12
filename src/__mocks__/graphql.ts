import { LOGIN_MUTATION } from 'graphql/login.graphql';
import { MutationLoginArgs, AuthPayload } from 'types';
import { GraphQLError } from 'graphql';
import { authContext } from './context';

export const loginSuccessMock = (
  variables?: Partial<MutationLoginArgs>,
  data?: Partial<AuthPayload>
) => ({
  request: {
    query: LOGIN_MUTATION,
    variables: {
      email: 'aa@aa.pt',
      password: '12345',
      ...variables,
    },
  },
  result: {
    data: {
      login: {
        ...authContext().data,
        ...data,
      },
    },
  },
});

export const loginFailedMock = (variables?: Partial<MutationLoginArgs>) => ({
  request: {
    query: LOGIN_MUTATION,
    variables: {
      email: 'aa@aa.pt',
      password: '12345',
      ...variables,
    },
  },
  result: {
    errors: [new GraphQLError('No such user found')],
  },
});

export const loginNoNetworkMock = (variables?: Partial<MutationLoginArgs>) => ({
  request: {
    query: LOGIN_MUTATION,
    variables: {
      email: 'aa@aa.pt',
      password: '12345',
      ...variables,
    },
  },
  error: new Error('Network error'),
});
