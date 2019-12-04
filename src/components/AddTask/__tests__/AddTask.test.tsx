import React from 'react';
import { create } from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router';
import { ROUTES } from 'shared/routes';
import { taskDetailsMock } from '__mocks__';
import AddTask from '../AddTask';

jest.mock('@material-ui/core/CircularProgress', () => 'CircularProgress');
jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/TextField', () => 'TextField');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('components/AppWrapper', () => 'AppWrapper');
jest.mock('components/NavBar', () => 'NavBar');
jest.mock('components/RoundedButton', () => 'RoundedButton');
jest.mock('components/BackgroundShape', () => 'BackgroundShape');
jest.mock('decorators/withSnackBar', () => (component: React.FC<any>) => component);

describe('Component - AddTask', () => {
  test('renders correctly', () => {
    const component = create(
      <MockedProvider mocks={taskDetailsMock} addTypename={false}>
        <MemoryRouter initialEntries={[ROUTES.BASE]}>
          <AddTask />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
