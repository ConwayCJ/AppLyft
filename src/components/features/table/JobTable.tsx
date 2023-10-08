import { Job } from '../../../../types';
import { ProfileContext } from '../../../ProfileContext';
import { useContext, useEffect, useState } from 'react';
import TableStats from './TableStats';


export default function JobTable({ username }: { username: string }) {
  const profileOptions = useContext(ProfileContext)

  const [jobList, setJobList] = useState([]);
  let selectedJobs = [];

  const getJobs = async () => {
    const jobs = await profileOptions.methods.getJobs(username);
    setJobList(jobs)
  }

  const jobDeletionCheckboxChange = (jobId?:number) => {
    //if it already exists in the array, remove it
    console.log("adding job with id: " + jobId)
    if(selectedJobs.includes(jobId)){
      selectedJobs = (selectedJobs.filter((id) => id !== jobId))
      console.log(selectedJobs)
    } else {
      //otherwise just set the selected jobs to be the old array with the new id added on
      selectedJobs = [...selectedJobs, jobId]
      console.log(selectedJobs)
    }
  }

  const deleteSelectedJobs = () => {
    profileOptions.methods.removeJobs(selectedJobs, username)

  }
  useEffect(() => {
    getJobs()
  }, [])

  
  // const detailedTable = (jobList: Job[]) => {

  // }

  // const condensedTable = (jobList: Job[]) => {

  // }

  // const simpleTable = (jobList: Job[]) => {

  // }

  return (
    <div className='flex flex-col'>

      <TableStats jobList={jobList} />

      <div className="overflow-x-auto overflow-y-auto h-screen">
        <table className="table">
          <thead>
            <tr>
              <th>
                <label>
                  Checked
                </label>
              </th>
              <th>Job</th>
              <th>📅 Applied</th>
              <th>📅 Past</th>
              <th>Status</th>
              <th>Details</th>
              <th><button onClick={deleteSelectedJobs}>Delete Checked Jobs</button></th>
            </tr>
          </thead>
          <tbody>
            {jobList.map((job: Job, index) => {

              const date = new Date(job.dateApplied)
              const dateString = date.toLocaleDateString()
              const daysSince = Math.round((new Date().getTime() - date.getTime()) / (1000 * 3600 * 24))

              return (
                <tr key={index}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" onClick={()=>jobDeletionCheckboxChange(job.id)}/>
                    </label>
                  </th>
                  <td>
                    {job.title}
                    <br />
                    <span className="badge badge-ghost badge-sm">{job.company}</span>
                  </td>
                  <td>{dateString}</td>
                  <td>{daysSince} days</td>
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
              <th>Name</th>
              <th>Job</th>
              <th>📅 Applied</th>
              <th>📅 Past</th>
              <th>Status</th>
              <th>URL</th>
              <th>Job Description</th>
              <th>Contact</th>
            </tr>
          </tfoot>
        </table>
      </div>

    </div>
  )
}