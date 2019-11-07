import React from 'react';
import { render, fireEvent, wait, cleanup } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import { GraphQLError } from 'graphql';
import AuthStore from 'context/AuthStore';
import { LOGIN_MUTATION } from 'graphql/login.graphql';
import auth from 'utils/auth';
import Login from '../Login';

jest.mock('utils/auth.ts');

describe('Component - Login', () => {
  const mockLocation = {
    key: 'utwyk7',
    pathname: '/login',
  };

  const renderLoginRoute = (mocks: any) =>
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={[mockLocation]}>
          <AuthStore>
            <Route path='/login'>
              <Login />
            </Route>
          </AuthStore>
        </MemoryRouter>
      </MockedProvider>
    );

  afterEach(() => cleanup);

  describe('when submitting form', () => {
    describe('when response is success', () => {
      const LoginSuccessMock = [
        {
          request: {
            query: LOGIN_MUTATION,
            variables: {
              email: 'aa@aa.pt',
              password: '12345',
            },
          },
          result: {
            data: {
              login: { role: 'BUDDY', token: 'dummy-token', userId: '1' },
            },
          },
        },
      ];
      it('should store auth payload', async () => {
        const { getByTestId } = renderLoginRoute(LoginSuccessMock);

        const emailInput = getByTestId('email');
        const passwordInput = getByTestId('password');

        fireEvent.change(emailInput, {
          target: { value: 'aa@aa.pt' },
        });
        fireEvent.change(passwordInput, {
          target: { value: '12345' },
        });

        fireEvent.submit(getByTestId('form'));

        await wait(() => {
          expect(auth.setUser).toHaveBeenCalledWith(
            LoginSuccessMock[0].result.data.login
          );
        });
      });
    });

    describe('when the server throws an error', () => {
      const LoginFailedMock = [
        {
          request: {
            query: LOGIN_MUTATION,
            variables: {
              email: 'aa@aa.pt',
              password: '12345',
            },
          },

          errors: [new GraphQLError('No such user found')],
        },
      ];
      it('should show AlertDialog with error message', async () => {
        const { getByTestId } = renderLoginRoute(LoginFailedMock);

        const emailInput = getByTestId('email');
        const passwordInput = getByTestId('password');

        fireEvent.change(emailInput, {
          target: { value: 'aa@aa.pt' },
        });
        fireEvent.change(passwordInput, {
          target: { value: '12345' },
        });

        fireEvent.submit(getByTestId('form'));

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
    const noNetworkMock = [
      {
        request: {
          query: LOGIN_MUTATION,
          variables: {
            email: 'aa@aa.pt',
            password: '12345',
          },
        },
        error: new Error(),
      },
    ];

    it('should render error dialog', async () => {
      const { getByTestId } = renderLoginRoute(noNetworkMock);

      const emailInput = getByTestId('email');
      const passwordInput = getByTestId('password');

      fireEvent.change(emailInput, {
        target: { value: 'aa@aa.pt' },
      });
      fireEvent.change(passwordInput, {
        target: { value: '12345' },
      });

      fireEvent.submit(getByTestId('form'));

      await wait(() => {
        expect(getByTestId('alert-dialog')).toHaveTextContent(
          'Could not connect to the server'
        );
        expect(getByTestId('alert-dialog')).toBeInTheDocument();
      });
    });
  });
});
