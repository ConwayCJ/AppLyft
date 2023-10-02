import { contextBridge, ipcRenderer } from 'electron'
import { Job } from '../types'

// Save data to data.json file:
const postJob = (newJob: Job, profile: string) => {
  ipcRenderer.send("postJob", newJob, profile)
}

/* Profile Handlers */

const createProfile = (profileName: string) => {
  ipcRenderer.send("createProfile", profileName)
}

const getProfiles = () => {
  return ipcRenderer.invoke("getProfiles")
}

const bridge = {
  postJob,
  createProfile,
  getProfiles,
}

contextBridge.exposeInMainWorld("Bridge", bridge)