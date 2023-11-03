import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import * as jsonDataHandler from './jsonHandler'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

type Job = {
  title: string,
  company: string,
  url: string,
  pocname: string,
  pocurl: string,
  description: string,
  status: string,
  dateApplied: Date,
  checked: boolean
  id?: number
}


function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    minWidth: 620,
    minHeight: 653,
    show: false,
    autoHideMenuBar: true,
    // ...(process.platform === 'linux' ? { icon } : {}),
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
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  jsonDataHandler.initDataFolder()
  ipcMain.handle("getProfiles", getProfiles);
  ipcMain.handle("getJobs", getJobs);
  ipcMain.handle("getJobsByStatus", getJobsByStatus);
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
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
  return jsonDataHandler.getProfiles();
}

//slightly less pain
async function getJobs(_event: Electron.IpcMainInvokeEvent, username: string) {
  return jsonDataHandler.getAllJobs(username);
}

//ree
async function getJobsByStatus(_event: Electron.IpcMainInvokeEvent, username: string, filter: string) {
  return jsonDataHandler.getJobsByStatus(username, filter);
}

// Create a new profile if doesn't exist
ipcMain.on("createProfile", (_sender: Electron.IpcMainEvent, profileName: string) => {
  jsonDataHandler.createProfile(profileName);
});

// Add a new job to existing profile
ipcMain.on("postJob", (_sender: Electron.IpcMainEvent, newJob: Job, profile: string) => {
  jsonDataHandler.addJob(newJob, profile);
});

ipcMain.on("removeJobs", (_sender: Electron.IpcMainEvent, jobs: Job[], profile: string) => {
  jsonDataHandler.removeJobs(jobs, profile);
});

ipcMain.on("updateJobs", (_sender: Electron.IpcMainEvent, jobs: Job[], profile: string) => {
  jsonDataHandler.updateJobs(jobs, profile)
});

ipcMain.on("updateSingleJob", (_sender: Electron.IpcMainEvent, job: Job, profile: string) => {
  jsonDataHandler.updateSingleJob(job, profile)
});  