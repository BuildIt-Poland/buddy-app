interface Dictionary {
  BUTTON_TEXT: string;
  TITLE: {
    LABEL: string;
    REQUIRED: string;
  };
  DESCRIPTION: {
    LABEL: string;
    HELPER_TEXT: string;
    REQUIRED: string;
  };
}

const DICTIONARY: Dictionary = {
  BUTTON_TEXT: 'Submit',
  TITLE: {
    LABEL: 'Title',
    REQUIRED: 'Title is required',
  },
  DESCRIPTION: {
    LABEL: 'Description',
    HELPER_TEXT: 'HTML syntax is accepted',
    REQUIRED: 'Description is required',
  },
};

export default DICTIONARY;
