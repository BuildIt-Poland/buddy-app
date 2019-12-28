import { AuthContextData } from 'contexts/AuthContext';

export const authContext = (context?: Partial<AuthContextData>) => ({
  data: { role: 'BUDDY', token: 'dummy-token', userId: '1234' },
  loading: false,
  error: null,
  isAuthenticated: true,
  login: jest.fn(),
  logout: jest.fn(),
  ...context,
});
