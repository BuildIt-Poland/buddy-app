interface TaskDetails {
  COMPLETED: string;
  UNCOMPLETED: string;
  SUCCESS_MESSAGE: string;
  ERROR_MESSAGE: string;
}

const DICTIONARY: TaskDetails = {
  COMPLETED: 'Completed',
  UNCOMPLETED: 'Uncompleted',
  SUCCESS_MESSAGE: 'Task status updated',
  ERROR_MESSAGE: 'An error ocurred updating task',
};

export default DICTIONARY;
