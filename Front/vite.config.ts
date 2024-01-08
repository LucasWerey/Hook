import { defineConfig } from 'vite'
import * as path from 'path'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import ComponentsConfig from './components.config'
import AutoImport from 'unplugin-auto-import/vite'
import AutoImportConfig from './auto-import.config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Components(ComponentsConfig), AutoImport(AutoImportConfig)],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src'),
      '@assets': path.resolve(process.cwd(), './src/assets'),
      '@components': path.resolve(process.cwd(), './src/components'),
      '@composables': path.resolve(process.cwd(), './src/composables'),
      '@layouts': path.resolve(process.cwd(), './src/layouts'),
      '@pages': path.resolve(process.cwd(), './src/pages'),
      '@router': path.resolve(process.cwd(), './src/router'),
      '@stores': path.resolve(process.cwd(), './src/stores')
    }
  }
})
