import schema from '../../server/src/schema.graphql';
import { ROUTES } from '../../src/shared/routes';

const name = 'Vasya';

describe('Buddy App Test', () => {
  it('shows root component', function() {
    cy.visit('/');
    cy.dataTest('root').should('exist');
  });
});

describe('Test Newbie details page with mocked GraphQL', () => {
  beforeEach(() => {
    cy.server();
    cy.mockGraphql({ schema });

    cy.mockGraphqlOps({
      operations: {
        getContactDetails: (variables: any) => ({
          newbie: {
            id: variables.newbieId,
            name,
          },
        }),
      },
    });
  });

  it('shows proper name', function() {
    cy.visit(ROUTES.BUDDY_NEWBIE_DETAILS.replace(':newbieId', '1'));
    cy.dataTest('contact-name').contains(name);
  });
});
