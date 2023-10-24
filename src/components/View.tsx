import useAppProvider from "../context/UseAppProvider";
import { useState, useEffect } from "react";
// Components
import Home from "./views/home/Home";
import NewJobForm from "./views/newjobform/NewJobForm";
import ViewJobs from "./views/table/ViewJobs";
import PomoDoro from "./views/pomodoro/PomoDoro";
import Stats from "./views/stats/Stats";
import { Job } from "../../types";

type ViewProps = {
  feature: string,
  setFeature: (feature: string) => void
}

export default function View({ feature, setFeature }: ViewProps) {

  const { methods, username } = useAppProvider()
  const [jobs, setJobs] = useState<Array<Job & { checked: boolean }>>([])


  const getJobs = async (username: string) => {
    const jobList = await methods.getJobs(username)
    jobList.map(job => job.checked = false)
    console.log(jobList)
    setJobs(jobList)
  }

  useEffect(() => {
    setJobs([])
    getJobs(username)
  }, [])

  const handleView = (feature: string) => {
    switch (feature) {
      case 'home':
        return <Home />
        break
      case 'table':
        return <ViewJobs jobs={jobs} setJobs={setJobs} setFeature={setFeature} getJobs={getJobs} />
        break
      case 'newjob':
        return <NewJobForm />
        break
      case 'pomodoro':
        return <PomoDoro />
        break
      case 'stats':
        return <Stats />
        break
    }
  }

  return handleView(feature)

}