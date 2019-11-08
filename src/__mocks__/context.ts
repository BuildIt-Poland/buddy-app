import { AuthContextData } from 'context/AuthStore';

export const authContext = (context?: Partial<AuthContextData>) => ({
  data: { role: 'BUDDY', token: 'dummy-token', userId: '1' },
  loading: false,
  error: null,
  isAuthenticated: true,
  login: jest.fn(),
  logout: jest.fn(),
  ...context,
});
