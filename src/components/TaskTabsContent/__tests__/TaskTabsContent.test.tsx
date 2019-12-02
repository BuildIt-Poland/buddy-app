import React from 'react';
import { create } from 'react-test-renderer';
import { tasksResponse } from '__mocks__';
import TasksSubList from 'components/TasksSubList';
import TaskTabsContent from '../';

jest.mock('@material-ui/core/List', () => 'List');
jest.mock('components/TasksSubList', () => 'TasksSubList');
jest.mock('components/TaskListPlaceHolder', () => 'TaskListPlaceHolder');

describe('Component - TaskTabsContent', () => {
  describe('when is loading', () => {
    test(`renders correctly`, () => {
      const component = create(<TaskTabsContent loading={true} tasks={[]} />);
      expect(component.toJSON()).toMatchSnapshot();
      expect(component.root.findAllByType(TasksSubList).length).toBe(0);
    });
  });

  describe('when is not loading', () => {
    describe('when there are tasks', () => {
      test(`renders correctly`, () => {
        const component = create(
          <TaskTabsContent loading={false} tasks={tasksResponse()} />
        );
        expect(component.toJSON()).toMatchSnapshot();
        expect(component.root.findAllByType(TasksSubList).length).toBe(2);
      });
    });

    describe('when there are not tasks', () => {
      test(`renders correctly`, () => {
        const component = create(<TaskTabsContent loading={false} tasks={[]} />);
        expect(component.toJSON()).toMatchSnapshot();
        expect(component.root.findAllByType(TasksSubList).length).toBe(0);
      });
    });
  });
});
