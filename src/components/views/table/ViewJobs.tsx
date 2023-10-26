import { Job } from '../../../../types';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Button, Modal } from 'react-daisyui';
import TableStats from './TableStats';
import useAppProvider from '../../../context/UseAppProvider';
import NoJobs from './NoJobs';
import JobTable from './JobTable';


type JobTableProps = {
  setFeature: (feature: string) => void,

}

export default function ViewJobs({ setFeature }: JobTableProps) {

  const { username, methods } = useAppProvider()
  const [tableSize, setTableSize] = useState('table-sm')
  const [checkAll, setCheckAll] = useState(false)
  const [updateFormRadio, setUpdateFormRadio] = useState<null | string>(null)
  // const jobDetailsModal = useRef<HTMLDialogElement>(null);
  const updateAllModal = useRef<HTMLDialogElement>(null);
  const [jobs, setJobs] = useState<Array<Job & { checked: boolean }>>([])

  const getJobs = useCallback(async (username: string, filter = "") => {
    let jobs = await methods.getJobs(username)

    if (filter) {
      jobs = jobs.filter(job => job.status === filter)
      setJobs(jobs.map(job => ({ ...job, checked: false })))
    } else {
      setJobs(jobs)
    }
  }, [methods])

  useEffect(() => {
    getJobs(username, "")
  }, [getJobs, username])

  const deleteSelectedJobs = async () => {

    alert("This will delete all selected jobs. Are you sure?")

    const selectedJobs = jobs.filter(job => !job.checked)
    console.log(selectedJobs)
    methods.removeJobs(selectedJobs, username)
    //need to await the above
    getJobs(username, "")
  }

  function checkJob(job: Job & { checked: boolean }) {
    const updatedJobList = jobs.map((prevJob: any) => {
      if (prevJob.id === job.id) {
        job.checked = !job.checked
      }
      return prevJob
    })

    setJobs(updatedJobList)
  }

  const updateSelectedJobs = async () => {
    if (updateFormRadio) {
      const selectedJobs = jobs.map((job: any) => {
        if (job.checked) {
          job.status = updateFormRadio
        }
        return job
      })
      methods.updateJobs(selectedJobs, username)
      getJobs(username, "")
    } else {
      alert("Choose an option to update the status of every job.")
    }
  }

  const handleShowUpdateAll = useCallback(() => {
    updateAllModal.current?.showModal();
  }, [updateAllModal]);

  useEffect(() => {
    setJobs(jobs.map((job: Job & { checked: boolean }) => ({ ...job, checked: checkAll })))
  }, [checkAll])


  //filter jobs handler


  const RadioOption = ({ value }: { value: string }) => {
    return <input onChange={e => setUpdateFormRadio(e.target.value)} name="options" value={value} aria-label={value} className='join-item btn border border-accent' type='radio'></input>
  }

  return (
    <div className='flex flex-col max-h-screen w-full place-self-start'>

      <div>

        <TableStats jobs={jobs} />

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
                <Button className='flex btn btn-xs' onClick={handleShowUpdateAll}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                  Update Status Selected
                </Button>
                <Modal ref={updateAllModal} className='bg-base-100 p-6 border rounded'>
                  <Modal.Header className="font-bold text-xl text-secondary my-1">Update the status of every job:</Modal.Header>
                  <Modal.Body>
                    <p>This is a <b>PERMANENT</b> change and cannot be undone.</p>
                    <p className='pt-6'>Select an option:</p>
                    {/* onSubmit handles updating selected options */}
                    <form method="dialog" className='form-control items-start' onSubmit={updateSelectedJobs}>
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                      <div className='join my-6'>
                        <RadioOption value='Applied' />
                        <RadioOption value='Emailed Followup' />
                        <RadioOption value='Interview Scheduled' />
                        <RadioOption value='Declined' />
                      </div>

                      <button className='btn btn-sm btn-error w-full' type='submit'>Update All</button>
                    </form>
                  </Modal.Body>
                </Modal>
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
            <select onChange={(e) => getJobs(username, e.target.value)} className='select select-sm select-bordered join-item'>
              <option value="">Filter by ...</option>
              <option value="">All</option>
              <option value="Applied">Applied</option>
              <option value="Emailed Followup">Emailed Followup</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Declined">Declined</option>
            </select>
          </div>
        </div>
      </div>
      {
        jobs.length === 0 ? (<NoJobs setFeature={setFeature} />)
          : (<JobTable jobs={jobs} tableSize={tableSize} checkJob={checkJob} checkAll={checkAll} setCheckAll={setCheckAll} />)
      }
    </div >
  )
}