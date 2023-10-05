import { app, BrowserWindow, ipcMain } from "electron";
import { Job } from "../types";
import path from "node:path";

import * as "jsonHandler" from jsonHandler/jsonHandler.ts"


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
  ipcMain.handle("getProfiles", getProfiles);
  ipcMain.handle("getJobs", getJobs);
  createWindow();
});

//pain
async function getProfiles() {
  const profiles = fs.readFileSync("data/existingProfiles.json", "utf-8");
  const jsonProfiles = JSON.parse(profiles);
  return jsonProfiles.profiles;
}

//slightly less pain
async function getJobs(event: Electron.IpcMainInvokeEvent, username: string) {
  console.log(username);
  try {
    const jobData = await fs.readFileSync(
      `data/profile.${username}.json`,
      "utf-8"
    );
    const jobsArray = await JSON.parse(jobData);

    return jobsArray.jobs;
  } catch (jsonError) {
    console.error(jsonError);
  }
}

// Create a new profile if doesn't exist
ipcMain.on("createProfile", (sender: Electron.IpcMainEvent, profileName: string) => {

  createProfile(profileName);

);

// Add a new job to existing profile
ipcMain.on("postJob",(sender: Electron.IpcMainEvent, newJob: Job, profile: string) => {
    
  addJob(newJob, profile);

  });

ipcMain.on("removeJob", (jobId, profile) => {

  removeJob(jobId, profile);

});