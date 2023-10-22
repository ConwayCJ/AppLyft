import { createContext } from 'react'
import "../renderer.d.ts"

const defaultProfile = {
  username: '',
  allProfiles: window.Bridge.getProfiles,
  timeLeft: 0,
  methods: {
    postJob: window.Bridge.postJob,
    getJobs: window.Bridge.getJobs,
    createProfile: window.Bridge.createProfile,
    removeJobs: window.Bridge.removeJobs,
    updateJobs: window.Bridge.updateJobs,
    updateSingleJob: window.Bridge.updateSingleJob,
  }
}

type Profile = typeof defaultProfile

export const ProfileContext = createContext<Profile>(defaultProfile);