import * as data from '../fixtures/data.json';

describe('Import TODO', () => {

  it('should correctly import a valid TODO', () => {
    cy.clearAllLocalStorage();
    cy.visit('/import/eyJ0b2RvaWQiOiJtdGMwbXpnMm56cTJtdHV6bXkwMm9kIiwiaGVhZGluZyI6IlRFU1QgSU1QT1JUIiwidGV4dCI6IlRlc3QgaW1wb3J0IHRleHQiLCJkdWVkYXRlIjoiMjAyNS0wNC0wNlQyMTo1OTowMC4wMDBaIn0=');

    cy.get('[data-test-id=import-success]').should('exist').should('contain.text', 'The TODO is successfully imported');
    cy.get('[data-test-id=import-failure]').should('not.exist');

    cy.log('Navigate to home page to view the todo');
    cy.get('[data-test-id=title-link]').click();

    cy.url().should('contain', data.baseUrl);
    cy.get('[data-test-id=todo-list-item]').should('exist').should('have.length', 1);

    cy.get('[data-test-id=todo-list-item]')
      .eq(0)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[todostatus]')
          .should('contain.text', 'Incomplete');
        cy.wrap(listitem)
          .find('[todoheading]')
          .should('contain.text', 'TEST IMPORT');
        cy.wrap(listitem)
          .find('[todotext]')
          .should('contain.text', 'Test import text');
      });

  });

  it('should import a valid TODO only once', () => {
    cy.clearAllLocalStorage();
    cy.visit('/import/eyJ0b2RvaWQiOiJtdGMwbXpnMm56cTJtdHV6bXkwMm9kIiwiaGVhZGluZyI6IlRFU1QgSU1QT1JUIiwidGV4dCI6IlRlc3QgaW1wb3J0IHRleHQiLCJkdWVkYXRlIjoiMjAyNS0wNC0wNlQyMTo1OTowMC4wMDBaIn0=');

    cy.get('[data-test-id=import-success]').should('exist').should('contain.text', 'The TODO is successfully imported');
    cy.get('[data-test-id=import-failure]').should('not.exist');

    cy.reload();
    cy.get('[data-test-id=import-success]').should('not.exist');
    cy.get('[data-test-id=import-failure]').should('exist').should('contain.text', 'This TODO already exists in your system');

  });

  it('should not import an invalid TODO', () => {
    cy.clearAllLocalStorage();
    cy.visit('/import/eyJ0b2RvaWQiOiJtdGMwbXpnMm56cTJtdHV6bXkwMm9kIiwiaGVhZGluZyI6IlRFU1QgSU1QT');

    cy.get('[data-test-id=import-success]').should('not.exist');
    cy.get('[data-test-id=import-failure]').should('exist').should('contain.text', 'Could not decrypt malformed TODO content');

  });
});
