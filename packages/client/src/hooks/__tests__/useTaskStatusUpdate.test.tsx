import React from 'react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { render, fireEvent, wait } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { NewbieTask } from '@buddy-app/schema';
import { uncompletedTask, TaskStatus } from '__mocks__';
import { UPDATE_TASK_STATUS } from 'graphql/update-task-status.graphql';
import useTaskStatusUpdate from '../useTaskStatusUpdate';

describe('Custom Hooks - useTaskStatusUpdate', () => {
  const newbieId = '1';
  const taskId = '1';
  const newbieType = 'Newbie';
  const taskType = 'NewbieTask';
  const typedNewbieId = `${newbieType}:${newbieId}`;
  const typedTaskId = `${taskType}:${taskId}`;

  const currentTask: NewbieTask = {
    ...uncompletedTask,
    id: taskId,
    __typename: taskType,
  };

  const updatedTask = {
    ...currentTask,
    status: TaskStatus.Completed,
    newbie: {
      id: newbieId,
      __typename: newbieType,
    },
  };

  const mutationMock = {
    request: {
      query: UPDATE_TASK_STATUS,
      variables: { taskId },
    },
    result: {
      data: {
        __typename: 'Mutation',
        updateTaskStatus: updatedTask,
      },
    },
  };

  const initialCacheState = {
    ROOT_QUERY: {
      [`newbie({"newbieId":"${newbieId}"})`]: {
        type: 'id',
        generated: false,
        id: typedNewbieId,
        typename: newbieType,
      },
    },
    [typedNewbieId]: {
      id: newbieId,
      __typename: newbieType,
      newbieTasks: [
        {
          type: 'id',
          generated: false,
          id: typedTaskId,
          typename: taskType,
        },
      ],
      buddyTasks: [],
    },
    [typedTaskId]: currentTask,
  };

  const cache = new InMemoryCache().restore(initialCacheState);

  const TestComponent = () => {
    const [updateTaskStatus] = useTaskStatusUpdate(newbieId);
    return (
      <div data-testid='test-button' onClick={() => updateTaskStatus(currentTask)} />
    );
  };

  const { getByTestId } = render(
    <MockedProvider cache={cache} mocks={[mutationMock]}>
      <TestComponent />
    </MockedProvider>
  );

  fireEvent.click(getByTestId('test-button'));

  test('should update task status properly', async () => {
    await wait(() => {
      const updatedCache = cache.extract();
      const status = updatedCache[typedTaskId].status;
      expect(status).toBe(TaskStatus.Completed);
    });
  });
});
