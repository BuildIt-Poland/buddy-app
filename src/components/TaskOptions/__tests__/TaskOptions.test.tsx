import React from 'react';
import { render, fireEvent, wait, cleanup } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { mockedBuddyContext } from '__mocks__';
import { AuthProvider } from 'contexts/AuthContext';
import { SnackbarProvider } from 'contexts/SnackbarContext';
import DialogProvider from 'stores/DialogProvider';
import AlertDialog from 'components/AlertDialog';
import TaskOptions from '../TaskOptions';
import DICTIONARY from '../dictionary';

describe('Component - TaskOptions', () => {
  const triggerTaskOptions = (mocks: any) => {
    const TaskOptionsRoute = render(
      <MockedProvider resolvers={{}}>
        <AuthProvider value={mockedBuddyContext()}>
          <DialogProvider>
            <SnackbarProvider>
              <TaskOptions id='1' taskOptionHandlers={mocks} />
              <AlertDialog />
            </SnackbarProvider>
          </DialogProvider>
        </AuthProvider>
      </MockedProvider>
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
