interface TaskListDictionary {
  NO_TASKS_TITLE: string;
  NO_TASKS_SUBTITLE: string;
  TASK_STATUS_UPDATED: string;
  TASK_UPDATE_SERVER_ERROR: string;
}

const TASK_LIST_DICTIONARY: TaskListDictionary = {
  NO_TASKS_TITLE: 'No Tasks Found',
  NO_TASKS_SUBTITLE: 'You can always add a new task',
  TASK_STATUS_UPDATED: 'Task status updated',
  TASK_UPDATE_SERVER_ERROR: 'An error ocurred updating task.',
};

export default TASK_LIST_DICTIONARY;
