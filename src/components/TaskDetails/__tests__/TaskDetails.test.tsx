import React from 'react';
import { create } from 'react-test-renderer';

import { MemoryRouter } from 'react-router';
import { ROUTES } from 'shared/routes';
import TaskDetails from '../TaskDetails';

jest.mock('components/AppWrapper', () => 'AppWrapper');

describe('Component - TaskDetails', () => {
  test('renders correctly', () => {
    const component = create(
      <MemoryRouter initialEntries={[ROUTES.BASE]}>
        <TaskDetails />
      </MemoryRouter>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
