import { ERROR } from '../../server/src/errors';

const LoginMutation = (email: string, password: string) => ({
  operationName: 'LoginMutation',
  variables: { email, password },
  query: `
    mutation LoginMutation($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
      }
    }
  `,
});

describe('When submitting an invalid data', () => {
  it(`should show proper error message for LoginMutation`, () => {
    const body = LoginMutation('empty@test.pl', '12345');
    const body2 = LoginMutation('las12041991@gmail.com', '12345');
    cy.errorRequest(body);
    cy.errorRequest(body2);
  });
});
