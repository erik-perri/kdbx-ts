import * as path from 'node:path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    resolveSnapshotPath: (testPath, snapshotExtension) => {
      const currentPath = path.resolve('./');
      const relativeTestPath = path.relative(currentPath, testPath);

      return `${currentPath}/snapshots/${relativeTestPath}${snapshotExtension}`;
    },
  },
});
