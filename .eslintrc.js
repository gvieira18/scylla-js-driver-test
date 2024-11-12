const LEVEL = {
  OFF: 0,
  WARN: 1,
  ERROR: 2,
};

/**
 * @type {import('eslint').ESLint.ConfigData}
 */
module.exports = {
  root: true,
  env: { node: true, es2024: true },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:sonarjs/recommended-legacy',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 2024, sourceType: 'module' },
  ignorePatterns: ['node_modules', 'dist', 'coverage'],
  plugins: ['@typescript-eslint', 'sonarjs'],
  settings: {
    'import/resolver': { typescript: true, node: true },
  },
  rules: {
    'import/extensions': [LEVEL.ERROR, 'ignorePackages', { ts: 'never' }],
    'no-shadow': LEVEL.OFF,
    '@typescript-eslint/no-shadow': LEVEL.ERROR,
    'class-methods-use-this': LEVEL.OFF,
    'no-restricted-syntax': LEVEL.OFF,
    '@typescript-eslint/no-explicit-any': LEVEL.OFF,
    'no-unused-vars': LEVEL.OFF,
    '@typescript-eslint/no-unused-vars': [LEVEL.WARN, { argsIgnorePattern: '^_', args: 'all' }],
    'lines-between-class-members': LEVEL.OFF,
    'no-useless-constructor': LEVEL.OFF,
    'no-empty-function': [LEVEL.ERROR, { allow: ['constructors'] }],
    'no-bitwise': [LEVEL.OFF],
    'no-await-in-loop': [LEVEL.OFF],
    'import/no-extraneous-dependencies': [LEVEL.ERROR, { devDependencies: true }],
  },
  overrides: [
    {
      env: { jest: true },
      files: ['tests/**/*.test.ts', 'tests/config/globalHooks.ts'],
      extends: ['plugin:jest/recommended', 'plugin:jest-extended/all'],
    },
  ],
};
