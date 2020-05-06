import { TaskInput, Task } from '@buddy-app/schema';

export interface TaskFormProps {
  loading: boolean;
  data?: Task;
  onSubmit: (input: TaskInput) => void;
}
