import { ProfileContext } from "../../../ProfileContext";
import { useContext } from 'react'
import PDTimer from "./PDTimer";

export default function PomoDoro() {
  const profile = useContext(ProfileContext)

  return (
    <div className=" place-self-start w-full">
      {/* Banner */}
      <div className="flex w-full px-12 items-center justify-between lg:justify-center">
        <div className="font-bold text-4xl text-secondary">
          PomoDoro
        </div>
        <div className="">
          <PDTimer />
        </div>
      </div>
      <div className=" divider m-0"></div>

      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          <div className="flex justify-around">
            <div className="flex flex-col items-center">
              <p className=" text-3xl text-info">Start Work:</p>
              <div className="join my-4">
                <button onClick={() => profile.setTimeLeft(25 * 60)} className="btn btn-md join-item">25</button>
                <button onClick={() => profile.setTimeLeft(20 * 60)} className="btn btn-md join-item">20</button>
              </div>
            </div>

            <div>
              <p className=" text-3xl text-info">Start Break:</p>
              <div className="join my-4">
                <button onClick={() => profile.setTimeLeft(5 * 60)} className=" btn btn-md join-item">5</button>
                <button onClick={() => profile.setTimeLeft(15 * 60)} className=" btn btn-md join-item">15</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}