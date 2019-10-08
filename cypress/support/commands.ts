declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-testid attribute.
     * @example cy.dataTest('greeting')
     */
    dataTest(value: string): Chainable<Element>;
  }
}

const dataTest = (value: string): Cypress.Chainable<JQuery> => {
  return cy.get(`[data-testid=${value}]`);
};

Cypress.Commands.add('dataTest', dataTest);
