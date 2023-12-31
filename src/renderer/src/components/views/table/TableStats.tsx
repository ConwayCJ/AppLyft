import { Job } from '../../../assets/types'
import PDTimer from '../pomodoro/PDTimer'


export default function TableStats({ jobs }: { jobs: Job[] }) {


  const todayJobs = jobs.filter(obj => Math.round((new Date().getTime() - new Date(obj.dateApplied).getTime()) / (1000 * 3600 * 24)) < 1)

  return (
    <div className="stats shadow">

      <div className="stat">

        <div className="stat-title">Total Applications</div>
        <div className="stat-value text-primary flex items-center justify-around">
          {jobs.length}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
        </div>
      </div>

      <div className="stat">
        <div className="stat-title"># Apps Today</div>
        <div className="stat-value text-secondary flex items-center justify-around">
          {todayJobs.length}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
      </div>

      <PDTimer />

    </div>
  )
}