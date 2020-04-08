interface ForgotPasswordDictionary {
  TITLE: string;
  TO_LOGIN: string;
  SUBMIT: string;
  EMAIL: {
    LABEL: string;
    REQUIRED: string;
    INVALID: string;
  };
  DIALOG: {
    SUCCESS_TITLE: string;
    SUCCESS_MSG: string;
  };
  ERRORS: {
    NO_NETWORK: string;
  };
}

const DICTIONARY: ForgotPasswordDictionary = {
  TITLE: 'Buddy',
  TO_LOGIN: 'Back to login',
  SUBMIT: 'Submit',
  EMAIL: {
    LABEL: 'Email Address',
    REQUIRED: 'Email address is required',
    INVALID: 'Please enter a valid email',
  },
  DIALOG: {
    SUCCESS_TITLE: 'Confirmation',
    SUCCESS_MSG:
      'The email has been sent successfully. \nPlease check your account for a password reset link',
  },
  ERRORS: {
    NO_NETWORK:
      'Could not connect to the server. \n Please verify your internet connection.',
  },
};

export default DICTIONARY;
