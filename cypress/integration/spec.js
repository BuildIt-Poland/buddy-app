describe('Buddy App Test', () => {
  it('shows root component', function() {
    cy.visit('/');
    cy.dataCy('root')
      .should('be.visible')
      .and('have.text', 'Buddy App');
  });
});
