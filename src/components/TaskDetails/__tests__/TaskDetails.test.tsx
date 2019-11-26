import React from 'react';
import { create } from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router';
import { ROUTES } from 'shared/routes';
import { taskDetailsMock } from '__mocks__';
import TaskDetails from '../TaskDetails';

describe('Component - TaskDetails', () => {
  test('renders correctly', () => {
    const component = create(
      <MockedProvider mocks={taskDetailsMock} addTypename={false}>
        <MemoryRouter initialEntries={[ROUTES.BASE]}>
          <TaskDetails />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
