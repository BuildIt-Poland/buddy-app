import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { create, act } from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';
import waitForExpect from 'wait-for-expect';
import { newbieSelectMock, mockedBuddyContext } from '__mocks__';
import { AuthProvider } from 'contexts/AuthContext';
import { MenuProvider } from 'contexts/MenuContext';
import NewbieSelect from '../NewbieSelect';

jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('atoms/PlusButton', () => 'PlusButton');
jest.mock('components/UserGrid', () => 'UserGrid');
jest.mock('atoms/EmptyState', () => 'EmptyState');
jest.mock('atoms/NiewbieGridPlaceHolder', () => 'NiewbieGridPlaceHolder');
jest.mock('atoms/PageContainer/', () => 'PageContainer');
jest.doMock('components/Header');

describe('Component - NewbieSelect', () => {
  const path = '/buddy/newbies';

  it('renders correctly', async () => {
    const component = create(
      <MockedProvider mocks={newbieSelectMock} addTypename={false} resolvers={{}}>
        <MemoryRouter initialEntries={[path]}>
          <Route path={'/buddy/newbies'}>
            <AuthProvider value={mockedBuddyContext()}>
              <MenuProvider>
                <NewbieSelect />
              </MenuProvider>
            </AuthProvider>
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
