import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import { act, create } from 'react-test-renderer';
import waitForExpect from 'wait-for-expect';
import ContactDetails from 'components/ContactDetails';
import AuthContext, { AuthContextData } from 'contexts/AuthContext';
import { buddyContactDetails, newbieContactDetails, UserRole } from '__mocks__';

jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('components/UserDetails', () => 'UserDetails');
jest.mock('components/PageContainer', () => 'PageContainer');
jest.mock(
  'components/Header',
  () => (require.requireActual('components/Header').default = () => 'Header')
);

describe('Component - ContactDetails', () => {
  const mockHistory: any = {
    push: jest.fn(),
  };

  describe('when logged in as buddy', () => {
    const path = '/buddy/newbies/1234/details';
    const mockedBuddyContext = {
      data: {
        role: UserRole.Buddy,
        token: 'token',
        userId: '1234',
      },
    };
    const component = create(
      <MockedProvider
        mocks={newbieContactDetails({ newbieId: '1234' })}
        addTypename={false}>
        <MemoryRouter initialEntries={[path]}>
          <Route path={'/buddy/newbies/:newbieId/details'}>
            <AuthContext.Provider value={mockedBuddyContext as AuthContextData}>
              <ContactDetails history={mockHistory} />
            </AuthContext.Provider>
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
    it('renders correctly', async () => {
      expect(component).toMatchSnapshot();

      await act(async () => {
        await waitForExpect(() => {
          expect(component).toMatchSnapshot();
        });
      });
    });
  });
  describe('when logged in as newbie', () => {
    const path = '/newbie/buddy/1234/details';
    const mockedNewbieContext = {
      data: {
        role: UserRole.Newbie,
        token: 'token',
        userId: '1234',
      },
    };
    const component = create(
      <MockedProvider
        mocks={buddyContactDetails({ buddyId: '1234' })}
        addTypename={false}>
        <MemoryRouter initialEntries={[path]}>
          <Route path={'/newbie/buddy/:buddyId/details'}>
            <AuthContext.Provider value={mockedNewbieContext as AuthContextData}>
              <ContactDetails history={mockHistory} />
            </AuthContext.Provider>
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
    it('renders correctly', async () => {
      expect(component).toMatchSnapshot();

      await act(async () => {
        await waitForExpect(() => {
          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
