interface TaskDetails {
  COMPLETED: string;
  UNCOMPLETED: string;
  SUCCESS_MESSAGE: string;
  ERROR_MESSAGE: string;
  TEMPLATE_MESSAGE: string;
}

const DICTIONARY: TaskDetails = {
  COMPLETED: 'Completed',
  UNCOMPLETED: 'Uncompleted',
  SUCCESS_MESSAGE: 'Task status updated',
  ERROR_MESSAGE: 'An error ocurred updating task',
  TEMPLATE_MESSAGE: 'Task status is static for template tasks',
};

export default DICTIONARY;
