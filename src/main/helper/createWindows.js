import { shell, BrowserWindow, screen } from 'electron'
import { is } from '@electron-toolkit/utils'
import { join } from 'path'

export default function createWindow({ icon, renderer, show = false, parent, modal = false }) {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    let appWindows = new BrowserWindow({
        parent,
        center: true,
        width: width - 100,
        height: height - 100,
        show: false,
        autoHideMenuBar: true,
        modal,
        frame: false,
        minWidth: 800,
        minHeight: 600,

        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            // devTools: import.meta.env.DEV,
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            sandbox: false,
            webSecurity: false,
        }
    })
    if (process.env.PROD) appWindows.setMenu(null)
    appWindows.on('ready-to-show', () => {
        if (show)
            appWindows.show()
        // if (import.meta.env.DEV)
            appWindows.webContents.openDevTools()
    })
    appWindows.on('resize', () => {
        appWindows.setAspectRatio(16 / 9)

    })
    appWindows.on('shown', () => { appWindows.focus() });
    appWindows.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url)
        return { action: 'deny' }
    })
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        appWindows.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
        appWindows.loadFile(renderer)
    }
    return appWindows
}