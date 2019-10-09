describe('Buddy App Test', () => {
  it('shows root component', function() {
    cy.visit('/');
    cy.dataTest('root').should('be.visible');
  });
});
