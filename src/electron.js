import { app, BrowserWindow, Menu } from 'electron'
import path from 'path'
import MenuBuilder from './menu'

const isDev = process.env.NODE_ENV === 'development'
let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    frame: false,
    backgroundColor: '#FFF',
    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadURL(
     isDev ?
    'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // To work with commands
  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  isDev && mainWindow.webContents.on('context-menu', (_, props) => {
    const { x, y } = props;

    Menu.buildFromTemplate([
      {
        label: 'Inspect element',
        click: () => {
          mainWindow.webContents.inspectElement(x, y);
        }
      }
    ]).popup({ window: this.mainWindow });
  });
}

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
