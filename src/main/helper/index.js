import { ipcMain, nativeTheme } from 'electron'
import os from 'os'
import Search from './search'
import Stream from './stream'

const Helper = (win, app, renderer) => {
  if (!win) return
  [
    {
      eventName: 'config',
      eventHandler: async () => {
        return {
          ...nativeTheme
        }
      }
    },
    {
      eventName: 'userInfo',
      eventHandler: async () => os.userInfo()
    },
    {
      eventName: 'minimize',
      eventHandler: async () => win.minimize()
    },
    {
      eventName: 'maximize',
      eventHandler: async () => win.isMaximized() ? win.unmaximize() : win.maximize(),
    },
    {
      eventName: 'exit',
      eventHandler: async () => app.quit()
    },
    {
      eventName: 'shell:open',
      eventHandler: async () => {
        const pageDirectory = __dirname.replace('app.asar', 'app.asar.unpacked')
        const pagePath = path.join('file://', pageDirectory, 'index.html')
        shell.openExternal(pagePath)
      }
    },
    {
      eventName: 'path',
      eventHandler: async () => import.meta.env.PROD ? renderer : 'http://localhost:5173/'
    },
    {
      eventName: 'search',
      eventHandler: async (event, args) => Search(args)
    },
    {
      eventName: 'stream',
      eventHandler: async (event, args) => Stream(args)
    },
  ].map((event) => {
    ipcMain.handle(event.eventName, event.eventHandler)
  })
}
export default Helper


export function UpsertKeyValue(obj, keyToChange, value) {
  const keyToChangeLower = keyToChange.toLowerCase();
  for (const key of Object.keys(obj)) {
    if (key.toLowerCase() === keyToChangeLower) {
      // Reassign old key
      obj[key] = value;
      // Done
      return;
    }
  }
  // Insert at end instead
  obj[keyToChange] = value;
}