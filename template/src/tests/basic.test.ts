import { describe, it, expect } from 'vitest';

describe('Basic test suite', () => {
  it('should verify that true is true', () => {
    expect(true).toBe(true);
  });

  it('should verify that 1 + 1 is 2', () => {
    expect(1 + 1).toBe(2);
  });
});
