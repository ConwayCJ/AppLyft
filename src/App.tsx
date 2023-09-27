import { useState } from 'react'
import './App.css'
import NewJobForm from './components/NewJobForm'
import Login from './components/Login'

function App() {
  const [value, setValue] = useState("value")
  const [currentProfile, setCurrentProfile] = useState(null)

  const handleWrite = (e, data) => {
    e.preventDefault()

    if (profile !== null) {
      const fData = {
        ...data,
        dateApplied: new Date(),
        status: 'Applied',
        id: null,
      }
      console.log("Submitting new job")

      window.Bridge.saveData(fData, profile)

    } else {
      alert('Please choose a profile!')
    }
  }

  const handleProfile = (p) => {
    setCurrentProfile(p)
  }


  return (
    <>
      {currentProfile ? (
        <>
          <input onChange={e => setCurrentProfile(e.target.value)} placeholder='Enter Profile Name' />
          <NewJobForm handleWrite={handleWrite} />
        </>
      ) : <Login handleProfile={handleProfile} />}

    </>
  )
}

export default App
