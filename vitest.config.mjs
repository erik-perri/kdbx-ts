import { relative, resolve } from 'node:path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    resolveSnapshotPath: (testPath, snapshotExtension) => {
      const currentPath = resolve('./');
      const relativeTestPath = relative(currentPath, testPath);

      return `${currentPath}/tests/snapshots/${relativeTestPath}${snapshotExtension}`;
    },
    setupFiles: ['tests/fixtures/vitest.setup.ts'],
  },
});
