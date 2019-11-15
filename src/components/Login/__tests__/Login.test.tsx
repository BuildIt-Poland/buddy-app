import React from 'react';
import { render, fireEvent, wait, cleanup } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import {
  mockLocation,
  loginSuccessMock,
  loginFailedMock,
  loginNoNetworkMock,
  authContext,
} from '__mocks__';
import { ROUTES } from 'shared/routes';
import AuthStore from 'reducers/AuthStore';
import auth from 'utils/auth';
import Login from '../Login';

jest.mock('buddy-app-schema', () => {});
jest.mock('utils/auth');

describe('Component - Login', () => {
  const triggerLogin = (mocks: any) => {
    const loginRoute = render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <MemoryRouter initialEntries={[mockLocation(ROUTES.LOGIN)]}>
          <AuthStore>
            <Route path={ROUTES.LOGIN}>
              <Login />
            </Route>
          </AuthStore>
        </MemoryRouter>
      </MockedProvider>
    );
    const { getByTestId } = loginRoute;

    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');

    fireEvent.change(emailInput, {
      target: { value: 'aa@aa.pt' },
    });
    fireEvent.change(passwordInput, {
      target: { value: '12345' },
    });

    fireEvent.submit(getByTestId('form'));

    return loginRoute;
  };

  afterEach(() => cleanup);

  describe('when submitting form', () => {
    describe('when response is success', () => {
      it('should store auth payload', async () => {
        triggerLogin(loginSuccessMock());

        await wait(() => {
          expect(auth.setUser).toHaveBeenCalledWith(authContext().data);
        });
      });
    });

    describe('when the server throws an error', () => {
      it('should show AlertDialog with error message', async () => {
        const { getByTestId } = triggerLogin(loginFailedMock());

        await wait(() => {
          expect(getByTestId('alert-dialog')).toHaveTextContent(
            'The email and password you entered did not match our records.'
          );
          expect(getByTestId('alert-dialog')).toBeInTheDocument();
        });
      });
    });
  });

  describe('when submitting a form without internet', () => {
    it('should render error dialog', async () => {
      const { getByTestId } = triggerLogin(loginNoNetworkMock());

      await wait(() => {
        expect(getByTestId('alert-dialog')).toHaveTextContent(
          'Could not connect to the server'
        );
        expect(getByTestId('alert-dialog')).toBeInTheDocument();
      });
    });
  });
});
