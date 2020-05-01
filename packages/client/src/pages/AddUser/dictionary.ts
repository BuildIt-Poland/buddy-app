interface Dictionary {
  TITLES: {
    NEWBIE: string;
    BUDDY: string;
    TALENT: string;
  };
  SUBMIT: string;
  EMAIL: {
    LABEL: string;
    REQUIRED: string;
    INVALID: string;
  };
  NAME: {
    LABEL: string;
    REQUIRED: string;
  };
  POSITION: {
    LABEL: string;
  };
  PHONE: {
    LABEL: string;
  };
  START_DATE: {
    LABEL: string;
  };
  PHOTO: {
    LABEL: string;
  };
  DIALOG: {
    SUCCESS_MSG: string;
    ERROR_MSG: string;
  };
}

const DICTIONARY: Dictionary = {
  TITLES: {
    NEWBIE: 'Add New Joiner',
    BUDDY: 'Add New Buddy',
    TALENT: 'Add New Talent',
  },
  SUBMIT: 'Submit',
  EMAIL: {
    LABEL: 'Email Address *',
    REQUIRED: 'Email address is required',
    INVALID: 'Please enter a valid email',
  },
  NAME: {
    LABEL: 'Full Name *',
    REQUIRED: 'Full Name is required',
  },
  POSITION: {
    LABEL: 'Position (Role)',
  },
  PHONE: {
    LABEL: 'Phone Number',
  },
  PHOTO: {
    LABEL: 'Photo Link',
  },
  START_DATE: {
    LABEL: 'Start Date',
  },
  DIALOG: {
    SUCCESS_MSG: 'New user has been successfully created',
    ERROR_MSG: 'An error ocurred adding new user',
  },
};

export default DICTIONARY;
