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
    <div className='drawer relative flex flex-col items-center justify-center h-full w-full'>
      <div className='absolute top-0 right-0 p-6 '>
        <DisplayModeToggle />
      </div>

      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="hero min-h-screen">
          <div className="hero-content text-center">
            {/* Hero Section Start */}
            <div className="max-w-md flex flex-col items-center">
              <h1 className="text-5xl font-bold">Welcome back!</h1>
              <p className="py-6">Let's get this <s>bread</s> job.</p>
              <p className='py-2'>Remind me, who are you?</p>
              {/* Container for profile buttons */}
              <span className='join'>
                {existingProfiles.map((profile, index) =>
                (
                  <button className='btn join-item border-primary' onClick={() => handleProfile(profile)} key={index}>
                    {profile}
                  </button>
                )
                )}
              </span>
              <label htmlFor="my-drawer" className=" align-bottom drawer-button mt-4 text-secondary text-md">Create a Profile</label>
            </div>
            {/* Hero Section End */}
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-100 flex flex-col items-center justify-center">
          {/* Sidebar content here */}
          <div className="hero min-h-screen text-success">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold">Hello there</h1>
                <p className="py-6">Let's get started.</p>
                <form className='flex flex-col' onSubmit={e => handleCreateProfile(e, newProfileName)}>

                  <input className='input input-bordered input-accent input-sm mb-2' placeholder="Profile Name" onChange={e => setNewProfileName(e.target.value)} />
                  <button className='btn btn-sm outline outline-1'>Create Profile</button>
                </form>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </div >
  )
}
