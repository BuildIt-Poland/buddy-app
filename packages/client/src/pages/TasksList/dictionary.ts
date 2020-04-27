interface TaskListDictionary {
  BUDDY_TAB_TITLE: string;
  NEWBIE_TAB_TITLE: string;
  SUCCESS_MESSAGE: string;
  ERROR_MESSAGE: string;
  TEMPLATE_MESSAGE: string;
  PLUS_BUTTON_TITLE: string;
}

const TASK_LIST_DICTIONARY: TaskListDictionary = {
  BUDDY_TAB_TITLE: 'My tasks',
  NEWBIE_TAB_TITLE: 'Newbie tasks',
  SUCCESS_MESSAGE: 'Task status updated',
  ERROR_MESSAGE: 'An error ocurred updating task',
  TEMPLATE_MESSAGE: 'Task status is static for template tasks',
  PLUS_BUTTON_TITLE: 'Add new task',
};

export default TASK_LIST_DICTIONARY;
