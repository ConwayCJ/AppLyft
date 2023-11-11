import { createContext, useEffect, useState, Dispatch, SetStateAction } from "react"
import "../assets/renderer.d.ts"

const electronApi = window.api

const defaultAPI = {
  username: '',
  timeLeft: 0,
  setTimeLeft: (() => { }) as Dispatch<SetStateAction<number>>,
  settings: {},
  handleSetSettings: (() => { }) as Dispatch<SetStateAction<any>>,
  handleLoginLogout: (() => { }) as ((p: string | null) => void),
  allProfiles: electronApi.getProfiles,
  version: electronApi.getVersion,
  changelog: electronApi.getChangeLog,
  methods: {
    postJob: electronApi.postJob,
    getJobs: electronApi.getJobs,
    createProfile: electronApi.createProfile,
    removeJobs: electronApi.removeJobs,
    updateJobs: electronApi.updateJobs,
    updateSingleJob: electronApi.updateSingleJob,
    getSettings: electronApi.getSettings
  }
}

type AppProviderValue = typeof defaultAPI

export const AppContext = createContext<AppProviderValue>(defaultAPI)

export function AppProvider({ children }: any) {
  // state
  const [currentProfile, setCurrentProfile] = useState(defaultAPI.username)
  const [timeLeft, setTimeLeft] = useState(defaultAPI.timeLeft)
  const [settings, setSettings] = useState({})
  // functions

  function handleLoginLogout(p: string | null) {
    setCurrentProfile(p ? p : '')
    setTimeLeft(0)
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

  setVersion()

  // Handles the amount of time left
  useEffect(() => {

    const intervalId = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1)
      } else {
        clearInterval(intervalId)
      }
    }, 1000)

    return () => clearInterval(intervalId)

  }, [timeLeft]);

  const api = {
    username: currentProfile,
    handleLoginLogout,
    //pomoDoro timer state
    timeLeft: timeLeft,
    setTimeLeft: setTimeLeft,
    //backend state/state management
    methods: defaultAPI.methods,
    allProfiles: defaultAPI.allProfiles,
    version: defaultAPI.version,
    changelog: defaultAPI.changelog,
    handleSetSettings: handleSetSettings,
    settings: settings

  }

  return (
    <AppContext.Provider value={api}>
      {children}
    </AppContext.Provider>
  )
}
