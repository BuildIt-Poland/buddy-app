import { Dictionary } from 'components/TaskForm';

interface EditTask extends Dictionary {
  EDIT_TASK_TITLE: string;
  SUCCESS_MESSAGE: string;
  ERROR_MESSAGE: string;
}

const DICTIONARY: EditTask = {
  EDIT_TASK_TITLE: 'Edit Task',
  BUTTON_TEXT: 'Update',
  SUCCESS_MESSAGE: 'Task was updated successfully',
  ERROR_MESSAGE: 'An error ocurred updating task',
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
