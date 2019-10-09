enum ROUTES {
  BASE = '/',
  LOGIN = '/login',
  ERROR = '/404',
  BUDDY_ADD_TASK = '/buddy/add-task',
  BUDDY_TASK_DETAILS = '/buddy/tasks/:taskId',
  BUDDY_TASKS_LIST = '/buddy/tasks',
  BUDDY_SELECT_NEWBIE = '/buddy/select-newbie',
  BUDDY_ADD_NEWBIE = '/buddy/add-newbie',
  BUDDY_NEWBIE_DETAILS = '/buddy/newbie/:id/details',
  NEWBIE_TASK_DETAILS = '/newbie/tasks/:taskId',
  NEWBIE_TASKS_LIST = '/newbie/tasks',
}

export { ROUTES };
