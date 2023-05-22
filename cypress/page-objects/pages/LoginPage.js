import BasePage from "../base-page";

export default class LoginPage extends BasePage {
  static inputEmail = '[data-cy="name-input"] input';

  static doLogin(email, password) {
    this.getName().clear().type(email);
    this.getPassword().clear().type(password);
    this.getLoginButton().click();
  }

  static getName() {
    return cy.get(this.inputEmail);
  }

  static getPassword() {
    return cy.get('[data-cy="password-input"] input');
  }

  static getLoginButton() {
    return cy.get('[data-cy="login-button"]');
  }
}
