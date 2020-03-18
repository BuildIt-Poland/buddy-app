import React from 'react';
import { create, act } from 'react-test-renderer';
import waitForExpect from 'wait-for-expect';
import { MockedProvider } from '@apollo/react-testing';
import { mockedBuddyContext } from '__mocks__';
import { AuthProvider } from 'contexts/AuthContext';
import DropDown from '../DropDown';

describe('Component - DropDown', () => {
  const component = create(
    <MockedProvider>
      <AuthProvider value={mockedBuddyContext()}>
        <DropDown id='1' options={[]} />
      </AuthProvider>
    </MockedProvider>
  );

  it('renders correctly', async () => {
    expect(component.toJSON()).toMatchSnapshot();

    await act(async () => {
      await waitForExpect(() => {
        expect(component.toJSON()).toMatchSnapshot();
      });
    });
  });
});
