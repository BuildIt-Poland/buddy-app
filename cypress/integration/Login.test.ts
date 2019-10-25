import schema from '../../server/src/schema.graphql';
import { ROUTES } from '../../src/shared/routes';

describe('Login Page', () => {
  beforeEach(() => {
    cy.server();
    cy.mockGraphql({ schema });
    cy.visit(ROUTES.LOGIN);
  });
  it('shows root component', function() {
    cy.contains('h1', 'Buddy');
  });

  it('requires email and password', () => {
    cy.dataTest('submit-button').click();
    cy.get('form').contains('Email address is required');
    cy.get('form').contains('Password is required');
  });

  it('requires a valid email', () => {
    cy.dataTest('email').type('aa@aa{enter}');
    cy.get('form').contains('Please enter a valid email');
  });

  describe('When submitting a invalid email/password', () => {
    it('should navigate to home screen', () => {
      cy.dataTest('email').type('aa@aa.pt');
      cy.dataTest('password').type('12345');
      cy.dataTest('submit-button').click();
      cy.dataTest('login-progress');
      cy.dataTest('alert-dialog');
      cy.dataTest('alert-dialog').contains(
        'The email and password you entered did not match our records.'
      );
      cy.dataTest('alert-dialog-close').click();
    });
  });

  describe('When submitting a valid form', () => {
    it('should login successfully', () => {
      cy.dataTest('email').type('las12041991@gmail.com');
      cy.dataTest('password').type('12345');
      cy.dataTest('submit-button').click();
      cy.dataTest('login-progress');
      cy.url().should('includes', ROUTES.BUDDY_SELECT_NEWBIE);
    });
  });
});
