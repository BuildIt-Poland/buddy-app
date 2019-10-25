import 'cypress-graphql-mock';

declare global {
  namespace Cypress {
    interface Chainable {
      dataTest: (value: string) => Chainable<Element>;
    }
  }
}

const dataTest = (value: string): Cypress.Chainable<JQuery> => {
  return cy.get(`[data-testid=${value}]`);
};

Cypress.Commands.add('dataTest', dataTest);
