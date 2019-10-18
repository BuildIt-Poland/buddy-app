import React from 'react';
import { act, Simulate } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

import { MemoryRouter } from 'react-router-dom';
import { MockedProvider, wait } from '@apollo/react-testing';
import { LOGIN_MUTATION } from '../../../graphql/login.graphql';

import Login from '../Login';
import auth from '../../../utils/auth';
// jest.mock('@material-ui/core/Typography', () => 'Typography');
// jest.mock('@material-ui/core/Grid', () => 'Grid');
// jest.mock('@material-ui/core/Link', () => 'Link');
// // jest.mock('@material-ui/core/TextField', () => 'TextField');

jest.mock('@material-ui/core/CircularProgress', () => 'CircularProgress');
// jest.mock('../../RoundedButton/', () => 'RoundedButton');
// jest.mock('../../AlertDialog/', () => 'AlertDialog');
jest.mock('../../../utils/auth.ts');

describe('Component - Login', () => {
  let container: HTMLDivElement | Element | null = null;

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

  // test('renders correctly', () => {
  //   const component = create(
  //     <MockedProvider mocks={mocks} addTypename={false}>
  //       <MemoryRouter initialEntries={[mockLocation]}>
  //         <Login />
  //       </MemoryRouter>
  //     </MockedProvider>
  //   );

  //   expect(container.toJSON()).toMatchSnapshot();
  // });

  describe('when submitting valid form', () => {
    it('should render loading state', async () => {
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
        },
      ];

      act(() => {
        render(
          <MockedProvider mocks={mocks} addTypename={false}>
            <MemoryRouter initialEntries={[mockLocation]}>
              <Login />
            </MemoryRouter>
          </MockedProvider>,
          container
        );
      });

      // container.querySelector('input[name="email"').value = 'aa@aa.pt';
      Simulate.change(container.querySelector('input[name="email"'), {
        target: { value: 'aa@aa.pt' },
      });

      Simulate.change(container.querySelector('input[name="password"'), {
        target: { value: '12345' },
      });

      Simulate.click(container.querySelector('button'));

      expect(container.querySelector('CircularProgress')).toBeDefined();
      // expect(container.querySelector('input[name="email"')).not.toBeDefined();

      await wait(0);
    });

    describe('when response is sucess', () => {
      it('should redirect user to user and store auth token', () => {});
    });
  });

  describe('when submitting a invalid form', () => {
    it('should render error dialog', () => {});
  });

  describe('when submitting a form without internet', () => {
    it('should render error dialog', () => {});
  });
});
