import React from 'react';
import { render as testRender, wait, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider, AuthState } from 'contexts/AuthContext';
import { MockedProvider } from '@apollo/react-testing';
import { mockLocation, mockedBuddyContext, mockedNewbieContext } from '__mocks__';
import { ROUTES } from 'shared/routes';
import AuthenticatedApp from '../AuthenticatedApp';

const render = (authContextValue: AuthState, MockRoute: string) =>
  testRender(
    <MockedProvider mocks={[]} addTypename={false} resolvers={{}}>
      <AuthProvider value={authContextValue}>
        <MemoryRouter initialEntries={[mockLocation(MockRoute)]}>
          <AuthenticatedApp />
        </MemoryRouter>
      </AuthProvider>
    </MockedProvider>
  );

afterEach(cleanup);

describe('Component - AuthenticatedApp', () => {
  describe('When user is Buddy', () => {
    describe('when is base route', () => {
      it('renders newbie select page', async () => {
        const { getByTestId } = render(mockedBuddyContext(), ROUTES.BASE);

        await wait();

        expect(getByTestId('newbie-select-page')).toBeInTheDocument();
      });
    });

    describe('when is login route', () => {
      it('renders newbie select page', async () => {
        const { getByTestId } = render(mockedBuddyContext(), ROUTES.BASE);

        await wait();

        expect(getByTestId('newbie-select-page')).toBeInTheDocument();
      });
    });

    describe('When is not a valid route', () => {
      it('renders correctly', async () => {
        const { getByTestId } = render(mockedBuddyContext(), '/not-valid-route/');

        await wait();

        expect(getByTestId('error-page-404')).toBeInTheDocument();
      });
    });
  });

  describe('When user is newbie', () => {
    describe('when is base route', () => {
      it('renders newbie task list route', async () => {
        const { getByTestId } = render(mockedNewbieContext(), ROUTES.BASE);

        await wait();

        expect(getByTestId('task-list-page')).toBeInTheDocument();
      });
    });

    describe('when is login route', () => {
      it('renders newbie task list route', async () => {
        const { getByTestId } = render(mockedNewbieContext(), ROUTES.LOGIN);

        await wait();

        expect(getByTestId('task-list-page')).toBeInTheDocument();
      });
    });

    describe('When is not a valid route', () => {
      it('renders 404 page', async () => {
        const { getByTestId } = render(mockedNewbieContext(), '/not-valid-route/');

        await wait();

        expect(getByTestId('error-page-404')).toBeInTheDocument();
      });
    });
  });
});
