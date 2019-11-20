import React from 'react';
import { create } from 'react-test-renderer';
import { TaskStatus } from '__mocks__';
import TaskCheckbox from '../TaskCheckbox';

jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/Checkbox', () => 'Checkbox');

describe('Component - TaskCheckbox', () => {
  const { Uncompleted, Completed } = TaskStatus;

  test(`renders correctly when task is ${Uncompleted}`, () => {
    const component = create(
      <TaskCheckbox
        title={'Change you line manager'}
        status={Uncompleted}
        id={'1'}
        onChange={() => null}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  test(`renders correctly when task is ${Completed}`, () => {
    const component = create(
      <TaskCheckbox
        title={'Change you line manager'}
        status={Completed}
        id={'1'}
        onChange={() => null}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
