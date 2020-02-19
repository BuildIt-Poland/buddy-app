import React from 'react';
import { render, wait, cleanup } from '@testing-library/react';
import { AuthProvider, AuthState } from 'contexts/AuthContext';
import { MockedProvider } from '@apollo/react-testing';
import { AuthPayload } from '@buddy-app/schema';
import App from '../App';

jest.mock('components/AuthenticatedApp', () => () => <div data-testid='app-auth' />);
jest.mock('components/NotAuthenticatedApp', () => () => (
  <div data-testid='app-not-auth' />
));

afterEach(cleanup);

describe('Component - App', () => {
  describe('When user is unauthorized user', () => {
    it('renders correctly the login page', async () => {
      const { getByTestId } = render(
        <MockedProvider mocks={[]} addTypename={false} resolvers={{}}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </MockedProvider>
      );
      expect(getByTestId('loader')).toBeInTheDocument();

      await wait();

      expect(getByTestId('app-not-auth')).toBeInTheDocument();
    });
  });

  describe('When user is authorized user', () => {
    const authorizedContext: AuthState = {
      isAuthenticated: true,
      data: {} as AuthPayload,
      error: null,
      loading: false,
    };

    it('renders correctly home page', async () => {
      const { getByTestId } = render(
        <MockedProvider mocks={[]} addTypename={false} resolvers={{}}>
          <AuthProvider value={authorizedContext}>
            <App />
          </AuthProvider>
        </MockedProvider>
      );
      expect(getByTestId('loader')).toBeInTheDocument();

      await wait();

      expect(getByTestId('app-auth')).toBeInTheDocument();
    });
  });
});
