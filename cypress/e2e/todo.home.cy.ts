describe('Test empty home page', () => {
  it('should show empty message', () => {
    cy.visit('/');

    cy.get('html').should('have.attr', 'lang', 'en');
    cy.get('html').should('have.attr', 'translate', 'no');

    cy.get('[data-test-id=no-data]').should('contain.text', 'No TODOs found');
    cy.get('[data-test-id=no-data-additional]').should('not.exist');

    cy.get('[data-test-id=toggle-option-hide]').click();
    cy.get('[data-test-id=no-data-additional]').should('contain.text', 'There may be completed TODOs which are not shown');
  });
});
