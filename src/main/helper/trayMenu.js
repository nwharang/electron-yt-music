import { app, Menu, Tray } from 'electron'

export default function TrayMenu(appWindows, icon) {
    let tray = new Tray(icon)
    let contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show',
            type: 'normal',
            click: () => {
                appWindows.main.show()
                appWindows.main.focus()
            }
        },
        {
            label: 'Hide',
            type: 'normal',
            click: () => appWindows.main.hide()
        },
        {
            label: 'Relaunch',
            type: 'normal',
            click: () => {
                app.exit();
                app.relaunch();
            }
        },
        {
            label: 'Exit',
            type: 'normal',
            click: () => app.exit()
        }
    ])
    tray.setToolTip('Wharang')
    tray.setContextMenu(contextMenu)
}