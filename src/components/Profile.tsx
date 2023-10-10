import Navigation from "./Navigation";
import View from "./View";
import Themes from "./Themes";
import { useState } from 'react'


type ProfileProps = {
  logout: (p: string | null) => void,
  username: string,
}

export default function Profile({ logout, username }: ProfileProps) {

  const [feature, setFeature] = useState('home')

  function toggleFeature(feature: string): void {
    if (feature === 'disabled') {
      alert('That feature is currently disabled.')
    }

    setFeature(feature)
  }

  return (
    <div className="flex w-full">
      <div className="grid h-screen bg-base-300 px-2 py-3">
        <span className="place-self-start justify-self-center text-center w-full">
          <span className="">
            <p className="pt-6 text-xl font-bold text-secondary">Job Tracker</p>
            <p className=" text-xs">By: BryJ</p>
          </span>
          <div className="divider"></div>
          <span>
            <Navigation toggleFeature={toggleFeature} />
          </span>
        </span>
        <span className="place-self-end flex flex-col">
          <Themes />
          <button className="btn btn-sm border-error mt-2" onClick={() => logout(null)}>Logout</button>
        </span>
      </div>
      <div className="divider divider-horizontal "></div>
      <div className="grid h-screen flex-grow card place-items-center">
        <View username={username} feature={feature} />
      </div>
    </div>
  )
}