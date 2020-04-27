interface NewbieSelect {
  REGULAR: {
    TITLE: string;
    SUBTITLE: string;
  };
  TEMPLATE: {
    TITLE: string;
    SUBTITLE: string;
  };
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
};

export default DICTIONARY;
