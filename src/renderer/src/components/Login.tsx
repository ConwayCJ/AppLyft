import { useState, useEffect, useRef, useCallback } from 'react'
import { Drawer, Menu } from 'react-daisyui'
import DisplayModeToggle from './DisplayModeToggle'
import useAppProvider from '../context/UseAppProvider'

export default function Login({ loginAs }: { loginAs: (profileName: string) => void }) {
  const { allProfiles, methods } = useAppProvider()
  const [existingProfiles, setExistingProfiles] = useState<string[]>([])

  async function getProfiles() {
    const profiles = await allProfiles();
    setExistingProfiles(profiles)
  }

  useEffect(() => {
    getProfiles()
  }, [allProfiles])

  const NewProfileDrawer = () => {
    const [visible, setVisible] = useState(false);
    const [newUserName, setNewUserName] = useState<string>("")
    const [loginMessage, setLoginMessage] = useState(<label>What&apos;s your name?</label>)
    const inputRef = useRef<HTMLInputElement>(null);

    const toggleVisible = useCallback(() => {
      setVisible((prevVisible) => !prevVisible);
    }, []);

    useEffect(() => {
      if (visible) {
        // Use requestAnimationFrame to ensure focus is set after rendering
        requestAnimationFrame(() => {
          inputRef.current?.focus();
        });
      }
    }, [visible]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();


      function validateUsername(username) {
        // Check if the username is not empty
        if (!username) {
          setLoginMessage(<label className="text-red-600 animate-bounce">Username is required.</label>)
          return false
        }

        // Check if the username length is within a specific range
        if (username.length < 3 || username.length > 20) {
          setLoginMessage(<label className="text-red-600 animate-bounce">Username must be between 3 and 20 characters.</label>)
          return false
        }

        // Check if the username contains only alphanumeric characters and underscores
        if (!/^[a-zA-Z0-9_ ]+$/.test(username)) {
          setLoginMessage(<label className='text-red-600 animate-bounce'>Username can only contain letters, numbers, and underscores.</label>);
          return false
        }

        if (existingProfiles.includes(username)) {
          setLoginMessage(<label className="text-red-600 animate-bounce">They already exist 💔</label>);
          return false
        }

        // The username is considered valid
        return true;
      }

      async function handleCreateProfile() {
        if (validateUsername(newUserName)) {
          methods.createProfile(newUserName)
          getProfiles()
          toggleVisible();
        }
      }

      handleCreateProfile()

    };

    return (
      <Drawer
        open={visible}
        onClickOverlay={toggleVisible}
        side={
          <Menu className="p-4 w-80 h-full bg-base-200 text-base-content">
            <div className="hero min-h-screen text-success">
              <div className="hero-content text-center">
                <div className="max-w-md">
                  <h1 className="text-5xl font-bold">Hello there</h1>
                  <p className="py-3">Let&apos;s get started.</p>
                  <p className='py-3'>{loginMessage}</p>
                  <form onSubmit={handleSubmit} className="flex flex-col">

                    <input
                      ref={inputRef}
                      type="text"
                      className="input input-bordered input-info input-sm mb-2"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="btn btn-sm outline outline-1"
                    >Create Profile</button>
                  </form>
                </div>
              </div>
            </div>
          </Menu>
        }
      >
        <div className='flex items-center justify-center'>

          <label
            htmlFor="my-drawer"
            onClick={toggleVisible}
            className="drawer-button mt-4 mx-2 text-info text-md"
          >
            Create a Profile
          </label>
        </div>
      </Drawer>
    );
  };

  return (
    <div className="drawer h-full w-full">
      <div className="absolute top-0 right-0 p-6">
        <DisplayModeToggle />
      </div>

      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="hero min-h-screen">
          <div className="hero-content text-center">
            {/* Hero Section Start */}
            <div className="max-w-md flex flex-col items-center">
              <h1 className="text-5xl font-bold">Welcome back!</h1>
              <p className="py-6">
                Let&apos;s get this <s>bread</s> job.
              </p>
              <p className="py-2">Remind me, who are you?</p>
              {/* Container for profile buttons */}
              <span className='join my-3'>
                {existingProfiles.map((profile, index) => {
                  return (
                    <div className="indicator" key={index}>
                      <span className="indicator-item badge badge-secondary"></span>
                      <button className='btn join-item border-primary' onClick={() => loginAs(profile)}>
                        {profile}
                      </button>
                    </div>
                  )
                }
                )}
              </span>
              <NewProfileDrawer />
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
