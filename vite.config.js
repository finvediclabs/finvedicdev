import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': '/src'  // use direct path instead of URL resolution
    },
    dedupe: ["vue"],
  },
  envPrefix: 'VUE_APP_',
})
