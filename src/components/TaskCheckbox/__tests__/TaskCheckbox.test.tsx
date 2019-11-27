import React from 'react';
import { create } from 'react-test-renderer';
import { TaskStatus } from '__mocks__';
import { MemoryRouter } from 'react-router';
import TaskCheckbox from '../TaskCheckbox';

jest.mock('@material-ui/core/ListItem', () => 'ListItem');
jest.mock('@material-ui/core/ListItemIcon', () => 'ListItemIcon');
jest.mock('@material-ui/core/ListItemText', () => 'ListItemText');
jest.mock('@material-ui/core/Checkbox', () => 'Checkbox');

describe('Component - TaskCheckbox', () => {
  const { Uncompleted, Completed } = TaskStatus;

  test(`renders correctly when task is ${Uncompleted}`, () => {
    const component = create(
      <MemoryRouter>
        <TaskCheckbox
          title={'Change you line manager'}
          status={Uncompleted}
          id={'1'}
          onChange={() => null}
        />
      </MemoryRouter>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  test(`renders correctly when task is ${Completed}`, () => {
    const component = create(
      <MemoryRouter>
        <TaskCheckbox
          title={'Change you line manager'}
          status={Completed}
          id={'1'}
          onChange={() => null}
        />
      </MemoryRouter>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
