import { MutationHookOptions, useMutation } from '@apollo/react-hooks';
import { MutationResult } from '@apollo/react-common';
import {
  Query,
  Task,
  Mutation,
  NewbieTask,
  BuddyTask,
  Newbie,
} from 'buddy-app-schema';
import { TASK_LIST } from 'graphql/task-list.graphql';
import { UPDATE_TASK_STATUS } from 'graphql/update-task-status.graphql';
import { changeTaskStatus, isNewbieTask } from 'utils';

type TaskStatusUpdate = [(task: NewbieTask | BuddyTask) => void, MutationResult];

const useTaskStatusUpdate = (
  newbieId: string,
  mutationOptions?: MutationHookOptions
): TaskStatusUpdate => {
  const [mutation, mutationResult] = useMutation<Partial<Mutation>>(
    UPDATE_TASK_STATUS,
    mutationOptions
  );

  const updateTaskStatus = (task: NewbieTask | BuddyTask) => {
    const taskListType = isNewbieTask(task.__typename)
      ? 'newbieTasks'
      : 'buddyTasks';

    mutation({
      variables: { taskId: task.id },
      optimisticResponse: {
        updateTaskStatus: {
          ...task,
          status: changeTaskStatus(task.status),
          newbie: {
            id: newbieId,
            __typename: 'Newbie',
          } as Newbie,
        },
      },
      update: (proxy, { data }) => {
        const taskListData: Query | null = proxy.readQuery({
          query: TASK_LIST,
          variables: { newbieId },
        });

        if (data && data.updateTaskStatus && taskListData) {
          const newbie = taskListData.newbie;
          const taskList = newbie[taskListType] as Task[];

          proxy.writeQuery({
            query: TASK_LIST,
            variables: { newbieId },
            data: {
              ...data,
              newbie: {
                ...newbie,
                [taskListType]: taskList.map(item =>
                  item.id === task.id ? data.updateTaskStatus : item
                ),
              },
            },
          });
        }
      },
    });
  };

  return [updateTaskStatus, mutationResult];
};

export default useTaskStatusUpdate;
