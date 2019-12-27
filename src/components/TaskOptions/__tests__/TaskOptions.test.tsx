import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import { loginSuccessMock, loginFailedMock } from '__mocks__';
import SnackbarStore from 'stores/SnackbarStore';
import SnackBar from 'components/SnackBar';
import AuthStore from 'stores/AuthStore';
import DialogStore from 'stores/DialogStore';
import AlertDialog from 'components/AlertDialog';
import TaskOptions from '../TaskOptions';
import DICTIONARY from '../dictionary';

describe('Component - TaskOptions', () => {
  const path = '/buddy/newbies/1234/tasks';

  const taskOptionHandlers = {
    deleteTask: jest.fn(),
  };

  const triggerTaskOptions = (mocks: any) => {
    const TaskOptionsRoute = render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <MemoryRouter initialEntries={[path]}>
          <AuthStore>
            <DialogStore>
              <SnackbarStore>
                <Route path={'/buddy/newbies/:newbieId/tasks'}>
                  <TaskOptions id='1' taskOptionHandlers={taskOptionHandlers} />
                </Route>
                <AlertDialog />
                <SnackBar />
              </SnackbarStore>
            </DialogStore>
          </AuthStore>
        </MemoryRouter>
      </MockedProvider>
    );
    const { getByTestId } = TaskOptionsRoute;

    const titleInput = getByTestId('title');
    const descriptionInput = getByTestId('description');

    fireEvent.change(titleInput, {
      target: { value: 'Test task' },
    });
    fireEvent.change(descriptionInput, {
      target: { value: '<h1>Hello world!</h1>' },
    });

    fireEvent.submit(getByTestId('form'));

    return TaskOptionsRoute;
  };

  describe('when submitting form', () => {
    describe('when response is success', () => {
      it('should render success dialog', async () => {
        const { getByTestId } = triggerTaskOptions(addTaskSuccessMock());
        await wait(() => {
          expect(getByTestId('snack-bar')).toBeInTheDocument();
        });
      });
    });

    describe('when the server throws an error', () => {
      it('should render error dialog', async () => {
        const { getByTestId } = triggerTaskOptions(addTaskFailedMock());
        await wait(() => {
          expect(getByTestId('snack-bar')).toHaveTextContent(
            DICTIONARY.DELETE_SNACKBAR.SUCCESS
          );
          expect(getByTestId('snack-bar')).toBeInTheDocument();
        });
      });
    });
  });
});
