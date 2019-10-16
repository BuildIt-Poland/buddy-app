import React from 'react';
import { create } from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import { LOGIN_MUTATION } from '../../../graphql/login.graphql';

import Login from '../Login';
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/Grid', () => 'Grid');
jest.mock('@material-ui/core/Link', () => 'Link');
jest.mock('@material-ui/core/TextField', () => 'TextField');

jest.mock('@material-ui/core/CircularProgress', () => 'CircularProgress');
jest.mock('../../RoundedButton/', () => 'RoundedButton');
jest.mock('../../AlertDialog/', () => 'AlertDialog');

describe('Component - Login', () => {
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
          token: 'dummy-token',
        },
      },
    },
  ];

  test('renders correctly', () => {
    const component = create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={[mockLocation]}>
          <Login />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('should render loading state initially after submitting form', () => {
    const component = create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={[mockLocation]}>
          <Login />
        </MemoryRouter>
      </MockedProvider>
    );

    // // find the button and simulate a click
    // const button = component.root.findByType('RoundedButton');

    // button.props.onClick(); // fires the mutation
    expect(component.toJSON()).toMatchSnapshot();
  });
});
