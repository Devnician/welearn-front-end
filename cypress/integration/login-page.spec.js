/// <reference types="Cypress" />
// context('Home page', () => {
//   beforeEach(() => {
//     cy.visit('/')
//   })
 
describe("First test", () => {
  it("should visit login page", () => {
    cy.visit("http://localhost:4200/login");
  });
});

describe("Login", () => {
  it("Performs login", () => {
    cy.visit('http://localhost:4200/');    
    cy.get('#username').type('admin'); 
    cy.get('#pwd').type('admiN123+');
    cy.get('.mat-button-wrapper').click();
    cy.get('.mat-card-content > .ng-dirty').submit(); 
    cy.get('[style="font-size: 12px; text-align: end;"]').should('have.text','Администратор')
  });
});





