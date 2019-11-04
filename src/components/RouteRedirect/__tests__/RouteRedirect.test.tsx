import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { create } from 'react-test-renderer';
import RouteRedirect from '../RouteRedirect';
import { ROUTES } from '../../../shared/routes';

jest.mock('../../../utils/user.service', () => ({
  isAuthenticated: true,
  getUser: () => ({
    role: 'BUDDY',
    id: '1234',
  }),
}));

describe('Component - RouteRedirect', () => {
  test('renders correctly', () => {
    const component = create(
      <MemoryRouter initialEntries={[ROUTES.BASE]}>
        <Route path={ROUTES.BASE} exact>
          <RouteRedirect />
        </Route>
      </MemoryRouter>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
