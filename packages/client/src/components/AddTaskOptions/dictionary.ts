interface AddTaskOptionsDictionary {
  OPTIONS: {
    ADD_TEMPLATE_PL: string;
    ADD_TEMPLATE_ID: string;
    ADD_TEMPLATE_US: string;
    ADD_TEMPLATE_UK_IE: string;
    ADD_TASK: string;
  };
  DELETE_DIALOG: {
    TITLE: string;
    MESSAGE: string;
  };
  DELETE_SNACKBAR: {
    SUCCESS: string;
    ERROR: string;
  };
}

const TASK_OPTIONS_DICTIONARY: AddTaskOptionsDictionary = {
  OPTIONS: {
    ADD_TEMPLATE_PL: 'Add from template: PL',
    ADD_TEMPLATE_ID: 'Add from template: ID',
    ADD_TEMPLATE_US: 'Add from template: US',
    ADD_TEMPLATE_UK_IE: 'Add from template: UK/IE',
    ADD_TASK: 'Add a task',
  },
  DELETE_DIALOG: {
    TITLE: 'Delete Task',
    MESSAGE: 'Are you sure you want to delete this task?',
  },
  DELETE_SNACKBAR: {
    SUCCESS: 'Task was successfully deleted',
    ERROR: 'An error ocurred deleting task',
  },
};

export default TASK_OPTIONS_DICTIONARY;
