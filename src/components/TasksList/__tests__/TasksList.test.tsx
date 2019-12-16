import React from 'react';
import { create, act } from 'react-test-renderer';
import waitForExpect from 'wait-for-expect';

import { MemoryRouter, Route } from 'react-router';
import { MockedProvider } from '@apollo/react-testing';
import { taskListResponse, newbieTasksListMock } from '__mocks__';
import TasksList from '../TasksList';

jest.mock('@material-ui/core/AppBar', () => 'AppBar');
jest.mock('@material-ui/core/Tabs', () => 'Tabs');
jest.mock('@material-ui/core/Tab', () => 'Tab');
jest.mock('components/TabPanel', () => 'TabPanel');
jest.mock('components/AvatarHeader', () => 'AvatarHeader');
jest.mock('components/PlusButton', () => 'PlusButton');
jest.mock('components/TaskListPlaceHolder', () => 'TaskListPlaceHolder');
jest.mock('components/TaskTabsContent', () => 'TaskTabsContent');
jest.mock('components/Header', () => {
  const res = require.requireActual('components/Header');
  res.default = () => 'Header';
  return res;
});

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
          addTypename={false}>
          <MemoryRouter initialEntries={[path]}>
            <Route path={'/buddy/newbies/:newbieId/tasks'}>
              <TasksList />
            </Route>
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
              <TasksList />
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
