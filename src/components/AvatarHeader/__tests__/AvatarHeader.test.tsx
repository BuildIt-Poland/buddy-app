import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';

import AvatarHeader from 'components/AvatarHeader';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter, Route } from 'react-router';
import waitForExpect from 'wait-for-expect';
import { NewbieAvatarDetails } from '__mocks__';

jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/CircularProgress', () => 'CircularProgress');
jest.mock('components/Avatar', () => 'Avatar');
jest.mock('buddy-app-schema', () => {});

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
            <AvatarHeader />
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
