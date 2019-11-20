import { Task } from 'buddy-app-schema';
import { CheckboxProps } from '../TaskCheckbox';

export interface TaskTabsContentProps extends CheckboxProps {
  tasks: Task[];
  uncompletedCount?: number;
  completedCount?: number;
}

export interface TransformedTasks {
  uncompletedTasks: Task[];
  completedTasks: Task[];
}
