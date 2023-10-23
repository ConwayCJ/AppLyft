import { app, BrowserWindow, ipcMain, shell } from "electron";
import { Job } from "../types";
import path from "node:path";
import { autoUpdater } from "electron-updater";
import * as jsonDataHandler from './jsonHandler.ts'


process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    minWidth: 620,
    minHeight: 653,
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  win.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: "deny" };
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

// app.on('ready', () => {
//   session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
//     callback({
//       responseHeaders: {
//         ...details.responseHeaders,
//         'Content-Security-Policy': ['default-src \'none\'']
//       }
//     })
//   })
// })




app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  jsonDataHandler.initDataFolder()
  ipcMain.handle("getProfiles", getProfiles);
  ipcMain.handle("getJobs", getJobs);
  ipcMain.handle("getJobsByStatus", getJobsByStatus);
  createWindow();
});

autoUpdater.on("update-available", (info) => {

  const pth = autoUpdater.downloadUpdate();
  console.log("Update available:", pth)
  console.log(info)
});

autoUpdater.on("update-not-available", (info) => {
  console.log("update not available", info)
});

/*Download Completion Message*/
autoUpdater.on("update-downloaded", (info) => {
  console.log("update downloaded", info)
});

autoUpdater.on("error", (info) => {
  console.error("error updating", info)
});




//pain
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