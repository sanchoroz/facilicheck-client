import BasePage from "../base-page";

export default class LoginPage extends BasePage {
  static getName() {
    return cy.get('[data-cy="name-input"] input');
  }

  static getPassword() {
    return cy.get('[data-cy="password-input"] input');
  }

  static getLoginButton() {
    return cy.get('[data-cy="login-button"]');
  }

  static getTitle() {
    return cy.get('[data-cy="login-title"]');
  }

  static isLoaded() {
    this.getTitle().should("contain", "Login");
  }

  static isNotVisible() {
    this.getLoginButton().should("not.be.visible", { timeout: 3000 });
  }

  static doLogin(email, password) {
    this.isLoaded();
    this.getName().clear().type(email);
    this.getPassword().clear().type(password);
    this.getLoginButton().click();
  }
}
