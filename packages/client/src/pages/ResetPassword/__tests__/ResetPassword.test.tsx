import React from 'react';
import { create, act } from 'react-test-renderer';
import waitForExpect from 'wait-for-expect';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import { mockLocation, authPayloadMock } from '__mocks__';

import { ROUTES } from 'shared/routes';
import { AuthProvider } from 'contexts/AuthContext';
import { DialogProvider } from 'contexts/DialogContext';
import ResetPassword from '../ResetPassword';

jest.mock('utils/auth');
jest.mock('utils/apollo-client');

describe('Component - ResetPassword', () => {
  const path = ROUTES.RESET_PASSWORD.replace(':token', authPayloadMock.token);
  const component = create(
    <MockedProvider mocks={[]} addTypename={false} resolvers={{}}>
      <MemoryRouter initialEntries={[mockLocation(path)]}>
        <AuthProvider>
          <DialogProvider>
            <Route path={ROUTES.RESET_PASSWORD} component={ResetPassword} />
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
