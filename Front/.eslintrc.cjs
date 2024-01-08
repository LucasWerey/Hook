/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    './.eslintrc-auto-import.json',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  ignorePatterns: ['dist', 'node_modules', '**/*.js'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style']
      }
    ],
    'filename-rules/match': [
      2,
      {
        '.vue': 'PascalCase',
        '.ts': 'camelCase',
        '.js': 'camelCase'
      }
    ]
  },
  overrides: [
    {
      files: './*.js',
      rules: {
        'no-undef': 'off'
      }
    }
  ]
}
