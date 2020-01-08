import React from 'react';
import { create, act } from 'react-test-renderer';
import waitForExpect from 'wait-for-expect';
import { MemoryRouter, Route } from 'react-router';
import { MockedProvider } from '@apollo/react-testing';
import { taskListResponse, newbieTasksListMock } from '__mocks__';
import { AuthProvider, AuthState } from 'contexts/AuthContext';
import { UserRole } from 'buddy-app-schema';
import { MenuProvider } from 'contexts/MenuContext';
import { SnackbarProvider } from 'contexts/SnackbarContext';

import TasksList from '../NewbieTasksList';

jest.mock('components/AvatarHeader', () => 'AvatarHeader');
jest.mock('components/TaskTabsContent', () => 'TaskTabsContent');
jest.doMock('components/Header');

describe('Component - TasksList', () => {
  const path = '/newbie/tasks';
  const mockedNewbieContext: AuthState = {
    isAuthenticated: true,
    loading: false,
    data: {
      role: UserRole.Newbie,
      token: 'token',
      userId: 'ck17sl83c9gya0b17dcvttzm4',
    },
  };

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
            <AuthProvider value={mockedNewbieContext}>
              <SnackbarProvider>
                <MenuProvider>
                  <Route path={path} component={TasksList} />
                </MenuProvider>
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

  describe('when there are not tasks', () => {
    const variables = {
      newbieId: '1234',
    };

    const newbieMockData = {
      newbieTasks: [],
    };

    test('should render empty state', async () => {
      const component = create(
        <MockedProvider
          mocks={taskListResponse(variables, newbieMockData)}
          addTypename={false}
          resolvers={{}}>
          <MemoryRouter initialEntries={[path]}>
            <AuthProvider value={mockedNewbieContext}>
              <SnackbarProvider>
                <MenuProvider>
                  <Route path={path} component={TasksList} />
                </MenuProvider>
              </SnackbarProvider>
            </AuthProvider>
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
