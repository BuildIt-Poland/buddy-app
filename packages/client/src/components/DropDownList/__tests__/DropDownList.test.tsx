import React from 'react';
import { create, act } from 'react-test-renderer';
import waitForExpect from 'wait-for-expect';
import { MockedProvider } from '@apollo/react-testing';
import { mockedBuddyContext } from '__mocks__';
import { AuthProvider } from 'contexts/AuthContext';
import DropDownList from '../DropDownList';

describe('Component - TaskOptions', () => {
  const component = create(
    <MockedProvider>
      <AuthProvider value={mockedBuddyContext()}>
        <DropDownList id='1' options={[]} />
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
