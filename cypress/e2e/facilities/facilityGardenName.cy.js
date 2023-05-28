import LoginPage from "../../page-objects/pages/LoginPage";
import GardensPage from "../../page-objects/pages/GardensPage";
import Sidebar from "../../page-objects/components/Sidebar";
import CreateGarden from "../../page-objects/components/CreateGarden";
import FacilityPage from "../../page-objects/pages/FacilitiesPage";
import CreateFacility from "../../page-objects/components/CreateFacility";

describe("Facility", () => {
  beforeEach(() => {
    cy.visit("/");
    LoginPage.doLogin("stage@admin.com", "755205");
    cy.get("[data-cy=home-title]").should("contain", "Home");
  });

  it("should contain garden name", () => {
    Sidebar.navigate("gardens");
    GardensPage.isLoaded();
    const gardenName = CreateGarden.createGarden();
    GardensPage.isLoaded();
    GardensPage.isGardenExists(gardenName);

    Sidebar.navigate("facilities");
    FacilityPage.isLoaded();
    const facilityName = CreateFacility.createFacility(gardenName);
    FacilityPage.isFacilityBelongsToGarden(facilityName, gardenName);
  });
});
