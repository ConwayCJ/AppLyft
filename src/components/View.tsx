import { Dispatch, SetStateAction } from "react";
// Components
import Home from "./views/home/Home";
import NewJobForm from "./views/jobform/NewJobForm";
import JobTable from "./views/table/JobTable";
import PomoDoro from "./views/pomodoro/PomoDoro";
import Stats from "./views/stats/Stats";


type ViewProps = {
  feature: string,
  setFeature: Dispatch<SetStateAction<string>>
}

export default function View({ feature, setFeature }: ViewProps) {


  const handleView = (feature: string) => {
    switch (feature) {
      case 'home':
        return <Home />
        break
      case 'table':
        return <JobTable setFeature={setFeature} />
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