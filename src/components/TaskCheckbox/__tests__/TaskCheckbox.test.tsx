import React from 'react';
import { create } from 'react-test-renderer';

import { TaskStatus } from 'types';
import TaskCheckbox from '../TaskCheckbox';

jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/Checkbox', () => 'Checkbox');

describe('Component - TaskCheckbox', () => {
  test(`renders correctly when task is ${TaskStatus.Uncompleted}`, () => {
    const component = create(
      <TaskCheckbox
        title={'Change you line manager'}
        status={TaskStatus.Uncompleted}
        id={'1'}
        onChange={() => null}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  test(`renders correctly when task is ${TaskStatus.Completed}`, () => {
    const component = create(
      <TaskCheckbox
        title={'Change you line manager'}
        status={TaskStatus.Completed}
        id={'1'}
        onChange={() => null}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
