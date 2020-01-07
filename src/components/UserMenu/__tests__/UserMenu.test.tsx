import React from 'react';
import UserMenu from 'components/UserMenu';
import { MemoryRouter, Route } from 'react-router';
import { buddyMenuDetails, newbieMenuDetails, UserRole } from '__mocks__';
import { AuthProvider, AuthState } from 'contexts/AuthContext';
import waitForExpect from 'wait-for-expect';
import { render, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

jest.mock('@material-ui/core/Box', () => 'mock-box');
jest.mock('@material-ui/core/Drawer', () => 'mock-drawer');
jest.mock('@material-ui/core/Divider', () => 'mock-divider');
jest.mock('@material-ui/core/CircularProgress', () => 'mock-circular-progress');
jest.mock('components/UserMenuDetails', () => 'mock-menu-details');
jest.mock('components/UserMenuBuddy', () => 'mock-user-menu-buddy');
jest.mock('components/UserMenuNewbies', () => 'mock-user-newbies');
jest.mock('components/UserMenuSettings', () => 'mock-user-settings');

describe('UserMenu component', () => {
  describe('when logged in as buddy', () => {
    let getByTestId: any;
    const onCloseMock = jest.fn();
    const mockedBuddyContext: AuthState = {
      isAuthenticated: true,
      loading: false,
      data: {
        role: UserRole.Buddy,
        token: 'token',
        userId: '1234',
      },
    };
    beforeEach(() => {
      const path = '/buddy/newbies';
      const renderer = render(
        <MemoryRouter initialEntries={[path]}>
          <MockedProvider
            mocks={buddyMenuDetails({ buddyId: '1234' })}
            addTypename={false}
            resolvers={{}}>
            <AuthProvider value={mockedBuddyContext}>
              <Route path={path}>
                <UserMenu onCloseClick={onCloseMock} />
              </Route>
            </AuthProvider>
          </MockedProvider>
        </MemoryRouter>
      );
      getByTestId = renderer.getByTestId;
    });
    it('displays loader on init', async () => {
      expect(getByTestId('slide-menu-loader')).toBeInTheDocument();
    });
    it('displays menu body when user data is loaded', async () => {
      await act(async () => {
        await waitForExpect(() => {
          expect(getByTestId('slide-menu-body')).toBeInTheDocument();
        });
      });
    });
  });
  describe('when logged in as newbie', () => {
    let getByTestId: any;
    const onCloseMock = jest.fn();
    const mockedNewbieContext: AuthState = {
      isAuthenticated: true,
      loading: false,
      data: {
        role: UserRole.Newbie,
        token: 'token',
        userId: '1234',
      },
    };
    beforeEach(() => {
      const path = '/buddy/newbies';
      const renderer = render(
        <MemoryRouter initialEntries={[path]}>
          <MockedProvider
            mocks={newbieMenuDetails({ newbieId: '1234' })}
            addTypename={false}
            resolvers={{}}>
            <AuthProvider value={mockedNewbieContext}>
              <Route path={path}>
                <UserMenu onCloseClick={onCloseMock} />
              </Route>
            </AuthProvider>
          </MockedProvider>
        </MemoryRouter>
      );
      getByTestId = renderer.getByTestId;
    });
    it('displays loader on init', async () => {
      expect(getByTestId('slide-menu-loader')).toBeInTheDocument();
    });
    it('displays menu body when user data is loaded', async () => {
      await act(async () => {
        await waitForExpect(() => {
          expect(getByTestId('slide-menu-body')).toBeInTheDocument();
        });
      });
    });
  });
});
