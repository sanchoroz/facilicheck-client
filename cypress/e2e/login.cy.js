import BasePage from "../page-objects/base-page";
import LoginPage from "../page-objects/pages/LoginPage";


describe("Login suite", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should redirect to home page", () => {
    LoginPage.doLogin("stage@admin.com", "755205");
    cy.get("[data-cy=home-title]").should("contain", "Home");
  });

  it("should logout", () => {
    LoginPage.do("stage@admin.com", "755205");
    cy.get("[data-cy=home-title]").should("contain", "Home");
  });
});
