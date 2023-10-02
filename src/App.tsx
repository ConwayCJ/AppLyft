import { useContext, useState } from 'react'
import './App.css'
import Login from './components/Login'
import Profile from './components/Profile'
import { Job } from '../types'
import { ProfileContext } from './ProfileContext'

function App() {
  const profileData = useContext(ProfileContext)
  const [currentProfile, setCurrentProfile] = useState<null | string>(profileData.username)

  const handleWrite = (e: React.FormEvent<SubmitEvent>, data: Job) => {
    e.preventDefault()

    if (currentProfile !== null) {

      const fData = {
        ...data,
        dateApplied: new Date(),
        status: 'Applied',
        id: null,
      }
      console.log(`Submitting new job for ${currentProfile}: 
        ${fData}
      `)
      profileData.methods.postJob(fData, currentProfile)
    } else {
      alert('Please choose a profile!')
    }
  }

  const handleProfile = (p: string) => {
    setCurrentProfile(p ? p : null)
  }


  return (
    <div>
      {
        currentProfile ? (
          <ProfileContext.Provider value={profileData}>
            <Profile logout={handleProfile} username={currentProfile} />
          </ProfileContext.Provider>
        ) : <Login handleProfile={handleProfile} />
      }
    </div>
  )
}

export default App
