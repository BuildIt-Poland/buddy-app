import { useMemo, useCallback } from 'react';
import { Newbie } from 'buddy-app-schema';
import { isCompleted } from 'utils';

interface TaskProgress {
  getBuddyProgress: (newbie: Newbie) => number;
  buddyProgress: number;
  newbieProgress: number;
}

const transformNewbieProgress = (newbie?: Newbie): number => {
  if (newbie) {
    const tasks = newbie.newbieTasks;
    const tasksAmount = tasks.length;
    const tasksCompleted = tasks.filter(task => task && isCompleted(task.status))
      .length;

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
    const newbieTasksCompleted = tasksNewbie.filter(
      task => task && isCompleted(task.status)
    ).length;
    const buddyTasksCompleted = tasksBuddy.filter(
      task => task && isCompleted(task.status)
    ).length;

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
