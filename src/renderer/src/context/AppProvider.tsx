import { createContext, useEffect, useState, Dispatch, SetStateAction } from "react"
import "../assets/renderer.d.ts"

const api = window.api

const defaultAPI = {
  username: '',
  handleSetSettings: (() => { }) as Dispatch<SetStateAction<any>>,
  handleLoginLogout: (() => { }) as ((p: string | null) => void),
  allProfiles: api.getProfiles,
  version: api.getVersion,
  changelog: api.getChangeLog,
  settings: { jobs: [], pomoDoro: {} },
  methods: {
    postJob: api.postJob,
    getJobs: api.getJobs,
    createProfile: api.createProfile,
    removeJobs: api.removeJobs,
    updateJobs: api.updateJobs,
    updateSingleJob: api.updateSingleJob,
    getSettings: api.getSettings,
    updateSettings: api.updateSettings
  }
}

type AppProviderValue = typeof defaultAPI

export const AppContext = createContext<AppProviderValue>(defaultAPI)

export function AppProvider({ children }: any) {
  // state
  const [currentProfile, setCurrentProfile] = useState(defaultAPI.username)
  const [settings, setSettings] = useState(defaultAPI.settings)
  // functions

  function handleLoginLogout(p: string | null) {
    setCurrentProfile(p ? p : '')
  }

  async function handleSetSettings(username: string) {
    const userSettings = await defaultAPI.methods.getSettings(username)
    console.log(userSettings)
    setSettings(userSettings)
  }

  async function setVersion() {
    // Set App title to curr version
    const version = await defaultAPI.version()
    document.title = 'AppLyft ' + version
  }


  useEffect(() => {
    setVersion()
  }, [])

  const api = {
    username: currentProfile,
    handleLoginLogout,

    //backend state/state management
    methods: defaultAPI.methods,
    allProfiles: defaultAPI.allProfiles,
    version: defaultAPI.version,
    changelog: defaultAPI.changelog,
    handleSetSettings: handleSetSettings,
    settings: settings,
  }

  return (
    <AppContext.Provider value={api}>
      {children}
    </AppContext.Provider>
  )
}
