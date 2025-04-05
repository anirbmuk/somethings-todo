import * as data from '../fixtures/data.json';

const addDays = (days = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

const getStorageDate = (date: Date) => {
  const dd = `${date.getDate()}`.padStart(2, '0');
  const mm = `${date.getMonth() + 1}`.padStart(2, '0');
  const yyyy1 = date.getFullYear();
  const time = '20:00:00.000Z';
  return `${yyyy1}-${mm}-${dd}T${time}`;
};

describe('Analyse TODO', () => {
  const day_1 = getStorageDate(addDays(-1));
  const day_2 = getStorageDate(addDays(-2));
  const day0 = getStorageDate(addDays());
  const day1 = getStorageDate(addDays(1));
  const day2 = getStorageDate(addDays(2));
  const day3 = getStorageDate(addDays(3));
  const day4 = getStorageDate(addDays(4));
  const daynextweek = getStorageDate(addDays(7));
  const daynextyear = getStorageDate(addDays(366));

  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          data.todos.key,
          JSON.stringify([
            {
              todoid: 'test-todoid-1',
              heading: 'TODO heading 1',
              text: `TODO text ${day_2}`,
              status: 'Incomplete',
              duedate: day_2,
            },
            {
              todoid: 'test-todoid-2',
              heading: 'TODO heading 2',
              text: `TODO text ${day_1}`,
              status: 'Incomplete',
              duedate: day_1,
            },
            {
              todoid: 'test-todoid-3',
              heading: 'TODO heading 3',
              text: `TODO text ${day0}`,
              status: 'Incomplete',
              duedate: day0,
            },
            {
              todoid: 'test-todoid-4',
              heading: 'TODO heading 4',
              text: `TODO text ${day1}`,
              status: 'Incomplete',
              duedate: day1,
            },
            {
              todoid: 'test-todoid-5',
              heading: 'TODO heading 5',
              text: `TODO text ${day2}`,
              status: 'Incomplete',
              duedate: day2,
            },
            {
              todoid: 'test-todoid-6',
              heading: 'TODO heading 6',
              text: `TODO text ${day3}`,
              status: 'Incomplete',
              duedate: day3,
            },
            {
              todoid: 'test-todoid-7',
              heading: 'TODO heading 7',
              text: `TODO text ${day4}`,
              status: 'Incomplete',
              duedate: day4,
            },
            {
              todoid: 'test-todoid-8',
              heading: 'TODO heading 8',
              text: `TODO text ${daynextweek}`,
              status: 'Incomplete',
              duedate: daynextweek,
            },
            {
              todoid: 'test-todoid-9',
              heading: 'TODO heading 9',
              text: `TODO text ${daynextyear}`,
              status: 'Incomplete',
              duedate: daynextyear,
            },
          ]),
        );
      },
    });
  });

  it('should show correct counts on the dashboard page', () => {
    cy.getAllLocalStorage({
      log: true,
    }).then((result) => {
      const domainKeys = result['http://localhost:5173'];
      const output = JSON.parse(domainKeys[data.todos.key] as string);
      expect(output).to.be.instanceOf(Array).of.length(9);

      cy.get('[todolist]').should('exist').should('have.length', 9);
      cy.get('[todolist]').get('[todolistitem]').should('have.length', 9);

      cy.log('Set all TODOs as complete');
      cy.get('[data-test-id=togglestatus').click({
        multiple: true,
      });

      cy.log('Reset the first TODOs as incomplete');
      cy.get('[data-test-id=togglestatus').eq(0).click();

      cy.log('Navigate to the dashboard page');
      cy.get('[data-test-id=analyse-todo-btn').click();

      expect(cy.get('[data-test-id=status-completed-label').should('have.text', 'completed'));
      expect(cy.get('[data-test-id=status-completed-count').should('have.text', '8'));

      expect(cy.get('[data-test-id=status-pending-label').should('have.text', 'pending'));
      expect(cy.get('[data-test-id=status-pending-count').should('have.text', '1'));

      expect(cy.get('[data-test-id=status-past-due-label').should('have.text', 'past due'));
      expect(cy.get('[data-test-id=status-past-due-count').should('have.text', '1'));

      expect(cy.get('[data-test-id=status-late-label').should('have.text', 'late'));
      expect(cy.get('[data-test-id=status-late-count').should('have.text', '1'));

      expect(cy.get('[data-test-id=status-on-time-label').should('have.text', 'on time'));
      expect(cy.get('[data-test-id=status-on-time-count').should('have.text', '7'));
    });
  });
});
