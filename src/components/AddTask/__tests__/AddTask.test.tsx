import React from 'react';
import { render, fireEvent, wait, cleanup } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter, Route } from 'react-router';
import { addTaskSuccessMock, addTaskFailedMock } from '__mocks__';
import SnackbarStore from 'stores/SnackbarStore';
import SnackBar from 'components/SnackBar';
import AddTask from '../AddTask';
import DICTIONARY from '../dictionary';

jest.mock('components/Header', () => {
  const res = require.requireActual('components/Header');
  res.default = (props: any) => <header {...props} />;
  return res;
});

describe('Component - AddTask', () => {
  const path = '/buddy/newbies/1234/add-task';

  const triggerAddTask = (mocks: any) => {
    const addTaskRoute = render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <MemoryRouter initialEntries={[path]}>
          <Route path={'/buddy/newbies/:newbieId/add-task'}>
            <SnackbarStore>
              <AddTask />
              <SnackBar />
            </SnackbarStore>
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
    const { getByTestId } = addTaskRoute;

    const titleInput = getByTestId('title');
    const descriptionInput = getByTestId('description');

    fireEvent.change(titleInput, {
      target: { value: 'Test task' },
    });
    fireEvent.change(descriptionInput, {
      target: { value: '<h1>Hello world!</h1>' },
    });

    fireEvent.submit(getByTestId('form'));

    return addTaskRoute;
  };

  afterEach(() => cleanup);

  describe('when submitting form', () => {
    describe('when response is success', () => {
      it('should render success dialog', async () => {
        const { getByTestId } = triggerAddTask(addTaskSuccessMock());
        await wait(() => {
          expect(getByTestId('snack-bar')).toBeInTheDocument();
        });
      });
    });

    describe('when the server throws an error', () => {
      it('should render error dialog', async () => {
        const { getByTestId } = triggerAddTask(addTaskFailedMock());
        await wait(() => {
          expect(getByTestId('snack-bar')).toHaveTextContent(
            DICTIONARY.ERROR_MESSAGE
          );
          expect(getByTestId('snack-bar')).toBeInTheDocument();
        });
      });
    });
  });
});
