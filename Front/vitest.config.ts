import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      coverage: {
        exclude: [
          '*.js',
          '*.cjs',
          '*.d.ts',
          'src/*.d.ts',
          'src/data/*.ts',
          'src/assets/*.vue',
          'src/App.vue',
          'src/main.ts',
          'src/utils/screenSizeUtils.ts',
          'src/utils/userApiUtils.ts'
        ]
      },
      environment: 'jsdom',
      include: ['./tests/**/*.ts'],
      exclude: [...configDefaults.exclude, 'e2e/*', './tests/setup.ts'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      setupFiles: './tests/setup.ts'
    }
  })
)
