import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import { act, create } from 'react-test-renderer';
import waitForExpect from 'wait-for-expect';
import ContactDetails from 'pages/ContactDetails';
import {
  buddyContactDetails,
  newbieContactDetails,
  mockedBuddyContext,
  mockedNewbieContext,
} from '__mocks__';
import { AuthProvider } from 'contexts/AuthContext';

jest.mock('atoms/EditButton', () => 'EditButton');
jest.mock('components/UserDetails', () => 'UserDetails');
jest.mock('atoms/ContactDetailsPlaceHolder', () => 'ContactDetailsPlaceHolder');
jest.mock('atoms/BackPageContainer', () => 'BackPageContainer');

describe('Component - ContactDetails', () => {
  const mockHistory: any = {
    push: jest.fn(),
  };

  describe('when logged in as buddy', () => {
    const path = '/buddy/newbies/1234/details';
    const component = create(
      <MockedProvider
        mocks={newbieContactDetails({ newbieId: '1234' })}
        addTypename={false}
        resolvers={{}}>
        <MemoryRouter initialEntries={[path]}>
          <Route path={'/buddy/newbies/:newbieId/details'}>
            <AuthProvider value={mockedBuddyContext()}>
              <ContactDetails history={mockHistory} />
            </AuthProvider>
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
    const component = create(
      <MockedProvider
        mocks={buddyContactDetails({ buddyId: '1234' })}
        addTypename={false}
        resolvers={{}}>
        <MemoryRouter initialEntries={[path]}>
          <Route path={'/newbie/buddy/:buddyId/details'}>
            <AuthProvider value={mockedNewbieContext()}>
              <ContactDetails history={mockHistory} />
            </AuthProvider>
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
