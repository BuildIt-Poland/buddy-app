import { TaskInput, Task } from '@buddy-app/schema';

export interface Dictionary {
  BUTTON_TEXT: string;
  TITLE: {
    LABEL: string;
    REQUIRED: string;
  };
  DESCRIPTION: {
    LABEL: string;
    HELPER_TEXT: string;
    REQUIRED: string;
  };
}

export interface TaskFormProps {
  dictionary: Dictionary;
  loading: boolean;
  data?: Task;
  onSubmit: (input: TaskInput) => void;
}
