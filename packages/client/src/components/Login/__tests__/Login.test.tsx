import React from 'react';
import { render, fireEvent, wait, cleanup } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import {
  mockLocation,
  loginFailedMock,
  loginNoNetworkMock,
  loginSuccessMock,
} from '__mocks__';

import { ROUTES } from 'shared/routes';
import { AuthProvider } from 'contexts/AuthContext';
import { DialogProvider } from 'contexts/DialogContext';
import auth from 'utils/auth';
import apolloClient from 'utils/apollo-client';
import Login from '../Login';

jest.mock('utils/auth');
jest.mock('utils/apollo-client');

describe('Component - Login', () => {
  const triggerLogin = () => {
    const renderedComponent = render(
      <MockedProvider mocks={[]} addTypename={false} resolvers={{}}>
        <MemoryRouter initialEntries={[mockLocation(ROUTES.LOGIN)]}>
          <AuthProvider>
            <DialogProvider>
              <Route path={ROUTES.LOGIN} component={Login} />
            </DialogProvider>
          </AuthProvider>
        </MemoryRouter>
      </MockedProvider>
    );
    const { getByTestId } = renderedComponent;

    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');

    fireEvent.change(emailInput, {
      target: { value: 'aa@aa.pt' },
    });
    fireEvent.change(passwordInput, {
      target: { value: '12345' },
    });

    fireEvent.submit(getByTestId('form'));

    return renderedComponent;
  };

  afterEach(cleanup);

  describe('when submitting form', () => {
    describe('when response is success', () => {
      it('should store auth payload', async () => {
        apolloClient.mutate = jest.fn().mockReturnValue(loginSuccessMock());

        const { queryByTestId } = triggerLogin();

        expect(queryByTestId('alert-dialog')).toBeNull();

        await wait();

        expect(auth.setUser).toHaveBeenCalledWith({
          role: 'BUDDY',
          token: 'dummy-token',
          userId: '1',
        });
      });
    });

    describe('when the server throws an error', () => {
      it('should show AlertDialog with error message', async () => {
        apolloClient.mutate = jest.fn().mockRejectedValue(loginFailedMock());

        const { getByTestId, queryByTestId } = triggerLogin();

        expect(queryByTestId('alert-dialog')).toBeNull();

        await wait();
        expect(getByTestId('alert-dialog')).toBeInTheDocument();

        expect(getByTestId('alert-dialog')).toHaveTextContent(
          'The email and password you entered did not match our records.'
        );
      });
    });
  });

  describe('when submitting a form without internet', () => {
    it('should render error dialog', async () => {
      apolloClient.mutate = jest.fn().mockRejectedValue(loginNoNetworkMock());

      const { getByTestId, queryByTestId } = triggerLogin();

      expect(queryByTestId('alert-dialog')).toBeNull();

      await wait();

      expect(getByTestId('alert-dialog')).toBeInTheDocument();

      expect(getByTestId('alert-dialog')).toHaveTextContent(
        'Could not connect to the server'
      );
    });
  });
});
