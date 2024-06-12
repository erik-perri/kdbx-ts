import { describe, expect, it } from 'vitest';

import parseKdbxFile from './parseKdbxFile';

describe('parseKdbxFile', () => {
  it('does nothing', async () => {
    const bytes = new Uint8Array(0);

    const result = await parseKdbxFile(bytes);

    expect(result).toBeUndefined();
  });
});
