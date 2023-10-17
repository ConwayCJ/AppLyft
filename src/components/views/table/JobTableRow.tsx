import { ChangeEvent, useCallback, useRef, useState, useContext } from 'react'
import { Job } from '../../../../types'
import { Button, Modal } from 'react-daisyui'
import { ProfileContext } from '../../../ProfileContext'



type JobProps = {
  job: Job & { checked: boolean },
  tableSize: string,
  checkJob: (job: Job & { checked: boolean }) => void,
  username:string
}

export default function JobTableRow({ job, checkJob, tableSize, username }: JobProps) {
  const profileOptions = useContext(ProfileContext)
  // Modal Close/Open handler
  const ref = useRef<HTMLDialogElement>(null)
  const handleShow = useCallback(() => {
    ref.current?.showModal();
  }, [ref]);

  //Date formatting
  const date = new Date(job.dateApplied)
  const dateString = date.toLocaleDateString()
  const daysSince = Math.round((new Date().getTime() - date.getTime()) / (1000 * 3600 * 24))
  const daysSinceFormatted = daysSince < 1 ? 'Today' : `${daysSince} days`

  const [jobState, setJobState] = useState({ ...job })


  const updateSingleJob = () => {
    //validate phone number??? what does this mean, do you want me to call them or something 
    //or just make sure its the right format
    profileOptions.methods.updateSingleJob(jobState, username)
  }

  const handleUpdateJob = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

    setJobState({ ...jobState, [e.target.name]: e.target.value })
  }


  return (
    <tr>
      <th>
        <label>
          <input checked={job.checked} type="checkbox" className={`checkbox checkbox-${tableSize}`} onChange={() => checkJob(job)} />
        </label>
      </th>
      <td>
        {jobState.title}
        {jobState.company && (<>
          <br />
          <span className="badge badge-ghost badge-sm">{jobState.company}</span>
        </>)}
      </td>
      <td>{dateString}</td>
      <td>{daysSinceFormatted}</td>
      <td>
        <select name="status" onChange={(e) => {
          setJobState((previous) => ({
            ...previous,
            "status": e.target.value
          }))
          updateSingleJob()
          }} className="select select-sm select-ghost w-full max-w-m">
          <option>{jobState.status}</option>
          <option>Applied</option>
          <option>Emailed Followup</option>
          <option>Interview Scheduled</option>
        </select>
      </td>
      <td>
        <Button className="btn btn-sm" onClick={handleShow}>Details</Button>
        <Modal ref={ref}>

          <div className="mockup-browser border bg-base-300">


            <div className="mockup-browser-toolbar">
              <div className="input">
                <a title='Job URL' className="link link-hover link-info" href={jobState.url} target="_blank">
                  {jobState.url.startsWith("https://") ? job.url : `https://${jobState.url}`}
                </a>
              </div>
            </div>
            {/* Add details/description/person to contact */}
            <main className='flex flex-col justify-center px-4 py-6 bg-base-200'>
              <form method="dialog">
                <button className="btn btn-sm text-warning btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>

              <section>
                <h1 className='text-xl text-secondary font-extrabold py-1'>Job Description:</h1>
                <textarea className=' textarea py-2 w-full textarea-bordered max-h-24 text-accent' value={jobState.description} name='description' onChange={e => handleUpdateJob(e)} />
              </section>

              <section>
                <h1 className='text-xl text-secondary font-extrabold'>Person to contact:</h1>
                <div className=' text-lg flex items-center my-1'>
                  <p className='mr-1'>Name:</p>
                  <input className=' bg-base-100 text-accent' value={jobState.pocname} name='pocname' onChange={e => handleUpdateJob(e)} />
                </div>
                <div className=' text-lg flex items-center my-1'>
                  <p className='mr-1'>Contact Info:</p>
                  <input className='bg-base-100 text-accent' value={jobState.pocurl} name='pocurl' onChange={e => handleUpdateJob(e)} />
                </div>
              </section>

              {/* Update single job */}
              <div className='modal-action'>
                <form method="dialog" onSubmit={updateSingleJob}>
                  <button className='btn border border-accent'>Save Changes</button>
                </form>
              </div>
            </main>
          </div>
        </Modal>

      </td>
    </tr>
  )
}