interface ForgotPasswordDictionary {
  TITLE: string;
  SUBMIT: string;
  PASSWORD: {
    LABEL1: string;
    LABEL2: string;
    REQUIRED: string;
    INVALID: string;
    NOT_MATCH: string;
  };
  DIALOG: {
    SUCCESS_TITLE: string;
    SUCCESS_MSG: string;
  };
  ERRORS: {
    NO_USER_FOUND: string;
    NO_NETWORK: string;
  };
}

const DICTIONARY: ForgotPasswordDictionary = {
  TITLE: 'Buddy',
  SUBMIT: 'Submit',
  PASSWORD: {
    LABEL1: 'New password',
    LABEL2: 'Confirm password',
    REQUIRED: 'Password is required',
    INVALID: 'Passwords must be at least 8 characters',
    NOT_MATCH: 'This field should match your password',
  },
  DIALOG: {
    SUCCESS_TITLE: 'Confirmation',
    SUCCESS_MSG:
      'Your password was changed successfully. \nPlease proceed with login step',
  },
  ERRORS: {
    NO_USER_FOUND: `Sorry there's no such user in the system`,
    NO_NETWORK:
      'Could not connect to the server. \n Please verify your internet connection.',
  },
};

export default DICTIONARY;
