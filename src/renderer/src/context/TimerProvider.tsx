import { createContext, useEffect, useState, Dispatch, SetStateAction } from "react"
import "../assets/renderer.d.ts"

const defaultAPI = {
  timeLeft: 0,
  setTimeLeft: (() => { }) as Dispatch<SetStateAction<number>>,
}

type AppProviderValue = typeof defaultAPI

export const TimerContext = createContext<AppProviderValue>(defaultAPI)

export function TimerProvider({ children }: any) {
  // state
  const [timeLeft, setTimeLeft] = useState(defaultAPI.timeLeft)

  // functions

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
    timeLeft: timeLeft,
    setTimeLeft: setTimeLeft,
  }

  return (
    <TimerContext.Provider value={api}>
      {children}
    </TimerContext.Provider>
  )
}
