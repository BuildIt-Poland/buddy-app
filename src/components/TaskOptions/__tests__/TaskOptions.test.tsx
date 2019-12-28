import React from 'react';
import { render, fireEvent, wait, cleanup } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { authContext } from '__mocks__';
import SnackbarStore from 'stores/SnackbarStore';
import SnackBar from 'components/SnackBar';
import AuthContext, { AuthContextData } from 'contexts/AuthContext';
import DialogStore from 'stores/DialogStore';
import AlertDialog from 'components/AlertDialog';
import TaskOptions from '../TaskOptions';
import DICTIONARY from '../dictionary';

describe('Component - TaskOptions', () => {
  const path = '/buddy/newbies/1234/tasks';

  const triggerTaskOptions = (mocks: any) => {
    const TaskOptionsRoute = render(
      <MemoryRouter initialEntries={[path]}>
        <AuthContext.Provider value={authContext() as AuthContextData}>
          <DialogStore>
            <SnackbarStore>
              <Route path={'/buddy/newbies/:newbieId/tasks'}>
                <TaskOptions id='1' taskOptionHandlers={mocks} />
              </Route>
              <AlertDialog />
              <SnackBar />
            </SnackbarStore>
          </DialogStore>
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const { getByTestId } = TaskOptionsRoute;

    const taskOptionsBtn = getByTestId('task-options-btn');
    fireEvent.click(taskOptionsBtn);

    const deleteOption = getByTestId(DICTIONARY.OPTIONS.DELETE);
    fireEvent.click(deleteOption);

    const deleteDialogConfirmBtn = getByTestId('alert-dialog-confirm');
    fireEvent.click(deleteDialogConfirmBtn);

    return TaskOptionsRoute;
  };

  afterEach(() => cleanup);

  describe('when deleting task', () => {
    describe('when response is success', () => {
      it('should render success dialog', async () => {
        const deleteTaskSuccessMock = {
          deleteTask: () => Promise.resolve(),
        };
        const { getByTestId } = triggerTaskOptions(deleteTaskSuccessMock);
        await wait(() => {
          expect(getByTestId('snack-bar')).toBeInTheDocument();
          expect(getByTestId('snack-bar')).toHaveTextContent(
            DICTIONARY.DELETE_SNACKBAR.SUCCESS
          );
        });
      });
    });

    describe('when the server throws an error', () => {
      it('should render error dialog', async () => {
        const deleteTaskFailedMock = {
          deleteTask: () => Promise.reject(),
        };
        const { getByTestId } = triggerTaskOptions(deleteTaskFailedMock);
        await wait(() => {
          expect(getByTestId('snack-bar')).toBeInTheDocument();
          expect(getByTestId('snack-bar')).toHaveTextContent(
            DICTIONARY.DELETE_SNACKBAR.ERROR
          );
        });
      });
    });
  });
});
