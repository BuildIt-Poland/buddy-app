import React from 'react';
import { create } from 'react-test-renderer';
import { tasksResponse } from '__mocks__';
import TasksSubList from '../';

jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('components/TaskCheckbox', () => 'TaskCheckbox');

describe('Component - TasksSubList', () => {
  test(`renders correctly Todo section`, () => {
    const component = create(
      <TasksSubList title='Todo' tasks={tasksResponse('uncompleted')} count={1} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test(`renders correctly Done section`, () => {
    const component = create(
      <TasksSubList title='Done' tasks={tasksResponse('completed')} count={1} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test(`renders correctly without tasks and count`, () => {
    const component = create(<TasksSubList title='Todo' tasks={[]} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
