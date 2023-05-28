import BasePage from "../base-page";
import "cypress-file-upload";

export default class CreateFacility extends BasePage {
  static createFacilityBtn() {
    return cy.get('[data-cy="createFacility"]');
  }

  static facilityFormTitle() {
    return cy.get('[data-cy="createFacilityTitle"]');
  }

  static facilityName() {
    return cy.get('[data-cy="facilityName"]');
  }

  static sku() {
    return cy.get('[data-cy="sku"]');
  }

  static standard() {
    return cy.get('[data-cy="standard"]');
  }

  static manufactorer() {
    return cy.get('[data-cy="manufacturer"]');
  }

  static manufactorerType() {
    return cy.get('[data-cy="manufacturerType"]');
  }

  static baseType() {
    return cy.get('[data-cy="basis"]');
  }

  static facilitySubmit() {
    return cy.get('[data-cy="newFacilitySubmit"]');
  }

  static isLoaded() {
    this.facilityFormTitle().should("contain", "Create new facility");
  }

  static createFacility(gardenName) {
    const facilityName = (Math.random() + 1).toString(36).substring(7);
    const sku = (Math.random() + 1).toString(36).substring(7);

    this.createFacilityBtn().click();
    cy.fixture("facility.json").then((fixtureData) => {
      const { standard, manufactorer, manufactorerType, baseType } =
        fixtureData;

      this.isLoaded();
      this.facilityName().type(facilityName);
      this.sku().type(sku);
      this.standard().type(standard);
      this.manufactorer().type(manufactorer);
      this.manufactorerType().type(manufactorerType);
      this.baseType().type(baseType);

      cy.get('input[data-cy="facilityImage"]').attachFile("facility.jpeg", {
        subjectType: "input",
      });
      cy.get("select").select(gardenName);

      this.facilitySubmit().click();
      console.log(`Facility is created ${facilityName} with Garden name: ${gardenName}`);
    });
    return facilityName;
  }
}
