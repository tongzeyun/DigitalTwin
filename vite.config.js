/*
 * @Description: 
 * @Author: YiFan Zhang
 * @LastEditors: YiFan Zhang
 * @LastEditTime: 2025-09-22 15:46:39
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/frtwin',
  resolve: {
    alias: {
      '@': '/src',
      'gimp-tools': '/src/gimp-tools.js'
    }
  },
  build: {
    outDir: 'frtwin',
  },
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    // open: 'http://127.0.0.1:5173/gimp/login',
    proxy: {
      // '^/(gimp|bff)': {
      '/gimp': {
        // target: 'http://192.168.112.205:16000',
        target: 'http://192.168.112.168:8080',
        changeOrigin: true,
      },
      '/bff': {
        target: 'http://192.168.112.205:28221',
        changeOrigin: true,
      },
    },
  },
})
