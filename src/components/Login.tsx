import { useState, useEffect } from 'react'

export default function Login({ handleProfile }) {

  const [newProfileName, setNewProfileName] = useState("")
  const [existingProfiles, setExistingProfiles] = useState([])




  useEffect(() => {
    const getProfiles = async () => {
      const profiles = await window.Bridge.getProfiles();
      setExistingProfiles(profiles)
    }
    getProfiles()
  }, [])

  const handleCreateProfile = (e: SubmitEvent, profileName: string) => {
    e.preventDefault()
    window.Bridge.createProfile(profileName)
  }

  return (
    <div>
      <span>
        <h6>Choose an Existing Profile</h6>
        {existingProfiles.map(profile => (
          <button onClick={() => handleProfile(profile)}>{profile}</button>
        ))}
        {/* map over list of buttons for each existing profile */}
      </span>


      <span>
        <h6>Create New Profile</h6>
        <form onSubmit={e => handleCreateProfile(e, newProfileName)}>
          <input onChange={e => setNewProfileName(e.target.value)} />
          <button type="submit">Create Profile</button>
        </form>
      </span>

    </div>
  )
}