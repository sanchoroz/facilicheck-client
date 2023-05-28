import LoginPage from "../../page-objects/pages/LoginPage";
import GardensPage from "../../page-objects/pages/GardensPage";
import Sidebar from "../../page-objects/components/Sidebar";
import CreateGarden from "../../page-objects/components/CreateGarden";

describe("Gardens suite", () => {
  beforeEach(() => {
    cy.visit("/");
    LoginPage.doLogin("stage@admin.com", "755205");
    cy.get("[data-cy=home-title]").should("contain", "Home");
  });

  it("should create new garden", () => {
    Sidebar.navigate("gardens");
    GardensPage.isLoaded();
    const gardenName = CreateGarden.createGarden();
    GardensPage.isLoaded();
    GardensPage.isGardenExists(gardenName);
  });
});
