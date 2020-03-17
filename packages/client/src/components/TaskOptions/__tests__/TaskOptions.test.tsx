import React from 'react';
import { create, act } from 'react-test-renderer';
import waitForExpect from 'wait-for-expect';
import { MemoryRouter, Route } from 'react-router';
import { MockedProvider } from '@apollo/react-testing';
import { SnackbarProvider } from 'contexts/SnackbarContext';
import { DialogProvider } from 'contexts/DialogContext';
import TaskOptions from '../TaskOptions';

describe('Component - TaskOptions', () => {
  const path = '/buddy/newbies/33/tasks';

  const component = create(
    <MockedProvider>
      <MemoryRouter initialEntries={[path]}>
        <Route path={'/buddy/newbies/:newbieId/tasks'}>
          <DialogProvider>
            <SnackbarProvider>
              <TaskOptions id='1' />
            </SnackbarProvider>
          </DialogProvider>
        </Route>
      </MemoryRouter>
    </MockedProvider>
  );

  it('renders correctly', async () => {
    expect(component.toJSON()).toMatchSnapshot();

    await act(async () => {
      await waitForExpect(() => {
        expect(component.toJSON()).toMatchSnapshot();
      });
    });
  });
});
