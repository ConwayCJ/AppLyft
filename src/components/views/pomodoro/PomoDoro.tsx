import PDTimer from "./PDTimer";
import useAppProvider from "../../../context/UseAppProvider";

export default function PomoDoro() {
  const { setTimeLeft } = useAppProvider()

  return (
    <div className=" place-self-start w-full">
      <div className="flex w-full px-12 items-center justify-between lg:justify-center">
        <div className="font-bold text-4xl text-secondary">
          PomoDoro
        </div>
        <div>
          <PDTimer />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col items-center m-4">
          <p className=" text-3xl text-info">Start Work:</p>
          <div className="join my-4">
            <button onClick={() => setTimeLeft(5)} className="btn btn-md join-item">5 sec</button>
            <button onClick={() => setTimeLeft(25 * 60)} className="btn btn-md join-item">25</button>
            <button onClick={() => setTimeLeft(20 * 60)} className="btn btn-md join-item">20</button>
          </div>
        </div>
        <div className="m-4">
          <p className=" text-3xl text-info">Start Break:</p>
          <div className="join my-4">
            <button onClick={() => setTimeLeft(5 * 60)} className=" btn btn-md join-item">5</button>
            <button onClick={() => setTimeLeft(15 * 60)} className=" btn btn-md join-item">15</button>
          </div>
        </div>

      </div>
      <div className=" divider m-0"></div>



      <div className="hero-content text-center">
        <div className="max-w-md">
          <article className="text-center">
            <h1 className="text-5xl font-bold text-info">What is PomoDoro?</h1>
            <p className="py-6">
              The PomoDoro technique is a popular time-management method invented by Franceso Cirillo.
              It separates projects and tasks by implementing breaks. For example: After 25 minutes of work, you take 5 minutes of break. After 4 sessions, you take a longer break.
            </p>
          </article>

        </div>
      </div>

    </div>
  )
}