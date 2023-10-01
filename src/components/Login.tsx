import { useState, useEffect } from 'react'
import DisplayModeToggle from './DisplayModeToggle'

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
    <div className=" flex w-full h-screen items-center justify-center">

      <span className='flex flex-col items-center justify-center h-full w-[60%]'>
        <h2 className=' text-2xl mb-3'>Welcome back!</h2>
        <span className='flex flex-wrap justify-center items-center'>

          {existingProfiles.map((profile, index) =>
          (
            <button className='btn btn-md outline outline-1 mx-3' onClick={() => handleProfile(profile)} key={index}>
              {profile}
            </button>
          )
          )}
        </span>
        {/* map over list of buttons for each existing profile */}
      </span>


      <span className='flex flex-col items-center justify-around bg-secondary h-full w-[40%]'>

        <DisplayModeToggle />


        <form className='flex flex-col' onSubmit={e => handleCreateProfile(e, newProfileName)}>
          <h6 className=' '>Create new profile</h6>
          <input className='input input-bordered input-accent input-sm mb-2' placeholder="Profile Name" onChange={e => setNewProfileName(e.target.value)} />
          <button className='btn btn-sm outline outline-1'>Create Profile</button>
        </form>
        <div></div>
      </span>

    </div>
  )
}