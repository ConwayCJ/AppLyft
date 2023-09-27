import { useState } from 'react'

export default function Login({ handleProfile }) {

  const [newProfileName, setNewProfileName] = useState("")
  const existingProfiles = [];
  console.log(window.Bridge.getProfiles());
  //get a list of buttons

  return (
    <div>
      <span>
        <h6>Choose an Existing Profile</h6>
        {existingProfiles.map(profile => (
          <button onClick={e => handleProfile(e, profile)}>{profile}</button>
        ))}
        {/* map over list of buttons for each existing profile */}
      </span>


      <span>
        <h6>Create New Profile</h6>
        <form onSubmit={e => handleProfile(e, newProfileName)}>
          <input onChange={e => setNewProfileName(e.target.value)} />
          <button>Create Profile</button>
        </form>
      </span>

    </div>
  )
}