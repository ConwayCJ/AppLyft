import { createContext } from 'react'

const defaultProfile = {
  username: '',
  allProfiles: window.Bridge.getProfiles,
  methods: {
    postJob: window.Bridge.postJob,
    getJobs: window.Bridge.getJobs,
    createProfile: window.Bridge.createProfile,
    removeJobs: window.Bridge.removeJobs,
    updateJobs: window.Bridge.updateJobs,
    updateSingleJob: window.Bridge.updateSingleJob,
  }
}

type Profile = typeof defaultProfile & { username: string }

export const ProfileContext = createContext<Profile>(defaultProfile);