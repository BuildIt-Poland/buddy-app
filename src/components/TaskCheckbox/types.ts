import { Task, NewbieTask, BuddyTask } from 'buddy-app-schema';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { IconButtonProps } from '@material-ui/core/IconButton';

export interface CheckboxProps {
  onChange?: (task: NewbieTask | BuddyTask) => void;
}
export interface TaskCheckboxProps extends CheckboxProps {
  task: Task;
  size?: SvgIconProps['fontSize'];
  hasRipple?: boolean;
  edge?: IconButtonProps['edge'];
}
