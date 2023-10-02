import { useState } from 'react'

export default function NewJobForm() {

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    url: "",
    pocname: "",
    pocurl: "",
    description: "",
  })

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setFormData({
      ...formData,
      [value]: e.currentTarget.value
    })
  }

  return (
    <form onSubmit={e => handleWrite(e, formData)}>
      <span>
        <label htmlFor='title'>Job Title </label>
        <input onChange={e => handleValueChange(e, 'title')} id="title" placeholder="Software Developer" />
        <label htmlFor='company'>Company </label>
        <input onChange={e => handleValueChange(e, 'company')} id="company" placeholder="Company" />
        <label htmlFor='url'>URL</label>
        <input onChange={e => handleValueChange(e, 'url')} id="url" placeholder="JobAppliedUrl.com" />
        <label htmlFor='description'>Job Description </label>
        <input onChange={e => handleValueChange(e, 'description')} id="description" placeholder="copy/paste job description" />
      </span>
      <span>
        <h6>Point of Contact</h6>
        <label htmlFor='pocname'>Recruiter Name </label>
        <input onChange={e => handleValueChange(e, 'pocname')} id="pocname" placeholder="Name" />
        <label htmlFor='pocurl'>Email/LinkedIn </label>
        <input onChange={e => handleValueChange(e, 'pocurl')} id="pocurl" placeholder="Email" />
      </span>
      <button>Submit</button>
    </form>
  )
}