import { app, BrowserWindow, session, protocol } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import Helper from './helper/index'
import createWindow from './helper/createWindows'
import { join, resolve } from 'path'
import TrayMenu from './helper/trayMenu'
import express from "express";
import './helper/ffmpeg'
import fs from 'fs'
import ytdl from 'ytdl-core'


let expressApp = express()
let appWindows = {}


if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('wharang', process.execPath, [resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('wharang')
}
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (appWindows.main) {
      if (appWindows.main.isMinimized()) appWindows.main.restore()
      appWindows.main.focus()
    }
  })

  app.whenReady().then(async () => {

    protocol.registerFileProtocol('file', (request, callback) => {
      const pathname = decodeURI(request.url.replace('file:///', ''));
      callback(pathname);
    });


    electronApp.setAppUserModelId('com.electron')
    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })

    const filter = {
      urls: ['*://*.accounts.dev/*', '*://*.google.com/*']
    };
    // if (import.meta.env.PROD)
    session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
      details.requestHeaders['Origin'] = 'https://full-wolf-52.clerk.accounts.dev';
      callback({ requestHeaders: details.requestHeaders });
    });
    let renderer = join(__dirname, '../renderer/index.html')

    appWindows.main = createWindow({
      icon,
      renderer,
      show: true,
    })


    Helper(appWindows.main, app, renderer)
    TrayMenu(appWindows, icon)

    appWindows.main.webContents.once("did-finish-load", () => {

      expressApp.get('/video/:url', async (req, res, next) => {
        ytdl(req.params.url, { filter: 'audioonly' })
          .pipe(res)
      })

      expressApp.listen(5174, () => {
        console.log("Created Server On Port " + 5174);
      });


    })


    app.on('open-url', (event, url) => {
      appWindows.main.focus()
      console.log(url);
    })
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit()
})


sssss