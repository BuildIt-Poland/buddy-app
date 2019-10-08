declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-testid attribute.
     * @example cy.dataTest('greeting')
     */
    dataTest(value: string): Chainable<Element>;
  }
}

Cypress.Commands.add('dataTest', (value: string) => {
  return cy.get(`[data-testid=${value}]`);
});
