import Header from "../../page-objects/components/Header";
import LoginPage from "../../page-objects/pages/LoginPage";

describe("Logout", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should redirect to login page", () => {

    LoginPage.doLogin("stage@admin.com", "755205");
    cy.get("[data-cy=home-title]").should("contain", "Home");
    Header.doLogout();
    LoginPage.isLoaded();
    
  });
});
