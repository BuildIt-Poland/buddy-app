import { LOGIN_MUTATION } from 'graphql/login.graphql';
import AVATAR_HEADER from 'graphql/avatar-header.graphql';
import { MutationLoginArgs, AuthPayload, QueryNewbieArgs } from 'buddy-app-schema';
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

export const NewbieAvatarDetails = (variables?: QueryNewbieArgs) => ({
  request: {
    query: AVATAR_HEADER,
    variables,
  },
  result: {
    data: {
      newbie: {
        name: 'Tom Hanks',
        position: 'front-end',
        photo: 'some-url',
        tasksInfo: {
          buddyProgress: 0.54,
        },
      },
    },
  },
});
