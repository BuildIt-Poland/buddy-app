import { Task } from 'buddy-app-schema';
import { CheckboxProps } from '../TaskCheckbox';
import { TaskOptions } from '../TaskOptions';

export interface TaskTabsContentProps extends CheckboxProps, TaskOptions {
  tasks: Task[] | undefined;
  loading: Boolean;
  tabIndex?: number;
}

export interface TransformedTasks {
  uncompletedTasks: Task[];
  completedTasks: Task[];
}
