// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

before(() => {
  // wait for the stage server to be ready
  if ((process.env.REACT_APP_ENV = 'stage')) {
    cy.request({
      url: 'https://sanchoroz-facilicheck-server-stage.onrender.com/api/health',
      timeout: 60000, // set the timeout to 30 seconds
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  }
});
