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
const removeJobs = (jobIds: number[], profile: string) => {
  console.log("Preload told to remove jobs with id: ", jobId, " on profile ", profile)
  ipcRenderer.send("removeJobs", jobIds, profile)
}

const changeJobsStatus = (jobIds: number[], profile: string) => {
  console.log("updaing jobs with ids: ", jobIds)
  ipcRenderer.send("updateJobsStatus", jobIds, profile)
}

const bridge = {
  postJob,
  createProfile,
  getProfiles,
  getJobs,
  removeJobs,
  changeJobsStatus
}

contextBridge.exposeInMainWorld("Bridge", bridge)