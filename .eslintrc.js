/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  env: {
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:@nx/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-extra-boolean-cast': ['warn'],
        'no-console': ['warn'],
        'no-debugger': ['error'],
        'react-hooks/rules-of-hooks': ['warn'],
        'react-hooks/exhaustive-deps': ['warn'],
        'react/destructuring-assignment': ['warn'],
        'react/jsx-curly-brace-presence': ['warn'],
        'react/self-closing-comp': ['warn'],
        'react/jsx-no-useless-fragment': ['warn'],
        'react/jsx-fragments': ['warn'],
        '@typescript-eslint/no-unused-vars': ['warn'],
        'no-template-curly-in-string': ['warn'],
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'react-hooks'],
  rules: {
    'prettier/prettier': ['warn'],
  },
};

