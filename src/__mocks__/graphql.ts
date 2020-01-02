import { BUDDY_MENU_DETAILS, NEWBIE_MENU_DETAILS } from 'graphql/user-menu.graphql';
import { AVATAR_HEADER } from 'graphql/avatar-header.graphql';
import { NEWBIE_SELECT } from 'graphql/newbie-select.graphql';
import { TASK_DETAILS } from 'graphql/task-details.graphql';
import { ADD_NEWBIE_TASK } from 'graphql/add-task.graphql';
import { GraphQLError } from 'graphql';

import {
  MutationAddNewbieTaskArgs,
  AuthPayload,
  TaskStatus,
  Newbie,
  QueryNewbieArgs,
  QueryBuddyArgs,
  UserRole,
} from 'buddy-app-schema';
import {
  NEWBIE_CONTACT_DETAILS,
  BUDDY_CONTACT_DETAILS,
} from 'graphql/contact-details.graphql';
import { TASK_LIST } from 'graphql/task-list.graphql';
import { getBasicUserDetailsMock } from './general';

export const loginSuccessMock = (data?: Partial<AuthPayload>) => ({
  data: {
    login: {
      role: 'BUDDY',
      token: 'dummy-token',
      userId: '1',
    },
  },
});

export const loginFailedMock = () => new GraphQLError('No such user found');

export const loginNoNetworkMock = () => ({
  networkError: true,
});

export const NewbieAvatarDetails = (variables?: QueryNewbieArgs) => ({
  request: {
    query: AVATAR_HEADER,
    variables,
  },
  result: {
    data: {
      newbie: {
        id: '1',
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
          id: '1234',
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
          id: '1234',
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

export const taskListResponse = (
  variables: Partial<QueryNewbieArgs>,
  newbie: Partial<Newbie>
) => [
  {
    request: {
      query: TASK_LIST,
      variables,
    },
    result: {
      data: {
        newbie,
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

export const newbieSelectMock = [
  {
    request: {
      query: NEWBIE_SELECT,
      variables: {
        buddyId: 'ck17sl83c9gya0b17dcvttzm4',
      },
    },
    result: {
      data: {
        buddy: {
          id: 'ck17sl83c9gya0b17dcvttzm4',
          name: 'Dummy',
          role: 'BUDDY',
          photo: null,
          newbies: [
            {
              id: 'ck17svulh9k2k0b17j31ansfk',
              photo: null,
              name: 'Test 2',
              position: 'Front End',
              startDate: null,
              tasksInfo: { buddyProgress: 0.5 },
            },
            {
              id: 'ck17swp2m9kcv0b17we0ibrdn',
              photo: null,
              name: 'Test 1',
              position: 'Front End',
              startDate: null,
              tasksInfo: { buddyProgress: 0.6 },
            },
          ],
        },
      },
    },
  },
];

export const taskDetailsMock = [
  {
    request: {
      query: TASK_DETAILS,
      variables: {
        taskId: '1',
      },
    },
    result: {
      data: {
        task: {
          title: 'New task',
          description: 'New task',
          status: TaskStatus.Uncompleted,
          newbie: getBasicUserDetailsMock(),
        },
      },
    },
  },
];

export const addTaskSuccessMock = (
  variables?: Partial<MutationAddNewbieTaskArgs>,
  data?: Partial<AuthPayload>
) => ({
  request: {
    query: ADD_NEWBIE_TASK,
    variables: {
      newbieId: '1234',
      input: {
        title: 'Test task',
        description: '<h1>Hello world!</h1>',
      },
      ...variables,
    },
  },
  result: {
    data: {
      addNewbieTask: {
        id: 'ck3sw1h1mqkd90964u4675qo2',
        title: 'Test task',
        newbie: {
          id: '1',
          newbieTasks: [],
          tasksInfo: {
            buddyProgress: '0.5',
          },
        },
        ...data,
      },
    },
  },
});

export const addTaskFailedMock = (
  variables?: Partial<MutationAddNewbieTaskArgs>
) => ({
  request: {
    query: ADD_NEWBIE_TASK,
    variables: {
      newbieId: '1234',
      input: {
        title: 'Test task',
        description: '<h1>Hello world!</h1>',
      },
      ...variables,
    },
  },
  result: {
    errors: [new GraphQLError('No such user')],
  },
});
