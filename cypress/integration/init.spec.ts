/// <reference types="cypress" />

describe('Buddy App Test', () => {
  it('shows root component', function() {
    cy.visit('/');
    cy.get('.MuiTypography-root')
      .should('be.visible')
      .and('have.text', 'Buddy App');
  });
});
