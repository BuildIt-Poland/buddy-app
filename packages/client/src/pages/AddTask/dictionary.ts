import { Dictionary } from 'components/TaskForm';

interface AddTask extends Dictionary {
  ADD_TASK_TITLE: string;
  SUCCESS_MESSAGE: string;
  ERROR_MESSAGE: string;
}

const DICTIONARY: AddTask = {
  ADD_TASK_TITLE: 'New Task',
  BUTTON_TEXT: 'Add',
  SUCCESS_MESSAGE: 'Task was added successfully',
  ERROR_MESSAGE: 'An error ocurred adding task',
  TITLE: {
    LABEL: 'Title',
    REQUIRED: 'Title is required',
  },
  DESCRIPTION: {
    LABEL: 'Description',
    HELPER_TEXT: 'HTML syntax is accepted',
    REQUIRED: 'Description is required',
  },
};

export default DICTIONARY;
