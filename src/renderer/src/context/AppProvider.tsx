import { createContext, useEffect, useState, Dispatch, SetStateAction } from "react"
import "../assets/renderer.d.ts"

const electronApi = window.api

const defaultAPI = {
  username: '',
  timeLeft: 0,
  setTimeLeft: (() => { }) as Dispatch<SetStateAction<number>>,
  handleLoginLogout: (() => { }) as ((p: string | null) => void),
  allProfiles: electronApi.getProfiles,
  methods: {
    postJob: electronApi.postJob,
    getJobs: electronApi.getJobs,
    createProfile: electronApi.createProfile,
    removeJobs: electronApi.removeJobs,
    updateJobs: electronApi.updateJobs,
    updateSingleJob: electronApi.updateSingleJob,
  }
}

type AppProviderValue = typeof defaultAPI

export const AppContext = createContext<AppProviderValue>(defaultAPI)

export function AppProvider({ children }: any) {
  // state
  const [currentProfile, setCurrentProfile] = useState(defaultAPI.username)
  const [timeLeft, setTimeLeft] = useState(defaultAPI.timeLeft)
  // functions

  function handleLoginLogout(p: string | null) {
    setCurrentProfile(p ? p : '')
    setTimeLeft(0)
  }


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
  }

  return (
    <AppContext.Provider value={api}>
      {children}
    </AppContext.Provider>
  )
}
