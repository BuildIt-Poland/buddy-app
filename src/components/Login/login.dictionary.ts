interface LOGIN_DICTIONARY {
  TITLE: string;
  FORGOT_PASSWORD: string;
  SIGN_IN: string;
  EMAIL: {
    LABEL: string;
    REQUIRED: string;
    INVALID: string;
  };
  PASSWORD: {
    REQUIRED: string;
    LABEL: string;
  };
  SERVICE_ERROR: string;
}

const DICTIONARY: LOGIN_DICTIONARY = {
  TITLE: 'Buddy',
  FORGOT_PASSWORD: 'Forgot password?',
  SIGN_IN: 'Sign In',
  EMAIL: {
    LABEL: 'Email Address',
    REQUIRED: 'Email address is required',
    INVALID: 'Please enter a valid email',
  },
  PASSWORD: {
    LABEL: 'Password',
    REQUIRED: 'Password is required',
  },
  SERVICE_ERROR:
    'The email and password you entered did not match our records. Please double-check and try again.',
};

export default DICTIONARY;
