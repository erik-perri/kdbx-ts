/* v8 ignore start */
import { rm } from 'node:fs';

import * as esbuild from 'esbuild';
import glob from 'fast-glob';

await clearOutputFiles();

const commonOptions = {
  bundle: true,
  entryPoints: ['./src/index.ts'],
  external: ['crypto'],
  sourcemap: true,
};

const outputFormats = [
  { format: 'esm', outfile: 'dist/index.mjs' },
  { format: 'cjs', outfile: 'dist/index.cjs' },
];

for (const formatOptions of outputFormats) {
  await esbuild.build({
    ...commonOptions,
    ...formatOptions,
  });
}

async function clearOutputFiles() {
  const files = await glob('dist/*');
  const expectedFiles = [
    'dist/index.cjs',
    'dist/index.cjs.map',
    'dist/index.d.ts',
    'dist/index.mjs',
    'dist/index.mjs.map',
  ];

  for (const file of files) {
    if (!expectedFiles.includes(file)) {
      throw new Error(`Unexpected file found in dist folder "${file}"`);
    }

    await rm(file, { recursive: false }, (err) => {
      if (err) {
        throw err;
      }
    });
  }
}
/* v8 ignore end */
