import schema from '../../server/src/schema.graphql';

describe('Buddy App Test', () => {
  it('shows root component', function() {
    cy.visit('/');
    cy.dataTest('root').should('exist');
  });
});

describe('Buddy App Test 2', () => {
  it('test', function() {
    cy.visit('/');
    cy.log(schema);
  });
});
