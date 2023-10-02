import { Job } from '../../../types';
import { ProfileContext } from '../../ProfileContext';
import heman from '../../assets/heman.png'
import { useContext, useEffect, useState } from 'react';
export default function JobTable({ username }: { username: string }) {

  const [data, setData] = useState([]);

  const profileOptions = useContext(ProfileContext)

  const getJobs = async () => {
    const jobs = await profileOptions.methods.getJobs(username);
    setData(jobs)
  }

  useEffect(() => {
    getJobs()
  }, [])



  // const detailedTable = (jobdata: Job[]) => {

  // }

  // const condensedTable = (jobdata: Job[]) => {

  // }

  // const simpleTable = (jobdata: Job[]) => {

  // }

  return (
    <div className="overflow-x-auto overflow-y-auto h-screen">
      <table className="table">
        <thead>
          <tr>
            <th>
              <label>
                Checked
              </label>
            </th>
            <th>Motivator</th>
            <th>Job</th>
            <th>📅 Applied</th>
            <th>📅 Past</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {data.map((job: Job, index) => {

            const date = new Date(job.dateApplied)
            const dateString = date.toLocaleDateString()

            const daysSince = Math.round((new Date().getTime() - date.getTime()) / (1000 * 3600 * 24))



            return (
              <tr key={index}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={heman} alt="Job Picture" />
                      </div>
                    </div>
                  </div>
                </td>
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
        {/* foot */}
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
  )
}