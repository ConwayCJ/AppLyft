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

//get all profiles
const getProfiles = () => {
  return ipcRenderer.invoke("getProfiles")
}

//get all jobs from the intended username
const getJobs = (username: string) => {
  return ipcRenderer.invoke("getJobs", username)
}

//remove a single job based based on the ID we send on the given profile, return nothing
const removeJob = (jobId: number, profile: string) => {
  ipcRenderer.send("removeJob", jobId, profile)
}
const bridge = {
  postJob,
  createProfile,
  getProfiles,
  getJobs,
  removeJob
}

contextBridge.exposeInMainWorld("Bridge", bridge)