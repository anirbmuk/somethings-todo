import * as data from '../fixtures/data.json';

const getToday = (): [number, number] => {
  const today = new Date();
  return [today.getFullYear(), today.getMonth()];
};

const addDays = (days = 0) => {
  const [todayYear, todayMonth] = getToday();
  const date = new Date(Date.UTC(todayYear, todayMonth, 1)); // Fixed date for consistent testing
  date.setDate(days + 1);
  return date;
};

const getStorageDate = (date: Date) => {
  const dd = `${date.getDate()}`.padStart(2, '0');
  const mm = `${date.getMonth() + 1}`.padStart(2, '0');
  const yyyy1 = date.getFullYear();
  const time = '13:00:00.000Z';
  return `${yyyy1}-${mm}-${dd}T${time}`;
};

describe ('Label TODO', () => {
  const day_1 = getStorageDate(addDays(-1));
  const day0 = getStorageDate(addDays(0));
  const day1 = getStorageDate(addDays(1));
  const day2 = getStorageDate(addDays(2));
  const day7 = getStorageDate(addDays(7));

  const [todayYear, todayMonth] = getToday();
  const now = new Date(Date.UTC(todayYear, todayMonth, 1));
  const lastDayOfMonth = new Date(Date.UTC(
    todayYear,
    todayMonth + 1,
    0),
  ).getDate();
  const daysToLastDayOfMonth = lastDayOfMonth - now.getDate();

  const dayThisMonth = getStorageDate(addDays(daysToLastDayOfMonth));
  const dayNextMonth = getStorageDate(addDays(lastDayOfMonth));
  const daylater = getStorageDate(addDays(62));

  beforeEach(() => {
    cy.log('daysToLastDayOfMonth', lastDayOfMonth, daysToLastDayOfMonth);
    const [todayYear, todayMonth] = getToday();
    const now = new Date(Date.UTC(todayYear, todayMonth, 1));
    cy.clock(now.getTime(), ['Date']);
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          data.todos.key,
          JSON.stringify([
            {
              todoid: 'test-todoid--1',
              heading: 'TODO heading -1',
              text: `TODO text ${day_1}`,
              status: 'Incomplete',
              duedate: day_1,
            },
            {
              todoid: 'test-todoid-0',
              heading: 'TODO heading 0',
              text: `TODO text ${day0}`,
              status: 'Incomplete',
              duedate: day0,
            },
            {
              todoid: 'test-todoid-1',
              heading: 'TODO heading 1',
              text: `TODO text ${day1}`,
              status: 'Incomplete',
              duedate: day1,
            },
            {
              todoid: 'test-todoid-2',
              heading: 'TODO heading 2',
              text: `TODO text ${day2}`,
              status: 'Incomplete',
              duedate: day2,
            },
            {
              todoid: 'test-todoid-7',
              heading: 'TODO heading 7',
              text: `TODO text ${day7}`,
              status: 'Incomplete',
              duedate: day7,
            },
            {
              todoid: 'test-todoid-this',
              heading: 'TODO heading this month',
              text: `TODO text ${dayThisMonth}`,
              status: 'Incomplete',
              duedate: dayThisMonth,
            },
            {
              todoid: 'test-todoid-next',
              heading: 'TODO heading next month',
              text: `TODO text ${dayNextMonth}`,
              status: 'Incomplete',
              duedate: dayNextMonth,
            },
            {
              todoid: 'test-todoid-later',
              heading: 'TODO heading later',
              text: `TODO text ${daylater}`,
              status: 'Incomplete',
              duedate: daylater,
            },
          ]),
        );
      },
    });
    cy.get('[data-test-id=toggle-option-show]').click();
    cy.get('[data-test-id=toggle-option-month]').click();
  });

  it('should show all labels correctly', () => {
    cy.get('[data-test-id=todo-list-item]').should('exist').should('have.length', 8);

    cy.get('[data-test-id=todo-list-item]')
      .eq(0)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[data-test-id=todo-status]')
          .should('contain.text', 'Incomplete');
        cy.wrap(listitem)
          .find('[data-test-id=todo-additional]')
          .should('contain.text', 'Past due date');
      });
    cy.get('[data-test-id=todo-list-item]')
      .eq(1)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[data-test-id=todo-status]')
          .should('contain.text', 'Incomplete');
        cy.wrap(listitem)
          .find('[data-test-id=todo-additional]')
          .should('contain.text', 'Due today');
      });
    cy.get('[data-test-id=todo-list-item]')
      .eq(2)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[data-test-id=todo-status]')
          .should('contain.text', 'Incomplete');
        cy.wrap(listitem)
          .find('[data-test-id=todo-additional]')
          .should('contain.text', 'Due tomorrow');
      });
    cy.get('[data-test-id=todo-list-item]')
      .eq(3)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[data-test-id=todo-status]')
          .should('contain.text', 'Incomplete');
        cy.wrap(listitem)
          .find('[data-test-id=todo-additional]')
          .should('contain.text', 'Due in 2 days');
      });
    cy.get('[data-test-id=todo-list-item]')
      .eq(4)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[data-test-id=todo-status]')
          .should('contain.text', 'Incomplete');
        cy.wrap(listitem)
          .find('[data-test-id=todo-additional]')
          .should('contain.text', 'Due next week');
      });
    cy.get('[data-test-id=todo-list-item]')
      .eq(5)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[data-test-id=todo-status]')
          .should('contain.text', 'Incomplete');
        cy.wrap(listitem)
          .find('[data-test-id=todo-additional]')
          .should('contain.text', 'Due this month');
      });
    cy.get('[data-test-id=todo-list-item]')
      .eq(6)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[data-test-id=todo-status]')
          .should('contain.text', 'Incomplete');
        cy.wrap(listitem)
          .find('[data-test-id=todo-additional]')
          .should('contain.text', 'Due next month');
      });
    cy.get('[data-test-id=todo-list-item]')
      .eq(7)
      .then((listitem) => {
        cy.wrap(listitem)
          .find('[data-test-id=todo-status]')
          .should('contain.text', 'Incomplete');
        cy.wrap(listitem)
          .find('[data-test-id=todo-additional]')
          .should('contain.text', 'Due later');
      });
  });
});
