import { useCallback, useRef } from 'react'
import { JobT } from '../../../../types';
import { Button, Modal } from 'react-daisyui'

export default function Job({ job, checkJob, tableSize }: { job: JobT & { checked: boolean }, checkJob: (job: JobT & { checked: boolean }) => void, tableSize: string }) {

  // Modal Close/Open handler
  const jobDetailsModal = useRef<HTMLDialogElement>(null)
  const handleShowJobDetails = useCallback(() => {
    jobDetailsModal.current?.showModal();
  }, [jobDetailsModal]);

  //Date formatting
  const date = new Date(job.dateApplied)
  const dateString = date.toLocaleDateString()
  const daysSince = Math.round((new Date().getTime() - date.getTime()) / (1000 * 3600 * 24))
  const daysSinceFormatted = daysSince < 1 ? 'Today' : `${daysSince} days`

  return (
    <tr>
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
          <option>{job.status}</option>
          <option>Applied</option>
          <option>Emailed Followup</option>
          <option>Interview Scheduled</option>
        </select>
      </td>
      <td>
        <Button className="btn btn-sm" onClick={handleShowJobDetails}>Details</Button>
        <Modal backdrop={true} ref={jobDetailsModal} className="modal-box mockup-browser border base-100">
          <Modal.Body>
            <div>
              <div className="mockup-browser-toolbar">
                <div className="input">
                  <a title='Job URL' className="link link-hover link-info" href={job.url} target="_blank">
                    {job.url.startsWith("https://") ? job.url : `https://${job.url}`}
                  </a>
                </div>
              </div>
              {/* Add details/description/person to contact */}

              <section className='my-2'>
                <h1 className='text-xl text-secondary font-extrabold'>Job Description:</h1>
                <p className=' text-lg italic'>
                  {job.description}
                </p>
              </section>

              <section className='my-2'>
                <h1 className='text-xl text-secondary font-extrabold'>Person to contact:</h1>
                <div className=' text-lg flex'>
                  <p className='mr-1'>Name:</p>
                  <p className=' italic text-info'>{job.pocname}</p>
                </div>
                <p className='text-lg'>
                  Contact Info: <i><a className='link link-info link-hover' href={`${job.pocurl}`}>{job.pocurl}</a></i>
                </p>
              </section>
            </div>
          </Modal.Body>
        </Modal>
        {/* <button className="btn btn-sm" onClick={() => document.getElementById(`${job.id}`)?.showModal()}>Details</button>
        <dialog id={`${job.id}`} className="modal">
          <div className="modal-box mockup-browser border base-100">
          <div className="mockup-browser-toolbar">
          <div className="input">
          <a title='Job URL' className="link link-hover link-info" href={job.url} target="_blank">
          {job.url.startsWith("https://") ? job.url : `https://${job.url}`}
          </a>
          </div>
          </div>
          
          <section className='my-2'>
          <h1 className='text-xl text-secondary font-extrabold'>Job Description:</h1>
          <p className=' text-lg italic'>
          {job.description}
          </p>
          </section>
          
          <section className='my-2'>
          <h1 className='text-xl text-secondary font-extrabold'>Person to contact:</h1>
          <div className=' text-lg flex'>
          <p className='mr-1'>Name:</p>
          <p className=' italic text-info'>{job.pocname}</p>
          </div>
          <p className='text-lg'>
                Contact Info: <i><a className='link link-info link-hover' href={`${job.pocurl}`}>{job.pocurl}</a></i>
              </p>
              </section>
              </div>
              <form method="dialog" className="modal-backdrop">
              <button>close</button>
              </form>
            </dialog> */}
      </td>
    </tr>
  )
}