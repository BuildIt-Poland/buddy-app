import { TaskCheckboxProps } from '../TaskCheckbox';
import { TaskOptions } from '../TaskOptions';

export interface TaskListItemProps extends TaskCheckboxProps, TaskOptions {
  tabIndex?: number;
}
