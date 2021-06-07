module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-one-expression-per-line': [0, { allow: 'single-child' }],
    'class-methods-use-this': [0],
    'react/destructuring-assignment': [0],
    'jsx-a11y/label-has-associated-control': [0],
    'no-underscore-dangle': [0],
    'react/prop-types': [1, { ignore: ['history'] }],
    'react/button-has-type': [0],
    'consistent-return': [0],
    camelcase: [0],
    'max-len': ['error', { code: 180, comments: 250 }],
    'react/react-in-jsx-scope': [0],
  },
};
