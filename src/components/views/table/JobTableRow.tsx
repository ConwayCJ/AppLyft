import { ChangeEvent, useCallback, useRef, useState } from 'react'
import { Job } from '../../../../types'
import { Button, Modal } from 'react-daisyui'

type JobProps = {
  job: Job & { checked: boolean },
  tableSize: string,
  checkJob: (job: Job & { checked: boolean }) => void
}

export default function JobTableRow({ job, checkJob, tableSize }: JobProps) {

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
    //bryce do the thing, by id or something? idk, use jobState^
    //validate phone number

  }

  const updateSingleJobStatus = () => {
    //take jobState^ and update the 'status' field on the 1 object

  }

  const handleUpdateJob = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e)
    setJobState({ ...jobState, [e.target.name]: e.target.value })
    console.log(jobState)
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
        <select onChange={updateSingleJobStatus} className="select select-sm select-ghost w-full max-w-m">
          <option>{jobState.status}</option>
          <option>Applied</option>
          <option>Emailed Followup</option>
          <option>Interview Scheduled</option>
        </select>
      </td>
      <td>
        <Button className="btn btn-sm" onClick={handleShow}>Details</Button>
        <Modal ref={ref}>

          <Modal.Body className="mockup-browser bg-base-100 border p-6">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm text-warning btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>


            <div className="mockup-browser-toolbar">
              <div className="input">
                <a title='Job URL' className="link link-hover link-info" href={jobState.url} target="_blank">
                  {jobState.url.startsWith("https://") ? job.url : `https://${jobState.url}`}
                </a>
              </div>
            </div>
            {/* Add details/description/person to contact */}

            <section className='my-2'>
              <h1 className='text-xl text-secondary font-extrabold py-1'>Job Description:</h1>
              <textarea className=' textarea py-2 w-full textarea-bordered max-h-24 text-accent' value={jobState.description} name='description' onChange={e => handleUpdateJob(e)} />
            </section>

            <section className='my-2'>
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
          </Modal.Body>
        </Modal>

      </td>
    </tr>
  )
}