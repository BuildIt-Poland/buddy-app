import React from 'react';
import { create, act } from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';
import waitForExpect from 'wait-for-expect';
import { newbieSelectMock, mockedBuddyContext } from '__mocks__';
import { AuthProvider } from 'contexts/AuthContext';
import { MenuProvider } from 'contexts/MenuContext';
import NewbieSelect from '../NewbieSelect';

jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('components/PlusButton/', () => 'PlusButton');
jest.mock('components/NewbieGrid', () => 'NewbieGrid');
jest.mock('components/PageContainer/', () => 'PageContainer');
jest.doMock('components/Header');

describe('Component - NewbieSelect', () => {
  it('renders correctly', async () => {
    const component = create(
      <MockedProvider mocks={newbieSelectMock} addTypename={false} resolvers={{}}>
        <AuthProvider value={mockedBuddyContext()}>
          <MenuProvider>
            <NewbieSelect />
          </MenuProvider>
        </AuthProvider>
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
