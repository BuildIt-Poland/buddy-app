import React from 'react';
import { create, act } from 'react-test-renderer';
import waitForExpect from 'wait-for-expect';
import { MockedProvider } from '@apollo/react-testing';
import { mockedBuddyContext } from '__mocks__';
import { AuthProvider } from 'contexts/AuthContext';
import DropDown from '../DropDown';

jest.mock('@material-ui/core/Fade', () => 'Fade');
jest.mock('@material-ui/core/Menu', () => 'Menu');
jest.mock('@material-ui/core/MenuItem', () => 'MenuItem');
jest.mock('@material-ui/core/ListItemIcon', () => 'ListItemIcon');
jest.mock('@material-ui/core/ListItemText', () => 'ListItemText');

describe('Component - DropDown', () => {
  const component = create(
    <MockedProvider mocks={[]} addTypename={false} resolvers={{}}>
      <AuthProvider value={mockedBuddyContext()}>
        <DropDown id='1' renderAnchor={() => <div />} renderOptions={() => []} />
      </AuthProvider>
    </MockedProvider>
  );

  it('renders correctly', async () => {
    await act(async () => {
      await waitForExpect(() => {
        expect(component.toJSON()).toMatchSnapshot();
      });
    });
  });
});
