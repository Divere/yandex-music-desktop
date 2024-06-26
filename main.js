const { app, BrowserWindow, globalShortcut, nativeTheme } = require('electron')

let win;

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1100,
        height: 700,
        webPreferences: {
            nodeIntegration: false,
            enableBlinkFeatures: "CSSColorSchemeUARendering"
        }
    })

    win.removeMenu()
    // and load the index.html of the app.
    win.loadURL('https://music.yandex.ru/')
    // Open the DevTools.
    //win.webContents.openDevTools()

    win.webContents.on('did-finish-load', function() {
        console.log('did-finish-load')
        win.webContents.executeJavaScript("$('.bar-below').remove()").catch(() => {})
        win.webContents.executeJavaScript("$('head').append('<meta name=\"color-scheme\" content=\"light dark\">')").catch((e) => console.log(e))
    });

    setInterval(() => {
        win.webContents.executeJavaScript("$('.rup__animation').remove()").catch(() => {})
    }, 5000)

    nativeTheme.themeSource = "dark"
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    globalShortcut.register("MediaPreviousTrack", () => {
        win.webContents.executeJavaScript("$('.player-controls .player-controls__btn_prev').click()").catch(() => {})
    })
    globalShortcut.register("MediaNextTrack", () => {
        win.webContents.executeJavaScript("$('.player-controls .player-controls__btn_next').click()").catch(() => {})
    })
    globalShortcut.register("MediaPlayPause", () => {
        win.webContents.executeJavaScript("$('.player-controls .player-controls__btn_play').click()").catch(() => {})
    })
}).then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.