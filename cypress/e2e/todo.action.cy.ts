describe('Test action buttons', () => {
  it('should show correct labels and attributes on initial visit', () => {
    cy.visit('/');

    cy.get('[data-test-id=toggle-option-day]').should('have.attr', 'aria-pressed', 'true');
    cy.get('[data-test-id=toggle-option-day]').should('have.attr', 'aria-disabled', 'false');

    cy.get('[data-test-id=toggle-option-month]').should('have.attr', 'aria-pressed', 'false');
    cy.get('[data-test-id=toggle-option-month]').should('have.attr', 'aria-disabled', 'false');

    cy.get('[data-test-id=group-by-label]').should('have.text', 'Grouped By: Day');

    cy.get('[data-test-id=toggle-option-show]').should('have.attr', 'aria-pressed', 'true');
    cy.get('[data-test-id=toggle-option-show]').should('have.attr', 'aria-disabled', 'false');

    cy.get('[data-test-id=toggle-option-hide]').should('have.attr', 'aria-pressed', 'false');
    cy.get('[data-test-id=toggle-option-hide]').should('have.attr', 'aria-disabled', 'false');

    cy.get('[data-test-id=filter-by-label]').should('have.text', 'Completed: Shown');
  });

  it('should show correct labels and attributes on toggle', () => {
    cy.visit('/');

    cy.get('[data-test-id=toggle-option-month]').click();

    cy.get('[data-test-id=toggle-option-day]').should('have.attr', 'aria-pressed', 'false');
    cy.get('[data-test-id=toggle-option-day]').should('have.attr', 'aria-disabled', 'false');

    cy.get('[data-test-id=toggle-option-month]').should('have.attr', 'aria-pressed', 'true');
    cy.get('[data-test-id=toggle-option-month]').should('have.attr', 'aria-disabled', 'false');

    cy.get('[data-test-id=group-by-label]').should('have.text', 'Grouped By: Month');

    cy.get('[data-test-id=toggle-option-hide]').click();

    cy.get('[data-test-id=toggle-option-show]').should('have.attr', 'aria-pressed', 'false');
    cy.get('[data-test-id=toggle-option-show]').should('have.attr', 'aria-disabled', 'false');

    cy.get('[data-test-id=toggle-option-hide]').should('have.attr', 'aria-pressed', 'true');
    cy.get('[data-test-id=toggle-option-hide]').should('have.attr', 'aria-disabled', 'false');

    cy.get('[data-test-id=filter-by-label]').should('have.text', 'Completed: Hidden');
  });

});
