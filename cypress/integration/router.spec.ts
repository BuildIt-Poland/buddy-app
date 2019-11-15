import schema, { UserRole } from 'buddy-app-schema';
import { ROUTES } from '../../src/shared/routes';

describe('Router Tests', () => {
  beforeEach(() => {
    cy.server();
    cy.mockGraphql({ schema });
    cy.visit(ROUTES.BASE);
  });

  it('should redirect unauthorised user from any route to login', () => {
    cy.visit('no/such/route');
    cy.url().should('includes', ROUTES.LOGIN);

    cy.visit(ROUTES.BUDDY_SELECT_NEWBIE);
    cy.url().should('includes', ROUTES.LOGIN);

    cy.visit(ROUTES.NEWBIE_TASKS_LIST);
    cy.url().should('includes', ROUTES.LOGIN);
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
      cy.url().should('includes', ROUTES.BUDDY_SELECT_NEWBIE);
      cy.visit('no/such/route');
      cy.url().should('includes', ROUTES.BUDDY_SELECT_NEWBIE);
    });

    it(`newbie from any not existing route to ${ROUTES.NEWBIE_TASKS_LIST}`, () => {
      cy.login(UserRole.Newbie);
      cy.visit(ROUTES.BUDDY_TASK_DETAILS);
      cy.url().should('includes', ROUTES.NEWBIE_TASKS_LIST);
      cy.visit('no/such/route');
      cy.url().should('includes', ROUTES.NEWBIE_TASKS_LIST);
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
