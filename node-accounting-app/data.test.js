/**
 * Unit tests for the DataProgram module (data.js).
 */

const data = require('./data');

describe('DataProgram Module', () => {
  beforeEach(() => {
    // Reset balance to default before each test
    data.reset();
  });

  test('should have an initial balance of 1000.00', () => {
    expect(data.read()).toBe(1000.00);
  });

  test('should read the current balance', () => {
    const balance = data.read();
    expect(typeof balance).toBe('number');
    expect(balance).toBe(1000.00);
  });

  test('should write a new balance', () => {
    data.write(1500.00);
    expect(data.read()).toBe(1500.00);
  });

  test('should overwrite existing balance on write', () => {
    data.write(500.00);
    expect(data.read()).toBe(500.00);
    data.write(750.00);
    expect(data.read()).toBe(750.00);
  });

  test('should reset balance to default 1000.00', () => {
    data.write(0);
    data.reset();
    expect(data.read()).toBe(1000.00);
  });

  test('should reset balance to a custom value', () => {
    data.reset(2000.00);
    expect(data.read()).toBe(2000.00);
  });
});
