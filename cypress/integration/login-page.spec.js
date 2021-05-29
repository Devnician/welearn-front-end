/// <reference types="Cypress" />
// context('Home page', () => {
//   beforeEach(() => {
//     cy.visit('/')
//   })


//   it('Should have login page', () => {
//     cy.get('app-root').should('have.text', 'Hello Docker world!\n')
//   })
// })
describe("First test", () => {
  it("should visit login page", () => {
    cy.visit("http://localhost:4200/login");
  });
});
