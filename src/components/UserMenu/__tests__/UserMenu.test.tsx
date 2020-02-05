import React from 'react';
import UserMenu from 'components/UserMenu';
import { MemoryRouter, Route } from 'react-router';
import {
  buddyMenuDetails,
  newbieMenuDetails,
  mockedBuddyContext,
  mockedNewbieContext,
} from '__mocks__';
import { AuthProvider } from 'contexts/AuthContext';
import { render, wait, cleanup } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

afterEach(cleanup);

describe('UserMenu component', () => {
  describe('when logged in as buddy', () => {
    let getByTestId: any;
    const onCloseMock = jest.fn();

    beforeEach(() => {
      const path = '/buddy/newbies';
      const renderer = render(
        <MemoryRouter initialEntries={[path]}>
          <MockedProvider
            mocks={buddyMenuDetails({ buddyId: '1234' })}
            addTypename={false}
            resolvers={{}}>
            <AuthProvider value={mockedBuddyContext()}>
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
      await wait();
      expect(getByTestId('slide-menu-body')).toBeInTheDocument();
    });
  });

  describe('when logged in as newbie', () => {
    let getByTestId: any;
    const onCloseMock = jest.fn();

    beforeEach(() => {
      const path = '/buddy/newbies';
      const renderer = render(
        <MemoryRouter initialEntries={[path]}>
          <MockedProvider
            mocks={newbieMenuDetails({ newbieId: '1234' })}
            addTypename={false}
            resolvers={{}}>
            <AuthProvider value={mockedNewbieContext()}>
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
      await wait();
      expect(getByTestId('slide-menu-body')).toBeInTheDocument();
    });
  });
});
