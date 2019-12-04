interface AddTask {
  ADD_TASK_TITLE: string;
  BUTTON_TEXT: string;
  ADD_TASK_PERVIEW: string;
  SUCCESS_MESSAGE: string;
  ERROR_MESSAGE: string;
  TITLE: {
    LABEL: string;
    REQUIRED: string;
  };
  DESCRIPTION: {
    LABEL: string;
    REQUIRED: string;
  };
}

const DICTIONARY: AddTask = {
  ADD_TASK_TITLE: 'New Task',
  BUTTON_TEXT: 'Add',
  ADD_TASK_PERVIEW: 'Perview',
  SUCCESS_MESSAGE: 'Task was added successfully',
  ERROR_MESSAGE: 'An error ocurred adding task',
  TITLE: {
    LABEL: 'Title',
    REQUIRED: 'Title is required',
  },
  DESCRIPTION: {
    LABEL: 'Description (HTML syntax is accepted)',
    REQUIRED: 'Description is required',
  },
};

export default DICTIONARY;
