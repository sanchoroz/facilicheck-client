export default class LoginPage {
  doLogin(email, password) {
    this.getName().clear().type(email);
    this.getPassword().clear().type(password);
    this.getLoginButton().click();
  }

  getName() {
    return cy.get('[data-cy="name-input"] input');
  }

  getPassword() {
    return cy.get('[data-cy="password-input"] input');
  }

  getLoginButton() {
    return cy.get('[data-cy="login-button"]');
  }
}
