interface Dictionary {
  TITLE: string;
  DIALOG: {
    SUCCESS_MSG: string;
    ERROR_MSG: string;
  };
}

const DICTIONARY: Dictionary = {
  TITLE: 'Update Contact Details',
  DIALOG: {
    SUCCESS_MSG: 'Contact details have been successfully updated',
    ERROR_MSG: 'An error ocurred updating contact details',
  },
};

export default DICTIONARY;
