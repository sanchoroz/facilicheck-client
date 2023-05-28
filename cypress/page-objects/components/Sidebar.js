import BasePage from "../base-page";
export default class Sidebar extends BasePage {
  static getCategory(category) {
    return cy.get(`[data-cy="${category}"]`);
  }

  static navigate(category) {
    cy.wait(2000);
    this.getCategory(category).click();
  }
}
