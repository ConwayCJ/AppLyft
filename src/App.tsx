import { useContext, useState } from 'react'
import './App.css'
import Login from './components/Login'
import Profile from './components/Profile'
import { ProfileContext } from './ProfileContext'

function App() {
  const profile = useContext(ProfileContext)
  const [currentProfile, setCurrentProfile] = useState<string>(profile.username)

  function handleLoginLogout(p: string | null) {
    setCurrentProfile(p ? p : '')
  }

  return (
    <div>
      {
        currentProfile ? (
          <ProfileContext.Provider value={profile}>
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
