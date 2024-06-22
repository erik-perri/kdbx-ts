import { describe, expect, it } from 'vitest';

import gregorianTimestampFromDate from './gregorianTimestampFromDate';

describe('gregorianTimestampToDate', () => {
  it.each([
    ['start', { date: new Date('0001-01-01T00:00:00.000Z'), expected: 0 }],
    [
      'recent',
      {
        date: new Date('2024-07-01T13:50:10.000Z'),
        expected: 63855438610,
      },
    ],
  ])('should convert %s from timestamp', (_, { date, expected }) => {
    // Arrange
    // Nothing to arrange.

    // Act
    const result = gregorianTimestampFromDate(date);

    // Assert
    expect(result).toEqual(expected);
  });
});
