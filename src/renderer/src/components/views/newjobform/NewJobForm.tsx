import { useState } from 'react'
import { Job } from '../../../assets/types'
import PDTimer from '../pomodoro/PDTimer'
import useAppProvider from '../../../context/UseAppProvider'
import './NewJobForm.css'

export default function NewJobForm() {
  console.log('ree')
  const { username, methods } = useAppProvider()
  const defaultFormData = {
    title: "",
    company: "",
    url: "",
    pocname: "",
    pocurl: "",
    description: "",
    checked: false,
    dateApplied: new Date()
  }
  const [formData, setFormData] = useState(defaultFormData)
  const [jobSubmitted, setJobSubmitted] = useState(false)

  // format date object for today
  const today = new Date()
  today.setDate(today.getDate())
  const date = today.toISOString().substring(0, 10)


  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: string) => {
    setFormData({
      ...formData,
      [value]: e.currentTarget.value
    })
  }

  const handleWrite = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newJob: Job = {
      ...formData,
      status: 'Applied',
      notes: []
    }

    methods.postJob(newJob, username)
    setFormData(defaultFormData)
    setJobSubmitted(true)
    setTimeout(() => setJobSubmitted(false), 2000)
  }

  return (
    <div className='place-self-start h-screen overflow-x-auto w-full'>

      {/* Hero Section */}
      <div className='flex items-center justify-between'>
        <h1 className='text-5xl font-bold text-primary'>New Job</h1>
        <div>
          <PDTimer />
        </div>
      </div>
      <div className=' divider mt-0 mx-2'></div>
      {/* New Job Form */}
      <form onSubmit={e => handleWrite(e)} className='form-control w-full'>
        <h1 className=' text-secondary font-bold text-xl'>Job Details</h1>
        <div className='m-2'>
          <label htmlFor='date' className='label'>
            <span className='label-text'>
              Date Applied<sup className=' text-red-700 text-md'>*</sup>
            </span>
          </label>
          <input type="date" defaultValue={date} onChange={e => handleValueChange(e, 'dateApplied')} id="date" className='input input-sm input-bordered bg-base-200 ' />
        </div>
        <span className='flex flex-wrap'>
          {/* Job Title/Company */}

          <div className='m-2'>
            <label htmlFor='company' className='label'>
              <span className='label-text'>
                Company Name<sup className=' text-red-700 text-md'>*</sup>
              </span>
            </label>
            <input required value={formData.company} onChange={e => handleValueChange(e, 'company')} id="company" placeholder="Magicians Inc." className='input input-sm input-bordered bg-base-200 ' />
          </div>
          <div className='m-2'>
            <label htmlFor='title' className=' label'>
              <span className='label-text'>
                Job Title<sup className=' text-red-700 text-md'>*</sup>
              </span>
            </label>
            <input required value={formData.title} onChange={e => handleValueChange(e, 'title')} id="title" placeholder="Junior Magister" className=' input input-sm bg-base-200 input-bordered' />
          </div>
          <div className='m-2'>
            <label htmlFor='url' className='label'>
              <span className='label-text'>
                Job Posting URL<sup className=' text-red-700 text-md'>*</sup>
              </span>
            </label>
            <input required value={formData.url} onChange={e => handleValueChange(e, 'url')} id="url" placeholder="magicisreal.org/careers" className='input input-sm input-bordered bg-base-200 ' />
          </div>
        </span>
        <span>
          <div className='mx-2'>
            <label htmlFor='description' className='label'>
              <span className='label-text'>
                Job Description<sup className=' text-red-700 text-md'>*</sup>
              </span>
            </label>
            <textarea required value={formData.description} onChange={e => handleValueChange(e, 'description')} id="description" className=' textarea textarea-bordered bg-base-200 max-h-24 max-w-md w-full' placeholder='Copy/paste job description here... applicants should have a minimum of 8 years work experience & be 10x magician and deployed a minimum of 14 new magic spells ' />
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
            <input value={formData.pocname} onChange={e => handleValueChange(e, 'pocname')} id="pocname" placeholder="Dumbledore" className='input input-sm input-bordered bg-base-200 ' />
          </div>
          <div className='m-2'>
            <label htmlFor='pocurl' className=' label'>
              <span className='label-text'>
                Email/LinkedIn
              </span>
            </label>
            <input value={formData.pocurl} onChange={e => handleValueChange(e, 'pocurl')} id="pocurl" placeholder="dDore07@yahoo.com" className=' input input-sm bg-base-200 input-bordered' />
          </div>
        </span>
        <div className=' divider mx-2'></div>

        <div className='my-6 flex formContainer'>
          {jobSubmitted ? (

            <div className=' btn btn-circle btn-wide mx-2 border-success'>Job Submitted! ✔</div>

          ) : (
            <button className=' btn btn-success btn-wide mx-2'>Submit</button>
          )}
        </div>

      </form>
    </div>
  )
}