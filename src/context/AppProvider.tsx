import { createContext, useEffect, useState, Dispatch, SetStateAction } from "react"
import "../../renderer.d.ts"

const defaultAPI = {
  username: '',
  timeLeft: 0,
  setTimeLeft: (() => { }) as Dispatch<SetStateAction<number>>,
  handleLoginLogout: (() => { }) as ((p: string | null) => void),
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
