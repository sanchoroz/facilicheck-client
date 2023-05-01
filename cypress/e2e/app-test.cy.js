import LoginPage from '../support/drivers/LoginPage';

describe('Login page title', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should be correct', () => {
    const loginPage = new LoginPage();
    loginPage.doLogin('serverstage@admin.com', '755205');
    cy.get('[data-cy=title]').should('contain', 'Home');
  });
});
