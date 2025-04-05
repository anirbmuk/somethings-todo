/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  interface Chainable<Subject = any, T = any> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createtodo(heading: string, text: string, duedate: string): Chainable<any>;
  }
}

const createNewTodo = (heading: string, text: string, duedate: string) => {
  cy.get('[data-test-id=add-todo-btn]').click();
  cy.wait(250);

  cy.get('[data-test-id=create-update-modal-heading]').click().type(heading);
  cy.get('[data-test-id=create-update-modal-text]').click().type(text);
  cy.get('[data-test-id=create-update-modal-duedate]').click().type(duedate);
  cy.get('[data-test-id=create-update-modal-save]').click();

  cy.wait(250);
};

Cypress.Commands.add('createtodo', createNewTodo);
