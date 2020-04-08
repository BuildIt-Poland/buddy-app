import React from 'react';
import { create, act } from 'react-test-renderer';
import waitForExpect from 'wait-for-expect';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import { mockLocation } from '__mocks__';

import { ROUTES } from 'shared/routes';
import { AuthProvider } from 'contexts/AuthContext';
import { DialogProvider } from 'contexts/DialogContext';
import ForgotPassword from '../ForgotPassword';

jest.mock('utils/auth');
jest.mock('utils/apollo-client');

describe('Component - ForgotPassword', () => {
  const component = create(
    <MockedProvider mocks={[]} addTypename={false} resolvers={{}}>
      <MemoryRouter initialEntries={[mockLocation(ROUTES.FORGOT_PASSWORD)]}>
        <AuthProvider>
          <DialogProvider>
            <Route path={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
          </DialogProvider>
        </AuthProvider>
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
