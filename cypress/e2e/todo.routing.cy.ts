import * as data from '../fixtures/data.json';

describe('Test routing', () => {
  it('should redirect invalid page to /notfound', () => {
    cy.visit('/wrong');
    cy.url().should('contain', '/notfound');
    cy.title().should('equal', `${data.title} | 404 - Not Found`);
  });

  it('should not display action buttons', () => {
    cy.visit('/wrong');
    cy.get('[data-test-id=show-search]').should('not.exist');
    cy.get('[data-test-id=add-todo-btn]').should('not.exist');
    cy.get('[data-test-id=analyse-todo-btn]').should('not.exist');
    cy.get('[data-test-id=view-todo-btn]').should('not.exist');

    cy.log('Only the help button should be visible on a 404 page');
    cy.get('[data-test-id=helptodobtn]').should('exist');
  });

  it('clicking on title link should correctly redirect to main page', () => {
    cy.visit('/wrong');
    cy.get('[data-test-id=title-link]').click();
    cy.url().should('contain', data.baseUrl);
    cy.title().should('equal', `${data.title} | Home`);
  });

  it('clicking on dashboard link should correctly redirect to dashboard page', () => {
    cy.visit('/');
    cy.get('[data-test-id=analyse-todo-btn]').click();
    cy.url().should('contain', '/dashboard');
    cy.title().should('equal', `${data.title} | Dashboard`);
    cy.get('[data-test-id=show-search]').should('not.exist');
    cy.get('[data-test-id=add-todo-btn]').should('not.exist');
    cy.get('[data-test-id=analyse-todo-btn]').should('not.exist');
    cy.get('[data-test-id=view-todo-btn]').should('exist');
    cy.get('[data-test-id=helptodobtn]').should('exist');
  });
});
