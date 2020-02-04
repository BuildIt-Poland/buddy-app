import { TaskStatus } from 'buddy-app-schema';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { IconButtonProps } from '@material-ui/core/IconButton';

export interface CheckboxProps {
  onChange?: (id: string) => void;
}
export interface TaskCheckboxProps extends CheckboxProps {
  id: string;
  size?: SvgIconProps['fontSize'];
  title?: string;
  status: TaskStatus;
  hasRipple?: boolean;
  edge?: IconButtonProps['edge'];
}
