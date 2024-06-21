import { describe, expect, it } from 'vitest';

import joinWithConjunction from './joinWithConjunction';

describe('joinWithConjunction', () => {
  it.each([
    ['empty', { values: [], conjunction: 'and', expected: '' }],
    ['single', { values: ['a'], conjunction: 'and', expected: 'a' }],
    ['two', { values: ['a', 'b'], conjunction: 'and', expected: 'a and b' }],
    [
      'three',
      { values: ['a', 'b', 'c'], conjunction: 'or', expected: 'a, b, or c' },
    ],
  ])('handles %s', (_, { values, conjunction, expected }) => {
    // Arrange
    // Nothing to arrange.

    // Act
    const result = joinWithConjunction(values, conjunction);

    // Assert
    expect(result).toEqual(expected);
  });
});
