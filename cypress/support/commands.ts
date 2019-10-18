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

// --------------------------------------
// Mock GraphQL requests with stubs.
// --------------------------------------

interface stub {
  operation: string;
  response: Object;
}

Cypress.Commands.add('mockGraphQL', stubs => {
  cy.on('window:before:load', win => {
    cy.stub(win, 'fetch', (...args) => {
      // console.log('Handling fetch stub', args);
      const [url, request] = args;
      const postBody = JSON.parse(request.body);
      let promise;

      if (url.indexOf('api') !== -1) {
        stubs.some((stub: stub) => {
          if (postBody.operationName === stub.operation) {
            // console.log('STUBBING', stub.operation);
            promise = Promise.resolve({
              ok: true,
              text() {
                return Promise.resolve(JSON.stringify(stub.response));
              },
            });
            return true;
          }
          return false;
        });
      }

      if (promise) {
        return promise;
      }

      // console.log('Could not find a stub for the operation.');
      return false;
    });
  });
});
