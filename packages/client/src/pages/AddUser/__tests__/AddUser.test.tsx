import React from 'react';
import { render, fireEvent, wait, cleanup } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter, Route } from 'react-router';
import {
  addNewbieSuccessMock,
  addNewbieFailedMock,
  mockedBuddyContext,
} from '__mocks__';
import { SnackbarProvider } from 'contexts/SnackbarContext';
import { AuthProvider } from 'contexts/AuthContext';
import AddUser from '../AddUser';

describe('Component - AddUser', () => {
  const path = '/buddy/add-newbie';

  const triggerAddUser = (mocks: any) => {
    const addUserRoute = render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <MemoryRouter initialEntries={[path]}>
          <SnackbarProvider>
            <AuthProvider value={mockedBuddyContext()}>
              <Route path={path} component={AddUser} />
            </AuthProvider>
          </SnackbarProvider>
        </MemoryRouter>
      </MockedProvider>
    );
    const { getByTestId } = addUserRoute;

    const nameInput = getByTestId('name');
    const emailInput = getByTestId('email');

    fireEvent.change(nameInput, {
      target: { value: 'Test newbie' },
    });
    fireEvent.change(emailInput, {
      target: { value: 'test_newbie@email.com' },
    });

    fireEvent.submit(getByTestId('form'));

    return addUserRoute;
  };

  afterEach(() => cleanup);

  describe('when submitting form', () => {
    describe('when response is success', () => {
      it('should render success dialog', async () => {
        const { getByTestId } = triggerAddUser(addNewbieSuccessMock());

        await wait();

        expect(getByTestId('snack-bar')).toBeInTheDocument();
      });
    });

    describe('when the server throws an error', () => {
      it('should render error dialog', async () => {
        const { getByTestId } = triggerAddUser(addNewbieFailedMock());
        await wait();

        expect(getByTestId('snack-bar')).toBeInTheDocument();
      });
    });
  });
});
