import * as data from '../fixtures/data.json';

describe('Update TODO', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clearAllLocalStorage();
  });

  it('should toggle TODO status', () => {
    const today = new Date();
    const dd = `${today.getDate()}`.padStart(2, '0');
    const mm = `${today.getMonth() + 1}`.padStart(2, '0');
    const yyyy = today.getFullYear();
    const time = '20:00:00';
    const duedate = `${yyyy}-${mm}-${dd}T${time}`;

    cy.createtodo(data.todos.new.heading, data.todos.new.text, duedate);

    cy.get('[data-test-id=toggle-option-show]').click();
    cy.get('[data-test-id=toggle-status').click();

    const listitem = cy.get('[data-test-id=todo-list]').get('[data-test-id=todo-list-item]');
    listitem.get('[tododuedate]').should('not.exist');
    listitem.get('[data-test-id=todo-status]').should('not.exist');
    listitem.get('[todoadditional]').should('contain.text', 'Done');
    listitem
      .get('[todoperformance]')
      .should('contain.text', 'Completed on time');

    cy.get('[data-test-id=toggle-status').click();
    listitem
      .get('[tododuedate]')
      .should('contain.text', `${data.months[+mm - 1]} ${+dd}, ${yyyy}`);
    listitem.get('[todoadditional]').should('contain.text', 'Due today');
    listitem.get('[todoperformance]').should('not.exist');
    listitem.get('[data-test-id=todo-status]').should('contain.text', 'Incomplete');
  });

  it('should not allow to edit Completed TODO', () => {
    const today = new Date();
    const dd = `${today.getDate()}`.padStart(2, '0');
    const mm = `${today.getMonth() + 1}`.padStart(2, '0');
    const yyyy = today.getFullYear();
    const time = '20:00:00';
    const duedate = `${yyyy}-${mm}-${dd}T${time}`;

    cy.createtodo(data.todos.new.heading, data.todos.new.text, duedate);

    cy.get('[data-test-id=toggle-option-show]').click();
    cy.get('[data-test-id=toggle-status').click();

    const listitem = cy.get('[data-test-id=todo-list]').get('[data-test-id=todo-list-item]');
    listitem.click();

    cy.get('[data-test-id=create-update-modal]').should('be.visible');
    cy.get('[data-test-id=create-update-modal-heading]').should('be.disabled');
    cy.get('[data-test-id=create-update-modal-text]').should('be.disabled');
    cy.get('[data-test-id=create-update-modal-duedate]').should('be.disabled');
    cy.get('[data-test-id=create-update-modal-save]').should('be.disabled');
  });

  it('should correctly toggle past TODO', () => {
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

    cy.getAllLocalStorage({
      log: true,
    }).then((result) => {
      const domainKeys = result['http://localhost:5173'];
      const output = JSON.parse(domainKeys[data.todos.key] as string);
      expect(output).to.be.instanceOf(Array).of.length(1);

      expect(output[0]['status']).to.equal('Incomplete');
      expect(output[0]['heading']).to.equal('Past TODO heading');
      expect(output[0]['text']).to.equal('Past TODO text');
      expect(output[0]['todoid']).to.equal('test-past-todoid');
    });

    cy.get('[data-test-id=todo-list]').should('exist').should('have.length', 1);
    const listitem = cy.get('[data-test-id=todo-list]').get('[data-test-id=todo-list-item]');
    listitem.get('[todoheading]').should('contain.text', 'Past TODO heading');
    listitem.get('[todotext]').should('contain.text', 'Past TODO text');
    listitem.get('[tododuedate]').should('contain.text', 'Jan 1, 2020');
    listitem.get('[todoadditional]').should('contain.text', 'Past due date');
    listitem.get('[data-test-id=todo-status]').should('contain.text', 'Incomplete');

    cy.get('[data-test-id=toggle-status').click();
    listitem.get('[tododuedate]').should('not.exist');
    listitem.get('[todoadditional]').should('contain.text', 'Done');
    listitem.get('[data-test-id=todo-status]').should('not.exist');
    listitem
      .get('[todoperformance]')
      .should('contain.text', 'Task was delayed :-(');
  });

  it('should correctly update selected TODO', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        const today = new Date();
        const dd = `${today.getDate()}`.padStart(2, '0');
        const mm = `${today.getMonth() + 1}`.padStart(2, '0');
        const yyyy1 = today.getFullYear() + 1;
        const yyyy2 = today.getFullYear() + 2;
        const time = '20:00:00.000Z';
        const duedate1 = `${yyyy1}-${mm}-${dd}T${time}`;
        const duedate2 = `${yyyy2}-${mm}-${dd}T${time}`;
        win.localStorage.setItem(
          data.todos.key,
          JSON.stringify([
            {
              todoid: 'test-future-todoid-1',
              heading: 'Future TODO heading 1',
              text: 'Future TODO text (one year later)',
              status: 'Incomplete',
              duedate: duedate1,
            },
            {
              todoid: 'test-future-todoid-2',
              heading: 'Future TODO heading 2',
              text: 'Future TODO text (two years later)',
              status: 'Incomplete',
              duedate: duedate2,
            },
          ]),
        );
      },
    });

    cy.get('[data-test-id=toggle-option-show]').click();
    cy.get('[data-test-id=todo-list-item]').should('exist').should('have.length', 2);

    cy.log('Edit first item');
    cy.get('[data-test-id=todo-list-item]').eq(0).click();
    cy.wait(250);

    cy.get('[data-test-id=create-update-modal-heading]').click().clear();
    cy.get('[data-test-id=create-update-modal-heading]')
      .click()
      .type('Updated future TODO heading 1');
    cy.get('[data-test-id=create-update-modal-text]').click().clear();
    cy.get('[data-test-id=create-update-modal-text]')
      .click()
      .type('Future TODO text (exactly one year later)');
    cy.get('[data-test-id=create-update-modal-save]').click();
    cy.wait(250);

    cy.getAllLocalStorage({
      log: true,
    }).then((result) => {
      const domainKeys = result['http://localhost:5173'];
      const output = JSON.parse(domainKeys[data.todos.key] as string);
      expect(output).to.be.instanceOf(Array).of.length(2);

      expect(output[0]['heading']).to.equal('Updated future TODO heading 1');
      expect(output[0]['text']).to.equal(
        'Future TODO text (exactly one year later)',
      );
    });

    cy.get('[data-test-id=todo-list-item]')
      .eq(0)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[todoheading]')
          .should('contain.text', 'Updated future TODO heading 1');
        cy.wrap(listitem)
          .find('[todotext]')
          .should('contain.text', 'Future TODO text (exactly one year later)');
      });

    cy.log('Edit second item');
    cy.get('[data-test-id=todo-list-item]').eq(1).click();
    cy.wait(250);

    cy.get('[data-test-id=create-update-modal-heading]').click().clear();
    cy.get('[data-test-id=create-update-modal-heading]')
      .click()
      .type('Updated future TODO heading 2');
    cy.get('[data-test-id=create-update-modal-text]').click().clear();
    cy.get('[data-test-id=create-update-modal-text]')
      .click()
      .type('Future TODO text (exactly two years later)');
    cy.get('[data-test-id=create-update-modal-save]').click();
    cy.wait(250);

    cy.getAllLocalStorage({
      log: true,
    }).then((result) => {
      const domainKeys = result['http://localhost:5173'];
      const output = JSON.parse(domainKeys[data.todos.key] as string);
      expect(output).to.be.instanceOf(Array).of.length(2);

      cy.log(
        'Always check the last element of the array, as the updated item is pushed to the end',
      );
      expect(output[1]['heading']).to.equal('Updated future TODO heading 2');
      expect(output[1]['text']).to.equal(
        'Future TODO text (exactly two years later)',
      );
    });

    cy.get('[data-test-id=todo-list-item]')
      .eq(1)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[todoheading]')
          .should('contain.text', 'Updated future TODO heading 2');
        cy.wrap(listitem)
          .find('[todotext]')
          .should('contain.text', 'Future TODO text (exactly two years later)');
      });
  });
});
