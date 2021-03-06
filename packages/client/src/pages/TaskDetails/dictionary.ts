interface TaskDetails {
  COMPLETED: string;
  UNCOMPLETED: string;
  SUCCESS_MESSAGE: string;
  ERROR_MESSAGE: string;
  TEMPLATE_MESSAGE: string;
  EDIT_BUTTON_TITLE: string;
}

const DICTIONARY: TaskDetails = {
  COMPLETED: 'Completed',
  UNCOMPLETED: 'Uncompleted',
  SUCCESS_MESSAGE: 'Task status updated',
  ERROR_MESSAGE: 'An error ocurred updating task',
  TEMPLATE_MESSAGE: 'Task status is static for templates',
  EDIT_BUTTON_TITLE: 'Update task details',
};

export default DICTIONARY;
