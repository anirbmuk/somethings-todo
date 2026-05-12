import * as data from '../fixtures/data.json';

describe('Delete TODO', () => {
  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          data.todos.key,
          JSON.stringify([
            {
              todoid: 'test-past-todoid',
              heading: 'Past TODO heading',
              text: 'Past TODO text',
              status: 'Incomplete',
              duedate: '2020-01-01T22:00:00.000Z',
            },
          ]),
        );
      },
    });
    cy.get('[data-test-id=toggle-option-show]').click();
  });

  it('should delete existing TODO after confirmation and notification timeout', () => {
    // Fake only setTimeout/setInterval so cy.tick() controls the notification timer.
    // Excluding requestAnimationFrame lets Vue's <transition> work (it uses rAF for opacity fade).
    cy.clock(Date.now(), ['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'Date']);
    cy.get('[data-test-id=delete-todo]').click();
    cy.get('[data-test-id=confirm-modal]').should('be.visible');
    cy.get('[data-test-id=confirm-modal-yes]').click();

    cy.contains('TODO is being deleted...').should('be.visible');

    // Advance past the 3-second notification duration to trigger callbackOnClose
    cy.tick(3500);

    cy.getAllLocalStorage({
      log: true,
    }).then((result) => {
      const domainKeys = result['http://localhost:5173'];
      const output = JSON.parse(domainKeys[data.todos.key] as string);
      expect(output).to.be.instanceOf(Array).of.length(0);
    });
    cy.get('[data-test-id=todo-list]').should('not.exist');
  });

  it('should not delete existing TODO when Undo is clicked', () => {
    cy.clock(Date.now(), ['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'Date']);
    cy.get('[data-test-id=delete-todo]').click();
    cy.get('[data-test-id=confirm-modal]').should('be.visible');
    cy.get('[data-test-id=confirm-modal-yes]').click();

    cy.contains('TODO is being deleted...').should('be.visible');
    cy.contains('button', 'Undo').click();

    // Advance well past the deletion window to confirm nothing gets deleted
    cy.tick(4000);

    cy.getAllLocalStorage({
      log: true,
    }).then((result) => {
      const domainKeys = result['http://localhost:5173'];
      const output = JSON.parse(domainKeys[data.todos.key] as string);
      expect(output).to.be.instanceOf(Array).of.length(1);
    });
    cy.get('[data-test-id=todo-list]').should('exist').should('have.length', 1);
  });

  it('should not delete existing TODO on NO', () => {
    cy.get('[data-test-id=delete-todo]').click();
    cy.get('[data-test-id=confirm-modal]').should('be.visible');
    cy.get('[data-test-id=confirm-modal-no]').click();
    cy.wait(250);

    cy.getAllLocalStorage({
      log: true,
    }).then((result) => {
      const domainKeys = result['http://localhost:5173'];
      const output = JSON.parse(domainKeys[data.todos.key] as string);
      expect(output).to.be.instanceOf(Array).of.length(1);
    });
    cy.get('[data-test-id=todo-list]').should('exist').should('have.length', 1);
  });
});
