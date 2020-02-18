import { MutationHookOptions, useMutation } from '@apollo/react-hooks';
import { MutationResult } from '@apollo/react-common';
import { Mutation, Newbie, Query } from '@buddy-app/schema';
import { DELETE_TASK } from 'graphql/delete-task.graphql';
import { TASK_LIST } from 'graphql/task-list.graphql';

type TaskDeleteHook = [(taskId: string) => void, MutationResult];

const useTaskDelete = (
  newbieId: string,
  mutationOptions?: MutationHookOptions
): TaskDeleteHook => {
  const [mutation, mutationResult] = useMutation<Partial<Mutation>>(
    DELETE_TASK,
    mutationOptions
  );
  const { client } = mutationResult;

  const deleteTask = (taskId: string) => {
    try {
      if (client) {
        const taskListData: Query | null = client.readQuery({
          query: TASK_LIST,
          variables: { newbieId },
        });

        if (taskListData) {
          const { newbie } = taskListData;
          const { newbieTasks, buddyTasks } = newbie;
          const optimisticResult: Newbie = {
            ...newbie,
            newbieTasks: newbieTasks.filter(task => task && task.id !== taskId),
            buddyTasks: buddyTasks.filter(task => task && task.id !== taskId),
          };

          mutation({
            variables: { taskId },
            optimisticResponse: {
              deleteTask: optimisticResult,
            },
          });
        }
      }
    } catch (error) {}
  };

  return [deleteTask, mutationResult];
};

export default useTaskDelete;
