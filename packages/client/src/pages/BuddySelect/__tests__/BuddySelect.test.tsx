import React from 'react';
import { create, act } from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';
import waitForExpect from 'wait-for-expect';
import { buddySelectMock, mockedTalentContext } from '__mocks__';
import { AuthProvider } from 'contexts/AuthContext';
import { MenuProvider } from 'contexts/MenuContext';
import BuddySelect from '../BuddySelect';

jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('atoms/PlusButton', () => 'PlusButton');
jest.mock('components/UserGrid', () => 'UserGrid');
jest.mock('atoms/NiewbieGridPlaceHolder', () => 'NiewbieGridPlaceHolder');
jest.mock('atoms/PageContainer/', () => 'PageContainer');
jest.doMock('components/Header');

describe('Component - BuddySelect', () => {
  it('renders correctly', async () => {
    const component = create(
      <MockedProvider mocks={buddySelectMock} addTypename={false} resolvers={{}}>
        <AuthProvider value={mockedTalentContext()}>
          <MenuProvider>
            <BuddySelect />
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
