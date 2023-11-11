import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      postJob: (newJob: Job, profile: string) => void
      createProfile: (profileName: string) => void
      getProfiles: () => string[]
      getJobs: (profileName: string) => Job[]
      removeJobs: (jobs: Job[], profile: string) => void
      updateJobs: (jobs: Job[], profile: string) => void
      updateSingleJob: (job: Job, profile: string) => void
      getJobsByStatus: (profileName: string, filter: string) => Job[]
      getVersion: () => string
      getChangeLog: () => Uint8Array
      getSettings: (username) => string
    }
  }
}
