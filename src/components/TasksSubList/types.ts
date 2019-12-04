import { Task } from 'buddy-app-schema';
import { CheckboxProps } from '../TaskCheckbox';

export interface TasksSubListProps extends CheckboxProps {
  tasks: Task[];
  tabIndex: number;
  title?: string;
}
