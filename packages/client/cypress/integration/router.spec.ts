import schema, { UserRole } from '@buddy-app/schema';
import { ROUTES } from '../../src/shared/routes';

describe('Router Tests', () => {
  beforeEach(() => {
    cy.server();
    cy.mockGraphql({ schema });
    cy.visit(ROUTES.BASE);
  });

  describe('when not authenticated', () => {
    describe('when is not a know route', () => {
      it('should to 404 page', () => {
        cy.visit('no/such/route');
        cy.url().should('includes', ROUTES.ROUTE_404);
      });
    });

    describe('when trying to access newbie or buddy routes', () => {
      it('should redirect user to login page', () => {
        cy.visit(ROUTES.BUDDY_SELECT_NEWBIE);
        cy.url().should('includes', ROUTES.LOGIN);

        cy.visit(ROUTES.NEWBIE_TASKS_LIST);
        cy.url().should('includes', ROUTES.LOGIN);
      });
    });
  });

  describe('when user is authenticated', () => {
    describe('when user is a Buddy', () => {
      beforeEach(() => {
        cy.login(UserRole.Buddy);
      });

      it(`should redirect after login to ${ROUTES.BUDDY_SELECT_NEWBIE}`, () => {
        cy.url().should('includes', ROUTES.BUDDY_SELECT_NEWBIE);
      });

      it(`should redirect from any not existing route to ${ROUTES.BUDDY_SELECT_NEWBIE}`, () => {
        cy.visit(ROUTES.NEWBIE_TASK_DETAILS);
        cy.url().should('includes', ROUTES.ROUTE_404);
        cy.visit('no/such/route');
        cy.url().should('includes', ROUTES.ROUTE_404);
      });

      it(`should allow it to visit any buddy route`, () => {
        cy.visit(ROUTES.BUDDY_TASK_DETAILS);
        cy.url().should('includes', ROUTES.BUDDY_TASK_DETAILS);
      });
    });

    describe('when user is a Newbie', () => {
      beforeEach(() => {
        cy.login(UserRole.Newbie);
      });

      it(`should redirect after login to ${ROUTES.NEWBIE_TASKS_LIST}`, () => {
        cy.url().should('includes', ROUTES.NEWBIE_TASKS_LIST);
      });

      it(`should redirect from any not existing route to ${ROUTES.NEWBIE_TASKS_LIST}`, () => {
        cy.visit(ROUTES.BUDDY_TASK_DETAILS);
        cy.url().should('includes', ROUTES.ROUTE_404);
        cy.visit('no/such/route');
        cy.url().should('includes', ROUTES.ROUTE_404);
      });

      it(`should allow it to visit any newbie route`, () => {
        cy.visit(ROUTES.NEWBIE_TASK_DETAILS);
        cy.url().should('includes', ROUTES.NEWBIE_TASK_DETAILS);
      });
    });
  });
});
