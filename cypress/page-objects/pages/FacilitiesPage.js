import BasePage from "../base-page";
import "cypress-file-upload";

export default class FacilityPage extends BasePage {
  static createFacilityBtn() {
    return cy.get('[data-cy="createGarden"]');
  }

  static facilitiesPageTitle() {
    return cy.get('[data-cy="facilities-title"]', { timeout: 5000 });
  }

  static facilities() {
    return cy.get('[data-cy="facilityCard"]');
  }

  static facilityGardenName() {
    return cy.get('[data-cy="facilityGardenName"]');
  }

  static isLoaded() {
    this.facilitiesPageTitle().should("be.visible");
  }

  static isFacilityBelongsToGarden(facilityName, gardenName) {
    cy.get('[data-cy="facilityCard"]').each((element) => {
      cy.wrap(element)
        .find('[data-cy="facilityName"]')
        .invoke("text")
        .then((name) => {
          if (name === facilityName) {
            console.log(`Facility's ${facilityName} - Garden name is: ${gardenName}`);
            cy.wrap(element)
              .find('[data-cy="facilityGardenName"]')
              .invoke("text")
              .should("include", gardenName);
          }
        });
    });
  }

  static isFacilityExists(facilityName) {
    let hasText = false;
    cy.get('[data-cy="facilityCard"]')
      .each((element) => {
        cy.wrap(element)
          .find('[data-cy="facilityName"]')
          .invoke("text")
          .then((name) => {
            if (name === facilityName) {
              console.log("Faclity is found: ",name);
              hasText = true;
            }
          });
      })
      .then(() => {
        expect(hasText).to.equal(true);
      });
  }
}
