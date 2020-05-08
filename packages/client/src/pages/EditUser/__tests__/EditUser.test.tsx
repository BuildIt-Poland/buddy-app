import React from 'react';
import { create, act } from 'react-test-renderer';
import waitForExpect from 'wait-for-expect';
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
  const path = '/buddy/edit-details';

  it('renders correctly', async () => {
    const component = create(
      <MockedProvider addTypename={false} resolvers={{}}>
        <MemoryRouter initialEntries={[path]}>
          <SnackbarProvider>
            <AuthProvider value={mockedBuddyContext()}>
              <Route path={path} component={EditUser} />
            </AuthProvider>
          </SnackbarProvider>
        </MemoryRouter>
      </MockedProvider>
    );

    await act(async () => {
      await waitForExpect(() => {
        expect(component.toJSON()).toMatchSnapshot();
      });
    });
  });
});
