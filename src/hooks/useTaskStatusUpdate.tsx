import { useRef } from 'react';
import { MutationHookOptions, useMutation } from '@apollo/react-hooks';
import { MutationResult } from '@apollo/react-common';
import { Task, NewbieTask, BuddyTask, Newbie } from 'buddy-app-schema';
import { UPDATE_TASK } from 'graphql/update-task.graphql';
import { changeTaskStatus } from 'utils';

type TaskStatusUpdateHook = [(task: NewbieTask | BuddyTask) => void, MutationResult];

type AbortControllers = {
  [id: string]: AbortController;
};

interface UpdateTaskResponse extends Task {
  optimistic?: boolean;
}
interface UpdateTaskMutation {
  updateTask: UpdateTaskResponse;
}

const useTaskStatusUpdate = (
  newbieId: string,
  mutationOptions?: MutationHookOptions
): TaskStatusUpdateHook => {
  const abortControllers = useRef<AbortControllers>({});
  const [mutation, mutationResult] = useMutation<UpdateTaskMutation>(
    UPDATE_TASK,
    mutationOptions
  );
  const { client } = mutationResult;

  const updateTaskStatus = (task: NewbieTask | BuddyTask) => {
    const status = changeTaskStatus(task.status);
    const controller = new window.AbortController();
    const prevController = abortControllers.current[task.id];

    prevController && prevController.abort();
    abortControllers.current[task.id] = controller;

    mutation({
      variables: { taskId: task.id, input: { status } },
      context: { fetchOptions: { signal: controller.signal } },
      optimisticResponse: {
        updateTask: {
          ...task,
          optimistic: true,
          status,
          newbie: {
            id: newbieId,
            __typename: 'Newbie',
          } as Newbie,
        },
      },
      update: (proxy, { data }) => {
        if (data && !data.updateTask.optimistic) {
          if (client && prevController) {
            const { store }: any = client.queryManager.mutationStore;
            Object.keys(store).forEach(key => {
              if (store[key].loading && store[key].variables.taskId === task.id) {
                client.queryManager.stopQuery(key);
                client.queryManager.removeQuery(key);
                client.cache.removeOptimistic(key);
              }
            });
          }
          delete abortControllers.current[task.id];
        }
      },
    });
  };

  return [updateTaskStatus, mutationResult];
};

export default useTaskStatusUpdate;
