// ESLint configuration for Next.js
// Note: This config avoids circular reference issues by using a minimal setup
module.exports = {
  extends: ['next/core-web-vitals'],
  ignorePatterns: ['node_modules/', '.next/', 'out/', 'dist/'],
  rules: {
    // Suppress warnings for unused vars starting with underscore
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },
  // Disable problematic plugins that cause circular references
  overrides: [],
};

