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
  'No such user found': string;
  SERVICE_ERROR?: string;
  NO_NETWORK: string;
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
  'No such user found':
    'The email and password you entered did not match our records. \n Please double-check and try again.',
  NO_NETWORK: 'Please verify your internet connection',
};

export default DICTIONARY;
