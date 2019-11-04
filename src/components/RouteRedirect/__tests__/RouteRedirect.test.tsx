import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { render, wait } from '@testing-library/react';
import RouteRedirect from '../RouteRedirect';
import { ROUTES } from '../../../shared/routes';
import userService from '../../../utils/user-service';

jest.mock('../../../utils/user-service', () => ({
  isAuthenticated: jest.fn(),
  getUser: jest.fn(),
}));

const renderComponent = () =>
  render(
    <MemoryRouter initialEntries={[ROUTES.BASE]}>
      <Route path={ROUTES.BASE} exact>
        <RouteRedirect />
      </Route>
      <Route path={ROUTES.BUDDY_SELECT_NEWBIE}>Newbie Select Route</Route>
      <Route path={ROUTES.NEWBIE_TASKS_LIST}>Newbie Tasks List Route</Route>
      <Route path={ROUTES.LOGIN}>Login Route</Route>
    </MemoryRouter>
  );

describe('Component - RouteRedirect', () => {
  describe('for unauthorised user', () => {
    beforeAll(() => {
      (userService.isAuthenticated as jest.Mock).mockReturnValue(false);
    });

    test(`redirects to ${ROUTES.LOGIN}`, async () => {
      const { getByText } = renderComponent();
      await wait(() => {
        expect(getByText('Login Route')).toBeInTheDocument();
      });
    });
  });
  describe('for authorised as buddy', () => {
    beforeAll(() => {
      (userService.isAuthenticated as jest.Mock).mockReturnValue(true);
      (userService.getUser as jest.Mock).mockReturnValue({
        role: 'BUDDY',
      });
    });
    test(`redirects to ${ROUTES.BUDDY_SELECT_NEWBIE}`, async () => {
      const { getByText } = renderComponent();
      await wait(() => {
        expect(getByText('Newbie Select Route')).toBeInTheDocument();
      });
    });
  });
  describe('for authorised as newbie', () => {
    beforeAll(() => {
      (userService.isAuthenticated as jest.Mock).mockReturnValue(true);
      (userService.getUser as jest.Mock).mockReturnValue({
        role: 'NEWBIE',
      });
    });
    test(`redirects to ${ROUTES.NEWBIE_TASKS_LIST}`, async () => {
      const { getByText } = renderComponent();
      await wait(() => {
        expect(getByText('Newbie Tasks List Route')).toBeInTheDocument();
      });
    });
  });
});
