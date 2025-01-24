import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import sortKeysCustomOrder from "eslint-plugin-sort-keys-custom-order";

export default [
  {
    ignores: ['node_modules/**', 'dist/**'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser, // Use languageOptions to set the parser
    },
    plugins: {
      import: eslintPluginImport,
      '@typescript-eslint': eslintPluginTypescript,
      "sort-keys-custom-order": sortKeysCustomOrder
    },
    rules: {
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': 'error',
      'eol-last': ['error', 'always'],
      'import/newline-after-import': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      indent: ['error', 4, { SwitchCase: 1 }],
      'keyword-spacing': 'error',
      'max-len': ['error', { code: 120 }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'sort-keys': 'error',
      'space-infix-ops': 'error',

      // TypeScript-specific rules
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
];
