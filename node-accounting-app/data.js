/**
 * DataProgram Module
 *
 * Manages in-memory storage of the account balance.
 * Mirrors the COBOL DataProgram (data.cob) which handles
 * reading and writing of the balance.
 */

let storageBalance = 1000.00;

/**
 * Reads the current balance from storage.
 * @returns {number} The current balance.
 */
function read() {
  return storageBalance;
}

/**
 * Writes a new balance to storage.
 * @param {number} balance - The new balance to store.
 */
function write(balance) {
  storageBalance = balance;
}

/**
 * Resets the balance to the initial value (used for testing).
 * @param {number} [balance=1000.00] - The balance to reset to.
 */
function reset(balance = 1000.00) {
  storageBalance = balance;
}

module.exports = { read, write, reset };
