import React from 'react';
import { create, act } from 'react-test-renderer';
import waitForExpect from 'wait-for-expect';
import { MemoryRouter, Route } from 'react-router';
import AddUserOptions from '../AddUserOptions';

jest.mock('@material-ui/icons/PersonAdd', () => 'AddUserIcon');
jest.mock('atoms/PlusButton', () => 'PlusButton');
jest.mock('components/DropDown', () => 'DropDown');

describe('Component - AddUserOptions', () => {
  const component = create(
    <MemoryRouter initialEntries={[]}>
      <Route path={'/buddy/newbies/:newbieId'}>
        <AddUserOptions />
      </Route>
    </MemoryRouter>
  );

  it('renders correctly', async () => {
    await act(async () => {
      await waitForExpect(() => {
        expect(component.toJSON()).toMatchSnapshot();
      });
    });
  });
});
