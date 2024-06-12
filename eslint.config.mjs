import eslint from '@eslint/js';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tsEslint from 'typescript-eslint';

export default tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.strictTypeChecked,
  {
    ignores: ['dist'],
  },
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    ...tsEslint.configs.disableTypeChecked,
  },
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigDirName: import.meta.dirname,
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-unsafe-unary-minus': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
    },
  },
);
