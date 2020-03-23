import React from 'react';
import { create, act } from 'react-test-renderer';
import waitForExpect from 'wait-for-expect';
import { MemoryRouter, Route } from 'react-router';
import { MockedProvider } from '@apollo/react-testing';
import { SnackbarProvider } from 'contexts/SnackbarContext';
import { DialogProvider } from 'contexts/DialogContext';
import { LoadingProvider } from 'contexts/LoadingContext';
import { taskListResponse, newbieTasksListMock } from '__mocks__';
import AddTaskOptions from '../AddTaskOptions';

jest.mock('@material-ui/icons/LibraryBooks', () => 'LibraryBooks');
jest.mock('@material-ui/icons/LibraryAdd', () => 'LibraryAdd');
jest.mock('atoms/PlusButton', () => 'PlusButton');
jest.mock('components/DropDown', () => 'DropDown');

describe('Component - AddTaskOptions', () => {
  const path = '/buddy/newbies/1234/tasks';
  const pathname = '/buddy/newbies/1234/add-task';

  const variables = {
    newbieId: '1234',
  };

  const component = create(
    <MockedProvider
      mocks={taskListResponse(variables, newbieTasksListMock)}
      addTypename={false}
      resolvers={{}}>
      <MemoryRouter initialEntries={[path]}>
        <Route path={'/buddy/newbies/:newbieId'}>
          <LoadingProvider>
            <DialogProvider>
              <SnackbarProvider>
                <AddTaskOptions newbieId='1234' to={{ pathname }} />
              </SnackbarProvider>
            </DialogProvider>
          </LoadingProvider>
        </Route>
      </MemoryRouter>
    </MockedProvider>
  );

  it('renders correctly', async () => {
    await act(async () => {
      await waitForExpect(() => {
        expect(component.toJSON()).toMatchSnapshot();
      });
    });
  });
});
