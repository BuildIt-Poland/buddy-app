import React from 'react';
import { render, wait } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router';
import Logout from '../Logout';
import { ROUTES } from '../../../shared/routes';
import userService from '../../../utils/user-service';

jest.mock('../../../utils/user-service', () => ({
  logout: jest.fn(),
}));

describe('Component - Logout', () => {
  test(`logout user and redirects to ${ROUTES.BASE}`, async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={[ROUTES.LOGOUT]}>
        <Route path={ROUTES.LOGOUT} exact>
          <Logout />
        </Route>
        <Route path={ROUTES.BASE} exact>
          Logout Route
        </Route>
      </MemoryRouter>
    );
    expect(userService.logout).toHaveBeenCalledTimes(1);
    await wait(() => {
      expect(getByText('Logout Route')).toBeInTheDocument();
    });
  });
});
