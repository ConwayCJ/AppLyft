import { useState } from 'react'
import './App.css'
import NewJobForm from './components/NewJobForm'
import Login from './components/Login'
import Navigation from './components/Navigation'

function App() {
  const [value, setValue] = useState("value")
  const [currentProfile, setCurrentProfile] = useState(null)

  const handleWrite = (e, data) => {
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

      window.Bridge.saveData(fData, currentProfile)
    } else {
      alert('Please choose a profile!')
    }
  }

  const handleProfile = (p: string) => {
    setCurrentProfile(p)
  }


  return (
    <div>
      {currentProfile ? (
        <>
          <Navigation />
          <span>
            <NewJobForm handleWrite={handleWrite} />
          </span>
        </>
      ) : <Login handleProfile={handleProfile} />}

    </div>
  )
}

export default App
