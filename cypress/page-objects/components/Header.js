export default class Sidebar {

  static getLogoutBtn() {
    return cy.get('[data-cy=logout-btn]');
  }

  static getTitle() {
    return cy.get('[data-cy=home-title]');
  }

  static isLoaded() {
    this.getTitle().should("contain", "Home");
  }

  static doLogout(email, password) {
    this.isLoaded()
    this.getLogoutBtn().click();
  }
}
