import React from 'react';
import { create } from 'react-test-renderer';
import { TaskStatus } from '__mocks__';
import { MemoryRouter } from 'react-router';
import TaskCheckbox from '../TaskCheckbox';

jest.mock('@material-ui/core/Checkbox', () => 'Checkbox');
jest.mock('@material-ui/icons/CheckCircle', () => 'CheckCircle');
jest.mock('@material-ui/icons/RadioButtonUnchecked', () => 'RadioButtonUnchecked');

describe('Component - TaskCheckbox', () => {
  const { Uncompleted, Completed } = TaskStatus;

  test(`renders correctly when task is ${Uncompleted}`, () => {
    const component = create(
      <MemoryRouter>
        <TaskCheckbox id='1' status={Uncompleted} onChange={() => null} />
      </MemoryRouter>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  test(`renders correctly when task is ${Completed}`, () => {
    const component = create(
      <MemoryRouter>
        <TaskCheckbox id='1' status={Completed} onChange={() => null} />
      </MemoryRouter>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
