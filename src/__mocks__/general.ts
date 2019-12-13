import { ROUTES } from 'shared/routes';
import { UserRole, TaskStatus, Newbie } from 'buddy-app-schema';

export const mockLocation = (path: string = ROUTES.BASE) => ({
  key: 'utwyk7',
  pathname: path,
});

export const getBasicUserDetailsMock = (role: UserRole = UserRole.Buddy) => ({
  id: '1234',
  name: 'Tom Hanks',
  position: 'Dev Ops',
  startDate: '2010-01-01',
  email: 'tom@wipro.com',
  phoneNumber: '1234567',
  photo: 'some-url',
  notes: 'Nice guy',
  role,
});

export const newbieTasksListMock = {
  id: '33',
  buddyTasks: [
    {
      id: '1',
      description: 'New task description',
      status: TaskStatus.Uncompleted,
      title: 'New task title ',
    },
    {
      id: '2',
      description: 'New task description 2',
      status: TaskStatus.Completed,
      title: 'New task title 2',
    },
  ],
  newbieTasks: [
    {
      id: '3',
      description: 'New task description',
      status: TaskStatus.Completed,
      title: 'New task title ',
    },
    {
      id: '4',
      description: 'New task description 2',
      status: TaskStatus.Completed,
      title: 'New task title 2',
    },
  ],
} as Newbie;
