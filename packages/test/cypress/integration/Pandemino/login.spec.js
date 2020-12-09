/// <reference types="cypress" />

context("Actions", () => {
  before(function () {
    cy.visit("http://localhost:3000/");
    cy.fixture("users").then(function (data) {
      this.data = data;
    });
  });

  // https://on.cypress.io/interacting-with-elements

  it("login", function () {
    cy.get("#email.form-control").type(`${this.data.email}`);
    cy.get("#password.form-control").type(`${this.data.password}`);
    cy.get("#login-form").submit();
    cy.get(".box-label-name", { timeout: 100000 })
      .should("be.visible")
      .and("contain", "TWOJE KURSY");
    cy.get(".cy-wszystkie", { timeout: 100000 }).click();
    cy.get(".btn").click();
  });
});
