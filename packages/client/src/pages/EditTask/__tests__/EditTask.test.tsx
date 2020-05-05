import React from 'react';
import { render, fireEvent, wait, cleanup } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter, Route } from 'react-router';
import { editTaskSuccessMock, editTaskFailedMock } from '__mocks__';
import { SnackbarProvider } from 'contexts/SnackbarContext';
import EditTask from '../EditTask';
import DICTIONARY from '../dictionary';

jest.mock('atoms/BackPageContainer', () => 'BackPageContainer');

describe('Component - EditTask', () => {
  const path = '/buddy/tasks/1234/edit-task';

  const triggerEditTask = (mocks: any) => {
    const editTaskRoute = render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <MemoryRouter initialEntries={[path]}>
          <SnackbarProvider>
            <Route path={'/buddy/tasks/:taskId/edit-task'} component={EditTask} />
          </SnackbarProvider>
        </MemoryRouter>
      </MockedProvider>
    );
    const { getByTestId } = editTaskRoute;

    const titleInput = getByTestId('title');
    const descriptionInput = getByTestId('description');

    fireEvent.change(titleInput, {
      target: { value: 'Test task' },
    });
    fireEvent.change(descriptionInput, {
      target: { value: '<h1>Hello world!</h1>' },
    });

    fireEvent.submit(getByTestId('form'));

    return editTaskRoute;
  };

  afterEach(() => cleanup);

  describe('when submitting form', () => {
    describe('when response is success', () => {
      it('should render success dialog', async () => {
        const { getByTestId } = triggerEditTask(editTaskSuccessMock());

        await wait();

        expect(getByTestId('snack-bar')).toBeInTheDocument();
      });
    });

    describe('when the server throws an error', () => {
      it('should render error dialog', async () => {
        const { getByTestId } = triggerEditTask(editTaskFailedMock());
        await wait();

        expect(getByTestId('snack-bar')).toHaveTextContent(DICTIONARY.ERROR_MESSAGE);
        expect(getByTestId('snack-bar')).toBeInTheDocument();
      });
    });
  });
});
