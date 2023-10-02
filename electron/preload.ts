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

const getJobs = (username: string) => {
  console.log('preload:', username)
  return ipcRenderer.invoke("getJobs", username)
}

const bridge = {
  postJob,
  createProfile,
  getProfiles,
  getJobs,
}

contextBridge.exposeInMainWorld("Bridge", bridge)