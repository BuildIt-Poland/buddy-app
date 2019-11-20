import { Task } from 'buddy-app-schema';
import { CheckboxProps } from '../TaskCheckbox';

export interface TasksStatusListProps extends CheckboxProps {
  tasks: Task[];
  title: string;
  count: number;
}
