import BasePage from "../page-objects/base-page";
import LoginPage from "../page-objects/pages/LoginPage";

describe("Login page title", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be correct", () => {
    LoginPage.doLogin("serverstage@admin.com", "755205");
    cy.get("[data-cy=title]").should("contain", "Home");
  });
});
