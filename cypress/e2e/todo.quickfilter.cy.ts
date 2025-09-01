describe('Quick Filter TODO', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display quick filter container', () => {
    cy.get('[data-test-id=quick-filters]').should('exist');

    cy.get('[data-test-id=quick-filters-label]').should('exist');
    cy.get('[data-test-id=quick-filters-label]').should('have.text', 'Quick Filters');
  });

  it('should display quick filter buttons', () => {
    cy.get('[data-test-id=toggle-option-done]').should('exist');
    cy.get('[data-test-id=toggle-option-done]').click();
    cy.get('[data-test-id=input-search]').should('have.value', 'done');

    cy.get('[data-test-id=toggle-option-pending]').should('exist');
    cy.get('[data-test-id=toggle-option-pending]').click();
    cy.get('[data-test-id=input-search]').should('have.value', 'pending');

    cy.get('[data-test-id=toggle-option-past-due]').should('exist');
    cy.get('[data-test-id=toggle-option-past-due]').click();
    cy.get('[data-test-id=input-search]').should('have.value', '< 0');

    cy.get('[data-test-id=toggle-option-late]').should('exist');
    cy.get('[data-test-id=toggle-option-late]').click();
    cy.get('[data-test-id=input-search]').should('have.value', 'late');

    cy.get('[data-test-id=toggle-option-on-time]').should('exist');
    cy.get('[data-test-id=toggle-option-on-time]').click();
    cy.get('[data-test-id=input-search]').should('have.value', 'on time');

  });

  it('should toggle filter-by buttons correctly', () => {
    cy.get('[data-test-id=toggle-option-hide]').click();
    cy.get('[data-test-id=toggle-option-done]').click();
    cy.wait(100);
    cy.get('[data-test-id=toggle-option-hide]').should('have.attr', 'aria-pressed', 'false');
    cy.get('[data-test-id=toggle-option-show]').should('have.attr', 'aria-pressed', 'true');

    cy.get('[data-test-id=toggle-option-hide]').click();
    cy.get('[data-test-id=toggle-option-pending]').click();
    cy.wait(100);
    cy.get('[data-test-id=toggle-option-hide]').should('have.attr', 'aria-pressed', 'true');
    cy.get('[data-test-id=toggle-option-show]').should('have.attr', 'aria-pressed', 'false');

    cy.get('[data-test-id=toggle-option-hide]').click();
    cy.get('[data-test-id=toggle-option-past-due]').click();
    cy.wait(100);
    cy.get('[data-test-id=toggle-option-hide]').should('have.attr', 'aria-pressed', 'true');
    cy.get('[data-test-id=toggle-option-show]').should('have.attr', 'aria-pressed', 'false');

    cy.get('[data-test-id=toggle-option-hide]').click();
    cy.get('[data-test-id=toggle-option-late]').click();
    cy.wait(100);
    cy.get('[data-test-id=toggle-option-hide]').should('have.attr', 'aria-pressed', 'false');
    cy.get('[data-test-id=toggle-option-show]').should('have.attr', 'aria-pressed', 'true');

    cy.get('[data-test-id=toggle-option-hide]').click();
    cy.get('[data-test-id=toggle-option-on-time]').click();
    cy.wait(100);
    cy.get('[data-test-id=toggle-option-hide]').should('have.attr', 'aria-pressed', 'false');
    cy.get('[data-test-id=toggle-option-show]').should('have.attr', 'aria-pressed', 'true');

  });
});
