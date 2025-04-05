describe('Test help and FAQ modal', () => {
  it('should open the help/faq modal', () => {
    cy.visit('/');

    cy.get('[data-test-id=helptodobtn]').click();
    cy.get('[data-test-id=helpmodal]').should('be.visible');
  });
});
