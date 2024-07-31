module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  settings: {
    react: { version: '18.2.0' },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    "react",
    "jsx-a11y",
    "react-hooks",
    "@typescript-eslint",
    'unused-imports'
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "indent": ["warn", 2],
    "object-curly-spacing": ["error", "always"],
    "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
    "react/react-in-jsx-scope": "off",
    "camelcase": "error",
    "spaced-comment": "error",
    "quotes": ["error", "single"],
    "no-duplicate-imports": "error",
    'prefer-object-spread': 'error',
    'no-underscore-dangle': 'off',
    'consistent-this': ['error', 'self'],
    'max-len': ['error', 150, 2, { ignoreUrls: true }], // airbnb is allowing some edge cases
    'no-console': ['error', { allow: ['error'] }], // airbnb is using warn
    'prefer-destructuring': 'off', // airbnb is using error. destructuring harm grep potential.
    'no-param-reassign': 'off', // airbnb use error
    'react/jsx-fragments': ['error', 'syntax'],
    'react/forbid-prop-types': 'off', // airbnb use error
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.tsx'] }, // airbnb is using .jsx
    ],
    'react/no-find-dom-node': 'off',
    'react/jsx-props-no-spreading': 'off',
    'sort-imports': ['error', { ignoreMemberSort: false, ignoreDeclarationSort: true }],
    'unused-imports/no-unused-imports': 'error',
    "no-restricted-imports": "off",
    "@typescript-eslint/no-restricted-imports": [
      "warn",
      {
        "name": "react-redux",
        "importNames": ["useSelector", "useDispatch"],
        "message": "Use typed hooks `useAppDispatch` and `useAppSelector` instead."
      }
    ],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      env: { browser: true, es2020: true },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
      ],
      globals: { Atomics: 'readonly', SharedArrayBuffer: 'readonly' },
      parser: '@typescript-eslint/parser',
      plugins: ['unused-imports', 'typescript-sort-keys'],
      parserOptions: {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": "./tsconfig.json"
      },
      rules: {
        'react/prop-types': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/require-default-props': 'off',
        'no-underscore-dangle': 'off',
        'react/react-in-jsx-scope': 'off',
        'no-void': 'off',
        'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
        'typescript-sort-keys/string-enum': ['error', 'asc', { caseSensitive: true, natural: true }],
        // 'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
        'typescript-sort-keys/interface': ['error', 'asc', { caseSensitive: true, natural: true, requiredFirst: false }],
        'import/prefer-default-export': 'off',
      },
    },
  ],
}
