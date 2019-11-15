import { ROUTES } from 'shared/routes';

export const mockLocation = (path: string = ROUTES.BASE) => ({
  key: 'utwyk7',
  pathname: path,
});

export const mockSchemaTypes = (types: any = {}) => ({
  UserRole: {
    Newbie: 'NEWBIE',
    Buddy: 'BUDDY',
  },
  TaskStatus: {
    Completed: 'COMPLETED',
    Uncompleted: 'UNCOMPLETED',
  },
  ...types,
});
