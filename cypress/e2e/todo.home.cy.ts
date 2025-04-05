describe('Test empty home page', () => {
  it('should show empty message', () => {
    cy.visit('/');

    cy.get('[data-test-id=no-data]').should('contain.text', 'No TODOs found');
    cy.get('[data-test-id=nodata-additional]').should('not.exist');

    cy.get('[data-test-id=toggle-option-hide]').click();
    cy.get('[data-test-id=nodata-additional]').should('contain.text', 'There may be completed TODOs which are not shown');
  });
});
