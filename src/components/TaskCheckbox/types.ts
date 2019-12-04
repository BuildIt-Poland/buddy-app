import { TaskStatus } from 'buddy-app-schema';

export interface CheckboxProps {
  onChange?: (id: string) => void;
}
export interface TaskCheckboxProps extends CheckboxProps {
  id: string;
  newbieId?: string;
  className?: string;
  title?: string;
  status: TaskStatus;
}
