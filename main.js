const { app, BrowserWindow, ipcMain, net, Menu } = require('electron')
const path = require("node:path");

var mainWindow

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 850,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        icon: path.join(__dirname, 'favicon.ico'),
    })

    mainWindow.loadFile('static/index.html')
    Menu.setApplicationMenu(null)
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

ipcMain.handle('getItemData', async () => {
    const response = await fetch("https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/refs/heads/master/formatted/items.txt")
    return await response.text()
})