import { createContext } from 'react'

const defaultProfile = {
  username: '',
  allProfiles: window.Bridge.getProfiles,
  methods: {
    postJob: window.Bridge.postJob,
    getJobs: window.Bridge.getJobs,
    createProfile: window.Bridge.createProfile,
    removeJobs: window.Bridge.removeJobs,
  }
}

type Profile = typeof defaultProfile

export const ProfileContext = createContext<Profile>(defaultProfile);