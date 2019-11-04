import React from 'react';
import { create } from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import ProtectedRoute from '../ProtectedRoute';
import userService from '../../../utils/user-service';
import { ROUTES } from '../../../shared/routes';
import ErrorPage from '../../ErrorPage';

jest.mock('../../../utils/user-service', () => ({
  isAuthenticated: jest.fn(),
  getUser: jest.fn(),
}));

describe('Component - ProtectedRoute', () => {
  describe('when user is authorised', () => {
    beforeAll(() => {
      (userService.isAuthenticated as jest.Mock).mockReturnValue(true);
    });
    test('route component renders correctly', () => {
      const component = create(
        <MemoryRouter initialEntries={[ROUTES.ERROR]}>
          <ProtectedRoute path={ROUTES.ERROR} exact component={ErrorPage} />
        </MemoryRouter>
      );
      expect(component.toJSON()).toMatchSnapshot();
    });
  });
  describe('when user is unauthorised', () => {
    beforeAll(() => {
      (userService.isAuthenticated as jest.Mock).mockReturnValue(false);
    });
    test('route component is not rendered', () => {
      const component = create(
        <MemoryRouter initialEntries={[ROUTES.ERROR]}>
          <ProtectedRoute path={ROUTES.ERROR} exact component={ErrorPage} />
        </MemoryRouter>
      );
      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
