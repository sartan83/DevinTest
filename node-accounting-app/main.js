/**
 * Main Program
 *
 * Provides a CLI menu for the Account Management System.
 * Mirrors the COBOL MainProgram (main.cob) which handles
 * user interaction and delegates to the Operations module.
 */

const readline = require('readline');
const operations = require('./operations');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function displayMenu() {
  console.log('--------------------------------');
  console.log('Account Management System');
  console.log('1. View Balance');
  console.log('2. Credit Account');
  console.log('3. Debit Account');
  console.log('4. Exit');
  console.log('--------------------------------');
}

function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  let continueFlag = true;

  while (continueFlag) {
    displayMenu();
    const choice = await prompt('Enter your choice (1-4): ');

    switch (choice.trim()) {
      case '1': {
        const result = operations.viewBalance();
        console.log(result.message);
        break;
      }
      case '2': {
        const amountStr = await prompt('Enter credit amount: ');
        const amount = parseFloat(amountStr);
        if (isNaN(amount) || amount < 0) {
          console.log('Invalid amount. Please enter a valid number.');
        } else {
          const result = operations.credit(amount);
          console.log(result.message);
        }
        break;
      }
      case '3': {
        const amountStr = await prompt('Enter debit amount: ');
        const amount = parseFloat(amountStr);
        if (isNaN(amount) || amount < 0) {
          console.log('Invalid amount. Please enter a valid number.');
        } else {
          const result = operations.debit(amount);
          console.log(result.message);
        }
        break;
      }
      case '4':
        continueFlag = false;
        break;
      default:
        console.log('Invalid choice, please select 1-4.');
        break;
    }
  }

  console.log('Exiting the program. Goodbye!');
  rl.close();
}

main();
