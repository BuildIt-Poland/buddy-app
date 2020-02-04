import { Task, NewbieTask, BuddyTask } from 'buddy-app-schema';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

export interface CheckboxProps {
  onChange?: (task: NewbieTask | BuddyTask) => void;
}
export interface TaskCheckboxProps extends CheckboxProps {
  task: Task;
  size?: SvgIconProps['fontSize'];
}
