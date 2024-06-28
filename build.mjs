/* v8 ignore start */
import * as esbuild from 'esbuild';

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
/* v8 ignore end */
