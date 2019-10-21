import React from 'react';
import { act, Simulate } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';

import { GraphQLError } from 'graphql';
import { LOGIN_MUTATION } from '../../../graphql/login.graphql';

import Login from '../Login';
import auth from '../../../utils/auth';

jest.mock('../../../utils/auth.ts');

describe('Component - Login', () => {
  let container: HTMLDivElement | Element | null;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container) {
      // cleanup on exiting

      unmountComponentAtNode(container);
      container.remove();
    }
    container = null;
  });

  describe('when submitting form', () => {
    describe('when response is success', () => {
      it('should redirect user to user and store auth token', async () => {
        const mockLocation = {
          key: 'utwyk7',
          pathname: '/login',
        };

        const mocks = [
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
                login: {
                  token: 'dummy-token',
                },
              },
            },
            // error: [new GraphQLError('Error!')],
          },
        ];

        render(
          <MockedProvider mocks={mocks} addTypename={false}>
            <MemoryRouter initialEntries={[mockLocation]}>
              <Route path='/login'>
                <Login />
              </Route>
              <Route path='/buddy/newbies'>Dummy route</Route>
            </MemoryRouter>
          </MockedProvider>,
          container
        );

        container.querySelector('input[name="email"').value = 'aa@aa.pt';

        Simulate.change(container.querySelector('input[name="email"'));

        container.querySelector('input[name="password"').value = '12345';

        Simulate.change(container.querySelector('input[name="password"'));

        await act(async () => {
          Simulate.submit(container.querySelector('form'));
        });

        expect(auth.setToken).toHaveBeenCalledWith('dummy-token');
        expect(container.textContent).toBe('Dummy route');
      });
    });

    describe('when server throws an error', () => {
      describe('when is a server error', () => {});
    });
  });

  describe('when submitting a form without internet', () => {
    it('should render error dialog', () => {});
  });
});
