import React from 'react';
import { create, act } from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router';
import { ROUTES } from 'shared/routes';
import { taskDetailsMock } from '__mocks__';
import waitForExpect from 'wait-for-expect';
import TaskDetails from '../TaskDetails';

jest.mock('components/PageContainer', () => 'PageContainer');
jest.mock('@material-ui/core/CircularProgress', () => 'CircularProgress');
jest.mock('components/TaskCheckbox', () => 'TaskCheckbox');
jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('components/Header', () => {
  const res = require.requireActual('components/Header');
  res.default = (props: any) => <header {...props} />;
  return res;
});

describe('Component - TaskDetails', () => {
  test('renders correctly', async () => {
    const component = create(
      <MockedProvider mocks={taskDetailsMock} addTypename={false}>
        <MemoryRouter initialEntries={[ROUTES.BASE]}>
          <TaskDetails />
        </MemoryRouter>
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
