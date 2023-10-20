import { useContext, useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import Profile from './components/Profile'
import { ProfileContext } from './ProfileContext'

function App() {
  const profile = useContext(ProfileContext)
  const [currentProfile, setCurrentProfile] = useState<string>('')

  function handleLoginLogout(p: string | null) {
    setCurrentProfile(p ? p : '')
    setTimeLeft(0)
  }

  const [timeLeft, setTimeLeft] = useState(10)

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

  return (
    <div>
      {
        currentProfile ? (
          <ProfileContext.Provider value={{
            ...profile,
            username: currentProfile,
            timeLeft: timeLeft,
            setTimeLeft: setTimeLeft
          }}>
            <Profile logout={handleLoginLogout} username={currentProfile} />
          </ProfileContext.Provider>
        ) :
          <ProfileContext.Provider value={profile}>
            <Login loginAs={handleLoginLogout} />
          </ProfileContext.Provider>
      }
    </div>
  )
}

export default App