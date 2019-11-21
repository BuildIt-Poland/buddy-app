import React from 'react';
import { act } from 'react-test-renderer';
import UserMenu from 'components/UserMenu';
import { MemoryRouter, Route } from 'react-router';
import { buddyMenuDetails, newbieMenuDetails, UserRole } from '__mocks__';
import AuthContext, { AuthContextData } from 'contexts/AuthContext';
import waitForExpect from 'wait-for-expect';
import { render, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
jest.mock('@material-ui/core/IconButton', () => 'IconButton');
jest.mock('@material-ui/icons/Close', () => 'CloseIcon');
jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/Drawer', () => 'Drawer');
jest.mock('@material-ui/core/Divider', () => 'Divider');
jest.mock('@material-ui/core/CircularProgress', () => 'CircularProgress');
jest.mock('components/UserMenuDetails/UserMenuDetails', () => 'UserMenuDetails');
jest.mock('components/UserMenuBuddy/UserMenuBuddy', () => 'UserMenuBuddy');
jest.mock('components/UserMenuNewbies/UserMenuNewbies', () => 'UserMenuNewbies');
jest.mock('components/UserMenuSettings/UserMenuSettings', () => 'UserMenuSettings');
jest.mock('components/UserMenuSettings/UserMenuSettings', () => 'UserMenuSettings');

describe('UserMenu component', () => {
  describe('when logged in as buddy', () => {
    let getByTestId: any;
    const onCloseMock = jest.fn();
    const mockedBuddyContext = {
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
          <AuthContext.Provider value={mockedBuddyContext as AuthContextData}>
            <MockedProvider
              mocks={buddyMenuDetails({ buddyId: '1234' })}
              addTypename={false}>
              <Route path={path}>
                <UserMenu isMenuVisible={true} onClose={onCloseMock} />
              </Route>
            </MockedProvider>
          </AuthContext.Provider>
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
    it('onClose method is called when close btn is clicked', async () => {
      await act(async () => {
        await waitForExpect(() => {
          expect(getByTestId('slide-menu-close-btn')).toBeInTheDocument();
          fireEvent.click(getByTestId('slide-menu-close-btn'));
          expect(onCloseMock).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
  describe('when logged in as newbie', () => {
    let getByTestId: any;
    const onCloseMock = jest.fn();
    const mockedNewbieContext = {
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
          <AuthContext.Provider value={mockedNewbieContext as AuthContextData}>
            <MockedProvider
              mocks={newbieMenuDetails({ newbieId: '1234' })}
              addTypename={false}>
              <Route path={path}>
                <UserMenu isMenuVisible={true} onClose={onCloseMock} />
              </Route>
            </MockedProvider>
          </AuthContext.Provider>
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
