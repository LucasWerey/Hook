/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'prettier'
  ],
  ignorePatterns: ['dist', 'node_modules', '**/*.js', '**/*.d.ts'],
  overrides: [
    {
      files: './*.js',
      rules: {
        'no-undef': 'off'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },

  plugins: ['filename-rules', 'sort-keys-fix'],
  root: true,
  rules: {
    'filename-rules/match': [
      2,
      {
        '.js': 'camelCase',
        '.ts': 'camelCase',
        '.vue': 'PascalCase'
      }
    ],
    'sort-keys-fix/sort-keys-fix': ['warn', 'asc', { caseSensitive: false, natural: true }],
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style']
      }
    ],
    'vue/multi-word-component-names': 'off'
  }
}
