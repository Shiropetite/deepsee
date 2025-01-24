import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vueEslintParser from 'vue-eslint-parser';
import sortKeysCustomOrder from "eslint-plugin-sort-keys-custom-order";

export default [
  {
    ignores: ['node_modules/**', 'dist/**'],
  },
  {
    files: ['**/*.ts', '**/*.vue'],
    languageOptions: {
      parser: vueEslintParser,  // Utiliser vue-eslint-parser pour Vue
      parserOptions: {
        parser: tsParser,  // Utiliser @typescript-eslint/parser pour TypeScript
      },
    },
    plugins: {
      import: eslintPluginImport,
      '@typescript-eslint': eslintPluginTypescript,
      "sort-keys-custom-order": sortKeysCustomOrder
    },
    rules: {
      'vue/no-v-html': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Désactiver la nécessité de types explicites dans les fonctions exportées
      '@typescript-eslint/no-explicit-any': 'off', // Désactiver l'utilisation de `any`
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ], // Avertir sur les variables inutilisées, sauf celles commençant par "_"
      'comma-dangle': ['error', 'always-multiline'], // Exiger des virgules de fin dans les objets et tableaux multiline
      'comma-spacing': 'error', // Appliquer un espacement uniforme autour des virgules
      'eol-last': ['error', 'always'], // Exiger une nouvelle ligne à la fin du fichier
      'import/newline-after-import': 'error', // Exiger une nouvelle ligne après les importations
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ], // Appliquer un ordre cohérent entre les groupes d'importations
      indent: ['error', 4, { SwitchCase: 1 }], // Appliquer une indentation cohérente de 4 espaces
      'keyword-spacing': 'error', // Appliquer un espacement cohérent autour des mots-clés
      'max-len': [
        'error',
        {
          code: 120,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
          ignorePattern: '^\\s*<.+>$', // Ignorer les chaînes et templates littéraux
        },
      ], // Limiter la longueur des lignes
      'no-console': ['warn', { allow: ['warn', 'error'] }], // Avertir pour l'utilisation de console.log, mais permettre console.warn et console.error
      'no-multiple-empty-lines': ['error', { max: 1 }], // Ne pas autoriser plusieurs lignes vides
      'no-trailing-spaces': 'error', // Ne pas autoriser les espaces à la fin des lignes
      'no-unused-vars': 'off', // Désactiver la règle `no-unused-vars` pour éviter des conflits avec TypeScript
      'object-curly-spacing': ['error', 'always'], // Appliquer un espacement cohérent dans les accolades des objets
      quotes: ['error', 'single'], // Appliquer l'utilisation de guillemets simples
      semi: ['error', 'always'], // Exiger des points-virgules à la fin des déclarations
      'sort-keys': 'error', // Appliquer un tri des clés d'objet
      'space-infix-ops': 'error', // Appliquer un espacement cohérent autour des opérateurs
    },
  },
];
