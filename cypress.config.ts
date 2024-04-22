import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    projectId: "13fj67",
    baseUrl : "http://localhost:3000/",
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
