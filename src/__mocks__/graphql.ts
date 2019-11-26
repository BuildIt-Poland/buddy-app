import { LOGIN_MUTATION } from 'graphql/login.graphql';
import { BUDDY_MENU_DETAILS, NEWBIE_MENU_DETAILS } from 'graphql/user-menu.graphql';
import AVATAR_HEADER from 'graphql/avatar-header.graphql';
import { GraphQLError } from 'graphql';
import {
  MutationLoginArgs,
  AuthPayload,
  TaskStatus,
  Newbie,
  QueryNewbieArgs,
  QueryBuddyArgs,
  UserRole,
} from 'buddy-app-schema';
import NEWBIE_CONTACT_DETAILS, {
  BUDDY_CONTACT_DETAILS,
} from 'graphql/contact-details.graphql';
import { getBasicUserDetailsMock } from './general';
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

export const tasksResponse = (filter?: TaskStatus) => {
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
    case TaskStatus.Completed:
      return [tasks[0]];
    case TaskStatus.Uncompleted:
      return [tasks[1]];
    default:
      return tasks;
  }
};

export const buddyMenuDetails = (variables?: Partial<QueryBuddyArgs>) => [
  {
    request: {
      query: BUDDY_MENU_DETAILS,
      variables,
    },
    result: {
      data: {
        buddy: {
          name: 'Tom Hanks',
          email: 'tom@wipro.com',
          allowPushedNotifications: true,
          photo: 'buddy-photo-url',
          newbies: [
            {
              id: 'id',
              name: 'Sandra Bullock',
              photo: 'newbie-photo-url',
            },
          ],
        },
      },
    },
  },
];

export const newbieMenuDetails = (variables?: Partial<QueryNewbieArgs>) => [
  {
    request: {
      query: NEWBIE_MENU_DETAILS,
      variables,
    },
    result: {
      data: {
        newbie: {
          name: 'Sandra Bullock',
          email: 'doejoe@wipro.com',
          allowPushedNotifications: true,
          photo: 'newbie-photo-url',
          buddy: {
            id: 'id',
            name: 'Tom Hanks',
            photo: 'newbie-photo-url',
          },
        },
      },
    },
  },
];

export const newbieContactDetails = (variables?: Partial<QueryNewbieArgs>) => [
  {
    request: {
      query: NEWBIE_CONTACT_DETAILS,
      variables,
    },
    result: {
      data: {
        newbie: getBasicUserDetailsMock(UserRole.Newbie),
      },
    },
  },
];

export const buddyContactDetails = (variables?: Partial<QueryBuddyArgs>) => [
  {
    request: {
      query: BUDDY_CONTACT_DETAILS,
      variables,
    },
    result: {
      data: {
        buddy: getBasicUserDetailsMock(UserRole.Buddy),
      },
    },
  },
];
