import { LOGIN_MUTATION } from 'graphql/login.graphql';
import {
  MutationLoginArgs,
  AuthPayload,
  TaskStatus,
  Newbie,
} from 'buddy-app-schema';
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

export const tasksResponse = (filter?: string) => {
  const tasks = [
    {
      id: '1',
      title: 'Call you head manager',
      description: '',
      createdAt: '',
      implementationDate: '',
      status: TaskStatus.Uncompleted,
      newbie: {} as Newbie,
    },
    {
      id: '2',
      title: 'Write you main manager',
      description: '',
      createdAt: '',
      implementationDate: '',
      status: TaskStatus.Completed,
      newbie: {} as Newbie,
    },
  ];

  switch (filter) {
    case 'completed':
      return [tasks[0]];
    case 'uncompleted':
      return [tasks[1]];
    default:
      return tasks;
  }
};
