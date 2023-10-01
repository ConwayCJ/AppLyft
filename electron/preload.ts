import { contextBridge, ipcRenderer } from 'electron'
import { Job } from '../types'



// Save data to data.json file:
const saveData = (newJob: Job, profile: string) => {
  ipcRenderer.send("saveData", newJob, profile)
}

/* Profile Handlers */

const createProfile = (profileName: string) => {
  ipcRenderer.send("createProfile", profileName)
}

const getProfiles = () => {
  return ipcRenderer.invoke("getProfiles")
}

const bridge = {
  saveData,
  createProfile,
  getProfiles,
}

contextBridge.exposeInMainWorld("Bridge", bridge)