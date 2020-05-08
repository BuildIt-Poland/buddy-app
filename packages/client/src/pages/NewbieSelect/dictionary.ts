interface NewbieSelect {
  REGULAR: {
    TITLE: string;
    SUBTITLE: string;
  };
  TEMPLATE: {
    TITLE: string;
    SUBTITLE: string;
  };
  PLUS_BUTTON_TITLE: string;
}

const DICTIONARY: NewbieSelect = {
  REGULAR: {
    TITLE: 'Your New Joiners',
    SUBTITLE: 'Don’t forget to complete all tasks',
  },
  TEMPLATE: {
    TITLE: 'Templates List',
    SUBTITLE: 'Here you can manage task templates for the regions',
  },
  PLUS_BUTTON_TITLE: 'Add New Joiner',
};

export default DICTIONARY;
