import React from 'react';
import { create, act } from 'react-test-renderer';
import waitForExpect from 'wait-for-expect';
import { MemoryRouter, Route } from 'react-router';
import { MockedProvider } from '@apollo/react-testing';
import { AuthProvider } from 'contexts/AuthContext';
import { SnackbarProvider } from 'contexts/SnackbarContext';
import { DialogProvider } from 'contexts/DialogContext';
import { mockedBuddyContext } from '__mocks__';
import TaskOptions from '../TaskOptions';

jest.mock('components/DropDown', () => 'DropDown');
jest.mock('@material-ui/core/IconButton', () => 'IconButton');
jest.mock('@material-ui/icons/Edit', () => 'Edit');
jest.mock('@material-ui/icons/MoreVert', () => 'MoreVert');
jest.mock('@material-ui/icons/FileCopy', () => 'FileCopy');
jest.mock('@material-ui/icons/Delete', () => 'Delete');

describe('Component - TaskOptions', () => {
  const path = '/buddy/newbies/1/tasks';

  const component = create(
    <MockedProvider addTypename={false} resolvers={{}}>
      <MemoryRouter initialEntries={[path]}>
        <Route path={'/buddy/newbies/:newbieId/tasks'}>
          <DialogProvider>
            <SnackbarProvider>
              <AuthProvider value={mockedBuddyContext()}>
                <TaskOptions id='1' />
              </AuthProvider>
            </SnackbarProvider>
          </DialogProvider>
        </Route>
      </MemoryRouter>
    </MockedProvider>
  );

  it('renders correctly', async () => {
    await act(async () => {
      await waitForExpect(() => {
        expect(component.toJSON()).toMatchSnapshot();
      });
    });
  });
});
