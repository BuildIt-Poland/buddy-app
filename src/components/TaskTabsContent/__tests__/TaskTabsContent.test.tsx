import React from 'react';
import { create } from 'react-test-renderer';
import { tasksResponse } from '__mocks__';
import TasksSubList from 'components/TasksSubList';
import TaskTabsContent from '../';

jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('components/TasksSubList', () => 'TasksSubList');

describe('Component - TaskTabsContent', () => {
  test(`renders correctly`, () => {
    const component = create(
      <TaskTabsContent
        tasks={tasksResponse()}
        uncompletedCount={1}
        completedCount={1}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();

    //component.root.findAllByType(TasksSubList).length;
  });

  test(`renders correctly without tasks and counts`, () => {
    const component = create(<TaskTabsContent tasks={[]} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
