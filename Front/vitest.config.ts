import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      include: ['./tests/**/*.ts'],
      exclude: [...configDefaults.exclude, 'e2e/*', './tests/setup.ts'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      setupFiles: './tests/setup.ts'
    }
  })
)
