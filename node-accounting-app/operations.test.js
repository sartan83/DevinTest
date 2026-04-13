/**
 * Unit and integration tests for the Operations module (operations.js).
 * Based on the TESTPLAN.md covering the business logic of the COBOL app.
 */

const operations = require('./operations');
const data = require('./data');

describe('Operations Module', () => {
  beforeEach(() => {
    // Reset balance to default 1000.00 before each test
    data.reset();
  });

  // TC-1.1: View Current Balance
  describe('TC-1.1: View Current Balance', () => {
    test('should display the current balance', () => {
      const result = operations.viewBalance();
      expect(result.balance).toBe(1000.00);
      expect(result.message).toBe('Current balance: 1000.00');
    });

    test('should reflect balance changes when viewed', () => {
      data.write(2500.00);
      const result = operations.viewBalance();
      expect(result.balance).toBe(2500.00);
      expect(result.message).toBe('Current balance: 2500.00');
    });
  });

  // TC-2.1: Credit Account with Valid Amount
  describe('TC-2.1: Credit Account with Valid Amount', () => {
    test('should credit the account with a valid amount', () => {
      const result = operations.credit(100.00);
      expect(result.balance).toBe(1100.00);
      expect(result.message).toBe('Amount credited. New balance: 1100.00');
    });

    test('should credit the account with a large amount', () => {
      const result = operations.credit(5000.00);
      expect(result.balance).toBe(6000.00);
      expect(result.message).toBe('Amount credited. New balance: 6000.00');
    });

    test('should handle decimal credit amounts', () => {
      const result = operations.credit(200.50);
      expect(result.balance).toBe(1200.50);
      expect(result.message).toBe('Amount credited. New balance: 1200.50');
    });
  });

  // TC-2.2: Credit Account with Zero Amount
  describe('TC-2.2: Credit Account with Zero Amount', () => {
    test('should not change balance when credited with zero', () => {
      const result = operations.credit(0.00);
      expect(result.balance).toBe(1000.00);
      expect(result.message).toBe('Amount credited. New balance: 1000.00');
    });
  });

  // TC-3.1: Debit Account with Valid Amount
  describe('TC-3.1: Debit Account with Valid Amount', () => {
    test('should debit the account with a valid amount', () => {
      const result = operations.debit(50.00);
      expect(result.balance).toBe(950.00);
      expect(result.message).toBe('Amount debited. New balance: 950.00');
    });

    test('should debit the account with the exact balance', () => {
      const result = operations.debit(1000.00);
      expect(result.balance).toBe(0.00);
      expect(result.message).toBe('Amount debited. New balance: 0.00');
    });

    test('should handle decimal debit amounts', () => {
      const result = operations.debit(99.99);
      expect(result.balance).toBe(900.01);
      expect(result.message).toBe('Amount debited. New balance: 900.01');
    });
  });

  // TC-3.2: Debit Account with Amount Greater Than Balance
  describe('TC-3.2: Debit Account with Amount Greater Than Balance', () => {
    test('should reject debit when amount exceeds balance', () => {
      const result = operations.debit(2000.00);
      expect(result.balance).toBe(1000.00);
      expect(result.message).toBe('Insufficient funds for this debit.');
    });

    test('should not change balance on rejected debit', () => {
      operations.debit(2000.00);
      const balanceResult = operations.viewBalance();
      expect(balanceResult.balance).toBe(1000.00);
    });
  });

  // TC-3.3: Debit Account with Zero Amount
  describe('TC-3.3: Debit Account with Zero Amount', () => {
    test('should not change balance when debited with zero', () => {
      const result = operations.debit(0.00);
      expect(result.balance).toBe(1000.00);
      expect(result.message).toBe('Amount debited. New balance: 1000.00');
    });
  });

  // Integration Tests: Multiple operations in sequence
  describe('Integration: Sequential Operations', () => {
    test('should handle credit followed by debit', () => {
      operations.credit(200.00);
      const result = operations.debit(300.00);
      expect(result.balance).toBe(900.00);
    });

    test('should handle multiple credits and debits', () => {
      operations.credit(500.00);   // 1500
      operations.debit(200.00);    // 1300
      operations.credit(100.00);   // 1400
      const result = operations.debit(400.00); // 1000
      expect(result.balance).toBe(1000.00);
    });

    test('should prevent overdraft after multiple operations', () => {
      operations.debit(800.00);    // 200
      operations.credit(100.00);   // 300
      const result = operations.debit(500.00); // insufficient
      expect(result.message).toBe('Insufficient funds for this debit.');
      expect(result.balance).toBe(300.00);
    });

    test('should maintain correct balance through view operations', () => {
      operations.credit(250.00);
      let result = operations.viewBalance();
      expect(result.balance).toBe(1250.00);

      operations.debit(100.00);
      result = operations.viewBalance();
      expect(result.balance).toBe(1150.00);
    });
  });
});
