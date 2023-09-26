import { useState } from 'react'
import './App.css'
import NewJobForm from './components/NewJobForm'

function App() {
  const [value, setValue] = useState("value")

  // window.writeFile("hello world")
  window.Bridge.saveData("front end job", "microsoft")

  const handleWrite = (e, data) => {
    e.preventDefault()
    console.log("Submitting new job")

    const fData = {
      ...data,
      dateApplied: new Date()
    }

    window.Bridge.saveData(fData)

  }



  return (
    <>
      {/* <input onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleWrite}>Submit</button> */}
      <NewJobForm handleWrite={handleWrite} />
    </>
  )
}

export default App
