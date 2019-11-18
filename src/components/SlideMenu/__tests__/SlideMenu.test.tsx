import React from 'react';
import { create, act } from 'react-test-renderer';
import SlideMenu from 'components/SlideMenu';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter, Route } from 'react-router';
import { authContext, buddyUserMenuDetails, mockSchemaTypes } from '__mocks__';
import AuthContext from 'contexts/AuthContext';
import waitForExpect from 'wait-for-expect';

jest.mock('buddy-app-schema', () => ({
  UserRole: {
    Newbie: 'NEWBIE',
    Buddy: 'BUDDY',
  },
}));
jest.mock('components/UserMenuDetails/UserMenuDetails', () => 'UserMenuDetails');
jest.mock('components/BuddyMenuSection/BuddyMenuSection', () => 'BuddyMenuSection');
jest.mock('@material-ui/core/IconButton', () => 'IconButton');
jest.mock('@material-ui/icons/Close', () => 'CloseIcon');
jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/Drawer', () => 'Drawer');
jest.mock('@material-ui/core/Divider', () => 'Divider');

jest.mock(
  'components/NewbiesMenuSection/NewbiesMenuSection',
  () => 'NewbiesMenuSection'
);
jest.mock('components/UserMenuSettings/UserMenuSettings', () => 'UserMenuSettings');
jest.mock('components/UserMenuSettings/UserMenuSettings', () => 'UserMenuSettings');

const mockedContext = {
  data: {
    userId: 'id',
    token: 'token',
    role: mockSchemaTypes().UserRole.Buddy,
  },
};

const context: any = authContext(mockedContext);

describe('SlideMenu component', () => {
  const path = '/buddy/newbies';
  it('renders correctly', async () => {
    const onCloseMock = jest.fn();
    const tree = create(
      <MockedProvider
        mocks={[buddyUserMenuDetails({ buddyId: '1234' })]}
        addTypename={false}>
        <MemoryRouter initialEntries={[path]}>
          <Route path={path}>
            <AuthContext.Provider value={context}>
              <SlideMenu isMenuVisible={false} onClose={onCloseMock} />
            </AuthContext.Provider>
          </Route>
        </MemoryRouter>
      </MockedProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
    await act(async () => {
      await waitForExpect(() => {
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
