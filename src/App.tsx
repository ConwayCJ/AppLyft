import { useContext, useState } from 'react'
import './App.css'
import Login from './components/Login'
import Profile from './components/Profile'
import { ProfileContext } from './ProfileContext'

function App() {
  const profile = useContext(ProfileContext)
  const [currentProfile, setCurrentProfile] = useState<string>(profile.username)

  // const handleWrite = (e: React.FormEvent<SubmitEvent>, data: Job) => {
  //   e.preventDefault()

  //   if (currentProfile !== null) {

  //     const fData = {
  //       ...data,
  //       dateApplied: new Date(),
  //       status: 'Applied',
  //       id: null,
  //     }
  //     console.log(`Submitting new job for ${currentProfile}: 
  //       ${fData}
  //     `)
  //     profile.methods.postJob(fData, currentProfile)
  //   } else {
  //     alert('Please choose a profile!')
  //   }
  // }

  function handleProfile(p: string | null) {
    setCurrentProfile(p ? p : '')
    profile.username = currentProfile
  }

  return (
    <div>
      {
        currentProfile ? (
          <ProfileContext.Provider value={profile}>
            <Profile logout={handleProfile} username={currentProfile} />
          </ProfileContext.Provider>
        ) : <Login handleProfile={handleProfile} />
      }
    </div>
  )
}

export default App
