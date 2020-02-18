import React from 'react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { render, fireEvent, wait } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { NewbieTask } from '@buddy-app/schema';
import { uncompletedTask } from '__mocks__';
import { DELETE_TASK } from 'graphql/delete-task.graphql';
import useTaskDelete from '../useTaskDelete';

describe('Custom Hooks - useTaskDelete', () => {
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

  const deleteTaskResult = {
    id: newbieId,
    __typename: newbieType,
    newbieTasks: [],
    buddyTasks: [],
  };

  const mutationMock = {
    request: {
      query: DELETE_TASK,
      variables: { taskId },
    },
    result: {
      data: {
        __typename: 'Mutation',
        deleteTask: deleteTaskResult,
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
    const [deleteTask] = useTaskDelete(newbieId);
    return (
      <div data-testid='test-button' onClick={() => deleteTask(currentTask.id)} />
    );
  };

  const { getByTestId } = render(
    <MockedProvider cache={cache} mocks={[mutationMock]}>
      <TestComponent />
    </MockedProvider>
  );

  fireEvent.click(getByTestId('test-button'));

  test('should delete task properly', async () => {
    await wait(() => {
      const updatedCache = cache.extract();
      const tasksLength = updatedCache[typedNewbieId].newbieTasks.length;
      expect(tasksLength).toBe(0);
    });
  });
});
