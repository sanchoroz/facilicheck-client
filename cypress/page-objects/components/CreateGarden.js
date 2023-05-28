import BasePage from "../base-page";
import "cypress-file-upload";
import GardensPage from "../../page-objects/pages/GardensPage";

export default class CreateGarden extends BasePage {
  static gardenFormTitle() {
    return cy.get('[data-cy="createGardenTitle"]');
  }

  static gardenName() {
    return cy.get('[data-cy="siteName"]');
  }

  static gardenAddress() {
    return cy.get('[data-cy="address"]');
  }

  static gardenSerialNumber() {
    return cy.get('[data-cy="serialNumber"]');
  }

  static gardenType() {
    return cy.get('[data-cy="siteType"]');
  }

  static groundCover() {
    return cy.get('[data-cy="groundCover"]');
  }

  static gardenImage() {
    return cy.get('[data-cy="gardenImage"]');
  }

  static gardenDescription() {
    return cy.get('[data-cy="desc"]');
  }

  static gardenSubmit() {
    return cy.get('[data-cy="newGardenSubmit"]');
  }

  static isLoaded() {
    this.gardenFormTitle().should("contain", "Create new Garden");
  }

  static isGardenExists(serial) {
    this.gardenFormTitle().should("contain", "Create new Garden");
  }

  static createGarden() {
    const gardenName = (Math.random() + 1).toString(36).substring(7);
    const gardenSerialNumber = (Math.random() + 1).toString(36).substring(7);
    const gardenAddress = `Address-${(Math.random() + 1)
      .toString(36)
      .substring(7)}`;

    GardensPage.createGardenBtn().click();
    cy.fixture("garden.json").then((fixtureData) => {
      const { gardenType, groundCover } = fixtureData;

      this.isLoaded();
      this.gardenName().type(gardenName);
      this.gardenAddress().type(gardenAddress);
      this.gardenSerialNumber().type(gardenSerialNumber);
      this.gardenType().type(gardenType);
      this.groundCover().type(groundCover);

      cy.get('input[data-cy="gardenImage"]').attachFile("garden-image.jpeg", {
        subjectType: "input",
      });
      this.gardenSubmit().click();
      console.log(`Garden is created ${gardenName}`);
    });
    return gardenName;
  }
}
