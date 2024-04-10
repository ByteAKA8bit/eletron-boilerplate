import { shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import icon from '/resources/icon.png?asset'
import preload from '/src/preload?modulePath'

const windows = new Set()

/**
 * 根据窗口路径创建一个窗口
 * @param path 从renderer目录下开始算起，比如 "/src/windows/main/index.html"
 * @returns
 */
export function createWindow(path: string): Electron.BrowserWindow {
  // Create the new browser window.
  const newWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(preload),
      contextIsolation: true,
      sandbox: false
    }
  })

  newWindow.on('ready-to-show', () => {
    newWindow.show()
  })

  newWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    console.log(process.env['ELECTRON_RENDERER_URL'] + path)

    newWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + path)
  } else {
    newWindow.loadFile('../renderer' + path)
  }
  windows.add(newWindow)
  return newWindow
}

export default windows
