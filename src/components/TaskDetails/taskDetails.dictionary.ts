interface TaskDetails {
  SUCCESS_MESSAGE: string;
  ERROR_MESSAGE: string;
  COMPLETED: string;
  UNCOMPLETED: string;
}

const DICTIONARY: TaskDetails = {
  SUCCESS_MESSAGE: 'Task status updated',
  ERROR_MESSAGE: 'An error ocurred updating task',
  COMPLETED: 'Completed',
  UNCOMPLETED: 'Uncompleted',
};

export default DICTIONARY;
