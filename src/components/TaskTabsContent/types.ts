import { Task } from 'buddy-app-schema';
import { CheckboxProps } from '../TaskCheckbox';

export interface TaskTabsContentProps extends CheckboxProps {
  tasks: Task[] | undefined;
  loading: Boolean;
  tabIndex: number;
}

export interface TransformedTasks {
  uncompletedTasks: Task[];
  completedTasks: Task[];
}
