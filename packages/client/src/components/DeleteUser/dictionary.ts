interface Dictionary {
  DELETE_DIALOG: {
    TITLE: string;
    MESSAGE: string;
  };
  DELETE_SNACKBAR: {
    SUCCESS: string;
    ERROR: string;
  };
}

const DICTIONARY: Dictionary = {
  DELETE_DIALOG: {
    TITLE: 'Delete User',
    MESSAGE: `Are you sure you want to delete this user?
    All linked instances will be deleted as well.
    This action cannot be undone!`,
  },
  DELETE_SNACKBAR: {
    SUCCESS: 'User was successfully deleted',
    ERROR: 'An error ocurred deleting user',
  },
};

export default DICTIONARY;
