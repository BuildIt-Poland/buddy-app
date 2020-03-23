interface AddTaskOptionsDictionary {
  OPTIONS: {
    ADD_TEMPLATE_PL: string;
    ADD_TEMPLATE_IN: string;
    ADD_TEMPLATE_US: string;
    ADD_TEMPLATE_UK_IE: string;
    ADD_TASK: string;
  };
  DIALOG: {
    MESSAGE: string;
  };
  SNACKBAR: {
    SUCCESS: string;
    ERROR: string;
  };
}

const TASK_OPTIONS_DICTIONARY: AddTaskOptionsDictionary = {
  OPTIONS: {
    ADD_TEMPLATE_PL: 'Add from template: PL',
    ADD_TEMPLATE_IN: 'Add from template: IN',
    ADD_TEMPLATE_US: 'Add from template: US',
    ADD_TEMPLATE_UK_IE: 'Add from template: UK/IE',
    ADD_TASK: 'Add a task',
  },
  DIALOG: {
    MESSAGE: 'Would you like to add batch of tasks related to the country template?',
  },
  SNACKBAR: {
    SUCCESS: 'Tasks from template were successfully added',
    ERROR: 'An error ocurred adding tasks from template',
  },
};

export default TASK_OPTIONS_DICTIONARY;
