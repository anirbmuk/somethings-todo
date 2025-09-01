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

describe ('Dashboard TODO', () => {
  const day_2 = getStorageDate(addDays(-2));
  const day_1 = getStorageDate(addDays(-1));
  const day0 = getStorageDate(addDays(0));
  const day1 = getStorageDate(addDays(1));
  const day2 = getStorageDate(addDays(2));
  const day7 = getStorageDate(addDays(7));

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
              todoid: 'test-todoid--2',
              heading: 'TODO heading -2',
              text: `TODO text ${day_2}`,
              status: 'Incomplete',
              duedate: day_2,
            },
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
          ]),
        );
      },
    });

    cy.get('[data-test-id=toggle-status]')
      .each(($el, index) => {
        if (index > 0) {
          cy.wrap($el).click();
        }
      });
    cy.visit('/dashboard');
  });

  it('should show all counts correctly', () => {
    cy.get('[data-test-id=status-completed-label]').should('have.text', 'completed');
    cy.get('[data-test-id=status-completed-count]').should('have.text', '5');

    cy.get('[data-test-id=status-pending-label]').should('have.text', 'pending');
    cy.get('[data-test-id=status-pending-count]').should('have.text', '1');

    cy.get('[data-test-id=status-past-due-label]').should('have.text', 'past due');
    cy.get('[data-test-id=status-past-due-count]').should('have.text', '1');

    cy.get('[data-test-id=status-late-label]').should('have.text', 'late');
    cy.get('[data-test-id=status-late-count]').should('have.text', '1');

    cy.get('[data-test-id=status-on-time-label]').should('have.text', 'on time');
    cy.get('[data-test-id=status-on-time-count]').should('have.text', '4');
  });
});
