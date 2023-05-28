import BasePage from "../base-page";
import "cypress-file-upload";

export default class GardensPage extends BasePage {
  static createGardenBtn() {
    return cy.get('[data-cy="createGarden"]');
  }

  static gardensPageTitle() {
    return cy.get('[data-cy="gardens-title"]', { timeout: 5000 });
  }

  static gardens() {
    return cy.get('[data-cy="gardenCard"]');
  }

  static isLoaded() {
    this.gardensPageTitle().should("be.visible");
  }

  static isGardenExists(gardenName) {
    let hasText = false;
    cy.get('[data-cy="gardenCard"]')
      .each((element) => {
        cy.wrap(element)
          .find('[data-cy="gardenName"]')
          .invoke("text")
          .then((name) => {
            if (name === gardenName) {
              console.log("Garden is found: ",name);
              hasText = true;
            }
          });
      })
      .then(() => {
        expect(hasText).to.equal(true);
      });
  }
}
