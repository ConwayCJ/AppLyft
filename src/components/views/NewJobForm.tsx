import { useContext, useState } from 'react'
import { Job } from '../../../types'
import { ProfileContext } from '../../ProfileContext'

export default function NewJobForm({ username }: { username: string }) {

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    url: "",
    pocname: "",
    pocurl: "",
    description: "",
  })

  const profileOptions = useContext(ProfileContext)

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setFormData({
      ...formData,
      [value]: e.currentTarget.value
    })
  }

  const handleWrite = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newJob: Job = {
      ...formData,
      status: 'applied',
      dateApplied: new Date()
    }

    profileOptions.methods.postJob(newJob, username)

  }

  return (
    <div className='place-self-start h-screen overflow-x-auto w-full'>

      {/* Hero Section */}
      <div className='w-full pt-6 flex justify-between items-center'>
        <h1 className=' text-5xl font-bold text-primary'>New Job</h1>
      </div>
      <div className=' divider mx-2'></div>
      {/* New Job Form */}
      <form onSubmit={e => handleWrite(e)} className='form-control w-full'>
        <h1 className=' text-secondary font-bold text-xl'>Job Details</h1>
        <span className='flex flex-wrap'>
          {/* Job Title/Company */}
          <div className='m-2'>
            <label htmlFor='company' className='label'>
              <span className='label-text'>
                Company Name<sup className=' text-red-700 text-md'>*</sup>
              </span>
            </label>
            <input required onChange={e => handleValueChange(e, 'company')} id="company" placeholder="Hogwarts" className='input input-sm input-bordered bg-base-200 ' />
          </div>
          <div className='m-2'>
            <label htmlFor='title' className=' label'>
              <span className='label-text'>
                Job Title<sup className=' text-red-700 text-md'>*</sup>
              </span>
            </label>
            <input required onChange={e => handleValueChange(e, 'title')} id="title" placeholder="Potions Master" className=' input input-sm bg-base-200 input-bordered' />
          </div>
          <div className='m-2'>
            <label htmlFor='url' className='label'>
              <span className='label-text'>
                Job Posting URL<sup className=' text-red-700 text-md'>*</sup>
              </span>
            </label>
            <input required onChange={e => handleValueChange(e, 'url')} id="url" placeholder="hogwarts.org/careers" className='input input-sm input-bordered bg-base-200 ' />
          </div>
        </span>
        <span>
          <div className='mx-2'>

            <label htmlFor='description' className='label'>
              <span className='label-text'>
                Job Description<sup className=' text-red-700 text-md'>*</sup>
              </span>
            </label>
            <textarea required id="description" className=' textarea textarea-bordered w-[80%] bg-base-200 max-h-24' placeholder='Copy/Paste Job Description Here... potions master capable of teaching multiple students how to brew and handle variations of poisons and healing brews ' />
          </div>
        </span>

        {/* Point of Contact */}
        <h1 className=' text-secondary font-bold text-xl'>Point of Contact</h1>

        <span className='flex flex-wrap'>
          {/* Job Title/Company */}
          <div className='m-2'>
            <label htmlFor='pocname' className='label'>
              <span className='label-text'>
                Recruiter/PoC Name
              </span>
            </label>
            <input onChange={e => handleValueChange(e, 'pocname')} id="pocname" placeholder="Professor Snape" className='input input-sm input-bordered bg-base-200 ' />
          </div>
          <div className='m-2'>
            <label htmlFor='pocurl' className=' label'>
              <span className='label-text'>
                Email/LinkedIn
              </span>
            </label>
            <input onChange={e => handleValueChange(e, 'pocurl')} id="pocurl" placeholder="psnape07@gmail.com" className=' input input-sm bg-base-200 input-bordered' />
          </div>
        </span>
        <div className=' divider mx-2'></div>
        <div className='my-6'>
          <button className=' btn btn-success btn-wide'>Submit</button>
        </div>

      </form>
    </div>
  )
}