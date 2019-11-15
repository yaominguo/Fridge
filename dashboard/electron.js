const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')
let win

function createWindow() {
  // const file = 'index.html'
  win = new BrowserWindow({})
  win.maximize()
  win.setResizable(false)
  // win.loadURL(url.format({
  //   pathname: path.join(__dirname, file),
  //   protocol: 'file:',
  //   slashes: true,
  // }))
  // win.webContents.openDevTools()
  win.loadFile('./index.html')
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win = null) {
    createWindow()
  }
})
