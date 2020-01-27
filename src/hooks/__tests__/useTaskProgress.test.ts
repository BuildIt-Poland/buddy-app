import { renderHook } from '@testing-library/react-hooks';
import { TaskStatus, Newbie } from 'buddy-app-schema';
import useTaskProgress from '../useTaskProgress';

describe('Custom Hooks - useTaskProgress', () => {
  const newbieUncompletedTasksListMock = {
    id: '1',
    buddyTasks: [
      {
        id: '1',
        description: 'New task description',
        status: TaskStatus.Uncompleted,
        title: 'New task title ',
      },
    ],
    newbieTasks: [
      {
        id: '1',
        description: 'New task description',
        status: TaskStatus.Uncompleted,
        title: 'New task title ',
      },
    ],
  } as Newbie;

  const newbieCompletedTasksListMock = {
    id: '1',
    buddyTasks: [
      {
        id: '1',
        description: 'New task description',
        status: TaskStatus.Completed,
        title: 'New task title ',
      },
    ],
    newbieTasks: [
      {
        id: '1',
        description: 'New task description',
        status: TaskStatus.Completed,
        title: 'New task title ',
      },
    ],
  } as Newbie;

  const newbieHalfCompletedTasksListMock = {
    id: '1',
    buddyTasks: [
      {
        id: '1',
        description: 'New task description',
        status: TaskStatus.Completed,
        title: 'New task title ',
      },
      {
        id: '1',
        description: 'New task description',
        status: TaskStatus.Uncompleted,
        title: 'New task title ',
      },
    ],
    newbieTasks: [
      {
        id: '1',
        description: 'New task description',
        status: TaskStatus.Completed,
        title: 'New task title ',
      },
      {
        id: '1',
        description: 'New task description',
        status: TaskStatus.Uncompleted,
        title: 'New task title ',
      },
    ],
  } as Newbie;

  it('if no tasks are completed should return 0', () => {
    const {
      result: { current },
    } = renderHook(() => useTaskProgress(newbieUncompletedTasksListMock));
    const { getBuddyProgress, buddyProgress, newbieProgress } = current;
    const result = getBuddyProgress(newbieUncompletedTasksListMock);

    expect(result).toBe(0);
    expect(buddyProgress).toBe(0);
    expect(newbieProgress).toBe(0);
  });

  it('if all tasks are completed should return 1', () => {
    const {
      result: { current },
    } = renderHook(() => useTaskProgress(newbieCompletedTasksListMock));
    const { getBuddyProgress, buddyProgress, newbieProgress } = current;
    const result = getBuddyProgress(newbieCompletedTasksListMock);

    expect(result).toBe(1);
    expect(buddyProgress).toBe(1);
    expect(newbieProgress).toBe(1);
  });

  it('if 50% tasks are completed should return 0.5', () => {
    const {
      result: { current },
    } = renderHook(() => useTaskProgress(newbieHalfCompletedTasksListMock));
    const { getBuddyProgress, buddyProgress, newbieProgress } = current;
    const result = getBuddyProgress(newbieHalfCompletedTasksListMock);

    expect(result).toBe(0.5);
    expect(buddyProgress).toBe(0.5);
    expect(newbieProgress).toBe(0.5);
  });
});
