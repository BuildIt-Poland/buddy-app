import React from 'react';
import { create } from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter, Route } from 'react-router';
import { SnackbarProvider } from 'contexts/SnackbarContext';
import EditTask from '../EditTask';

jest.mock('components/TaskForm', () => 'TaskForm');
jest.mock('atoms/FormPlaceHolder', () => 'FormPlaceHolder');
jest.mock('atoms/BackPageContainer', () => 'BackPageContainer');

describe('Component - EditTask', () => {
  test('renders correctly', () => {
    const path = '/buddy/tasks/1234/edit-task';
    const component = create(
      <MockedProvider addTypename={false}>
        <MemoryRouter initialEntries={[path]}>
          <SnackbarProvider>
            <Route path={'/buddy/tasks/:taskId/edit-task'} component={EditTask} />
          </SnackbarProvider>
        </MemoryRouter>
      </MockedProvider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
