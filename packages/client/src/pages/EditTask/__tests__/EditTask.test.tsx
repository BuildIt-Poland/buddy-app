import React from 'react';
import { create, act } from 'react-test-renderer';
import waitForExpect from 'wait-for-expect';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter, Route } from 'react-router';
import { SnackbarProvider } from 'contexts/SnackbarContext';
import EditTask from '../EditTask';

jest.mock('components/TaskForm', () => 'TaskForm');
jest.mock('atoms/FormPlaceHolder', () => 'FormPlaceHolder');
jest.mock('atoms/BackPageContainer', () => 'BackPageContainer');

describe('Component - EditTask', () => {
  const path = '/buddy/tasks/1234/edit-task';

  it('renders correctly', async () => {
    const component = create(
      <MockedProvider addTypename={false} resolvers={{}}>
        <MemoryRouter initialEntries={[path]}>
          <SnackbarProvider>
            <Route path={'/buddy/tasks/:taskId/edit-task'} component={EditTask} />
          </SnackbarProvider>
        </MemoryRouter>
      </MockedProvider>
    );

    await act(async () => {
      await waitForExpect(() => {
        expect(component.toJSON()).toMatchSnapshot();
      });
    });
  });
});
