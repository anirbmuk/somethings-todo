describe('Test help and FAQ modal', () => {
  it('should open the help/faq modal', () => {
    cy.visit('/');

    cy.get('[data-test-id=help-todo-btn]').click();
    cy.get('[data-test-id=help-modal]').should('be.visible');
  });
});
