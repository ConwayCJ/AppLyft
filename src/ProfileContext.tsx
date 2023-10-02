import { createContext } from 'react'

const defaultProfile = {
  username: '',
  allProfiles: window.Bridge.getProfiles(),
  methods: {
    postJob: window.Bridge.postJob,
    createProfile: window.Bridge.createProfile,
  }
}

type Profile = typeof defaultProfile

export const ProfileContext = createContext<Profile>(defaultProfile);