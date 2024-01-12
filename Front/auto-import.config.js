module.exports = {
  imports: [
    'vue',
    'vue-router',
    '@vueuse/core',
    {
      axios: [['default', 'axios']]
    }
  ],
  vueTemplate: true,
  dts: './src/auto-imports.d.ts',
  dirs: ['./src/composables/*', './src/utils/*', './src/stores/*', './src/data/*']
}
