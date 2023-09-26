import { useState } from 'react'

export default function NewJobForm() {

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    url: "",
    pocname: "",
    pocurl: ""
  })

  const handleValueChange = (e, value: string) => {
    setFormData({
      ...formData,
      [value]: e.target.value
    })
    console.log(formData)
  }


  return (
    <form>
      <label htmlFor='title'>Job Title</label>
      <input onChange={e => handleValueChange(e, 'title')} id="title" placeholder="Software Developer" />
      <label htmlFor='company'>Company</label>
      <input onChange={e => handleValueChange(e, 'company')} id="company" placeholder="Microsoft" />
      <label htmlFor='url'>URL</label>
      <input onChange={e => handleValueChange(e, 'url')} id="url" placeholder="jobAppliedUrl.com" />
      <span>
        <h6>Point of Contact</h6>
        <label htmlFor='pocname'>Recruiter Name</label>
        <input onChange={e => handleValueChange(e, 'pocname')} id="pocname" placeholder="Linda" />
        <label htmlFor='pocurl'>Email/LinkedIn</label>
        <input onChange={e => handleValueChange(e, 'pocurl')} id="pocurl" placeholder="email/linkedin" />
      </span>
      <button>Submit</button>
    </form>
  )
}