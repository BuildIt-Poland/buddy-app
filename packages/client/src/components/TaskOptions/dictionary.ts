interface TaskOptionsDictionary {
  OPTIONS: {
    EDIT: string;
    COPY_LINK: string;
    DELETE: string;
  };
  COPY_LINK: {
    MESSAGE: string;
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

const TASK_OPTIONS_DICTIONARY: TaskOptionsDictionary = {
  OPTIONS: {
    EDIT: 'Edit',
    COPY_LINK: 'Copy link',
    DELETE: 'Delete',
  },
  COPY_LINK: {
    MESSAGE: 'Link has been coppied to clipboard',
  },
  DELETE_DIALOG: {
    TITLE: 'Delete Task',
    MESSAGE: 'Would you like to delete this task?',
  },
  DELETE_SNACKBAR: {
    SUCCESS: 'Task was successfully deleted',
    ERROR: 'An error ocurred deleting task',
  },
};

export default TASK_OPTIONS_DICTIONARY;
