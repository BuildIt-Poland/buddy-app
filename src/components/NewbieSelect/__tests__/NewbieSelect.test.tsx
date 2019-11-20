import React from 'react';
import { create, act } from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';
import waitForExpect from 'wait-for-expect';
import NEWBIE_SELECT from 'graphql/newbieSelect.graphql';
import NewbieSelect from '../NewbieSelect';

jest.mock('buddy-app-schema', () => {});
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('components/NavBar', () => 'Navbar');
jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('components/PlusButton/', () => 'PlusButton');
jest.mock('components/Carrousel/', () => 'Carrousel');
jest.mock('components/BackgroundShape/', () => 'BackgroundShape');
jest.mock('components/AppWrapper', () => 'AppWrapper');
jest.mock('@material-ui/core/CircularProgress', () => 'CircularProgress');

describe('Component - NewbieSelect', () => {
  const NewbieSelectResponse = [
    {
      request: {
        query: NEWBIE_SELECT,
        variables: {
          buddyId: 'ck17sl83c9gya0b17dcvttzm4',
        },
      },
      result: {
        data: {
          buddy: {
            id: 'ck17sl83c9gya0b17dcvttzm4',
            name: 'Dummy',
            role: 'BUDDY',
            photo: null,
            newbies: [
              {
                id: 'ck17svulh9k2k0b17j31ansfk',
                photo: null,
                name: 'Test 2',
                startDate: null,
                tasksInfo: { buddyProgress: 0.5 },
              },
              {
                id: 'ck17swp2m9kcv0b17we0ibrdn',
                photo: null,
                name: 'Test 1',
                startDate: null,
                tasksInfo: { buddyProgress: 0.6 },
              },
            ],
          },
        },
      },
    },
  ];
  it('renders correctly', async () => {
    const component = create(
      <MockedProvider mocks={NewbieSelectResponse} addTypename={false}>
        <NewbieSelect />
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
