import React from 'react';
import { render, act } from '@testing-library/react';
import { mockLocation, loginSuccessMock, authContext } from '__mocks__';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import { ROUTES } from 'shared/routes';
import AuthContext from 'contexts/AuthContext';
import { UserRole } from 'buddy-app-schema';
import auth from 'utils/auth';
import waitForExpect from 'wait-for-expect';
import AppRouter from '../AppRouter';

jest.mock('utils/auth');

describe('Component - AppRouter', () => {
  const unauthorisedContext = {
    isAuthenticated: false,
  };

  const newbieContext = {
    data: {
      token: 'some_token',
      role: UserRole.Newbie,
      userId: '1',
    },
  };

  const renderAppRouter = (context: any) =>
    render(
      <MockedProvider mocks={[loginSuccessMock()]} addTypename={false}>
        <MemoryRouter initialEntries={[mockLocation()]}>
          <AuthContext.Provider value={context}>
            <AppRouter />
          </AuthContext.Provider>
        </MemoryRouter>
      </MockedProvider>
    );

  describe('for unauthorized ', () => {
    it(`user redirects to ${ROUTES.LOGIN}`, async () => {
      await act(async () => {
        const { getByTestId } = renderAppRouter(authContext(unauthorisedContext));

        await waitForExpect(() => {
          expect(getByTestId('login-page')).toBeInTheDocument();
        });
      });
    });
  });

  describe('for authorized ', () => {
    beforeAll(() => {
      (auth.getUser as jest.Mock).mockReturnValue({});
    });

    it(`as buddy redirects to ${ROUTES.BUDDY_SELECT_NEWBIE}`, async () => {
      await act(async () => {
        const { getByTestId } = renderAppRouter(authContext());

        await waitForExpect(() => {
          expect(getByTestId('newbie-select-page')).toBeInTheDocument();
        });
      });
    });

    it(`as newbie redirects to ${ROUTES.NEWBIE_TASKS_LIST}`, async () => {
      await act(async () => {
        const { getByTestId } = renderAppRouter(authContext(newbieContext));

        await waitForExpect(() => {
          expect(getByTestId('task-list-page')).toBeInTheDocument();
        });
      });
    });
  });
});
