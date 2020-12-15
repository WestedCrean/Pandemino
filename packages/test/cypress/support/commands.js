// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (email, password) => {
  cy.visit("http://localhost:3000/");
  cy.get("#email.form-control").type(email);
  cy.get("#password.form-control").type(password);
  cy.get("#login-form").submit();
});

Cypress.Commands.add("addCourse", (name, description, password) => {
  cy.get(".cy-nazwa").type(name);
  cy.get(".cy-opis").type(description);
  cy.get(".cy-haslo").type(password);
  cy.get(".cy-haslo-potwierdz").type(password);
  cy.get(".cy-form-dodajkurs").first().click();
});

Cypress.Commands.add("addLecture", (name, description) => {
  cy.get(".cy-nazwa").type(name);
  cy.get(".cy-opis").type(description);
  cy.get(".cy-form-dodajwyklad").first().click();
});
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
