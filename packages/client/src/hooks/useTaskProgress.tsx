import { useMemo, useCallback } from 'react';
import { Newbie, Task } from '@buddy-app/schema';
import { isCompleted } from 'utils';

interface TaskProgress {
  getBuddyProgress: (newbie: Newbie) => number;
  buddyProgress: number;
  newbieProgress: number;
}

const isCompletedTask = (task: Task | null) => task && isCompleted(task.status);

const transformNewbieProgress = (newbie?: Newbie): number => {
  if (newbie) {
    const tasks = newbie.newbieTasks;
    const tasksAmount = tasks.length;
    const tasksCompleted = tasks.filter(isCompletedTask).length;

    return tasksAmount ? tasksCompleted / tasksAmount : 0;
  } else {
    return 0;
  }
};

const transformBuddyProgress = (newbie?: Newbie): number => {
  if (newbie) {
    const tasksNewbie = newbie.newbieTasks;
    const tasksBuddy = newbie.buddyTasks;
    const tasksAmount = tasksNewbie.length + tasksBuddy.length;
    const newbieTasksCompleted = tasksNewbie.filter(isCompletedTask).length;
    const buddyTasksCompleted = tasksBuddy.filter(isCompletedTask).length;

    return tasksAmount
      ? (newbieTasksCompleted + buddyTasksCompleted) / tasksAmount
      : 0;
  } else {
    return 0;
  }
};

const useTaskProgress = (newbie?: Newbie): TaskProgress => {
  const getBuddyProgress = useCallback(newbie => transformBuddyProgress(newbie), []);
  const buddyProgress = useMemo(() => transformBuddyProgress(newbie), [newbie]);
  const newbieProgress = useMemo(() => transformNewbieProgress(newbie), [newbie]);

  return {
    getBuddyProgress,
    buddyProgress,
    newbieProgress,
  };
};

export default useTaskProgress;
