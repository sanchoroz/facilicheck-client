import LoginPage from "../../page-objects/pages/LoginPage";

describe("Logout", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should redirect to home  page", () => {
    LoginPage.doLogin("stage@admin.com", "755205");
    cy.get("[data-cy=home-title]").should("contain", "Home");
  });
});
