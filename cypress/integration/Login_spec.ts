describe('Login Page', () => {
  it('shows root component', function() {
    cy.visit('/login');
    cy.dataTest('root').should('exist');
  });

  describe('When submitting a valid form', () => {
    it('should navigate to home screen', () => {});
  });

  describe('When submitting a invalid form', () => {
    it('should see an error dialog', () => {});
  });

  describe('When submitting a invalid email/password', () => {
    it('should see an error message', () => {});
  });
});
