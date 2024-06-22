import { describe, expect, it } from 'vitest';

import gregorianTimestampToDate from './gregorianTimestampToDate';

describe('gregorianTimestampToDate', () => {
  it.each([
    ['start', { expected: '0001-01-01T00:00:00.000Z', timestamp: 0 }],
    [
      'recent',
      {
        expected: '2024-07-01T13:50:10.000Z',
        timestamp: 63855438610,
      },
    ],
  ])('should convert %s to timestamp', (_, { expected, timestamp }) => {
    // Arrange
    // Nothing to arrange.

    // Act
    const result = gregorianTimestampToDate(timestamp);

    // Assert
    expect(result.toISOString()).toEqual(expected);
  });
});
