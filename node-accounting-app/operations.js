/**
 * Operations Module
 *
 * Handles account operations: viewing the balance, crediting,
 * and debiting the account. Mirrors the COBOL Operations program
 * (operations.cob).
 */

const data = require('./data');

/**
 * Returns the current account balance.
 * @returns {{ message: string, balance: number }}
 */
function viewBalance() {
  const balance = data.read();
  return {
    message: `Current balance: ${balance.toFixed(2)}`,
    balance,
  };
}

/**
 * Credits (adds) the given amount to the account.
 * @param {number} amount - The amount to credit.
 * @returns {{ message: string, balance: number }}
 */
function credit(amount) {
  let balance = data.read();
  balance += amount;
  // Round to 2 decimal places to avoid floating-point issues
  balance = Math.round(balance * 100) / 100;
  data.write(balance);
  return {
    message: `Amount credited. New balance: ${balance.toFixed(2)}`,
    balance,
  };
}

/**
 * Debits (subtracts) the given amount from the account.
 * Returns an insufficient-funds message if the balance is too low.
 * @param {number} amount - The amount to debit.
 * @returns {{ message: string, balance: number }}
 */
function debit(amount) {
  let balance = data.read();
  if (balance >= amount) {
    balance -= amount;
    // Round to 2 decimal places to avoid floating-point issues
    balance = Math.round(balance * 100) / 100;
    data.write(balance);
    return {
      message: `Amount debited. New balance: ${balance.toFixed(2)}`,
      balance,
    };
  }
  return {
    message: 'Insufficient funds for this debit.',
    balance,
  };
}

module.exports = { viewBalance, credit, debit };
