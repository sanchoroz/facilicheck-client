export default class Sidebar {
  static logout = "";

  static doLogout() {
    cy.get(this.logout).click();
  }
}
