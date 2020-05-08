import React from 'react';
import { create } from 'react-test-renderer';
import { MemoryRouter, Route } from 'react-router';
import { MockedProvider } from '@apollo/react-testing';
import { AuthProvider } from 'contexts/AuthContext';
import { SnackbarProvider } from 'contexts/SnackbarContext';
import { DialogProvider } from 'contexts/DialogContext';
import { UserRole, mockedBuddyContext } from '__mocks__';
import DeleteUser from '../DeleteUser';

jest.mock('@material-ui/icons/RemoveCircleOutline', () => 'RemoveCircleOutline');
jest.mock('@material-ui/core/IconButton', () => 'IconButton');

describe('Component - DeleteUser', () => {
  test('renders correctly', () => {
    const path = '/buddy/newbies';

    const component = create(
      <MockedProvider addTypename={false} resolvers={{}}>
        <MemoryRouter initialEntries={[path]}>
          <Route path={'/buddy/newbies/:newbieId/tasks'}>
            <DialogProvider>
              <SnackbarProvider>
                <AuthProvider value={mockedBuddyContext()}>
                  <DeleteUser userId='1' userRole={UserRole.Newbie} />
                </AuthProvider>
              </SnackbarProvider>
            </DialogProvider>
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
