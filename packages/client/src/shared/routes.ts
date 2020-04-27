enum ROUTES {
  BASE = '/',
  LOGIN = '/login',
  FORGOT_PASSWORD = '/forgot-password',
  RESET_PASSWORD = '/reset-password/:token',
  ROUTE_404 = '/404',

  TALENT = '/talent',
  TALENT_SELECT_BUDDY = '/talent/buddies',
  TALENT_SELECT_NEWBIE = '/talent/buddies/:buddyId/newbies',
  TALENT_ADD_TASK = '/talent/newbies/:newbieId/add-task',
  TALENT_TASK_DETAILS = '/talent/newbies/:newbieId/tasks/:taskId',
  TALENT_TASKS_LIST = '/talent/newbies/:newbieId/tasks',
  TALENT_ADD_NEWBIE = '/talent/buddies/:buddyId/add-newbie',
  TALENT_ADD_BUDDY = '/talent/add-buddy',
  TALENT_ADD_TALENT = '/talent/add-talent',
  TALENT_DETAILS = '/talent/details',
  TALENT_BUDDY_DETAILS = '/talent/buddies/:buddyId/details',
  TALENT_NEWBIE_DETAILS = '/talent/newbies/:newbieId/details',

  BUDDY = '/buddy/',
  BUDDY_DETAILS = '/buddy/details',
  BUDDY_ADD_TASK = '/buddy/newbies/:newbieId/add-task',
  BUDDY_TASK_DETAILS = '/buddy/newbies/:newbieId/tasks/:taskId',
  BUDDY_TASKS_LIST = '/buddy/newbies/:newbieId/tasks',
  BUDDY_SELECT_NEWBIE = '/buddy/newbies',
  BUDDY_ADD_NEWBIE = '/buddy/add-newbie',
  BUDDY_NEWBIE_DETAILS = '/buddy/newbies/:newbieId/details',

  NEWBIE = '/newbie',
  NEWBIE_DETAILS = '/newbie/details',
  NEWBIE_TASKS_LIST = '/newbie/tasks',
  NEWBIE_TASK_DETAILS = '/newbie/tasks/:taskId',
  NEWBIE_BUDDY_DETAILS = '/newbie/buddy/:buddyId/details',
}

export { ROUTES };
