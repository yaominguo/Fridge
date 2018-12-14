const { app, BrowserWindow }  = require('electron')
const url = require('url')
const path = require('path')
let win
function createWindow() {
  // const file ='./dist/index.html'
  const file ='index.html'
  win = new BrowserWindow({
    width: 800,
    height: 600,
  })
  win.loadURL(url.format({
    pathname: path.join(__dirname, file),
    protocol: 'file:',
    slashes: true
  }))
  win.webContents.openDevTools()
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
  if (win === null) {
    createWindow()
  }
})
