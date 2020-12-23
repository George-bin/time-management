'use strict'
import { app, BrowserWindow, Menu, dialog } from 'electron'
import { main } from 'electron-dev-console'
import os from 'os'
const electron = require('electron')
const path = require('path')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

// 用一个 Tray 来表示一个图标,这个图标处于正在运行的系统的通知区 ，通常被添加到一个 context menu 上.
const Tray = electron.Tray
// 托盘对象
let appTray = null

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  let isMac = os.type() === 'Darwin'
  mainWindow = new BrowserWindow({
    useContentSize: true,
    width: 900,
    height: 600,
    minWidth: 900,
    minHeight: 600,
    resizable: true,
    webPreferences: {
      // nodeIntegration: true, // 在网页中集成Node
      webSecurity: false // 允许跨域访问
    }
  })
  main.init(mainWindow)

  // 解决electron网页缩放问题 start
  let webContents = mainWindow.webContents
  webContents.on('did-finish-load', () => {
    webContents.setZoomFactor(1)
    webContents.setVisualZoomLevelLimits(1, 1)
    webContents.setLayoutZoomLevelLimits(0, 0)
  })
  // 解决electron网页缩放问题 end
  mainWindow.loadURL(winURL)

  mainWindow.on('close', (e) => {
    e.preventDefault()// 阻止默认行为，一定要有
    dialog.showMessageBox({
      type: 'warning',
      title: '提示',
      defaultId: 0,
      cancelId: 99,
      message: '确定要关闭吗？',
      buttons: ['最小化', '直接退出']
    }, (index) => {
      if (index === 0) {
        e.preventDefault()// 阻止默认行为，一定要有
        mainWindow.hide()
        // 让窗口不在任务栏中显示
        mainWindow.setSkipTaskbar(true)
        main.info('最小化窗口')
      } else if (index === 1) {
        mainWindow = null
        // app.quit()
        // 不要用quit();试了会弹两次
        app.exit() // exit()直接关闭客户端，不会执行quit()
      } else {
        main.info('取消窗口关闭事件')
        e.preventDefault()// 阻止默认行为，一定要有
      }
    })
  })

  mainWindow.on('closed', (e) => {
    mainWindow = null
  })
  if (!isMac) {
    // 系统托盘右键菜单
    let trayMenuTemplate = [
      {
        // 系统托盘图标目录
        label: '退出',
        click: function () {
          app.quit()
        }
      }
    ]
    let iconPath = path.join(__static, '/img/logo.png')
    appTray = new Tray(iconPath)
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate)
    // 设置托盘悬浮提示
    appTray.setToolTip('时针')
    // 设置托盘菜单
    appTray.setContextMenu(contextMenu)

    appTray.on('click', function () {
      // 关闭托盘显示
      // appTray.destroy();
      if (mainWindow.isVisible()) {
        main.info('最小化窗口')
        mainWindow.hide()
        // 让窗口不在任务栏中显示
        mainWindow.setSkipTaskbar(true)
      } else {
        main.info('还原窗口')
        // 显示主程序
        mainWindow.show()
        // 让窗口在任务栏中显示
        mainWindow.setSkipTaskbar(false)
      }
    })
  } else {
    const template = [
      {
        label: 'BM',
        submenu: [
          {
            label: '网络',
            click: function () {
              mainWindow.webContents.send('network-set')
            }
          },
          {
            label: '退出',
            accelerator: 'Command+Q',
            click: function () {
              app.quit()
            }
          }
        ]
      }
    ]
    // 构建菜单
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  }
}

// 强制刷新缓存
app.commandLine.appendSwitch('--disable-http-cache')

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
