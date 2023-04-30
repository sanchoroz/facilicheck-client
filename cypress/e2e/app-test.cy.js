describe('Login page title', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should be correct', () => {
    cy.get('[data-cy=login-title]').contains('Login');
    cy.get('[data-cy=name-input]').type('serverstage@admin.com');
    cy.get('[data-cy=password-input]').type('755205');
    cy.get('[data-cy=login-button]').click();

    cy.wait(40000);

    cy.get('[data-cy=title]').should('contain', 'Home');
  });
});
