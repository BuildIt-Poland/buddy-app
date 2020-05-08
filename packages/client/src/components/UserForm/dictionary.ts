interface Dictionary {
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
  NOTES: {
    LABEL: string;
  };
}

const DICTIONARY: Dictionary = {
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
  NOTES: {
    LABEL: 'Notes',
  },
};

export default DICTIONARY;
