import { Job } from '../../../../types'
import heman from '../../../assets/heman.png'


export default function TableStats({ jobList }: { jobList: Job[] }) {


  const nJobs = jobList.length
  const todayJobs = jobList.filter(obj => Math.round((new Date().getTime() - new Date(obj.dateApplied).getTime()) / (1000 * 3600 * 24)) < 24)

  console.log(todayJobs)

  return (
    <div className="stats shadow w-[90%]">

      <div className="stat">
        <div className="stat-figure text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
        </div>
        <div className="stat-title">Total Applications</div>
        <div className="stat-value text-primary">{nJobs}</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <div className="stat-title"># Apps Today</div>
        <div className="stat-value text-secondary">{todayJobs.length}</div>
        <div className="stat-desc"></div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <div className="avatar">
            <div className="w-20 rounded-full">
              <img src={heman} />
            </div>
          </div>
        </div>
        <div className="stat-value">100%</div>
        <div className="stat-title">Absolute</div>
        <div className="stat-desc text-secondary">Badass</div>
      </div>

    </div>
  )
}