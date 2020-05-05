import React from 'react';
import { create, act } from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router';
import { ROUTES } from 'shared/routes';
import { taskDetailsMock, mockedBuddyContext } from '__mocks__';
import waitForExpect from 'wait-for-expect';
import { AuthProvider } from 'contexts/AuthContext';
import { SnackbarProvider } from 'contexts/SnackbarContext';
import TaskDetails from '../TaskDetails';

jest.mock('atoms/BackPageContainer', () => 'BackPageContainer');
jest.mock('@material-ui/core/CircularProgress', () => 'CircularProgress');
jest.mock('atoms/TaskCheckbox', () => 'TaskCheckbox');
jest.mock('atoms/ReminderButton', () => 'ReminderButton');
jest.mock('atoms/EditButton', () => 'EditButton');
jest.mock('atoms/TaskDetailsPlaceHolder', () => 'TaskDetailsPlaceHolder');

describe('Component - TaskDetails', () => {
  test('renders correctly', async () => {
    const component = create(
      <MockedProvider mocks={taskDetailsMock} addTypename={false} resolvers={{}}>
        <MemoryRouter initialEntries={[ROUTES.BASE]}>
          <AuthProvider value={mockedBuddyContext()}>
            <SnackbarProvider>
              <TaskDetails />
            </SnackbarProvider>
          </AuthProvider>
        </MemoryRouter>
      </MockedProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();

    await act(async () => {
      await waitForExpect(() => {
        expect(component.toJSON()).toMatchSnapshot();
      });
    });
  });
});
