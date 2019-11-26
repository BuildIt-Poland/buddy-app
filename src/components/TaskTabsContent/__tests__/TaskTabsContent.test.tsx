import React from 'react';
import { create } from 'react-test-renderer';
import { tasksResponse } from '__mocks__';
import TasksSubList from 'components/TasksSubList';
import TaskTabsContent from '../';

jest.mock('@material-ui/core/List', () => 'List');
jest.mock('components/TasksSubList', () => 'TasksSubList');

describe('Component - TaskTabsContent', () => {
  test(`renders correctly`, () => {
    const component = create(<TaskTabsContent tasks={tasksResponse()} />);
    expect(component.toJSON()).toMatchSnapshot();
    expect(component.root.findAllByType(TasksSubList).length).toBe(2);
  });
});
