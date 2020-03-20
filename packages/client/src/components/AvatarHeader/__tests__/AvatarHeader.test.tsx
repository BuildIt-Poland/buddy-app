import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { AuthProvider } from 'contexts/AuthContext';
import AvatarHeader from 'components/AvatarHeader';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter, Route } from 'react-router';
import waitForExpect from 'wait-for-expect';
import { NewbieAvatarDetails, mockedBuddyContext } from '__mocks__';

jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/CircularProgress', () => 'CircularProgress');
jest.mock('atoms/Avatar', () => 'Avatar');

describe('Component - AvatarHeader', () => {
  const path = '/buddy/newbies/1234/tasks';

  it('renders correctly', async () => {
    let component: ReactTestRenderer;
    component = create(
      <MockedProvider
        mocks={[NewbieAvatarDetails({ newbieId: '1234' })]}
        addTypename={false}>
        <MemoryRouter initialEntries={[path]}>
          <Route path={'/buddy/newbies/:newbieId/tasks'}>
            <AuthProvider value={mockedBuddyContext()}>
              <AvatarHeader newbieId='1234' taskProgress={0.54} />
            </AuthProvider>
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
    expect(component).toMatchSnapshot();

    await act(async () => {
      await waitForExpect(() => {
        expect(component).toMatchSnapshot();
      });
    });
  });
});
