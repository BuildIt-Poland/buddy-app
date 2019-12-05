import React from 'react';
import { create, act } from 'react-test-renderer';
import waitForExpect from 'wait-for-expect';

import { MemoryRouter, Route } from 'react-router';
import { MockedProvider } from '@apollo/react-testing';
import { taskListResponse } from '__mocks__';
import TasksList from '../TasksList';

jest.mock('@material-ui/core/AppBar', () => 'AppBar');
jest.mock('@material-ui/core/Tabs', () => 'Tabs');
jest.mock('@material-ui/core/Tab', () => 'Tab');
jest.mock('components/TabPanel', () => 'TabPanel');
jest.mock('components/AvatarHeader', () => 'AvatarHeader');
jest.mock('components/PlusButton', () => 'PlusButton');
jest.mock('components/NavBar', () => 'NavBar');
jest.mock('components/TaskListPlaceHolder', () => 'TaskListPlaceHolder');
jest.mock('decorators/withSnackBar', () => (component: React.FC<any>) => component);
jest.mock('components/TaskTabsContent', () => 'TaskTabsContent');

describe('Component - TasksList', () => {
  const path = '/buddy/newbies/1234/tasks';

  describe('When there are tasks', () => {
    const variables = {
      newbieId: '1234',
    };

    const newbieMockData = {
      buddyTasks: [
        {
          id: '1',
          description: 'New task description',
          status: 'UNCOMPLETED',
          title: 'New task title ',
        },
        {
          id: '2',
          description: 'New task description 2',
          status: 'COMPLETED',
          title: 'New task title 2',
        },
      ],
      newbieTasks: [
        {
          id: '3',
          description: 'New task description',
          status: 'COMPLETED',
          title: 'New task title ',
        },
        {
          id: '4',
          description: 'New task description 2',
          status: 'COMPLETED',
          title: 'New task title 2',
        },
      ],
    };

    test('renders correctly', async () => {
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
