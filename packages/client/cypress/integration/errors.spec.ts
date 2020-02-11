import { GraphQLError } from 'graphql';
import schema from '@buddy-app/schema';
import { ERROR } from '../../services/src/errors';
import { ROUTES } from '../../src/shared/routes';
import { REQUEST_DELAY } from '../support/commands';
import DICTIONARY from '../../src/components/Login/dictionary';

describe('Test login page with mocked GraphQL', () => {
  beforeEach(() => {
    cy.server();
    cy.mockGraphql({ schema });
    cy.visit(ROUTES.LOGIN);
  });

  it('shows proper NetworkError', () => {
    cy.mockGraphqlOps({
      operations: {
        LoginMutation: () => {
          throw new Error(DICTIONARY.ERRORS.NO_NETWORK);
        },
      },
    });

    cy.dataTest('email').type('test@test.pl');
    cy.dataTest('password').type('12345');
    cy.dataTest('submit-button').click();

    cy.dataTest('alert-dialog').should('contain.text', DICTIONARY.ERRORS.NO_NETWORK);
  });

  it('shows proper GraphQLError INVALID_EMAIL', () => {
    cy.mockGraphqlOps({
      delay: REQUEST_DELAY,
      operations: {
        LoginMutation: new GraphQLError(ERROR.INVALID_EMAIL),
      },
    });

    cy.dataTest('email').type('test@test.pl');
    cy.dataTest('password').type('12345');
    cy.dataTest('submit-button').click();

    cy.dataTest('alert-dialog').should(
      'contain.text',
      DICTIONARY.ERRORS.NO_USER_FOUND
    );
  });

  it('shows proper GraphQLError INVALID_PASSWORD', () => {
    cy.mockGraphqlOps({
      delay: REQUEST_DELAY,
      operations: {
        LoginMutation: new GraphQLError(ERROR.INVALID_PASSWORD),
      },
    });

    cy.dataTest('email').type('test@test.pl');
    cy.dataTest('password').type('12345');
    cy.dataTest('submit-button').click();

    cy.dataTest('alert-dialog').should(
      'contain.text',
      DICTIONARY.ERRORS.NO_USER_FOUND
    );
  });

  it('shows proper GraphQLError NO_USER_FOUND', () => {
    cy.mockGraphqlOps({
      delay: REQUEST_DELAY,
      operations: {
        LoginMutation: new GraphQLError(ERROR.NO_USER_FOUND),
      },
    });

    cy.dataTest('email').type('test@test.pl');
    cy.dataTest('password').type('12345');
    cy.dataTest('submit-button').click();

    cy.dataTest('alert-dialog').should(
      'contain.text',
      DICTIONARY.ERRORS.NO_USER_FOUND
    );
  });
});
