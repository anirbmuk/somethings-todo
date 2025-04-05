describe('Test Header', () => {
  it('should show correct app title', () => {
    cy.visit('/');

    cy.get('[data-test-id=title-link]').should('contain.text', 'Things TODO');
  });

  it('should display action buttons', () => {
    cy.visit('/');

    cy.get('[data-test-id=show-search]').should('exist');
    cy.get('[data-test-id=analysetodobtn]').should('exist');
    cy.get('[data-test-id=add-todo-btn]').should('exist');
    cy.get('[data-test-id=helptodobtn]').should('exist');
  });

  it('should correctly toggle input search field', () => {
    cy.visit('/');

    cy.get('[data-test-id=show-search]').click();
    cy.get('[data-test-id=show-search]').should('not.exist');
    cy.get('[data-test-id=input-search]').should('exist');
    cy.get('[data-test-id=clear-search]').should('exist');

    cy.get('[data-test-id=clear-search]').click();
    cy.get('[data-test-id=show-search]').should('exist');
    cy.get('[data-test-id=input-search]').should('not.exist');
    cy.get('[data-test-id=clear-search]').should('not.exist');
  });

  it('should open modal on clicking add icon', () => {
    cy.visit('/');

    cy.get('[data-test-id=add-todo-btn]').click();
    cy.get('[data-test-id=createupdatemodal]').should('be.visible');
  });
});
