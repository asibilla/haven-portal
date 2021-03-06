module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
  ],
  env: {
    mocha: true,
    browser: true,
    jest: true,
  },
  globals: {
    expect: true,
    jest: true,
  },
  plugins: ['react', 'import', 'json', 'jest'],
  rules: {
    'import/prefer-default-export': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'no-alert': 0,
    'react/button-has-type': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': ['error', { forbidDefaultForRequired: true }],
    'react/state-in-constructor': 0,
    'react/static-property-placement': 0,
  },
};
