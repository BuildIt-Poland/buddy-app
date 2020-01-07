import { AuthState } from 'contexts/AuthContext';
import { UserRole } from '.';

export const mockedBuddyContext: AuthState = {
  isAuthenticated: true,
  loading: false,
  data: {
    role: UserRole.Buddy,
    token: 'token',
    userId: '1234',
  },
};

export const mockedNewbieContext: AuthState = {
  isAuthenticated: true,
  loading: false,
  data: {
    role: UserRole.Newbie,
    token: 'token',
    userId: '1234',
  },
};
