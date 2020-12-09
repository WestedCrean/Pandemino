/// <reference types="cypress" />

context("Actions", () => {
  before(function () {
    cy.fixture("users").then(function (data) {
      this.data = data;
    });
    cy.fixture("profile").then(function (profile) {
      this.profile = profile;
    });
    cy.fixture("example").then(function (example) {
      this.example = example;
    });
  });

  it("Course", function () {
    cy.login(`${this.data.email}`, `${this.data.password}`);
    cy.log("LOGIN SUCCESS");
    cy.get(".box-label-name", { timeout: 100000 })
      .should("be.visible")
      .and("contain", "TWOJE KURSY");

    cy.get(".cy-wszystkie", { timeout: 100000 }).click();

    cy.get(".cy-dodajkurs", { timeout: 100000 }).click();
    cy.addCourse(
      `${this.profile.name}`,
      `${this.profile.description}`,
      `${this.profile.password}`,
      `${this.profile.password}`
    );

    cy.get(".cy-idz-widokKursu", { timeout: 100000 }).first().click();
    cy.get(".cy-pokaz-wyklady", { timeout: 100000 }).click();
    cy.get(".cy-dodaj-wyklad", { timeout: 100000 }).click();
    cy.addLecture(`${this.example.name}`, `${this.example.description}`);

    cy.contains("Edytuj", { timeout: 100000 }).click({ force: true });
    cy.get(".cy-deleteCourse", { timeout: 100000 }).click();
    cy.get(".cy-deleteCourse-confirm", { timeout: 100000 }).click();
  });
});
