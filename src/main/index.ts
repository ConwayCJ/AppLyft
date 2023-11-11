import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import { join } from 'path'
import fs from 'fs'
import icon from '../../resources/icon.png?asset'
import * as jsonDataHandler from './jsonHandler'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

type Job = {
  title: string
  company: string
  url: string
  pocname: string
  pocurl: string
  description: string
  status: string
  dateApplied: Date
  checked: boolean
  id?: number
}

// auto updater flags
//will not install new version on open
autoUpdater.autoDownload = false
//installs new version on quit
autoUpdater.autoInstallOnAppQuit = true

const DATA_DIR_PATH = app.getPath('appData') + '/applyft/data'

// Create the browser window.

let mainWindow

function createWindow(): void {
  mainWindow = new BrowserWindow({
    minWidth: 620,
    minHeight: 653,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    console.log(process.env['ELECTRON_RENDERER_URL'])
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}
// AUTO UPDATER HELPERS
autoUpdater.on('update-available', (info) => {
  const pth = autoUpdater.downloadUpdate()
  console.log('Update available:', pth)
  console.log(info)

  // Send an update notification to the renderer process
  mainWindow.webContents.send('update-notification', 'A new update is available. Downloading...')
})

autoUpdater.on('download-progress', (prog) => {
  // Send download progress to the renderer process
  mainWindow.webContents.send('update-download-progress', prog.percent)
})

autoUpdater.on('update-downloaded', (info) => {
  console.log('Update downloaded', info)

  // Send an update downloaded notification to the renderer process
  mainWindow.webContents.send(
    'update-notification',
    'Update downloaded. Please restart the application.'
  )
})

autoUpdater.on('error', (info) => {
  console.error('Error updating', info)
  // Send an error notification to the renderer process
  mainWindow.webContents.send('update-notification', 'Error updating: ' + info.message)
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  //----------------------------------
  /* CHECK FOR EXISTING FILE STRUCTURE */
  //----------------------------------
  console.log(DATA_DIR_PATH)
  if (!fs.existsSync(DATA_DIR_PATH)) {
    jsonDataHandler.createFolderStructure()
  }

  if (!fs.existsSync(DATA_DIR_PATH + '/existingProfiles.json')) {
    fs.writeFileSync(DATA_DIR_PATH + '/existingProfiles.json', '{"profiles": []}')
  }

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.handle('getProfiles', getProfiles)
  ipcMain.handle('getChangeLog', getChangeLog)
  ipcMain.handle('getJobs', getJobs)
  ipcMain.handle('getJobsByStatus', getJobsByStatus)
  ipcMain.handle('getVersion', getVersion)
  ipcMain.handle('getSettings', getSettings)
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  // CHECK FOR UPDATES
  autoUpdater.checkForUpdates()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
async function getProfiles() {
  return jsonDataHandler.getProfiles()
}

async function getSettings(_event: Electron.IpcMainInvokeEvent, username: string) {
  return jsonDataHandler.getSettings(username)
}

//slightly less pain
async function getJobs(_event: Electron.IpcMainInvokeEvent, username: string) {
  return jsonDataHandler.getAllJobs(username)
}

//ree
async function getJobsByStatus(
  _event: Electron.IpcMainInvokeEvent,
  username: string,
  filter: string
) {
  return jsonDataHandler.getJobsByStatus(username, filter)
}

async function getVersion() {
  return jsonDataHandler.getVersion()
}

// GET CHANGELOG FOR PATCHNOTES
async function getChangeLog() {
  return jsonDataHandler.getChangeLog()
}

//------------------------
/* DATA HANDLER/HELPERS */
//------------------------

// Write/update new setting to profile
ipcMain.on('updateSettings', (_sender: Electron.IpcMainEvent, username: string, settings: any) => {
  jsonDataHandler.updateSettings(username, settings)
})

// Create a new profile if doesn't exist
ipcMain.on('createProfile', (_sender: Electron.IpcMainEvent, profileName: string) => {
  jsonDataHandler.createProfile(profileName)
})

// Add a new job to existing profile
ipcMain.on('postJob', (_sender: Electron.IpcMainEvent, newJob: Job, profile: string) => {
  jsonDataHandler.addJob(newJob, profile)
})

ipcMain.on('removeJobs', (_sender: Electron.IpcMainEvent, jobs: Job[], profile: string) => {
  jsonDataHandler.removeJobs(jobs, profile)
})

ipcMain.on('updateJobs', (_sender: Electron.IpcMainEvent, jobs: Job[], profile: string) => {
  jsonDataHandler.updateJobs(jobs, profile)
})

ipcMain.on('updateSingleJob', (_sender: Electron.IpcMainEvent, job: Job, profile: string) => {
  jsonDataHandler.updateSingleJob(job, profile)
})

// AUTO UPDATER NOTIFICATION
ipcMain.on('update-notification', (_event, message) => {
  mainWindow.webContents.send('update-notification', message)
})
