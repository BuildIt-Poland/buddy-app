import React from 'react';
import { create, act } from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';
import waitForExpect from 'wait-for-expect';
import { newbieSelectMock } from '__mocks__';
import NewbieSelect from '../NewbieSelect';

jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('components/NavBar', () => 'Navbar');
jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('components/PlusButton/', () => 'PlusButton');
jest.mock('components/Carrousel/', () => 'Carrousel');
jest.mock('components/BackgroundShape/', () => 'BackgroundShape');
jest.mock('components/AppWrapper', () => 'AppWrapper');
jest.mock('@material-ui/core/CircularProgress', () => 'CircularProgress');

describe('Component - NewbieSelect', () => {
  it('renders correctly', async () => {
    const component = create(
      <MockedProvider mocks={newbieSelectMock} addTypename={false}>
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
