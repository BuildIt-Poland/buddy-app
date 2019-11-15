import React from 'react';
import { create } from 'react-test-renderer';
import { mockSchemaTypes } from '__mocks__';
import TaskCheckbox from '../TaskCheckbox';

jest.mock('buddy-app-schema', () => mockSchemaTypes());
jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/Checkbox', () => 'Checkbox');

describe('Component - TaskCheckbox', () => {
  const taskStatus = mockSchemaTypes().TaskStatus;

  test(`renders correctly when task is ${taskStatus.Uncompleted}`, () => {
    const component = create(
      <TaskCheckbox
        title={'Change you line manager'}
        status={taskStatus.Uncompleted}
        id={'1'}
        onChange={() => null}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  test(`renders correctly when task is ${taskStatus.Completed}`, () => {
    const component = create(
      <TaskCheckbox
        title={'Change you line manager'}
        status={taskStatus.Completed}
        id={'1'}
        onChange={() => null}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
