describe('Test Header', () => {
  it('should show correct app title', () => {
    cy.visit('/');

    cy.get('[data-test-id=title-link]').should('contain.text', 'Things TODO');
  });

  it('should display action buttons', () => {
    cy.visit('/');

    cy.get('[data-test-id=analyse-todo-btn]').should('exist');
    cy.get('[data-test-id=add-todo-btn]').should('exist');
    cy.get('[data-test-id=help-todo-btn]').should('exist');
    cy.get('[data-test-id=theme-todo-btn]').should('exist');
  });

  it('should open modal on clicking add icon', () => {
    cy.visit('/');

    cy.get('[data-test-id=add-todo-btn]').click();
    cy.get('[data-test-id=create-update-modal]').should('be.visible');
  });

  it('should open modal on clicking help icon', () => {
    cy.visit('/');

    cy.get('[data-test-id=help-todo-btn]').click();
    cy.get('[data-test-id=help-modal]').should('be.visible');
  });

  it('should toggle dark-mode clicking theme icon', () => {
    cy.visit('/');

    cy.get('body').should('have.class', 'dark:bg-base');

    cy.get('[data-test-id=theme-todo-btn]').click();
    cy.get('body').should('have.class', 'dark:bg-base dark');
  });
});
