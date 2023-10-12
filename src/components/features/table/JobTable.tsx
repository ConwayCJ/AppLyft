import { Job } from '../../../../types';
import { ProfileContext } from '../../../ProfileContext';
import { useContext, useEffect, useState } from 'react';
import TableStats from './TableStats';


export default function JobTable({ username }: { username: string }) {
  const profileOptions = useContext(ProfileContext)

  const [jobList, setJobList] = useState<Array<Job & { checked: boolean }>>([]);
  const [tableSize, setTableSize] = useState('table-sm')
  const [checkAll, setCheckAll] = useState(false)
  const [updateFormRadio, setUpdateFormRadio] = useState<null | string>(null)

  const getJobs = async () => {
    const jobs = await profileOptions.methods.getJobs(username);

    setJobList(jobs.map((job: Job) => ({ ...job, checked: false })))
  }

  const deleteSelectedJobs = async () => {

    alert("This will delete all selected jobs. Are you sure?")

    const selectedJobs = jobList.filter(job => !job.checked)
    console.log(selectedJobs)
    profileOptions.methods.removeJobs(selectedJobs, username)
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

  async function filterBy(filterOption: string) {

    let jobList = await profileOptions.methods.getJobs(username)
    jobList = jobList.map((job: Job) => ({ ...job, checked: false }))

    if (filterOption == 'all') {
      setJobList(jobList)
    } else {

      setJobList(jobList.filter((job: Job & { checked: boolean }) => job.status == filterOption.toLowerCase()))
    }
  }
  const updateSelectedJobs = async () => {
    if (updateFormRadio) {
      const selectedJobs = jobList.map(job => {
        if (job.checked) {
          job.status = updateFormRadio
        }
        return job
      })
      console.log(selectedJobs)
      // BRYCE DO THE UPDATE THING HERE
      profileOptions.methods.updateJobs(selectedJobs, username)
      getJobs()
    } else {
      alert("Choose an option to update the status of every job.")
    }
  }

  useEffect(() => {
    getJobs()
  }, [])

  useEffect(() => {
    setJobList(jobList.map((job: Job & { checked: boolean }) => ({ ...job, checked: checkAll })))
  }, [checkAll])

  return (
    <div className='flex flex-col max-h-screen w-full place-self-start'>

      {/* Toolbar */}
      <div className=''>

        <TableStats jobList={jobList} />

        <div className='flex flex-wrap items-center justify-start'>

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
              {/* Update selected, opens a modal */}
              <li>
                <button className='flex btn btn-xs' onClick={() => document.getElementById('updateSelected')?.showModal()}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                  Update Status Selected
                </button>
                <dialog id="updateSelected" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-xl text-secondary my-1">Update the status of every job:</h3>
                    <p>This is a <b>PERMANENT</b> change and cannot be undone.</p>
                    <p className="py-4"></p>
                    {/* onSubmit handles updating selected options */}
                    <form method="dialog" className='form-control items-start' onSubmit={updateSelectedJobs}>
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                      <div className='join my-6'>
                        <input onChange={e => setUpdateFormRadio(e.target.value)} value='Applied' className='join-item btn border border-accent' type='radio' name="options" aria-label='Applied'></input>
                        <input onChange={e => setUpdateFormRadio(e.target.value)} value='Emailed Followup' className='join-item btn border border-accent' type='radio' name="options" aria-label='Emailed Followup'></input>
                        <input onChange={e => setUpdateFormRadio(e.target.value)} value='Interview Scheduled' className='join-item btn border border-accent' type='radio' name="options" aria-label='Interview Scheduled'></input>
                      </div>

                      <button className='btn btn-sm btn-error w-full' type='submit'>Update All</button>
                    </form>
                  </div>
                  {/* <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form> */}
                </dialog>
              </li>
              <li className='mx-1'>
                <select defaultValue={"Table Size"} className="select select-xs select-ghost w-full max-w-m uppercase" onChange={(e) => setTableSize(e.target.value)}>
                  <option disabled >Table Size</option>
                  <option value={'table-xs'}>Small</option>
                  <option value={'table-sm'}>Medium</option>
                  <option value={'table-md'}>Large</option>
                </select>
              </li>
            </ul>
          </div>
          {/* Search/Filter */}
          <div>
            <input className='input input-sm input-bordered join-item' placeholder='🔎 Search' disabled />
            <select onChange={(e) => filterBy(e.target.value)} className='select select-sm select-bordered join-item'>
              <option>Filter by ...</option>
              <option value="all">All</option>
              <option value="applied">Applied</option>
              <option value="emailed followup">Emailed Followup</option>
              <option value="interview scheduled">Interview Scheduled</option>
            </select>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className='overflow-x-auto'>
        <table className={`table ${tableSize} table-pin-rows`}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={checkAll}
                  className="checkbox"
                  onChange={() => setCheckAll(!checkAll)} />
              </th>
              <th>Job</th>
              <th>📅 Applied</th>
              <th>📅 Past</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
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
                      <option>{job.status}</option>
                      <option>Applied</option>
                      <option>Emailed Followup</option>
                      <option>Interview Scheduled</option>
                    </select>
                  </td>
                  <td>
                    {/* open modal */}
                    <button className="btn btn-sm" onClick={() => document.getElementById(`${job.id}`)?.showModal()}>Details</button>
                    {/* modal */}
                    <dialog id={`${job.id}`} className="modal">
                      <div className="modal-box mockup-browser border base-100">
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

    </div>
  )
}