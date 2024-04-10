import fs from 'fs'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'

export default defineConfig({
  main: {
    envPrefix: 'M_',
    resolve: {
      alias: {
        '@main': resolve('src/main')
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    envPrefix: 'P_',
    resolve: {
      alias: {
        '@preload': resolve('src/preload')
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    build: {
      rollupOptions: {
        input: getEntryPath(),
        output: {
          assetFileNames: '[ext]/[name]-[hash].[ext]', //静态文件输出的文件夹名称
          chunkFileNames: 'js/[name]-[hash].js', //chunk包输出的文件夹名称
          entryFileNames: 'js/[name]-[hash].js' //入口文件输出的文件夹名称
        }
      }
    },
    envPrefix: 'R_',
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@asset': resolve('src/renderer/src/assets')
      }
    },
    plugins: [react()],
    server: {
      port: 8000
    }
  }
})

function getEntryPath() {
  const map = {} //最后生成的多页面配置项
  const PAGE_PATH = resolve(__dirname, 'src/renderer/src/windows') //指定要查询的目录
  const entryFiles = fs.readdirSync(PAGE_PATH) //获取到指定目录下的所有文件名
  entryFiles.forEach((filePath) => {
    //遍历处理每个子页面的入口
    map[filePath] = resolve(__dirname, `src/renderer/src/windows/${filePath}/index.html`)
  })
  return map
}
