import { Task } from 'buddy-app-schema';
import { CheckboxProps } from '../TaskCheckbox';

export interface TaskTabsContentProps extends CheckboxProps {
  tasks: Task[] | undefined;
  loading: Boolean;
}

export interface TransformedTasks {
  uncompletedTasks: Task[];
  completedTasks: Task[];
}
