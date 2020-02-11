import { Task } from '@buddy-app/schema';
import { CheckboxProps } from '../TaskCheckbox';
import { TaskOptions } from '../TaskOptions';

export interface TasksSubListProps extends CheckboxProps, TaskOptions {
  tasks: Task[];
  tabIndex?: number;
  title?: string;
}
