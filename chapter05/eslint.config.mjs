import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  ...tseslint.configs.recommended,
  {
    // webpack config files are CommonJS by design.
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    ...reactPlugin.configs.flat.recommended,
    files: ['**/*.{tsx,jsx}'],
    settings: {
      react: {
        // NOTE: 'detect' crashes eslint-plugin-react@7.37.5 on ESLint 10
        // (it uses the removed context.getFilename() API), so pin the version.
        version: '19.3',
      },
    },
  },
  {
    ...reactPlugin.configs.flat['jsx-runtime'],
    files: ['**/*.{tsx,jsx}'],
  }
);
