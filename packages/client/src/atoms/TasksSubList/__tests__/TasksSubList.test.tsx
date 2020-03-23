import React from 'react';
import { create } from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router';
import { ROUTES } from 'shared/routes';
import { taskDetailsMock } from '__mocks__';
import { tasksResponse, TaskStatus } from '__mocks__';
import TasksSubList from '..';

jest.mock('@material-ui/core/List', () => 'List');
jest.mock('@material-ui/core/ListSubheader', () => 'ListSubheader');
jest.mock('@material-ui/core/ListItem', () => 'ListItem');
jest.mock('components/TaskListItem', () => 'TaskListItem');

describe('Component - TasksSubList', () => {
  const render = (component: any) => (
    <MockedProvider mocks={taskDetailsMock} addTypename={false}>
      <MemoryRouter initialEntries={[ROUTES.BASE]}>{component}</MemoryRouter>
    </MockedProvider>
  );
  test(`renders correctly Todo section`, () => {
    const component = create(
      render(
        <TasksSubList title='Todo' tasks={tasksResponse(TaskStatus.Uncompleted)} />
      )
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test(`renders correctly Done section`, () => {
    const component = create(
      render(
        <TasksSubList title='Done' tasks={tasksResponse(TaskStatus.Completed)} />
      )
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test(`renders correctly without tasks and count`, () => {
    const component = create(render(<TasksSubList title='Todo' tasks={[]} />));
    expect(component.toJSON()).toMatchSnapshot();
  });
});
