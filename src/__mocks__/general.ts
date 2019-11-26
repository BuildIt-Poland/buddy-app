import { ROUTES } from 'shared/routes';
import { UserRole } from 'buddy-app-schema';

export const mockLocation = (path: string = ROUTES.BASE) => ({
  key: 'utwyk7',
  pathname: path,
});

export const mockBasicUserDetails = {
  name: 'Tom Hanks',
  position: 'Dev Ops',
  startDate: '2010-01-01',
  email: 'tom@wipro.com',
  phoneNumber: '1234567',
  notes: 'Nice guy',
  role: UserRole.Newbie,
};
