module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: false,
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module',
    ecmaVersion: 2022
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react/jsx-runtime'],
  plugins: ['only-warn'],
  rules: {
    'react/prop-types': 'off'
  }
}
