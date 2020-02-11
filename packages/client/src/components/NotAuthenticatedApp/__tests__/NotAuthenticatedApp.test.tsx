import React from 'react';
import { render } from '@testing-library/react';
import { mockLocation } from '__mocks__';
import { MemoryRouter } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import NotAuthenticatedApp from '../NotAuthenticatedApp';

jest.mock('components/Login', () => () => <div data-testid='login-page' />);

describe('Component - NotAuthenticatedApp', () => {
  describe('When route is /', () => {
    it(`user redirects to Login component`, () => {
      const { getByTestId } = render(
        <MemoryRouter initialEntries={[mockLocation(ROUTES.BASE)]}>
          <NotAuthenticatedApp />
        </MemoryRouter>
      );
      expect(getByTestId('login-page')).toBeInTheDocument();
    });
  });

  describe('When route is /Login', () => {
    it(`user redirects to Login component`, () => {
      const { getByTestId } = render(
        <MemoryRouter initialEntries={[mockLocation(ROUTES.LOGIN)]}>
          <NotAuthenticatedApp />
        </MemoryRouter>
      );
      expect(getByTestId('login-page')).toBeInTheDocument();
    });
  });

  describe('When route is a invalid route', () => {
    it(`user redirects to 404 component`, () => {
      const { getByTestId } = render(
        <MemoryRouter initialEntries={[mockLocation('/invalidRoute')]}>
          <NotAuthenticatedApp />
        </MemoryRouter>
      );
      expect(getByTestId('error-page-404')).toBeInTheDocument();
    });
  });
});
