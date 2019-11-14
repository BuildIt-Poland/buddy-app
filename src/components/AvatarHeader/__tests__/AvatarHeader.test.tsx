import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';

import AvatarHeader from 'components/AvatarHeader';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter, Route } from 'react-router';
import waitForExpect from 'wait-for-expect';
import AVATAR_HEADER from '../../../graphql/avatar-header.graphql';

jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/CircularProgress', () => 'CircularProgress');
jest.mock('components/Avatar', () => 'Avatar');

describe('Component - AvatarHeader', () => {
  const path = '/buddy/newbies/1234/tasks';
  const NewbieAvatarDetailsResponse = [
    {
      request: {
        query: AVATAR_HEADER,
        variables: {
          newbieId: '1234',
        },
      },
      result: {
        data: {
          newbie: {
            name: 'Tom Hanks',
            position: 'front-end',
            photo: 'some-url',
            tasksInfo: {
              buddyProgress: 0.54,
            },
          },
        },
      },
    },
  ];

  it('renders correctly', async () => {
    let component: ReactTestRenderer;
    component = create(
      <MockedProvider mocks={NewbieAvatarDetailsResponse} addTypename={false}>
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
