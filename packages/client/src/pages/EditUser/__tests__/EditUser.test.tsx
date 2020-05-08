import React from 'react';
import { create } from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter, Route } from 'react-router';
import { mockedBuddyContext } from '__mocks__';
import { SnackbarProvider } from 'contexts/SnackbarContext';
import { AuthProvider } from 'contexts/AuthContext';
import EditUser from '../EditUser';

jest.mock('components/UserForm', () => 'UserForm');
jest.mock('atoms/FormPlaceHolder', () => 'FormPlaceHolder');
jest.mock('atoms/BackPageContainer', () => 'BackPageContainer');

describe('Component - EditUser', () => {
  test('renders correctly', () => {
    const path = '/buddy/edit-details';
    const component = create(
      <MockedProvider addTypename={false}>
        <MemoryRouter initialEntries={[path]}>
          <SnackbarProvider>
            <AuthProvider value={mockedBuddyContext()}>
              <Route path={path} component={EditUser} />
            </AuthProvider>
          </SnackbarProvider>
        </MemoryRouter>
      </MockedProvider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
