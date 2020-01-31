import React from 'react';
import { create, act } from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router';
import { ROUTES } from 'shared/routes';
import { taskDetailsMock, mockedBuddyContext } from '__mocks__';
import { AuthProvider } from 'contexts/AuthContext';
import waitForExpect from 'wait-for-expect';
import { SnackbarProvider } from 'contexts/SnackbarContext';
import TaskDetails from '../TaskDetails';

jest.mock('components/PageContainer', () => 'PageContainer');
jest.mock('@material-ui/core/CircularProgress', () => 'CircularProgress');
jest.mock('components/TaskCheckbox', () => 'TaskCheckbox');
jest.mock('components/ReminderButton', () => 'ReminderButton');
jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.doMock('components/Header');

describe('Component - TaskDetails', () => {
  test('renders correctly', async () => {
    const component = create(
      <MockedProvider mocks={taskDetailsMock} addTypename={false}>
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
