import { MutationHookOptions, useMutation } from '@apollo/react-hooks';
import { MutationResult } from '@apollo/react-common';
import { Mutation, Newbie, Query } from '@buddy-app/schema';
import { DELETE_TASK } from 'graphql/delete-task.graphql';
import { TASK_LIST } from 'graphql/task-list.graphql';
import { onCacheUpdate, CACHE_STORAGE_KEY } from 'utils/apollo-client/cache';
import { apolloClient as client, isNewbieTask, isBuddyTask } from 'utils';

type TaskDeleteHook = [(taskId: string) => void, MutationResult];

const useTaskDelete = (
  newbieId: string,
  mutationOptions?: MutationHookOptions
): TaskDeleteHook => {
  const [mutation, mutationResult] = useMutation<Partial<Mutation>>(
    DELETE_TASK,
    mutationOptions
  );

  const deleteTask = (taskId: string) => {
    try {
      let cache = localStorage.getItem(CACHE_STORAGE_KEY) || '';
      const taskListData: Query | null = client.readQuery({
        query: TASK_LIST,
        variables: { newbieId },
      });

      if (taskListData) {
        const { newbie } = taskListData;
        const { newbieTasks, buddyTasks } = newbie;
        const task =
          newbieTasks.find(task => task && task.id === taskId) ||
          buddyTasks.find(task => task && task.id === taskId);

        const optimisticResult: Newbie = {
          ...newbie,
          newbieTasks: newbieTasks.filter(task => task && task.id !== taskId),
          buddyTasks: buddyTasks.filter(task => task && task.id !== taskId),
        };

        onCacheUpdate(() => {
          if (cache) {
            localStorage.setItem(CACHE_STORAGE_KEY, cache);
            cache = '';
          }
        });

        client.writeQuery({
          query: TASK_LIST,
          variables: { newbieId },
          data: { newbie: optimisticResult },
        });

        mutation({
          variables: { taskId },
        }).then(resp => {
          if (!resp) {
            try {
              const data: Query | null = client.readQuery({
                query: TASK_LIST,
                variables: { newbieId },
              });
              data &&
                client.writeQuery({
                  query: TASK_LIST,
                  variables: { newbieId },
                  data: {
                    newbie: {
                      ...data.newbie,
                      newbieTasks: isNewbieTask(task?.__typename)
                        ? [...data.newbie.newbieTasks, task]
                        : data.newbie.newbieTasks,
                      buddyTasks: isBuddyTask(task?.__typename)
                        ? [...data.newbie.buddyTasks, task]
                        : data.newbie.buddyTasks,
                    },
                  },
                });
            } catch (error) {}
          }
        });
      }
    } catch (error) {}
  };

  return [deleteTask, mutationResult];
};

export default useTaskDelete;
