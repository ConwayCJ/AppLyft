import { Job } from '../../../../types';
import { ProfileContext } from '../../../ProfileContext';
import { useContext, useEffect, useState } from 'react';
import TableStats from './TableStats';


export default function JobTable({ username }: { username: string }) {
  const profileOptions = useContext(ProfileContext)

  const [jobList, setJobList] = useState<Array<Job & { checked: boolean }>>([]);
  const [tableSize, setTableSize] = useState('md')
  const [checkAll, setCheckAll] = useState(false)

  const getJobs = async () => {
    const jobs = await profileOptions.methods.getJobs(username);

    setJobList(jobs.map((job: Job) => ({ ...job, checked: false })))
  }

  const deleteSelectedJobs = async () => {

    alert("This will delete all selected jobs. Are you sure?")

    const selectedJobs = jobList.filter(job => !job.checked)
    console.log(selectedJobs)
    // profileOptions.methods.removeJobs(selectedJobs, username)
    //need to await the above
    getJobs()
  }

  function checkJob(job: Job & { checked: boolean }) {
    console.log(job.checked)

    const updatedJobList = jobList.map(prevJob => {
      if (prevJob.id === job.id) {
        job.checked = !job.checked
      }
      return prevJob
    })

    setJobList(updatedJobList)
  }

  useEffect(() => {
    getJobs()
  }, [])

  useEffect(() => {
    setJobList(jobList.map((job: Job & { checked: boolean }) => ({ ...job, checked: checkAll })))
  }, [checkAll])

  return (
    <div className='flex flex-col'>

      <TableStats jobList={jobList} />


      {/* Table Component */}

      {/* Toolbar */}
      <div className='join flex flex-wrap justify-between'>
        {/* Delete/Update/Change View */}
        <div className='text-sm breadcrumbs'>
          <ul>
            <li>
              <button className='flex btn btn-xs' onClick={deleteSelectedJobs}>
                <svg className='w-4 h-4 mr-2 stroke-current' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z" />                  Delete Selected
                </svg>
                Delete Selected
              </button>
            </li>
            <li>
              <button className='flex btn btn-xs'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                Update Selected
              </button>
            </li>
            <li>
              <select className="select select-xs select-ghost w-full max-w-m uppercase" onChange={(e) => setTableSize(e.target.value)}>
                <option disabled defaultValue={"sm"}>Table Size</option>
                <option value={'xs'}>Small</option>
                <option value={'sm'}>Medium</option>
                <option value={'md'}>Large</option>
              </select>
            </li>
          </ul>
        </div>
        {/* Search/Filter */}
        <div>
          <input className='input input-sm input-bordered join-item' placeholder='🔎 Search' disabled />
          <select disabled className='select select-sm select-bordered join-item'>
            <option disabled selected>Filter</option>
            <option>All</option>
            <option>Applied</option>
            <option>Emailed Followup</option>
            <option>Past 7 days</option>
          </select>
        </div>
      </div>
      {/* Table */}
      <table className={`table table-${tableSize} overflow-y-hidden`}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={checkAll}
                className="checkbox checkbox-sm"
                onChange={() => setCheckAll(!checkAll)} />
            </th>
            <th>Job</th>
            <th>📅 Applied</th>
            <th>📅 Past</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody className=''>
          {jobList.map((job: Job & { checked: boolean }, index) => {

            const date = new Date(job.dateApplied)
            const dateString = date.toLocaleDateString()

            const daysSince = Math.round((new Date().getTime() - date.getTime()) / (1000 * 3600 * 24))
            const daysSinceFormatted = daysSince < 1 ? 'Today' : `${daysSince} days`


            return (
              <tr key={index}>
                <th>
                  <label>
                    <input checked={job.checked} type="checkbox" className={`checkbox checkbox-${tableSize}`} onChange={() => checkJob(job)} />
                  </label>
                </th>
                <td>
                  {job.title}
                  {job.company && (<>
                    <br />
                    <span className="badge badge-ghost badge-sm">{job.company}</span>
                  </>)}
                </td>
                <td>{dateString}</td>
                <td>{daysSinceFormatted}</td>
                <td>
                  <select className="select select-sm select-ghost w-full max-w-m">
                    <option disabled defaultValue={"Status"}></option>
                    <option>Applied</option>
                    <option>Emailed Followup</option>
                    <option>Interview Scheduled</option>
                  </select>
                </td>
                <td>
                  <button className="btn btn-sm" onClick={() => document.getElementById(`${job.id}`)?.showModal()}>Details</button>
                  <dialog id={`${job.id}`} className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Hello!</h3>
                      <p>Job Url: <a className=" link" href={job.url} target="_blank">{job.url}</a></p>
                      <article className="prose">
                        {job.description}
                      </article>
                      <section>
                        <h4>Person to Contact:</h4>
                        <p>{job.pocname}</p>
                        <p><a className="link" target="_blank" href={job.pocurl}>{job.pocurl}</a></p>
                      </section>
                      <p className="py-4">Press ESC key or click outside to close</p>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Job</th>
            <th>📅 Applied</th>
            <th>📅 Past</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}