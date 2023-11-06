import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

export type Job = {
  title: string
  company: string
  url: string
  pocname: string
  pocurl: string
  description: string
  status: string
  dateApplied: Date
  checked: boolean
  id?: number
}

const postJob = (newJob: Job, profile: string) => {
  ipcRenderer.send('postJob', newJob, profile)
}

/* Profile Handlers */
const createProfile = (profileName: string) => {
  ipcRenderer.send('createProfile', profileName)
}

//get all profiles
const getProfiles = () => {
  return ipcRenderer.invoke('getProfiles')
}

//get all jobs from the intended username
const getJobs = (username: string) => {
  return ipcRenderer.invoke('getJobs', username)
}

const getJobsByStatus = (username: string, filter?: string) => {
  return ipcRenderer.invoke('getJobsByStatus', username, filter)
}

//remove a single job based based on the ID we send on the given profile, return nothing
const removeJobs = (jobs: Job[], profile: string) => {
  ipcRenderer.send('removeJobs', jobs, profile)
}

//change the status of all jobs that get sent to the new status
const updateJobs = (jobs: Job[], profile: string) => {
  ipcRenderer.send('updateJobs', jobs, profile)
}

//change details about a single job
const updateSingleJob = (job: Job, profile: string) => {
  ipcRenderer.send('updateSingleJob', job, profile)
}
// Custom APIs for renderer
const api = {
  postJob,
  createProfile,
  getProfiles,
  getJobs,
  removeJobs,
  updateJobs,
  updateSingleJob,
  getJobsByStatus
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
