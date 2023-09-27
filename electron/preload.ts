import { contextBridge, ipcRenderer, ipcMain } from 'electron'


// Save data to data.json file:

const saveData = (newJob, profile) => {


  ipcRenderer.send("saveData", newJob, profile)
  ipcMain.on("sendBackProfiles")
}

const getProfiles = () => {
  ipcRenderer.send('getProfiles')
  ipcMain.on('getBackProfiles', data => {
    return data
  })
}


const bridge = {
  saveData,
  getProfiles,
}

contextBridge.exposeInMainWorld("Bridge", bridge)