module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'class-methods-use-this': 'off',
    'import/no-extraneous-dependencies': 'off',
    camelcase: 'off',
    'consistent-return': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
};
