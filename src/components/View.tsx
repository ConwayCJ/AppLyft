//Components
import Home from "./views/home/Home";
import NewJobForm from "./views/newjobform/NewJobForm";
import ViewJobs from "./views/table/ViewJobs";
import PomoDoro from "./views/pomodoro/PomoDoro";
import Stats from "./views/stats/Stats";
import Feedback from "./views/feedback/Feedback";

type ViewProps = {
  feature: string,
  setFeature: (feature: string) => void
}

export default function View({ feature, setFeature }: ViewProps) {

  const handleView = (feature: string) => {
    switch (feature) {
      case 'home':
        return <Home />
        break
      case 'table':
        return <ViewJobs setFeature={setFeature} />
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
      case 'feedback':
        return <Feedback />
    }
  }

  return handleView(feature)

}