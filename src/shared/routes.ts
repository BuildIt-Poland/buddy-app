enum ROUTES {
  BASE = '/',
  LOGIN = '/login',
  ROUTE_404 = '/404',
  BUDDY_ADD_TASK = '/buddy/newbies/:newbieId/add-task',
  BUDDY_TASK_DETAILS = '/buddy/newbies/:newbieId/tasks/:taskId',
  BUDDY_TASKS_LIST = '/buddy/newbies/:newbieId/tasks',
  BUDDY_SELECT_NEWBIE = '/buddy/newbies',
  BUDDY_ADD_NEWBIE = '/buddy/add-newbie',
  BUDDY_NEWBIE_DETAILS = '/buddy/newbies/:newbieId/details',
  NEWBIE_TASK_DETAILS = '/newbie/tasks/:taskId',
  NEWBIE_TASKS_LIST = '/newbie/tasks',
  NEWBIE_BUDDY_DETAILS = '/newbie/buddy/:buddyId/details',
}

export { ROUTES };
