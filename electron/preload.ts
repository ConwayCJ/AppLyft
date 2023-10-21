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

const getJobsByStatus = (username: string, filter?:string) => {
  return ipcRenderer.invoke("getJobsByStatus", username, filter)
}

//remove a single job based based on the ID we send on the given profile, return nothing
const removeJobs = (jobs: Job[], profile: string) => {
  ipcRenderer.send("removeJobs", jobs, profile)
}

//change the status of all jobs that get sent to the new status
const updateJobs = (jobs: Job[], profile: string) => {
  ipcRenderer.send("updateJobs", jobs, profile)
}

//change details about a single job
const updateSingleJob = (job:Job, profile:string) => {
  ipcRenderer.send("updateSingleJob", job, profile)
}




const bridge = {
  postJob,
  createProfile,
  getProfiles,
  getJobs,
  removeJobs,
  updateJobs,
  updateSingleJob,
  getJobsByStatus,
}

contextBridge.exposeInMainWorld("Bridge", bridge)