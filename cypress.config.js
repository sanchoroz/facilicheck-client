const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "b3u1i7",
  e2e: {
    baseUrl: "http://localhost:3000/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
