import schema, { UserRole } from 'buddy-app-schema';
import { ROUTES } from '../../src/shared/routes';

describe('Router Tests', () => {
  beforeEach(() => {
    cy.server();
    cy.mockGraphql({ schema });
    cy.visit(ROUTES.BASE);
  });

  it('should redirect unauthorized user from not valid route to 404', () => {
    cy.visit('no/such/route');
    cy.url().should('includes', ROUTES.ROUTE_404);

    cy.visit(ROUTES.BUDDY_SELECT_NEWBIE);
    cy.url().should('includes', ROUTES.ROUTE_404);

    cy.visit(ROUTES.NEWBIE_TASKS_LIST);
    cy.url().should('includes', ROUTES.ROUTE_404);
  });

  describe('should redirect ', () => {
    it(`buddy after login to ${ROUTES.BUDDY_SELECT_NEWBIE}`, () => {
      cy.login(UserRole.Buddy);
      cy.url().should('includes', ROUTES.BUDDY_SELECT_NEWBIE);
    });

    it(`newbie after login to ${ROUTES.NEWBIE_TASKS_LIST}`, () => {
      cy.login(UserRole.Newbie);
      cy.url().should('includes', ROUTES.NEWBIE_TASKS_LIST);
    });

    it(`buddy from any not existing route to ${ROUTES.BUDDY_SELECT_NEWBIE}`, () => {
      cy.login(UserRole.Buddy);
      cy.visit(ROUTES.NEWBIE_TASK_DETAILS);
      cy.url().should('includes', ROUTES.ROUTE_404);
      cy.visit('no/such/route');
      cy.url().should('includes', ROUTES.ROUTE_404);
    });

    it(`newbie from any not existing route to ${ROUTES.NEWBIE_TASKS_LIST}`, () => {
      cy.login(UserRole.Newbie);
      cy.visit(ROUTES.BUDDY_TASK_DETAILS);
      cy.url().should('includes', ROUTES.ROUTE_404);
      cy.visit('no/such/route');
      cy.url().should('includes', ROUTES.ROUTE_404);
    });
  });

  describe('should allow ', () => {
    it(`buddy to visit any buddy route`, () => {
      cy.login(UserRole.Buddy);
      cy.visit(ROUTES.BUDDY_TASK_DETAILS);
      cy.url().should('includes', ROUTES.BUDDY_TASK_DETAILS);
    });

    it(`newbie to visit any newbie route`, () => {
      cy.login(UserRole.Newbie);
      cy.visit(ROUTES.NEWBIE_TASK_DETAILS);
      cy.url().should('includes', ROUTES.NEWBIE_TASK_DETAILS);
    });
  });
});
