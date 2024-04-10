import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    envPrefix: 'M_',
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    envPrefix: 'P_',
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    envPrefix: 'R_',
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()]
  }
})
