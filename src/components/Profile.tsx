import Navigation from "./Navigation";
import View from "./View";
import Themes from "./Themes";

export default function Profile({ logout, username }: any) {

  // const postNewJob = (e, data) => {
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

  //     window.Bridge.saveData(fData, currentProfile)
  //   }
  // }

  return (
    <div className="flex w-full">
      <div className="grid h-screen bg-base-300 px-2 py-3">
        <span className="place-self-start justify-self-center text-center w-full">
          <span className="">
            <p className="pt-6 text-xl font-bold text-secondary">Job Tracker</p>
            <p className=" text-xs">BryJ</p>
          </span>
          <div className="divider"></div>
          <span>
            <Navigation />
          </span>
        </span>
        <span className="place-self-end flex flex-col">
          <Themes />
          <button className="btn btn-sm border-error mt-2" onClick={() => logout(null)}>Logout</button>
        </span>
      </div>
      <div className="divider divider-horizontal "></div>
      <div className="grid h-screen flex-grow card place-items-center">
        <View />
      </div>
    </div>
  )
}