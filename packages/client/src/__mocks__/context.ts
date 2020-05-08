import { AuthState } from 'contexts/AuthContext';
import { UserRole } from '.';

export const mockedTalentContext = (context?: Partial<AuthState>) => ({
  isAuthenticated: true,
  loading: false,
  data: {
    role: UserRole.Talent,
    token: 'token',
    userId: '1234',
  },
  ...context,
});

export const mockedBuddyContext = (context?: Partial<AuthState>) => ({
  isAuthenticated: true,
  loading: false,
  data: {
    role: UserRole.Buddy,
    token: 'token',
    userId: '1234',
  },
  ...context,
});

export const mockedNewbieContext = (context?: Partial<AuthState>) => ({
  isAuthenticated: true,
  loading: false,
  data: {
    role: UserRole.Newbie,
    token: 'token',
    userId: '1234',
  },
  ...context,
});
