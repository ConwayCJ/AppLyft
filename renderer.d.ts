export interface IElectronAPI {
  postJob: (newJob: Job, profile: string) => void,
  createProfile: (profileName: string) => void,
  getProfiles: () => Promise<Job[]>,
  getJobs: (username: string) => Promise<Job[]>,
  removeJobs: (jobs: Job[], profile: string) => void,
  updateJobs: (jobs: Job[], profile: string) => void,
  updateSingleJob: (job: Job, profile: string) => void,
  getJobsByStatus: (username: string, filter: string) => Promise<Job[]>,
}

declare global {
  interface Window {
    Bridge: IElectronAPI
  }
}