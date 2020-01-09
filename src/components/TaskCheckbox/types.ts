import { TaskStatus } from 'buddy-app-schema';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

export interface CheckboxProps {
  onChange?: (id: string) => void;
}
export interface TaskCheckboxProps extends CheckboxProps {
  id: string;
  size?: SvgIconProps['fontSize'];
  title?: string;
  status: TaskStatus;
}
