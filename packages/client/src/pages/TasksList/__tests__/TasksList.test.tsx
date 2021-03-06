import React from 'react';
import { create, act } from 'react-test-renderer';
import waitForExpect from 'wait-for-expect';
import { AuthProvider } from 'contexts/AuthContext';
import { MemoryRouter, Route } from 'react-router';
import { MockedProvider } from '@apollo/react-testing';
import {
  taskListResponse,
  newbieTasksListMock,
  mockedBuddyContext,
} from '__mocks__';
import { SnackbarProvider } from 'contexts/SnackbarContext';
import TasksList from '../TasksList';

jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/Tabs', () => 'Tabs');
jest.mock('@material-ui/core/Tab', () => 'Tab');
jest.mock('components/AvatarHeader', () => 'AvatarHeader');
jest.mock('components/TaskTabsContent', () => 'TaskTabsContent');
jest.mock('components/AddTaskOptions', () => 'AddTaskOptions');
jest.mock('atoms/TabPanel', () => 'TabPanel');
jest.doMock('components/Header');

describe('Component - TasksList', () => {
  const path = '/buddy/newbies/1234/tasks';

  describe('When there are tasks', () => {
    const variables = {
      newbieId: '1234',
    };

    test('renders correctly', async () => {
      const component = create(
        <MockedProvider
          mocks={taskListResponse(variables, newbieTasksListMock)}
          addTypename={false}
          resolvers={{}}>
          <MemoryRouter initialEntries={[path]}>
            <SnackbarProvider>
              <AuthProvider value={mockedBuddyContext()}>
                <Route
                  path={'/buddy/newbies/:newbieId/tasks'}
                  component={TasksList}
                />
              </AuthProvider>
            </SnackbarProvider>
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

  describe('when there are not tasks', () => {
    const variables = {
      newbieId: '1234',
    };

    const newbieMockData = {
      id: '11111',
      name: '',
      email: '',
      buddyTasks: [],
      newbieTasks: [],
    };

    test('should render empty state', async () => {
      const component = create(
        <MockedProvider
          mocks={taskListResponse(variables, newbieMockData)}
          addTypename={false}>
          <MemoryRouter initialEntries={[path]}>
            <Route path={'/buddy/newbies/:newbieId/tasks'}>
              <SnackbarProvider>
                <TasksList />
              </SnackbarProvider>
            </Route>
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
});
