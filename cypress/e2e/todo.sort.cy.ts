import * as data from '../fixtures/data.json';

const getToday = (): [number, number] => {
  const today = new Date();
  return [today.getFullYear(), today.getMonth()];
};

const addDays = (days = 0) => {
  const [todayYear, todayMonth] = getToday();
  const date = new Date(Date.UTC(todayYear, todayMonth, 1)); // Fixed date for consistent testing
  date.setDate(date.getDate() + days);
  return date;
};

const getStorageDate = (date: Date, hour = '20') => {
  const dd = `${date.getDate()}`.padStart(2, '0');
  const mm = `${date.getMonth() + 1}`.padStart(2, '0');
  const yyyy1 = date.getFullYear();
  const time = `${hour}:59:00.000Z`;
  return `${yyyy1}-${mm}-${dd}T${time}`;
};

describe('Sort TODO', () => {
  const day0 = getStorageDate(addDays(), '08');
  const day1 = getStorageDate(addDays(), '11');
  const day2 = getStorageDate(addDays(), '14');

  beforeEach(() => {
    const [todayYear, todayMonth] = getToday();
    const now = new Date(Date.UTC(todayYear, todayMonth, 1));
    cy.clock(now.getTime(), ['Date']);
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          data.todos.key,
          JSON.stringify([
            {
              todoid: 'test-todoid-1',
              heading: 'TODO heading 1',
              text: `TODO text ${day0}`,
              status: 'Incomplete',
              duedate: day0,
            },
            {
              todoid: 'test-todoid-2',
              heading: 'TODO heading 2',
              text: `TODO text ${day1}`,
              status: 'Incomplete',
              duedate: day1,
            },
            {
              todoid: 'test-todoid-3',
              heading: 'TODO heading 3',
              text: `TODO text ${day2}`,
              status: 'Incomplete',
              duedate: day2,
            },
          ]),
        );
      },
    });
    cy.get('[data-test-id=toggle-option-show]').click();
    cy.get('[data-test-id=toggle-option-month]').click();
  });

  it('should initially sort in ascending order of duedate', () => {
    cy.get('[data-test-id=todo-list-item]').should('exist').should('have.length', 3);

    cy.get('[data-test-id=todo-list-item]')
      .eq(0)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[data-test-id=todo-heading]')
          .should('contain.text', 'TODO heading 1');
        cy.wrap(listitem)
          .find('[data-test-id=todo-text]')
          .should('contain.text', `TODO text ${day0}`);
      });
    cy.get('[data-test-id=todo-list-item]')
      .eq(1)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[data-test-id=todo-heading]')
          .should('contain.text', 'TODO heading 2');
        cy.wrap(listitem)
          .find('[data-test-id=todo-text]')
          .should('contain.text', `TODO text ${day1}`);
      });
    cy.get('[data-test-id=todo-list-item]')
      .eq(2)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[data-test-id=todo-heading]')
          .should('contain.text', 'TODO heading 3');
        cy.wrap(listitem)
          .find('[data-test-id=todo-text]')
          .should('contain.text', `TODO text ${day2}`);
      });
  });

  it('should push completed TODOs to end-of-group', () => {
    cy.log('Mark first TODO as done');
    cy.get('[data-test-id=toggle-status]').eq(0).click();
    cy.wait(250);

    cy.get('[data-test-id=todo-list-item]')
      .eq(0)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[data-test-id=todo-heading]')
          .should('contain.text', 'TODO heading 2');
        cy.wrap(listitem)
          .find('[data-test-id=todo-text]')
          .should('contain.text', `TODO text ${day1}`);
      });
    cy.get('[data-test-id=todo-list-item]')
      .eq(1)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[data-test-id=todo-heading]')
          .should('contain.text', 'TODO heading 3');
        cy.wrap(listitem)
          .find('[data-test-id=todo-text]')
          .should('contain.text', `TODO text ${day2}`);
      });
    cy.get('[data-test-id=todo-list-item]')
      .eq(2)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[data-test-id=todo-heading]')
          .should('contain.text', 'TODO heading 1');
        cy.wrap(listitem)
          .find('[data-test-id=todo-text]')
          .should('contain.text', `TODO text ${day0}`);
      });

    cy.log('Mark second TODO as done');
    cy.get('[data-test-id=toggle-status]').eq(0).click();
    cy.wait(250);

    cy.get('[data-test-id=todo-list-item]')
      .eq(0)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[data-test-id=todo-heading]')
          .should('contain.text', 'TODO heading 3');
        cy.wrap(listitem)
          .find('[data-test-id=todo-text]')
          .should('contain.text', `TODO text ${day2}`);
      });
    cy.get('[data-test-id=todo-list-item]')
      .eq(1)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[data-test-id=todo-heading]')
          .should('contain.text', 'TODO heading 1');
        cy.wrap(listitem)
          .find('[data-test-id=todo-text]')
          .should('contain.text', `TODO text ${day0}`);
      });
    cy.get('[data-test-id=todo-list-item]')
      .eq(2)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[data-test-id=todo-heading]')
          .should('contain.text', 'TODO heading 2');
        cy.wrap(listitem)
          .find('[data-test-id=todo-text]')
          .should('contain.text', `TODO text ${day1}`);
      });
  });

  it('should push incomplete TODOs to top-of-group', () => {
    cy.log('Mark all TODOs as done');
    cy.get('[data-test-id=toggle-status]').each((toggle) => {
      cy.wrap(toggle).click();
    });
    cy.wait(250);

    cy.get('[data-test-id=todo-list-item]')
      .eq(0)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[data-test-id=todo-heading]')
          .should('contain.text', 'TODO heading 1');
        cy.wrap(listitem)
          .find('[data-test-id=todo-text]')
          .should('contain.text', `TODO text ${day0}`);
      });
    cy.get('[data-test-id=todo-list-item]')
      .eq(1)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[data-test-id=todo-heading]')
          .should('contain.text', 'TODO heading 2');
        cy.wrap(listitem)
          .find('[data-test-id=todo-text]')
          .should('contain.text', `TODO text ${day1}`);
      });
    cy.get('[data-test-id=todo-list-item]')
      .eq(2)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[data-test-id=todo-heading]')
          .should('contain.text', 'TODO heading 3');
        cy.wrap(listitem)
          .find('[data-test-id=todo-text]')
          .should('contain.text', `TODO text ${day2}`);
      });

    cy.log('Mark first TODO from bottom as Incomplete');
    cy.get('[data-test-id=toggle-status]').eq(2).click();
    cy.wait(250);

    cy.get('[data-test-id=todo-list-item]')
      .eq(0)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[data-test-id=todo-heading]')
          .should('contain.text', 'TODO heading 3');
        cy.wrap(listitem)
          .find('[data-test-id=todo-text]')
          .should('contain.text', `TODO text ${day2}`);
      });
    cy.get('[data-test-id=todo-list-item]')
      .eq(1)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[data-test-id=todo-heading]')
          .should('contain.text', 'TODO heading 1');
        cy.wrap(listitem)
          .find('[data-test-id=todo-text]')
          .should('contain.text', `TODO text ${day0}`);
      });
    cy.get('[data-test-id=todo-list-item]')
      .eq(2)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[data-test-id=todo-heading]')
          .should('contain.text', 'TODO heading 2');
        cy.wrap(listitem)
          .find('[data-test-id=todo-text]')
          .should('contain.text', `TODO text ${day1}`);
      });

    cy.get('[data-test-id=toggle-status]').eq(2).click();
    cy.wait(250);

    cy.get('[data-test-id=todo-list-item]')
      .eq(0)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[data-test-id=todo-heading]')
          .should('contain.text', 'TODO heading 2');
        cy.wrap(listitem)
          .find('[data-test-id=todo-text]')
          .should('contain.text', `TODO text ${day1}`);
      });
    cy.get('[data-test-id=todo-list-item]')
      .eq(1)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[data-test-id=todo-heading]')
          .should('contain.text', 'TODO heading 3');
        cy.wrap(listitem)
          .find('[data-test-id=todo-text]')
          .should('contain.text', `TODO text ${day2}`);
      });
    cy.get('[data-test-id=todo-list-item]')
      .eq(2)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[data-test-id=todo-heading]')
          .should('contain.text', 'TODO heading 1');
        cy.wrap(listitem)
          .find('[data-test-id=todo-text]')
          .should('contain.text', `TODO text ${day0}`);
      });
  });
});
