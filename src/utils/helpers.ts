import { UserRole, TaskStatus } from 'buddy-app-schema';
import { Direction } from '@material-ui/core/styles';

export const isNewbie = (role: UserRole) => role === UserRole.Newbie;
export const isBuddy = (role: UserRole) => role === UserRole.Buddy;
export const isCompleted = (status: TaskStatus) => status === TaskStatus.Completed;
export const isNewbieTask = (type?: string) => type === 'NewbieTask';
export const getProgressInPercentages = (progress: number) =>
  Math.round(progress * 100);

export const convertDirectionToAnchor = (direction: Direction): 'left' | 'right' => {
  switch (direction) {
    case 'rtl':
      return 'right';
    case 'ltr':
      return 'left';
  }
};

export const changeTaskStatus = (status: TaskStatus): TaskStatus =>
  status === TaskStatus.Completed ? TaskStatus.Uncompleted : TaskStatus.Completed;
