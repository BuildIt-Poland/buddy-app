interface Dictionary {
  TITLES: {
    NEWBIE: string;
    BUDDY: string;
    TALENT: string;
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
  DIALOG: {
    SUCCESS_MSG: 'New user has been successfully created',
    ERROR_MSG: 'An error ocurred adding new user',
  },
};

export default DICTIONARY;
