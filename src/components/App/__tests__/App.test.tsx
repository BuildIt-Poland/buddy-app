import React from 'react';
import { render, wait, cleanup } from '@testing-library/react';
import AuthContext from 'contexts/AuthContext';
import { loginSuccessMock, authContext } from '__mocks__';
import { MockedProvider } from '@apollo/react-testing';
import App from '../App';

jest.mock('components/AuthenticatedApp', () => () => <div data-testid='app-auth' />);
jest.mock('components/UnauthenticatedApp', () => () => (
  <div data-testid='app-not-auth' />
));

afterEach(cleanup);

describe('Component - App', () => {
  describe('When user is unauthorized user', () => {
    const unauthorizedContext = {
      isAuthenticated: false,
    };
    it('renders correctly the login page', async () => {
      const { getByTestId } = render(
        <AuthContext.Provider value={authContext(unauthorizedContext)}>
          <App />
        </AuthContext.Provider>
      );
      expect(getByTestId('loader')).toBeInTheDocument();

      await wait();

      expect(getByTestId('app-not-auth')).toBeInTheDocument();
    });
  });

  describe('When user is authorized user', () => {
    const authorizedContext = {
      isAuthenticated: true,
    };
    it('renders correctly home page', async () => {
      const { getByTestId } = render(
        <MockedProvider mocks={[loginSuccessMock()]} addTypename={false}>
          <AuthContext.Provider value={authContext(authorizedContext)}>
            <App />
          </AuthContext.Provider>
        </MockedProvider>
      );
      expect(getByTestId('loader')).toBeInTheDocument();

      await wait();

      expect(getByTestId('app-auth')).toBeInTheDocument();
    });
  });
});
