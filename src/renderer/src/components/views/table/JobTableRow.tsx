import { ChangeEvent, useCallback, useRef, useState } from 'react'
import { Job } from '../../../assets/types'
import { Button, Modal } from 'react-daisyui'
import useAppProvider from '../../../context/UseAppProvider'


type JobProps = {
  job: Job & { checked: boolean },
  tableSize: string,
  checkJob: (job: Job & { checked: boolean }) => void,
}


export default function JobTableRow({ job, checkJob, tableSize }: JobProps) {
  const { username, methods } = useAppProvider()

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

  const [jobFormValues, setJobFormValues] = useState({ ...job })
  const [updateJobMode, setUpdateJobMode] = useState(false)

  const updateSingleJob = () => {
    methods.updateSingleJob(jobFormValues, username)
  }

  const handleUpdateJob = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setJobFormValues({ ...jobFormValues, [e.target.name]: e.target.value })
  }

  return (
    <tr className={`text-${tableSize}`}>
      <th>
        <label>
          <input checked={job.checked} type="checkbox" className={`checkbox checkbox-${tableSize === 'xs' ? 'sm' : tableSize}`} onChange={() => checkJob(job)} />
        </label>
      </th>
      <td onDoubleClick={() => setUpdateJobMode(!updateJobMode)}>
        {
          !updateJobMode ? (
            <>
              {job.title}
              {job.company && (<>
                <br />
                <span className={`badge badge-ghost badge-${tableSize} w-max`}>{job.company}</span>
              </>)}
            </>
          ) : (
            <div className=' join join-horizontal items-center w-max'>
              <div className='mx-2 flex flex-col'>
                <input name="title" defaultValue={job.title} onChange={e => handleUpdateJob(e)} className=' input input-sm input-bordered my-1' />
                <input name="company" defaultValue={job.company} onChange={e => handleUpdateJob(e)} className=' input input-sm input-bordered' />
              </div>
              <div>
                <button className='btn btn-xs border-accent' onClick={() => {
                  updateSingleJob()
                  setUpdateJobMode(false)
                }}>✔</button>
              </div>
            </div>
          )
        }
      </td>
      <td>{dateString}</td>
      <td>{daysSinceFormatted}</td>
      <td>
        <select name="status" onChange={(e) => {
          methods.updateSingleJob({ ...job, "status": e.target.value }, username)
        }}
          className={`select select-ghost select-${tableSize} w-full max-w-m`}>
          <option>{job.status}</option>
          <option>Applied</option>
          <option>Emailed Followup</option>
          <option>Interview Scheduled</option>
          <option>Declined</option>
        </select>
      </td>
      <td>
        <Button className="btn btn-sm" onClick={handleShow}>Details</Button>
        {/* @ts-expect-error */}
        <Modal ref={ref}>

          <div className="mockup-browser border bg-base-300">


            <div className="mockup-browser-toolbar">
              <div className="input">
                <a title='Job URL' className="link link-hover link-info" href={job.url} target="_blank">
                  {job.url.startsWith("https://") ? job.url : `https://${job.url}`}
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
                <textarea className=' textarea py-2 w-full textarea-bordered h-24 max-h-[400px] text-accent' value={job.description} name='description' onChange={e => handleUpdateJob(e)} />
              </section>

              <section>
                <h1 className='text-xl text-secondary font-extrabold'>Person to contact:</h1>
                <div className=' text-lg flex items-center my-1'>
                  <p className='mr-1'>Name:</p>
                  <input className=' bg-base-100 text-accent' value={job.pocname} name='pocname' onChange={e => handleUpdateJob(e)} />
                </div>
                <div className=' text-lg flex items-center my-1'>
                  <p className='mr-1'>Contact Info:</p>
                  <input className='bg-base-100 text-accent' value={job.pocurl} name='pocurl' onChange={e => handleUpdateJob(e)} />
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