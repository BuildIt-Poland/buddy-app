import React from 'react';
import { create } from 'react-test-renderer';
import { tasksResponse, TaskStatus } from '__mocks__';
import TasksSubList from '../';

jest.mock('@material-ui/core/ListSubheader', () => 'ListSubheader');
jest.mock('components/TaskCheckbox', () => 'TaskCheckbox');

describe('Component - TasksSubList', () => {
  test(`renders correctly Todo section`, () => {
    const component = create(
      <TasksSubList title='Todo' tasks={tasksResponse(TaskStatus.Uncompleted)} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test(`renders correctly Done section`, () => {
    const component = create(
      <TasksSubList title='Done' tasks={tasksResponse(TaskStatus.Completed)} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test(`renders correctly without tasks and count`, () => {
    const component = create(<TasksSubList title='Todo' tasks={[]} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
