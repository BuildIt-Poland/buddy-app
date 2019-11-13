import { GraphQLError } from 'graphql';
import schema from '../../server/src/schema.graphql';
import { ROUTES } from '../../src/shared/routes';
import { REQUEST_DELAY } from '../support/commands';
import { UserRole } from '../../src/types/schema-types';

describe('Login Page', () => {
  beforeEach(() => {
    cy.server();
    cy.mockGraphql({ schema });
    cy.visit(ROUTES.LOGIN);
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

  describe('When submitting an invalid email/password', () => {
    it('should show progress and alert-dialog', () => {
      cy.mockGraphqlOps({
        delay: REQUEST_DELAY,
        operations: {
          LoginMutation: new GraphQLError(''),
        },
      });
      cy.dataTest('email').type('aa@aa.pt');
      cy.dataTest('password').type('12345');
      cy.dataTest('submit-button').click();
      cy.dataTest('login-progress').should('be.visible');
      cy.dataTest('alert-dialog').should('be.visible');
      cy.dataTest('alert-dialog-close').click();
    });
  });

  describe('When submitting a valid form', () => {
    it('should login successfully', () => {
      cy.login(UserRole.Buddy);
      cy.url().should('includes', ROUTES.BUDDY_SELECT_NEWBIE);
    });
  });
});
