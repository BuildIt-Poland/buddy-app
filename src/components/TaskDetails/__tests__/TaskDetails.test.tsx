import React from 'react';
import { create } from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router';
import { ROUTES } from 'shared/routes';
import { taskDetailsMock } from '__mocks__';
import TaskDetails from '../TaskDetails';

jest.mock('components/AppWrapper', () => 'AppWrapper');
jest.mock('components/NavBar', () => 'NavBar');
jest.mock('@material-ui/core/CircularProgress', () => 'CircularProgress');
jest.mock('components/TaskCheckbox', () => 'TaskCheckbox');
jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('decorators/withSnackBar', () => (component: React.FC<any>) => component);

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
