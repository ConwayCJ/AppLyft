import TimerOptions from "./TimerOptions";
import Settings from './Settings'
import PDTimer from "./PDTimer";
import Stats from "../stats/Stats";

export default function PomoDoro() {
  return (
    <div className=" place-self-start w-full">
      <div className="flex w-full px-12 items-center justify-center">
        <div className="flex">
          <div>
            <h6 className="font-bold text-4xl text-secondary">PomoDoro</h6>
            <Settings />
            <div>
              <PDTimer />
              <Stats />
            </div>
          </div>
        </div>
      </div>
      <TimerOptions />
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