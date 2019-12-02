interface TaskListDictionary {
  TASK_STATUS_UPDATED: string;
  TASK_UPDATE_SERVER_ERROR: string;
}

const TASK_LIST_DICTIONARY: TaskListDictionary = {
  TASK_STATUS_UPDATED: 'Task status updated',
  TASK_UPDATE_SERVER_ERROR: 'An error ocurred updating task.',
};

export default TASK_LIST_DICTIONARY;
